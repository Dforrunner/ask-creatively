import '@/styles/walking-animation.scss';

export default function WalkingElement({children}: {children?: React.ReactNode}) {
  return (
    <div className='relative'>
      <div className='z-10'>
        {children}
      </div>
      <div className='z-0 h-[10px] mx-auto'>
        <div className='ele-leg-1 ele-leg-back'></div>
        <div className='ele-leg-2 ele-leg-front'></div>
      </div>
    </div>
  );
}
