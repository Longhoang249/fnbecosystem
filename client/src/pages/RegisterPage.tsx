import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, MapPin, Ticket, Send, CheckCircle2, Sparkles } from "lucide-react";
import { useState } from "react";

const schema = z.object({
  fullName: z.string().min(2, { message: "Họ và tên phải có ít nhất 2 ký tự" }),
  phone: z.string().regex(/^[0-9]{10,11}$/, { message: "Số điện thoại phải có 10-11 chữ số" }),
  ticketCount: z.string().regex(/^[0-9]+$/, { message: "Số lượng vé phải là số" }),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycby02CON5xPoePykTVHVk9XtmIQdFcJUu7pmxl4zssiec9l2Jk0KDx2r4AYPyGNfX0c/exec";

const eventInfo = [
  { icon: Calendar, text: "22 tháng 4, 2026" },
  { icon: Clock, text: "9:00 - 17:00" },
  { icon: MapPin, text: "Trống Đồng Place, Hà Nội" },
  { icon: Ticket, text: "Miễn phí" },
];

export default function RegisterPage() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: "", phone: "", ticketCount: "1", message: "" },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("phone", data.phone);
      formData.append("ticketCount", data.ticketCount);
      formData.append("message", data.message || "");
      formData.append("source", "QR-DangKy");
      await fetch(GOOGLE_SHEET_URL, { method: "POST", mode: "no-cors", body: formData });
      setSubmitted(true);
      toast({ title: "Đăng Ký Thành Công! 🎉", description: "Chúng tôi sẽ liên hệ với bạn sớm nhất." });
    } catch {
      toast({ title: "Đăng ký thất bại", description: "Vui lòng thử lại sau.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Đăng Ký Tham Dự | FNB CONNECT 2026</title>
        <meta name="description" content="Đăng ký tham dự FNB CONNECT 2026 - Chương mới trong ngành FnB" />
      </Helmet>

      <div className="qr-page min-h-screen bg-gradient-to-b from-[#0D1B14] via-[#132A1E] to-[#0D1B14] flex items-center justify-center p-4">
        <motion.div
          className="w-full max-w-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="inline-flex items-center gap-2 bg-secondary/20 border border-secondary/30 text-secondary px-4 py-1.5 rounded-full text-sm font-medium mb-5 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4" />
              Vé vào cửa miễn phí
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">
              FNB CONNECT
            </h1>
            <p className="text-white/60 text-sm">Chương mới trong ngành FnB 2026</p>
          </div>

          {/* Event info badges */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {eventInfo.map((info, i) => (
              <div key={i} className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-lg text-xs">
                <info.icon className="w-3.5 h-3.5 text-secondary" />
                <span className="text-white/80">{info.text}</span>
              </div>
            ))}
          </motion.div>

          {/* Form Card */}
          {submitted ? (
            <motion.div
              className="bg-white rounded-2xl p-10 text-center shadow-2xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-5" />
              </motion.div>
              <h2 className="text-2xl font-bold text-foreground mb-3">Đăng Ký Thành Công!</h2>
              <p className="text-muted-foreground mb-6">Cảm ơn bạn đã đăng ký. Chúng tôi sẽ liên hệ xác nhận sớm nhất.</p>
              <a
                href="/"
                className="inline-flex items-center gap-2 text-primary hover:text-secondary font-medium transition-colors"
              >
                Xem chi tiết sự kiện →
              </a>
            </motion.div>
          ) : (
            <motion.div
              className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl shadow-black/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-xl font-bold text-foreground mb-6 text-center">Đăng Ký Tham Dự</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField control={form.control} name="fullName" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">Họ và tên <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <input placeholder="Nguyễn Văn A" {...field} className="modern-input" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">Số điện thoại <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <input placeholder="0912345678" type="tel" {...field} className="modern-input" />
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
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 disabled:opacity-50 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 shadow-lg shadow-secondary/25 hover:shadow-xl hover:shadow-secondary/30 hover:-translate-y-0.5"
                  >
                    {isSubmitting ? "Đang xử lý..." : (
                      <>
                        Nhận vé tham dự miễn phí
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </Form>
            </motion.div>
          )}

          {/* Footer link */}
          <motion.div
            className="text-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <a href="/" className="text-white/40 hover:text-white/70 text-xs transition-colors">
              fnbconnect.vn
            </a>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
