"use client";
import React, { useState, useEffect, useCallback, memo } from "react";
import { FaVolumeMute, FaVolumeUp, FaPlay, FaPause } from "react-icons/fa";

const HeroSlide = memo(({ data, isActive }) => (
  <div
    className={`absolute inset-0 transition-opacity duration-1000 ${
      isActive ? "opacity-100" : "opacity-0"
    }`}
  >
    <div className="relative h-full">
      <img
        src={data.image}
        alt={data.title}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
        <div className="absolute bottom-20 left-0 right-0 text-center px-4">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 font-serif">
            {data.title}
          </h2>
          <p className="text-xl text-white mb-6 max-w-2xl mx-auto">
            {data.description}
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-bold transform hover:scale-105 transition-transform duration-300 shadow-lg">
            {data.buttonText}
          </button>
        </div>
      </div>
    </div>
  </div>
));

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(false);

  const slides = [
    {
      title: "Sacred Puja Services",
      description:
        "Experience divine blessings through authentic Vedic rituals",
      buttonText: "Book Puja",
      image: "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a",
    },
    {
      title: "Astrology Consultation",
      description: "Discover your cosmic path with expert astrologers",
      buttonText: "Consult Now",
      image: "https://images.unsplash.com/photo-1515894203077-9cd36032142f",
    },
    {
      title: "Festival Celebrations",
      description: "Join our grand festival pujas and celebrations",
      buttonText: "Explore Festivals",
      image: "https://images.unsplash.com/photo-1604605801370-3396f9bd9ba0",
    },
    {
      title: "Special Offers",
      description: "Get 20% off on your first online puja booking",
      buttonText: "Claim Offer",
      image: "https://images.unsplash.com/photo-1609941636460-8c1658b92b6b",
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(nextSlide, 4000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  return (
    <div className="relative h-screen w-full overflow-hidden group">
      {slides.map((slide, index) => (
        <HeroSlide key={index} data={slide} isActive={currentSlide === index} />
      ))}

      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-orange-500 w-8"
                : "bg-white/50 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute top-4 right-20 z-10 bg-black/30 p-3 rounded-full hover:bg-black/50 transition-colors duration-300"
        aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
      >
        {isPlaying ? (
          <FaPause className="w-5 h-5 text-white" />
        ) : (
          <FaPlay className="w-5 h-5 text-white" />
        )}
      </button>

      <button
        onClick={() => setAudioEnabled(!audioEnabled)}
        className="absolute top-4 right-4 z-10 bg-black/30 p-3 rounded-full hover:bg-black/50 transition-colors duration-300"
        aria-label={audioEnabled ? "Mute audio" : "Enable audio"}
      >
        {audioEnabled ? (
          <FaVolumeUp className="w-5 h-5 text-white" />
        ) : (
          <FaVolumeMute className="w-5 h-5 text-white" />
        )}
      </button>
    </div>
  );
};

export default HeroCarousel;
