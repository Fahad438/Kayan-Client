import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: '1',
    title: 'مشروع إنتاج سينمائي',
    category: 'الإنتاج',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=600&fit=crop',
    description: 'إنتاج إعلان سينمائي بجودة عالية',
  },
  {
    id: '2',
    title: 'حملة تسويقية رقمية',
    category: 'التسويق الرقمي',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    description: 'حملة تسويقية شاملة على وسائل التواصل',
  },
  {
    id: '3',
    title: 'معرض تقني دولي',
    category: 'تنظيم المعارض',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
    description: 'تنظيم وإدارة معرض تقني بمشاركة عالمية',
  },
  {
    id: '4',
    title: 'فعالية ثقافية كبرى',
    category: 'إدارة الفعاليات',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop',
    description: 'إدارة فعالية ثقافية بحضور آلاف الزوار',
  },
  {
    id: '5',
    title: 'إنتاج محتوى إبداعي',
    category: 'الإنتاج',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop',
    description: 'صناعة محتوى مرئي مبتكر للعلامات التجارية',
  },
];

export default function ProjectsSlider() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.projects-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const visibleProjects = [
    projects[currentIndex],
    projects[(currentIndex + 1) % projects.length],
    projects[(currentIndex + 2) % projects.length],
  ];

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 bg-background" data-testid="projects-slider-section">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="projects-header text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4">
            معرض الأعمال
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            نماذج من مشاريعنا الناجحة
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-6xl mx-auto mb-8 sm:mb-10 md:mb-12">
          {visibleProjects.map((project, idx) => (
            <div
              key={`${project.id}-${idx}`}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl aspect-[4/3] hover-elevate active-elevate-2 transition-all duration-300"
              data-testid={`card-project-${project.id}`}
            >
              {/* Project Image */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2332]/95 via-[#1a2332]/50 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 text-right">
                <span className="inline-block px-2.5 sm:px-3 py-1 sm:py-1.5 bg-primary/20 backdrop-blur-sm text-primary text-xs sm:text-sm rounded-full mb-2 sm:mb-3">
                  {project.category}
                </span>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1.5 sm:mb-2">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/70">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation & CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="outline"
              onClick={prevSlide}
              className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full"
              data-testid="button-prev-project"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>

            <span className="text-xs sm:text-sm text-muted-foreground">
              {currentIndex + 1} / {projects.length}
            </span>

            <Button
              size="icon"
              variant="outline"
              onClick={nextSlide}
              className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full"
              data-testid="button-next-project"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>

          {/* View All Button */}
          <Link href="/portfolio">
            <Button
              variant="default"
              className="rounded-full px-5 sm:px-6 md:px-8 text-sm sm:text-base min-h-10 sm:min-h-11"
              data-testid="button-view-portfolio"
            >
              عرض جميع الأعمال
              <ArrowLeft className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
