import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, CheckCircle, AlertCircle, ExternalLink, BookOpen,
  FlaskConical, Award, Link2, FileText, ChevronRight, MessageSquare,
} from 'lucide-react';
import { STANDARDS, QCOS, LABORATORIES } from '@/data/mockData';

const TABS = ['Overview', 'Certification', 'Testing', 'Related', 'Sources'] as const;
type Tab = typeof TABS[number];

export default function StandardDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('Overview');

  const standard = STANDARDS.find(s => s.id === id);

  if (!standard) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-200 mb-4">404</div>
          <div className="text-gray-700 font-semibold mb-2">Standard not found</div>
          <button onClick={() => navigate('/standards')} className="btn-primary mt-4">Back to Standards</button>
        </div>
      </div>
    );
  }

  const relatedQco = QCOS.find(q => q.standard_id === standard.id);
  const relatedLabs = LABORATORIES.filter(l => l.standards.includes(standard.is_number));
  const relatedStandards = STANDARDS.filter(s => standard.related_standards.includes(s.is_number));

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-bis-navy py-10">
        <div className="page-container">
          <button
            onClick={() => navigate('/standards')}
            className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Standards
          </button>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-bis-saffron font-bold text-xl">{standard.is_number}</div>
                <span className={standard.status === 'ACTIVE' ? 'badge-active' : 'badge-superseded'}>
                  {standard.status === 'ACTIVE' ? <CheckCircle className="w-3 h-3 inline mr-1" /> : <AlertCircle className="w-3 h-3 inline mr-1" />}
                  {standard.status}
                </span>
                {relatedQco && (
                  <span className="text-[11px] text-red-200 bg-red-900/40 border border-red-700/30 px-2 py-0.5 rounded-full font-medium">
                    QCO Applicable
                  </span>
                )}
              </div>
              <h1 className="text-white text-2xl font-bold leading-snug mb-3">{standard.title}</h1>
              <div className="flex items-center gap-4 text-white/50 text-sm">
                <span>{standard.sector}</span>
                <span>·</span>
                <span>{standard.product_category}</span>
                <span>·</span>
                <span>{standard.year}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/chat', { state: { initialQuery: `Tell me about ${standard.is_number} and its certification requirements` } })}
                className="flex items-center gap-2 text-sm font-semibold text-white border border-white/30 rounded-lg px-4 py-2.5 hover:bg-white/10 transition-colors"
              >
                <MessageSquare className="w-4 h-4" /> Ask about this
              </button>
              {standard.source_url && (
                <a
                  href={standard.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-semibold text-bis-navy bg-white rounded-lg px-4 py-2.5 hover:bg-gray-50 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" /> BIS Portal
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-bis-border sticky top-[68px] z-10">
        <div className="page-container">
          <div className="flex gap-0 overflow-x-auto">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
                  activeTab === tab
                    ? 'border-bis-navy text-bis-navy'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="page-container py-8">
        <div className="max-w-4xl">
          {activeTab === 'Overview' && (
            <div className="space-y-6">
              <div className="card">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  <BookOpen className="w-4 h-4" /> Scope
                </div>
                <p className="text-gray-700 leading-relaxed">{standard.scope}</p>
              </div>
              <div className="card">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  <FileText className="w-4 h-4" /> Description
                </div>
                <p className="text-gray-700 leading-relaxed">{standard.description}</p>
              </div>
              <div className="card">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
                  <CheckCircle className="w-4 h-4" /> Key Requirements
                </div>
                <ul className="space-y-2">
                  {standard.key_requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                      <ChevronRight className="w-4 h-4 text-bis-blue flex-shrink-0 mt-0.5" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Quick stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Year Published', value: standard.year },
                  { label: 'Status', value: standard.status },
                  { label: 'BIS Certification', value: standard.certification_required ? 'Required' : 'Not mandatory' },
                  { label: 'QCO Applicable', value: standard.qco_applicable ? 'Yes' : 'No' },
                ].map(stat => (
                  <div key={stat.label} className="card py-4 text-center">
                    <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">{stat.label}</div>
                    <div className={`text-sm font-semibold ${
                      stat.value === 'Required' || stat.value === 'Yes' ? 'text-amber-700' :
                      stat.value === 'ACTIVE' ? 'text-green-700' : 'text-gray-700'
                    }`}>{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Certification' && (
            <div className="space-y-6">
              {relatedQco ? (
                <div className="card border-l-4 border-l-amber-500">
                  <div className="flex items-start gap-3 mb-4">
                    <Award className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">{relatedQco.title}</div>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
                        {relatedQco.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">{relatedQco.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Notification No.</div>
                      <div className="font-mono text-gray-700">{relatedQco.notification_number}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Effective Date</div>
                      <div className="text-gray-700">{relatedQco.effective_date}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card bg-gray-50 text-center py-8">
                  <div className="text-gray-400 mb-2">No mandatory QCO found in available sources</div>
                  <div className="text-sm text-gray-500">Certification may be voluntary. Verify with BIS for authoritative information.</div>
                </div>
              )}
              {standard.certification_scheme && (
                <div className="card">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Applicable Certification Scheme</div>
                  <div className="text-sm font-semibold text-bis-navy">{standard.certification_scheme}</div>
                  <button
                    onClick={() => navigate('/certification')}
                    className="mt-3 text-sm text-bis-blue hover:text-bis-navy font-medium flex items-center gap-1 transition-colors"
                  >
                    View certification guidance <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'Testing' && (
            <div className="space-y-6">
              {standard.testing_parameters && (
                <div className="card">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
                    <FlaskConical className="w-4 h-4" /> Testing Parameters
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {standard.testing_parameters.map((param, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 bg-bis-blue rounded-full flex-shrink-0" />
                        {param}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <div className="text-sm font-semibold text-gray-700 mb-3">
                  BIS-Recognized Laboratories for {standard.is_number} ({relatedLabs.length} found)
                </div>
                {relatedLabs.length > 0 ? (
                  <div className="space-y-3">
                    {relatedLabs.map(lab => (
                      <div key={lab.id} className="card py-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="text-sm font-semibold text-gray-900 mb-1">{lab.name}</div>
                            <div className="text-xs text-gray-500">{lab.city}, {lab.state}</div>
                          </div>
                          <span className="text-[11px] bg-blue-50 text-bis-blue px-2 py-0.5 rounded-full border border-blue-200 font-medium whitespace-nowrap">
                            {lab.type}
                          </span>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => navigate('/laboratories')}
                      className="w-full btn-secondary flex items-center justify-center gap-2"
                    >
                      View all laboratories <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="card bg-gray-50 text-center py-6 text-sm text-gray-500">
                    No lab data in current prototype database. Visit bis.gov.in for lab listings.
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'Related' && (
            <div className="space-y-4">
              {relatedStandards.length > 0 ? (
                relatedStandards.map(s => (
                  <div
                    key={s.id}
                    className="card hover:shadow-md cursor-pointer transition-all group"
                    onClick={() => navigate(`/standards/${s.id}`)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-xs font-bold text-bis-blue">{s.is_number}</div>
                        <div className="text-sm font-medium text-gray-900 mt-1 group-hover:text-bis-navy transition-colors">{s.title}</div>
                        <div className="text-xs text-gray-500 mt-1">{s.sector} · {s.year}</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-bis-blue transition-colors flex-shrink-0" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="card bg-gray-50 text-center py-8 text-gray-500 text-sm">
                  No related standards found in the current knowledge base.
                </div>
              )}
            </div>
          )}

          {activeTab === 'Sources' && (
            <div className="space-y-4">
              <div className="card">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
                  <Link2 className="w-4 h-4" /> Source Information
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-bis-border">
                    <span className="text-gray-500">Standard Number</span>
                    <span className="font-semibold text-gray-900">{standard.is_number}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-bis-border">
                    <span className="text-gray-500">Publication Year</span>
                    <span className="font-semibold text-gray-900">{standard.year}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-bis-border">
                    <span className="text-gray-500">Status</span>
                    <span className="font-semibold text-gray-900">{standard.status}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-bis-border">
                    <span className="text-gray-500">Source Authority</span>
                    <span className="font-semibold text-gray-900">Bureau of Indian Standards</span>
                  </div>
                </div>
              </div>
              <div className="card bg-amber-50 border-amber-200">
                <div className="text-sm text-amber-800 leading-relaxed">
                  <strong>Disclaimer:</strong> This information is provided from the available BIS knowledge base for guidance purposes. The information shown is prototype/demonstration data. Always refer to the official BIS portal at{' '}
                  <a href="https://www.bis.gov.in" target="_blank" rel="noopener noreferrer" className="underline font-medium">bis.gov.in</a>
                  {' '}for authoritative standard information.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
