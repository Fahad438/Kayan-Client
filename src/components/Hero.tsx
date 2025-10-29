import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import heroImage from "@assets/Hero_1760940399397.png";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate content only - النص فقط
      gsap.from(contentRef.current?.children || [], {
        animationDelay: 5,
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        delay: 2.8,
        ease: "power3.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
      data-testid="hero-section"
    >
      {/* Full Background Image - Pegasus */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Pegasus - Kayan Al-Ihtiraf"
          className="w-full h-full object-cover object-center"
          style={{
            imageRendering: "-webkit-optimize-contrast",
            WebkitFontSmoothing: "antialiased",
          }}
        />

        {/* Dark Gradient Overlay - من اليمين لليسار */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#1a2332]/98 via-[#1a2332]/90 md:via-[#1a2332]/85 to-[#1a2332]/70 md:to-[#1a2332]/60" />

        {/* Additional Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-[#1a2332]/60 sm:bg-[#1a2332]/50 md:bg-[#1a2332]/40" />

        {/* Maroon Accent Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
      </div>

      {/* Decorative Blur Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-primary/15 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-1/3 left-1/3 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-blue-600/10 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 relative z-10 flex items-center pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 md:pb-16">
        <div
          ref={contentRef}
          className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 w-full"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content - Positioned on the Right for RTL */}
            <div className="text-right space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 lg:order-1">
              {/* Main Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.2] sm:leading-tight drop-shadow-2xl">
                كيان الاحتراف
              </h1>
              {/* Tagline */}
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/95 leading-relaxed drop-shadow-lg font-medium">
                نصنع التميز من خلال الابتكار والإبداع
              </p>
              {/* Description */}
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/85 leading-relaxed drop-shadow-md">
                نقدم حلولاً متكاملة في الاستشارات الإدارية والتطوير الفني
                والتسويق الرقمي لتحقيق أهدافك وتطوير أعمالك بأحدث الحلول التقنية
              </p>
              {/* CTA Buttons */}
              <div className="flex gap-3 sm:gap-4 flex-wrap pt-4 sm:pt-6 md:pt-8">
                <Button
                  size="lg"
                  className="bg-primary text-white hover:bg-primary/90 px-6 sm:px-7 md:px-8 text-sm sm:text-base md:text-lg rounded-full min-h-11 sm:min-h-12 md:min-h-13 shadow-2xl shadow-primary/50 font-semibold"
                  data-testid="button-request-service"
                >
                  طلب الخدمة
                  <ArrowLeft className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/40 text-white bg-white/15 backdrop-blur-md hover:bg-white/25 hover:border-white/60 px-6 sm:px-7 md:px-8 text-sm sm:text-base md:text-lg rounded-full min-h-11 sm:min-h-12 md:min-h-13 shadow-xl font-semibold"
                  data-testid="button-explore-services"
                >
                  استكشف خدماتنا
                </Button>
              </div>
            </div>

            {/* Video Player */}
            {/* <div className="lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm bg-white/10 border border-white/20">
                <div className="aspect-video">
                  <video
                    className="w-full h-full object-cover"
                    controls
                    poster="www.youtube.com/watch?si=nJZujTfnEFPuZ-8X&v=be5e-9IQyxE&feature=youtu.be"
                  >
                    <source
                      src="www.youtube.com/watch?si=nJZujTfnEFPuZ-8X&v=be5e-9IQyxE&feature=youtu.be"
                      type="video/mp4"
                    />
                    <source
                      src="www.youtube.com/watch?si=nJZujTfnEFPuZ-8X&v=be5e-9IQyxE&feature=youtu.be"
                      type="video/webm"
                    />
                    المتصفح الخاص بك لا يدعم تشغيل الفيديو
                  </video>
                </div>
              </div>
            </div> */}
            <div className="lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm bg-white/10 border border-white/20">
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/be5e-9IQyxE?autoplay=1&loop=1&mute=1&playlist=be5e-9IQyxE&controls=0"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Statistics Section - بنفس حجم ولون الصورة ومخفية في الجوال */}
      <div className="relative z-10 pb-6 hidden lg:block">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div
            className="grid grid-cols-4 gap-4 max-w-4xl mx-auto animate-fade-in-up"
            data-testid="stats-section"
            style={{
              animation: "fadeInUp 0.8s ease-out 1s both",
            }}
          >
            <div className="text-center py-4 px-6 rounded-lg bg-[#1a2332]/80 backdrop-blur-sm border border-white/5 hover-elevate transition-all">
              <div
                className="text-2xl font-bold text-primary mb-1 drop-shadow-lg tabular-nums"
                data-testid="stat-clients"
              >
                +500
              </div>
              <div className="text-xs text-white/70">عميل راضي</div>
            </div>
            <div className="text-center py-4 px-6 rounded-lg bg-[#1a2332]/80 backdrop-blur-sm border border-white/5 hover-elevate transition-all">
              <div
                className="text-2xl font-bold text-primary mb-1 drop-shadow-lg tabular-nums"
                data-testid="stat-projects"
              >
                +200
              </div>
              <div className="text-xs text-white/70">مشروع منجز</div>
            </div>
            <div className="text-center py-4 px-6 rounded-lg bg-[#1a2332]/80 backdrop-blur-sm border border-white/5 hover-elevate transition-all">
              <div
                className="text-2xl font-bold text-primary mb-1 drop-shadow-lg tabular-nums"
                data-testid="stat-years"
              >
                15+
              </div>
              <div className="text-xs text-white/70">سنة خبرة</div>
            </div>
            <div className="text-center py-4 px-6 rounded-lg bg-[#1a2332]/80 backdrop-blur-sm border border-white/5 hover-elevate transition-all">
              <div
                className="text-2xl font-bold text-primary mb-1 drop-shadow-lg tabular-nums"
                data-testid="stat-employees"
              >
                50+
              </div>
              <div className="text-xs text-white/70">موظف محترف</div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animation for Stats */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
