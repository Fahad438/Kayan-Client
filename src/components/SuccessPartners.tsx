import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const partners = [
  {
    id: "1",
    name: "شريك 1",
    logo: "https://logo.clearbit.com/stc.com.sa",
  },
  {
    id: "2",
    name: "شريك 2",
    logo: "https://logo.clearbit.com/aramco.com",
  },
  {
    id: "3",
    name: "شريك 3",
    logo: "https://logo.clearbit.com/sabic.com",
  },
  {
    id: "4",
    name: "شريك 4",
    logo: "https://logo.clearbit.com/alrajhibank.com.sa",
  },
  {
    id: "5",
    name: "شريك 5",
    logo: "https://logo.clearbit.com/saudia.com",
  },
  {
    id: "6",
    name: "شريك 6",
    logo: "https://logo.clearbit.com/mobily.com.sa",
  },
  {
    id: "7",
    name: "شريك 7",
    logo: "https://logo.clearbit.com/zain.com",
  },
  {
    id: "8",
    name: "شريك 8",
    logo: "https://logo.clearbit.com/almarai.com",
  },
  {
    id: "9",
    name: "شريك 9",
    logo: "https://logo.clearbit.com/alfanar.com",
  },
  {
    id: "10",
    name: "شريك 10",
    logo: "https://logo.clearbit.com/sadafco.com",
  },
  {
    id: "11",
    name: "شريك 11",
    logo: "https://logo.clearbit.com/alinma.com",
  },
  {
    id: "12",
    name: "شريك 12",
    logo: "https://logo.clearbit.com/sabb.com",
  },
  {
    id: "14",
    name: "شريك 14",
    logo: "https://logo.clearbit.com/maaden.com.sa",
  },
  {
    id: "15",
    name: "شريك 15",
    logo: "https://logo.clearbit.com/saudiairlines.com",
  },
];

export default function SuccessPartners() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollRef2 = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".partners-header", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center+=100",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power3.out",
      });

      if (scrollRef.current) {
        const items = scrollRef.current.children;
        const itemWidth = items[0]?.getBoundingClientRect().width || 0;
        const gap = 24;
        const singleRowWidth = (itemWidth + gap) * partners.length;

        // اجعل البداية من اليمين لأن الموقع عربي (RTL)
        gsap.set(scrollRef.current, { x: 0 });

        gsap.to(scrollRef.current, {
          x: singleRowWidth,
          duration: 50,
          ease: "none",
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize((x) => parseFloat(x) % singleRowWidth),
          },
        });
      }
      if (scrollRef2.current) {
        const items = scrollRef2.current.children;
        const itemWidth = items[0]?.getBoundingClientRect().width || 0;
        const gap = 24;
        const singleRowWidth = (itemWidth + gap) * partners.length;

        // اجعل البداية من اليمين لأن الموقع عربي (RTL)
        gsap.set(scrollRef2.current, { x: singleRowWidth });

        gsap.to(scrollRef2.current, {
          x: -singleRowWidth, // 🔹 عكس الاتجاه (لليسار)
          duration: 110,
          ease: "none",
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize((x) => parseFloat(x) % singleRowWidth),
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 bg-card overflow-hidden relative"
      data-testid="success-partners-section"
    >
      {/* Envelope Pattern Background - واضح جداً */}

      <div className="container mx-auto px-5 sm:px-6 md:px-8 relative z-10">
        <div className="partners-header text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4">
            شركاء النجاح
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            فخورون بثقة شركائنا في رحلتنا نحو النجاح
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="overflow-hidden">
            <div ref={scrollRef} className="flex gap-6">
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="flex-shrink-0 w-56 h-32 transition-all p-4 flex items-center justify-center"
                  data-testid={`partner-${partner.id}`}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain transition-all duration-300"
                  />
                </div>
              ))}
              {partners.map((partner) => (
                <div
                  key={`${partner.id}-dup1`}
                  className="flex-shrink-0 w-56 h-32 transition-all p-4 flex items-center justify-center"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain transition-all duration-300"
                  />
                </div>
              ))}
              {partners.map((partner) => (
                <div
                  key={`${partner.id}-dup2`}
                  className="flex-shrink-0 w-56 h-32 transition-all p-4 flex items-center justify-center"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain transition-all duration-300"
                  />
                </div>
              ))}
            </div>
            <div ref={scrollRef2} className="flex gap-6">
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="flex-shrink-0 w-56 h-32 transition-all p-4 flex items-center justify-center"
                  data-testid={`partner-${partner.id}`}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain transition-all duration-300"
                  />
                </div>
              ))}
              {partners.map((partner) => (
                <div
                  key={`${partner.id}-dup1`}
                  className="flex-shrink-0 w-56 h-32 transition-all p-4 flex items-center justify-center"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain transition-all duration-300"
                  />
                </div>
              ))}
              {partners.map((partner) => (
                <div
                  key={`${partner.id}-dup2`}
                  className="flex-shrink-0 w-56 h-32 transition-all p-4 flex items-center justify-center"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain transition-all duration-300"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}