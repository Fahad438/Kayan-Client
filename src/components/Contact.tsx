import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".partners-header", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center+=100",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: Implement actual form submission
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 bg-card"
      data-testid="contact-section"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
            data-testid="text-contact-title"
          >
            تواصل معنا
          </h2>
          <p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            data-testid="text-contact-subtitle"
          >
            املأ النموذج وسنتواصل معك في أقرب وقت لمناقشة احتياجاتك
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                معلومات التواصل
              </h3>
              <div className="space-y-6">
                <Card className="p-6 hover-elevate transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-2">الهاتف</h4>
                      <p className="text-muted-foreground" dir="ltr">
                        +966 54 154 1041
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover-elevate transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-2">
                        البريد الإلكتروني
                      </h4>
                      <p className="text-muted-foreground" dir="ltr">
                        info@kayanpro.sa
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover-elevate transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-2">الموقع</h4>
                      <p className="text-muted-foreground">
                        مكة المكرمة، المملكة العربية السعودية
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-foreground font-semibold mb-2">
                  الاسم
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="أدخل اسمك"
                  required
                  data-testid="input-name"
                  className="bg-background"
                />
              </div>

              <div>
                <label className="block text-foreground font-semibold mb-2">
                  البريد الإلكتروني
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="أدخل بريدك الإلكتروني"
                  required
                  data-testid="input-email"
                  className="bg-background"
                />
              </div>

              <div>
                <label className="block text-foreground font-semibold mb-2">
                  رقم الهاتف
                </label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="أدخل رقم هاتفك"
                  required
                  data-testid="input-phone"
                  className="bg-background"
                />
              </div>

              <div>
                <label className="block text-foreground font-semibold mb-2">
                  الرسالة
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="اكتب رسالتك هنا"
                  required
                  rows={5}
                  data-testid="input-message"
                  className="bg-background resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary hover:bg-primary/90"
                data-testid="button-submit"
              >
                إرسال الرسالة
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}
