import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import VenueSection from "@/components/VenueSection";
import ScheduleSection from "@/components/ScheduleSection";
import SpeakersSection from "@/components/SpeakersSection";
import ExhibitorsSection from "@/components/ExhibitorsSection";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import RegistrationSection from "@/components/RegistrationSection";
import Footer from "@/components/Footer";
import { useState } from "react";
import ThankYouModal from "@/components/ThankYouModal";

export default function Home() {
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  return (
    <>
      <Helmet>
        <title>FNB CONNECT | Chương mới trong ngành FnB 2026</title>
        <meta
          name="description"
          content="FNB CONNECT - Chuỗi workshop quy tụ hàng ngàn chủ quán, đại lý, nhà phân phối và các thương hiệu FnB. Kết nối kinh doanh và cập nhật xu hướng mới nhất."
        />
        <meta property="og:title" content="FNB CONNECT | Chương mới trong ngành FnB 2026" />
        <meta
          property="og:description"
          content="FNB CONNECT - Chuỗi workshop quy tụ hàng ngàn chủ quán, đại lý, nhà phân phối. 22/04/2026 tại Trống Đồng Place, Hà Nội."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://i.imgur.com/LDcB2DA.png" />
      </Helmet>

      <Navbar />
      <HeroSection
        eventDate="22 tháng 4, 2026"
        eventTime="9:00 - 17:00"
        eventLocation="Trống Đồng Place - 489 Hoàng Quốc Việt, P.Nghĩa Đô, Tp.Hà Nội"
      />
      <AboutSection />

      {/* Video Section */}
      <div className="relative py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3">Video</span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground">
              Chủ Quán Không Thể Bỏ Lỡ
            </h3>
          </div>
          <div className="max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-xl border border-border">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/KypVYxaosI0"
              title="Video giới thiệu FNB CONNECT"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <VenueSection />
      <ScheduleSection />
      <SpeakersSection />
      <ExhibitorsSection />
      <GallerySection />
      <TestimonialsSection />
      <RegistrationSection
        eventDate="22 tháng 4, 2026"
        eventTime="9:00 - 17:00"
        eventLocation="Trống Đồng Place - 489 Hoàng Quốc Việt, P.Nghĩa Đô, Tp.Hà Nội"
        eventPrice="Miễn phí"
        onSuccessfulRegistration={() => setShowThankYouModal(true)}
      />
      <Footer />
      <ThankYouModal
        isOpen={showThankYouModal}
        onClose={() => setShowThankYouModal(false)}
      />
    </>
  );
}
