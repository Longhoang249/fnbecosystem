import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

interface Testimonial {
  content: string;
  author: { name: string; role: string };
}

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const testimonials: Testimonial[] = [
    {
      content: "Sự kiện rất tuyệt vời, có đầy đủ các yếu tố mà người làm chuỗi như bọn anh cần! Mang đến những sản phẩm mới giải quyết được nhu cầu thực tế mà các quán đang gặp phải.",
      author: { name: "Mr. Đại", role: "Chủ Chuỗi O'Tea & Coffee 10+ điểm bán" },
    },
    {
      content: "Thật tuyệt vời khi VinCent được tham dự sự kiện về ngành FnB lớn như vậy tại Miền Trung. Rất vinh dự khi gặp gỡ và giao lưu với rất nhiều anh chị đầu ngành FnB đến từ khắp cả nước.",
      author: { name: "Mr. Quang Vinh", role: "CEO VinCent - Thiết bị Cà Phê & Trà Sữa Đà Nẵng" },
    },
    {
      content: "Chị thấy sự kiện rất hoành tráng, môi trường thân thiện và chuyên nghiệp. Tích hợp cả máy móc, nguyên liệu và kiến thức kinh doanh trong cùng một sự kiện — rất bất ngờ!",
      author: { name: "Mrs. Nhung", role: "Chủ đại lý nguyên liệu pha chế Quỳnh Như, Lào Cai" },
    },
  ];

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-[#0D1B14] text-white relative overflow-hidden" ref={ref}>
      {/* Background effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3">Cảm nhận</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Đánh Giá Từ{" "}
            <span className="gradient-text">Khách Mời</span>
          </h2>
          <div className="w-16 h-1 bg-secondary mx-auto rounded-full mb-6" />
          <p className="text-lg text-white/60 max-w-2xl mx-auto">Chia sẻ từ khách mời đã tham gia các workshop trước đây</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="testimonial-glass rounded-2xl p-6 md:p-8"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Quote className="w-8 h-8 text-secondary/40 mb-4" />
              <p className="text-white/80 leading-relaxed mb-6 text-sm md:text-base">
                "{testimonial.content}"
              </p>
              <div className="border-t border-white/10 pt-4">
                <h4 className="font-bold text-secondary">{testimonial.author.name}</h4>
                <p className="text-white/50 text-sm mt-0.5">{testimonial.author.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
