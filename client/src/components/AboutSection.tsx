import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle, ArrowRight, Coffee, CakeSlice, CupSoda, Monitor, Paintbrush } from "lucide-react";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const speakerTopics = [
    {
      avatar: "/do_hai.jpg",
      title: "Lợi Dụng Thuật Toán Tăng Trưởng Tỷ Views, Xây Kênh Viral Đa Nền Tảng",
      desc: "Bí quyết từ chuyên gia sở hữu 6 tỷ views và 1 nút vàng YouTube, giúp quán của bạn bùng nổ trên mạng xã hội.",
    },
    {
      avatar: "/lan_phuong.jpg",
      title: "Chuyển Đổi Số Trong Quản Lý Thuế: Từ Tuân Thủ Đến Tối Ưu Vận Hành",
      desc: "21 năm kinh nghiệm kế toán FnB, cập nhật chính sách thuế mới nhất, hoá đơn điện tử và cách tối ưu chi phí vận hành.",
    },
    {
      avatar: "/han_cuong.jpg",
      title: "Giải Mã Cơn Sốt Trà Hoa Ướp Hương Tại Trung Quốc 2026",
      desc: "Xu hướng đang chiếm sóng thị trường tỷ đô. Phân tích từ nhà cung cấp trà hàng đầu cho Mixue, Chagee, Guming.",
    },
    {
      avatar: "/tuan_anh.jpg",
      title: "Đóng Gói Để Nhân Bản Thương Hiệu FnB",
      desc: "Kinh nghiệm thực chiến vận hành 15+ cửa hàng chuỗi, từ 1 quán nhỏ đến mô hình nhượng quyền bài bản.",
    },
  ];

  const boothCategories = [
    { icon: Coffee, label: "Nguyên liệu pha chế" },
    { icon: CakeSlice, label: "Đồ ăn & Bánh" },
    { icon: null, label: "Máy móc pha chế", customIcon: true },
    { icon: CupSoda, label: "Dụng cụ & Bao bì" },
    { icon: Monitor, label: "Phần mềm quản lý" },
    { icon: Paintbrush, label: "Thiết kế thi công quán" },
  ];

  const highlights = [
    "Cập nhật mới nhất về thuế và cách thích ứng với mô hình kinh doanh",
    "Nắm trong tay xu hướng FnB để mau chóng tăng trưởng doanh thu",
    "Giao lưu, kết nối 1000+ chủ quán, chủ chuỗi, nhà cung cấp",
    "1000+ phần quà giá trị và thiết thực từ sự kiện",
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="container mx-auto px-4 max-w-5xl">

        {/* ── Section Header ── */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">Giá trị dành cho bạn</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight">
            Tại Sao Chủ Quán<br />
            <span className="gradient-text">Không Nên Bỏ Lỡ<br className="md:hidden" /> F&B Connect?</span>
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-6" />
          <div className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed space-y-4">
            <p>
              <strong className="text-foreground">F&B Connect</strong> là sự kiện FnB quy mô bậc nhất Việt Nam, được đồng tổ chức bởi 5 đơn vị uy tín trong ngành F&B: <strong className="text-foreground">Autoshop, Boduo, Nhất Hương, Dẻo và Holyon Tea</strong> với mong muốn xây dựng cộng đồng chủ quán ăn uống Việt Nam phát triển vượt trội và thích ứng tốt giữa những biến động thị trường.
            </p>
            <p>
              Với chủ đề <strong className="text-foreground">"Kết nối nguồn lực, mở rộng cơ hội"</strong>, <strong className="text-foreground">F&B Connect 2026</strong> mang tới thông điệp mạnh mẽ về sự liên kết những mắt xích khác nhau trong ngành ăn uống để tạo nên hệ sinh thái toàn diện, hỗ trợ lẫn nhau phát triển kinh doanh, phòng tránh rủi ro, cùng hướng tới thành công bền vững.
            </p>
          </div>
        </motion.div>

        {/* ── 4 Speaker Topics ── */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px flex-1 max-w-[60px] bg-border" />
            <h3 className="text-lg md:text-xl font-bold text-foreground text-center">
              4 chủ đề chuyên sâu từ chuyên gia đầu ngành
            </h3>
            <div className="h-px flex-1 max-w-[60px] bg-border" />
          </div>

          <div className="space-y-4">
            {speakerTopics.map((topic, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-4 md:gap-5 bg-gray-50 rounded-xl p-5 md:p-6 border border-gray-100 hover:border-primary/20 hover:bg-primary/[0.02] transition-all duration-300"
                initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              >
                <img
                  src={topic.avatar}
                  alt="Diễn giả"
                  className="w-11 h-11 rounded-full object-cover border-2 border-primary/20 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-foreground text-sm md:text-[15px] leading-snug mb-1">{topic.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{topic.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Booth Categories ── */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px flex-1 max-w-[60px] bg-border" />
            <h3 className="text-lg md:text-xl font-bold text-foreground text-center">
              Trải nghiệm hệ sinh thái F&B từ nhiều thương hiệu nổi tiếng
            </h3>
            <div className="h-px flex-1 max-w-[60px] bg-border" />
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {boothCategories.map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl py-4 px-2 hover:border-primary/30 hover:bg-primary/[0.03] transition-all duration-200">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-lg">
                  {'customIcon' in item && item.customIcon ? (
                    <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      {/* Base plate */}
                      <path d="M3 21h18" />
                      {/* Machine body */}
                      <rect x="4" y="3" width="14" height="7" rx="1" />
                      {/* Control panel: lines + circle */}
                      <line x1="6" y1="6.5" x2="8" y2="6.5" />
                      <circle cx="11" cy="6.5" r="1.2" />
                      <line x1="14" y1="6.5" x2="16" y2="6.5" />
                      {/* Dispenser */}
                      <rect x="9" y="10" width="3" height="2" rx="0.5" />
                      {/* Portafilter handle */}
                      <path d="M12 11l5 3" />
                      {/* Drip lines */}
                      <line x1="10" y1="13" x2="10" y2="14.5" />
                      <line x1="11.5" y1="13" x2="11.5" y2="14.5" />
                      {/* Cup */}
                      <path d="M8 16h5v3a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-3z" />
                      <path d="M13 17h1.5a1 1 0 0 1 0 2H13" />
                      {/* Lower body / legs */}
                      <path d="M4 10h5" />
                      <path d="M12 10h6" />
                      <line x1="5" y1="10" x2="5" y2="21" />
                      <line x1="17" y1="10" x2="17" y2="21" />
                    </svg>
                  ) : item.icon ? (
                    <item.icon className="w-5 h-5 text-primary" />
                  ) : null}
                </div>
                <span className="text-xs font-medium text-foreground text-center leading-tight">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Highlights: Bạn nhận được gì khi ra về? ── */}
        <motion.div
          className="bg-primary/5 border border-primary/10 rounded-2xl p-6 md:p-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-lg font-bold text-foreground mb-5 text-center">Bạn nhận được gì khi ra về?</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {highlights.map((text, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/70 rounded-lg p-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-foreground font-medium text-sm">{text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <button
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold py-3.5 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-primary/20 hover:-translate-y-0.5"
            onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}
          >
            Đăng Ký Tham Gia Ngay
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
