'use client';

export default function FallingParticles() {
  const particles = Array.from({ length: 120 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 150}%`,
    delay: `${Math.random() * 4}s`,
    duration: `${4 + Math.random() * 8}s`,
    size: `${1 + Math.random() * 3.5}px`,
    opacity: 0.2 + Math.random() * 1.6,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute top-[-10px] rounded-full bg-white"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animation: `particleFall ${p.duration} ${p.delay} linear infinite`,
          }}
        />
      ))}
      <style>{`
                @keyframes particleFall {
                    0%   { transform: translateY(-10px) translateX(0px); opacity: 0; }
                    10%  { opacity: 1; }
                    90%  { opacity: 1; }
                    100% { transform: translateY(110vh) translateX(20px); opacity: 0; }
                }
            `}</style>
    </div>
  );
}
