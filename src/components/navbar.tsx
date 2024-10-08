import React, { useEffect, useRef, useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const navElement = navRef.current;

    gsap.fromTo(navElement, 
      { opacity: 0, y: -20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.5,
        scrollTrigger: {
          trigger: navElement,
          start: 'top top',
          end: '+=200',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = ['Home', 'Products', 'About Us', 'Contact'];

  return (
    <nav 
      ref={navRef}
      className="bg-white shadow-md py-4 px-4 sm:px-8 fixed top-0 left-0 right-0 z-50"
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-green-600">
          Sisi Village
        </div>
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <a 
              key={item} 
              href="#" 
              className="text-green-800 hover:text-green-600 transition-colors"
            >
              {item}
            </a>
          ))}
          <a href="#" className="text-green-800 hover:text-green-600 transition-colors">
            <ShoppingCart size={20} />
          </a>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-green-800">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          {navItems.map((item) => (
            <a 
              key={item} 
              href="#" 
              className="block py-2 text-green-800 hover:text-green-600 transition-colors"
            >
              {item}
            </a>
          ))}
          <a 
            href="#" 
            className="block py-2 text-green-800 hover:text-green-600 transition-colors"
          >
            <ShoppingCart size={20} />
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;