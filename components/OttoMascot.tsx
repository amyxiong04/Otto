import React from 'react';
import Image from 'next/image';

type OttoMascotProps = {
  size?: number;
  expression?: 'happy' | 'talking' | 'listening' | 'excited' | 'thinking';
  className?: string;
};

export default function OttoMascot({ 
  size = 120, 
  className = '' 
}: OttoMascotProps) {
  return (
    <div 
      className={className} 
      style={{ 
        width: size, 
        height: size, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
      }}
    >
      <Image
        src="/images/otto.png" 
        alt="Otto"
        width={320}
        height={378}
        priority={size >= 150}
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'contain'
        }}
      />
    </div>
  );
}
