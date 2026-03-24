import { useState } from 'react';

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}

interface SimpleGalleryProps {
  images: GalleryImage[];
}

export default function SimpleGallery({ images }: SimpleGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative rounded-lg overflow-hidden shadow-md">
      {/* Main image */}
      <div className="relative">
        <img 
          src={images[currentIndex].src} 
          alt={images[currentIndex].alt}
          className="w-full h-full object-cover aspect-[16/9]"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
          <h4 className="font-semibold">{images[currentIndex].alt}</h4>
          <p className="text-sm opacity-90">{images[currentIndex].caption}</p>
        </div>
      </div>
      
      {/* Navigation buttons */}
      <button 
        onClick={prevImage}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md z-10"
        aria-label="Previous image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        onClick={nextImage}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md z-10"
        aria-label="Next image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Indicators */}
      <div className="absolute bottom-[4.5rem] left-0 right-0 flex justify-center gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-white/40'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Thumbnails (optional) */}
      <div className="grid grid-cols-4 gap-2 mt-2 px-1 pb-1">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`overflow-hidden rounded-md ${index === currentIndex ? 'ring-2 ring-primary' : 'opacity-70'}`}
          >
            <img 
              src={image.src} 
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-16 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}