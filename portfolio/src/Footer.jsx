import React, { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import leetcodeWhite from "../assets/leetcode.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  // Fetch global likes from backend
  const fetchLikes = async () => {
    try {
      const res = await fetch("http://localhost:5000/likes");
      const data = await res.json();
      setLikes(data.likes);
    } catch (err) {
      console.error("Failed to fetch likes:", err);
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
      console.error("Failed to update likes:", err);
    }
  };

  const socialLinks = [
    { name: "Github", href: "https://github.com/JatinnVaityy/", icon: <FaGithub className="w-6 h-6 text-white" /> },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/jatin-vaity-8691bb286/", icon: <FaLinkedin className="w-6 h-6 text-white" /> },
    { name: "LeetCode", href: "https://leetcode.com/u/JatinVaity/", icon: <img src={leetcodeWhite} alt="LeetCode" className="w-6 h-6 invert" /> },
  ];

  return (
    <footer className="bg-[#2f2f2f] text-white font-[Impact,sans-serif] relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
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

          <div className="flex items-center space-x-2 cursor-pointer select-none" onClick={toggleLike}>
            <FaHeart className={`w-5 h-5 transition-transform duration-200 ${liked ? "text-red-500 scale-125" : "text-gray-400"}`} />
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
