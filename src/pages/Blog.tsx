import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// بيانات مقالات المدونة (نموذجية)
const blogPosts = [
  {
    id: "1",
    title: "أهمية التسويق الرقمي في العصر الحديث",
    excerpt:
      "كيف يمكن للتسويق الرقمي أن يغير مسار عملك ويصل بك إلى جمهور أوسع وأكثر استهدافاً في عالم اليوم الرقمي",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    category: "التسويق الرقمي",
    author: "سارة العتيبي",
    date: "15 أكتوبر 2025",
    readTime: "5 دقائق",
  },
  {
    id: "2",
    title: "كيف تخطط لفعالية ناجحة",
    excerpt:
      "دليلك الشامل لتخطيط وتنظيم الفعاليات بطريقة احترافية تضمن تجربة مميزة للحضور وتحقق أهدافك",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
    category: "إدارة الفعاليات",
    author: "خالد السعيد",
    date: "12 أكتوبر 2025",
    readTime: "7 دقائق",
  },
  {
    id: "3",
    title: "سر الإنتاج السينمائي المتميز",
    excerpt:
      "اكتشف أسرار إنتاج محتوى مرئي عالي الجودة يترك أثراً لا يُنسى في نفوس المشاهدين",
    image:
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&h=600&fit=crop",
    category: "الإنتاج",
    author: "فهد الشمري",
    date: "10 أكتوبر 2025",
    readTime: "6 دقائق",
  },
  {
    id: "4",
    title: "تصميم المعارض: فن الجذب البصري",
    excerpt:
      "كيف يمكن للتصميم الإبداعي للمعارض أن يحول مساحتك إلى تجربة تفاعلية لا تُنسى",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    category: "تنظيم المعارض",
    author: "نورة المطيري",
    date: "8 أكتوبر 2025",
    readTime: "5 دقائق",
  },
  {
    id: "5",
    title: "استراتيجيات المحتوى الناجح",
    excerpt:
      "تعرف على أفضل الاستراتيجيات لإنشاء محتوى جذاب يحقق أهدافك التسويقية ويبني علاقة قوية مع جمهورك",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop",
    category: "التسويق الرقمي",
    author: "ريم الدوسري",
    date: "5 أكتوبر 2025",
    readTime: "8 دقائق",
  },
  {
    id: "6",
    title: "الابتكار في عالم الأعمال",
    excerpt:
      "لماذا يعتبر الابتكار المحرك الأساسي للنمو والتميز في عالم الأعمال المعاصر",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop",
    category: "الأعمال",
    author: "عبدالله القحطاني",
    date: "1 أكتوبر 2025",
    readTime: "6 دقائق",
  },
];

export default function Blog() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);

    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Animate header
      gsap.from(".blog-header", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power3.out",
      });

      // Animate blog cards
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
    <div ref={sectionRef} className="pt-16 sm:pt-20 md:pt-24 lg:pt-32">
      {/* Hero Section */}
      <section
        className="relative py-12 sm:py-16 md:py-20 lg:py-32 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop')",
        }}
      >
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2332]/95 to-[#1a2332]/80" />

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 bg-blue-600/10 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-5 sm:px-6 md:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-5 md:mb-6">
              المدونة
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
              اكتشف أحدث الأفكار والاستراتيجيات في عالم الإنتاج، التسويق الرقمي،
              وإدارة الفعاليات
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 sm:py-16 md:py-20 bg-background">
        <div className="container mx-auto px-5 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8 max-w-7xl mx-auto">
            {blogPosts.map((post) => (
              <div key={post.id} ref={addToRefs}>
                <Card className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 h-full flex flex-col group">
                  {/* Post Image */}
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4">
                      <div className="bg-primary text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                        {post.category}
                      </div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col">
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3 sm:mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        <span>{post.author}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-tight">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-5 flex-1">
                      {post.excerpt}
                    </p>

                    {/* Read More */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-xs text-muted-foreground">
                        وقت القراءة: {post.readTime}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-primary/80 p-0 h-auto"
                      >
                        اقرأ المزيد
                        <ArrowLeft className="mr-1.5 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-10 sm:mt-12 md:mt-16">
            <Button
              size="lg"
              variant="outline"
              className="px-6 sm:px-7 md:px-8 text-sm sm:text-base rounded-full"
            >
              عرض المزيد من المقالات
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
