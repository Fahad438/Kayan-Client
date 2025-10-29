import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import logo from '@assets/logo.svg';

interface LoadingScreenProps {
  isLoading: boolean;
  onComplete?: () => void;
}

export default function LoadingScreen({ isLoading, onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!isLoading && containerRef.current) {
      // Exit animation
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete?.();
        }
      });

      tl.to(logoRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
      })
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      }, '-=0.2');
    } else if (isLoading && logoRef.current) {
      // Entry animation
      gsap.fromTo(
        logoRef.current,
        {
          scale: 0.5,
          opacity: 0,
          rotation: -10,
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
        }
      );

      // Pulse animation
      gsap.to(logoRef.current, {
        scale: 1.05,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }
  }, [isLoading, onComplete]);

  if (!isLoading && !containerRef.current) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-background via-card to-background"
      style={{ pointerEvents: isLoading ? 'auto' : 'none' }}
      data-testid="loading-screen"
    >
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Logo container */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="relative">
          <img
            ref={logoRef}
            src={logo}
            alt="كيان الاحتراف"
            className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 object-contain"
            data-testid="loading-logo"
          />
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full -z-10" />
        </div>

        {/* Loading dots */}
        <div className="flex gap-2">
          <div 
            className="w-3 h-3 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: '0s' }}
          />
          <div 
            className="w-3 h-3 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: '0.2s' }}
          />
          <div 
            className="w-3 h-3 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: '0.4s' }}
          />
        </div>

        {/* Loading text */}
        <p className="text-lg md:text-xl text-muted-foreground font-medium animate-pulse">
          جاري التحميل...
        </p>
      </div>
    </div>
  );
}
