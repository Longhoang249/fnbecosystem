import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronDown, ArrowRight, Award, Star } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

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
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  useEffect(() => {
    const handleSelect = (e: any) => {
      const brandName = e.detail;
      let matchIndex = -1;
      
      if (brandName.includes("AutoShop")) matchIndex = 0;
      else if (brandName.includes("Dẻo")) matchIndex = 1;
      else if (brandName.includes("BODUO")) matchIndex = 2;
      else if (brandName.includes("HOLYON")) matchIndex = 3;
      else if (brandName.includes("Nhất Hương")) matchIndex = 5;
      else if (brandName.includes("iPos") || brandName.includes("iPOS")) matchIndex = 6;
      else if (brandName.includes("Cốc Giấy")) matchIndex = 7;
      else if (brandName.includes("Bốn Phương")) matchIndex = 8;
      else if (brandName.includes("VBM")) matchIndex = 9;
      else if (brandName.includes("Wazuka")) matchIndex = 10;
      else if (brandName.includes("Minh Hạnh")) matchIndex = 11;

      if (matchIndex !== -1) {
        setExpanded(p => ({ ...p, [matchIndex]: true }));
        
        if (window.innerWidth < 640 && swiperInstance) {
          swiperInstance.slideToLoop(matchIndex);
          const top = document.getElementById("exhibitors")?.getBoundingClientRect().top;
          if (top !== undefined) window.scrollTo({ top: top + window.scrollY - 72, behavior: "smooth" });
        } else {
          setTimeout(() => {
            const card = document.getElementById(`exhibitor-card-${matchIndex}`);
            if (card) {
               const top = card.getBoundingClientRect().top + window.scrollY - 100;
               window.scrollTo({ top, behavior: "smooth" });
            }
          }, 50);
        }
      } else {
        const top = document.getElementById("exhibitors")?.getBoundingClientRect().top;
        if (top !== undefined) window.scrollTo({ top: top + window.scrollY - 72, behavior: "smooth" });
      }
    };
    
    window.addEventListener('selectExhibitor', handleSelect);
    return () => window.removeEventListener('selectExhibitor', handleSelect);
  }, [swiperInstance]);

  const exhibitors: Exhibitor[] = [
    { name: "AUTOSHOP - Vua Máy Pha Chế", description: "Nhà phân phối máy móc pha chế và giải pháp kinh doanh đồ uống trọn gói hàng đầu Việt Nam", products: ["Máy pha chế tự động, pha trà sữa chỉ 10 giây", "Máy pha trà tươi, 1 chạm pha 9 công nền trà", "Máy làm đá lạnh, 15 phút có đá già"], image: "/exhibitors/autoshop.jpg" },
    { name: "Dẻo - Giải pháp Ăn vặt", description: "Dẻo cung cấp đa dạng giải pháp cho quán: Ăn vặt - Chè - Kem. Quán cần món Ngon, nhanh gọn - Cứ để Dẻo lo", products: ["Giải pháp ăn vặt cho quán", "Chè & Kem đa dạng", "Món ngon, nhanh gọn"], image: "https://i.ibb.co/PvShsyZt/A-nh-thie-t-ke-De-o.jpg" },
    { name: "BODUO VIỆT NAM", description: "Tập đoàn sản xuất nguyên liệu pha chế hàng đầu Trung Quốc, với hơn 20 năm kinh nghiệm và hệ thống 4 nhà máy hiện đại, cung cấp sản phẩm chất lượng cao cho ngành F&B toàn cầu.", products: ["Nguyên liệu pha chế cao cấp", "Giải pháp đồ uống sáng tạo", "Hơn 20 năm kinh nghiệm"], image: "https://i.ibb.co/93GTGmph/A-nh.jpg" },
    { name: "HOLYON TEA", description: "Đại diện chính thức của Holyon Tea tại thị trường Việt Nam. Mang đến các sản phẩm trà chất lượng cao, cung cấp giải pháp tổng thể cho thị trường trà, từ blending chuyên nghiệp đến OEM cho các thương hiệu lớn.", products: ["Trà chất lượng cao", "Blending chuyên nghiệp", "OEM cho thương hiệu lớn"], image: "https://i.ibb.co/qFpYPzTh/Holyon-tea-600x400-01.png" },
    { name: "Nobita Food", description: "Nhà cung cấp nguyên liệu và giải pháp kinh doanh cho ngành đồ uống.", products: ["Nguyên liệu pha chế", "Giải pháp kinh doanh F&B"], image: "https://placehold.co/600x400/1B4332/D4A853?text=NOBITA+FOOD" },
    { name: "Nhất Hương", description: "Doanh nghiệp Việt Nam tiên phong trong lĩnh vực sản xuất và phân phối nguyên liệu ngành bánh và pha chế.", products: ["Kem Béo Pha Chế", "Kem Whipping Base", "Sốt Caramen, Sốt Sô Cô La Cacao Talk"], image: "https://i.postimg.cc/m26BxFBk/Post-Landing-Page-01.jpg" },
    { name: "iPOS", description: "iPOS.vn  là doanh nghiệp công nghệ hàng đầu, cung cấp hệ sinh thái giải pháp quản trị và bán hàng chuyên biệt cho ngành Kinh doanh Ẩm thực tại Việt Nam, đáp ứng mọi mô hình F&B. Trải qua 15 năm xây dựng và phát triển, Công ty Cổ phần iPOS.vn  hiện có 13 chi nhánh chính cùng mạng lưới đối tác, đại lý phủ khắp 34 tỉnh thành.Đội ngũ iPOS.vn là những người nhiệt huyết, tận tâm, sẵn sàng đồng hành cùng chủ quán F&B, giúp ngành Kinh doanh Ẩm thực vững mạnh và bứt phá hơn.", products: ["Phần mềm quản lý bán hàng POS", "Giải pháp quản lý nhà hàng, quán café", "Hệ thống báo cáo & phân tích kinh doanh"], image: "/ipos.png" },
    { name: "Cốc Giấy Hk", description: "Là một trong những nhà sản xuất uy tín hàng đầu tại Việt Nam, KKGROUP được thành lập từ 2019, với hơn 7 năm KINH NGHIỆM sản xuất trong lĩnh vực ly giấy, tô giấy cao cấp, bao bì giấy thực phẩm dùng 1 lần. Chúng tôi không chỉ mang tới các sản phẩm với chất lượng vượt trội mà còn đưa ra những dịch vụ, giải pháp bao bì sáng tạo, đổi mới với xu hướng marketing/branding trẻ hoá/năng động và liên tục thay đổi như hiện nay.  KKGROUP tự hào: ✨ Tiên phong ly giấy sáng tạo, dẫn đầu xu hướng ✨ Quy trình sản xuất khép kín 100%, đảm bảo đồng bộ chất lượng sản phẩm ✨ Đối tác tin cậy của hơn +200 thương hiệu chuỗi coffee & tea tại Việt Nam", products: ["Cốc giấy các loại", "Ly giấy in logo thương hiệu", "Giải pháp bao bì đồ uống"], image: "/c_c_gi_y_hk.png" },
    { name: "NLPC Bốn Phương", description: "Phân phối độc quyền tại miền Bắc các thương hiệu: WAO, No.1, SG, Trái cây đông lạnh Vạn Thành và phân phối LongBeach. Cung cấp sản phẩm rõ nguồn gốc, giá thành hợp lý và sản lượng ổn định. Liên tục cập nhật công thức pha chế mới để đa dạng hóa menu cho khách. Có chính sách chiết khấu cao và trả thưởng hấp dẫn (theo tháng/quý/năm) cho đại lý, khách chuỗi và khách lẻ. Cung cấp nguyên liệu pha chế: Trà, sữa, bột kem, syrup... Nhượng quyền thương hiệu: Hấp dẫn với chính sách ưu đãi \"3 Không\" (Không phí nhượng quyền, Không phí đào tạo, Không phí duy trì). Tư vấn setup quán: Hỗ trợ đào tạo và thiết lập vận hành cho quán mới.", products: ["Nguyên liệu pha chế đa dạng", "Siro & Topping", "Giải pháp nguyên liệu trọn gói"], image: "/nlpc_b_n_ph__ng.png" },
    { name: "VBM", description: "VBM Việt Nam - 15 năm tiên phong trong tư vấn, thiết kế và thi công chuỗi quán F&B. Với hơn 15 năm kinh nghiệm và 1000+ dự án thành công trên khắp cả nước, VBM tự hào là đơn vị hàng đầu mang đến những giải pháp sáng tạo, hiện đại, và phù hợp nhất cho mỗi khách hàng. Tại VBM, mỗi dự án không chỉ là một công trình, mà còn là một câu chuyện đầy cảm hứng, sáng tạo, và thấu hiểu sâu sắc về mong muốn cũng như cá tính của từng thương hiệu.  Sự hài lòng của khách hàng chính là phần thưởng lớn nhất cho đội ngũ của chúng tôi, đồng thời là động lực để VBM tiếp tục đổi mới và hoàn thiện mỗi ngày.", products: ["Máy pha cà phê chuyên nghiệp", "Máy xay cà phê", "Giải pháp pha chế cao cấp"], image: "/vbm.png" },
    { name: "Wazuka", description: "Matcha không chỉ là nguyên liệu, mà là ngôn ngữ của vị giác. Wazuka Matcha khác biệt nhờ lá trà che nắng nhiều tuần tăng L-theanine và umami, nghiền cối đá truyền thống, phân hạng rõ ràng giúp quán chọn đúng dòng cho menu", products: ["Trà Matcha Nhật Bản", "Trà xanh cao cấp", "Nguyên liệu trà Nhật"], image: "/wazuka.png" },
    { name: "Minh Hạnh Food", description: "Với hơn 20 năm phát triển, Minh Hạnh Food và thương hiệu đồng hành IQ Food tự hào là nhà sản xuất nguyên liệu pha chế hàng đầu Việt Nam, chiếm 70% thị phần bán buôn. Minh Hạnh Food nổi bật với các dòng topping chất lượng cao như trân châu tươi Kun Han, trân châu 3Q Sea, thạch trái cây, nha đam và siro Tomoxi. Nắm bắt xu hướng tiện lợi, IQ Food tiên phong cung cấp trà sữa uống liền cùng các loại topping độc đáo như dừa sấy và hạt nổ. Nhờ kết hợp công nghệ hiện đại và nguồn nông sản nội địa, doanh nghiệp đã mở rộng quy mô lên 4 nhà máy đạt chuẩn ISO 22000. Với tầm nhìn trở thành nhà cung ứng số 1 Việt Nam, công ty cam kết tạo việc làm, hỗ trợ nông dân bao tiêu nông sản và mang đến sản phẩm chất lượng với \"giá cho người Việt\".", products: ["Nguyên liệu thực phẩm F&B", "Sản phẩm pha chế", "Giải pháp nguyên liệu cho quán"], image: "/minh_h_nh_food.png" },
    { name: "Trendy", description: "Trendy ra đời với sứ mệnh đem lại những sản phẩm phù hợp với việc kinh doanh và pha chế đồ uống, đặc biệt được tin dùng bởi các Barista đầu ngành. Mỗi sản phẩm của Trendy đều được tỉ mỉ và cẩn thận trong từng khâu thiết kế, chế biến, đóng gói và vận chuyển, mang đến hương vị của thiên nhiên cùng sự tin tưởng về những ly đồ uống ngon sắp được ra đời.", products: [], image: "/trendy.png" }
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

        {/* Unified Exhibitors Slider for Mobile & Desktop */}
        <div className="w-full pb-8 overflow-hidden px-1 sm:px-4">
          <Swiper
            onSwiper={setSwiperInstance}
            modules={[Autoplay, Navigation]}
            spaceBetween={20}
            slidesPerView={1.2}
            centeredSlides={true}
            loop={true}
            speed={1000}
            navigation={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true, // Pause when user hovers to read
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                centeredSlides: false,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                centeredSlides: false,
                spaceBetween: 24,
              },
            }}
            className="w-full relative py-4 [&_.swiper-button-next]:text-primary [&_.swiper-button-prev]:text-primary [&_.swiper-button-next]:w-10 [&_.swiper-button-next]:h-10 [&_.swiper-button-next]:bg-white/90 [&_.swiper-button-next]:rounded-full [&_.swiper-button-next:after]:text-lg [&_.swiper-button-prev]:w-10 [&_.swiper-button-prev]:h-10 [&_.swiper-button-prev]:bg-white/90 [&_.swiper-button-prev]:rounded-full [&_.swiper-button-prev:after]:text-lg [&_.swiper-button-next]:shadow-md [&_.swiper-button-prev]:shadow-md [&_.swiper-button-next]:absolute [&_.swiper-button-next]:-right-2 md:[&_.swiper-button-next]:-right-4 [&_.swiper-button-prev]:absolute [&_.swiper-button-prev]:-left-2 md:[&_.swiper-button-prev]:-left-4"
          >
            {exhibitors.map((exhibitor, index) => (
              <SwiperSlide key={index} className="h-auto">
                <motion.div
                  id={`exhibitor-card-${index}`}
                  className="exhibitor-card bg-white rounded-2xl overflow-hidden shadow-sm border border-border flex flex-col h-full hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <div className="relative aspect-[3/2] overflow-hidden bg-white/50 border-b border-border/40 flex items-center justify-center p-2">
                    <img
                      src={exhibitor.image}
                      alt={exhibitor.name}
                      className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
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
              </SwiperSlide>
            ))}
          </Swiper>
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