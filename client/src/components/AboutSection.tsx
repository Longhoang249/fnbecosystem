import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Users, Gift } from "lucide-react";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const features = [
    {
      icon: Zap,
      title: "Cập nhật xu hướng FnB 2026",
      description: "Trải nghiệm những sản phẩm, dịch vụ FnB mới nhất",
      image: "/images/feature1.jpg",
      accent: "from-emerald-500/20 to-emerald-600/5",
    },
    {
      icon: Users,
      title: "Gặp mặt chuyên gia đầu ngành",
      description: "Giải đáp về thuế, vận hành và marketing thời chuyển đổi",
      image: "/images/feature2.jpg",
      accent: "from-amber-500/20 to-amber-600/5",
    },
    {
      icon: Gift,
      title: "Hàng ngàn phần quà hấp dẫn",
      description: "1000+ phần quà từ ban tổ chức",
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
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3">Về sự kiện</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight">
            Chương Mới Trong<br />
            <span className="gradient-text">Ngành FnB 2026</span>
          </h2>
          <div className="w-16 h-1 bg-secondary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Workshop FnB Eco System quy tụ hàng ngàn chủ quán, đại lý, nhà phân phối và các thương hiệu hoạt động trong ngành FnB. Là sân chơi hàng đầu để kết nối kinh doanh và cập nhật xu hướng mới nhất ngành đồ uống Việt Nam.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-border"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/600x400/1B4332/D4A853?text=FNB+ECO+SYSTEM";
                  }}
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${feature.accent}`} />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2.5 rounded-xl shadow-sm">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
