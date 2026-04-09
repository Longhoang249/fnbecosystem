import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import { lazy, Suspense, useState } from "react";
import ThankYouModal from "@/components/ThankYouModal";

// Lazy load below-fold sections to reduce initial bundle
const EventVideoSection = lazy(() => import("@/components/EventVideoSection"));
const VenueSection = lazy(() => import("@/components/VenueSection"));
const SpeakersSection = lazy(() => import("@/components/SpeakersSection"));
const ScheduleSection = lazy(() => import("@/components/ScheduleSection"));
const ExhibitorsSection = lazy(() => import("@/components/ExhibitorsSection"));
const GallerySection = lazy(() => import("@/components/GallerySection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const RegistrationSection = lazy(() => import("@/components/RegistrationSection"));
const Footer = lazy(() => import("@/components/Footer"));

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
          content="FNB CONNECT - Chuỗi workshop quy tụ hàng ngàn chủ quán, đại lý, nhà phân phối. 22/04/2026 tại Tầng 3 toà nhà The Zei, số 8 Lê Đức Thọ, Hà Nội."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://i.imgur.com/LDcB2DA.png" />
      </Helmet>

      <Navbar />
      <HeroSection
        eventDate="22 tháng 4, 2026"
        eventTime="8:30 - 17:00"
        eventLocation="Tầng 3 toà nhà The Zei - Số 8 Lê Đức Thọ, Tp.Hà Nội"
      />
      <AboutSection />

      <Suspense fallback={null}>
        <EventVideoSection />
        <VenueSection />
        <SpeakersSection />
        <ScheduleSection />
        <ExhibitorsSection />
        <GallerySection />
        <TestimonialsSection />
        <RegistrationSection
          eventDate="22 tháng 4, 2026"
          eventTime="8:30 - 17:00"
          eventLocation="Tầng 3 toà nhà The Zei - Số 8 Lê Đức Thọ, Tp.Hà Nội"
          eventPrice="Miễn phí"
          onSuccessfulRegistration={() => setShowThankYouModal(true)}
        />
        <Footer />
      </Suspense>
      <ThankYouModal
        isOpen={showThankYouModal}
        onClose={() => setShowThankYouModal(false)}
      />
    </>
  );
}
