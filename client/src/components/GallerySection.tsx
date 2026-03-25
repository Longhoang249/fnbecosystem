import { motion, useInView, animate } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

interface GalleryImage {
  src: string;
  alt: string;
}

export default function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const AnimatedNumber = ({ to, suffix = "", isInView }: { to: number; suffix?: string; isInView: boolean }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
      if (isInView) {
        const controls = animate(0, to, {
          duration: 5,
          ease: "easeOut",
          onUpdate(value) {
            setCount(Math.floor(value));
          }
        });
        return () => controls.stop();
      }
    }, [to, isInView]);
    return <span>{count}{suffix}</span>;
  };

  const galleryImages: GalleryImage[] = [
    { src: "https://i.imgur.com/Ez4k6Ib.jpg", alt: "Diễn giả chia sẻ tại workshop" },
    { src: "https://i.imgur.com/6tSlEKl.jpg", alt: "Diễn giả 1 tại workshop" },
    { src: "https://i.imgur.com/LEENQun.jpg", alt: "Diễn giả 2 phát biểu" },
    { src: "https://i.imgur.com/Qp339BS.jpg", alt: "Gian hàng tại sự kiện" },
    { src: "https://i.imgur.com/Wsrbsxi.jpg", alt: "Khu vực trưng bày sản phẩm" },
    { src: "https://i.imgur.com/JaIESCK.jpg", alt: "Hội thảo chuyên đề" },
    { src: "https://i.imgur.com/PxhKEBp.jpg", alt: "Toàn cảnh hội trường" },
    { src: "https://i.imgur.com/bXkXb4D.jpg", alt: "Khách hàng kết nối với chuyên gia" },
    { src: "https://i.imgur.com/YyetSeg.jpg", alt: "Trải nghiệm sản phẩm" },
    { src: "https://i.imgur.com/0Td0BrV.jpg", alt: "Dùng thử sản phẩm mới" },
    { src: "https://i.imgur.com/pGA8KDp.jpg", alt: "Máy pha chế hiện đại" },
    { src: "https://i.imgur.com/W0OTgL3.jpg", alt: "Thiết bị tại workshop" },
  ];

  return (
    <section id="gallery" className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3">Nhìn lại các sự kiện từng được tổ chức</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">Hình Ảnh Sự Kiện</h2>
          <div className="w-16 h-1 bg-secondary mx-auto rounded-full mb-6" />
          <div className="flex flex-row items-center justify-between md:justify-center md:gap-12 bg-primary/5 border border-primary/10 rounded-2xl py-5 px-3 md:px-8 max-w-3xl mx-auto mt-8 shadow-sm whitespace-nowrap overflow-x-auto hide-scrollbar">
            <div className="flex flex-col items-center px-1 sm:px-4 md:px-6">
              <span className="text-3xl md:text-5xl font-black text-primary mb-1">
                <AnimatedNumber to={4} isInView={isInView} />
              </span>
              <span className="text-[10px] sm:text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-wider md:tracking-widest">Sự kiện</span>
            </div>
            <div className="w-px h-10 md:h-12 bg-border"></div>
            <div className="flex flex-col items-center px-1 sm:px-4 md:px-6">
              <span className="text-3xl md:text-5xl font-black text-primary mb-1">
                <AnimatedNumber to={20} suffix="+" isInView={isInView} />
              </span>
              <span className="text-[10px] sm:text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-wider md:tracking-widest">Gian hàng</span>
            </div>
            <div className="w-px h-10 md:h-12 bg-border"></div>
            <div className="flex flex-col items-center px-1 sm:px-4 md:px-6">
              <span className="text-3xl md:text-5xl font-black text-primary mb-1">
                <AnimatedNumber to={2000} suffix="+" isInView={isInView} />
              </span>
              <span className="text-[10px] sm:text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-wider md:tracking-widest">Khách tham dự</span>
            </div>
          </div>
        </motion.div>

        {/* Swiper Gallery */}
        <div className="w-full max-w-5xl mx-auto h-[350px] md:h-[550px] mb-4">
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            modules={[FreeMode, Navigation, Thumbs, Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            className="h-full w-full rounded-2xl shadow-md [&_.swiper-button-next]:text-white [&_.swiper-button-prev]:text-white [&_.swiper-button-next]:bg-black/20 [&_.swiper-button-prev]:bg-black/20 [&_.swiper-button-next]:w-12 [&_.swiper-button-next]:h-12 [&_.swiper-button-prev]:w-12 [&_.swiper-button-prev]:h-12 [&_.swiper-button-next]:rounded-full [&_.swiper-button-prev]:rounded-full hover:[&_.swiper-button-next]:bg-black/40 hover:[&_.swiper-button-prev]:bg-black/40 transition-all [&_.swiper-button-next:after]:text-xl [&_.swiper-button-prev:after]:text-xl"
          >
            {galleryImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div 
                  className="w-full h-full relative cursor-pointer group"
                  onClick={() => setLightbox(index)}
                >
                  <img src={image.src} alt={image.alt} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg">
                      Phóng to ảnh
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Thumbnail Swiper */}
        <div className="w-full max-w-5xl mx-auto h-20 md:h-28 px-0">
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            breakpoints={{
              640: { slidesPerView: 6 },
              1024: { slidesPerView: 8 },
            }}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="h-full w-full [&_.swiper-slide-thumb-active]:border-2 [&_.swiper-slide-thumb-active]:border-primary [&_.swiper-slide-thumb-active]:opacity-100 [&_.swiper-slide]:opacity-50 [&_.swiper-slide]:cursor-pointer [&_.swiper-slide]:rounded-lg [&_.swiper-slide]:overflow-hidden [&_.swiper-slide]:transition-all"
          >
            {galleryImages.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image.src} alt={image.alt} className="w-full h-full object-cover" loading="lazy" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <button
            className="absolute left-4 md:left-10 text-white/80 hover:text-white hover:bg-black/20 p-2 rounded-full transition-all"
            onClick={(e) => {
               e.stopPropagation();
               setLightbox((prev) => prev !== null ? (prev === 0 ? galleryImages.length - 1 : prev - 1) : null);
            }}
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          
          <img
            src={galleryImages[lightbox].src}
            alt={galleryImages[lightbox].alt}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          
          <button
            className="absolute right-4 md:right-10 text-white/80 hover:text-white hover:bg-black/20 p-2 rounded-full transition-all"
            onClick={(e) => {
               e.stopPropagation();
               setLightbox((prev) => prev !== null ? (prev === galleryImages.length - 1 ? 0 : prev + 1) : null);
            }}
          >
            <ChevronRight className="w-10 h-10" />
          </button>
          <div className="absolute bottom-6 text-white/70 text-sm">
            {lightbox + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </section>
  );
}