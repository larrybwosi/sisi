import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Leaf, Heart, Recycle, Sprout, Sun, Droplets, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { LucideIcon } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Item {
  icon: LucideIcon;
  text: string;
  description: string;
}

const AboutUs: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isClient, setIsClient] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const items: Item[] = [
    { icon: Leaf, text: '100% Organic Farming', description: 'We use only natural methods to grow our produce, ensuring the highest quality and most nutritious food for our customers.' },
    { icon: Heart, text: 'Community-Supported Agriculture', description: 'Our CSA program connects consumers directly with our farm, fostering a strong bond between producer and consumer.' },
    { icon: Recycle, text: 'Sustainable Packaging', description: 'All our packaging is made from recycled materials and is fully biodegradable, minimizing our environmental impact.' },
    { icon: Sprout, text: 'Avocado Seedling Nursery', description: 'We nurture avocado seedlings with care, providing healthy starts for home gardeners and small-scale farmers.' },
    { icon: Sun, text: 'Solar-Powered Facilities', description: 'Our farm runs on clean, renewable solar energy, reducing our carbon footprint and energy costs.' },
    { icon: Droplets, text: 'Water Conservation', description: 'We employ advanced irrigation techniques and rainwater harvesting to minimize water usage and protect this precious resource.' },
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const content = contentRef.current;
    const listItems = listRef.current?.children;
    const images = imageRefs.current;

    if (!content || !listItems || images.length === 0) return;

    // Content animation
    gsap.fromTo(content, 
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out",
        scrollTrigger: {
          trigger: content,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // List items animation
    gsap.fromTo(listItems, 
      { opacity: 0, y: 50, scale: 0.9 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Images animation
    images.forEach((img, index) => {
      if (!img) return;
      gsap.fromTo(img,
        { opacity: 0, scale: 0.8, rotation: index % 2 === 0 ? 10 : -10 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.5,
          delay: index * 0.3,
          ease: "elastic.out(1, 0.75)",
          scrollTrigger: {
            trigger: img,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Parallax effect for background
    gsap.to('.bg-gradient-to-br', {
      backgroundPosition: '50% 100%',
      ease: "none",
      scrollTrigger: {
        trigger: '.bg-gradient-to-br',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

  }, [isClient]);

  const openModal = (item: Item) => {
    setSelectedItem(item);
    gsap.to('.modal-backdrop', { opacity: 1, duration: 0.3, ease: 'power2.inOut' });
    gsap.fromTo('.modal-content', 
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
    );
  };

  const closeModal = () => {
    gsap.to('.modal-backdrop', { opacity: 0, duration: 0.3, ease: 'power2.inOut' });
    gsap.to('.modal-content', { opacity: 0, scale: 0.9, duration: 0.3, ease: 'power2.inOut', onComplete: () => setSelectedItem(null) });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[length:200%_200%] bg-[position:50%_0%]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-between space-y-12 lg:space-y-0 lg:space-x-12">
          <div ref={contentRef} className="lg:w-1/2 space-y-8">
            <h2 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-4 font-sans leading-tight">
              About Sisi Village
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
              At Sisi Village, we&apos;re more than just an avocado farm - we&apos;re stewards of the land and champions of sustainable agriculture. Founded in 2010, our family-owned business has grown from a small orchard to a thriving enterprise, all while maintaining our commitment to quality, sustainability, and community.
            </p>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
              Our diverse range of premium produce includes meticulously cultivated avocados, crisp spring onions, nutrient-rich cabbages, and golden honey from our on-site apiaries. We take immense pride in our state-of-the-art irrigation systems that conserve water, and our cutting-edge, eco-friendly pest management techniques that safeguard both our crops and the surrounding ecosystems.
            </p>
            <div ref={listRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center bg-white p-4 rounded-lg shadow-md transition-all cursor-pointer hover:bg-green-50"
                  onClick={() => openModal(item)}
                >
                  <item.icon className="text-green-500 w-6 h-6 mr-3" />
                  <span className="text-gray-800">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 space-y-8">
            <div 
              ref={(el) => { if (el) imageRefs.current[0] = el; }}
              className="relative w-full h-0 pb-[75%] rounded-2xl overflow-hidden shadow-2xl transition-transform hover:scale-105"
            >
              <Image 
                src="https://images.unsplash.com/photo-1528795259021-d8c86e14354c" 
                alt="Sisi Village Farm" 
                layout="fill"
                objectFit="cover"
                className="rounded-2xl"
              />
            </div>
            <div 
              ref={(el) => { if (el) imageRefs.current[1] = el; }}
              className="relative w-full h-0 pb-[75%] rounded-2xl overflow-hidden shadow-2xl transition-transform hover:scale-105"
            >
              <Image 
                src="https://images.unsplash.com/photo-1589927986089-35812388d1f4" 
                alt="Avocado Seedlings" 
                layout="fill"
                objectFit="cover"
                className="rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
      {isClient && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 modal-backdrop" onClick={closeModal}>
          <div className="bg-white rounded-lg p-6 max-w-md relative modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <selectedItem.icon className="text-green-500 w-12 h-12 mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedItem.text}</h3>
            <p className="text-gray-600">{selectedItem.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutUs;