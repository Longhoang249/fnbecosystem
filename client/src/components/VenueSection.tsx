import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock } from "lucide-react";

export default function VenueSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const venues = [
    { src: "/venue/sanh-tiec.jpg", title: "Cửa chào Gold Palace", desc: "Địa chỉ dễ tìm, dễ nhận biết" },
    { src: "/venue/sanh-don.jpg", title: "Sảnh đón tiếp", desc: "Không gian tiệc sang trọng và tinh tế" },
    { src: "/venue/hoi-truong.jpg", title: "Hội trường", desc: "Sức chứa 1000 người" },
  ];

  return (
    <section id="venue" className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3">Địa điểm</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">
            Thời Gian & Địa Điểm
          </h2>
          <div className="w-16 h-1 bg-secondary mx-auto rounded-full mb-6" />

          {/* Info cards */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4">
            <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 px-5 py-3 rounded-xl">
              <Clock className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">9:00 - 17:00 | Ngày 22/04/2026</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 px-5 py-3 rounded-xl">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">Trống Đồng Place - 489 Hoàng Quốc Việt, P.Nghĩa Đô, Tp.Hà Nội</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {venues.map((venue, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-500"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="relative h-72">
                <img
                  src={venue.src}
                  alt={venue.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h4 className="font-bold text-white text-lg">{venue.title}</h4>
                  <p className="text-white/80 text-sm mt-1">{venue.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}