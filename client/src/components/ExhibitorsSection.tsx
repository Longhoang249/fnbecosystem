import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown, ArrowRight, Award, Star } from "lucide-react";

interface Exhibitor {
  name: string;
  description: string;
  products: string[];
  image: string;
}

export default function ExhibitorsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});

  const exhibitors: Exhibitor[] = [
    { name: "AUTOSHOP - Vua Máy Pha Chế", description: "Nhà phân phối máy móc pha chế và giải pháp kinh doanh đồ uống trọn gói hàng đầu Việt Nam", products: ["Máy pha chế tự động, pha trà sữa chỉ 10 giây", "Máy pha trà tươi, 1 chạm pha 9 công nền trà", "Máy làm đá lạnh, 15 phút có đá già"], image: "/exhibitors/autoshop.jpg" },
    { name: "Dẻo - Giải pháp Ăn vặt", description: "Dẻo cung cấp đa dạng giải pháp cho quán: Ăn vặt - Chè - Kem. Quán cần món Ngon, nhanh gọn - Cứ để Dẻo lo", products: ["Giải pháp ăn vặt cho quán", "Chè & Kem đa dạng", "Món ngon, nhanh gọn"], image: "https://i.ibb.co/PvShsyZt/A-nh-thie-t-ke-De-o.jpg" },
    { name: "BODUO VIỆT NAM", description: "Tập đoàn sản xuất nguyên liệu pha chế hàng đầu Trung Quốc, với hơn 20 năm kinh nghiệm và hệ thống 4 nhà máy hiện đại, cung cấp sản phẩm chất lượng cao cho ngành F&B toàn cầu.", products: ["Nguyên liệu pha chế cao cấp", "Giải pháp đồ uống sáng tạo", "Hơn 20 năm kinh nghiệm"], image: "https://i.ibb.co/93GTGmph/A-nh.jpg" },
    { name: "HOLYON TEA", description: "Đại diện chính thức của Holyon Tea tại thị trường Việt Nam. Mang đến các sản phẩm trà chất lượng cao, cung cấp giải pháp tổng thể cho thị trường trà, từ blending chuyên nghiệp đến OEM cho các thương hiệu lớn.", products: ["Trà chất lượng cao", "Blending chuyên nghiệp", "OEM cho thương hiệu lớn"], image: "https://i.ibb.co/qFpYPzTh/Holyon-tea-600x400-01.png" },
    { name: "Sen Việt", description: "Nhà cung cấp nguyên liệu và giải pháp kinh doanh cho ngành đồ uống.", products: ["Nguyên liệu pha chế", "Giải pháp kinh doanh F&B"], image: "https://placehold.co/600x400/1B4332/D4A853?text=SEN+VIET" },
    { name: "Nhất Hương", description: "Doanh nghiệp Việt Nam tiên phong trong lĩnh vực sản xuất và phân phối nguyên liệu ngành bánh và pha chế.", products: ["Kem Béo Pha Chế", "Kem Whipping Base", "Sốt Caramen, Sốt Sô Cô La Cacao Talk"], image: "https://i.postimg.cc/m26BxFBk/Post-Landing-Page-01.jpg" },
    { name: "iPOS", description: "Giải pháp quản lý bán hàng và vận hành toàn diện cho ngành F&B.", products: ["Phần mềm quản lý bán hàng POS", "Giải pháp quản lý nhà hàng, quán café", "Hệ thống báo cáo & phân tích kinh doanh"], image: "https://placehold.co/600x400/1B4332/D4A853?text=iPOS" },
  ];

  return (
    <section id="exhibitors" className="py-20 md:py-28 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3">Đối tác</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">Gian Hàng Sự Kiện</h2>
          <div className="w-16 h-1 bg-secondary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Những mắt xích không thể thiếu của chủ quán
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {exhibitors.map((exhibitor, index) => (
            <motion.div
              key={index}
              className="exhibitor-card bg-white rounded-2xl overflow-hidden flex flex-col"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <img
                  src={exhibitor.image}
                  alt={exhibitor.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                  onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/600x400/1B4332/D4A853?text=" + encodeURIComponent(exhibitor.name); }}
                />

              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-base font-bold text-foreground mb-1.5">{exhibitor.name}</h3>
                <p className="text-muted-foreground text-sm mb-3 flex-grow">{exhibitor.description}</p>
                <button
                  onClick={() => setExpanded((p) => ({ ...p, [index]: !p[index] }))}
                  className="flex items-center gap-1 text-primary hover:text-secondary text-sm font-medium transition-colors"
                >
                  {expanded[index] ? "Thu gọn" : "Xem sản phẩm"}
                  <ChevronDown className={`w-4 h-4 transition-transform ${expanded[index] ? "rotate-180" : ""}`} />
                </button>
                {expanded[index] && (
                  <motion.ul
                    className="mt-3 space-y-1.5 text-sm text-muted-foreground border-t border-border pt-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {exhibitor.products.map((p, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-1.5 flex-shrink-0" />
                        {p}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold py-3.5 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-primary/20 hover:-translate-y-0.5"
            onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}
          >
            Đăng Ký Trải Nghiệm
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}