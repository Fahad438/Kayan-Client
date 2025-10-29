import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Palette,
  Camera,
  Video,
  Edit,
  ImageIcon,
  Share2,
  Target,
  Lightbulb,
  FileText,
  Calendar,
  Layout,
  Users,
  Gift,
  Wrench,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
}

const productionServices: Service[] = [
  {
    id: "1",
    title: "الاستشارات الإنتاجية والإخراجية",
    description:
      "نحرص على إفراز كافة الخدمات بجودة عالية، بجودة تضمن الوصول لأفضل النتائج في مجالات عملنا",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop",
    category: "production",
  },
  {
    id: "2",
    title: "إنتاج الأعمال الصوتية والفنية",
    description: "إنتاج محتوى صوتي وفني بجودة عالمية يلبي احتياجاتك الإبداعية",
    image:
      "https://images.unsplash.com/photo-1511376777868-31f8a42b3cd2?w=800&h=600&fit=crop",
    category: "production",
  },
  {
    id: "3",
    title: "تصوير الفيديوهات والدرون",
    description:
      "خدمات تصوير احترافية باستخدام أحدث المعدات والطائرات بدون طيار",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
    category: "production",
  },
  {
    id: "4",
    title: "إنتاج الإعلانات السينمائية",
    description:
      "إنتاج إعلانات سينمائية بجودة عالمية من الفكرة حتى الإخراج النهائي",
    image:
      "https://images.unsplash.com/photo-1483721310020-03333e577078?w=800&h=600&fit=crop",
    category: "production",
  },
  {
    id: "5",
    title: "المونتاج والتحرير المرئي والصوتي",
    description:
      "خدمات مونتاج وتحرير متقدمة لإنتاج محتوى مرئي وصوتي بأعلى معايير الجودة",
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&h=600&fit=crop",
    category: "production",
  },
  {
    id: "6",
    title: "المطبوعات الإعلامية والتسويقية",
    description:
      "تصميم وإنتاج مطبوعات إعلامية وتسويقية بجودة عالية وتصاميم جذابة",
    image:
      "https://images.unsplash.com/photo-1498050108023-7f1e52bfe3b7?w=800&h=600&fit=crop",
    category: "production",
  },
  {
    id: "7",
    title: "الصور الإعلانية الفوتوغرافية",
    description:
      "تصوير فوتوغرافي احترافي للمنتجات والأشخاص والفعاليات بأحدث المعدات",
    image:
      "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=800&h=600&fit=crop",
    category: "production",
  },
  {
    id: "8",
    title: "تصوير المناسبات والإخراج المباشر",
    description: "تغطية شاملة للمناسبات والفعاليات مع بث مباشر احترافي",
    image:
      "https://images.unsplash.com/photo-1508385082359-037986715702?w=800&h=600&fit=crop",
    category: "production",
  },
  {
    id: "9",
    title: "التصميم الثابت والمتحرك وثنائي الأبعاد",
    description: "تصميمات إبداعية ثابتة ومتحركة تلبي احتياجاتك البصرية",
    image:
      "https://images.unsplash.com/photo-1498050108023-7f1e52bfe3b7?w=800&h=600&fit=crop",
    category: "production",
  },
];

const marketingServices: Service[] = [
  {
    id: "10",
    title: "الإستشارات التسويقية والإعلامية",
    description: "استشارات متخصصة لبناء استراتيجيات تسويقية وإعلامية ناجحة",
    image:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da2?w=800&h=600&fit=crop",
    category: "marketing",
  },
  {
    id: "11",
    title: "إدارة وسائل التواصل الاجتماعي",
    description:
      "إدارة شاملة لحساباتك على منصات التواصل الاجتماعي لبناء حضور قوي وتفاعل مستمر",
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&h=600&fit=crop",
    category: "marketing",
  },
  {
    id: "12",
    title: "إدارة الحملات التسويقية والإعلانية",
    description:
      "تخطيط وتنفيذ حملات تسويقية متكاملة تحقق أهدافك وتصل لجمهورك المستهدف",
    image:
      "https://images.unsplash.com/photo-1508385082359-037986715702?w=800&h=600&fit=crop",
    category: "marketing",
  },
  {
    id: "13",
    title: "تنسيق الظهور الإعلامي",
    description: "تنظيم وتنسيق الظهور الإعلامي لتعزيز حضورك في وسائل الإعلام",
    image:
      "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=800&h=600&fit=crop",
    category: "marketing",
  },
  {
    id: "14",
    title: "صناعة المحتوى",
    description: "إنتاج محتوى إبداعي متنوع يجذب جمهورك ويعزز هويتك التجارية",
    image:
      "https://images.unsplash.com/photo-1498050108023-7f1e52bfe3b7?w=800&h=600&fit=crop",
    category: "marketing",
  },
  {
    id: "15",
    title: "بناء الأدلة والنماذج التسويقية",
    description: "تطوير أدلة ونماذج تسويقية شاملة تسهل عملك وتحسن نتائجك",
    image:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da2?w=800&h=600&fit=crop",
    category: "marketing",
  },
  {
    id: "16",
    title: "ابتكار المنتجات التسويقية",
    description: "تطوير منتجات تسويقية مبتكرة تميز علامتك التجارية",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop",
    category: "marketing",
  },
  {
    id: "17",
    title: "إدارة حملات المؤثرين والدعوة",
    description: "تخطيط وإدارة حملات المؤثرين للوصول لجمهور أوسع",
    image:
      "https://images.unsplash.com/photo-1511376777868-31f8a42b3cd2?w=800&h=600&fit=crop",
    category: "marketing",
  },
];

const exhibitionsServices: Service[] = [
  {
    id: "18",
    title: "الاستشارات الفنية والتنظيمية",
    description: "استشارات متخصصة في تنظيم وإدارة المعارض بكفاءة عالية",
    image:
      "https://images.unsplash.com/photo-1498050108023-7f1e52bfe3b7?w=800&h=600&fit=crop",
    category: "exhibitions",
  },
  {
    id: "19",
    title: "تخطيط وتنظيم المعارض والمؤتمرات",
    description:
      "تنظيم شامل للمعارض والمؤتمرات من التخطيط حتى التنفيذ بكل تفاصيله",
    image:
      "https://images.unsplash.com/photo-1508385082359-037986715702?w=800&h=600&fit=crop",
    category: "exhibitions",
  },
  {
    id: "20",
    title: "تصميم وبناء المساحات",
    description: "تصميم وتنفيذ أجنحة ومساحات عرض مبتكرة وجذابة",
    image:
      "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=800&h=600&fit=crop",
    category: "exhibitions",
  },
  {
    id: "21",
    title: "التجهيزات التقنية للمعارض",
    description: "توفير وتركيب جميع التجهيزات التقنية اللازمة للمعارض",
    image:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da2?w=800&h=600&fit=crop",
    category: "exhibitions",
  },
  {
    id: "22",
    title: "المواد التسويقية للمعرض",
    description: "تصميم وإنتاج جميع المواد التسويقية والإعلانية للمعرض",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop",
    category: "exhibitions",
  },
  {
    id: "23",
    title: "إدارة الحضور والتنسيق",
    description: "إدارة احترافية للحضور والعارضين لضمان تجربة سلسة",
    image:
      "https://images.unsplash.com/photo-1511376777868-31f8a42b3cd2?w=800&h=600&fit=crop",
    category: "exhibitions",
  },
  {
    id: "24",
    title: "تصميم وصناعة الهدايا التذكارية المبتكرة",
    description: "تصميم وإنتاج هدايا تذكارية فريدة تترك انطباعاً دائماً",
    image:
      "https://images.unsplash.com/photo-1498050108023-7f1e52bfe3b7?w=800&h=600&fit=crop",
    category: "exhibitions",
  },
  {
    id: "25",
    title: "الدعم الفني واللوجستي",
    description: "دعم فني ولوجستي شامل لضمان نجاح معرضك بكل سلاسة",
    image:
      "https://images.unsplash.com/photo-1508385082359-037986715702?w=800&h=600&fit=crop",
    category: "exhibitions",
  },
];

const eventsServices: Service[] = [
  {
    id: "26",
    title: "الاستشارات الفنية والتنظيمية",
    description: "استشارات متخصصة في تنظيم وإدارة الفعاليات بكفاءة عالية",
    image:
      "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=800&h=600&fit=crop",
    category: "events",
  },
  {
    id: "27",
    title: "تخطيط وتنظيم الفعاليات",
    description: "تنظيم شامل للفعاليات من التخطيط حتى التنفيذ بكل تفاصيلها",
    image:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da2?w=800&h=600&fit=crop",
    category: "events",
  },
  {
    id: "28",
    title: "إدارة الحضور والتنسيق",
    description: "إدارة احترافية للحضور والضيوف لضمان تجربة سلسة ومميزة",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop",
    category: "events",
  },
  {
    id: "29",
    title: "الدعم الفني واللوجستي",
    description: "دعم فني ولوجستي شامل لضمان نجاح فعاليتك بكل سلاسة",
    image:
      "https://images.unsplash.com/photo-1511376777868-31f8a42b3cd2?w=800&h=600&fit=crop",
    category: "events",
  },
  {
    id: "30",
    title: "الفرق الاستعراضية",
    description: "توفير فرق استعراضية وفنية مميزة لإثراء فعاليتك",
    image:
      "https://images.unsplash.com/photo-1498050108023-7f1e52bfe3b7?w=800&h=600&fit=crop",
    category: "events",
  },
  {
    id: "31",
    title: "التجهيزات التقنية (الإضاءة - الصوت - شاشات العرض)",
    description: "تجهيزات تقنية متكاملة لفعالية احترافية بأعلى المعايير",
    image:
      "https://images.unsplash.com/photo-1508385082359-037986715702?w=800&h=600&fit=crop",
    category: "events",
  },
  {
    id: "32",
    title: "ديكورات المسارح",
    description: "تصميم وتنفيذ ديكورات مسرحية مبتكرة وجذابة",
    image:
      "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=800&h=600&fit=crop",
    category: "events",
  },
  {
    id: "33",
    title: "الإخراج المسرحي",
    description: "إخراج مسرحي احترافي يضمن تقديم عروض مميزة",
    image:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da2?w=800&h=600&fit=crop",
    category: "events",
  },
  {
    id: "34",
    title: "تصميم وصناعة الهدايا التذكارية المبتكرة",
    description: "تصميم وإنتاج هدايا تذكارية فريدة تترك انطباعاً دائماً",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop",
    category: "events",
  },
];

const allServices = [
  ...productionServices,
  ...marketingServices,
  ...exhibitionsServices,
  ...eventsServices,
];

export default function ServicesPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("production");

  const filteredServices = allServices.filter(
    (s) => s.category === selectedCategory,
  );

  useEffect(() => {
    ScrollTrigger.getAll().forEach((t) => t.kill());

    const ctx = gsap.context(() => {
      const cards = document.querySelectorAll(".service-card");
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power3.out",
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [selectedCategory]);

  return (
    <div
      ref={sectionRef}
      className="pt-16 sm:pt-20 md:pt-24 lg:pt-32"
      data-testid="services-page"
    >
      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-32 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop')",
        }}
      >
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2332]/95 to-[#1a2332]/80" />

        {/* Decorative Elements */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-5 sm:px-6 md:px-8 text-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 md:mb-6">
            خدماتنا
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-4">
            حلول إبداعية متكاملة في الإنتاج، التسويق الرقمي، وإدارة الفعاليات
          </p>
        </div>
      </section>

      {/* Services Filter */}
      <section className="py-8 sm:py-10 md:py-12 bg-background border-b border-border">
        <div className="container mx-auto px-5 sm:px-6 md:px-8">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <Button
              variant={
                selectedCategory === "production" ? "default" : "outline"
              }
              onClick={() => setSelectedCategory("production")}
              className="px-5 sm:px-6 md:px-8"
              data-testid="filter-production"
            >
              الإنتاج
            </Button>
            <Button
              variant={selectedCategory === "marketing" ? "default" : "outline"}
              onClick={() => setSelectedCategory("marketing")}
              className="px-5 sm:px-6 md:px-8"
              data-testid="filter-marketing"
            >
              التسويق الرقمي والإعلامي
            </Button>
            <Button
              variant={
                selectedCategory === "exhibitions" ? "default" : "outline"
              }
              onClick={() => setSelectedCategory("exhibitions")}
              className="px-5 sm:px-6 md:px-8"
              data-testid="filter-exhibitions"
            >
              تنظيم المعارض
            </Button>
            <Button
              variant={selectedCategory === "events" ? "default" : "outline"}
              onClick={() => setSelectedCategory("events")}
              className="px-5 sm:px-6 md:px-8"
              data-testid="filter-events"
            >
              إدارة الفعاليات
            </Button>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-12 sm:py-16 md:py-20 bg-background">
        <div className="container mx-auto px-5 sm:px-6 md:px-8">
          <div className="max-w-6xl mx-auto space-y-16 sm:space-y-20 md:space-y-24">
            {filteredServices.map((service, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={service.id}
                  className={`service-card flex flex-col ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } gap-8 sm:gap-10 md:gap-12 items-center`}
                  data-testid={`card-service-${service.id}`}
                >
                  {/* Image */}
                  <div className="w-full md:w-1/2 lg:w-2/5">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="w-full md:w-1/2 lg:w-3/5 space-y-4 sm:space-y-5">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight">
                      {service.title}
                    </h3>
                    <div className="w-20 h-1 bg-primary"></div>
                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
