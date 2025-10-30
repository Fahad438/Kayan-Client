import { useEffect, useRef, useState } from "react";
import { useRoute, Link } from "wouter";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  ArrowRight,
  Calendar,
  Users,
  Target,
  CheckCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  FileText,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projectsData = {
  "1": {
    id: "1",
    title: "حملة إعلانية لشركة تقنية",
    category: "تسويق رقمي",
    client: "شركة التقنية المتقدمة",
    date: "مارس 2025",
    duration: "3 أشهر",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800",
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800",
    ],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    description:
      "حملة تسويقية رقمية متكاملة لإطلاق منتج جديد في السوق السعودي، شملت التخطيط الاستراتيجي، إنتاج المحتوى، وإدارة الحملات الإعلانية على مختلف المنصات.",
    challenge:
      "كان التحدي الأساسي في الوصول إلى جمهور واسع في فترة زمنية قصيرة مع تحقيق معدل تفاعل عالي وزيادة الوعي بالعلامة التجارية.",
    solution:
      "قمنا بتطوير استراتيجية متعددة القنوات تجمع بين المحتوى الإبداعي والإعلانات المستهدفة على منصات التواصل الاجتماعي مع حملات Google Ads المحسّنة.",
    results: [
      "زيادة 250% في الوعي بالعلامة التجارية",
      "تحقيق معدل تفاعل 15% على المحتوى",
      "الوصول إلى أكثر من 2 مليون مشاهدة",
      "زيادة 180% في زيارات الموقع الإلكتروني",
    ],
    services: [
      "إدارة وسائل التواصل الاجتماعي",
      "إدارة الحملات الإعلانية",
      "صناعة المحتوى",
    ],
  },
  "2": {
    id: "2",
    title: "إنتاج فيديو سينمائي",
    category: "إنتاج",
    client: "شركة العقارات الفاخرة",
    date: "فبراير 2025",
    duration: "شهرين",
    image:
      "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=1200",
    images: [
      "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800",
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800",
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800",
    ],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    description:
      "إنتاج فيلم ترويجي سينمائي لمشروع عقاري فاخر، يعرض تفاصيل المشروع بأسلوب سينمائي راقي يعكس فخامة وتميز المشروع.",
    challenge:
      "تصوير مشروع عقاري ضخم بطريقة تبرز جماله وفخامته مع الحفاظ على واقعية العرض وجذب المشترين المحتملين.",
    solution:
      "استخدمنا أحدث معدات التصوير السينمائي والتصوير الجوي بطائرات بدون طيار، مع اختيار دقيق لأوقات التصوير للحصول على أفضل إضاءة طبيعية.",
    results: [
      "إنتاج فيلم ترويجي بمدة 5 دقائق بجودة 4K",
      "عرض في 3 صالات سينمائية كبرى",
      "زيادة 300% في الاستفسارات عن المشروع",
      "بيع 60% من الوحدات خلال شهر من الإطلاق",
    ],
    services: [
      "التصوير الجوي والأرضي",
      "المونتاج والتحرير",
      "إنتاج الإعلانات السينمائية",
    ],
  },
  "3": {
    id: "3",
    title: "تنظيم معرض تجاري",
    category: "فعاليات",
    client: "غرفة التجارة",
    date: "يناير 2025",
    duration: "4 أشهر",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200",
    images: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800",
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
    ],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    description:
      "تنظيم معرض تجاري دولي بمشاركة أكثر من 200 عارض من 30 دولة، شمل التخطيط الكامل، التصميم، والتنفيذ.",
    challenge:
      "إدارة معرض بهذا الحجم يتطلب تنسيقاً دقيقاً بين مئات الجهات المشاركة وضمان تجربة ممتازة للزوار والعارضين.",
    solution:
      "وضعنا نظام إدارة شامل للمعرض يشمل التسجيل الإلكتروني، إدارة الأجنحة، تنسيق الفعاليات المصاحبة، وفريق دعم على مدار الساعة.",
    results: [
      "حضور أكثر من 15,000 زائر",
      "تنظيم 25 ورشة عمل وندوة",
      "نسبة رضا 95% من العارضين",
      "عقد أكثر من 500 صفقة تجارية",
    ],
    services: [
      "تخطيط وتنظيم المعارض",
      "تصميم وتجهيز المساحات",
      "إدارة الحضور",
      "الدعم الفني",
    ],
  },
};

export default function ProjectDetails() {
  const [, params] = useRoute("/portfolio/:id");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [showPDF, setShowPDF] = useState(false);

  const project = params?.id
    ? projectsData[params.id as keyof typeof projectsData]
    : null;

  useEffect(() => {
    if (!project) return;

    const ctx = gsap.context(() => {
      gsap.from(".project-header", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.from(".project-image", {
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      });

      gsap.from(".project-info", {
        scrollTrigger: {
          trigger: ".project-info",
          start: "top bottom-=100",
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.from(".result-item", {
        scrollTrigger: {
          trigger: ".results-section",
          start: "top bottom-=100",
        },
        opacity: 0,
        x: -20,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [project]);

  const nextImage = () => {
    if (galleryIndex !== null && project) {
      setGalleryIndex((galleryIndex + 1) % project.images.length);
    }
  };

  const prevImage = () => {
    if (galleryIndex !== null && project) {
      setGalleryIndex(
        (galleryIndex - 1 + project.images.length) % project.images.length
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "Escape") setGalleryIndex(null);
  };

  useEffect(() => {
    if (galleryIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [galleryIndex]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            المشروع غير موجود
          </h1>
          <Link href="/portfolio">
            <Button>العودة إلى معرض الأعمال</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      className="pt-16 sm:pt-20 md:pt-24 lg:pt-32"
      data-testid="project-details-page"
    >
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
            <Badge variant="default" className="mb-4">
              {project.category}
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-5">
              {project.title}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {/* Media Section - Images, Video, PDF */}
      <section className="py-8 sm:py-12 md:py-16 bg-card">
        <div className="container mx-auto px-5 sm:px-6 md:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8 sm:mb-10 md:mb-12 text-center">
            ملفات المشروع
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-6xl mx-auto">
            {/* Image Gallery Trigger */}
            <div
              onClick={() => setGalleryIndex(0)}
              className="aspect-video rounded-xl overflow-hidden hover-elevate active-elevate-2 transition-all cursor-pointer relative group"
            >
              <img
                src={project.images[0]}
                alt="معرض الصور"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-white text-center">
                  <div className="text-4xl mb-2">🖼️</div>
                  <p className="text-lg font-bold">معرض الصور</p>
                </div>
              </div>
            </div>

            {/* Video Player Trigger */}
            <div
              onClick={() => setShowVideo(true)}
              className="aspect-video rounded-xl overflow-hidden hover-elevate active-elevate-2 transition-all cursor-pointer relative group bg-gradient-to-br from-purple-500 to-blue-600"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="w-20 h-20 rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                    <Play className="w-10 h-10" />
                  </div>
                  <p className="text-lg font-bold">فيديو المشروع</p>
                </div>
              </div>
            </div>

            {/* PDF Viewer Trigger */}
            <div
              onClick={() => setShowPDF(true)}
              className="aspect-video rounded-xl overflow-hidden hover-elevate active-elevate-2 transition-all cursor-pointer relative group bg-gradient-to-br from-red-500 to-orange-600"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="w-20 h-20 rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                    <FileText className="w-10 h-10" />
                  </div>
                  <p className="text-lg font-bold">ملف PDF</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Modal */}
      {galleryIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
          onClick={() => setGalleryIndex(null)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <button
            onClick={() => setGalleryIndex(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <ChevronLeft className="w-12 h-12" />
          </button>

          <div
            className="max-w-7xl max-h-[90vh] px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={project.images[galleryIndex]}
              alt={`صورة ${galleryIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            <div className="text-white text-center mt-4">
              {galleryIndex + 1} / {project.images.length}
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <ChevronRight className="w-12 h-12" />
          </button>
        </div>
      )}

      {/* Video Modal */}
      {showVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
          onClick={() => setShowVideo(false)}
        >
          <button
            onClick={() => setShowVideo(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>

          <div
            className="max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              controls
              autoPlay
              className="w-full rounded-lg"
              src={project.videoUrl}
            >
              متصفحك لا يدعم تشغيل الفيديو
            </video>
          </div>
        </div>
      )}

      {/* PDF Modal */}
      {showPDF && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
          onClick={() => setShowPDF(false)}
        >
          <button
            onClick={() => setShowPDF(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>

          <div
            className="max-w-6xl w-full h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={project.pdfUrl}
              className="w-full h-full rounded-lg"
              title="PDF Viewer"
            />
          </div>
        </div>
      )}
    </div>
  );
}
