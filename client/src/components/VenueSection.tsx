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
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
            <div className="flex items-center justify-center gap-2 flex-shrink-0 bg-primary/5 border border-primary/10 px-5 py-3 rounded-xl w-full sm:w-auto">
              <Clock className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="font-semibold text-foreground text-center">9:00 - 17:00 | Ngày 22/04/2026</span>
            </div>
            <div className="flex items-center justify-center gap-2 flex-shrink-0 bg-primary/5 border border-primary/10 px-5 py-3 rounded-xl w-full sm:w-auto">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="font-semibold text-foreground text-center">Tầng 3 toà nhà The Zei - Số 8 Lê Đức Thọ, Tp.Hà Nội</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {venues.map((venue, index) => (
            <motion.div
              key={index}
              className="group bg-white rounded-2xl shadow-sm border border-border p-3 flex flex-row items-center gap-4 hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="relative w-28 sm:w-1/3 aspect-square sm:aspect-[4/3] rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={venue.src}
                  alt={venue.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col">
                <h4 className="font-bold text-foreground text-base sm:text-lg mb-1 leading-tight">{venue.title}</h4>
                <p className="text-muted-foreground text-xs sm:text-sm">{venue.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}