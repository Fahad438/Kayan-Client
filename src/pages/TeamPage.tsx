import Team from '../components/Team';

export default function TeamPage() {
  return (
    <div className="pt-32" data-testid="team-page">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-background to-card">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">فريق العمل</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            تعرف على الفريق الذي يصنع الفرق في كل مشروع
          </p>
        </div>
      </section>

      <Team />
    </div>
  );
}
