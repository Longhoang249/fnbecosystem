import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Play, Sparkles } from "lucide-react";

export default function EventVideoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isPlaying, setIsPlaying] = useState(false);

  const videoId = "j5VHWk224u4";
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <section
      id="event-video"
      className="py-20 md:py-28 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden"
      ref={ref}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-[0.03]"
          style={{
            background:
              "radial-gradient(circle, hsl(152, 50%, 22%), transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-[0.03]"
          style={{
            background:
              "radial-gradient(circle, hsl(152, 40%, 38%), transparent 70%)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 text-secondary font-semibold text-sm uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4" />
            Sự kiện nổi bật
            <Sparkles className="w-4 h-4" />
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">
            Sự Kiện{" "}
            <span className="gradient-text">Không Thể Bỏ Lỡ</span>
          </h2>
          <div className="w-16 h-1 bg-secondary mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Xem ngay video giới thiệu chương trình — nơi quy tụ những chuyên gia
            hàng đầu ngành FnB và cơ hội kết nối kinh doanh độc quyền.
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-border/60 group">
            {/* Glow effect behind the video */}
            <div
              className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 blur-xl"
              style={{
                background:
                  "linear-gradient(135deg, hsl(152, 50%, 22%, 0.15), hsl(152, 40%, 38%, 0.15))",
              }}
            />

            {!isPlaying ? (
              /* Thumbnail with play button */
              <div
                className="relative cursor-pointer aspect-video"
                onClick={() => setIsPlaying(true)}
              >
                <img
                  src={thumbnailUrl}
                  alt="Video giới thiệu sự kiện FNB CONNECT"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-500" />

                {/* Center play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Pulse ring animation */}
                    <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" style={{ animationDuration: "2s" }} />
                    <div
                      className="relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-2xl"
                      style={{
                        background:
                          "linear-gradient(135deg, hsl(152, 50%, 22%), hsl(152, 40%, 38%))",
                      }}
                    >
                      <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" />
                    </div>
                  </motion.div>
                </div>

                {/* Bottom gradient text */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-white font-semibold text-lg md:text-xl">
                    ▶ Nhấn để xem video
                  </p>
                </div>
              </div>
            ) : (
              /* YouTube iframe */
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                  title="Video giới thiệu sự kiện FNB CONNECT"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
