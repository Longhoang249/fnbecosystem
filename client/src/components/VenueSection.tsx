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
        </motion.div>

        <motion.div
          className="mt-8 md:mt-12 max-w-5xl mx-auto rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-border"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img 
            src="https://i.ibb.co/jPZ67sXm/so-o-web.png" 
            alt="Sơ đồ sự kiện" 
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
}