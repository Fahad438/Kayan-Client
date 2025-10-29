import { Card } from "../components/ui/card";
import { Target, Eye } from "lucide-react";
import Values from "../components/Values";
import Steps from "../components/Steps";

export default function About() {
  return (
    <div className="pt-16 sm:pt-20 md:pt-24 lg:pt-32" data-testid="about-page">
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
        <div className="relative container mx-auto px-5 sm:px-6 md:px-8 text-center text-white">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 md:mb-6"
            data-testid="text-about-title"
          >
            من نحن
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-4">
            تعرف على قصتنا ورؤيتنا في صناعة الاحترافية
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                2018
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                قصتنا
              </h2>
            </div>
            <Card className="p-8 md:p-12">
              <p className="text-lg text-foreground leading-relaxed mb-6">
                تأسست شركة كيان الاحتراف عام 2018 باعتقاد أن الفخامة هي المصدر
                الأقوى للمجالات الفنية والإبداعية المميزة.
              </p>
              <p className="text-lg text-foreground leading-relaxed mb-6">
                نحن مفتونون بالإبداع في كل خطوة مما يعكس الدقة والتميز في جميع
                أعمالنا.
              </p>
              <p className="text-lg text-foreground leading-relaxed">
                نسعى بريادة وشغف لنصنع تجارب استثنائية تترك أثراً عميقاً في كل
                تفاصيلها ونخلق مساحات ملهمة تُثري شركاء رحلتنا بكل إبداع.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 hover-elevate transition-all duration-300">
              <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                الرؤية
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                أن نرتقي بالمجالات الفنية والإبداعية ونسعى بريادة وشغف لنصنع
                تجارب استثنائية تترك أثراً عميقاً في كل تفاصيلها
              </p>
            </Card>

            <Card className="p-8 hover-elevate transition-all duration-300">
              <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                الرسالة
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                نخلق مساحات ملهمة تُثري شركاء رحلتنا بكل إبداع، من خلال تقديم
                حلول فنية وإبداعية متكاملة بأعلى معايير الجودة والاحترافية
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section - using same component as Home page */}
      <Values />

      <Steps />
    </div>
  );
}
