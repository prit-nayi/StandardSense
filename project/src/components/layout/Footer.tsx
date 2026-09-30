import { Link } from 'react-router-dom';
import { Shield, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-deep-navy text-white/60 mt-auto">
      <div className="page-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-bis-saffron" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">StandardSense</div>
                <div className="text-white/40 text-xs">Standards & BIS Services Intelligence</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              An evidence-grounded AI intelligence layer over authorized BIS information, helping industries and consumers discover Indian Standards and navigate BIS services.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
              SIH 2026 — Problem Statement 26107
            </div>
          </div>

          <div>
            <div className="text-white text-sm font-semibold mb-4">Navigation</div>
            <div className="flex flex-col gap-2 text-sm">
              {[
                { label: 'AI Assistant', path: '/chat' },
                { label: 'Standards Explorer', path: '/standards' },
                { label: 'Certification', path: '/certification' },
                { label: 'Laboratories', path: '/laboratories' },
                { label: 'Hallmarking', path: '/hallmarking' },
                { label: 'About', path: '/about' },
              ].map((link) => (
                <Link key={link.path} to={link.path} className="hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-white text-sm font-semibold mb-4">Official BIS Resources</div>
            <div className="flex flex-col gap-2 text-sm">
              {[
                { label: 'BIS Official Portal', url: 'https://www.bis.gov.in' },
                { label: 'Know Your Standard', url: 'https://www.bis.gov.in' },
                { label: 'BIS CARE App', url: 'https://www.bis.gov.in' },
                { label: 'Online Certification', url: 'https://manakonline.in' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  {link.label}
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
          <p>
            StandardSense provides guidance based on available authorized BIS information. This is not an official BIS product.
            Always verify with{' '}
            <a href="https://www.bis.gov.in" target="_blank" rel="noopener noreferrer" className="text-bis-saffron hover:text-amber-400 transition-colors">
              bis.gov.in
            </a>{' '}
            for authoritative information.
          </p>
          <p className="whitespace-nowrap">Prototype — SIH 2026</p>
        </div>
      </div>
    </footer>
  );
}
