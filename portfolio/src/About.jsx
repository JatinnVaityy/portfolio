'use client';
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.from('.about-heading', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play reverse play reverse',
      },
      opacity: 0,
      y: -50,
      duration: 1,
      ease: 'power3.out',
    });
  }, { scope: containerRef });
  useGSAP(() => {
    const elements = containerRef.current?.querySelectorAll('.slide-up');
    if (!elements?.length) return;

    gsap.from(elements, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        end: 'bottom 60%',
        toggleActions: 'play reverse play reverse',
        scrub: 0.5,
      },
      opacity: 0,
      y: 50,
      stagger: 0.25,
      ease: 'power3.out',
    });
  }, { scope: containerRef });

  return (
    <section
      id="about"
      ref={containerRef}
      className="min-h-screen flex items-center bg-[#2f2f2f] text-white font-montserrat relative overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12">
    
        <h2
          className="about-heading text-4xl md:text-5xl mb-6 tracking-wide font-normal"
          style={{ fontFamily: 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif' }}
        >
          About <span className="text-[#32CD32]">Me</span>
        </h2>

        <div className="slide-up h-[3px] w-28 bg-[#32CD32] mb-12 rounded about-divider"></div>
        <div className="grid md:grid-cols-12 gap-12 items-start">
      
          <div className="md:col-span-5 flex items-center">
            <p
              className="slide-up text-5xl md:text-6xl leading-snug font-normal"
              style={{ fontFamily: 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif' }}
            >
              Hi, I&apos;m <span className="text-[#32CD32]">Jatin Vaity.</span>
            </p>
          </div>
          <div className="md:col-span-7 flex flex-col justify-center">
            <div className="max-w-[600px] space-y-6 text-gray-300 leading-relaxed text-lg md:text-xl">
              <p className="slide-up">
                I&apos;m a <span className="text-white">Full Stack Developer</span> passionate about
                transforming ideas into <span className="text-[#32CD32]">creative, real-world solutions</span>.
              </p>
              <p className="slide-up">
                With expertise in the <span className="text-white">MERN stack</span>, I create scalable, high-performing,
                and responsive web applications tailored to both user needs and business objectives.
              </p>
              <p className="slide-up">
                My focus is on delivering <span className="text-white">seamless user experiences</span>, prioritizing
                performance, accessibility, and design consistency to drive impactful results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
