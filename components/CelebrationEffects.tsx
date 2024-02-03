'use client';
import Confetti from 'react-confetti';
import { Fireworks } from '@fireworks-js/react';

export default function CelebrationEffects() {
  return (
    <>
      <Confetti width={window.innerWidth} height={window.innerHeight} />
      <Fireworks
        options={{
          rocketsPoint: {
            min: 0,
            max: 100,
          },
        }}
        style={{
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          position: 'fixed',
        }}
      />
    </>
  );
}
