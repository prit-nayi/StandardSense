import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, ArrowRight, BookOpen, Award, FlaskConical, Star,
  CheckCircle, ChevronRight, Shield, Layers, FileText, Building2,
} from 'lucide-react';

const SUGGESTED = [
  'Find applicable standard for my product',
  'BIS certification guidance',
  'Find testing laboratory',
  'Hallmarking & HUID information',
];

const CAPABILITIES = [
  {
    icon: BookOpen,
    title: 'Standards Intelligence',
    description: 'Discover applicable Indian Standards from natural-language product descriptions. Understand scope, requirements and related standards.',
    color: 'text-bis-blue',
    bg: 'bg-blue-50',
  },
  {
    icon: Award,
    title: 'Certification Guidance',
    description: 'Navigate BIS certification schemes, Quality Control Orders and mandatory requirements with evidence-backed guidance.',
    color: 'text-bis-teal',
    bg: 'bg-teal-50',
  },
  {
    icon: FlaskConical,
    title: 'Testing Laboratories',
    description: 'Discover BIS-recognized and NABL-accredited laboratories by standard, location and testing capability.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
  {
    icon: Star,
    title: 'Hallmarking & Consumer',
    description: 'Understand BIS hallmarking, HUID verification and consumer protection services through simple, plain-language guidance.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
];

const HOW_IT_WORKS = [
  { step: 'Ask', desc: 'Describe your product or question in natural language', icon: Search },
  { step: 'Find', desc: 'System searches BIS knowledge base with hybrid retrieval', icon: Layers },
  { step: 'Understand', desc: 'Receive structured, plain-language guidance with context', icon: FileText },
  { step: 'Verify', desc: 'Inspect citations and supporting BIS sources', icon: CheckCircle },
  { step: 'Act', desc: 'Get practical next steps and links to BIS services', icon: ArrowRight },
];

const DEMO_QUERIES = [
  {
    query: '"I manufacture stainless steel water bottles. Which Indian Standard applies?"',
    result: 'IS 14543 + IS 15498 recommendations with certification and lab guidance',
  },
  {
    query: '"Is BIS certification mandatory for pressure cookers?"',
    result: 'QCO evidence, applicable scheme, testing requirements',
  },
  {
    query: '"What is HUID and how do I verify hallmarked gold?"',
    result: 'Hallmarking explanation, HUID details, BIS CARE app guidance',
  },
];

export default function Home() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleAsk = () => {
    if (query.trim()) {
      navigate('/chat', { state: { initialQuery: query.trim() } });
    } else {
      navigate('/chat');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAsk();
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-bis-navy via-[#1a3f6f] to-deep-navy py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-10 right-20 w-48 h-48 rounded-full bg-bis-saffron blur-3xl" />
        </div>
        <div className="page-container relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/70 text-xs font-medium mb-6">
              <Shield className="w-3.5 h-3.5 text-bis-saffron" />
              SIH 2026 — PS 26107 — Ministry of Consumer Affairs
            </div>
            <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight mb-5">
              From Questions to
              <span className="block text-bis-saffron">Evidence-Grounded BIS Guidance</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Discover Indian Standards, certification information, testing resources and BIS services through a conversational interface backed by available BIS sources.
            </p>

            {/* Search bar */}
            <div className="relative max-w-2xl mx-auto mb-5">
              <div className="flex gap-0 bg-white rounded-xl shadow-xl overflow-hidden">
                <div className="flex-1 flex items-center gap-3 px-5">
                  <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder='Ask about a product, standard or BIS service...'
                    className="flex-1 py-4 text-gray-900 placeholder-gray-400 focus:outline-none text-base"
                  />
                </div>
                <button onClick={handleAsk} className="btn-primary rounded-none rounded-r-xl px-6 m-0 text-sm">
                  Ask StandardSense
                </button>
              </div>
            </div>

            {/* Suggested chips */}
            <div className="flex flex-wrap justify-center gap-2">
              {SUGGESTED.map((s) => (
                <button
                  key={s}
                  onClick={() => navigate('/chat', { state: { initialQuery: s } })}
                  className="text-white/70 hover:text-white border border-white/20 hover:border-white/40 rounded-full px-4 py-1.5 text-sm transition-colors hover:bg-white/10"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div className="bg-white border-b border-bis-border">
        <div className="page-container py-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            {[
              'Source-backed answers',
              'Evidence citations included',
              'BIS knowledge base',
              'Unsupported queries disclosed',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-bis-teal flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What StandardSense can help with */}
      <section className="py-20 bg-bis-bg">
        <div className="page-container">
          <div className="text-center mb-12">
            <div className="section-label mb-2">Capabilities</div>
            <h2 className="text-3xl font-bold text-gray-900">What can StandardSense help with?</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              One intelligent assistant for discovering Indian Standards, understanding certification requirements, and navigating BIS services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CAPABILITIES.map((cap) => {
              const Icon = cap.icon;
              return (
                <div key={cap.title} className="card hover:shadow-md transition-shadow">
                  <div className={`w-10 h-10 ${cap.bg} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className={`w-5 h-5 ${cap.color}`} />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">{cap.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{cap.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="page-container">
          <div className="text-center mb-12">
            <div className="section-label mb-2">How it works</div>
            <h2 className="text-3xl font-bold text-gray-900">From Question to Guidance</h2>
            <p className="text-gray-500 mt-3">The complete intelligence workflow, visible to you at every step.</p>
          </div>

          <div className="flex flex-col md:flex-row items-start justify-center gap-0 max-w-4xl mx-auto">
            {HOW_IT_WORKS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="flex flex-col md:flex-row items-center flex-1">
                  <div className="flex flex-col items-center text-center px-4 flex-1">
                    <div className="w-12 h-12 bg-bis-navy rounded-xl flex items-center justify-center mb-3 shadow-md">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-sm font-bold text-bis-navy mb-1">{step.step}</div>
                    <div className="text-xs text-gray-500 leading-relaxed">{step.desc}</div>
                  </div>
                  {i < HOW_IT_WORKS.length - 1 && (
                    <ChevronRight className="hidden md:block w-5 h-5 text-gray-300 flex-shrink-0 -mx-1" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Example queries */}
      <section className="py-20 bg-bis-bg">
        <div className="page-container">
          <div className="text-center mb-12">
            <div className="section-label mb-2">Example Journeys</div>
            <h2 className="text-3xl font-bold text-gray-900">See StandardSense in Action</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {DEMO_QUERIES.map((demo, i) => (
              <button
                key={i}
                onClick={() => navigate('/chat', { state: { initialQuery: demo.query.replace(/"/g, '') } })}
                className="card text-left hover:shadow-md hover:border-bis-blue/30 transition-all group"
              >
                <div className="text-xs font-semibold text-bis-blue uppercase tracking-wide mb-2">Example Query</div>
                <p className="text-sm text-gray-800 italic mb-3 font-medium">{demo.query}</p>
                <div className="h-px bg-bis-border mb-3" />
                <div className="text-xs text-gray-500 mb-4">{demo.result}</div>
                <div className="flex items-center gap-1 text-bis-blue text-xs font-semibold group-hover:gap-2 transition-all">
                  Try this query <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Evidence trust section */}
      <section className="py-20 bg-white">
        <div className="page-container">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="section-label mb-3">Evidence & Trust</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-5">
                  Every answer is backed by sources
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  StandardSense doesn't guess. Every important answer includes citations from available BIS sources — standards, QCOs, certification schemes and official documents.
                </p>
                <div className="flex flex-col gap-4">
                  {[
                    { label: 'Source-backed', desc: 'Factual claims linked to BIS documents with page and clause references' },
                    { label: 'Transparent uncertainty', desc: 'When evidence is insufficient, the system says so rather than inventing information' },
                    { label: 'Version awareness', desc: 'Source metadata includes publication date, version and status where available' },
                  ].map((item) => (
                    <div key={item.label} className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-bis-teal mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{item.label}</div>
                        <div className="text-sm text-gray-500">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mock citation card */}
              <div className="card border-l-4 border-l-bis-teal">
                <div className="badge-source mb-3">
                  <CheckCircle className="w-3 h-3" /> Source-backed
                </div>
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                  The containers used for packaged drinking water shall be made of food-grade materials including stainless steel (grade 304 or 316). The material shall not impart any taste, odour or toxic substance to the water.
                </p>
                <div className="bg-bis-bg rounded-lg p-3 text-xs text-gray-500">
                  <div className="font-semibold text-gray-700 mb-1">Sources</div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-bis-navy text-white rounded text-[10px] font-bold flex items-center justify-center">1</span>
                      <span>IS 14543 — Clause 4.1 · Page 3</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-bis-navy text-white rounded text-[10px] font-bold flex items-center justify-center">2</span>
                      <span>IS 15498 — Clause 5.2 · Page 8</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-bis-navy text-white rounded text-[10px] font-bold flex items-center justify-center">3</span>
                      <span>Packaged Water QCO — Clause 3(1)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-bis-navy">
        <div className="page-container text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to find your Indian Standard?</h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            Ask in plain language. Get evidence-grounded BIS guidance in seconds.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => navigate('/chat')} className="btn-accent">
              Ask StandardSense
            </button>
            <button onClick={() => navigate('/standards')} className="btn-secondary">
              <Building2 className="w-4 h-4 inline mr-2" />
              Explore Standards
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
