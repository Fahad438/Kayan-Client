import Testimonials from '../components/Testimonials';

export default function TestimonialsPage() {
  return (
    <div className="pt-32" data-testid="testimonials-page">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-background to-card">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">آراء العملاء</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            ماذا يقول عملاؤنا وشركاؤنا عن تجربتهم معنا
          </p>
        </div>
      </section>

      <Testimonials />
    </div>
  );
}
