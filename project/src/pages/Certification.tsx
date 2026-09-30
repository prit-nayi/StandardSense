import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Award, ChevronRight, CheckCircle, AlertTriangle, FileText,
  FlaskConical, ArrowRight, Search, MessageSquare,
} from 'lucide-react';
import { CERTIFICATION_SCHEMES, QCOS, STANDARDS } from '@/data/mockData';

const FLOW_STEPS = [
  { step: 1, label: 'Product', desc: 'Identify your product category and intended use' },
  { step: 2, label: 'Applicable Standard', desc: 'Find the relevant Indian Standard (IS number)' },
  { step: 3, label: 'QCO / Regulatory', desc: 'Check if a Quality Control Order mandates certification' },
  { step: 4, label: 'Certification Scheme', desc: 'Identify the applicable BIS certification scheme' },
  { step: 5, label: 'Testing', desc: 'Get product tested at a BIS-recognized laboratory' },
  { step: 6, label: 'Apply to BIS', desc: 'Submit application via manakonline.in' },
];

export default function Certification() {
  const [productDesc, setProductDesc] = useState('');
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<typeof STANDARDS | null>(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!productDesc.trim()) return;
    setSearching(true);
    await new Promise(r => setTimeout(r, 1200));
    const lower = productDesc.toLowerCase();
    const found = STANDARDS.filter(s =>
      s.certification_required &&
      (s.title.toLowerCase().includes(lower) ||
        s.product_category.toLowerCase().includes(lower) ||
        s.sector.toLowerCase().includes(lower) ||
        lower.includes('water') || lower.includes('steel') || lower.includes('bottle'))
    );
    setResults(found.slice(0, 3));
    setSearching(false);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-bis-navy py-12">
        <div className="page-container">
          <div className="section-label text-white/50 mb-2">BIS Services</div>
          <h1 className="text-white text-3xl font-bold mb-3">Certification Guidance</h1>
          <p className="text-white/60 max-w-xl">
            Navigate BIS certification requirements, schemes and processes. This is informational guidance based on available BIS sources — not a certification application system.
          </p>
        </div>
      </div>

      <div className="page-container py-10 space-y-10">
        {/* Product → Standard finder */}
        <div className="card max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
            <Search className="w-4 h-4" /> Product Certification Check
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Enter a product description to find potentially relevant certified standards and applicable schemes.
          </p>
          <div className="flex gap-3">
            <input
              type="text"
              value={productDesc}
              onChange={e => setProductDesc(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              placeholder="e.g. stainless steel water bottle, pressure cooker..."
              className="input-field flex-1"
            />
            <button
              onClick={handleSearch}
              disabled={searching || !productDesc.trim()}
              className="btn-primary flex items-center gap-2 whitespace-nowrap"
            >
              {searching ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Checking...</>
              ) : (
                <><Search className="w-4 h-4" /> Check</>
              )}
            </button>
          </div>

          {results && (
            <div className="mt-5 animate-fade-in">
              {results.length > 0 ? (
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Standards with certification requirements found:
                  </div>
                  {results.map(s => {
                    const qco = QCOS.find(q => q.standard_id === s.id);
                    return (
                      <div key={s.id} className="border border-bis-border rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-bis-teal flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-bold text-bis-blue">{s.is_number}</span>
                              {qco && (
                                <span className="text-[10px] bg-red-50 text-red-700 border border-red-200 px-1.5 py-0.5 rounded-full font-semibold">
                                  {qco.status}
                                </span>
                              )}
                            </div>
                            <div className="text-sm font-medium text-gray-900 mb-1">{s.title}</div>
                            {s.certification_scheme && (
                              <div className="text-xs text-gray-500">Scheme: {s.certification_scheme}</div>
                            )}
                          </div>
                          <button
                            onClick={() => navigate(`/standards/${s.id}?tab=certification`)}
                            className="text-xs font-semibold text-bis-blue hover:text-bis-navy flex items-center gap-1 transition-colors"
                          >
                            Details <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <div className="text-sm text-amber-800">
                    No specific certification requirements found for this product in the available sources. This may mean certification is voluntary, or the product is not yet in this prototype's knowledge base.
                    <div className="mt-2">
                      <button onClick={() => navigate('/chat', { state: { initialQuery: `Is BIS certification required for ${productDesc}?` } })}
                        className="text-bis-blue hover:text-bis-navy font-medium flex items-center gap-1 transition-colors">
                        Ask StandardSense for guidance <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Certification flow */}
        <div>
          <div className="section-label mb-2">Certification Process</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How BIS Certification Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FLOW_STEPS.map((step, i) => (
              <div key={step.step} className="card relative">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-bis-navy text-white rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {step.step}
                  </div>
                  <div className="h-px flex-1 bg-bis-border" />
                  {i < FLOW_STEPS.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
                  )}
                </div>
                <div className="text-sm font-semibold text-gray-900 mb-1">{step.label}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Certification schemes */}
        <div>
          <div className="section-label mb-2">BIS Schemes</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">BIS Certification Schemes</h2>
          <div className="space-y-5">
            {CERTIFICATION_SCHEMES.map(scheme => (
              <div key={scheme.id} className="card">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-bis-blue" />
                  </div>
                  <div>
                    <div className="text-base font-semibold text-gray-900 mb-1">{scheme.name}</div>
                    <div className="text-xs bg-bis-bg border border-bis-border text-gray-600 px-2 py-0.5 rounded-full inline-block">{scheme.scheme_type}</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{scheme.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Applicable Products</div>
                    <div className="flex flex-wrap gap-1.5">
                      {scheme.applicable_products.map(p => (
                        <span key={p} className="text-[11px] bg-bis-bg border border-bis-border px-2 py-0.5 rounded-full text-gray-600">{p}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Key Requirements</div>
                    <ul className="space-y-1">
                      {scheme.requirements.slice(0, 3).map((req, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                          <CheckCircle className="w-3 h-3 text-bis-teal flex-shrink-0 mt-0.5" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QCO list */}
        <div>
          <div className="section-label mb-2">Regulatory Orders</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quality Control Orders (QCOs)</h2>
          <div className="space-y-4">
            {QCOS.map(qco => (
              <div key={qco.id} className="card border-l-4 border-l-red-400">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span className="text-sm font-semibold text-gray-900">{qco.title}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
                        {qco.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">{qco.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><FileText className="w-3 h-3" />{qco.notification_number}</span>
                      <span>Effective: {qco.effective_date}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/standards/${qco.standard_id}`)}
                    className="btn-secondary text-xs whitespace-nowrap"
                  >
                    View Standard
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="card bg-blue-50 border-blue-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <MessageSquare className="w-5 h-5 text-bis-blue flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-bis-navy mb-1">Need guidance for your specific product?</div>
              <div className="text-sm text-gray-600">Ask StandardSense with your product description and get tailored certification guidance with supporting BIS sources.</div>
            </div>
          </div>
          <button
            onClick={() => navigate('/chat')}
            className="btn-primary flex items-center gap-2 whitespace-nowrap"
          >
            Ask StandardSense <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
