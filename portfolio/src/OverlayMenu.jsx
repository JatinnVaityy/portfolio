'use client';
import React, { useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';
import { MdOutlineMarkEmailRead } from 'react-icons/md';
import gsap from 'gsap';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/700.css';
import leetcodeWhite from '../assets/leetcode.png';

const OverlayMenu = ({ isOpen, onClose, refs, likes, liked, toggleLike }) => {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const linksRef = useRef([]);
  const iconsRef = useRef([]);

  useEffect(() => {
    if (isOpen) {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power1.out' }
      );

      tl.fromTo(
        panelRef.current,
        { x: '100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.6, ease: 'power4.out' },
        '<'
      );

      tl.fromTo(
        linksRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.1 },
        '-=0.3'
      );

      tl.fromTo(
        iconsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)' },
        '-=0.4'
      );
    } else {
      gsap.to(panelRef.current, { x: '100%', opacity: 0, duration: 0.5, ease: 'power3.in' });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.4, ease: 'power1.in' });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const menuLinks = [
    { name: 'Home', key: 'Home', color: '#FFD700' },
    { name: 'About Me', key: 'About', color: '#1E90FF' },
    { name: 'Skills', key: 'Skills', color: '#FF4500' },
    { name: 'Projects', key: 'Projects', color: '#8A2BE2' },
    { name: 'Contact', key: 'Contact', color: '#32CD32' },
  ];

  const socialLinks = [
    { name: 'Github', href: 'https://github.com/JatinnVaityy/', icon: <FaGithub className="w-6 h-6 text-white" /> },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/jatin-vaity-8691bb286/', icon: <FaLinkedin className="w-6 h-6 text-white" /> },
    {
  name: 'LeetCode',
  href: 'https://leetcode.com/u/JatinVaity/',
  icon: (
    <img
      src={leetcodeWhite}
      alt="LeetCode"
      className="w-6 h-6"
      style={{ filter: 'invert(0)' }} 
    />
  ),
}
  ];

  const handleMenuClick = (key) => {
    onClose();
    if (refs && refs[key] && refs[key].current) {
      refs[key].current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>

      <div
        ref={overlayRef}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[999]"
      />

      <div
        ref={panelRef}
        className="fixed top-0 right-0 h-full w-full sm:w-[80%] md:w-[50%] bg-[#0b0b0b] z-[1000] flex flex-col p-6 md:p-10 text-white font-montserrat shadow-[0_0_30px_rgba(50,205,50,0.2)]"
      >

        <div className="flex flex-col md:flex-row mt-20 gap-10 md:gap-20">
        
          <div className="flex-1">
            <h2 className="text-gray-400 uppercase tracking-[0.2em] mb-6 text-sm sm:text-base">
              Menu
            </h2>
            <div className="flex flex-col space-y-6">
              {menuLinks.map((link, idx) => (
                <button
                  key={idx}
                  ref={(el) => (linksRef.current[idx] = el)}
                  onClick={() => handleMenuClick(link.key)}
                  className="flex items-center space-x-3 group transition-all duration-300 text-left"
                >
                  <span
                    className="w-3 h-3 rounded-full transition-transform duration-300 group-hover:scale-125"
                    style={{ backgroundColor: link.color }}
                  />
                  <span className="text-lg sm:text-xl md:text-2xl font-semibold group-hover:text-[#32CD32] transition-all duration-300 group-hover:translate-x-2">
                    {link.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-gray-400 uppercase tracking-[0.2em] mb-6 text-sm sm:text-base">
              Social
            </h2>
            <div className="flex flex-col space-y-4">
              {socialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  ref={(el) => (iconsRef.current[idx] = el)}
                  className="flex items-center space-x-3 group transition-transform duration-300 hover:translate-x-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="text-white group-hover:text-[#32CD32] transition-all duration-300">
                    {link.icon}
                  </div>
                  <span className="font-semibold text-base sm:text-lg group-hover:text-[#32CD32] transition-all duration-300">
                    {link.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

       
        <div className="mt-12 flex items-center space-x-3 text-base sm:text-lg border-t border-gray-700 pt-6">
          <MdOutlineMarkEmailRead className="text-[#32CD32]" />
          <a
            href="mailto:vaityjatin13@gmail.com"
            className="hover:text-[#32CD32] transition-colors duration-300 font-medium"
          >
            vaityjatin13@gmail.com
          </a>
        </div>

      
        <div
          className="mt-6 flex items-center space-x-2 cursor-pointer select-none"
          onClick={toggleLike}
        >
          <FaHeart
            className={`w-5 h-5 transition-transform duration-200 ${
              liked ? "text-red-500 scale-125" : "text-gray-400"
            }`}
          />
          <span className="text-gray-400 font-medium">{likes}</span>
          <span className="text-gray-400">Like this portfolio</span>
        </div>
      </div>
    </>
  );
};

export default OverlayMenu;
