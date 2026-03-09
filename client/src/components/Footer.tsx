import { MapPin, Phone, Mail, Facebook } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0D1B14] text-white/80">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16">
          {/* Brand */}
          <div className="md:w-1/3">
            <span className="text-xl font-extrabold tracking-tight text-white mb-4 block">
              FNB <span className="text-secondary">ECO SYSTEM</span>
            </span>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Chuỗi workshop quy tụ hàng ngàn chủ quán, đại lý, nhà phân phối và các thương hiệu hoạt động trong ngành FnB. Kết nối kinh doanh và cập nhật xu hướng mới nhất.
            </p>
          </div>

          {/* Event Info */}
          <div className="md:w-1/3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4">Thông tin sự kiện</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                <span>Trống Đồng Place - 489 Hoàng Quốc Việt, P.Nghĩa Đô, Tp.Hà Nội</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-secondary flex-shrink-0" />
                <span>0903 223 772 (Anh Tiến)</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="md:w-1/3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4">Liên kết</h4>
            <div className="space-y-2 text-sm">
              {["about", "venue", "speakers", "exhibitors", "gallery", "register"].map((id) => {
                const labels: { [key: string]: string } = {
                  about: "Giới thiệu", venue: "Địa điểm", speakers: "Diễn giả",
                  exhibitors: "Gian hàng", gallery: "Hình ảnh", register: "Đăng ký",
                };
                return (
                  <button
                    key={id}
                    onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
                    className="block text-white/50 hover:text-secondary transition-colors"
                  >
                    {labels[id]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {currentYear} FNB ECO SYSTEM. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">
            Được tổ chức bởi <span className="text-secondary/60">AUTOSHOP - Vua Máy Pha Chế</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
