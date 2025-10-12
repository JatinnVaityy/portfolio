'use client';
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Preloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete });

    // Text smooth entrance (faster)
    tl.fromTo(
      ".name-text span",
      { y: 100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.5,  // faster
        stagger: 0.07,   // faster
        ease: "power3.out" 
      }
    );

    // Gentle pulse (faster)
    tl.to(".name-text span", {
      scale: 1.08,
      duration: 0.3,  // faster
      yoyo: true,
      repeat: 1,
      stagger: 0.04,
      ease: "power1.inOut",
    });

    // Smooth exit (faster)
    tl.to(".name-text span", {
      opacity: 0,
      y: -50,
      duration: 0.5,  // faster
      stagger: 0.05,
      ease: "power2.inOut",
      delay: 0.2,
    });

    // Bars exit downward (faster)
    tl.to(".preloader-item", {
      yPercent: 100,
      duration: 0.5,  // faster
      stagger: 0.04,
      ease: "power4.inOut",
    });

    // Hide container
    tl.to(preloaderRef.current, { autoAlpha: 0, duration: 0.2, ease: "power1.inOut" });
  }, { scope: preloaderRef });

  // Responsive bar count
  const width = typeof window !== "undefined" ? window.innerWidth : 1024;
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const barCount = isMobile ? 6 : isTablet ? 8 : 10;

  return (
    <div
      className="fixed inset-0 z-[999] flex pointer-events-none bg-transparent"
      ref={preloaderRef}
    >
      {/* Bars */}
      {Array.from({ length: barCount }).map((_, i) => (
        <div
          key={i}
          className={`preloader-item h-full ${
            isMobile ? "w-[16.66%]" : isTablet ? "w-[12.5%]" : "w-[10%]"
          } bg-black`}
        />
      ))}

      {/* Text */}
      <p
        className={`name-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        text-white font-impact leading-none tracking-[0.1em]`}
        style={{
          fontSize: isMobile ? "14vw" : isTablet ? "16vw" : "18vw",
        }}
      >
        {"JATIN".split("").map((ch, i) => (
          <span key={i} className="inline-block opacity-0">{ch}</span>
        ))}
      </p>
    </div>
  );
};

export default Preloader;
