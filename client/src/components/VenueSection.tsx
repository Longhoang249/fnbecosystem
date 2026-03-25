import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock } from "lucide-react";

export default function VenueSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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
      </div>
    </section>
  );
}