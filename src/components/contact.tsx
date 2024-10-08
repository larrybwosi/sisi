import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
      gsap.fromTo(
        '.form-field',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'back.out(1.7)' }
      );
    }
  }, [isInView, controls]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <section ref={formRef} className="bg-gradient-to-br from-green-100 via-emerald-200 to-teal-300 py-24 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between">
        <motion.div
          className="lg:w-1/2 mb-12 lg:mb-0"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.h2 variants={itemVariants} className="text-6xl font-extrabold text-emerald-800 mb-8 leading-tight">
            Join the SisiVillage Family!
          </motion.h2>
          <motion.p variants={itemVariants} className="text-2xl text-teal-700 mb-8 leading-relaxed">
            Be the first to know about our exclusive offers, new harvests, and sustainable farming tips. Sign up now and receive:
          </motion.p>
          <motion.ul variants={containerVariants} className="text-emerald-700 text-xl mb-8 list-none space-y-4">
            {[
              '15% off your first order of premium SisiVillage produce',
              'Monthly newsletter with farm-to-table recipes and health benefits',
              'VIP invitations to our farm tours and seasonal festivals',
              'Early access to limited edition artisanal products'
            ].map((item, index) => (
              <motion.li key={index} variants={itemVariants} className="flex items-center">
                <svg className="w-6 h-6 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </motion.li>
            ))}
          </motion.ul>
          <motion.p variants={itemVariants} className="text-teal-700 text-2xl font-semibold italic">
            Don&apos;t miss out on nature&apos;s bounty – join our family today!
          </motion.p>
        </motion.div>
        <div className="lg:w-1/2 flex flex-col items-center">
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-2xl rounded-3xl p-10 w-full max-w-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="mb-8 form-field">
              <label htmlFor="name" className="block text-emerald-700 font-bold mb-2 text-lg">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-300 text-lg bg-white bg-opacity-50"
                required
              />
            </div>
            <div className="mb-8 form-field">
              <label htmlFor="email" className="block text-emerald-700 font-bold mb-2 text-lg">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-300 text-lg bg-white bg-opacity-50"
                required
              />
            </div>
            <div className="mb-8 form-field">
              <label htmlFor="message" className="block text-emerald-700 font-bold mb-2 text-lg">Message (Optional)</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border-2 border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-300 text-lg bg-white bg-opacity-50"
              ></textarea>
            </div>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(16, 185, 129, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-4 px-6 rounded-lg hover:from-emerald-600 hover:to-teal-700 transition duration-300 shadow-lg text-xl relative overflow-hidden group"
            >
              <span className="relative z-10">Join Our SisiVillage Family!</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;