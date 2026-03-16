import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 72, behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "Giới Thiệu", id: "about" },
    { label: "Lịch Trình", id: "venue" },
    { label: "Diễn Giả", id: "speakers" },
    { label: "Gian Hàng", id: "exhibitors" },
    { label: "Hình Ảnh", id: "gallery" },
    { label: "Đánh Giá", id: "testimonials" }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled
      ? "bg-white/95 backdrop-blur-md shadow-lg shadow-black/5"
      : "bg-transparent"
      }`}>
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 h-[2px] nav-progress" style={{ width: `${scrollProgress}%` }} />

      <div className="container mx-auto px-4 h-[72px] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`text-lg font-extrabold tracking-tight transition-colors duration-300 ${isScrolled ? 'text-primary' : 'text-white'}`}>
            FNB <span className="text-secondary">CONNECT</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${isScrolled
                ? "text-gray-700 hover:text-primary hover:bg-primary/5"
                : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick("register")}
            className="hidden sm:inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg shadow-secondary/25 hover:shadow-xl hover:shadow-secondary/30 hover:-translate-y-0.5"
          >
            Đăng Ký Ngay
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            className="md:hidden p-2 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen
              ? <X className={`w-6 h-6 ${isScrolled ? "text-gray-800" : "text-white"}`} />
              : <Menu className={`w-6 h-6 ${isScrolled ? "text-gray-800" : "text-white"}`} />
            }
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white/95 backdrop-blur-lg border-t border-black/5"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="text-left px-4 py-3 text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick("register")}
                className="mt-2 flex items-center justify-center gap-2 bg-secondary text-white px-5 py-3 rounded-xl text-sm font-semibold"
              >
                Đăng Ký Ngay
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}