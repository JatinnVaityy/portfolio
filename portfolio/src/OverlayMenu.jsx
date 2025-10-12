import React, { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin, FaHeart } from "react-icons/fa";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import gsap from "gsap";
import leetcodeWhite from "../assets/leetcode.png";

const OverlayMenu = ({ isOpen, onClose, refs }) => {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const linksRef = useRef([]);
  const iconsRef = useRef([]);

  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  // Fetch likes from backend
  const fetchLikes = async () => {
    try {
      const res = await fetch("http://localhost:5000/likes");
      const data = await res.json();
      setLikes(data.likes);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, []);

  // Toggle like/unlike
  const toggleLike = async () => {
    try {
      const action = liked ? "unlike" : "like";
      const res = await fetch("http://localhost:5000/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      setLikes(data.likes);
      setLiked(!liked);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });
      tl.fromTo(panelRef.current, { x: "100%", opacity: 0 }, { x: "0%", opacity: 1, duration: 0.7 }, "<");
      tl.fromTo(linksRef.current, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, stagger: 0.12 }, "-=0.4");
      tl.fromTo(iconsRef.current, { y: 30, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12 }, "-=0.5");
    } else {
      gsap.to(panelRef.current, { x: "100%", opacity: 0, duration: 0.6 });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.5 });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const menuLinks = [
    { name: "Home", key: "Home", color: "#FFD700" },
    { name: "About Me", key: "About", color: "#1E90FF" },
    { name: "Skills", key: "Skills", color: "#FF4500" },
    { name: "Projects", key: "Projects", color: "#8A2BE2" },
    { name: "Contact", key: "Contact", color: "#32CD32" },
  ];

  const socialLinks = [
    { name: "Github", href: "https://github.com/JatinnVaityy/", icon: <FaGithub className="w-6 h-6 text-white" /> },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/jatin-vaity-8691bb286/", icon: <FaLinkedin className="w-6 h-6 text-white" /> },
    { name: "LeetCode", href: "https://leetcode.com/u/JatinVaity/", icon: <img src={leetcodeWhite} alt="LeetCode" className="w-6 h-6 invert" /> },
  ];

  const handleMenuClick = (key) => {
    onClose();
    if (refs && refs[key] && refs[key].current) {
      refs[key].current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div ref={overlayRef} onClick={onClose} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[999]" />
      <div ref={panelRef} className="fixed top-0 right-0 h-full w-full sm:w-[80%] md:w-[50%] bg-[#0b0b0b] z-[1000] flex flex-col p-6 md:p-10 text-white">
        <div className="flex flex-col flex-1 overflow-auto gap-10 md:gap-20">
          <div>
            <h2 className="text-gray-400 uppercase tracking-[0.2em] mb-6 text-sm sm:text-base">Menu</h2>
            <div className="flex flex-col space-y-6">
              {menuLinks.map((link, idx) => (
                <button key={idx} ref={(el) => (linksRef.current[idx] = el)} onClick={() => handleMenuClick(link.key)} className="flex items-center space-x-3 group">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: link.color }} />
                  <span className="text-lg font-semibold group-hover:text-[#32CD32]">{link.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-gray-400 uppercase tracking-[0.2em] mb-6 text-sm sm:text-base">Social</h2>
            <div className="flex flex-col space-y-4">
              {socialLinks.map((link, idx) => (
                <a key={idx} href={link.href} ref={(el) => (iconsRef.current[idx] = el)} className="flex items-center space-x-3" target="_blank" rel="noopener noreferrer">
                  <div className="text-white">{link.icon}</div>
                  <span className="font-semibold text-base sm:text-lg">{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 md:mt-6 flex-shrink-0 border-t border-gray-700 pt-4 flex flex-col gap-3">
          <div className="flex items-center space-x-3 text-base sm:text-lg">
            <MdOutlineMarkEmailRead className="text-[#32CD32]" />
            <a href="mailto:vaityjatin13@gmail.com" className="hover:text-[#32CD32] transition-colors duration-300 font-medium">vaityjatin13@gmail.com</a>
          </div>

          <div className="flex items-center space-x-2 cursor-pointer select-none" onClick={toggleLike}>
            <FaHeart className={`w-5 h-5 transition-transform duration-200 ${liked ? "text-red-500 scale-125" : "text-gray-400"}`} />
            <span className="text-gray-400 font-medium">{likes}</span>
            <span className="text-gray-400">Like this portfolio</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverlayMenu;
