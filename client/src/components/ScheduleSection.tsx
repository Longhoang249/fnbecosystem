import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, Clock, User } from "lucide-react";

interface TimelineItem {
  time: string;
  title: string;
  description: string;
  detailedDescription?: string;
  speaker?: { name: string; image: string };
}

export default function ScheduleSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [expandedItems, setExpandedItems] = useState<{ [key: number]: boolean }>({});

  const toggleItem = (index: number) => {
    setExpandedItems((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const scheduleItems: TimelineItem[] = [
    { time: "9:00 - 9:30", title: "Khai Mạc", description: "Tham quan và trải nghiệm các gian hàng" },
    {
      time: "09:30 - 10:30",
      title: "Biến Người Lạ Thành Đại Sứ Nhờ Trải Nghiệm FEEL",
      description: "Làm sao chinh phục khách hàng và khiến họ chia sẻ quán đến bạn bè?",
      detailedDescription: "Câu trả lời sẽ được bật mí bởi Mr. Thông Phan - Chuyên gia Marketing FnB 8 năm kinh nghiệm với những chiến dịch Viral như Hoa Sơn Tửu Lầu, Việt Nam 938, Thánh Địa Liên Quân...",
      speaker: { name: "Mr. Thông Phan", image: "https://i.postimg.cc/Gt9b4YfG/Artboard-1-4.png" },
    },
    {
      time: "10:35 - 11:35",
      title: "Rủi Ro Pháp Lý Và Thuế 2026",
      description: "Thay đổi để thích ứng?",
      detailedDescription: "Mang đến bức tranh chung về rủi ro pháp lý và thuế trong kinh doanh F&B..., Mr. Nguyễn Hữu Quyết - với CFO 25 năm kinh nghiệm tài chính kế toán và tư vấn hệ thống doanh nghiệp sẽ giúp các chủ quán... nắm được nội dung cần thiết về tài chính, pháp luật cũng như loại hình kinh doanh hiện hành nhằm thích ứng để tránh/ hạn chế được những rủi ro tài chính trong tương lai.",
      speaker: { name: "Mr. Nguyễn Hữu Quyết", image: "https://i.postimg.cc/d0zf2CDG/Artboard-1-copy-1.png" },
    },
    { time: "11:35 - 13:30", title: "Nghỉ Trưa", description: "" },
    {
      time: "13:35 - 14:35",
      title: "Sắp Công Bố",
      description: "Diễn giả sẽ được công bố trong thời gian sắp tới",
    },
    {
      time: "14:40 - 15:40",
      title: "Sắp Công Bố",
      description: "Diễn giả sẽ được công bố trong thời gian sắp tới",
    },
    { time: "15:50 - 17:00", title: "Hoạt Động Kết Nối Kinh Doanh", description: "Kết thúc sự kiện" },
    {
      time: "19:00",
      title: "Tiệc Kết Nối Sau Sự Kiện (Miễn Phí)",
      description: "Trân trọng kính mời quý đối tác, khách mời và các chủ quán tham dự tiệc tối kết nối.",
      detailedDescription: "Thời Gian: 19h00 đón khách, 19h30 vào tiệc\nĐịa Chỉ: Quán Bumbeer Garden - 327 Nơ Trang Long - P.13 - Bình Thạnh\nSĐT: 0903 223 772 (Anh Tiến)\nVé: Miễn phí",
    },
  ];

  return (
    <section id="schedule" className="py-20 md:py-28 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3">Chương trình</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">Lịch Trình Sự Kiện</h2>
          <div className="w-16 h-1 bg-secondary mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-[23px] md:left-[27px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-secondary via-primary/30 to-primary/10" />

          <div className="space-y-4">
            {scheduleItems.map((item, index) => (
              <motion.div
                key={index}
                className="relative pl-14 md:pl-16"
                initial={{ opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                {/* Timeline dot */}
                <div className="absolute left-[16px] md:left-[20px] top-6 timeline-dot" />

                <div
                  className={`bg-white rounded-xl border border-border p-5 transition-all duration-300 ${item.detailedDescription ? "cursor-pointer hover:shadow-md hover:border-secondary/30" : ""
                    }`}
                  onClick={() => item.detailedDescription && toggleItem(index)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-secondary flex-shrink-0" />
                        <span className="text-sm font-bold text-secondary">{item.time}</span>
                      </div>
                      <h4 className="text-base md:text-lg font-bold text-foreground">{item.title}</h4>
                      {item.description && (
                        <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
                      )}
                    </div>

                    {item.speaker && (
                      <div className="flex-shrink-0 hidden sm:flex items-center gap-2 bg-primary/5 px-3 py-2 rounded-lg">
                        <img src={item.speaker.image} alt={item.speaker.name} className="w-8 h-8 rounded-full object-cover" loading="lazy" />
                        <span className="text-xs font-medium text-foreground whitespace-nowrap">{item.speaker.name}</span>
                      </div>
                    )}

                    {item.detailedDescription && (
                      <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${expandedItems[index] ? "rotate-180" : ""}`} />
                    )}
                  </div>

                  {/* Mobile speaker */}
                  {item.speaker && (
                    <div className="flex sm:hidden items-center gap-2 mt-3 bg-primary/5 px-3 py-2 rounded-lg w-fit">
                      <img src={item.speaker.image} alt={item.speaker.name} className="w-7 h-7 rounded-full object-cover" loading="lazy" />
                      <span className="text-xs font-medium text-foreground">{item.speaker.name}</span>
                    </div>
                  )}

                  <AnimatePresence>
                    {expandedItems[index] && item.detailedDescription && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-border">
                          <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">{item.detailedDescription}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}