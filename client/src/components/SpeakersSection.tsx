import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

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
      name: "Mr. Hải Đây",
      role: "Nhà sáng lập Học viện Lan Truyền CoreViral - Hải Đây",
      bio: "5 Năm kinh nghiệm Brand Manager.\n6 Tỷ view viral cho các doanh nghiệp trên nền tảng social media.\n1 Nút vàng 7 nút bạc Youtube.\nTOP 20 nhà sáng tạo nội dung xuất sắc nhất Việt Nam Youtube Short.\nHợp tác huấn luyện hơn 100+ doanh nghiệp như FPT Polytechnic, The Bad God, Nerman, The Orbit...",
      image: "/do_hai.webp",
    },
    {
      name: "Mr. Hàn Cương",
      role: "Nhà sáng lập Công ty Trà Hậu Đường Hà Nam",
      bio: "Cung cấp trà chất lượng cao hàng đầu trong ngành, là đối tác của nhiều chuỗi nhà hàng và thương hiệu đồ uống nổi tiếng tại Trung Quốc như:\nShuyi Shao Xiancao, Juan Tea, Mixue Bingcheng, Guming, Ningji, Jilatuo, Chagee (Bawang Chaji), Bingchun Tea, 7FenTian, Bingo Fresh Tea, Banu Hotpot, Jiediliang cùng nhiều thương hiệu khác.",
      image: "/han_cuong.webp",
    },
    {
      name: "Mrs. Đinh Thị Lan Phương",
      role: "Giám đốc Khối sản phẩm Kế toán của iPOS.vn",
      bio: "21 năm kinh nghiệm trong nghiệp vụ Kế toán và 12 năm Kinh nghiệm trong lĩnh vực phát triển giải pháp kế toán ngành FnB",
      image: "/lan_phuong.webp",
    },
    {
      name: "Phạm Văn Tuấn Anh",
      role: "Giám đốc vận hành chuỗi cà phê An Kinh Bắc",
      bio: "Giám đốc vận hành chuỗi cà phê An Kinh Bắc với 15+ cửa hàng.",
      image: "/tuan_anh.webp",
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

        {/* Mobile Slider using Swiper */}
        <div className="block sm:hidden w-full pb-8 overflow-hidden">
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={20}
            slidesPerView={1.2}
            centeredSlides={true}
            loop={true}
            speed={800}
            navigation={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            className="w-full relative [&_.swiper-button-next]:text-primary [&_.swiper-button-prev]:text-primary [&_.swiper-button-next]:w-10 [&_.swiper-button-next]:h-10 [&_.swiper-button-next]:bg-white/80 [&_.swiper-button-next]:rounded-full [&_.swiper-button-next:after]:text-lg [&_.swiper-button-prev]:w-10 [&_.swiper-button-prev]:h-10 [&_.swiper-button-prev]:bg-white/80 [&_.swiper-button-prev]:rounded-full [&_.swiper-button-prev:after]:text-lg [&_.swiper-button-next]:shadow-md [&_.swiper-button-prev]:shadow-md"
          >
            {[...speakers, ...speakers].map((speaker, index) => (
              <SwiperSlide key={index} className="h-auto">
                <div className="speaker-card group bg-white rounded-2xl overflow-hidden shadow-sm border border-border h-full">
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="speaker-image w-full h-full object-cover object-center transition-all duration-700"
                      loading="lazy"
                    />
                    <div className="speaker-overlay absolute inset-0 flex items-end p-5">
                      <p className="text-white font-semibold text-sm leading-relaxed whitespace-pre-line drop-shadow-md">{speaker.bio}</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-foreground mb-1">{speaker.name}</h3>
                    <p className="text-secondary text-sm font-medium">{speaker.role}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop Grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  className="speaker-image w-full h-full object-cover object-center transition-all duration-700"
                  loading="lazy"
                />
                <div className="speaker-overlay absolute inset-0 flex items-end p-5">
                  <p className="text-white font-semibold text-sm leading-relaxed whitespace-pre-line drop-shadow-md">{speaker.bio}</p>
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