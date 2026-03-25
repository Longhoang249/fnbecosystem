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
      name: "Mr. Đỗ Hải",
      role: "Viral Marketing",
      bio: "Thông tin diễn giả đang được cập nhật. Hãy theo dõi để biết thêm chi tiết!",
      image: "/do_hai.jpg",
    },
    {
      name: "Mr. Hàn Cương",
      role: "Chuyên gia trà Trung Quốc",
      bio: "Xu hướng FnB châu Á",
      image: "/han_cuong.jpg",
    },
    {
      name: "Mrs. Đinh Thị Lan Phương",
      role: "Giám đốc khối sản phẩm kế toán iPOS",
      bio: "Trao đổi thêm về chủ đề iPOS:\n- Chia sẻ thêm về những thay đổi chính sách thuế cho hộ kinh doanh và hoá đơn điện tử",
      image: "/lan_phuong.jpg",
    },
    {
      name: "Phạm Văn Tuấn Anh",
      role: "Giám Đốc vận hành chuỗi An Kinh Bắc",
      bio: "Quản lý nhân sự và đóng gói chuỗi hệ thống.\nChủ chuỗi 20 cửa hàng - Đóng gói mô hình để nhân bản",
      image: "/tuan_anh.jpg",
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
                      className="w-full h-full object-cover object-center transition-transform duration-700"
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