import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    name: 'Broccoli',
    description: 'Fresh and crisp broccoli grown with care in our organic fields.',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Onions',
    description: 'Flavorful, locally grown onions perfect for any dish.',
    image: 'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Avocados',
    description: 'Creamy, nutrient-rich avocados from our sustainable orchards.',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Avocado Seedlings',
    description: 'Start your own avocado journey with our healthy seedlings.',
    image: 'https://images.unsplash.com/photo-1628689469838-524a4a973b8e?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Apples',
    description: 'Crisp, juicy apples picked at the peak of freshness.',
    image: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Honey',
    description: 'Pure, golden honey from our on-site bee hives.',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80'
  }
];

const Showcase: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const showcaseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top bottom-=100px',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      gsap.fromTo(showcaseRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: showcaseRef.current,
            start: 'top bottom',
            end: 'bottom top',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
  }, []);

  return (
    <div ref={showcaseRef} className="bg-gradient-to-br from-green-50 to-green-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl font-bold text-center text-green-800 mb-12"
        >
          Our Fresh Products
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
              whileHover={{ y: -5 }}
              onClick={() => setSelectedProduct(index)}
            >
              <div className="relative h-48 sm:h-64">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-green-700 mb-2">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selectedProduct !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 mb-4">
                <Image
                  src={products[selectedProduct].image}
                  alt={products[selectedProduct].name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <h3 className="text-2xl font-bold text-green-700 mb-2">{products[selectedProduct].name}</h3>
              <p className="text-gray-600 mb-4">{products[selectedProduct].description}</p>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                onClick={() => setSelectedProduct(null)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Showcase;