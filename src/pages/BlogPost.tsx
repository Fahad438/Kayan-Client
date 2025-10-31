import { useRoute, Link } from "wouter";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "../components/ui/button";
import { Calendar, User, Tag, ArrowLeft } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// نفس البيانات مؤقتًا حتى تستورد من API لاحقًا
const blogPosts = [
  {
    id: "1",
    title: "أهمية التسويق الرقمي في العصر الحديث",
    content:
      "المحتوى الكامل للمقالة الأولى. هنا يمكن وضع جميع التفاصيل والأفكار الخاصة بالموضوع...",
    category: "التسويق الرقمي",
    author: "سارة العتيبي",
    date: "15 أكتوبر 2025",
    readTime: "5 دقائق",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
  },
  {
    id: "2",
    title: "كيف تخطط لفعالية ناجحة",
    content:
      "المحتوى الكامل للمقالة الثانية، مع تفاصيل حول تنظيم الفعاليات وتحقيق النتائج المرجوة...",
    category: "إدارة الفعاليات",
    author: "خالد السعيد",
    date: "12 أكتوبر 2025",
    readTime: "7 دقائق",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
  },
];

export default function BlogPost() {
  const [, params] = useRoute("/blog/:id");
  const sectionRef = useRef<HTMLDivElement>(null);

  const post = blogPosts.find((p) => p.id === params?.id);

  useEffect(() => {
    if (!post) return;

    const ctx = gsap.context(() => {
      gsap.from(".post-header", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power3.out",
      });
      gsap.from(".post-image", {
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      });
      gsap.from(".post-content", {
        scrollTrigger: {
          trigger: ".post-content",
          start: "top bottom-=100",
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [post]);

  if (!post)
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <p className="text-center text-xl">الموضوع غير موجود</p>
        <Link href="/blog">
          <Button className="mt-4">العودة إلى المدونة</Button>
        </Link>
      </div>
    );

  return (
    <div ref={sectionRef} className="container mx-auto py-12 px-5 sm:px-6 md:px-8">
      {/* العودة للمدونة */}
      <Link
        href="/blog"
        className="text-blue-500 mb-6 inline-block hover:underline flex items-center gap-1"
      >
        <ArrowLeft className="w-4 h-4" /> العودة للمدونة
      </Link>

      {/* الصورة الرئيسية */}
      <div className="post-header max-w-4xl mx-auto text-center">
        <img
          src={post.image}
          alt={post.title}
          className="post-image w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg mb-6"
        />

        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Tag className="w-4 h-4" />
            <span>{post.category}</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold mb-6">{post.title}</h1>

        <p className="post-content text-base sm:text-lg text-muted-foreground leading-relaxed">
          {post.content}
        </p>
      </div>
    </div>
  );
}
