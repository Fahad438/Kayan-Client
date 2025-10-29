import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Card } from "../components/ui/card";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

const categories = ["الكل", "إنتاج", "تسويق رقمي", "فعاليات"];

// TODO: remove mock functionality - replace with real portfolio data
const portfolioItems = [
  {
    id: "1",
    title: "حملة إعلانية لشركة تقنية",
    category: "تسويق رقمي",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
  },
  {
    id: "2",
    title: "إنتاج فيديو سينمائي",
    category: "إنتاج",
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600",
  },
  {
    id: "3",
    title: "تنظيم معرض تجاري",
    category: "فعاليات",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600",
  },
  {
    id: "4",
    title: "تصميم هوية بصرية",
    category: "تسويق رقمي",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600",
  },
  {
    id: "5",
    title: "تصوير جوي لمشروع عقاري",
    category: "إنتاج",
    image: "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=600",
  },
  {
    id: "6",
    title: "مؤتمر سنوي",
    category: "فعاليات",
    image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600",
  },
  {
    id: "7",
    title: "حملة وسائل التواصل",
    category: "تسويق رقمي",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600",
  },
  {
    id: "8",
    title: "فيديو موشن جرافيك",
    category: "إنتاج",
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600",
  },
  {
    id: "9",
    title: "حفل إطلاق منتج",
    category: "فعاليات",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600",
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);

    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Animate header
      gsap.from(".g-header", {
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
  const [selectedCategory, setSelectedCategory] = useState("الكل");

  const filteredItems =
    selectedCategory === "الكل"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedCategory);

  return (
    <div
      ref={sectionRef}
      className="pt-16 sm:pt-20 md:pt-24 lg:pt-32"
      data-testid="portfolio-page"
    >
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
          style={{ animationDelay: '1s' }}
        />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-5 sm:px-6 md:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-5 md:mb-6">
              معرض الأعمال
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
              أرشيف لأهم الأعمال والإنجازات التي حققناها مع شركائنا
            </p>
          </div>
        </div>
      </section>


      {/* Portfolio Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                data-testid={`button-filter-${category}`}
                className="px-6"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Portfolio Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Link
                key={item.id}
                href={`/portfolio/${item.id}`}
                ref={addToRefs}
              >
                <Card
                  className="group overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 cursor-pointer"
                  data-testid={`card-portfolio-${item.id}`}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <Badge variant="default" className="bg-primary">
                        {item.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
