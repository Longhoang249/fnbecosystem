import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

interface Speaker {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export default function SpeakersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [expandedBio, setExpandedBio] = useState<number | null>(null);

  const speakers: Speaker[] = [
    {
      name: "Chuyên Gia Trà Từ Trung Quốc",
      role: "Chuyên gia trà quốc tế",
      bio: "Chuyên gia trà đến từ Trung Quốc, chia sẻ xu hướng FnB 2026 và những kiến thức chuyên sâu về trà.",
      image: "https://placehold.co/400x400/1B4332/D4A853?text=Tea+Expert",
    },
    {
      name: "Mr. Đỗ Hải",
      role: "Thông tin chưa cập nhật",
      bio: "Thông tin diễn giả đang được cập nhật. Hãy theo dõi để biết thêm chi tiết!",
      image: "https://placehold.co/400x400/1B4332/D4A853?text=DH",
    },
    {
      name: "Mrs. Đinh Thị Lan Phương",
      role: "Giám đốc Khối sản phẩm Kế toán - iPOS.vn",
      bio: "21 năm kinh nghiệm trong nghiệp vụ Kế toán và 12 năm kinh nghiệm trong lĩnh vực phát triển giải pháp kế toán ngành FnB.",
      image: "https://placehold.co/400x400/1B4332/D4A853?text=LPH",
    },
    {
      name: "Mr. Tuấn Anh",
      role: "Giám đốc vận hành chuỗi cà phê An Kinh Bắc",
      bio: "Giám đốc vận hành chuỗi cà phê An Kinh Bắc với 20 cửa hàng. Chia sẻ chiến lược đóng gói để nhân bản thương hiệu.",
      image: "https://placehold.co/400x400/1B4332/D4A853?text=TA",
    },
  ];

  return (
    <section id="speakers" className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3">Diễn giả</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">Diễn Giả Sự Kiện</h2>
          <div className="w-16 h-1 bg-secondary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Gặp gỡ và trò chuyện cùng những chuyên gia hàng đầu trong ngành đồ uống
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {speakers.map((speaker, index) => (
            <motion.div
              key={index}
              className="speaker-card group bg-white rounded-2xl overflow-hidden shadow-sm border border-border"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="speaker-overlay absolute inset-0 flex items-end p-5">
                  <p className="text-white/90 text-sm leading-relaxed">{speaker.bio}</p>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-foreground mb-1">{speaker.name}</h3>
                <p className="text-secondary text-sm font-medium">{speaker.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <button
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold py-3.5 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-primary/20 hover:-translate-y-0.5"
            onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}
          >
            Đăng Ký Để Gặp Gỡ Diễn Giả
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}