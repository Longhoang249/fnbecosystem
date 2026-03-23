import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, Users, Store, Gift, CheckCircle } from "lucide-react";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const values = [
    {
      icon: FileText,
      title: "Cập Nhật Chính Sách Thuế, Hoá Đơn Điện Tử, Chuẩn Hoá Mô Hình Kinh Doanh và Xu Hướng Kinh Doanh Ngành FnB",
      bullets: [
        // Thêm gạch đầu dòng ở đây sau
      ],
      image: "/images/feature1.jpg",
      accent: "from-emerald-500/20 to-emerald-600/5",
    },
    {
      icon: Users,
      title: "Gặp Mặt Chuyên Gia Đầu Ngành",
      bullets: [
        "Giải đáp về thuế, vận hành và marketing thời chuyển đổi",
      ],
      image: "/images/feature2.jpg",
      accent: "from-amber-500/20 to-amber-600/5",
    },
    {
      icon: Store,
      title: "Trải Nghiệm Hàng Chục Gian Hàng Ẩm Thực, Đồ Uống Và Giải Pháp Kinh Doanh Ngành FnB",
      bullets: [],
      image: "/images/feature3.jpg",
      accent: "from-sky-500/20 to-sky-600/5",
    },
    {
      icon: Gift,
      title: "Hàng Ngàn Phần Quà Hấp Dẫn",
      bullets: [
        "1000+ phần quà từ ban tổ chức",
      ],
      image: "/images/feature4.jpg",
      accent: "from-rose-500/20 to-rose-600/5",
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3">Giá trị dành cho bạn</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight">
            Bạn Sẽ Nhận Được Gì<br />
            <span className="gradient-text">Khi Tới Sự Kiện?</span>
          </h2>
          <div className="w-16 h-1 bg-secondary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Workshop FnB Connect quy tụ hàng ngàn chủ quán, đại lý, nhà phân phối và các thương hiệu hoạt động trong ngành FnB. Là sân chơi hàng đầu để kết nối kinh doanh và cập nhật xu hướng mới nhất ngành đồ uống Việt Nam.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((item, index) => (
            <motion.div
              key={index}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-border"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.12 }}
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/600x400/1B4332/D4A853?text=FNB+ECO+SYSTEM";
                  }}
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${item.accent}`} />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2.5 rounded-xl shadow-sm">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">{item.title}</h3>
                {item.bullets.length > 0 && (
                  <ul className="space-y-2">
                    {item.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm leading-relaxed">
                        <CheckCircle className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
