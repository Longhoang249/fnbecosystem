import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useRegistration } from "@/hooks/use-registration";
import { getTrackingFormParams } from "@/lib/lead-tracker";
import { Calendar, Clock, MapPin, Ticket, Gift, Utensils, Users, MessageSquare, Phone, ArrowRight, Send, Armchair } from "lucide-react";

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
        registerUser({ ...data, email: "", company: "", position: "", interest: "" });
      } catch { /* continue */ }

      try {
        const url = "https://script.google.com/macros/s/AKfycbyQ8csKhPILgS1dc_RmBx6KbZJg-DbfBL6ltOP_DlMS-1im0H8wtFA-fsMOEYKro7i6Ww/exec";
        const formData = new URLSearchParams();
        formData.append("fullName", data.fullName);
        formData.append("phone", data.phone);
        formData.append("ticketCount", data.ticketCount);
        formData.append("message", data.message || "");
        const tracking = getTrackingFormParams();
        tracking.forEach((value, key) => {
          formData.append(key, value);
        });
        fetch(url, { 
          method: "POST", 
          mode: "no-cors", 
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formData.toString() 
        }).catch(console.error);
      } catch { /* continue */ }

      toast({ title: "Đăng Ký Thành Công! 🎉", description: "Chúng tôi sẽ liên hệ với bạn sớm nhất." });
      form.reset();
      onSuccessfulRegistration();
    } catch {
      toast({ title: "Đăng ký thất bại", description: "Vui lòng thử lại sau.", variant: "destructive" });
    }
  };

  const totalSeats = 700;
  const [registeredSeats, setRegisteredSeats] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("fnb_registered_seats");
      if (saved) return parseInt(saved, 10);
    }
    return 260;
  });

  useEffect(() => {
    localStorage.setItem("fnb_registered_seats", registeredSeats.toString());
  }, [registeredSeats]);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const deadline = new Date("2026-04-21T23:59:59+07:00").getTime();
    
    // Initial call
    const calcTime = () => {
      const difference = deadline - Date.now();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };
    calcTime();
    
    const timer = setInterval(calcTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const targetDate = new Date("2026-04-22T08:30:00+07:00").getTime();
    const fakeNames = [
      "Nguyễn Văn An", "Trần Thị Bé", "Lê Hoàng Công", "Phạm Đình Duy",
      "Hoàng Thu Hằng", "Phan Tuấn Kiệt", "Vũ Minh Quân", "Đặng Thùy Trang",
      "Bùi Xuân Trường", "Đỗ Hải Yến", "Ngô Thành Nam", "Dương Phương Anh",
      "Lý Thu Hà", "Mai Kim Liên", "Đào Văn Cường", "Đoàn Thị Lệ",
      "Đặng Văn Tường", "Võ Kim Thanh", "Vũ Thị Hương", "Lâm Đình Tuấn"
    ];

    let timeoutId: NodeJS.Timeout;

    const runFakeRegistration = () => {
      const now = Date.now();
      if (now >= targetDate) return;

      setRegisteredSeats(prev => {
        if (prev >= totalSeats - 4) return prev;
        const tickets = Math.floor(Math.random() * 4) + 1;
        
        const randomName = fakeNames[Math.floor(Math.random() * fakeNames.length)];
        toast({
          title: "Đăng ký thành công! 🎉",
          description: `${randomName} vừa đăng ký ${tickets} vé.`,
        });

        return prev + tickets;
      });

      const nextDelay = Math.floor(Math.random() * 12000) + 4000;
      timeoutId = setTimeout(runFakeRegistration, nextDelay);
    };

    timeoutId = setTimeout(runFakeRegistration, Math.floor(Math.random() * 4000) + 2000);

    return () => clearTimeout(timeoutId);
  }, [toast, totalSeats]);
  const remainingSeats = totalSeats - registeredSeats;
  const progressPercent = (registeredSeats / totalSeats) * 100;

  const highlights = [
    { icon: Gift, text: "Đến là có quà, 1000+ phần quà giá trị và thiết thực" },
    { icon: Utensils, text: "Trải nghiệm xu hướng đồ ăn, uống mới nhất 2026" },
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
              <h3 className="text-2xl font-bold text-foreground mb-1 text-center">Đăng Ký Ngay</h3>
              <p className="text-muted-foreground text-sm text-center mb-5">Đếm ngược thời gian ưu đãi</p>

              {/* Countdown Timer */}
              <div className="flex gap-2 sm:gap-3 justify-center mb-6">
                {[
                  { label: "Ngày", value: timeLeft.days },
                  { label: "Giờ", value: timeLeft.hours },
                  { label: "Phút", value: timeLeft.minutes },
                  { label: "Giây", value: timeLeft.seconds }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-gray-50 rounded-xl border border-gray-100 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 w-full h-1/2 bg-black/5" />
                      <span className="text-xl sm:text-2xl font-extrabold text-primary z-10">{item.value.toString().padStart(2, '0')}</span>
                    </div>
                    <span className="text-xs text-muted-foreground mt-2 font-semibold uppercase tracking-wider">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Seat counter */}
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/15 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-foreground">Vé còn lại</span>
                  </div>
                  <span className="text-lg font-extrabold text-primary">{remainingSeats}<span className="text-sm font-medium text-muted-foreground">/{totalSeats}</span></span>
                </div>
                <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">⚡ {registeredSeats} người đã đăng ký</p>
              </div>
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
