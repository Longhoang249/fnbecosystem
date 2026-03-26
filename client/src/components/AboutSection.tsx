import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, Users, Store, Gift, CheckCircle } from "lucide-react";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const values = [
    {
      icon: FileText,
      title: "Cập nhật chính sách thuế, hoá đơn điện tử, chuẩn hoá mô hình kinh doanh và xu hướng kinh doanh ngành FnB",
      bullets: [
        // Thêm gạch đầu dòng ở đây sau
      ],
      image: "/images/feature1.jpg",
      accent: "from-emerald-500/20 to-emerald-600/5",
    },
    {
      icon: Users,
      title: "Gặp mặt chuyên gia đầu ngành: Giải đáp về thuế, vận hành và marketing thời chuyển đổi",
      bullets: [],
      image: "/images/feature2.jpg",
      accent: "from-amber-500/20 to-amber-600/5",
    },
    {
      icon: Store,
      title: "Trải nghiệm hàng chục gian hàng ẩm thực, đồ uống và giải pháp kinh doanh ngành FnB",
      bullets: [],
      image: "https://i.ibb.co/274kvqZf/d.jpg",
      accent: "from-sky-500/20 to-sky-600/5",
    },
    {
      icon: Gift,
      title: "Hàng ngàn phần quà hấp dẫn: Hơn 1000+ phần quà từ ban tổ chức",
      bullets: [],
      image: "/images/feature3.jpg",
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

        <div className="flex flex-col gap-16 md:gap-20 mt-12 max-w-5xl mx-auto px-4 md:px-0">
          {values.map((item, index) => {
            const isLeftImage = index % 2 === 0;
            return (
              <motion.div
                key={index}
                className={`flex flex-col ${isLeftImage ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 md:gap-16 group`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Image Section */}
                <div className="w-full md:w-[45%] rounded-xl overflow-hidden shadow-md">
                  <div className="aspect-[16/10] w-full relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://placehold.co/800x500/1B4332/D4A853?text=FNB+ECO+SYSTEM";
                      }}
                    />
                  </div>
                </div>

                {/* Text Section */}
                <div className="w-full md:w-[55%] flex flex-col justify-center py-2">
                  <h3 className="text-lg md:text-2xl font-semibold md:font-bold text-foreground mb-3 md:mb-4 leading-snug">
                    {item.title}
                  </h3>
                  
                  <div className="text-muted-foreground text-base leading-relaxed space-y-3 font-medium">
                    {item.bullets.length > 0 && (
                      <ul className="space-y-3">
                        {item.bullets.map((bullet, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
