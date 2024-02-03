'use client';
import { useState } from 'react';

interface Props {
  text: string;
  dialogIcon: React.ReactNode;
  children: React.ReactNode;
}
export default function Dialog({ text, dialogIcon, children }: Props) {
  const [closeClicked, setClosedClicked] = useState(false);

  return (
    <div
      className={`w-full max-w-[500px] h-[230px] border-[1px] border-[gray] rounded flex flex-col 
                        justify-between bg-[white]`}
    >
      <div
        className='h-[35px] flex justify-end items-center text-[gray] text-xl cursor-pointer z-10'
        onClick={() => setClosedClicked(true)}
      >
        <span
          className={`border-[1px] border-[rgba(0,0,0,0.3)] px-2 m-[2px] rounded 
                              hover:bg-[gray] hover:text-[white] cursor-pointer`}
        >
          {closeClicked ? '😝' : 'X'}
        </span>
      </div>

      <div className='px-5 mt-[-35px] h-full flex items-center gap-3'>
        {dialogIcon}

        {text}
      </div>

      <div className='flex justify-end gap-1 bg-[lightgray] p-2'>{children}</div>
    </div>
  );
}
