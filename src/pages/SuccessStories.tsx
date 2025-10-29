import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { TrendingUp, Users, Target, Award } from 'lucide-react';

// TODO: remove mock functionality - replace with real success stories
const successStories = [
  {
    id: '1',
    title: 'نمو 300% في المبيعات',
    client: 'شركة التجارة الإلكترونية',
    description: 'من خلال حملة تسويقية متكاملة، ساعدنا العميل على زيادة مبيعاته بنسبة 300% خلال 6 أشهر',
    metrics: [
      { label: 'زيادة المبيعات', value: '300%', icon: <TrendingUp className="w-5 h-5" /> },
      { label: 'عملاء جدد', value: '5000+', icon: <Users className="w-5 h-5" /> },
      { label: 'معدل التحويل', value: '45%', icon: <Target className="w-5 h-5" /> },
    ],
  },
  {
    id: '2',
    title: 'أكبر مؤتمر تقني في المنطقة',
    client: 'جمعية التقنية',
    description: 'نظمنا مؤتمراً استقطب أكثر من 10,000 زائر و 100 متحدث من جميع أنحاء العالم',
    metrics: [
      { label: 'الزوار', value: '10,000+', icon: <Users className="w-5 h-5" /> },
      { label: 'المتحدثون', value: '100+', icon: <Award className="w-5 h-5" /> },
      { label: 'نسبة الرضا', value: '98%', icon: <TrendingUp className="w-5 h-5" /> },
    ],
  },
  {
    id: '3',
    title: 'فيديو حقق 5 مليون مشاهدة',
    client: 'علامة تجارية عالمية',
    description: 'أنتجنا فيديو إعلاني حقق انتشاراً واسعاً وتفاعلاً كبيراً على وسائل التواصل الاجتماعي',
    metrics: [
      { label: 'المشاهدات', value: '5M+', icon: <TrendingUp className="w-5 h-5" /> },
      { label: 'التفاعل', value: '250K+', icon: <Target className="w-5 h-5" /> },
      { label: 'المشاركات', value: '50K+', icon: <Users className="w-5 h-5" /> },
    ],
  },
  {
    id: '4',
    title: 'تحويل رقمي كامل',
    client: 'مؤسسة حكومية',
    description: 'قمنا بتحويل كامل للحضور الرقمي للمؤسسة مع زيادة الوعي بالعلامة التجارية',
    metrics: [
      { label: 'زيادة الوعي', value: '400%', icon: <TrendingUp className="w-5 h-5" /> },
      { label: 'متابعون جدد', value: '100K+', icon: <Users className="w-5 h-5" /> },
      { label: 'معدل التفاعل', value: '65%', icon: <Target className="w-5 h-5" /> },
    ],
  },
];

export default function SuccessStories() {
  return (
    <div className="pt-32" data-testid="success-stories-page">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-background to-card">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">قصص النجاح</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            إبراز بعض النجاحات والإنجازات المميزة مع شركائنا
          </p>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="space-y-12 max-w-5xl mx-auto">
            {successStories.map((story, index) => (
              <Card
                key={story.id}
                className="p-8 md:p-12 hover-elevate transition-all duration-300"
                data-testid={`card-story-${story.id}`}
              >
                <div className="flex items-start gap-4 mb-6">
                  <Badge variant="default" className="bg-primary text-lg px-4 py-2">
                    {index + 1}
                  </Badge>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-foreground mb-2">{story.title}</h3>
                    <p className="text-primary font-semibold">{story.client}</p>
                  </div>
                </div>

                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {story.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {story.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-4 rounded-lg bg-card/50"
                    >
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        {metric.icon}
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                        <div className="text-sm text-muted-foreground">{metric.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
