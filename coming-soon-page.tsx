import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const StarField = () => {
  const [stars, setStars] = useState([]);
  
  useEffect(() => {
    // Generate random stars with initial positions spreading from center
    const newStars = Array.from({ length: 70 }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 50 + 25; // Initial distance from center
      return {
        x: 50 + Math.cos(angle) * distance, // Center point is 50%
        y: 50 + Math.sin(angle) * distance,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 15 + 20,
        delay: Math.random() * -20 // Negative delay for staggered start
      };
    });
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white opacity-0"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `starZoom ${star.speed}s ${star.delay}s linear infinite`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}
    </div>
  );
};

const ComingSoonPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Add keyframes for star animation */}
      <style>
        {`
          @keyframes starZoom {
            0% {
              transform: translate(-50%, -50%) scale(0);
              opacity: 0;
            }
            5% {
              opacity: var(--tw-opacity);
            }
            95% {
              opacity: var(--tw-opacity);
            }
            100% {
              transform: translate(
                calc(-50% + (var(--x-direction, 0) * 100vw)), 
                calc(-50% + (var(--y-direction, 0) * 100vh))
              ) scale(2);
              opacity: 0;
            }
          }
        `}
      </style>

      {/* Random stars with different movement directions */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="absolute inset-0" style={{ '--x-direction': Math.random() - 0.5, '--y-direction': Math.random() - 0.5 }}>
          <StarField />
        </div>
      ))}

      {/* Eclipse-like radial gradient background */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(147,51,234,0.2) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(40px)'
        }}
      />

      {/* Rest of the component remains the same */}
      <nav className="absolute top-0 left-0 w-full p-4 z-50">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="p-2 hover:bg-purple-900/20 rounded-lg transition-colors duration-300 backdrop-blur-sm"
        >
          <Menu size={24} className="text-purple-300 hover:text-purple-200" />
        </button>
        
        <div className={`
          fixed top-0 left-0 h-full w-64
          bg-gradient-to-r from-black/95 to-purple-950/30
          backdrop-blur-lg
          transform transition-transform duration-300 ease-in-out
          border-r border-purple-500/20
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="p-4 space-y-4">
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="p-2 hover:bg-purple-900/20 rounded-lg mb-8"
            >
              <X size={24} className="text-purple-300" />
            </button>
            <a href="#" className="block py-2 text-purple-300 hover:text-purple-200 transition-colors duration-300">About</a>
            <a href="#" className="block py-2 text-purple-300 hover:text-purple-200 transition-colors duration-300">Mission</a>
            <a href="#" className="block py-2 text-purple-300 hover:text-purple-200 transition-colors duration-300">Contact</a>
          </div>
        </div>
      </nav>

      <main className="flex flex-col items-center justify-center min-h-screen p-4 relative z-10">
        <div className="text-center space-y-8">
          <h1 className="text-6xl font-bold mb-4 tracking-wider">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-purple-200" 
                  style={{
                    textShadow: '0 0 20px rgba(147,51,234,0.3)',
                  }}>
              The Way
            </span>
          </h1>
          
          <div className="w-64 h-64 mx-auto mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
              <style>
                {`
                  @keyframes rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                  }
                  @keyframes pulse {
                    0% { opacity: 0.6; }
                    50% { opacity: 1; }
                    100% { opacity: 0.6; }
                  }
                  @keyframes dash {
                    to {
                      stroke-dashoffset: 0;
                    }
                  }
                  .outer-circle {
                    animation: rotate 20s linear infinite;
                    filter: drop-shadow(0 0 8px rgba(147,51,234,0.3));
                  }
                  .inner-path {
                    animation: pulse 3s ease-in-out infinite;
                    stroke-dasharray: 1000;
                    stroke-dashoffset: 1000;
                    animation: dash 3s ease-in-out infinite alternate;
                    filter: drop-shadow(0 0 3px rgba(147,51,234,0.5));
                  }
                `}
              </style>
              
              <circle 
                cx="100" 
                cy="100" 
                r="90" 
                fill="none" 
                stroke="rgba(147,51,234,0.3)" 
                strokeWidth="2"
                className="outer-circle"
              />
              
              <path 
                d="M60,40 L140,40 L140,160 L60,160 M80,100 L120,100"
                stroke="rgba(216,180,254,0.8)"
                strokeWidth="4"
                fill="none"
                className="inner-path"
              />
              
              <circle cx="100" cy="100" r="8" fill="rgba(216,180,254,0.8)" />
              <circle cx="100" cy="100" r="4" fill="rgba(147,51,234,0.8)" />
            </svg>
          </div>
          
          <p className="text-xl text-purple-200/80 mb-8 backdrop-blur-sm"
             style={{
               textShadow: '0 0 10px rgba(147,51,234,0.2)',
             }}>
            A new path forward is coming soon
          </p>
          
          <button className="
            bg-purple-500/20 hover:bg-purple-500/30
            text-purple-200 px-8 py-3 
            rounded-lg text-lg
            transform transition-all duration-300 
            hover:scale-105 hover:shadow-[0_0_15px_rgba(147,51,234,0.3)]
            border border-purple-500/30
            backdrop-blur-sm
          ">
            Join the Journey
          </button>
        </div>
      </main>
    </div>
  );
};

export default ComingSoonPage;
