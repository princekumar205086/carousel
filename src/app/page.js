"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const VideoCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef([]);

  const slides = [
    {
      id: 1,
      videoUrl:
        "https://joy.videvo.net/videvo_files/video/free/2012-12/small_watermarked/Bokeh_Spiral_Glow_Warm_preview.webm",
      headline: "Book Your Puja with Verified Pandits!",
      subtext: "Customized rituals as per your tradition and needs",
      primaryCta: "Book Now",
      secondaryCta: "Explore Services",
    },
    {
      id: 2,
      videoUrl:
        "https://joy.videvo.net/videvo_files/video/free/2015-08/small_watermarked/Fire_Spiral_preview.webm",
      headline: "Your Destiny, Decoded by Experts!",
      subtext: "Get accurate guidance on career, marriage & finance",
      primaryCta: "Consult Now",
      secondaryCta: "View Astrologers",
    },
    {
      id: 3,
      videoUrl:
        "https://joy.videvo.net/videvo_files/video/free/2018-07/small_watermarked/180607_A_04_preview.webm",
      headline: "Celebrate Festivities with Divine Blessings!",
      subtext: "Navratri, Diwali, Ganesh Puja & more at your home or temple",
      primaryCta: "View Festival Pujas",
      secondaryCta: "Customize Puja",
    },
    {
      id: 4,
      videoUrl:
        "https://joy.videvo.net/videvo_files/video/free/2019-05/small_watermarked/190516_06_AZ-LAGOA-30_preview.webm",
      headline: "Book Now & Get Special Discounts!",
      subtext: "Use code PUJA20 for flat 20% off on your first booking",
      primaryCta: "Apply Offer",
      secondaryCta: "Browse Pujas",
    },
  ];

  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [isPlaying]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (index === currentSlide && video) {
        video.play().catch((error) => console.log("Video play error:", error));
      } else if (video) {
        video.pause();
      }
    });
  }, [currentSlide]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handleVideoRef = (element, index) => {
    videoRefs.current[index] = element;
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-900">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <video
            ref={(el) => handleVideoRef(el, index)}
            className="h-full w-full object-cover scale-105 transform transition-transform duration-7000"
            src={slide.videoUrl}
            loop
            muted={isMuted}
            playsInline
            preload="auto"
          >
            <source src={slide.videoUrl} type="video/webm" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent">
            <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 transform text-center">
              <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">
                {slide.headline}
              </h1>
              <p className="mb-8 text-lg text-gray-200 md:text-xl">
                {slide.subtext}
              </p>
              <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
                <button className="rounded-full bg-orange-500 px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-orange-600">
                  {slide.primaryCta}
                </button>
                <button className="rounded-full border-2 border-white px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-white/10">
                  {slide.secondaryCta}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              currentSlide === index
                ? "w-8 bg-orange-500"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* <div className="absolute bottom-8 right-8 flex space-x-4">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
        </button>
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
        </button>
      </div> */}

      <button
        onClick={handlePrevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        aria-label="Previous slide"
      >
        <BsChevronLeft size={24} />
      </button>

      <button
        onClick={handleNextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        aria-label="Next slide"
      >
        <BsChevronRight size={24} />
      </button>
    </div>
  );
};

export default VideoCarousel;
