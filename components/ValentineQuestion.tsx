'use client';
import { useState, useEffect, useRef } from 'react';
import Button1 from './Button1';
import CelebrationEffects from './CelebrationEffects';
import Dialog from './Dialog';
import MichealJackson from './MichealJackson';
import { Question } from '@/models/Question';
import { sendQuestionResponse } from '@/lib/requests';
import { CuteHeartGif, PersonQuestionMarkGif } from './Gifs';
import KimCrying from './KimCrying';
import NapoleonDynamite from './NapoleonDynamite';
import WarningIcon from './WarningIcon';
import { getRandomNumberInRange } from '@/lib/random-num-in-range';
import { runNTimes } from '@/lib/interval-n-times';

interface Props {
  question: Question;
}
export default function ValentineQuestion({ question }: Props) {
  const [state, setState] = useState({
    text: "You've been hacked, LOL",
    isYes: false,
    isNo: false,
    noText: 'No ',
    yesText: 'Yes!',
    pointer: { x: 0, y: 0 },
    runBtn: false,
    responseSent: false,
    responseFailed: false,
  });

  const [responseSent, setResponseSent] = useState(false);
  const [responseFailed, setResponseFailed] = useState(false);
  const okClickCount = useRef(0);
  const [noClickCount, setNoClickCount] = useState(0);
  const emailSentTo = question.sender;

  useEffect(() => {
    const timer = setTimeout(() => {
      okClickCount.current = 1;
      setState({ ...state, text: 'JK! I have just one question for you...' });
      clearTimeout(timer);
    }, 1500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const okClick = () => {
    okClickCount.current = 2;
    setState({ ...state, text: 'Will you be my valentine?' });
  };

  const yesClick = () => {
    setState({ ...state, text: 'You make me happy 😘', isYes: true });
    sendResponse(true);
  };

  const noClick = () => {
    const newNoCount = noClickCount + 1;
    if (newNoCount > 7) return;
    setNoClickCount(newNoCount);

    if (newNoCount === 6) {
      setState({
        ...state,
        text: 'Fuck you',
        isNo: true,
        noText: '💔',
        yesText: '👉🏻 SAY YESS 👈🏻 ',
      });

      sendResponse(false);
      const timer = setTimeout(() => {
        setState({
          ...state,
          text: 'JK! Appreciate your response :)',
          noText: '',
          yesText: '👉🏻 SAY YESS 👈🏻 ',
        });
        clearTimeout(timer);
      }, 1000);

      return;
    }

    if (newNoCount === 5) {
      setState({ ...state, noText: 'NO (final answer)' });
      return;
    }

    if (newNoCount === 4) {
      runNTimes(
        () => {
          setState({
            ...state,
            noText: "Can't catch me 😝",
            yesText: 'YES!!!🙏',
            runBtn: true,
            pointer: {
              x: getRandomNumberInRange(window.innerWidth - 500, 100),
              y: getRandomNumberInRange(window.innerHeight - 500, 100),
            },
          });
        },
        300,
        10
      );

      const timer = setTimeout(() => {
        setState({
          ...state,
          noText: 'Fine break my heart 🙈',
          yesText: 'YES!!!🙏',
          runBtn: false,
        });
        clearTimeout(timer);
      }, 3100);
      return;
    }

    if (newNoCount < 4) {
      if (newNoCount === 1) setState({ ...state, noText: 'No 😭' });
      else if (newNoCount === 2) setState({ ...state, noText: '💔NO💔' });
      else if (newNoCount === 3) setState({ ...state, noText: 'You sure? 👀' });
      return;
    }
  };

  const [yes, no] = [
    <Button1 key={'yesss'} text={state.yesText} onClick={yesClick} />,
    <Button1
      key={'nooo'}
      text={state.noText}
      onClick={noClick}
      style={
        state.runBtn
          ? {
              position: 'fixed',
              top: state.pointer.y,
              left: state.pointer.x,
              zIndex: 1,
            }
          : {}
      }
    />,
  ];

  const YesNoBtns = () => {
    if (noClickCount > 4) return [no, yes];
    return noClickCount % 2 === 0 ? [no, yes] : [yes, no];
  };

  const DialogIcon = () => {
    if (state.isYes) return <NapoleonDynamite />;
    if (state.isNo || noClickCount >= 6) return <KimCrying />;
    if (okClickCount.current === 0) return <WarningIcon />;
    if (okClickCount.current === 1) return <PersonQuestionMarkGif />;
    return <CuteHeartGif />;
  };

  const DialogButtons = () => {
    if (okClickCount.current === 1) return <Button1 text={'ok'} onClick={okClick} />;
    if (okClickCount.current >= 2 && !state.isYes) return <YesNoBtns />;
    return <div className='h-[40px]' />;
  };

  const sendResponse = (accepted: boolean) => {
    if (!question.email) return;
    sendQuestionResponse(question, { accepted })
      .then(() => setResponseSent(true))
      .catch(() => setResponseFailed(false));
  };

  return (
    <div className='w-full h-screen max-h-screen flex flex-col justify-center items-center relative bg-[black] p-2'>
      {state.isYes && (
        <>
          <CelebrationEffects />
          <div className='absolute bottom-5 right-1'>
            <MichealJackson />
          </div>

          <div className='absolute bottom-5 left-1'>
            <MichealJackson />
          </div>
        </>
      )}

      <Dialog text={state.text} dialogIcon={<DialogIcon />}>
        <DialogButtons />
      </Dialog>

      {responseSent && (
        <div className='text-white text-center text-[13px]'>
          Your response has been sent {emailSentTo ? emailSentTo : ''}! But just incase let them
          know yourself too
        </div>
      )}
      {responseFailed && (
        <div className='text-white text-center'>
          Your response failed to send {':('} Let them know directly 😉
        </div>
      )}
    </div>
  );
}
