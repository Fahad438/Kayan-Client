import { useEffect, useRef } from 'react';
import { useRoute, Link } from 'wouter';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ArrowRight, Calendar, Users, Target, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Mock project data - يمكن استبداله ببيانات حقيقية
const projectsData = {
  '1': {
    id: '1',
    title: 'حملة إعلانية لشركة تقنية',
    category: 'تسويق رقمي',
    client: 'شركة التقنية المتقدمة',
    date: 'مارس 2025',
    duration: '3 أشهر',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200',
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
    ],
    description: 'حملة تسويقية رقمية متكاملة لإطلاق منتج جديد في السوق السعودي، شملت التخطيط الاستراتيجي، إنتاج المحتوى، وإدارة الحملات الإعلانية على مختلف المنصات.',
    challenge: 'كان التحدي الأساسي في الوصول إلى جمهور واسع في فترة زمنية قصيرة مع تحقيق معدل تفاعل عالي وزيادة الوعي بالعلامة التجارية.',
    solution: 'قمنا بتطوير استراتيجية متعددة القنوات تجمع بين المحتوى الإبداعي والإعلانات المستهدفة على منصات التواصل الاجتماعي مع حملات Google Ads المحسّنة.',
    results: [
      'زيادة 250% في الوعي بالعلامة التجارية',
      'تحقيق معدل تفاعل 15% على المحتوى',
      'الوصول إلى أكثر من 2 مليون مشاهدة',
      'زيادة 180% في زيارات الموقع الإلكتروني'
    ],
    services: ['إدارة وسائل التواصل الاجتماعي', 'إدارة الحملات الإعلانية', 'صناعة المحتوى']
  },
  '2': {
    id: '2',
    title: 'إنتاج فيديو سينمائي',
    category: 'إنتاج',
    client: 'شركة العقارات الفاخرة',
    date: 'فبراير 2025',
    duration: 'شهرين',
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=1200',
    images: [
      'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800',
      'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800',
      'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800',
    ],
    description: 'إنتاج فيلم ترويجي سينمائي لمشروع عقاري فاخر، يعرض تفاصيل المشروع بأسلوب سينمائي راقي يعكس فخامة وتميز المشروع.',
    challenge: 'تصوير مشروع عقاري ضخم بطريقة تبرز جماله وفخامته مع الحفاظ على واقعية العرض وجذب المشترين المحتملين.',
    solution: 'استخدمنا أحدث معدات التصوير السينمائي والتصوير الجوي بطائرات بدون طيار، مع اختيار دقيق لأوقات التصوير للحصول على أفضل إضاءة طبيعية.',
    results: [
      'إنتاج فيلم ترويجي بمدة 5 دقائق بجودة 4K',
      'عرض في 3 صالات سينمائية كبرى',
      'زيادة 300% في الاستفسارات عن المشروع',
      'بيع 60% من الوحدات خلال شهر من الإطلاق'
    ],
    services: ['التصوير الجوي والأرضي', 'المونتاج والتحرير', 'إنتاج الإعلانات السينمائية']
  },
  '3': {
    id: '3',
    title: 'تنظيم معرض تجاري',
    category: 'فعاليات',
    client: 'غرفة التجارة',
    date: 'يناير 2025',
    duration: '4 أشهر',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200',
    images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
    ],
    description: 'تنظيم معرض تجاري دولي بمشاركة أكثر من 200 عارض من 30 دولة، شمل التخطيط الكامل، التصميم، والتنفيذ.',
    challenge: 'إدارة معرض بهذا الحجم يتطلب تنسيقاً دقيقاً بين مئات الجهات المشاركة وضمان تجربة ممتازة للزوار والعارضين.',
    solution: 'وضعنا نظام إدارة شامل للمعرض يشمل التسجيل الإلكتروني، إدارة الأجنحة، تنسيق الفعاليات المصاحبة، وفريق دعم على مدار الساعة.',
    results: [
      'حضور أكثر من 15,000 زائر',
      'تنظيم 25 ورشة عمل وندوة',
      'نسبة رضا 95% من العارضين',
      'عقد أكثر من 500 صفقة تجارية'
    ],
    services: ['تخطيط وتنظيم المعارض', 'تصميم وتجهيز المساحات', 'إدارة الحضور', 'الدعم الفني']
  },
};

export default function ProjectDetails() {
  const [, params] = useRoute('/portfolio/:id');
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const project = params?.id ? projectsData[params.id as keyof typeof projectsData] : null;

  useEffect(() => {
    if (!project) return;

    const ctx = gsap.context(() => {
      gsap.from('.project-header', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power3.out',
      });

      gsap.from('.project-image', {
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
      });

      gsap.from('.project-info', {
        scrollTrigger: {
          trigger: '.project-info',
          start: 'top bottom-=100',
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      });

      gsap.from('.result-item', {
        scrollTrigger: {
          trigger: '.results-section',
          start: 'top bottom-=100',
        },
        opacity: 0,
        x: -20,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">المشروع غير موجود</h1>
          <Link href="/portfolio">
            <Button>العودة إلى معرض الأعمال</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="pt-16 sm:pt-20 md:pt-24 lg:pt-32" data-testid="project-details-page">
      {/* Back Button */}
      <div className="container mx-auto px-5 sm:px-6 md:px-8 py-6">
        <Link href="/portfolio">
          <Button variant="ghost" className="gap-2">
            <ArrowRight className="w-4 h-4" />
            العودة إلى المشاريع
          </Button>
        </Link>
      </div>

      {/* Project Header */}
      <section className="py-8 sm:py-10 md:py-12 bg-gradient-to-b from-background to-card">
        <div className="container mx-auto px-5 sm:px-6 md:px-8">
          <div className="project-header max-w-4xl mx-auto text-center">
            <Badge variant="default" className="mb-4">{project.category}</Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-5">
              {project.title}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Image */}
      <section className="py-8 sm:py-12 md:py-16 bg-card">
        <div className="container mx-auto px-5 sm:px-6 md:px-8">
          <div className="project-image max-w-6xl mx-auto">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Project Info */}
      <section className="py-8 sm:py-12 md:py-16 bg-background">
        <div className="container mx-auto px-5 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto mb-12 sm:mb-16">
            <Card className="project-info p-6 sm:p-8">
              <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-4" />
              <h3 className="text-base sm:text-lg font-bold text-foreground mb-2">التاريخ</h3>
              <p className="text-sm sm:text-base text-muted-foreground">{project.date}</p>
            </Card>
            <Card className="project-info p-6 sm:p-8">
              <Users className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-4" />
              <h3 className="text-base sm:text-lg font-bold text-foreground mb-2">العميل</h3>
              <p className="text-sm sm:text-base text-muted-foreground">{project.client}</p>
            </Card>
            <Card className="project-info p-6 sm:p-8">
              <Target className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-4" />
              <h3 className="text-base sm:text-lg font-bold text-foreground mb-2">المدة</h3>
              <p className="text-sm sm:text-base text-muted-foreground">{project.duration}</p>
            </Card>
          </div>

          <div className="max-w-4xl mx-auto space-y-10 sm:space-y-12 md:space-y-16">
            {/* Challenge */}
            <div className="project-info">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">التحدي</h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {project.challenge}
              </p>
            </div>

            {/* Solution */}
            <div className="project-info">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">الحل</h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {project.solution}
              </p>
            </div>

            {/* Results */}
            <div className="results-section">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6 sm:mb-8">النتائج</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                {project.results.map((result, index) => (
                  <Card key={index} className="result-item p-5 sm:p-6 hover-elevate transition-all">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0 mt-1" />
                      <p className="text-sm sm:text-base text-foreground leading-relaxed">{result}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Services Used */}
            <div className="project-info">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6 sm:mb-8">الخدمات المستخدمة</h2>
              <div className="flex flex-wrap gap-3">
                {project.services.map((service, index) => (
                  <Badge key={index} variant="outline" className="px-4 py-2 text-sm sm:text-base">
                    {service}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      {project.images && project.images.length > 0 && (
        <section className="py-8 sm:py-12 md:py-16 bg-card">
          <div className="container mx-auto px-5 sm:px-6 md:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8 sm:mb-10 md:mb-12 text-center">
              معرض الصور
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-6xl mx-auto">
              {project.images.map((image, index) => (
                <div
                  key={index}
                  className="aspect-video rounded-xl overflow-hidden hover-elevate active-elevate-2 transition-all"
                >
                  <img
                    src={image}
                    alt={`${project.title} - صورة ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-background to-card text-center">
        <div className="container mx-auto px-5 sm:px-6 md:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">
            هل لديك مشروع مشابه؟
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
            دعنا نساعدك في تحقيق أهدافك بنفس الاحترافية والتميز
          </p>
          <Link href="/contact">
            <Button size="lg" className="px-8">
              ابدأ مشروعك الآن
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
