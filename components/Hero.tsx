
import React from 'react';
import ParticleBackground from './ParticleBackground';

interface OrbitCardProps {
  name: string;
  delay: string;
  link: string;
  index: number;
}

const PremiumOrbitCard: React.FC<OrbitCardProps> = ({ name, delay, link, index }) => {
  // Simplified icons for the card "visual side"
  const getIcon = (title: string) => {
    switch (title) {
      case 'Projects': return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      );
      case 'Portfolio': return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
      case 'Contact': return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      );
      case 'Social': return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      );
      case 'Services': return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
        </svg>
      );
      default: return null;
    }
  };

  return (
    <a 
      href={link}
      className="orbit-card-container group block" 
      style={{ animationDelay: delay }}
    >
      <div 
        className="premium-card-wave relative w-[130px] md:w-[160px] h-[70px] md:h-[90px] rounded-[18px] md:rounded-[24px] overflow-hidden border border-[#D4AF37]/20 bg-black/60 backdrop-blur-2xl transition-all duration-700 group-hover:border-[#D4AF37]/60 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]"
        style={{ animationDelay: `${index * 1.2}s` }}
      >
        {/* Split Layout */}
        <div className="flex h-full w-full">
          {/* Left Text Side */}
          <div className="w-[60%] p-4 flex flex-col justify-center">
            <h4 className="font-display text-[14px] md:text-[16px] font-bold text-[#D4AF37] leading-none mb-1">
              {name}
            </h4>
            <div className="w-4 h-[1px] bg-[#D4AF37]/40 transition-all duration-500 group-hover:w-8 group-hover:bg-[#D4AF37]"></div>
            <p className="text-[7px] md:text-[8px] uppercase tracking-[0.2em] text-gray-500 mt-2 font-black">
              Explore
            </p>
          </div>
          
          {/* Right Visual Side */}
          <div className="w-[40%] bg-[#D4AF37]/5 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-50"></div>
            <div className="relative text-[#D4AF37]/60 group-hover:text-[#D4AF37] group-hover:scale-110 transition-all duration-500">
              {getIcon(name)}
            </div>
          </div>
        </div>

        {/* Shine Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>
    </a>
  );
};

const Hero: React.FC = () => {
  // Recalibrated delays for 5 cards orbiting in 25s (25 / 5 = 5s increments)
  const cards = [
    { name: "Projects", delay: "0s", link: "#portfolio" },
    { name: "Services", delay: "-5s", link: "#services" },
    { name: "Portfolio", delay: "-10s", link: "#portfolio" },
    { name: "Contact", delay: "-15s", link: "#contact" },
    { name: "Social", delay: "-20s", link: "#contact" }
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black py-20">
      <ParticleBackground />

      {/* Premium Decorative Glows */}
      <div className="absolute top-[15%] left-[10%] w-[500px] h-[150px] bg-[#D4AF37]/5 rounded-full blur-[120px] rotate-12 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[200px] bg-[#D4AF37]/10 rounded-full blur-[140px] -rotate-12 pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Professional Pill */}
        <div className="mb-10 px-6 py-2 rounded-full border border-[#D4AF37]/30 bg-black/40 backdrop-blur-md flex items-center gap-3 animate-reveal" style={{ animationDelay: '0.2s' }}>
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]"></span>
          <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-[0.3em]">~5 Years of Enterprise Excellence</span>
        </div>

        {/* Main Heading - User Name */}
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-4 leading-tight font-display text-gold-premium animate-reveal">
          NANDA ESWAR VIMAL BOPPUDI
        </h1>
        
        {/* Sub-heading - Stylized to match name */}
        <h2 className="text-3xl md:text-8xl font-bold tracking-tighter mb-10 leading-tight font-display text-gold-premium animate-reveal" style={{ animationDelay: '0.4s' }}>
          Software Developer
        </h2>
        
        {/* Rotating Cards System Around Profile */}
        <div className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] flex items-center justify-center mb-16 animate-reveal" style={{ animationDelay: '0.6s' }}>
          
          {/* Central Logo - Replacing the Profile Picture/NB with the custom Logo design */}
          <div className="relative z-20 w-32 h-32 md:w-64 md:h-64 flex items-center justify-center group">
            {/* Outer Rings */}
            <div className="absolute inset-0 rounded-full border border-[#D4AF37]/40 p-1 bg-black overflow-hidden shadow-[0_0_60px_rgba(212,175,55,0.2)]">
                <div className="w-full h-full rounded-full border border-[#D4AF37]/10 bg-zinc-950 flex items-center justify-center relative">
                    {/* BNE Logo Elements */}
                    <svg viewBox="0 0 200 200" className="w-[85%] h-[85%] drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                        {/* Concentric Circle in SVG for alignment */}
                        <circle cx="100" cy="100" r="95" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.3"/>
                        <circle cx="100" cy="100" r="88" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.2"/>
                        
                        {/* Cursive "BNE" Styling */}
                        <text x="50%" y="48%" dominantBaseline="middle" textAnchor="middle" 
                              style={{ 
                                fill: '#D4AF37', 
                                fontSize: '80px', 
                                fontFamily: "'Playfair Display', serif", 
                                fontStyle: 'italic',
                                fontWeight: 'bold'
                              }}>
                          BNE
                        </text>
                        
                        {/* "VIMAL" Text Styling - Updated from LUJO and Reduced Size */}
                        <text x="50%" y="71%" dominantBaseline="middle" textAnchor="middle" 
                              style={{ 
                                fill: '#D4AF37', 
                                fontSize: '13px', 
                                fontFamily: "'Inter', sans-serif", 
                                letterSpacing: '0.7em',
                                fontWeight: '900',
                                opacity: '0.9'
                              }}>
                          VIMAL
                        </text>

                        {/* Subtle cross-line (as seen in the logo) */}
                        <line x1="40" y1="60" x2="160" y2="140" stroke="#D4AF37" strokeWidth="0.5" opacity="0.1" />
                    </svg>
                </div>
            </div>
            
            {/* Interactive Glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#D4AF37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            
            {/* Animated Profile Ring */}
            <div className="absolute inset-[-10px] rounded-full border border-[#D4AF37]/10 animate-pulse opacity-20"></div>
          </div>

          {/* Background Orbit Ring */}
          <div className="absolute w-[290px] h-[290px] md:w-[540px] md:h-[540px] border border-[#D4AF37]/10 rounded-full" />

          {/* Rotating Orbit Cards */}
          {cards.map((card, idx) => (
            <PremiumOrbitCard 
              key={idx}
              name={card.name}
              delay={card.delay}
              link={card.link}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
