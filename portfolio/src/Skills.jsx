import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { SiMongodb } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

const MY_STACK = {
  frontend: [
    { name: 'JavaScript', icon: '/logo/js.png' },
    { name: 'TypeScript', icon: '/logo/ts.png' },
    { name: 'React', icon: '/logo/react.png' },
    { name: 'Next.js', icon: '/logo/next.png' },
    { name: 'Redux', icon: '/logo/redux.png' },
    { name: 'Tailwind CSS', icon: '/logo/tailwind.png' },
    { name: 'GSAP', icon: '/logo/gsap.png' },
    { name: 'Framer Motion', icon: '/logo/framer-motion.png' },
    { name: 'Bootstrap', icon: '/logo/bootstrap.svg' },
  ],
  backend: [
    { name: 'Node.js', icon: '/logo/node.png' },
    { name: 'NestJS', icon: '/logo/nest.svg' },
    { name: 'Express.js', icon: '/logo/express.png' },
  ],
  database: [
    { name: 'MySQL', icon: '/logo/mysql.svg' },
    { name: 'PostgreSQL', icon: '/logo/postgreSQL.png' },
    { name: 'MongoDB', icon: 'mongodb' },
    { name: 'Prisma', icon: '/logo/prisma.png' },
  ],
  tools: [
    { name: 'Git', icon: '/logo/git.png' },
    { name: 'Docker', icon: '/logo/docker.svg' },
    { name: 'AWS', icon: '/logo/aws.png' },
  ],
};

const Skills = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    gsap.from('.skills-heading', {
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
      id="my-stack"
      ref={containerRef}
      className="relative py-32 bg-[#2f2f2f] text-white overflow-hidden font-montserrat"
    >
      <div className="container mx-auto px-6 md:px-12">
      
        <h2
          className="skills-heading text-4xl md:text-5xl mb-6 tracking-wide font-normal"
          style={{ fontFamily: 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif' }}
        >
          My <span className="text-[#32CD32]">Stack</span>
        </h2>

        <div className="skills-divider h-[3px] w-28 bg-[#32CD32] mb-12 rounded"></div>

        <div className="space-y-28">
          {Object.entries(MY_STACK).map(([category, items]) => (
            <div className="grid md:grid-cols-12 gap-12 items-center" key={category}>
            
              <div className="md:col-span-5">
                <p
                  className="slide-up text-4xl md:text-5xl mb-4"
                  style={{ fontFamily: 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif' }}
                >
                  {category}
                </p>
              </div>

              <div className="md:col-span-7 flex flex-wrap gap-8">
                {items.map((item) => (
                  <div
                    key={item.name}
                    className="slide-up flex gap-4 items-center transform transition-transform hover:scale-110 duration-300"
                  >
                    <div className="w-12 h-12 flex items-center justify-center">
                      {item.icon === 'mongodb' ? (
                        <SiMongodb className="text-[#32CD32] w-12 h-12" />
                      ) : (
                        <img
                          src={item.icon}
                          alt={item.name}
                          className="w-12 h-12 object-contain"
                        />
                      )}
                    </div>
                    <span className="text-2xl md:text-3xl font-medium capitalize">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
