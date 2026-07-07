import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 300);
    const t2 = setTimeout(() => setStage(2), 800);
    const t3 = setTimeout(() => setStage(3), 1300);
    const t4 = setTimeout(() => setStage(4), 1800);
    const t5 = setTimeout(() => onFinish(), 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gradient-primary overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/5 rounded-full animate-spin-slow" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-white/5 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }} />
        <div className="absolute top-1/4 right-10 w-16 h-16 bg-white/10 rounded-2xl rotate-45 animate-float" />
        <div className="absolute bottom-1/3 left-10 w-12 h-12 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
        <div className={`transition-all duration-700 ease-out ${stage >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          <div className="w-28 h-28 rounded-[28px] bg-white/20 backdrop-blur-xl flex items-center justify-center shadow-2xl overflow-hidden">
            <img src="/images/logo.png" alt="KamShat" className="w-24 h-24 object-cover rounded-2xl" />
          </div>
        </div>

        {/* App Name */}
        <div className={`mt-6 transition-all duration-700 ease-out ${stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Kam<span className="text-pink-200">Shat</span>
          </h1>
        </div>

        {/* Company */}
        <div className={`mt-2 transition-all duration-700 ease-out ${stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-white/80 text-sm font-medium tracking-wider uppercase">KamTech</p>
        </div>

        {/* Motto */}
        <div className={`mt-6 transition-all duration-700 ease-out ${stage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-white/60 text-xs italic">"Every Name Tells a Story"</p>
        </div>

        {/* Built by */}
        <div className={`mt-8 transition-all duration-700 ease-out ${stage >= 4 ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-white/40 text-[11px] font-medium">Built by Kamzy</p>
        </div>

        {/* Loading dots */}
        <div className={`mt-8 flex gap-1.5 transition-opacity duration-500 ${stage >= 2 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}
