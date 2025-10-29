import { Link } from "wouter";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
} from "lucide-react";
import { Button } from "./ui/button";
import logo from "@assets/logo.svg";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-[#1a2332] text-white border-t border-primary/20"
      data-testid="footer"
    >
      <div className="container mx-auto px-5 sm:px-6 md:px-8 py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8 mb-10 sm:mb-12">
          {/* Company Info */}
          <div className="text-center sm:text-right">
            <img
              src={logo}
              alt="كيان الاحتراف"
              className="h-10 sm:h-11 md:h-12 lg:h-14 w-auto mb-4 mx-auto sm:mx-0"
            />
            <p className="text-white/80 mb-3 sm:mb-4 text-sm sm:text-base font-medium">
              للاحترافية عنوان وكيان
            </p>
            <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
              نصنع تجارب استثنائية تترك أثراً عميقاً في كل تفاصيلها منذ 2018
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-right">
            <h4 className="text-base sm:text-lg font-bold mb-4 sm:mb-5">
              روابط سريعة
            </h4>
            <ul className="space-y-2.5 sm:space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-white/70 hover:text-primary transition-colors text-sm sm:text-base inline-block"
                  data-testid="link-footer-about"
                >
                  من نحن
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-white/70 hover:text-primary transition-colors text-sm sm:text-base inline-block"
                  data-testid="link-footer-services"
                >
                  خدماتنا
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="text-white/70 hover:text-primary transition-colors text-sm sm:text-base inline-block"
                  data-testid="link-footer-portfolio"
                >
                  معرض الأعمال
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-white/70 hover:text-primary transition-colors text-sm sm:text-base inline-block"
                  data-testid="link-footer-blog"
                >
                  المدونة
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/70 hover:text-primary transition-colors text-sm sm:text-base inline-block"
                  data-testid="link-footer-contact"
                >
                  طلب الخدمة
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center sm:text-right">
            <h4 className="text-base sm:text-lg font-bold mb-4 sm:mb-5">
              تواصل معنا
            </h4>
            <ul className="space-y-3 sm:space-y-3.5">
              <li className="flex items-center gap-2 sm:gap-3 text-white/70 text-sm sm:text-base justify-center sm:justify-start">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <span dir="ltr">+966 54 154 1041</span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3 text-white/70 text-sm sm:text-base justify-center sm:justify-start">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <span dir="ltr" className="break-all">
                  info@kayanpro.sa
                </span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3 text-white/70 text-sm sm:text-base justify-center sm:justify-start">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <span>مكة المكرمة، السعودية</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="text-center sm:text-right">
            <h4 className="text-base sm:text-lg font-bold mb-4 sm:mb-5">
              تابعنا
            </h4>
            <div className="flex gap-2.5 sm:gap-3 justify-center sm:justify-start flex-wrap">
              <Button
                size="icon"
                variant="outline"
                className="rounded-full border-white/20 text-white hover:bg-primary hover:border-primary w-10 h-10 sm:w-11 sm:h-11"
                data-testid="button-instagram"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="rounded-full border-white/20 text-white hover:bg-primary hover:border-primary w-10 h-10 sm:w-11 sm:h-11"
                data-testid="button-twitter"
              >
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="rounded-full border-white/20 text-white hover:bg-primary hover:border-primary w-10 h-10 sm:w-11 sm:h-11"
                data-testid="button-linkedin"
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="rounded-full border-white/20 text-white hover:bg-primary hover:border-primary w-10 h-10 sm:w-11 sm:h-11"
                data-testid="button-facebook"
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 sm:pt-8 text-center">
          <p className="text-white/60 text-xs sm:text-sm">
            جميع الحقوق محفوظة © {currentYear} كيان الاحتراف
          </p>
        </div>
      </div>
    </footer>
  );
}
