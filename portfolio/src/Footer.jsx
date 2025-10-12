'use client';
import React, { useEffect } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaHeart,
} from "react-icons/fa";
import leetcodeWhite from "../assets/leetcode.png";
import axios from "axios";

const API_BASE = "https://portfolio-twym.onrender.com";

const Footer = ({ likes, liked, toggleLike }) => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Github",
      href: "https://github.com/JatinnVaityy/",
      icon: <FaGithub className="w-6 h-6 text-white" />,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/jatin-vaity-8691bb286/",
      icon: <FaLinkedin className="w-6 h-6 text-white" />,
    },
    {
      name: "LeetCode",
      href: "https://leetcode.com/u/JatinVaity/",
      icon: <img src={leetcodeWhite} alt="LeetCode" className="w-6 h-6 invert" />,
    },
  ];


  return (
    <footer className="bg-[#2f2f2f] text-white font-[Impact,sans-serif] relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="py-14 flex flex-col md:flex-row justify-between gap-10">
          <div className="max-w-lg text-center md:text-left">
            <h2
              className="text-4xl md:text-5xl mb-3 tracking-wide text-white"
              style={{
                fontFamily:
                  "Impact, Haettenschweiler, Arial Narrow Bold, sans-serif",
              }}
            >
              Jatin <span className="text-[#32CD32]">Vaity</span>
            </h2>

            <div className="h-[2px] w-28 bg-[#32CD32] mb-6 rounded mx-auto md:mx-0"></div>

            <p className="text-gray-300 leading-relaxed text-base md:text-lg font-sans">
              Have a{" "}
              <span className="text-[#32CD32] font-semibold">project idea</span>? <br />
              Let's{" "}
              <span className="text-[#32CD32] font-semibold">
                bring it to life together
              </span>
              !
            </p>
          </div>

          <div className="space-y-3 text-gray-300 text-sm md:text-base text-center md:text-left font-sans">
            <div className="flex justify-center md:justify-start items-center gap-2">
              <FaEnvelope className="text-[#32CD32]" /> vaityjatin13@gmail.com
            </div>
            <div className="flex justify-center md:justify-start items-center gap-2">
              <FaPhoneAlt className="text-[#32CD32]" /> +91 8291347493
            </div>
            <div className="flex justify-center md:justify-start items-center gap-2">
              <FaMapMarkerAlt className="text-[#32CD32]" /> Mumbai, India
            </div>
          </div>
        </div>

        <div className="border-t border-[#3a3a3a] mb-8"></div>

        <div className="pb-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-4">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.href}
                className="w-10 h-10 bg-[#1a1a1a] hover:bg-[#32CD32] rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md"
                aria-label={social.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </div>

           <div onClick={toggleLike} className="flex items-center space-x-2 cursor-pointer select-none">
   <FaHeart
    className={`w-5 h-5 transition-transform duration-300 ${
      liked ? 'text-red-500 scale-125 animate-pulse' : 'text-gray-400'
    }`}
  />
  <span className="text-gray-400 font-medium">{likes}</span>
  <span className="text-gray-400">Like this portfolio</span>
  </div>

          <div className="flex flex-col sm:flex-row items-center text-gray-400 text-sm space-y-3 sm:space-y-0 sm:space-x-6 text-center sm:text-left font-sans">
            <span>© {currentYear} Jatin Vaity. All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
