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
    { time: "8:30 - 9:15", title: "Khai Mạc", description: "Tham quan và trải nghiệm các gian hàng" },
    {
      time: "09:15 - 10:15",
      title: "Lợi Dụng Thuật Toán Tăng Trưởng Tỷ Views - Xây Kênh Viral Đa Nền Tảng",
      description: "Được thiết kế nhằm giúp doanh nghiệp hiểu và khai thác thuật toán như một đòn bẩy tăng trưởng hệ thống. Chương trình tập trung chia sẻ tư duy, mô hình và kinh nghiệm triển khai đã được kiểm chứng, giúp doanh nghiệp xây dựng hệ thống kênh truyền thông tăng trưởng bền vững, thay vì phụ thuộc vào các kết quả ngắn hạn.",
      detailedDescription: "Hiểu rõ thuật toán phi tập chung trên các nền tảng social (Tiktok, Youtube, Instagram,..)\n- Tổng quan xu hướng thuật toán các nền tảng mạng xã hội hiện nay\n- Cách thuật toán “quả cầu tuyết” vận hành và phân phối nội dung\n- Ứng dụng mô hình quả cầu tuyết để xây dựng hệ thống kênh vệ tinh cho thương hiệu",
      speaker: { name: "Mr. Hải Đây", image: "/do_hai.jpg" },
    },
    {
      time: "10:15 - 11:15",
      title: "Ứng Dụng Công Nghệ Trong Quản Lý Thuế Và Hóa Đơn Điện Tử Cho Hộ Kinh Doanh F&B",
      description: "Chia sẻ những thông tin cập nhật mới nhất về chính sách thuế, đồng thời phân tích các khó khăn phổ biến mà hộ kinh doanh F&B thường gặp phải.",
      detailedDescription: "Chia sẻ những thông tin cập nhật mới nhất về chính sách thuế, đồng thời phân tích các khó khăn phổ biến mà hộ kinh doanh F&B thường gặp phải. Bên cạnh đó, nội dung cũng đề cập đến cách chủ hộ ứng dụng công nghệ vào quy trình vận hành nhằm tối ưu thời gian và hạn chế sai sót.",
      speaker: { name: "Mrs. Đinh Thị Lan Phương", image: "/lan_phuong.jpg" },
    },
    { time: "12:00 - 13:25", title: "Nghỉ Trưa", description: "Các gian hàng vẫn hoạt động" },
    {
      time: "13:30 - 14:30",
      title: "Giải Mã Cơn Sốt Trà Hoa Ướp Hương Tại Trung Quốc 2026",
      description: "Lý giải vì sao kỹ thuật ướp hương tự nhiên đang trở thành yếu tố tạo nên khác biệt trong trải nghiệm khách hàng.",
      detailedDescription: "Đưa ra góc nhìn dự đoán về tiềm năng bùng nổ của dòng trà này tại thị trường F&B Việt Nam trong thời gian tới.\nĐồng thời, phân tích cách các thương hiệu F&B có thể ứng dụng xu hướng này vào menu và vận hành, thông qua những giải pháp nguyên liệu giúp đảm bảo chất lượng hương vị một cách ổn định và tinh gọn.",
      speaker: { name: "Mr. Hàn Cương", image: "/han_cuong.jpg" },
    },
    {
      time: "14:40 - 15:40",
      title: "Đóng Gói Để Nhân Chuỗi Thương Hiệu F&B",
      description: "Chia sẻ cách chuẩn hoá nhân sự, vận hành và quy trình thành hệ thống rõ ràng, giúp chủ quán mở rộng và nhân bản thương hiệu bền vững",
      speaker: { name: "Phạm Văn Tuấn Anh", image: "/tuan_anh.jpg" },
    },
    { time: "15:50 - 16:00", title: "Giao Lưu Kết Nối", description: "Kết thúc sự kiện" },
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