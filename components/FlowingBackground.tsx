"use client";

/**
 * FlowingBackground - Soft animated gradient with breathing/flowing effect
 * Uses SVG and CSS animations for smooth, subtle movement
 */
export default function FlowingBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800" />

      {/* Animated SVG gradients */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Animated gradient 1 */}
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FB923C" stopOpacity="0.3">
              <animate
                attributeName="stop-opacity"
                values="0.3;0.5;0.3"
                dur="8s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#EA580C" stopOpacity="0">
              <animate
                attributeName="stop-opacity"
                values="0;0.2;0"
                dur="8s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>

          {/* Animated gradient 2 */}
          <radialGradient id="gradient2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F97316" stopOpacity="0.4">
              <animate
                attributeName="stop-opacity"
                values="0.4;0.6;0.4"
                dur="10s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#C2410C" stopOpacity="0" />
          </radialGradient>

          {/* Animated gradient 3 */}
          <radialGradient id="gradient3" cx="30%" cy="70%" r="60%">
            <stop offset="0%" stopColor="#FDBA74" stopOpacity="0.3">
              <animate
                attributeName="stop-opacity"
                values="0.3;0.5;0.3"
                dur="12s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#EA580C" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Animated blob 1 */}
        <ellipse cx="30%" cy="40%" rx="600" ry="500" fill="url(#gradient1)">
          <animate
            attributeName="cx"
            values="30%;35%;30%"
            dur="20s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="cy"
            values="40%;45%;40%"
            dur="15s"
            repeatCount="indefinite"
          />
        </ellipse>

        {/* Animated blob 2 */}
        <ellipse cx="70%" cy="60%" rx="700" ry="600" fill="url(#gradient2)">
          <animate
            attributeName="cx"
            values="70%;65%;70%"
            dur="18s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="cy"
            values="60%;55%;60%"
            dur="22s"
            repeatCount="indefinite"
          />
        </ellipse>

        {/* Animated blob 3 */}
        <ellipse cx="50%" cy="30%" rx="550" ry="450" fill="url(#gradient3)">
          <animate
            attributeName="cx"
            values="50%;55%;50%"
            dur="16s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="cy"
            values="30%;35%;30%"
            dur="19s"
            repeatCount="indefinite"
          />
        </ellipse>
      </svg>

      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent" />
    </div>
  );
}
