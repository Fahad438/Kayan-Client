import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import { useToast } from "../hooks/use-toast";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل"),
  companyName: z.string().min(2, "اسم الجهة / الشركة مطلوب"),
  entityType: z.string().min(1, "يرجى اختيار نوع الجهة"),
  city: z.string().min(2, "المدينة مطلوبة"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  phone: z.string().min(10, "رقم الهاتف غير صحيح"),
  projectTitle: z.string().min(5, "عنوان المشروع مطلوب"),
  serviceType: z.array(z.string()).min(1, "يرجى اختيار نوع الخدمة على الأقل"),
  otherService: z.string().optional(),
  projectDescription: z.string().min(20, "يرجى كتابة وصف تفصيلي للمشروع"),
  budget: z.string().min(1, "يرجى اختيار الميزانية التقديرية"),
  timeline: z.string().min(1, "يرجى اختيار مدة التنفيذ"),
  contactMethod: z
    .array(z.string())
    .min(1, "يرجى اختيار طريقة تواصل واحدة على الأقل"),
});

type FormData = z.infer<typeof formSchema>;

const entityTypes = [
  { value: "government", label: "حكومي" },
  { value: "private", label: "خاص" },
  { value: "nonprofit", label: "غير ربحي" },
  { value: "individual", label: "فردي" },
];

const serviceTypes = [
  { value: "production", label: "الإنتاج الإعلامي" },
  { value: "marketing", label: "التسويق الرقمي والإعلامي" },
  { value: "exhibitions", label: "تنظيم المعارض" },
  { value: "events", label: "إدارة الفعاليات" },
  { value: "consulting", label: "الاستشارات الفنية أو التسويقية" },
  { value: "other", label: "أخرى" },
];

const budgetRanges = [
  { value: "under10k", label: "أقل من 10,000 ريال" },
  { value: "10k-30k", label: "من 10,000 إلى 30,000 ريال" },
  { value: "30k-100k", label: "من 30,000 إلى 100,000 ريال" },
  { value: "over100k", label: "أكثر من 100,000 ريال" },
  { value: "not-set", label: "لم يتم تحديد الميزانية بعد" },
];

const timelines = [
  { value: "urgent", label: "عاجل (أقل من أسبوعين)" },
  { value: "one-month", label: "خلال شهر" },
  { value: "two-months", label: "شهرين أو أكثر" },
  { value: "not-set", label: "غير محدد بعد" },
];

const contactMethods = [
  { value: "phone", label: "مكالمة هاتفية" },
  { value: "whatsapp", label: "واتساب" },
  { value: "email", label: "بريد إلكتروني" },
  { value: "meeting", label: "اجتماع حضوري / أونلاين" },
];

export default function RequestService() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      companyName: "",
      entityType: "",
      city: "",
      email: "",
      phone: "",
      projectTitle: "",
      serviceType: [],
      otherService: "",
      projectDescription: "",
      budget: "",
      timeline: "",
      contactMethod: [],
    },
  });

  const watchServiceType = form.watch("serviceType");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const onSubmit = async (data: FormData) => {
    // TODO: Integrate with backend API or Google Sheets
    console.log("Form data:", data);
    console.log("Files:", selectedFiles);

    // Simulate email sending
    setSubmitted(true);

    toast({
      title: "تم إرسال طلبك بنجاح!",
      description: "سيتواصل معك فريقنا خلال 24 ساعة عمل",
    });

    form.reset();
    setSelectedFiles([]);
  };

  if (submitted) {
    return (
      <div className="pt-32 min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="p-8 md:p-12 max-w-2xl text-center">
          <div className="mb-6">
            <svg
              className="mx-auto h-16 w-16 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            شكرًا لثقتك بـ كيان!
          </h2>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            تم استلام طلبك بنجاح، وسيتواصل معك فريقنا خلال 24 ساعة عمل لتنسيق
            التفاصيل وإعداد عرض السعر المناسب.
          </p>
          <Button onClick={() => setSubmitted(false)} size="lg">
            إرسال طلب جديد
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div
      className="pt-16 sm:pt-20 md:pt-24 lg:pt-32"
      data-testid="request-service-page"
    >
      {/* Hero Section */}
      <section
        className="relative py-12 sm:py-16 md:py-20 lg:py-32 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop')",
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
        <div className="relative z-10 container mx-auto px-5 sm:px-6 md:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-5 md:mb-6">
              ابدأ رحلتك معنا
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
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
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-10"
              >
                {/* Basic Information */}
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      معلوماتك الأساسية
                    </h2>
                    <p className="text-muted-foreground">
                      ساعدنا بالتعرف عليك لنتواصل معك بأفضل طريقة
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الاسم الكامل *</FormLabel>
                        <FormControl>
                          <Input placeholder="أدخل اسمك الكامل" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>اسم الجهة / الشركة *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="أدخل اسم الجهة أو الشركة"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="entityType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>نوع الجهة *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex flex-wrap gap-4"
                          >
                            {entityTypes.map((type) => (
                              <div
                                key={type.value}
                                className="flex items-center space-x-2 space-x-reverse"
                              >
                                <RadioGroupItem
                                  value={type.value}
                                  id={type.value}
                                />
                                <Label
                                  htmlFor={type.value}
                                  className="cursor-pointer"
                                >
                                  {type.label}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>المدينة *</FormLabel>
                        <FormControl>
                          <Input placeholder="أدخل المدينة" {...field} />
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
                          <FormLabel>البريد الإلكتروني *</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="example@email.com"
                              {...field}
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
                          <FormLabel>رقم الجوال / الواتساب *</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="05XXXXXXXX"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      تفاصيل مشروعك أو طلبك
                    </h2>
                    <p className="text-muted-foreground">
                      شاركنا فكرتك، وكن مطمئنًا أننا سنصيغها بإبداع واحتراف
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="projectTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>عنوان المشروع / الخدمة المطلوبة *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="مثلاً: حملة رقمية – إنتاج فيديو تعريفي – تنظيم فعالية – استشارة تسويقية"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="serviceType"
                    render={() => (
                      <FormItem>
                        <FormLabel>نوع الخدمة المطلوبة *</FormLabel>
                        <div className="space-y-3">
                          {serviceTypes.map((service) => (
                            <FormField
                              key={service.value}
                              control={form.control}
                              name="serviceType"
                              render={({ field }) => (
                                <FormItem className="flex items-center space-x-3 space-x-reverse space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(
                                        service.value
                                      )}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              service.value,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) =>
                                                  value !== service.value
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    {service.label}
                                  </FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {watchServiceType?.includes("other") && (
                    <FormField
                      control={form.control}
                      name="otherService"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>حدد الخدمة الأخرى</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="اذكر نوع الخدمة المطلوبة"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="projectDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>وصف الفكرة أو الاحتياج *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="اكتب كل ما يساعدنا على فهم مشروعك (الأهداف، الفئة المستهدفة، المدة، الفكرة العامة...)"
                            className="min-h-40"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <Label>رفع ملفات داعمة</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      يمكنك إرفاق عروض، صور، ملفات PDF أو أي مرجع للمشروع
                    </p>
                    <Input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="cursor-pointer"
                    />
                    {selectedFiles.length > 0 && (
                      <p className="text-sm text-muted-foreground">
                        تم اختيار {selectedFiles.length} ملف
                      </p>
                    )}
                  </div>
                </div>

                {/* Budget and Timeline */}
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      تقديراتك المبدئية
                    </h2>
                    <p className="text-muted-foreground">
                      تساعدنا هذه المعلومات في إعداد عرض سعر أقرب لتوقعاتك
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الميزانية التقديرية *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-2"
                          >
                            {budgetRanges.map((budget) => (
                              <div
                                key={budget.value}
                                className="flex items-center space-x-2 space-x-reverse"
                              >
                                <RadioGroupItem
                                  value={budget.value}
                                  id={budget.value}
                                />
                                <Label
                                  htmlFor={budget.value}
                                  className="cursor-pointer"
                                >
                                  {budget.label}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="timeline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>مدة التنفيذ المرغوبة *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-2"
                          >
                            {timelines.map((timeline) => (
                              <div
                                key={timeline.value}
                                className="flex items-center space-x-2 space-x-reverse"
                              >
                                <RadioGroupItem
                                  value={timeline.value}
                                  id={timeline.value}
                                />
                                <Label
                                  htmlFor={timeline.value}
                                  className="cursor-pointer"
                                >
                                  {timeline.label}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Contact Preference */}
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      كيف تفضل أن نتواصل معك؟
                    </h2>
                  </div>

                  <FormField
                    control={form.control}
                    name="contactMethod"
                    render={() => (
                      <FormItem>
                        <div className="space-y-3">
                          {contactMethods.map((method) => (
                            <FormField
                              key={method.value}
                              control={form.control}
                              name="contactMethod"
                              render={({ field }) => (
                                <FormItem className="flex items-center space-x-3 space-x-reverse space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(
                                        method.value
                                      )}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              method.value,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) =>
                                                  value !== method.value
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    {method.label}
                                  </FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  أرسل طلبك الآن
                </Button>
              </form>
            </Form>
          </Card>
        </div>
      </section>
    </div>
  );
}
