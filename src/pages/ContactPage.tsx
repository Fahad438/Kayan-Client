import AskForServiace from "../components/AskForServiace";

export default function ContactPage() {
  return (
    <div
      className="pt-16 sm:pt-20 md:pt-24 lg:pt-32"
      data-testid="contact-page"
    >
      {/* Hero Section */}
      <section
        className="relative py-12 sm:py-16 md:py-20 lg:py-32 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop')",
        }}
      >
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2332]/95 to-[#1a2332]/80" />

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 bg-blue-600/10 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        {/* Content */}
        <div className="relative container mx-auto px-4 md:px-8 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">طلب خدمة</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            نحن هنا للإجابة على استفساراتكم ومساعدتكم في تحقيق أهدافكم
          </p>
        </div>
      </section>

      <AskForServiace />
    </div>
  );
}
