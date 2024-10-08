'use client'
import AboutUs from "@/components/about";
import ContactForm from "@/components/contact";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Showcase from "@/components/showcase";

export default function Home() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <AboutUs/>
      <Showcase/>
      <ContactForm/>
    </>
  );
}
