import React from 'react';

const Portfolio: React.FC = () => {
  const projects = [
    { 
      name: "Fintech Core", 
      category: "Microservices Architecture", 
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800" // Technological nodes/Circuitry for Microservices
    },
    { 
      name: "HealthSync", 
      category: "Cloud-Native Platform", 
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800" // Global data network for Cloud-Native
    },
    { 
      name: "RetailFlow", 
      category: "Full Stack Solution", 
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800" // Code and UI for Full Stack
    },
    { 
      name: "Global Ledger", 
      category: "Banking Infrastructure", 
      img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800" // Secure digital ledger/Blockchain for Banking
    }
  ];

  return (
    <section id="portfolio" className="py-20 md:py-32 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 text-center md:text-left">
          <h2 className="text-[11px] uppercase tracking-[0.6em] text-[#D4AF37] mb-6 font-bold">Curated Case Studies</h2>
          <h3 className="text-4xl md:text-6xl font-light font-display">Crafting <span className="text-[#D4AF37] italic">Digital Excellence</span></h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {projects.map((p, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative aspect-[16/10] overflow-hidden mb-8 bg-zinc-900 border border-[#D4AF37]/10 rounded-3xl">
                <img 
                  src={p.img} 
                  alt={p.name} 
                  className="w-full h-full object-cover opacity-60 transition-all duration-1000 group-hover:scale-110 group-hover:opacity-100 grayscale-[50%] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
                   <div className="bg-[#D4AF37] text-black px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-full transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700 shadow-2xl">
                     Discover Depth
                   </div>
                </div>
              </div>
              <h4 className="text-2xl font-bold mb-2 text-white font-display group-hover:text-[#D4AF37] transition-colors">{p.name}</h4>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37]/60 font-black">{p.category}</p>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
           <button className="border-b-2 border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all pb-2 text-xs font-black uppercase tracking-[0.3em] text-white hover:text-[#D4AF37]">
             Full Portfolio
           </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;