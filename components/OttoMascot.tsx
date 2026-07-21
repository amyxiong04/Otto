import React from 'react';

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
      <img 
        src="/images/otto.png" 
        alt="Otto the Otter"
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'contain'
        }}
      />
    </div>
  );
}
