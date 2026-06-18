import { useEffect, useState, useRef } from 'react';

interface RatingRingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export default function RatingRing({ 
  rating, 
  size = 'md', 
  showLabel = true 
}: RatingRingProps) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const sizes = {
    sm: { diameter: 56, stroke: 3, fontSize: 'text-lg', labelSize: 'text-[10px]' },
    md: { diameter: 84, stroke: 4, fontSize: 'text-2xl', labelSize: 'text-xs' },
    lg: { diameter: 120, stroke: 6, fontSize: 'text-4xl', labelSize: 'text-sm' },
  };

  const s = sizes[size];
  const radius = (s.diameter - s.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = rating / 10;
  const offset = circumference * (1 - percentage);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setAnimated(true), 100);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="rating-ring" style={{ width: s.diameter, height: s.diameter }}>
      <svg width={s.diameter} height={s.diameter}>
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EDD59A" />
            <stop offset="50%" stopColor="#D4A24C" />
            <stop offset="100%" stopColor="#A87232" />
          </linearGradient>
          <filter id="ratingGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle
          cx={s.diameter / 2}
          cy={s.diameter / 2}
          r={radius}
          fill="none"
          className="rating-ring-bg"
          strokeWidth={s.stroke}
        />
        <circle
          cx={s.diameter / 2}
          cy={s.diameter / 2}
          r={radius}
          fill="none"
          stroke="url(#goldGradient)"
          strokeWidth={s.stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animated ? offset : circumference}
          style={{
            transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
            filter: percentage >= 0.8 ? 'url(#ratingGlow)' : undefined,
          }}
          transform={`rotate(-90 ${s.diameter / 2} ${s.diameter / 2})`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span 
          className={`font-display font-bold bg-gold-gradient bg-clip-text text-transparent ${s.fontSize}`}
          style={{ backgroundSize: '200% auto' }}
        >
          {rating.toFixed(1)}
        </span>
        {showLabel && (
          <span className={`text-cinema-gold-600/80 font-medium ${s.labelSize} -mt-0.5`}>
            评分
          </span>
        )}
      </div>
    </div>
  );
}
