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
  const [expanded, setExpanded] = useState<{ [key: string | number]: boolean }>({});
  const [swiperOrg, setSwiperOrg] = useState<any>(null);
  const [swiperGuest, setSwiperGuest] = useState<any>(null);

  useEffect(() => {
    const handleSelect = (e: any) => {
      const brandName = e.detail;
      let matchIndex = -1;
      
      if (brandName.includes("AutoShop")) matchIndex = 0;
      else if (brandName.includes("Dẻo")) matchIndex = 1;
      else if (brandName.includes("BODUO")) matchIndex = 2;
      else if (brandName.includes("HOLYON")) matchIndex = 3;
      else if (brandName.includes("Nhất Hương")) matchIndex = 4;
      else if (brandName.includes("Nobita")) matchIndex = 5;
      else if (brandName.includes("iPos") || brandName.includes("iPOS")) matchIndex = 6;
      else if (brandName.includes("KK Group") || brandName.includes("KK GROUP") || brandName.includes("Cốc Giấy")) matchIndex = 7;
      else if (brandName.includes("Bốn Phương")) matchIndex = 8;
      else if (brandName.includes("VBM")) matchIndex = 9;
      else if (brandName.includes("Wazuka")) matchIndex = 10;
      else if (brandName.includes("Minh Hạnh")) matchIndex = 11;

      if (matchIndex !== -1) {
        setExpanded(p => ({ ...p, [matchIndex]: true }));
        
        if (window.innerWidth < 640) {
          if (matchIndex < 5 && swiperOrg) swiperOrg.slideToLoop(matchIndex);
          else if (matchIndex >= 5 && swiperGuest) swiperGuest.slideToLoop(matchIndex - 5);
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
  }, [swiperOrg, swiperGuest]);

  const exhibitors: Exhibitor[] = [
    { name: "AUTOSHOP - Vua Máy Pha Chế", description: "Nhà phân phối máy móc pha chế và giải pháp kinh doanh đồ uống trọn gói hàng đầu Việt Nam", products: ["Máy pha chế tự động, pha trà sữa chỉ 10 giây", "Máy pha trà tươi, 1 chạm pha 9 công nền trà", "Máy làm đá lạnh, 15 phút có đá già"], image: "/exhibitors/autoshop.webp" },
    { name: "Dẻo - Giải pháp Ăn vặt", description: "Dẻo cung cấp đa dạng giải pháp cho quán: Ăn vặt - Chè - Kem. Quán cần món Ngon, nhanh gọn - Cứ để Dẻo lo", products: ["Giải pháp ăn vặt cho quán", "Chè & Kem đa dạng", "Món ngon, nhanh gọn"], image: "https://i.ibb.co/PvShsyZt/A-nh-thie-t-ke-De-o.jpg" },
    { name: "BODUO VIỆT NAM", description: "Tập đoàn sản xuất nguyên liệu pha chế hàng đầu Trung Quốc, với hơn 20 năm kinh nghiệm và hệ thống 4 nhà máy hiện đại, cung cấp sản phẩm chất lượng cao cho ngành F&B toàn cầu.", products: ["Nguyên liệu pha chế cao cấp", "Giải pháp đồ uống sáng tạo", "Hơn 20 năm kinh nghiệm"], image: "https://i.ibb.co/93GTGmph/A-nh.jpg" },
    { name: "HOLYON TEA", description: "Đại diện chính thức của Holyon Tea tại thị trường Việt Nam. Mang đến các sản phẩm trà chất lượng cao, cung cấp giải pháp tổng thể cho thị trường trà với blending chuyên nghiệp.", products: ["Trà chất lượng cao", "Blending chuyên nghiệp"], image: "https://i.ibb.co/qFpYPzTh/Holyon-tea-600x400-01.png" },
    { name: "Nhất Hương", description: "Doanh nghiệp Việt Nam tiên phong trong lĩnh vực sản xuất và phân phối nguyên liệu ngành bánh và pha chế.", products: ["Kem Béo Pha Chế", "Kem Whipping Base", "Sốt Caramen, Sốt Sô Cô La Cacao Talk"], image: "https://i.postimg.cc/m26BxFBk/Post-Landing-Page-01.jpg" },
    { name: "Nobita Food", description: "Nobita Food là đơn vị chuyên sản xuất và cung cấp nguyên liệu pha chế và đồ ăn vặt trên thị trường. Doanh nghiệp tập trung vào các dòng sản phẩm chủ lực như bột kem béo, cùng các sản phẩm ăn vặt tiện lợi như khô gà, khô bò, khô heo. Ngoài ra, Nobita Food còn nhận gia công thương hiệu (OEM/ODM) cho các chuỗi kinh doanh và nhà phân phối (NPP), giúp đối tác xây dựng sản phẩm riêng với chất lượng ổn định, giá thành cạnh tranh và quy trình sản xuất chuyên nghiệp.", products: ["Bột kem béo nguyên liệu pha chế", "Khô gà, khô bò, khô heo ăn vặt", "Gia công thương hiệu OEM/ODM"], image: "https://i.ibb.co/zh5tbtqm/poster-c-c-s-n-ph-m-vuoong-page-0001.jpg" },
    { name: "iPOS", description: "iPOS.vn, 15 năm tiên phong cung cấp hệ sinh thái giải pháp quản trị và bán hàng chuyên biệt cho ngành F&B Việt Nam, đáp ứng mọi mô hình kinh doanh ẩm thực. Hiện diện tại 13 chi nhánh và mạng lưới đối tác phủ 34 tỉnh thành. Đội ngũ nhiệt huyết, tận tâm, luôn sẵn sàng đồng hành cùng chủ quán để vận hành hiệu quả và bứt phá doanh thu.", products: ["Phần mềm quản lý bán hàng POS", "Giải pháp quản lý nhà hàng, quán café", "Hệ thống báo cáo & phân tích kinh doanh"], image: "https://i.ibb.co/pBLxnkKR/i-POS-vn-nh-thumb.jpg" },
    { name: "KK Group", description: "KKGROUP, 7 năm sản xuất ly giấy, tô giấy và bao bì thực phẩm dùng một lần. Quy trình khép kín 100%, tiên phong xu hướng sáng tạo trong branding F&B. Đối tác tin cậy của hơn 200 thương hiệu chuỗi coffee & tea trên toàn quốc.", products: ["Cốc giấy các loại", "Ly giấy in logo thương hiệu", "Bộ giải pháp bao bì toàn diện cho ngành F&B"], image: "https://i.ibb.co/BHR4sxJK/KK-A-nh-gio-i-thie-u.jpg" },
    { name: "NLPC Bốn Phương", description: "Phân phối độc quyền miền Bắc: WAO, No.1, SG, Vạn Thành, LongBeach với nguồn gốc rõ ràng, giá hợp lý, sản lượng ổn định. Nguyên liệu đầy đủ, công thức liên tục cập nhật. Chiết khấu cao, trả thưởng hấp dẫn. Nhượng quyền \"3 Không\" và hỗ trợ setup quán từ A–Z.", products: ["Nguyên liệu pha chế đa dạng", "Siro & Topping", "Giải pháp nguyên liệu trọn gói"], image: "https://i.ibb.co/nqyVx1B0/2048x1152-1.png" },
    { name: "VBM", description: "VBM Việt Nam, 15 năm tiên phong trong tư vấn, thiết kế và thi công chuỗi quán F&B. Hơn 1.000 dự án thành công trên khắp cả nước, mỗi công trình là một câu chuyện sáng tạo được đo ni đóng giày theo cá tính riêng của từng thương hiệu. Sự hài lòng của khách hàng là động lực để VBM không ngừng đổi mới mỗi ngày.", products: ["Tư vấn mô hình", "Thiết kế bộ nhận diện", "Thiết kế 2D-3D", "Thi công bàn giao - hoàn thiện", "Đóng gói giải pháp kinh doanh thương hiệu F&B"], image: "https://i.ibb.co/Q7bVtKKB/nh-cover-website-s-ki-n.png" },
    { name: "Wazuka", description: "Matcha không chỉ là nguyên liệu, mà là ngôn ngữ của vị giác. Wazuka Matcha khác biệt nhờ lá trà che nắng nhiều tuần tăng L-theanine và umami, nghiền cối đá truyền thống, phân hạng rõ ràng giúp quán chọn đúng dòng cho menu", products: ["Trà Matcha Nhật Bản", "Trà xanh cao cấp", "Nguyên liệu trà Nhật"], image: "https://i.ibb.co/DPgybTzL/z7652198383209-7649acbcc0e135d869c29bf7ccbe5746.jpg" },
    { name: "Minh Hạnh Food", description: "Minh Hạnh Food & IQ Food, hơn 20 năm dẫn đầu thị trường nguyên liệu pha chế Việt Nam với 70% thị phần bán buôn. Nổi bật với topping chất lượng cao: trân châu Kun Han, Sea 3Q, thạch, nha đam, siro Tomoxi và trà sữa uống liền IQ Food. 4 nhà máy chuẩn ISO 22000, ứng dụng công nghệ hiện đại từ nông sản nội địa. Cam kết đồng hành cùng nông dân và mang sản phẩm tốt với \"giá cho người Việt\".", products: ["Nguyên liệu thực phẩm F&B", "Sản phẩm pha chế", "Giải pháp nguyên liệu cho quán"], image: "https://i.ibb.co/pvt1rh8J/A-nh-thie-t-ke-MHF-600-x-400-px-1.png" },
    { name: "Trendy", description: "Trendy ra đời với sứ mệnh đem lại những sản phẩm phù hợp với việc kinh doanh và pha chế đồ uống, đặc biệt được tin dùng bởi các Barista đầu ngành. Mỗi sản phẩm của Trendy đều được tỉ mỉ và cẩn thận trong từng khâu thiết kế, chế biến, đóng gói và vận chuyển, mang đến hương vị của thiên nhiên cùng sự tin tưởng về những ly đồ uống ngon sắp được ra đời.", products: [], image: "https://i.ibb.co/WpGMXKCY/z7652198082890-cba4e0258765d89e75fceda55730f40b.jpg" }
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

        {/* Exhibitors Sliders Split by Category */}
        <div className="mb-14">
          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center uppercase">Thương Hiệu Tổ Chức</h3>
          {/* Desktop Grid View */}
          <div className="hidden md:flex flex-wrap justify-center gap-6 w-full pb-8 px-1 sm:px-4">
            {exhibitors.slice(0, 5).map((exhibitor, index) => (
              <motion.div
                key={`desktop-${index}`}
                id={`exhibitor-card-desktop-${index}`}
                className="exhibitor-card bg-white rounded-2xl overflow-hidden shadow-sm border-[1.5px] border-amber-400/60 flex flex-col hover:shadow-lg hover:shadow-amber-500/20 transition-all w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(20%-19.2px)] relative"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className="relative aspect-[3/2] overflow-hidden bg-white/50 border-b border-border/40 flex items-center justify-center p-2">
                  <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] md:text-xs font-bold px-2 py-0.5 md:px-2.5 md:py-1 rounded-full shadow-md flex items-center gap-1">
                    <Star className="w-2.5 h-2.5 md:w-3 md:h-3 fill-current text-yellow-100" />
                    <span>Ban Tổ Chức</span>
                  </div>
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
                  {exhibitor.products.length > 0 && (
                    <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground border-t border-border pt-3">
                      {exhibitor.products.map((p, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-1 flex-shrink-0" />
                          <span className="leading-snug">{p}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Swiper View */}
          <div className="w-full pb-8 overflow-hidden px-1 sm:px-4 md:hidden">
            <Swiper
              onSwiper={setSwiperOrg}
              modules={[Autoplay, Navigation]}
              spaceBetween={20}
              slidesPerView={1.2}
              centeredSlides={true}
              loop={true}
              speed={1000}
              navigation={true}
              autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
              breakpoints={{
                640: { slidesPerView: 2, centeredSlides: false, spaceBetween: 24 },
                1024: { slidesPerView: 3, centeredSlides: false, spaceBetween: 24 },
              }}
              className="w-full relative py-4 [&_.swiper-button-next]:text-primary [&_.swiper-button-prev]:text-primary [&_.swiper-button-next]:w-10 [&_.swiper-button-next]:h-10 [&_.swiper-button-next]:bg-white/90 [&_.swiper-button-next]:rounded-full [&_.swiper-button-next:after]:text-lg [&_.swiper-button-prev]:w-10 [&_.swiper-button-prev]:h-10 [&_.swiper-button-prev]:bg-white/90 [&_.swiper-button-prev]:rounded-full [&_.swiper-button-prev:after]:text-lg [&_.swiper-button-next]:shadow-md [&_.swiper-button-prev]:shadow-md [&_.swiper-button-next]:absolute [&_.swiper-button-next]:-right-2 md:[&_.swiper-button-next]:-right-4 [&_.swiper-button-prev]:absolute [&_.swiper-button-prev]:-left-2 md:[&_.swiper-button-prev]:-left-4"
            >
              {exhibitors.slice(0, 5).map((exhibitor, idx) => {
                const index = idx;
                return (
                <SwiperSlide key={index} className="h-auto">
                  <motion.div
                    id={`exhibitor-card-${index}`}
                    className="exhibitor-card bg-white rounded-2xl overflow-hidden shadow-sm border-[1.5px] border-amber-400/60 flex flex-col h-full hover:shadow-md hover:shadow-amber-500/20 transition-all relative"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <div className="relative aspect-[3/2] overflow-hidden bg-white/50 border-b border-border/40 flex items-center justify-center p-2">
                      <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] md:text-xs font-bold px-2 py-0.5 md:px-2.5 md:py-1 rounded-full shadow-md flex items-center gap-1">
                        <Star className="w-2.5 h-2.5 md:w-3 md:h-3 fill-current text-yellow-100" />
                        <span>Ban Tổ Chức</span>
                      </div>
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
              )})}
            </Swiper>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center uppercase">Thương Hiệu Đồng Hành</h3>
          <div className="w-full pb-8 overflow-hidden px-1 sm:px-4">
            <Swiper
              onSwiper={setSwiperGuest}
              modules={[Autoplay, Navigation]}
              spaceBetween={20}
              slidesPerView={1.2}
              centeredSlides={true}
              loop={true}
              speed={1000}
              navigation={true}
              autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
              breakpoints={{
                640: { slidesPerView: 2, centeredSlides: false, spaceBetween: 24 },
                1024: { slidesPerView: 4, centeredSlides: false, spaceBetween: 20 },
                1280: { slidesPerView: 5, centeredSlides: false, spaceBetween: 20 },
              }}
              className="w-full relative py-4 [&_.swiper-button-next]:text-primary [&_.swiper-button-prev]:text-primary [&_.swiper-button-next]:w-8 [&_.swiper-button-next]:h-8 [&_.swiper-button-next]:bg-white/90 [&_.swiper-button-next]:rounded-full [&_.swiper-button-next:after]:text-base [&_.swiper-button-prev]:w-8 [&_.swiper-button-prev]:h-8 [&_.swiper-button-prev]:bg-white/90 [&_.swiper-button-prev]:rounded-full [&_.swiper-button-prev:after]:text-base [&_.swiper-button-next]:shadow-md [&_.swiper-button-prev]:shadow-md [&_.swiper-button-next]:absolute [&_.swiper-button-next]:-right-2 md:[&_.swiper-button-next]:-right-3 [&_.swiper-button-prev]:absolute [&_.swiper-button-prev]:-left-2 md:[&_.swiper-button-prev]:-left-3"
            >
              {exhibitors.slice(5).map((exhibitor, idx) => {
                const index = idx + 5;
                return (
                <SwiperSlide key={index} className="h-auto scale-[0.95] transform origin-top hover:scale-100 transition-transform duration-300">
                  <motion.div
                    id={`exhibitor-card-${index}`}
                    className="exhibitor-card bg-white rounded-2xl overflow-hidden shadow-sm border border-border flex flex-col h-full hover:shadow-md transition-shadow cursor-default"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <div className="relative aspect-[3/2] overflow-hidden bg-white/50 border-b border-border/40 flex items-center justify-center p-2">
                      <img
                        src={exhibitor.image}
                        alt={exhibitor.name}
                        className="w-full h-full object-contain transition-transform duration-500 hover:scale-[1.03]"
                        loading="lazy"
                        onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/600x400/1B4332/D4A853?text=" + encodeURIComponent(exhibitor.name); }}
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-sm font-bold text-foreground mb-1.5">{exhibitor.name}</h3>
                      {(() => {
                        const words = exhibitor.description.split(' ');
                        const isLong = words.length > 25;
                        const descKey = `desc-${index}`;
                        const isDescExpanded = expanded[descKey];
                        return (
                          <div className="flex-grow text-muted-foreground text-xs leading-relaxed">
                            {isDescExpanded ? (
                              <>
                                {exhibitor.description}{' '}
                                <button
                                  onClick={() => setExpanded((p) => ({ ...p, [descKey]: false }))}
                                  className="text-primary hover:text-secondary font-semibold whitespace-nowrap"
                                >
                                  Thu gọn
                                </button>
                              </>
                            ) : (
                              <>
                                {isLong ? words.slice(0, 25).join(' ') : exhibitor.description}
                                {isLong && (
                                  <>
                                    {'... '}
                                    <button
                                      onClick={() => setExpanded((p) => ({ ...p, [descKey]: true }))}
                                      className="text-primary hover:text-secondary font-semibold whitespace-nowrap"
                                    >
                                      Xem thêm
                                    </button>
                                  </>
                                )}
                              </>
                            )}
                          </div>
                        );
                      })()}

                      <div className="mt-auto pt-3">
                        {exhibitor.products.length > 0 && (
                          <div>
                            <button
                              onClick={() => setExpanded((p) => ({ ...p, [index]: !p[index] }))}
                              className="flex items-center gap-1 text-primary hover:text-secondary text-xs font-semibold transition-colors border-t border-border pt-2 w-full"
                            >
                              {expanded[index] ? "Thu gọn" : "Xem sản phẩm"}
                              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded[index] ? "rotate-180" : ""}`} />
                            </button>
                            {expanded[index] && (
                              <motion.ul
                                className="mt-2 space-y-1 text-xs text-muted-foreground"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                              >
                                {exhibitor.products.map((p, i) => (
                                  <li key={i} className="flex items-start gap-1.5">
                                    <span className="w-1 h-1 bg-secondary rounded-full mt-1.5 flex-shrink-0" />
                                    <span className="leading-tight">{p}</span>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              )})}
            </Swiper>
          </div>
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