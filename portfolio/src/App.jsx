import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Banner from "./Banner";
import OverlayMenu from "./OverlayMenu";
import { Cross as Hamburger } from "hamburger-react";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Footer from "./Footer";

function App() {
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const preloaderRef = useRef(null);
  const svgRef = useRef(null);
  const scrollbarRef = useRef(null);

  const sectionRefs = {
    Home: useRef(null),
    About: useRef(null),
    Skills: useRef(null),
    Projects: useRef(null),
    Contact: useRef(null),
  };

  useEffect(() => {
    const savedLiked = localStorage.getItem("liked");
    const savedLikes = localStorage.getItem("likes");
    if (savedLiked) setLiked(JSON.parse(savedLiked));
    if (savedLikes) setLikes(Number(savedLikes));
  }, []);

  const toggleLike = () => {
    const newLiked = !liked;
    const newLikes = newLiked ? likes + 1 : likes - 1;
    setLiked(newLiked);
    setLikes(newLikes);
    localStorage.setItem("liked", JSON.stringify(newLiked));
    localStorage.setItem("likes", newLikes.toString());
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const barCount = isMobile ? 6 : 10;

  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e) => {
      if (!svgRef.current) return;
      gsap.to(svgRef.current, {
        x: e.clientX,
        y: e.clientY,
        ease: "power2.out",
        duration: 0.25,
        opacity: 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power4.out" },
      onComplete: () => setLoading(false),
    });

    tl.to(".name-text span span", {
      yPercent: -100,
      stagger: 0.08,
      duration: 0.7,
    });

    tl.to(
      ".name-text span span",
      { scale: 1.1, duration: 0.3, yoyo: true, repeat: 1, stagger: 0.05 },
      "+=0.1"
    );

    tl.to(
      Array.from({ length: barCount }).map((_, i) => `.preloader-item-${i}`),
      {
        yPercent: 100,
        duration: 0.5,
        stagger: 0.05,
        ease: "power4.inOut",
      },
      "+=0.2"
    );

    tl.to(preloaderRef.current, { autoAlpha: 0, duration: 0.4 });
  }, [barCount]);

  useEffect(() => {
    if (!isMobile || !scrollbarRef.current) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      const scrollbarHeight = window.innerHeight * 0.2;
      const maxTop = window.innerHeight - scrollbarHeight;
      scrollbarRef.current.style.top = `${scrollPercent * maxTop}px`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
    <div className="relative bg-black text-white min-h-screen overflow-x-hidden">
  
      <div className="fixed top-6 right-6 z-[1200]">
        <Hamburger
          toggled={isMenuOpen}
          toggle={setIsMenuOpen}
          color="#FFFFFF"
          size={26}
          duration={0.6}
          easing="ease-in-out"
          label="Show menu"
        />
      </div>

      <OverlayMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        refs={sectionRefs}
        likes={likes}
        liked={liked}
        toggleLike={toggleLike}
      />

      <div ref={sectionRefs.Home}><Banner /></div>

      {!loading && (
        <>
          <div ref={sectionRefs.About}><About /></div>
          <div ref={sectionRefs.Skills}><Skills /></div>
          <div ref={sectionRefs.Projects}><Projects /></div>
          <div ref={sectionRefs.Contact}>
            <Footer likes={likes} liked={liked} toggleLike={toggleLike} />
          </div>
        </>
      )}

      {loading && (
        <div className="fixed inset-0 z-[2000] flex flex-col" ref={preloaderRef}>
          <div className="flex flex-1">
            {Array.from({ length: barCount }).map((_, i) => (
              <div
                key={i}
                className={`preloader-item-${i} h-full ${isMobile ? "w-[16.66%]" : "w-[10%]"} bg-black`}
              />
            ))}
          </div>

          <p className="name-text flex text-[18vw] sm:text-[12vw] lg:text-[160px] font-impact font-normal text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-none tracking-[0.15em] text-white">
            {"JATIN".split("").map((ch, i) => (
              <span key={i} className="overflow-hidden inline-block">
                <span className="inline-block translate-y-full text-white">{ch}</span>
              </span>
            ))}
          </p>
        </div>
      )}

      {!isMobile && (
        <svg
          width="27"
          height="30"
          viewBox="0 0 27 30"
          className="fixed top-0 left-0 opacity-100 z-[3000] pointer-events-none"
          fill="none"
          strokeWidth="2"
          xmlns="http://www.w3.org/2000/svg"
          ref={svgRef}
        >
          <path
            d="M20.0995 11.0797L3.72518 1.13204C2.28687 0.258253 0.478228 1.44326 0.704999 3.11083L3.28667 22.0953C3.58333 24.2768 7.33319 24.6415 8.3792 22.7043C9.5038 20.6215 10.8639 18.7382 12.43 17.7122C13.996 16.6861 16.2658 16.1911 18.6244 15.9918C20.8181 15.8063 21.9811 12.2227 20.0995 11.0797Z"
            className="fill-white stroke-gray-400"
          />
        </svg>
      )}
      {isMobile && (
        <div
          ref={scrollbarRef}
          className="fixed right-2 w-1 rounded bg-green-500 opacity-50 z-[3000]"
          style={{ height: '20vh', transition: 'top 0.1s linear' }}
        />
      )}

      <style>{`
  ${!isMobile ? "* { cursor: none; }" : ""}

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #111; }
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #32cd32, #00ff7f);
    border-radius: 10px;
    animation: glow-scroll 2s ease-in-out infinite alternate;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #00ff7f, #32cd32);
  }

  /* Hide scrollbar when overlay is open */
  ${isMenuOpen ? `
    ::-webkit-scrollbar { display: none; }
    body { overflow: hidden; }
  ` : ''}

  @keyframes glow-scroll {
    0% { box-shadow: 0 0 5px #32cd32, 0 0 10px #32cd32; }
    100% { box-shadow: 0 0 15px #00ff7f, 0 0 25px #32cd32; }
  }
`}</style>

    </div>
  );
}

export default App;
