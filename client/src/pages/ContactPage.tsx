import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Send, CheckCircle2, Sparkles, User, Phone, MapPin, StickyNote } from "lucide-react";
import { useState } from "react";

const brands = [
  {
    id: "autoshop",
    name: "AUTOSHOP",
    subtitle: "Vua Máy Pha Chế",
    image: "/exhibitors/autoshop.jpg",
  },
  {
    id: "boduo",
    name: "Boduo",
    subtitle: "Nguyên liệu pha chế",
    image: "https://placehold.co/120x120/1B4332/D4A853?text=BODUO",
  },
  {
    id: "holyon",
    name: "Holyon Tea",
    subtitle: "Trà cao cấp",
    image: "https://placehold.co/120x120/1B4332/D4A853?text=HOLYON",
  },
  {
    id: "nobitafood",
    name: "Nobita Food",
    subtitle: "Giải pháp F&B",
    image: "https://placehold.co/120x120/1B4332/D4A853?text=NOBITA+FOOD",
  },
  {
    id: "nhathuong",
    name: "Nhất Hương",
    subtitle: "Nguyên liệu bánh & pha chế",
    image: "https://i.postimg.cc/m26BxFBk/Post-Landing-Page-01.jpg",
  },
  {
    id: "ipos",
    name: "iPOS",
    subtitle: "Quản lý bán hàng",
    image: "https://placehold.co/120x120/1B4332/D4A853?text=iPOS",
  },
];

const schema = z.object({
  fullName: z.string().min(2, { message: "Họ và tên phải có ít nhất 2 ký tự" }),
  phone: z.string().regex(/^[0-9]{10,11}$/, { message: "Số điện thoại phải có 10-11 chữ số" }),
  area: z.string().min(1, { message: "Vui lòng nhập khu vực sinh sống" }),
  brands: z.array(z.string()).min(1, { message: "Vui lòng chọn ít nhất 1 thương hiệu" }),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycby02CON5xPoePykTVHVk9XtmIQdFcJUu7pmxl4zssiec9l2Jk0KDx2r4AYPyGNfX0c/exec";

export default function ContactPage() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: "", phone: "", area: "", brands: [], notes: "" },
  });

  const selectedBrands = form.watch("brands");

  const toggleBrand = (brandId: string) => {
    const current = form.getValues("brands");
    if (current.includes(brandId)) {
      form.setValue("brands", current.filter((b) => b !== brandId), { shouldValidate: true });
    } else {
      form.setValue("brands", [...current, brandId], { shouldValidate: true });
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const brandNames = data.brands
        .map((id) => brands.find((b) => b.id === id)?.name)
        .filter(Boolean)
        .join(", ");

      const formData = new window.FormData();
      formData.append("fullName", data.fullName);
      formData.append("phone", data.phone);
      formData.append("area", data.area);
      formData.append("brands", brandNames);
      formData.append("notes", data.notes || "");
      formData.append("source", "QR-LienHe");

      await fetch(GOOGLE_SHEET_URL, { method: "POST", mode: "no-cors", body: formData });
      setSubmitted(true);
      toast({ title: "Gửi Thành Công! 🎉", description: "Cảm ơn bạn đã để lại thông tin." });
    } catch {
      toast({ title: "Gửi thất bại", description: "Vui lòng thử lại sau.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Để Lại Thông Tin | FNB CONNECT 2026</title>
        <meta name="description" content="Để lại thông tin liên hệ tại FNB CONNECT 2026" />
      </Helmet>

      <div className="qr-page min-h-screen bg-gradient-to-b from-[#0D1B14] via-[#132A1E] to-[#0D1B14] flex items-center justify-center p-4">
        <motion.div
          className="w-full max-w-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="text-center mb-6">
            <motion.div
              className="inline-flex items-center gap-2 bg-secondary/20 border border-secondary/30 text-secondary px-4 py-1.5 rounded-full text-sm font-medium mb-4 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4" />
              FNB CONNECT 2026
            </motion.div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-1 tracking-tight">
              Để Lại Thông Tin Liên Hệ
            </h1>
            <p className="text-white/50 text-sm">Kết nối cùng các thương hiệu hàng đầu</p>
          </div>

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
              <h2 className="text-2xl font-bold text-foreground mb-3">Gửi Thành Công!</h2>
              <p className="text-muted-foreground mb-6">Cảm ơn bạn đã để lại thông tin. Đội ngũ chúng tôi sẽ liên hệ với bạn sớm nhất.</p>
              <a
                href="/"
                className="inline-flex items-center gap-2 text-primary hover:text-secondary font-medium transition-colors"
              >
                Xem chi tiết sự kiện →
              </a>
            </motion.div>
          ) : (
            <motion.div
              className="bg-white rounded-2xl p-5 md:p-7 shadow-2xl shadow-black/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  {/* Full Name */}
                  <FormField control={form.control} name="fullName" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-primary" />
                        Họ và tên <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <input placeholder="Nguyễn Văn A" {...field} className="modern-input" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  {/* Phone */}
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-primary" />
                        Số điện thoại <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <input placeholder="0912345678" type="tel" {...field} className="modern-input" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  {/* Area */}
                  <FormField control={form.control} name="area" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-primary" />
                        Khu vực bạn sinh sống <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <input placeholder="VD: Hà Nội, TP.HCM, Đà Nẵng..." {...field} className="modern-input" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  {/* Brand Selection */}
                  <FormField control={form.control} name="brands" render={() => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground mb-3 block">
                        Nhu cầu bạn quan tâm <span className="text-red-500">*</span>
                        <span className="text-xs text-muted-foreground ml-1 font-normal">(chọn nhiều thương hiệu)</span>
                      </FormLabel>
                      <div className="grid grid-cols-2 gap-3">
                        {brands.map((brand) => {
                          const isSelected = selectedBrands.includes(brand.id);
                          return (
                            <motion.button
                              key={brand.id}
                              type="button"
                              onClick={() => toggleBrand(brand.id)}
                              className={`brand-checkbox relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-300 ${
                                isSelected
                                  ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                                  : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100"
                              }`}
                              whileTap={{ scale: 0.97 }}
                            >
                              {/* Check indicator */}
                              {isSelected && (
                                <motion.div
                                  className="absolute top-1.5 right-1.5 w-5 h-5 bg-primary rounded-full flex items-center justify-center"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring", stiffness: 300 }}
                                >
                                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                </motion.div>
                              )}

                              {/* Brand Logo */}
                              <div className="w-14 h-14 rounded-xl overflow-hidden bg-white border border-gray-100 flex-shrink-0">
                                <img
                                  src={brand.image}
                                  alt={brand.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = `https://placehold.co/120x120/1B4332/D4A853?text=${encodeURIComponent(brand.name)}`;
                                  }}
                                />
                              </div>

                              {/* Brand Info */}
                              <div className="text-center">
                                <p className={`text-xs font-bold leading-tight ${isSelected ? "text-primary" : "text-foreground"}`}>
                                  {brand.name}
                                </p>
                                <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                                  {brand.subtitle}
                                </p>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )} />

                  {/* Notes */}
                  <FormField control={form.control} name="notes" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground flex items-center gap-1.5">
                        <StickyNote className="w-3.5 h-3.5 text-primary" />
                        Ghi chú
                      </FormLabel>
                      <FormControl>
                        <textarea
                          placeholder="Nhập ghi chú hoặc yêu cầu thêm..."
                          {...field}
                          rows={3}
                          className="modern-input resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-50 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
                  >
                    {isSubmitting ? "Đang gửi..." : (
                      <>
                        Gửi Thông Tin
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
            transition={{ delay: 0.5 }}
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
