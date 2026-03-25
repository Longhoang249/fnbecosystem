import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function SponsorsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const organizingBrands = [
    "AutoShop - Vua Máy Pha Chế",
    "BODUO VIỆT NAM",
    "Tân Nhất Hương",
    "HOLYON TEA",
    "Dẻo Giải Pháp Ăn Vặt"
  ];

  const guestBrands = [
    "Wazuka",
    "Trendy",
    "iPos",
    "NLPC Bốn Phương",
    "VBM PROSPERITY JSC",
    "Minh Hạnh Food",
    "Nobita Food",
    "Cốc Giấy KK"
  ];

  // Repeat the arrays to ensure it's wide enough for large screens
  const marqueeOrganizing = Array(10).fill(organizingBrands).flat();
  const marqueeGuest = Array(10).fill(guestBrands).flat();

  return (
    <section id="sponsors" className="py-12 md:py-16 bg-white overflow-hidden" ref={ref}>
      <style>{`
        @keyframes marquee-scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-scroll-left 40s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-scroll-right 50s linear infinite;
        }
        .animate-marquee-left:hover, .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      <div className="container mx-auto px-4 mb-10">
        <motion.div
           className="text-center"
           initial={{ opacity: 0, y: 20 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-2">Đối Tác Đồng Hành</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">
            Các Thương Hiệu Nổi Bật
          </h2>
          <div className="w-12 h-1 bg-secondary mx-auto rounded-full mt-4" />
        </motion.div>
      </div>

      <div className="flex flex-col gap-6 w-full">
        {/* Row 1: Organizing Brands */}
        <div>
          <h3 className="text-center font-bold text-foreground/60 text-sm uppercase tracking-widest mb-4">Thương Hiệu Tổ Chức</h3>
          <div className="relative w-full flex overflow-hidden py-4 border-y border-border bg-primary/5">
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="flex w-max animate-marquee-left items-center px-12 md:px-24">
              {marqueeOrganizing.map((sponsor, index) => (
                <div key={index} className="flex-shrink-0 mx-8 sm:mx-12 md:mx-16 flex items-center justify-center whitespace-nowrap">
                  <button 
                    onClick={() => window.dispatchEvent(new CustomEvent('selectExhibitor', { detail: sponsor }))}
                    className="text-xl md:text-2xl font-black tracking-tight text-foreground/40 hover:text-primary transition-all duration-300 cursor-pointer select-none uppercase"
                  >
                    {sponsor}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: Guest Brands */}
        <div>
          <h3 className="text-center font-bold text-foreground/60 text-sm uppercase tracking-widest mt-2 mb-4">Thương Hiệu Khách Mời</h3>
          <div className="relative w-full flex overflow-hidden py-4 border-b border-border bg-secondary/5">
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="flex w-max animate-marquee-right items-center px-12 md:px-24">
              {marqueeGuest.map((sponsor, index) => (
                <div key={index} className="flex-shrink-0 mx-6 sm:mx-10 md:mx-14 flex items-center justify-center whitespace-nowrap">
                  <button 
                    onClick={() => window.dispatchEvent(new CustomEvent('selectExhibitor', { detail: sponsor }))}
                    className="text-lg md:text-xl font-bold tracking-tight text-foreground/50 hover:text-secondary transition-all duration-300 cursor-pointer select-none uppercase"
                  >
                    {sponsor}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
