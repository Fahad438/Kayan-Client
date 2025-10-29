import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "./ui/card";
import {
  Video,
  Camera,
  Palette,
  Edit,
  Image as ImageIcon,
  Share2,
  Target,
  Lightbulb,
  FileText,
  Calendar,
  Layout,
  Users,
  Gift,
  Wrench,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Service {
  id: string;
  number: string;
  title: string;
  icon: React.ReactNode;
  category: string;
}

const productionServices: Service[] = [
  {
    id: "1",
    number: "01",
    title: "التصميم الثابت والمتحرك وثلاثي الأبعاد",
    icon: <Palette className="w-8 h-8" />,
    category: "production",
  },
  {
    id: "2",
    number: "02",
    title: "التصوير الجوي والأرضي للفيديوهات",
    icon: <Camera className="w-8 h-8" />,
    category: "production",
  },
  {
    id: "3",
    number: "03",
    title: "إنتاج الإعلانات السينمائية",
    icon: <Video className="w-8 h-8" />,
    category: "production",
  },
  {
    id: "4",
    number: "04",
    title: "المونتاج والتحرير المرئي والصوتي",
    icon: <Edit className="w-8 h-8" />,
    category: "production",
  },
  {
    id: "5",
    number: "05",
    title: "الصور الإعلانية الفوتوغرافية",
    icon: <ImageIcon className="w-8 h-8" />,
    category: "production",
  },
];

const marketingServices: Service[] = [
  {
    id: "6",
    number: "01",
    title: "إدارة وسائل التواصل الاجتماعي",
    icon: <Share2 className="w-8 h-8" />,
    category: "marketing",
  },
  {
    id: "7",
    number: "02",
    title: "إدارة الحملات التسويقية والإعلانية",
    icon: <Target className="w-8 h-8" />,
    category: "marketing",
  },
  {
    id: "8",
    number: "03",
    title: "صناعة المحتوى وابتكار المنتجات التسويقية",
    icon: <Lightbulb className="w-8 h-8" />,
    category: "marketing",
  },
  {
    id: "9",
    number: "04",
    title: "بناء الأدلة والنماذج التسويقية الميسرة",
    icon: <FileText className="w-8 h-8" />,
    category: "marketing",
  },
];

const eventsServices: Service[] = [
  {
    id: "10",
    number: "01",
    title: "تخطيط وتنظيم المعارض والمؤتمرات",
    icon: <Calendar className="w-8 h-8" />,
    category: "events",
  },
  {
    id: "11",
    number: "02",
    title: "تصميم وتجهيز المساحات",
    icon: <Layout className="w-8 h-8" />,
    category: "events",
  },
  {
    id: "12",
    number: "03",
    title: "إدارة الحضور والتنسيق",
    icon: <Users className="w-8 h-8" />,
    category: "events",
  },
  {
    id: "13",
    number: "04",
    title: "تصميم وصناعة الهدايا التذكارية المبتكرة",
    icon: <Gift className="w-8 h-8" />,
    category: "events",
  },
  {
    id: "14",
    number: "05",
    title: "الدعم الفني واللوجستي",
    icon: <Wrench className="w-8 h-8" />,
    category: "events",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
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

  const ServiceCard = ({
    service,
    index,
  }: {
    service: Service;
    index: number;
  }) => (
    <div ref={addToRefs} key={service.id}>
      <Card
        className="p-8 bg-card hover-elevate active-elevate-2 transition-all duration-300 group h-full"
        data-testid={`card-service-${service.id}`}
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
            {service.icon}
          </div>
          <div className="text-primary text-sm font-bold">{service.number}</div>
        </div>
        <h3
          className="text-xl font-bold text-foreground mb-3"
          data-testid={`text-service-title-${service.id}`}
        >
          {service.title}
        </h3>
        <div className="h-1 w-12 bg-primary rounded-full" />
      </Card>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 bg-background"
      data-testid="services-section"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
            data-testid="text-services-title"
          >
            خدماتنا
          </h2>
          <p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            data-testid="text-services-subtitle"
          >
            حلول إبداعية متكاملة تلبي احتياجاتكم في الإنتاج والتسويق وإدارة
            الفعاليات
          </p>
        </div>

        {/* Production Services */}
        <div className="mb-20">
          <h3
            className="text-3xl font-bold text-foreground mb-8 text-center md:text-right"
            data-testid="text-production-title"
          >
            الإنتاج
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productionServices.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>

        {/* Marketing Services */}
        <div className="mb-20">
          <h3
            className="text-3xl font-bold text-foreground mb-8 text-center md:text-right"
            data-testid="text-marketing-title"
          >
            التسويق الرقمي
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketingServices.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>

        {/* Events Services */}
        <div>
          <h3
            className="text-3xl font-bold text-foreground mb-8 text-center md:text-right"
            data-testid="text-events-title"
          >
            إدارة الفعاليات
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventsServices.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
