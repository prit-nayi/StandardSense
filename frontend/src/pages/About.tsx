import { useNavigate } from 'react-router-dom';
import {
  Shield, CheckCircle, Layers, ArrowRight, ExternalLink,
  BookOpen, Award, FlaskConical, Star, MessageSquare,
} from 'lucide-react';

const ARCHITECTURE_STEPS = [
  { label: 'Natural Language Query', icon: MessageSquare, desc: 'User asks in plain language' },
  { label: 'Intent & Entity Extraction', icon: Layers, desc: 'Query understanding and classification' },
  { label: 'Hybrid Retrieval', icon: BookOpen, desc: 'BM25 lexical + vector semantic search' },
  { label: 'Evidence Ranking', icon: Award, desc: 'Reranking by relevance to query' },
  { label: 'Evidence Validation', icon: CheckCircle, desc: 'Verify sufficient grounding exists' },
  { label: 'RAG Generation', icon: FlaskConical, desc: 'LLM generates from retrieved evidence' },
  { label: 'Citation Attachment', icon: Shield, desc: 'Source-backed answer with provenance' },
];

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-bis-navy py-14">
        <div className="page-container max-w-3xl mx-auto text-center">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Shield className="w-7 h-7 text-bis-saffron" />
          </div>
          <h1 className="text-white text-3xl font-bold mb-3">About StandardSense</h1>
          <p className="text-white/60 leading-relaxed">
            An evidence-grounded AI intelligence layer over authorized BIS information — built for SIH 2026, Problem Statement 26107.
          </p>
        </div>
      </div>

      <div className="page-container py-12 max-w-3xl mx-auto space-y-10">
        {/* What is StandardSense */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">What is StandardSense?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            StandardSense is an AI-powered intelligent assistant that helps industries, MSMEs, startups, professionals, students and consumers understand and navigate Indian Standards and BIS services through natural-language interaction.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Instead of searching across multiple BIS portals, documents and PDFs, users can ask questions in natural language and receive <strong>source-backed guidance with traceable references</strong>.
          </p>
        </div>

        {/* Problem solved */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Problem Being Solved</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Bureau of Indian Standards publishes thousands of Indian Standards and provides services covering product certification, hallmarking, laboratory recognition, and consumer services. However, users often struggle to:
          </p>
          <ul className="space-y-2">
            {[
              'Identify which Indian Standard applies to their product',
              'Determine whether certification is mandatory or voluntary',
              'Understand which BIS certification scheme is relevant',
              'Find testing laboratories for a specific standard',
              'Understand technical BIS information in plain language',
              'Connect a product with its standard, certification, testing and laboratory information',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <ArrowRight className="w-4 h-4 text-bis-blue flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Architecture */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-2">RAG Architecture</h2>
          <p className="text-sm text-gray-500 mb-6">The system uses a Retrieval-Augmented Generation pipeline where retrieved BIS evidence — not the LLM — is the source of truth.</p>
          <div className="relative">
            {ARCHITECTURE_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.label} className="flex items-start gap-4 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 bg-bis-navy rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    {i < ARCHITECTURE_STEPS.length - 1 && (
                      <div className="w-px h-8 bg-bis-border mt-1" />
                    )}
                  </div>
                  <div className="pb-6">
                    <div className="text-sm font-semibold text-gray-900">{step.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{step.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Core principles */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Core Product Principles</h2>
          <div className="space-y-4">
            {[
              { title: 'Evidence Before Generation', desc: 'The LLM explains retrieved BIS evidence rather than inventing information.' },
              { title: 'Traceability Over Fluency', desc: 'A slightly less conversational answer with a reliable source is better than a fluent unsupported one.' },
              { title: 'Refusal is a Feature', desc: 'When the system cannot support an answer with available evidence, it says so clearly.' },
              { title: 'Guidance, Not Authority', desc: 'StandardSense helps users navigate BIS information — it does not replace BIS as the authoritative body.' },
            ].map((principle, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-bis-teal flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-gray-900">{principle.title}</div>
                  <div className="text-sm text-gray-500">{principle.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SIH context */}
        <div className="card bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-bis-blue flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-bis-navy mb-2">Smart India Hackathon 2026</div>
              <div className="space-y-1 text-sm text-gray-700">
                <div><strong>Problem Statement:</strong> 26107</div>
                <div><strong>Organization:</strong> Ministry of Consumer Affairs, Food & Public Distribution</div>
                <div><strong>Department:</strong> Department of Consumer Affairs (DoCA)</div>
                <div><strong>Theme:</strong> Smart Automation</div>
              </div>
            </div>
          </div>
        </div>

        {/* Official resources */}
        <div className="card">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Official BIS Resources</h2>
          <div className="space-y-3">
            {[
              { label: 'BIS Official Portal', url: 'https://www.bis.gov.in', desc: 'Standards, certification services, hallmarking and more' },
              { label: 'Know Your Standard', url: 'https://www.bis.gov.in', desc: 'Search IS numbers and view standard information' },
              { label: 'BIS Online Certification (manakonline)', url: 'https://manakonline.in', desc: 'Online application for BIS certification' },
              { label: 'BIS CARE App', url: 'https://www.bis.gov.in', desc: 'Verify HUID and BIS marks from your smartphone' },
            ].map(resource => (
              <a
                key={resource.label}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-bis-bg transition-colors group"
              >
                <ExternalLink className="w-4 h-4 text-bis-blue flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-bis-blue group-hover:text-bis-navy transition-colors">{resource.label}</div>
                  <div className="text-xs text-gray-500">{resource.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button onClick={() => navigate('/chat')} className="btn-primary">
            Try StandardSense
          </button>
        </div>
      </div>
    </div>
  );
}
