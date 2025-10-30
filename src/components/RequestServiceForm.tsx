import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
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
  { value: "events", label: "إدارة الفعاليات" },
  { value: "consulting", label: "استشارات فنية وتسويقية" },
  { value: "other", label: "أخرى" },
];

const budgetRanges = [
  { value: "under10k", label: "أقل من 10,000 ريال" },
  { value: "10k-30k", label: "10,000 - 30,000 ريال" },
  { value: "30k-100k", label: "30,000 - 100,000 ريال" },
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

export default function RequestServiceForm() {
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
    if (e.target.files) setSelectedFiles(Array.from(e.target.files));
  };

  const onSubmit = async (data: FormData) => {
    console.log("Form data:", data);
    console.log("Files:", selectedFiles);

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
      <Card className="p-8 text-center">
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
        <h2 className="text-2xl font-bold my-4">شكرًا لتواصلك معنا!</h2>
        <p className="text-muted-foreground mb-4">
          تم استلام طلبك، وسيتواصل معك فريقنا خلال 24 ساعة عمل لتنسيق التفاصيل.
        </p>
        <Button onClick={() => setSubmitted(false)}>إرسال طلب جديد</Button>
      </Card>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <Input placeholder="أدخل اسم الجهة أو الشركة" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
                  className="flex gap-4"
                  dir="rtl"
                >
                  {entityTypes.map((e) => (
                    <div
                      key={e.value}
                      className="flex items-center space-x-2 space-x-reverse"
                    >
                      <RadioGroupItem value={e.value} id={e.value} />
                      <Label htmlFor={e.value}>{e.label}</Label>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <FormLabel>رقم الجوال / واتساب *</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="05XXXXXXXX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="projectTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>عنوان المشروع *</FormLabel>
              <FormControl>
                <Input placeholder="عنوان مشروعك" {...field} />
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
              <FormLabel>نوع الخدمة *</FormLabel>
              <div className="space-y-2">
                {serviceTypes.map((s) => (
                  <FormField
                    key={s.value}
                    control={form.control}
                    name="serviceType"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2 space-x-reverse">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(s.value)}
                            onCheckedChange={(checked) => {
                              field.onChange(
                                checked
                                  ? [...field.value, s.value]
                                  : field.value.filter((v) => v !== s.value)
                              );
                            }}
                          />
                        </FormControl>
                        <FormLabel>{s.label}</FormLabel>
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
                  <Input placeholder="اذكر نوع الخدمة" {...field} />
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
              <FormLabel>وصف المشروع *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="اكتب وصف المشروع..."
                  className="min-h-40"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <Label>رفع ملفات داعمة</Label>
          <Input
            type="file"
            multiple
            onChange={handleFileChange}
            className="cursor-pointer"
          />
          {selectedFiles.length > 0 && (
            <p>تم اختيار {selectedFiles.length} ملف</p>
          )}
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
                  dir="rtl"
                >
                  {budgetRanges.map((b) => (
                    <div
                      key={b.value}
                      className="flex items-center space-x-2 space-x-reverse"
                    >
                      <RadioGroupItem value={b.value} id={b.value} />
                      <Label htmlFor={b.value}>{b.label}</Label>
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
              <FormLabel>مدة التنفيذ *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="space-y-2"
                  dir="rtl"
                >
                  {timelines.map((t) => (
                    <div
                      key={t.value}
                      className="flex items-center space-x-2 space-x-reverse"
                    >
                      <RadioGroupItem value={t.value} id={t.value} />
                      <Label htmlFor={t.value}>{t.label}</Label>
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
          name="contactMethod"
          render={() => (
            <FormItem>
              <FormLabel>طريقة التواصل *</FormLabel>
              <div className="space-y-2">
                {contactMethods.map((m) => (
                  <FormField
                    key={m.value}
                    control={form.control}
                    name="contactMethod"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2 space-x-reverse">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(m.value)}
                            onCheckedChange={(checked) => {
                              field.onChange(
                                checked
                                  ? [...field.value, m.value]
                                  : field.value.filter((v) => v !== m.value)
                              );
                            }}
                          />
                        </FormControl>
                        <FormLabel>{m.label}</FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" className="w-full">
          إرسال الطلب
        </Button>
      </form>
    </Form>
  );
}
