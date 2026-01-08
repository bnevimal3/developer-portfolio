import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Services from './components/Services';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#D4AF37] selection:text-black">
      <Navbar scrolled={scrolled} />
      <main>
        <Hero />
        {/* Services component highlighting domain expertise */}
        <Services />
        <Portfolio />
        <Contact />
      </main>
      <footer className="py-16 px-6 border-t border-[#D4AF37]/10 text-center text-[10px] uppercase tracking-[0.5em] text-gray-600 font-bold">
        <p>© {new Date().getFullYear()} Nanda Eswar. Excellence in Software Development.</p>
      </footer>
    </div>
  );
};

export default App;