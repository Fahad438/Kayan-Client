import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Mail, Linkedin, ChevronLeft, ChevronRight } from "lucide-react";
import team1 from "@assets/generated_images/Arab_businessman_team_member_8ac4ed4a.png";
import team2 from "@assets/generated_images/Arab_businesswoman_team_member_bed15ec4.png";
import team3 from "@assets/generated_images/Young_Arab_professional_c46bb4e5.png";

gsap.registerPlugin(ScrollTrigger);

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  { id: "1", name: "محمد الأحمد", role: "المدير التنفيذي", image: team1 },
  { id: "2", name: "سارة العتيبي", role: "مديرة التسويق", image: team2 },
  { id: "3", name: "خالد السعيد", role: "مدير الإنتاج", image: team3 },
  { id: "4", name: "نورة المطيري", role: "مديرة الفعاليات", image: team2 },
  { id: "5", name: "عبدالله القحطاني", role: "مدير التصميم", image: team1 },
  { id: "6", name: "ريم الدوسري", role: "مديرة المحتوى", image: team2 },
  { id: "7", name: "فهد الشمري", role: "مدير التصوير", image: team3 },
  { id: "8", name: "منى الزهراني", role: "مديرة العملاء", image: team2 },
];

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".team-header", {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;

    const scrollAmount = 320; // card width + gap
    const newScrollLeft =
      direction === "right"
        ? sliderRef.current.scrollLeft + scrollAmount
        : sliderRef.current.scrollLeft - scrollAmount;

    sliderRef.current.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 overflow-hidden  bg-[url(@assets/bg-3.png)] bg-no-repeat bg-cover "
      data-testid="team-section"
    >
      <div className="container mx-auto px-5 sm:px-6 md:px-8">
        {/* Header */}
        <div className="team-header text-center mb-10 sm:mb-12 md:mb-16">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4"
            data-testid="text-team-title"
          >
            فريق العمل
          </h2>
          <p
            className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4"
            data-testid="text-team-subtitle"
          >
            نخبة من المحترفين الذين يصنعون الفرق في كل مشروع
          </p>
        </div>

        {/* Team Slider - صف واحد */}
        <div className="max-w-7xl mx-auto">
          {/* Team Members Slider */}
          <div
            ref={sliderRef}
            className="flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-1 pb-2 mb-6 sm:mb-8"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex-shrink-0 w-64 sm:w-72 md:w-80"
              >
                <Card
                  className="overflow-hidden group/card hover-elevate active-elevate-2 transition-all duration-300 h-full"
                  data-testid={`card-team-${member.id}`}
                >
                  <div className="relative overflow-hidden aspect-square">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover/card:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 sm:pb-8">
                      <div className="flex gap-3">
                        <button
                          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-primary text-white flex items-center justify-center hover-elevate active-elevate-2"
                          data-testid={`button-email-${member.id}`}
                        >
                          <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        <button
                          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-primary text-white flex items-center justify-center hover-elevate active-elevate-2"
                          data-testid={`button-linkedin-${member.id}`}
                        >
                          <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 sm:p-6 text-center">
                    <h3
                      className="text-lg sm:text-xl font-bold text-foreground mb-2"
                      data-testid={`text-member-name-${member.id}`}
                    >
                      {member.name}
                    </h3>
                    <p
                      className="text-sm sm:text-base text-muted-foreground"
                      data-testid={`text-member-role-${member.id}`}
                    >
                      {member.role}
                    </p>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* Navigation Buttons - تحت الكاردات */}
          <div className="flex justify-center gap-3 sm:gap-4">
            <Button
              size="icon"
              variant="outline"
              onClick={() => scroll("left")}
              className="rounded-full bg-background border-border shadow-lg w-11 h-11 sm:w-12 sm:h-12"
              data-testid="button-team-prev"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => scroll("right")}
              className="rounded-full bg-background border-border shadow-lg w-11 h-11 sm:w-12 sm:h-12"
              data-testid="button-team-next"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Scroll Hint */}
        <p className="text-center text-xs text-muted-foreground mt-4 sm:mt-6 lg:hidden">
          أو اسحب لليمين أو اليسار لرؤية المزيد
        </p>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
