import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Ticket, ArrowRight, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

interface HeroSectionProps {
  eventDate: string;
  eventTime: string;
  eventLocation: string;
}

function CountdownTimer() {
  const targetDate = new Date("2026-04-22T09:00:00+07:00").getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, targetDate - now);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / (1000 * 60)) % 60),
        secs: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { label: "Ngày", value: timeLeft.days },
    { label: "Giờ", value: timeLeft.hours },
    { label: "Phút", value: timeLeft.mins },
    { label: "Giây", value: timeLeft.secs },
  ];

  return (
    <div className="flex gap-3 md:gap-4">
      {items.map((item) => (
        <div key={item.label} className="stat-card rounded-xl px-4 py-3 md:px-5 md:py-4 text-center min-w-[64px]">
          <div className="text-2xl md:text-3xl font-extrabold text-white tabular-nums">
            {String(item.value).padStart(2, "0")}
          </div>
          <div className="text-[11px] md:text-xs text-white/60 uppercase tracking-wider mt-1">{item.label}</div>
        </div>
      ))}
    </div>
  );
}

export default function HeroSection({ eventDate, eventTime, eventLocation }: HeroSectionProps) {

  const infoBadges = [
    { icon: Calendar, text: eventDate },
    { icon: Clock, text: eventTime },
    { icon: Ticket, text: "Miễn Phí" },
    { icon: MapPin, text: "Trống Đồng Place, Tp. Hà Nội" },
  ];

  return (
    <section className="hero-section relative flex items-center justify-center text-white">
      {/* Vimeo background video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <iframe
          src="https://player.vimeo.com/video/1171624958?background=1&autoplay=1&loop=1&muted=1&quality=720p"
          className="absolute top-0 left-0 w-full h-full border-0 pointer-events-none"
          style={{
            width: '100vw',
            height: '56.25vw', /* 16:9 ratio */
            minHeight: '100vh',
            minWidth: '177.78vh', /* 16:9 ratio inverse */
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          allow="autoplay; fullscreen"
          title="FNB CONNECT Background"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B14]/70 via-[#0D1B14]/50 to-[#0D1B14]/80 z-10" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20 text-center py-32 md:py-0">
        {/* Free badge */}
        <motion.div
          className="inline-flex items-center gap-2 bg-secondary/20 border border-secondary/30 text-secondary px-4 py-1.5 rounded-full text-sm font-medium mb-8 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Sparkles className="w-4 h-4" />
          Vé vào cửa miễn phí
        </motion.div>

        {/* Event name */}
        <motion.h1
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-2 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          FNB CONNECT
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-lg md:text-2xl mb-8 max-w-2xl mx-auto font-medium text-white/90 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Chương mới trong ngành FnB 2026
        </motion.p>

        {/* Countdown */}
        <motion.div
          className="flex justify-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <CountdownTimer />
        </motion.div>

        {/* Info badges */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {infoBadges.map((badge, i) => (
            <div
              key={i}
              className="stat-card flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
            >
              <badge.icon className="w-4 h-4 text-secondary" />
              <span className="text-white/90">{badge.text}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <button
            className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold py-4 px-10 rounded-2xl text-lg transition-all duration-300 shadow-xl shadow-secondary/25 hover:shadow-2xl hover:shadow-secondary/30 hover:-translate-y-1"
            onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}
          >
            Đăng Ký Tham Dự
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 w-full z-20">
        <svg viewBox="0 0 1440 80" className="w-full h-auto" preserveAspectRatio="none">
          <path fill="hsl(40, 20%, 98%)" d="M0,40 C360,80 720,0 1080,40 C1260,60 1360,50 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  );
}