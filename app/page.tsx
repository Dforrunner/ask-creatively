'use client';

import { generateLink } from '@/lib/generate-link';
import { validateEmail } from '@/lib/validators';
import { QuestionType } from '@/models/QuestionType';
import { useState } from 'react';

export default function Home() {
  const [error, setError] = useState('');
  const [link, setLink] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const email = e.target.email.value.replace('/D/g', '');
    const recipient = e.target.recipient.value.trim();
    const sender = e.target.sender.value.trim();

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    const url = generateLink({ questionType: QuestionType.Valentine, email, recipient, sender });
    setLink(url);
  };

  return (
    <main className='w-full min-h-screen flex flex-col justify-center items-center gap-2 text-center p-3'>
      <h1 className='text-xl py-5'>Ask Someone To Be Your Valentine In A Creative Way</h1>

      <div className='flex gap-5 flex-wrap justify-center items-center'>
        <div className='max-w-[300px] h-[150px] border rounded p-5 text-center'>
          <h2>Step 1</h2>
          <p className='text-sm text-gray-600 pt-2'>
            Enter your email to generate a unique link. Include their name to know who the response
            is from.
          </p>
        </div>
        <div className='max-w-[300px] h-[150px] border rounded p-5 text-center'>
          <h2>Step 2</h2>
          <p className='text-sm text-gray-600 pt-2'>
            Send the link to your special someone. When they response you will get an email.
          </p>
        </div>
        <div className='max-w-[300px]  h-[150px] border rounded p-5 text-center'>
          <h2>Step 3</h2>
          <p className='text-sm text-gray-600 pt-2'>
            Wait for their response. Make sure to check your spam folder as well. The email will be
            from <span className='text-slate-400'>contact@questionforyou.lol</span>
          </p>
        </div>
      </div>

      <div className='w-full max-w-sm mt-5'>
        <form className='w-full' onSubmit={handleSubmit}>
          <h2 className='text-lg pb-2'>Create A Unique Link</h2>
          <div className='flex flex-col gap-5 pb-5'>
            <div>
              <input
                className='appearance-none bg-transparent w-full text-gray-700  py-1 px-1 leading-tight focus:outline-none border-b border-teal-500'
                type='email'
                placeholder='email@example.com'
                name='email'
              />
              <div className='text-xs text-red-950 pt-[2px]'>{error}</div>
            </div>
            <input
              className='appearance-none bg-transparent w-full text-gray-700  py-1 px-1 leading-tight focus:outline-none border-b border-teal-500'
              type='text'
              placeholder='Your Name (recommended)'
              name='sender'
            />
            <input
              className='appearance-none bg-transparent w-full text-gray-700  py-1 px-1 leading-tight focus:outline-none border-b border-teal-500'
              type='text'
              placeholder='Recipient Name (recommended)'
              name='recipient'
            />
          </div>

          <button
            className='flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded w-full'
            type='submit'
          >
            Generate Link
          </button>
        </form>

        {link && (
          <div className='flex flex-col items-center gap-2 text-wrap'>
            <a
              href={link}
              target='_blank'
              rel='noreferrer'
              className='text-blue-500 underline text-xs lg:text-normal break-all py-3'
            >
              {link}
            </a>
            <button
              className='bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded w-full'
              onClick={() => {
                navigator.clipboard.writeText(link);
                setCopied(true);
              }}
            >
              Copy Link {copied && '✔'}
            </button>
          </div>
        )}

        <a
          className='block bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded w-full mt-2'
          href={link || generateLink({ questionType: QuestionType.Valentine })}
          target='_blank'
        >
          Demo {link ? 'Link' : ''}
        </a>
      </div>

      <p className='text-gray-500 text-sm max-w-[800px]'>
        Note From Developer: This is an app I created for and decided to put it out there for anyone
        to use. So if you like it share it with a friend. The data does not get saved anywhere.{' '}
        {`It's`} just used to compile an email to send you your {"valentine's"} response. If you
        have any questions or suggestions, feel free to reach out to me at{' '}
        <a href='mailto:contact@questionforyou.lol' className='text-blue-500'>
          contact@questionforyou.lol
        </a>
      </p>
    </main>
  );
}
