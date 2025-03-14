
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { getSpeedQuality } from '@/lib/speedtest';

interface SpeedMeterProps {
  value: number;
  maxValue?: number;
  label: string;
  unit?: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

const SpeedMeter: React.FC<SpeedMeterProps> = ({
  value,
  maxValue = 500,
  label,
  unit = 'Mbps',
  size = 'md',
  animated = true,
  className
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const meterRef = useRef<HTMLDivElement>(null);
  
  // Calculate rotation angle (-150 to 150 degrees, where 0 is the middle)
  const calculateRotation = (val: number) => {
    const percentage = Math.min(val / maxValue, 1);
    return -150 + (percentage * 300);
  };
  
  // Get speed quality
  const speedQuality = getSpeedQuality(value);
  
  // Size mappings
  const sizeClasses = {
    sm: {
      container: 'w-32 h-32',
      dial: 'w-2 h-16',
      text: 'text-lg',
      label: 'text-xs'
    },
    md: {
      container: 'w-48 h-48',
      dial: 'w-2.5 h-20',
      text: 'text-3xl',
      label: 'text-sm'
    },
    lg: {
      container: 'w-64 h-64',
      dial: 'w-3 h-28',
      text: 'text-4xl',
      label: 'text-base'
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (meterRef.current) {
      observer.observe(meterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !animated) {
      setDisplayValue(value);
      return;
    }
    
    let start = 0;
    const end = value;
    const duration = 1500;
    const increment = end / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(start);
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [value, animated, isVisible]);

  return (
    <div 
      ref={meterRef}
      className={cn(
        'relative flex flex-col items-center justify-center',
        className
      )}
    >
      <div className={cn('relative', sizeClasses[size].container)}>
        {/* Speedometer background */}
        <div className="absolute inset-0 bg-secondary rounded-full"></div>
        
        {/* Speedometer scale markers */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className="absolute top-1/2 left-1/2 w-1 h-3 bg-foreground/40 origin-bottom"
              style={{ 
                transform: `translate(-50%, -100%) rotate(${-150 + (i * 75)}deg)`,
                transformOrigin: 'bottom center'
              }}
            />
          ))}
        </div>
        
        {/* Dial */}
        <div 
          className={cn(
            'absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-foreground speedometer-dial',
            sizeClasses[size].dial
          )}
          style={{ 
            transform: `rotate(${calculateRotation(displayValue)}deg)`
          }}
        >
          <div 
            className={cn(
              'absolute -top-1 left-1/2 w-3 h-3 -translate-x-1/2 rounded-full shadow-md',
              {
                'bg-speed-slow': speedQuality === 'slow',
                'bg-speed-medium': speedQuality === 'medium',
                'bg-speed-fast': speedQuality === 'fast',
              }
            )}
          />
        </div>
        
        {/* Center point */}
        <div className="absolute top-1/2 left-1/2 w-6 h-6 -translate-x-1/2 translate-y-1/2 rounded-full bg-muted border-2 border-foreground/20"></div>
        
        {/* Value display */}
        <div className="absolute top-1/2 left-0 right-0 bottom-0 flex flex-col items-center justify-center">
          <div className={cn('font-bold', sizeClasses[size].text)}>
            {displayValue.toFixed(1)}
          </div>
          <div className="text-foreground/70 text-xs mt-1">{unit}</div>
        </div>
      </div>
      
      {/* Label */}
      <div className={cn(
        'mt-2 font-medium text-center text-foreground/80',
        sizeClasses[size].label
      )}>
        {label}
      </div>
    </div>
  );
};

export default SpeedMeter;
