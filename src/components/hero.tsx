import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Leaf, Sprout, Info, Apple, Carrot } from 'lucide-react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GiHoneycomb } from 'react-icons/gi';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      gsap.fromTo(
        element.querySelectorAll('.gsap-fade-in'),
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true
          }
        }
      );
    }
  }, []);

  const products = [
    { name: "Avocados", icon: Sprout, color: "text-green-500" },
    { name: "Honey", icon: GiHoneycomb, color: "text-yellow-500" },
    { name: "Apples", icon: Apple, color: "text-red-500" },
    { name: "Broccoli", icon: Carrot, color: "text-green-600" },
    { name: "Onions", icon: Sprout, color: "text-purple-500" }
  ];

  return (
    <div ref={ref} className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4 sm:p-8 pt-24 overflow-hidden">
      <div className="container mx-auto flex flex-col lg:flex-row items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 text-green-800 z-10"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-500">
            SisiVillage: Nature&apos;s Bounty
          </h1>
          <motion.p 
            className="text-xl sm:text-2xl mb-8 flex items-center text-green-700 gsap-fade-in"
          >
            <Leaf className="mr-3 text-green-500" />
            Experience the richness of our organic farm, from premium avocados to golden honey.
          </motion.p>
          <div className="flex flex-wrap gap-4 mb-8">
            {products.map((product, index) => (
              <motion.div
                key={product.name}
                className={`flex items-center ${product.color} bg-white bg-opacity-50 backdrop-blur-md rounded-full px-4 py-2 shadow-md gsap-fade-in`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <product.icon className="mr-2" />
                {product.name}
              </motion.div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center justify-center transition duration-300 hover:from-green-600 hover:to-blue-600"
            >
              <ShoppingCart className="mr-2" /> Shop Now
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-green-500 text-green-600 font-bold py-3 px-6 rounded-full shadow-lg flex items-center justify-center transition duration-300 hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500 hover:text-white"
            >
              <Info className="mr-2" /> Our Story
            </motion.button>
          </div>
          <motion.div 
            className="flex items-center text-green-700 gsap-fade-in"
          >
            <Sprout className="mr-3 text-green-500" />
            <span>Committed to sustainable farming and biodiversity</span>
          </motion.div>
        </motion.div>
        <motion.div 
          style={{ y }}
          className="lg:w-1/2 mt-12 lg:mt-0 hidden lg:block"
        >
          <div className="relative w-full h-[600px]">
            <Image 
              src="https://images.unsplash.com/photo-1495476479092-6ece1898a101" 
              alt="Organic Farm" 
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-500 to-transparent opacity-30 rounded-lg"></div>
            <motion.div
              className="absolute bottom-8 left-8 bg-white bg-opacity-80 backdrop-blur-md rounded-lg p-4 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <h3 className="text-xl font-semibold text-green-800 mb-2">Fresh from Our Fields</h3>
              <p className="text-green-700">Experience the taste of nature in every bite.</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <AnimatePresence>
        {typeof window !== 'undefined' && window.innerWidth < 1024 && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-md p-4 shadow-lg"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <h3 className="text-lg font-semibold text-green-800 mb-2">Our Organic Selection</h3>
            <div className="flex overflow-x-auto space-x-4 pb-2">
              {products.map((product) => (
                <div key={product.name} className="flex-shrink-0 flex flex-col items-center">
                  <product.icon className={`text-2xl ${product.color}`} />
                  <span className="text-sm mt-1">{product.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hero;