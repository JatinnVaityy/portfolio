  'use client';
  import React, { useRef, useEffect } from 'react';
  import { SiMongodb, SiExpress, SiReact, SiNodedotjs } from 'react-icons/si';
  import gsap from 'gsap';

  const Banner = () => {
    const containerRef = useRef(null);
    const iconsRef = useRef([]);
    const hireBtnRef = useRef(null);
    const arrowRef = useRef(null);

    useEffect(() => {
      if (!containerRef.current) return;

      const titleChars = containerRef.current.querySelectorAll('.title-char');
      const subtitle = containerRef.current.querySelector('.banner-subtitle');
      const hireBtn = hireBtnRef.current;

      // Timeline for text
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(titleChars, { y: 50, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, stagger: 0.03, duration: 0.6 });
      tl.fromTo(subtitle, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '<');
      tl.fromTo(hireBtn, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '<+0.2');

      // MERN icons pop-in
      gsap.fromTo(
        iconsRef.current,
        { scale: 0, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'bounce.out', delay: 1 }
      );

      // React icon rotation (works on mobile & desktop)
      iconsRef.current.forEach((icon, idx) => {
        if (icon && idx === 2) {
          gsap.to(icon, {
            rotate: 360,
            duration: 6,
            repeat: -1,
            ease: 'linear',
            transformOrigin: '50% 50%',
          });
        }
      });

      // Subtle background zoom effect
      const bg = containerRef.current.querySelector('.banner-bg');
      gsap.to(bg, { scale: 1.05, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut' });

      // Show/hide arrow based on scroll
      const handleScroll = () => {
        if (!arrowRef.current) return;
        arrowRef.current.style.display = window.scrollY === 0 ? 'block' : 'none';
      };
      window.addEventListener('scroll', handleScroll);
      handleScroll();

      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const headingParts = [
      { text: 'FULL', color: '#32CD32' },
      { text: 'STACK', color: '#32CD32' },
      { text: 'DEVELOPER', color: '#FFFFFF' },
    ];

    return (
      <section
        ref={containerRef}
        className="relative flex flex-col md:flex-row justify-between items-center h-screen px-6 md:px-16 text-white overflow-hidden"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center banner-bg"
          style={{ backgroundImage: "url('/portfolio-banner.jpg')" }}
        ></div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 z-[1]" style={{ backgroundColor: '#2f2f2f' }}></div>

        {/* Text + Button */}
        <div className="relative z-[3] flex flex-col justify-center items-start md:w-1/2 space-y-6 md:space-y-8 mt-28 md:mt-0">
          <h1
            className="text-left font-impact font-normal leading-tight tracking-wide text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw] flex flex-wrap gap-4"
            style={{ fontFamily: 'Impact, sans-serif' }}
          >
            {headingParts.map((part, idx) => (
              <span key={idx} className="inline-flex">
                {part.text.split('').map((char, index) => (
                  <span
                    key={`${idx}-${index}`}
                    className="title-char inline-block"
                    style={{ color: char === ' ' ? 'transparent' : part.color }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <p className="banner-subtitle text-left text-gray-300 text-[4vw] sm:text-[2.2vw] md:text-[1.2vw] max-w-xl leading-relaxed">
            Hi! I'm <span className="text-white font-semibold">Jatin Vaity</span>, a passionate Full
            Stack Developer creating scalable, high-performance, and responsive web applications with
            modern technologies.
          </p>
  <a
    href="#contact"
    ref={hireBtnRef}
    className="hire-btn"
  >
    <span className="relative z-10">HIRE ME</span>
    <span className="scan-line"></span>
  </a>

          {/* MERN Icons - Mobile */}
         <div className="flex justify-center items-center space-x-10 text-5xl mt-32 sm:mt-36 md:hidden">
  <SiMongodb ref={(el) => (iconsRef.current[0] = el)} className="text-green-600" />
  <SiExpress ref={(el) => (iconsRef.current[1] = el)} className="text-gray-300" />
  <SiReact ref={(el) => (iconsRef.current[2] = el)} className="text-cyan-400" />
  <SiNodedotjs ref={(el) => (iconsRef.current[3] = el)} className="text-green-500" />
</div>
        </div>

        {/* MERN Icons - Desktop */}
        <div className="relative z-[3] hidden md:flex md:w-1/2 justify-center items-center space-x-8 text-6xl lg:text-7xl">
          <SiMongodb ref={(el) => (iconsRef.current[0] = el)} className="text-green-600" />
          <SiExpress ref={(el) => (iconsRef.current[1] = el)} className="text-gray-300" />
          <SiReact ref={(el) => (iconsRef.current[2] = el)} className="text-cyan-400" />
          <SiNodedotjs ref={(el) => (iconsRef.current[3] = el)} className="text-green-500" />
        </div>

        {/* Down Arrow */}
        <svg
          ref={arrowRef}
          className="arrows"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <path className="a1" d="M0 0 L30 32 L60 0"></path>
          <path className="a2" d="M0 20 L30 52 L60 20"></path>
          <path className="a3" d="M0 40 L30 72 L60 40"></path>
        </svg>

        <style jsx>{`
          
          @keyframes scan {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }
          .animate-scan {
            animation: scan 1s linear infinite;
          }
        `}</style>
      </section>
    );
  };

  export default Banner;
