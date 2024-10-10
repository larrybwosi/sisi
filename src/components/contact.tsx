import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Assuming content is imported correctly
import content from '../lib/content.json';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isClient, setIsClient] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const formFieldsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setIsClient(true);

    if (typeof window !== 'undefined') {
      // GSAP animations
      const tl = gsap.timeline();

      tl.from(containerRef.current, {
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      tl.from(leftColumnRef.current, {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, "-=0.5");

      tl.from(rightColumnRef.current, {
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, "-=0.5");

      formFieldsRef.current.forEach((field) => {
        if (field) {
          tl.from(field, {
            y: 20,
            opacity: 0,
            duration: 0.5,
            ease: 'power3.out'
          }, "-=0.3");
        }
      });
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the form data to a server

    if (typeof window !== 'undefined') {
      // Animation for form submission
      gsap.to(formFieldsRef.current, {
        y: -10,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power3.out',
        onComplete: () => {
          gsap.to(formFieldsRef.current, {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.5,
            ease: 'power3.out'
          });
        }
      });
    }
  };

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg shadow-lg">
      <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
        <div ref={leftColumnRef} className="lg:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">{content.pageTitle}</h1>
          <p className="mb-6 text-gray-600">{content.pageDescription}</p>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Our Products:</h2>
          <ul className="list-disc pl-5 mb-6 text-gray-600">
            {content.products.map((product, index) => (
              <li key={index} className="mb-1 hover:text-green-600 transition-colors duration-300">{product}</li>
            ))}
          </ul>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Benefits of Contacting Us:</h2>
          <ul className="list-disc pl-5 text-gray-600">
            {content.benefits.map((benefit, index) => (
              <li key={index} className="mb-1 hover:text-blue-600 transition-colors duration-300">{benefit}</li>
            ))}
          </ul>
        </div>
        <div ref={rightColumnRef} className="lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Contact Us</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {(['name', 'email', 'phone', 'subject'] as const).map((field, index) => (
              <div key={field} ref={el => formFieldsRef.current[index] = el} className="transition-all duration-300 ease-in-out transform hover:scale-105">
                <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                </label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  required={field !== 'phone'}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition-colors duration-300"
                />
              </div>
            ))}
            <div ref={el => formFieldsRef.current[4] = el} className="transition-all duration-300 ease-in-out transform hover:scale-105">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition-colors duration-300"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;