import React, { useState } from 'react';

interface NavbarProps {
  scrolled: boolean;
}

interface SubItem {
  title: string;
  desc: string;
  icon: React.ReactNode;
  href: string;
}

interface NavItem {
  name: string;
  href: string;
  items: SubItem[];
}

const Icons = {
  LinkedIn: () => (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
  ),
  Instagram: () => (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.56.216.96.474 1.38.894.42.42.678.82.894 1.38.164.422.36.1057.413 2.227.057 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.413 2.227-.216.56-.474.96-.894 1.38-.42.42-.82.678-1.38.894-.422.164-1.057.36-2.227.413-1.266.057-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.412-.56-.216-.96-.474-1.38-.894-.42-.42-.678-.82-.894-1.38-.164-.422-.36-1.057-.413-2.227-.057-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.249-1.805.412-2.227.216-.56.474-.96.894-1.38.42-.42.82-.678 1.38-.894.422-.164 1.057-.36 2.227-.413 1.266-.057 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.28.058-2.152.26-2.917.557-.79.307-1.46.717-2.127 1.384-.667.667-1.077 1.337-1.384 2.127-.297.765-.499 1.637-.557 2.917-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.058 1.28.26 2.152.557 2.917.307.79.717 1.46 1.384 2.127.667.667 1.337 1.077 2.127 1.384.765.297 1.637.499 2.917.557 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.28-.058 2.152-.26 2.917-.557.79-.307 1.46-.717 2.127-1.384.667-.667 1.077-1.337 1.384-2.127.297-.765.499-1.637.557-2.917.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.058-1.28-.26-2.152-.557-2.917-.307-.79-.717-1.46-1.384-2.127-.667-.667-1.337-1.077-2.127-1.384-.765-.297-1.637-.499-2.917-.557-1.28-.058-1.688-.072-4.947-.072zM12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
  ),
  GitHub: () => (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
  ),
  Gmail: () => (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
  ),
  Web: () => (
    <svg className="w-5 h-5 fill-none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="2" y1="8" x2="22" y2="8" />
      <polyline points="7 12 5 14 7 16" />
      <polyline points="17 12 19 14 17 16" />
    </svg>
  ),
  App: () => (
    <svg className="w-5 h-5 fill-none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <path d="M12 18h.01" />
      <rect x="9" y="6" width="6" height="6" rx="1" />
    </svg>
  ),
  Marketing: () => (
    <svg className="w-5 h-5 fill-none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 15h2a2 2 0 1 0 0-4h-3c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h10" />
      <path d="M11 5v3" />
      <path d="M11 11v3" />
      <path d="M3 11l18-8v16l-18-8z" />
      <line x1="3" y1="11" x2="3" y2="16" />
    </svg>
  ),
  Design: () => (
    <svg className="w-5 h-5 fill-none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 9c0 0 3-3 6-3s6 3 6 3" />
    </svg>
  ),
  Card: () => (
    <svg className="w-5 h-5 fill-none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
      <rect x="5" y="13" width="4" height="3" rx="1" fill="currentColor" fillOpacity="0.3" />
    </svg>
  ),
  Building: () => (
    <svg className="w-5 h-5 fill-none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="22" x2="9" y2="2"/><line x1="15" y1="22" x2="15" y2="2"/><line x1="4" y1="6" x2="20" y2="6"/></svg>
  ),
  Cart: () => (
    <svg className="w-5 h-5 fill-none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
  ),
  Location: () => (
    <svg className="w-5 h-5 fill-none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
  ),
  Phone: () => (
    <svg className="w-5 h-5 fill-none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.81 12.81 0 0 0 .62 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6"/></svg>
  )
};

const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navData: NavItem[] = [
    {
      name: 'PROJECTS / PROYECTOS',
      href: '#portfolio',
      items: [
        { title: 'The Saloon Expo', desc: 'Enterprise business solution.', icon: <Icons.Building />, href: 'https://tinyurl.com/TheSaloonExpo' },
        { title: 'Veritusoft', desc: 'Digital innovation hub.', icon: <Icons.Cart />, href: 'https://bnevimal3.github.io/veritusoft/' },
      ]
    },
    {
      name: 'SERVICES / SERVICIOS',
      href: '#services',
      items: [
        { title: 'Websites / Sitios Web', desc: 'High-performance digital presence.', icon: <Icons.Web />, href: '#services' },
        { title: 'APPS / Aplicaciones', desc: 'Scalable native & web applications.', icon: <Icons.App />, href: '#services' },
        { title: 'Marketing / Mercadeo', desc: 'Social platform growth strategies.', icon: <Icons.Marketing />, href: '#services' },
        { title: 'Flyers / Volantes', desc: 'Exceptional promotional design.', icon: <Icons.Design />, href: '#services' },
        { title: 'Cards / Tarjetas', desc: 'Premium executive business cards.', icon: <Icons.Card />, href: '#services' },
      ]
    },
    {
      name: 'PORTFOLIO / PORTAFOLIO',
      href: '#portfolio',
      items: [
        { title: 'English / Inglés', desc: 'Professional archive (EN).', icon: <span className="font-bold text-[10px]">EN</span>, href: 'https://tiny.cc/bnevimal' },
        { title: 'Spanish / Español', desc: 'Archivo profesional (ES).', icon: <span className="font-bold text-[10px]">ES</span>, href: 'https://tiny.cc/vimalbne' },
      ]
    },
    {
      name: 'SOCIAL / REDES',
      href: '#contact',
      items: [
        { title: 'LinkedIn', desc: 'Professional connections.', icon: <Icons.LinkedIn />, href: 'https://www.linkedin.com/in/vimal-boppudi-261905164/' },
        { title: 'Instagram', desc: 'Creative visual work.', icon: <Icons.Instagram />, href: 'https://www.instagram.com/nanda_boopudi/' },
        { title: 'GitHub', desc: 'Engineering source code.', icon: <Icons.GitHub />, href: 'https://github.com/bnevimal3' },
        { title: 'Gmail', desc: 'Direct inquiry.', icon: <Icons.Gmail />, href: 'mailto:boppudivimal@gmail.com' },
      ]
    },
    {
      name: 'CONTACT / CONTACTO',
      href: '#contact',
      items: [
        { title: 'Phone / Teléfono', desc: '201 589 8838', icon: <Icons.Phone />, href: 'tel:2015898838' },
        { title: 'Location / Ubicación', desc: 'Jersey City, New Jersey', icon: <Icons.Location />, href: '#contact' },
        { title: 'Gmail', desc: 'boppudivimal@gmail.com', icon: <Icons.Gmail />, href: 'mailto:boppudivimal@gmail.com' },
      ]
    }
  ];

  const handleMouseEnter = (name: string) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setActiveMenu(name);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => setActiveMenu(null), 250);
    setHoverTimeout(timeout);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
        scrolled ? 'bg-black/95 backdrop-blur-2xl py-4 border-b border-[#D4AF37]/20 shadow-2xl' : 'bg-transparent py-8'
      }`}
      onMouseLeave={handleMouseLeave}
    >
      <style>{`
        @keyframes menuReveal {
          from { opacity: 0; transform: translate(-50%, 15px) scale(0.98); }
          to { opacity: 1; transform: translate(-50%, 0) scale(1); }
        }
        .animate-menu-reveal {
          animation: menuReveal 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .text-gold-gradient {
          background: linear-gradient(to right, #BF953F, #FCF6BA, #B38728);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .nav-link {
          position: relative;
          transition: color 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background: #D4AF37;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after, .nav-link-active::after {
          width: 100%;
        }
      `}</style>

      {/* Reduced horizontal padding to move logo further left */}
      <div className="max-w-7xl mx-auto px-4 md:px-4 flex items-center justify-between relative">
        <div className="flex items-center gap-2 group cursor-pointer z-[110]" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <span className="text-xl md:text-2xl font-bold tracking-tighter text-gold-gradient font-display uppercase italic transition-transform duration-500 group-hover:scale-105">
            NANDA ESWAR
          </span>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-white z-[110] p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
             <svg className="w-6 h-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 text-[9px] font-black uppercase tracking-[0.25em] text-gray-500">
          {navData.map((link) => (
            <div 
              key={link.name} 
              className="relative py-2"
              onMouseEnter={() => handleMouseEnter(link.name)}
            >
              <a 
                href={link.href}
                className={`nav-link ${activeMenu === link.name ? 'text-white nav-link-active' : 'hover:text-white'}`}
              >
                {link.name}
              </a>
            </div>
          ))}
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-black/95 backdrop-blur-3xl z-[100] transition-all duration-500 lg:hidden flex flex-col pt-24 px-6 overflow-y-auto ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          {navData.map((category) => (
            <div key={category.name} className="mb-8">
              <h3 className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.2em] mb-4 border-b border-[#D4AF37]/20 pb-2">
                {category.name}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {category.items.map((item) => (
                  <a 
                    key={item.title}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    target={item.href.startsWith('http') ? "_blank" : undefined}
                    rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-[#D4AF37]/10 border border-transparent hover:border-[#D4AF37]/30 transition-all"
                  >
                    <div className="text-[#D4AF37] opacity-80">{item.icon}</div>
                    <div>
                      <div className="text-white text-sm font-bold">{item.title}</div>
                      <div className="text-gray-500 text-[10px]">{item.desc}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Keeping spacing on the right balanced since button was removed */}
        <div className="w-10 lg:block hidden"></div>

        {activeMenu && (
          <div 
            className="absolute top-full left-1/2 -translate-x-1/2 w-[700px] mt-6 p-[1px] bg-gradient-to-b from-[#D4AF37]/40 to-transparent rounded-3xl animate-menu-reveal shadow-[0_30px_60px_rgba(0,0,0,0.9)]"
            onMouseEnter={() => { if (hoverTimeout) clearTimeout(hoverTimeout); }}
          >
            <div className="flex bg-zinc-950 rounded-[calc(1.5rem-1px)] overflow-hidden border border-white/5">
              <div className="w-[30%] bg-zinc-900/50 p-8 border-r border-white/5 flex flex-col justify-between">
                <div>
                  <h4 className="text-[9px] uppercase tracking-[0.4em] text-[#D4AF37] font-black mb-2">{activeMenu}</h4>
                  <p className="text-[10px] text-gray-500 font-medium leading-relaxed italic">
                    Architecting digital futures across languages and regions.
                  </p>
                </div>
                <div className="pt-6 border-t border-white/5">
                  <div className="flex items-center gap-2 text-[#D4AF37]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
                    <span className="text-[8px] uppercase tracking-[0.2em] font-bold opacity-70">Global Standards</span>
                  </div>
                </div>
              </div>

              <div className="w-[70%] p-8">
                <div className="grid grid-cols-1 gap-4">
                  {navData.find(n => n.name === activeMenu)?.items.map((item) => (
                    <a 
                      key={item.title}
                      href={item.href}
                      target={item.href.startsWith('http') ? "_blank" : undefined}
                      rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-4 p-3 rounded-xl hover:bg-[#D4AF37]/5 transition-all duration-300 border border-transparent hover:border-[#D4AF37]/20"
                    >
                      <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center text-[#D4AF37] transition-transform group-hover:scale-110 group-hover:bg-[#D4AF37]/10">
                        {item.icon}
                      </div>
                      <div>
                        <h6 className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wide group-hover:brightness-125 transition-all">
                          {item.title}
                        </h6>
                        <p className="text-[9px] text-[#D4AF37]/60 font-medium tracking-tight line-clamp-1 italic">
                          {item.desc}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;