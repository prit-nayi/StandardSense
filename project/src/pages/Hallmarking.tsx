import { useNavigate } from 'react-router-dom';
import {
  Star, CheckCircle, Shield, Search, ExternalLink, ArrowRight,
  Info, AlertTriangle, MessageSquare,
} from 'lucide-react';
import { HALLMARKING_INFO } from '@/data/mockData';

const PURITY_GRADES = [
  { grade: '999', carat: '24 Carat', purity: '99.9%', desc: 'Highest purity, typically for investments' },
  { grade: '958', carat: '23 Carat', purity: '95.8%', desc: 'Very high purity jewellery' },
  { grade: '916', carat: '22 Carat', purity: '91.6%', desc: 'Most common for Indian jewellery' },
  { grade: '875', carat: '21 Carat', purity: '87.5%', desc: 'High purity jewellery' },
  { grade: '750', carat: '18 Carat', purity: '75.0%', desc: 'International standard for fine jewellery' },
  { grade: '585', carat: '14 Carat', purity: '58.5%', desc: 'Common in Western markets' },
];

export default function Hallmarking() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-bis-navy py-12">
        <div className="page-container">
          <div className="section-label text-white/50 mb-2">BIS Services</div>
          <h1 className="text-white text-3xl font-bold mb-3">Hallmarking & HUID</h1>
          <p className="text-white/60 max-w-xl">
            Understand BIS hallmarking, HUID verification and consumer guidance based on available BIS information.
          </p>
        </div>
      </div>

      <div className="page-container py-10 space-y-10">
        {/* Mandatory notice */}
        <div className="card border-l-4 border-l-amber-500 bg-amber-50">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-amber-900 mb-1">Hallmarking is Mandatory</div>
              <div className="text-sm text-amber-800 leading-relaxed">{HALLMARKING_INFO.mandatory}</div>
            </div>
          </div>
        </div>

        {/* What is hallmarking */}
        <div className="card">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
            <Star className="w-4 h-4" /> What is Hallmarking?
          </div>
          <p className="text-gray-700 leading-relaxed">{HALLMARKING_INFO.overview}</p>
        </div>

        {/* HUID */}
        <div>
          <div className="section-label mb-2">HUID</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Hallmark Unique ID (HUID)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <div className="text-sm font-semibold text-gray-900 mb-2">{HALLMARKING_INFO.huid.title}</div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">{HALLMARKING_INFO.huid.description}</p>
              <ul className="space-y-2">
                {HALLMARKING_INFO.huid.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-bis-teal flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            {/* HUID example */}
            <div className="card bg-bis-bg flex flex-col items-center justify-center text-center py-8">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Example HUID</div>
              <div className="font-mono text-3xl font-bold text-bis-navy tracking-[0.2em] mb-4 bg-white border border-bis-border rounded-xl px-6 py-4 shadow-sm">
                AZ4F1B
              </div>
              <div className="text-xs text-gray-500 mb-5">6-character alphanumeric code unique to each piece</div>
              <div className="text-xs text-gray-500 max-w-xs">
                This code is engraved on each hallmarked jewellery piece and can be verified on the BIS CARE app or portal.
              </div>
            </div>
          </div>
        </div>

        {/* BIS Hallmark components */}
        <div>
          <div className="section-label mb-2">BIS Mark</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Components of the BIS Hallmark</h2>
          <div className="card">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {HALLMARKING_INFO.bis_mark.components.map((component, i) => (
                <div key={i} className="text-center p-4 bg-bis-bg rounded-xl">
                  <div className="w-10 h-10 bg-bis-navy rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-xs font-medium text-gray-700 leading-snug">{component}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Purity grades */}
        <div>
          <div className="section-label mb-2">Purity</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Gold Purity Grades</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {PURITY_GRADES.map(g => (
              <div key={g.grade} className="card text-center py-5">
                <div className="text-2xl font-bold text-bis-saffron mb-1">{g.grade}</div>
                <div className="text-sm font-semibold text-gray-900 mb-0.5">{g.carat}</div>
                <div className="text-xs text-bis-teal font-medium mb-2">{g.purity} pure gold</div>
                <div className="text-xs text-gray-500 leading-relaxed">{g.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Consumer guidance */}
        <div>
          <div className="section-label mb-2">Consumer Guidance</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What Consumers Should Know</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {HALLMARKING_INFO.consumer_guidance.map((tip, i) => (
              <div key={i} className="card flex items-start gap-3">
                <div className="w-7 h-7 bg-bis-navy text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {i + 1}
                </div>
                <div className="text-sm text-gray-700 leading-relaxed">{tip}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Verification */}
        <div className="card border-bis-teal border-l-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
            <Search className="w-4 h-4" /> HUID Verification
          </div>
          <p className="text-sm text-gray-700 mb-4 leading-relaxed">
            BIS provides consumer-facing verification tools to check HUID authenticity. Live verification is available through:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-bis-bg border border-bis-border rounded-lg p-4">
              <div className="text-sm font-semibold text-gray-900 mb-1">BIS CARE Mobile App</div>
              <div className="text-xs text-gray-500 mb-3">Available on Android and iOS. Scan hallmark or enter HUID to verify jewellery.</div>
              <div className="flex items-center gap-1 text-xs text-bis-blue font-medium">
                <Info className="w-3.5 h-3.5" /> Available on official app stores
              </div>
            </div>
            <div className="bg-bis-bg border border-bis-border rounded-lg p-4">
              <div className="text-sm font-semibold text-gray-900 mb-1">BIS Portal</div>
              <div className="text-xs text-gray-500 mb-3">Verify HUID online through the BIS consumer portal at bis.gov.in.</div>
              <a
                href="https://www.bis.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-bis-blue font-medium hover:text-bis-navy transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Visit BIS Portal
              </a>
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-500 bg-amber-50 border border-amber-200 rounded-lg p-3">
            <strong>Note:</strong> Live HUID verification requires the official BIS service. This prototype shows informational guidance only — it does not perform live verification.
          </div>
        </div>

        {/* AI assistant */}
        <div className="card bg-blue-50 border-blue-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <MessageSquare className="w-5 h-5 text-bis-blue flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-bis-navy mb-1">Have a specific hallmarking question?</div>
              <div className="text-sm text-gray-600">Ask StandardSense in plain language — about hallmarking, HUID, purity grades or BIS consumer services.</div>
            </div>
          </div>
          <button
            onClick={() => navigate('/chat', { state: { initialQuery: 'How do I verify HUID on my gold jewellery?' } })}
            className="btn-primary flex items-center gap-2 whitespace-nowrap"
          >
            Ask StandardSense <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
