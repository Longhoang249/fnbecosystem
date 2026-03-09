import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
}

export default function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [lightbox, setLightbox] = useState<number | null>(null);

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
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <span className="font-bold text-foreground">4</span> sự kiện bùng nổ · <span className="font-bold text-foreground">20+</span> gian hàng · <span className="font-bold text-foreground">2000+</span> khách tham dự
          </p>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              className="break-inside-avoid group cursor-pointer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => setLightbox(index)}
            >
              <div className="relative overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg">
                    Xem ảnh
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
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
          <img
            src={galleryImages[lightbox].src}
            alt={galleryImages[lightbox].alt}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-6 text-white/70 text-sm">
            {lightbox + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </section>
  );
}