
import React from 'react';

const Services: React.FC = () => {
  const services = [
    {
      title: "Backend Excellence",
      desc: "Robust Java & Spring Boot microservices designed for massive scalability and reliability in enterprise environments.",
      icon: "⚙️"
    },
    {
      title: "Frontend Mastery",
      desc: "Dynamic, high-performance user interfaces built with React and modern CSS, focused on seamless user journeys.",
      icon: "✨"
    },
    {
      title: "Cloud Infrastructure",
      desc: "Cloud-native solutions leveraging AWS/Azure for optimized deployment, monitoring, and global distribution.",
      icon: "☁️"
    }
  ];

  return (
    <section id="services" className="py-32 px-6 bg-black border-y border-[#D4AF37]/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-[11px] uppercase tracking-[0.6em] text-[#D4AF37] mb-6 font-bold">Domain Expertise</h2>
            <h3 className="text-4xl md:text-6xl font-light font-display leading-tight">Mastering the Full<br/><span className="italic text-[#D4AF37]">Enterprise Stack</span></h3>
          </div>
          <p className="text-gray-400 text-lg leading-relaxed max-w-lg border-l-2 border-[#D4AF37]/30 pl-8 font-light italic">
            Delivering high-performance architecture across banking, e-commerce, and healthcare with a focus on precision and digital elegance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((s, i) => (
            <div key={i} className="group p-10 bg-zinc-900/40 border border-[#D4AF37]/10 hover:border-[#D4AF37]/40 transition-all duration-700 relative overflow-hidden rounded-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-[#D4AF37]/10 transition-colors" />
              <div className="text-4xl mb-8 opacity-80 group-hover:scale-125 transition-transform duration-500 inline-block">{s.icon}</div>
              <h4 className="text-2xl font-bold mb-6 text-white group-hover:text-[#D4AF37] transition-colors font-display">{s.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed font-light">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
