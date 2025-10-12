'use client';
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { FaExternalLinkAlt } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: 'Vartalaap: Real-Time Chat App',
    desc: 'Developed a low-latency chat platform with instant notifications, file sharing, and active user tracking using WebSocket communication.',
    link: 'https://vaartalaap.vercel.app/',
    img: '/logo/vaartalaap.png',
  },
  {
    name: 'TripNest: Hotel Listing Website',
    desc: 'Designed full-stack hotel platform with user authentication, listings, reviews, and booking management.',
    link: 'https://tripnest-oi4q.onrender.com/',
    img: '/logo/tripnest.png',
  },
  {
    name: 'Medicare: Hospital Management System',
    desc: 'Built doctor-patient communication system with appointment scheduling and admin management.',
    link: 'https://hospital-management-system-dun-ten.vercel.app/',
    img: '/logo/medicare.png',
  },
  {
    name: 'Saksham: Paralysis Patient Assistance',
    desc: 'Gesture-controlled, voice-enabled wheelchair for people with paralysis. Integrated IoT and AI-enabled navigation for assistance.',
    img: '/logo/saksham.png',
  },
  {
    name: 'Diwali E-Commerce Website',
    desc: 'Developed an interactive online store for festive diwali faral shopping featuring product search, authentication, and secure checkout with razorpay integration.',
    link: 'https://diwali-ecommerce-website.vercel.app/',
    img: '/logo/ecom.png',
  },
];

const Projects = () => {
  const marqueeRef = useRef(null);
  const containerRef = useRef(null);
  const tl = useRef(null);

  // Smooth infinite marquee
  useEffect(() => {
    const track = marqueeRef.current;
    if (!track) return;

    const cards = Array.from(track.children);
    const totalWidth = cards.reduce((acc, c) => acc + c.offsetWidth + 16, 0);

    // Duplicate cards for seamless loop
    cards.forEach((c) => track.appendChild(c.cloneNode(true)));
    track.style.width = `${totalWidth * 2}px`;

    tl.current = gsap.to(track, {
      x: `-${totalWidth}px`,
      duration: 35,
      ease: 'linear',
      repeat: -1,
    });

    return () => tl.current?.kill();
  }, []);

  // Pause/resume marquee
  const handlePause = () => tl.current?.pause();
  const handleResume = () => tl.current?.resume();

  // Scroll animations (reverse on scroll up)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.projects-heading', {
        scrollTrigger: {
          trigger: '.projects-heading',
          start: 'top 85%',
          toggleActions: 'play reverse play reverse',
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power2.out',
      });

      gsap.from('.projects-divider', {
        scrollTrigger: {
          trigger: '.projects-heading',
          start: 'top 85%',
          toggleActions: 'play reverse play reverse',
        },
        opacity: 0,
        scaleX: 0,
        duration: 1,
        ease: 'power2.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative bg-[#2f2f2f] text-white py-16 sm:py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
        {/* Title */}
        <div className="text-center sm:text-left mb-10">
          <h2
            className="projects-heading text-4xl sm:text-5xl font-medium tracking-wide"
            style={{
              fontFamily: 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif',
            }}
          >
            My <span className="text-[#32CD32]">Work</span>
          </h2>
          <div className="projects-divider w-28 h-[3px] bg-[#32CD32] mt-3 rounded-full mx-auto sm:mx-0"></div>
        </div>

        {/* Marquee */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={handlePause}
          onMouseLeave={handleResume}
          onTouchStart={handlePause}
          onTouchEnd={handleResume}
        >
          <div ref={marqueeRef} className="flex gap-4 sm:gap-8 items-center">
            {projects.map((p, i) => (
              <div
                key={i}
                className="project-card group relative flex-shrink-0 w-[250px] sm:w-[300px] md:w-[360px] lg:w-[400px] h-[360px] sm:h-[420px] md:h-[460px] rounded-3xl overflow-hidden shadow-lg border border-[#3a3a3a] hover:border-[#32CD32] transition-all duration-300 bg-[#1e1e1e] flex flex-col justify-center items-center"
              >
                {/* Image */}
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-contain p-6 sm:p-8 transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 sm:p-6 rounded-3xl">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg sm:text-xl font-impact text-[#32CD32] pr-2 leading-tight">
                      {p.name}
                    </h3>
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#32CD32] hover:text-white transition-colors"
                      >
                        <FaExternalLinkAlt size={14} />
                      </a>
                    )}
                  </div>
                  <p className="text-gray-200 text-xs sm:text-sm leading-snug line-clamp-4">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Side Gradients */}
          <div className="pointer-events-none absolute top-0 left-0 h-full w-16 sm:w-24 bg-gradient-to-r from-[#2f2f2f] via-[#2f2f2f]/95 to-transparent" />
          <div className="pointer-events-none absolute top-0 right-0 h-full w-16 sm:w-24 bg-gradient-to-l from-[#2f2f2f] via-[#2f2f2f]/95 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Projects;
