import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@assets/logo.svg";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { href: "/", label: "الرئيسية" },
    { href: "/about", label: "من نحن" },
    { href: "/services", label: "خدماتنا" },
    { href: "/portfolio", label: "معرض الأعمال" },
    { href: "/blog", label: "المدونة" },
    // { href: '/team', label: 'فريق العمل' },
    { href: "/contact", label: "طلب الخدمة" },
  ];

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#1a2332] shadow-lg py-2 sm:py-3"
          : "bg-transparent py-3 sm:py-4"
      }`}
      data-testid="navbar"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" data-testid="link-home">
            <div className="cursor-pointer">
              <img
                src={logo}
                alt="كيان الاحتراف"
                className="h-7 sm:h-9 md:h-11 lg:h-12 w-auto transition-all duration-300"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span
                  className={`text-white hover:text-primary transition-colors text-sm font-semibold cursor-pointer ${
                    location === item.href ? "text-primary" : ""
                  }`}
                  data-testid={`link-${item.label}`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:bg-white/10 h-9 w-9 sm:h-10 sm:w-10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </Button>
        </div>

        {/* Mobile Menu - محسّن للجوال */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden mt-4 rounded-xl bg-[#1a2332]/95 backdrop-blur-md border border-white/10 overflow-hidden shadow-2xl animate-in slide-in-from-top duration-300"
            data-testid="mobile-menu"
          >
            <div className="py-2">
              {navItems.map((item, index) => (
                <Link key={item.href} href={item.href}>
                  <div
                    className={`
                      px-5 py-3.5 transition-all duration-200
                      ${
                        location === item.href
                          ? "bg-primary/20 text-primary border-r-4 border-primary"
                          : "text-white/90 hover:bg-white/5 hover:text-white border-r-4 border-transparent"
                      }
                      ${index !== navItems.length - 1 ? "border-b border-white/5" : ""}
                    `}
                    onClick={() => setIsMobileMenuOpen(false)}
                    data-testid={`link-mobile-${item.label}`}
                  >
                    <span className="font-semibold text-base">
                      {item.label}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
