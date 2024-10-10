import React, { useEffect, useRef, useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const navElement = navRef.current;

    gsap.fromTo(navElement, 
      { opacity: 0, y: -50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.5,
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: '+=200',
          toggleActions: 'play none none reverse',
          scrub: true
        }
      }
    );

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current.children,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.1 }
      );
    }
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = ['Home', 'Products', 'About Us', 'Contact'];

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-8">
        <div className={`text-2xl font-bold ${isScrolled ? 'text-green-600' : 'text-white'}`}>
          Sisi Village
        </div>
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <a 
              key={item} 
              href="#" 
              className={`hover:text-green-600 transition-colors ${
                isScrolled ? 'text-green-800' : 'text-white'
              }`}
            >
              {item}
            </a>
          ))}
          <a href="#" className={`hover:text-green-600 transition-colors ${
            isScrolled ? 'text-green-800' : 'text-white'
          }`}>
            <ShoppingCart size={20} />
          </a>
        </div>
        <div className="md:hidden px-4">
          <button onClick={toggleMenu} className={isScrolled ? 'text-green-800' : 'text-white'}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div ref={mobileMenuRef} className="md:hidden mt-4 bg-white">
          {navItems.map((item) => (
            <a 
              key={item} 
              href="#" 
              className="block py-2 px-4 text-green-800 hover:text-green-600 transition-colors"
            >
              {item}
            </a>
          ))}
          <a 
            href="#" 
            className="block py-2 px-4 text-green-800 hover:text-green-600 transition-colors"
          >
            <ShoppingCart size={20} />
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;