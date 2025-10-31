"use client";

/**
 * SmoothWaveBackground - Soft, organic flowing layers
 * Light, airy design with white/gray/blue tones
 * Smooth fabric/fog-like movement
 */
export default function SmoothWaveBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-gradient-to-br from-gray-100 via-gray-50 to-gray-150">
      {/* Smooth flowing SVG layers */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        style={{ minHeight: '100%', minWidth: '100%' }}
      >
        <defs>
          {/* Soft gray gradient - 4% darker */}
          <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d1d5db" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#e5e7eb" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#f3f4f6" stopOpacity="0.2" />
          </linearGradient>

          {/* Medium gray gradient - 4% darker */}
          <linearGradient id="wave-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9ca3af" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#d1d5db" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#e5e7eb" stopOpacity="0.1" />
          </linearGradient>

          {/* Subtle gray gradient - 4% darker */}
          <radialGradient id="wave-gradient-3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e5e7eb" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#f3f4f6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#f9fafb" stopOpacity="0" />
          </radialGradient>

          {/* Light gray gradient - 4% darker */}
          <radialGradient id="wave-gradient-4" cx="30%" cy="70%" r="60%">
            <stop offset="0%" stopColor="#d1d5db" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#e5e7eb" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Layer 1: Diagonal wave - same angle */}
        <path
          fill="url(#wave-gradient-1)"
          d="M-200,50 Q300,120 800,200 T1600,350 L1600,800 L-200,800 Z"
          opacity="0.7"
        >
          <animate
            attributeName="d"
            dur="12s"
            repeatCount="indefinite"
            values="
              M-200,50 Q300,120 800,200 T1600,350 L1600,800 L-200,800 Z;
              M-200,70 Q320,140 820,220 T1600,370 L1600,800 L-200,800 Z;
              M-200,30 Q280,100 780,180 T1600,330 L1600,800 L-200,800 Z;
              M-200,50 Q300,120 800,200 T1600,350 L1600,800 L-200,800 Z
            "
          />
        </path>

        {/* Layer 2: Diagonal wave - same angle */}
        <path
          fill="url(#wave-gradient-2)"
          d="M-200,150 Q300,220 800,300 T1600,450 L1600,800 L-200,800 Z"
          opacity="0.6"
        >
          <animate
            attributeName="d"
            dur="14s"
            repeatCount="indefinite"
            values="
              M-200,150 Q300,220 800,300 T1600,450 L1600,800 L-200,800 Z;
              M-200,170 Q320,240 820,320 T1600,470 L1600,800 L-200,800 Z;
              M-200,130 Q280,200 780,280 T1600,430 L1600,800 L-200,800 Z;
              M-200,150 Q300,220 800,300 T1600,450 L1600,800 L-200,800 Z
            "
          />
        </path>

        {/* Layer 3: Diagonal wave - same angle */}
        <path
          fill="url(#wave-gradient-3)"
          d="M-200,250 Q300,320 800,400 T1600,550 L1600,800 L-200,800 Z"
          opacity="0.5"
        >
          <animate
            attributeName="d"
            dur="13s"
            repeatCount="indefinite"
            values="
              M-200,250 Q300,320 800,400 T1600,550 L1600,800 L-200,800 Z;
              M-200,270 Q320,340 820,420 T1600,570 L1600,800 L-200,800 Z;
              M-200,230 Q280,300 780,380 T1600,530 L1600,800 L-200,800 Z;
              M-200,250 Q300,320 800,400 T1600,550 L1600,800 L-200,800 Z
            "
          />
        </path>

        {/* Layer 4: Diagonal wave - same angle */}
        <path
          fill="url(#wave-gradient-1)"
          d="M-200,0 Q300,70 800,150 T1600,300 L1600,800 L-200,800 Z"
          opacity="0.6"
        >
          <animate
            attributeName="d"
            dur="15s"
            repeatCount="indefinite"
            values="
              M-200,0 Q300,70 800,150 T1600,300 L1600,800 L-200,800 Z;
              M-200,20 Q320,90 820,170 T1600,320 L1600,800 L-200,800 Z;
              M-200,-20 Q280,50 780,130 T1600,280 L1600,800 L-200,800 Z;
              M-200,0 Q300,70 800,150 T1600,300 L1600,800 L-200,800 Z
            "
          />
        </path>

        {/* Layer 5: Diagonal wave - same angle */}
        <path
          fill="url(#wave-gradient-2)"
          d="M-200,100 Q300,170 800,250 T1600,400 L1600,800 L-200,800 Z"
          opacity="0.5"
        >
          <animate
            attributeName="d"
            dur="11s"
            repeatCount="indefinite"
            values="
              M-200,100 Q300,170 800,250 T1600,400 L1600,800 L-200,800 Z;
              M-200,120 Q320,190 820,270 T1600,420 L1600,800 L-200,800 Z;
              M-200,80 Q280,150 780,230 T1600,380 L1600,800 L-200,800 Z;
              M-200,100 Q300,170 800,250 T1600,400 L1600,800 L-200,800 Z
            "
          />
        </path>

        {/* Layer 6: Diagonal wave - same angle */}
        <path
          fill="url(#wave-gradient-3)"
          d="M-200,200 Q300,270 800,350 T1600,500 L1600,800 L-200,800 Z"
          opacity="0.6"
        >
          <animate
            attributeName="d"
            dur="16s"
            repeatCount="indefinite"
            values="
              M-200,200 Q300,270 800,350 T1600,500 L1600,800 L-200,800 Z;
              M-200,220 Q320,290 820,370 T1600,520 L1600,800 L-200,800 Z;
              M-200,180 Q280,250 780,330 T1600,480 L1600,800 L-200,800 Z;
              M-200,200 Q300,270 800,350 T1600,500 L1600,800 L-200,800 Z
            "
          />
        </path>

        {/* Layer 7: Diagonal wave - same angle */}
        <path
          fill="url(#wave-gradient-1)"
          d="M-200,300 Q300,370 800,450 T1600,600 L1600,800 L-200,800 Z"
          opacity="0.5"
        >
          <animate
            attributeName="d"
            dur="17s"
            repeatCount="indefinite"
            values="
              M-200,300 Q300,370 800,450 T1600,600 L1600,800 L-200,800 Z;
              M-200,320 Q320,390 820,470 T1600,620 L1600,800 L-200,800 Z;
              M-200,280 Q280,350 780,430 T1600,580 L1600,800 L-200,800 Z;
              M-200,300 Q300,370 800,450 T1600,600 L1600,800 L-200,800 Z
            "
          />
        </path>

        {/* Layer 8: Diagonal wave - same angle */}
        <path
          fill="url(#wave-gradient-2)"
          d="M-200,350 Q300,420 800,500 T1600,650 L1600,800 L-200,800 Z"
          opacity="0.4"
        >
          <animate
            attributeName="d"
            dur="10s"
            repeatCount="indefinite"
            values="
              M-200,350 Q300,420 800,500 T1600,650 L1600,800 L-200,800 Z;
              M-200,370 Q320,440 820,520 T1600,670 L1600,800 L-200,800 Z;
              M-200,330 Q280,400 780,480 T1600,630 L1600,800 L-200,800 Z;
              M-200,350 Q300,420 800,500 T1600,650 L1600,800 L-200,800 Z
            "
          />
        </path>

        {/* Layer 9: Soft circular blob - top right */}
        <ellipse
          cx="1100"
          cy="200"
          rx="400"
          ry="350"
          fill="url(#wave-gradient-4)"
          opacity="0.4"
        >
          <animate
            attributeName="cx"
            values="1100;1150;1100"
            dur="9s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="cy"
            values="200;250;200"
            dur="11s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="rx"
            values="400;450;400"
            dur="8s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="ry"
            values="350;400;350"
            dur="10s"
            repeatCount="indefinite"
          />
        </ellipse>

        {/* Layer 10: Soft circular blob - left side */}
        <ellipse
          cx="300"
          cy="400"
          rx="350"
          ry="400"
          fill="url(#wave-gradient-1)"
          opacity="0.3"
        >
          <animate
            attributeName="cx"
            values="300;250;300"
            dur="10s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="cy"
            values="400;450;400"
            dur="12s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="rx"
            values="350;400;350"
            dur="9s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="ry"
            values="400;450;400"
            dur="11s"
            repeatCount="indefinite"
          />
        </ellipse>
      </svg>

      {/* Very subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5" />
    </div>
  );
}
