import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useRegistration } from "@/hooks/use-registration";
import { Calendar, Clock, MapPin, Ticket, Gift, Store, Users, MessageSquare, Phone, ArrowRight, Send } from "lucide-react";

const registrationSchema = z.object({
  fullName: z.string().min(2, { message: "Họ và tên phải có ít nhất 2 ký tự" }),
  phone: z.string().regex(/^[0-9]{10,11}$/, { message: "Số điện thoại phải có 10-11 chữ số" }),
  ticketCount: z.string().regex(/^[0-9]+$/, { message: "Số lượng vé phải là số" }),
  message: z.string().optional(),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

interface RegistrationSectionProps {
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventPrice: string;
  onSuccessfulRegistration: () => void;
}

export default function RegistrationSection({
  eventDate, eventTime, eventLocation, eventPrice, onSuccessfulRegistration,
}: RegistrationSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { register: registerUser, isRegistering } = useRegistration();
  const { toast } = useToast();

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { fullName: "", phone: "", ticketCount: "1", message: "" },
  });

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      try {
        await registerUser({ ...data, email: "", company: "", position: "", interest: "" });
      } catch { /* continue */ }

      try {
        const url = "https://script.google.com/macros/s/AKfycbwRq8jrxnxMOe90xR2Jm8IbwLY4KveRVkaw616nhg4gOi9jP7CIIq2Xwj7JezjRvHIhLQ/exec";
        const formData = new FormData();
        formData.append("fullName", data.fullName);
        formData.append("phone", data.phone);
        formData.append("ticketCount", data.ticketCount);
        formData.append("message", data.message || "");
        await fetch(url, { method: "POST", mode: "no-cors", body: formData });
      } catch { /* continue */ }

      toast({ title: "Đăng Ký Thành Công! 🎉", description: "Chúng tôi sẽ liên hệ với bạn sớm nhất." });
      form.reset();
      onSuccessfulRegistration();
    } catch {
      toast({ title: "Đăng ký thất bại", description: "Vui lòng thử lại sau.", variant: "destructive" });
    }
  };

  const highlights = [
    { icon: Gift, text: "Đến là có quà, 1000+ phần quà giá trị và thiết thực" },
    { icon: Store, text: "Trải nghiệm 5+ gian hàng giải pháp kinh doanh đồ uống" },
    { icon: Users, text: "Kết nối hàng ngàn chủ quán, đại lý kinh doanh" },
    { icon: MessageSquare, text: "Lắng nghe chuyên gia và được giải đáp mọi vấn đề" },
  ];

  const eventInfo = [
    { icon: Calendar, text: eventDate },
    { icon: Clock, text: eventTime },
    { icon: MapPin, text: eventLocation },
    { icon: Ticket, text: eventPrice },
  ];

  return (
    <section id="register" className="py-20 md:py-28 bg-background relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3">Đăng ký</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">Đăng Ký Tham Dự</h2>
          <div className="w-16 h-1 bg-secondary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Đảm bảo chỗ của bạn tại workshop đặc biệt này</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-5xl mx-auto">
          {/* Left - Info */}
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-2xl font-bold text-foreground mb-6">Tại Sao Bạn Không Nên Bỏ Lỡ</h3>
            <div className="space-y-4 mb-8">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 bg-secondary/10 text-secondary p-2 rounded-lg flex-shrink-0">
                    <h.icon className="w-4 h-4" />
                  </div>
                  <p className="text-muted-foreground">{h.text}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-border p-6 mb-6">
              <h4 className="font-bold text-lg mb-4 text-foreground">Thông Tin Sự Kiện</h4>
              <div className="space-y-3">
                {eventInfo.map((info, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <info.icon className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{info.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="tel:+84123456789"
              className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white px-5 py-3 rounded-xl font-medium transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              Liên hệ Hotline
            </a>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl border border-border p-8 shadow-xl shadow-black/5">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Đăng Ký Ngay</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField control={form.control} name="fullName" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">Họ và tên</FormLabel>
                      <FormControl>
                        <input placeholder="Nguyễn Văn A" {...field} className="modern-input" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">Số điện thoại</FormLabel>
                      <FormControl>
                        <input placeholder="0912345678" {...field} className="modern-input" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="ticketCount" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">Số lượng vé</FormLabel>
                      <FormControl>
                        <input
                          type="number"
                          placeholder="1"
                          min="1"
                          {...field}
                          className="modern-input"
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, "");
                            field.onChange((parseInt(value) || 1).toString());
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">Lời nhắn</FormLabel>
                      <FormControl>
                        <textarea placeholder="Nhập lời nhắn của bạn" {...field} rows={3} className="modern-input resize-none" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <button
                    type="submit"
                    disabled={isRegistering}
                    className="w-full flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 disabled:opacity-50 text-white font-bold py-4 px-2 sm:px-8 rounded-xl text-[15px] sm:text-lg whitespace-nowrap transition-all duration-300 shadow-lg shadow-secondary/25 hover:shadow-xl hover:shadow-secondary/30 hover:-translate-y-0.5"
                  >
                    {isRegistering ? "Đang xử lý..." : (
                      <>
                        <span className="truncate">Nhận vé tham dự miễn phí</span>
                        <Send className="w-5 h-5 flex-shrink-0" />
                      </>
                    )}
                  </button>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
