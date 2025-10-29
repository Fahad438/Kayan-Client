import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { useToast } from '../hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, 'الاسم يجب أن يكون حرفين على الأقل'),
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  phone: z.string().min(10, 'رقم الهاتف غير صحيح'),
  service: z.string().min(1, 'يرجى اختيار الخدمة'),
  details: z.string().min(10, 'يرجى كتابة تفاصيل الطلب'),
});

type FormData = z.infer<typeof formSchema>;

const services = [
  'الإنتاج',
  'التسويق الرقمي واإلعالمي',
  'تنظيم المعارض',
  'إدارة الفعاليات',
];

export default function RequestService() {
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: '',
      details: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    // TODO: Integrate with Google Sheets or backend API
    console.log('Form data:', data);
    
    toast({
      title: 'تم إرسال الطلب بنجاح',
      description: 'سنتواصل معك في أقرب وقت ممكن',
    });
    
    form.reset();
  };

  return (
    <div className="pt-32 min-h-screen bg-background" data-testid="request-service-page">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-card to-background">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            اطلب الخدمة
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            املأ النموذج أدناه وسنتواصل معك لتحقيق أهدافك
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <Card className="p-8 md:p-12">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الاسم الكامل</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="أدخل اسمك الكامل"
                          {...field}
                          data-testid="input-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>البريد الإلكتروني</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="example@email.com"
                            {...field}
                            data-testid="input-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>رقم الهاتف</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="05XXXXXXXX"
                            {...field}
                            data-testid="input-phone"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الخدمة المطلوبة</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger data-testid="select-service">
                            <SelectValue placeholder="اختر الخدمة" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>تفاصيل الطلب</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="اكتب تفاصيل طلبك هنا..."
                          className="min-h-32"
                          {...field}
                          data-testid="textarea-details"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  data-testid="button-submit"
                >
                  إرسال الطلب
                </Button>
              </form>
            </Form>
          </Card>
        </div>
      </section>
    </div>
  );
}
