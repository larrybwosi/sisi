import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Leaf, Heart, Recycle, Sprout, Sun, Droplets } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-between space-y-12 lg:space-y-0 lg:space-x-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 space-y-8"
          >
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4 font-sans leading-tight"
            >
              About Us
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-700 leading-relaxed"
            >
              At Sisi Village, we're more than just an avocado farm - we're stewards of the land and champions of sustainable agriculture. Founded in 2010, our family-owned business has grown from a small orchard to a thriving enterprise, all while maintaining our commitment to quality, sustainability, and community.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl text-gray-700 leading-relaxed"
            >
              Our diverse range of premium produce includes meticulously cultivated avocados, crisp spring onions, nutrient-rich cabbages, and golden honey from our on-site apiaries. We take immense pride in our state-of-the-art irrigation systems that conserve water, and our cutting-edge, eco-friendly pest management techniques that safeguard both our crops and the surrounding ecosystems.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg sm:text-xl text-gray-700 leading-relaxed"
            >
              For those aspiring to cultivate their own piece of nature, we offer robust avocado seedlings, nurtured with expertise to ensure optimal growth and yield. Our commitment to sustainable agriculture extends beyond our fields, as we strive to empower and educate our community in the art of organic farming.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            >
              <div className="flex items-center bg-white p-4 rounded-lg shadow-md transition-transform hover:scale-105">
                <Leaf className="text-green-500 w-6 h-6 mr-3" />
                <span className="text-gray-800">100% Organic Farming</span>
              </div>
              <div className="flex items-center bg-white p-4 rounded-lg shadow-md transition-transform hover:scale-105">
                <Heart className="text-green-500 w-6 h-6 mr-3" />
                <span className="text-gray-800">Community-Supported Agriculture</span>
              </div>
              <div className="flex items-center bg-white p-4 rounded-lg shadow-md transition-transform hover:scale-105">
                <Recycle className="text-green-500 w-6 h-6 mr-3" />
                <span className="text-gray-800">Sustainable Packaging</span>
              </div>
              <div className="flex items-center bg-white p-4 rounded-lg shadow-md transition-transform hover:scale-105">
                <Sprout className="text-green-500 w-6 h-6 mr-3" />
                <span className="text-gray-800">Avocado Seedling Nursery</span>
              </div>
              <div className="flex items-center bg-white p-4 rounded-lg shadow-md transition-transform hover:scale-105">
                <Sun className="text-green-500 w-6 h-6 mr-3" />
                <span className="text-gray-800">Solar-Powered Facilities</span>
              </div>
              <div className="flex items-center bg-white p-4 rounded-lg shadow-md transition-transform hover:scale-105">
                <Droplets className="text-green-500 w-6 h-6 mr-3" />
                <span className="text-gray-800">Water Conservation</span>
              </div>
            </motion.div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2 space-y-8"
          >
            <div className="relative w-full h-0 pb-[75%] rounded-2xl overflow-hidden shadow-2xl transition-transform hover:scale-105">
              <Image 
                src="https://images.unsplash.com/photo-1528795259021-d8c86e14354c" 
                alt="Sisi Village Farm" 
                layout="fill"
                objectFit="cover"
                className="rounded-2xl"
              />
            </div>
            <div className="relative w-full h-0 pb-[75%] rounded-2xl overflow-hidden shadow-2xl transition-transform hover:scale-105">
              <Image 
                src="https://images.unsplash.com/photo-1589927986089-35812388d1f4" 
                alt="Avocado Seedlings" 
                layout="fill"
                objectFit="cover"
                className="rounded-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
