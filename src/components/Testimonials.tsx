import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: string;
  name: string;
  company: string;
  text: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "أحمد الغامدي",
    company: "شركة التقنية المتقدمة",
    text: "تجربة رائعة مع كيان الاحتراف. فريق محترف وملتزم بالمواعيد، وجودة العمل فاقت توقعاتنا. نوصي بهم بشدة.",
    rating: 5,
  },
  {
    id: "2",
    name: "فاطمة المالكي",
    company: "مؤسسة الأعمال الناشئة",
    text: "ساعدونا في تنظيم مؤتمرنا السنوي بشكل احترافي. كل التفاصيل كانت مدروسة بعناية فائقة.",
    rating: 5,
  },
  {
    id: "3",
    name: "سعود العنزي",
    company: "مجموعة الابتكار",
    text: "حملتنا التسويقية حققت نتائج مذهلة بفضل إبداع فريق كيان. شكراً لكم على الجهود المبذولة.",
    rating: 5,
  },
  {
    id: "4",
    name: "نوف السبيعي",
    company: "شركة الحلول الذكية",
    text: "جودة الإنتاج والتصوير كانت استثنائية. فريق محترف يفهم متطلبات العميل ويحققها بتميز.",
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 bg-background"
      data-testid="testimonials-section"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
            data-testid="text-testimonials-title"
          >
            قالوا عنا
          </h2>
          <p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            data-testid="text-testimonials-subtitle"
          >
            آراء عملائنا وشركائنا في رحلة النجاح
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {testimonials
              .slice(currentIndex, currentIndex + 2)
              .concat(
                testimonials.slice(
                  0,
                  Math.max(0, currentIndex + 2 - testimonials.length)
                )
              )
              .slice(0, 2)
              .map((testimonial) => (
                <Card
                  key={testimonial.id}
                  className="testimonial-card p-8 bg-card hover-elevate transition-all duration-300"
                  data-testid={`card-testimonial-${testimonial.id}`}
                >
                  <Quote className="text-primary w-12 h-12 mb-4" />
                  <p
                    className="text-foreground text-lg mb-6 leading-relaxed"
                    data-testid={`text-testimonial-${testimonial.id}`}
                  >
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <div>
                    <h4
                      className="font-bold text-foreground"
                      data-testid={`text-client-name-${testimonial.id}`}
                    >
                      {testimonial.name}
                    </h4>
                    <p
                      className="text-muted-foreground text-sm"
                      data-testid={`text-client-company-${testimonial.id}`}
                    >
                      {testimonial.company}
                    </p>
                  </div>
                </Card>
              ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4">
            <Button
              size="icon"
              variant="outline"
              onClick={prevTestimonial}
              data-testid="button-prev-testimonial"
              className="rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-primary w-8"
                      : "bg-muted-foreground/30"
                  }`}
                  data-testid={`button-dot-${index}`}
                />
              ))}
            </div>
            <Button
              size="icon"
              variant="outline"
              onClick={nextTestimonial}
              data-testid="button-next-testimonial"
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
