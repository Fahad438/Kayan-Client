import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "@/components/ui/card";
import { Zap, Crown, Gem, Lightbulb } from "lucide-react";
import chessImage1 from "@assets/Gemini_Generated_Image_iqg7oliqg7oliqg7_1760957819941.png";
import chessImage2 from "@assets/Gemini_Generated_Image_wtmm6lwtmm6lwtmm_1760957819941.png";
import chessImage3 from "@assets/Gemini_Generated_Image_7681s27681s27681_1760957819941.png";
import chessImage4 from "@assets/Gemini_Generated_Image_eae1zzeae1zzeae1_1760957819942.png";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    id: "1",
    title: "الالتزام والسرعة",
    description:
      "ندرك تماماً أهمية السرعة في الإنجاز، ومسابقة الزمن لتحقيق التطلعات دائماً.",
    icon: <Zap className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
    bgImage: chessImage1,
  },
  {
    id: "2",
    title: "الكفاءة والجودة",
    description:
      "نحرص على إخراج كافة الخدمات بجودة عالية، وبدقة تضمن الوصول لأفضل النتائج في مجالات عملنا.",
    icon: <Crown className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
    bgImage: chessImage2,
  },
  {
    id: "3",
    title: "التكامل والتزامن",
    description:
      "نبذل كافة الجهود، ونسخر الإمكانيات الفنية والهندسية والتقنية لعملائنا، حتى نصل سوياً إلى عمل متكامل.",
    icon: <Gem className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
    bgImage: chessImage3,
  },
  {
    id: "4",
    title: "التميز والابتكار",
    description:
      "نؤمن أن الابتكار هو العلامة الفارقة في جودة الأعمال، لذلك جعلناه أسلوبنا الذي نسعى من خلاله لرسم الأثر.",
    icon: <Lightbulb className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
    bgImage: chessImage4,
  },
];

export default function Values() {
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
      className="py-12 sm:py-16 md:py-20  bg-[url(@assets/pattrn.jpg)] bg-no-repeat bg-cover bg-center"
      data-testid="values-section"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4">
            قيمنا
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            قيم راسخة تحرك كل إنجاز
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 max-w-5xl mx-auto">
          {values.map((value) => (
            <div key={value.id} ref={addToRefs}>
              <Card
                className="relative p-5 sm:p-6 md:p-8 hover-elevate active-elevate-2 transition-all duration-300 h-full overflow-hidden group"
                data-testid={`card-value-${value.id}`}
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <img
                    src={value.bgImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/85" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-4 sm:mb-5 md:mb-6 text-primary group-hover:bg-primary/20 transition-colors duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground mb-3 sm:mb-3 md:mb-4">
                    {value.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
