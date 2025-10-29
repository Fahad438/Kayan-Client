import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, Lightbulb, Wrench, Rocket, TrendingUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: "1",
    title: "التحليل والفهم",
    description:
      "نستمع باهتمام لتفاصيل العميل ونحلل احتياجاته والجمهور المستهدف لفهم التحديات والفرص.",
    icon: Search,
  },
  {
    id: "2",
    title: "التخطيط",
    description:
      "نضع خطة واضحة تشمل الأهداف، الموارد، والجدول الزمني مع مؤشرات أداء قابلة للقياس.",
    icon: Lightbulb,
  },
  {
    id: "3",
    title: "الإعداد",
    description:
      "نجهز كل المتطلبات الفنية واللوجستية، وننسق بين فرق العمل لضمان الجاهزية الكاملة.",
    icon: Wrench,
  },
  {
    id: "4",
    title: "التنفيذ",
    description:
      "تنفيذ المشروع وإطلاقه للفئة المستهدفة وفق أعلى معايير الاحترافية.",
    icon: Rocket,
  },
  {
    id: "5",
    title: "التحسين",
    description:
      "مراجعة النتائج وقياس مدى تحقيق الأهداف مع تقديم تقارير وتوصيات للتطوير المستقبلي.",
    icon: TrendingUp,
  },
];

export default function Steps() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate timeline line
      gsap.from(".timeline-line", {
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
        scaleY: 0,
        transformOrigin: "top",
      });

      // Animate each step card
      const cards = document.querySelectorAll(".step-card");
      cards.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=50",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          x: index % 2 === 0 ? 50 : -50,
          duration: 0.6,
          ease: "power3.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 bg-background overflow-hidden"
      data-testid="steps-section"
    >
      <div className="container mx-auto px-5 sm:px-6 md:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4">
            خطوات العمل
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            منهجية واضحة لتحقيق أهدافك
          </p>
        </div>

        <div ref={timelineRef} className="relative max-w-5xl mx-auto">
          {/* Vertical Timeline Line - Gradient */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 timeline-line hidden md:block overflow-hidden rounded-full">
            <div className="w-full h-full bg-gradient-to-b from-primary via-primary/70 to-primary/30" />
          </div>

          {/* Steps */}
          <div className="space-y-6 sm:space-y-8 md:space-y-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.id}
                  className={`step-card relative flex items-center ${
                    index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                  }`}
                >
                  {/* Icon Circle - في المنتصف للديسكتوب */}
                  <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 text-white items-center justify-center z-10 shadow-xl border-4 border-background">
                    <Icon className="w-7 h-7" strokeWidth={2.5} />
                  </div>

                  {/* Spacer for half width */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Step Content Card */}
                  <div className="w-full md:w-1/2 md:px-8">
                    <div className="group bg-card border border-border rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-lg hover-elevate active-elevate-2 transition-all relative overflow-hidden">
                      {/* Decorative gradient background on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="relative z-10">
                        {/* Mobile Icon - محسّن للجوال */}
                        <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4 md:hidden">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 text-white flex items-center justify-center shadow-lg flex-shrink-0">
                            <Icon
                              className="w-6 h-6 sm:w-7 sm:h-7"
                              strokeWidth={2.5}
                            />
                          </div>
                          <div className="flex-1 pt-1">
                            <h3 className="text-lg sm:text-xl font-bold text-foreground leading-tight">
                              {step.title}
                            </h3>
                          </div>
                        </div>

                        {/* Desktop Title */}
                        <h3 className="hidden md:block text-xl lg:text-2xl font-bold text-foreground mb-3 md:mb-4 group-hover:text-primary transition-colors">
                          {step.title}
                        </h3>

                        <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* End Point */}
          <div className="hidden md:flex justify-center mt-8">
            <div className="w-4 h-4 rounded-full bg-primary shadow-lg animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
