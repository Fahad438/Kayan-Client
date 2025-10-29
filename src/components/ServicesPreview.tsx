import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Megaphone, Calendar, Sparkles, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "1",
    title: "الإنتاج",
    description:
      "من الاستشارات الإنتاجية إلى إنتاج الأعمال السينمائية والصوتية وتصوير الفيديو والدرون",
    icon: Video,
    gradient: "from-purple-600/20 via-blue-600/20 to-indigo-600/20",
    bgImage:
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&h=600&fit=crop",
  },
  {
    id: "2",
    title: "التسويق الرقمي والإعلامي",
    description:
      "إدارة وسائل التواصل الاجتماعي، الحملات التسويقية، صناعة المحتوى وابتكار المنتجات التسويقية",
    icon: Megaphone,
    gradient: "from-pink-600/20 via-rose-600/20 to-red-600/20",
    bgImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
  },
  {
    id: "3",
    title: "تنظيم المعارض",
    description:
      "تخطيط وتنظيم المعارض والمؤتمرات، تصميم وبناء المساحات والدعم الفني واللوجستي",
    icon: Sparkles,
    gradient: "from-amber-600/20 via-orange-600/20 to-yellow-600/20",
    bgImage:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
  },
  {
    id: "4",
    title: "إدارة الفعاليات",
    description:
      "تخطيط وتنظيم الفعاليات، إدارة الحضور والتنسيق، التجهيزات التقنية والإخراج المسرحي",
    icon: Calendar,
    gradient: "from-emerald-600/20 via-teal-600/20 to-cyan-600/20",
    bgImage:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
  },
];

export default function ServicesPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);

    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=50",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 50,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power3.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-12 sm:py-16 md:py-20 bg-background overflow-hidden"
      data-testid="services-preview-section"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-primary/5 rounded-full blur-[120px] animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 bg-blue-600/5 rounded-full blur-[100px] animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="container mx-auto px-5 sm:px-6 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4">
            خدماتنا
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            حلول إبداعية متكاملة في الإنتاج، التسويق الرقمي، وإدارة الفعاليات
          </p>
        </div>

        {/* Services Grid - عرض الأربعة */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 max-w-7xl mx-auto mb-8 sm:mb-10 md:mb-12 px-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.id} 
                ref={addToRefs}
                className="relative"
                style={{ 
                  perspective: '1500px',
                  minHeight: '400px'
                }}
              >
                {/* 3D Card Container */}
                <div
                  className="relative w-full h-full group cursor-pointer"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: `rotateX(${5 + index * 2}deg) rotateY(${-3 - index * 1}deg) rotateZ(${index % 2 === 0 ? -2 : 2}deg)`,
                    transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateY(-15px) scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = `rotateX(${5 + index * 2}deg) rotateY(${-3 - index * 1}deg) rotateZ(${index % 2 === 0 ? -2 : 2}deg) translateY(0px) scale(1)`;
                  }}
                >
                  {/* Card Paper Effect */}
                  <div
                    className="relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden"
                    style={{
                      boxShadow: '0 25px 70px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.1)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    {/* Image at Top */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={service.bgImage}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-60`} />

                      {/* Icon on Image */}
                      {/* <div className="absolute top-4 right-4">
                        <div 
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                          style={{
                            background: `linear-gradient(135deg, ${
                              index === 0 ? '#8b5cf6, #6366f1' :
                              index === 1 ? '#ec4899, #ef4444' :
                              index === 2 ? '#f59e0b, #eab308' :
                              '#10b981, #14b8a6'
                            })`,
                            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                          }}
                        >
                          <Icon className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2.5} />
                        </div>
                      </div> */}
                    </div>

                    {/* Content Below Image */}
                    <div className="relative z-10 p-5 sm:p-6">
                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Decorative Line */}
                      <div 
                        className="mt-4 h-1 rounded-full transition-all duration-300 group-hover:w-full"
                        style={{
                          width: '50px',
                          background: `linear-gradient(90deg, ${
                            index === 0 ? '#8b5cf6, #6366f1' :
                            index === 1 ? '#ec4899, #ef4444' :
                            index === 2 ? '#f59e0b, #eab308' :
                            '#10b981, #14b8a6'
                          })`,
                        }}
                      />
                    </div>

                    {/* Paper Corner Shadow */}
                    <div 
                      className="absolute bottom-0 right-0 w-20 h-20 opacity-20 pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.2) 50%)',
                      }}
                    />
                  </div>

                  {/* 3D Depth Effect - Shadow Layers */}
                  <div
                    className="absolute inset-0 bg-gray-400 dark:bg-gray-700 rounded-2xl -z-10"
                    style={{
                      transform: 'translateZ(-15px)',
                      filter: 'blur(3px)',
                      opacity: 0.5,
                    }}
                  />
                  <div
                    className="absolute inset-0 bg-gray-300 dark:bg-gray-800 rounded-2xl -z-20"
                    style={{
                      transform: 'translateZ(-30px)',
                      filter: 'blur(5px)',
                      opacity: 0.3,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Services Button */}
        <div className="text-center">
          <Link href="/services">
            <Button
              size="lg"
              className="bg-primary text-white hover:bg-primary/90 px-6 sm:px-7 md:px-8 text-sm sm:text-base md:text-lg rounded-full min-h-11 sm:min-h-12 shadow-lg"
              data-testid="button-view-all-services"
            >
              استكشف جميع الخدمات
              <ArrowLeft className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}