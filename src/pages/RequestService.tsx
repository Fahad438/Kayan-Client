import RequestServiceForm from "../components/RequestServiceForm";
import { Card } from "../components/ui/card";

export default function RequestServicePage() {
  return (
    <div className="pt-16 sm:pt-20 md:pt-24 lg:pt-32">
      {/* Hero Section */}
      <section
        className="relative py-12 sm:py-16 md:py-20 lg:py-32 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=800&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2332]/95 to-[#1a2332]/80" />
        <div className="relative z-10 container mx-auto px-5 sm:px-6 md:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              ابدأ رحلتك معنا
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed">
              في كيان، نعمل بشغف واحتراف لصناعة حلول فنية وتسويقية تلبي رؤيتك
              وتواكب طموحاتك. شاركنا تفاصيل احتياجك، ودعنا نتولى الباقي.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <Card className="p-6 md:p-10">
            <RequestServiceForm />
          </Card>
        </div>
      </section>
    </div>
  );
}
