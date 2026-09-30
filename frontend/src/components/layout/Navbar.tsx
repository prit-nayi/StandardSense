import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, ChevronDown } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Ask StandardSense', path: '/chat' },
  { label: 'Standards', path: '/standards' },
  { label: 'Certification', path: '/certification' },
  { label: 'Laboratories', path: '/laboratories' },
  { label: 'Hallmarking', path: '/hallmarking' },
  { label: 'About', path: '/about' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');
  const location = useLocation();

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <nav className="bg-bis-navy sticky top-0 z-50 shadow-md">
      <div className="page-container">
        <div className="flex items-center justify-between h-[68px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <Shield className="w-5 h-5 text-bis-saffron" />
            </div>
            <div>
              <div className="text-white font-bold text-base leading-none">StandardSense</div>
              <div className="text-white/50 text-[10px] leading-none mt-0.5 tracking-wide">Standards & BIS Services Intelligence</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-white/15 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === 'EN' ? 'HI' : 'EN')}
              className="hidden sm:flex items-center gap-1 text-white/70 hover:text-white text-xs font-medium border border-white/20 rounded-lg px-2.5 py-1.5 hover:bg-white/10 transition-colors"
            >
              {lang} <ChevronDown className="w-3 h-3" />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-deep-navy">
          <div className="page-container py-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-white/15 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
