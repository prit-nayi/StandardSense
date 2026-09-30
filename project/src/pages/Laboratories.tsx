import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, MapPin, Phone, Mail, FlaskConical, CheckCircle,
  ArrowRight, Filter, RefreshCcw,
} from 'lucide-react';
import { LABORATORIES, STANDARDS } from '@/data/mockData';

const ALL_STATES = ['All States', ...Array.from(new Set(LABORATORIES.map(l => l.state))).sort()];
const ALL_TYPES = ['All Types', 'BIS-Recognized', 'NABL Accredited', 'Empanelled'];
const ALL_STANDARDS = ['All Standards', ...Array.from(new Set(LABORATORIES.flatMap(l => l.standards))).sort()];

function LabCard({ lab }: { lab: typeof LABORATORIES[0] }) {
  const typeBg = lab.type === 'BIS-Recognized' ? 'bg-blue-50 text-bis-blue border-blue-200' :
    lab.type === 'NABL Accredited' ? 'bg-teal-50 text-bis-teal border-teal-200' :
    'bg-purple-50 text-purple-700 border-purple-200';

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-gray-900 mb-1 leading-snug">{lab.name}</div>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${typeBg}`}>
            {lab.type}
          </span>
        </div>
        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
          <FlaskConical className="w-5 h-5 text-bis-blue" />
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
        <span>{lab.address}</span>
      </div>

      <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
        <div className="flex items-center gap-1.5">
          <Phone className="w-3 h-3" />
          <span>{lab.phone}</span>
        </div>
        {lab.email && (
          <div className="flex items-center gap-1.5">
            <Mail className="w-3 h-3" />
            <a href={`mailto:${lab.email}`} className="hover:text-bis-blue transition-colors">{lab.email}</a>
          </div>
        )}
      </div>

      <div className="mb-4">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Testing Capabilities</div>
        <div className="flex flex-wrap gap-1.5">
          {lab.capabilities.map(cap => (
            <span key={cap} className="text-[11px] bg-bis-bg border border-bis-border px-2 py-0.5 rounded-full text-gray-600">
              {cap}
            </span>
          ))}
        </div>
      </div>

      <div>
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Supported Standards</div>
        <div className="flex flex-wrap gap-1.5">
          {lab.standards.map(s => (
            <span key={s} className="text-[11px] bg-blue-50 text-bis-blue border border-blue-200 px-2 py-0.5 rounded-full font-medium">
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-bis-border flex items-center gap-2">
        <span className="flex items-center gap-1 text-[11px] text-green-700">
          <CheckCircle className="w-3 h-3" /> Active
        </span>
      </div>
    </div>
  );
}

export default function Laboratories() {
  const [query, setQuery] = useState('');
  const [state, setState] = useState('All States');
  const [type, setType] = useState('All Types');
  const [standard, setStandard] = useState('All Standards');
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    return LABORATORIES.filter(l => {
      const matchesQuery = !query ||
        l.name.toLowerCase().includes(query.toLowerCase()) ||
        l.city.toLowerCase().includes(query.toLowerCase()) ||
        l.capabilities.some(c => c.toLowerCase().includes(query.toLowerCase()));
      const matchesState = state === 'All States' || l.state === state;
      const matchesType = type === 'All Types' || l.type === type;
      const matchesStandard = standard === 'All Standards' || l.standards.includes(standard);
      return matchesQuery && matchesState && matchesType && matchesStandard;
    });
  }, [query, state, type, standard]);

  const hasFilters = query || state !== 'All States' || type !== 'All Types' || standard !== 'All Standards';
  const clearFilters = () => { setQuery(''); setState('All States'); setType('All Types'); setStandard('All Standards'); };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-bis-navy py-12">
        <div className="page-container">
          <div className="section-label text-white/50 mb-2">Testing & Laboratories</div>
          <h1 className="text-white text-3xl font-bold mb-3">Find Testing Laboratories</h1>
          <p className="text-white/60 max-w-xl">
            Discover BIS-recognized, NABL-accredited and empanelled laboratories by standard, location and testing capability.
          </p>
        </div>
      </div>

      <div className="page-container py-8">
        {/* Filters */}
        <div className="card mb-6">
          <div className="flex gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by lab name, city, capability..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="input-field pl-9"
              />
            </div>
            <button
              onClick={() => navigate('/chat', { state: { initialQuery: 'Where can I find a BIS-recognized testing laboratory?' } })}
              className="btn-primary whitespace-nowrap flex items-center gap-2"
            >
              Ask AI <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <Filter className="w-4 h-4 text-gray-400" />
            <select value={state} onChange={e => setState(e.target.value)} className="input-field max-w-[160px]">
              {ALL_STATES.map(s => <option key={s}>{s}</option>)}
            </select>
            <select value={type} onChange={e => setType(e.target.value)} className="input-field max-w-[180px]">
              {ALL_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
            <select value={standard} onChange={e => setStandard(e.target.value)} className="input-field max-w-[160px]">
              {ALL_STANDARDS.map(s => <option key={s}>{s}</option>)}
            </select>
            {hasFilters && (
              <button onClick={clearFilters} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                <RefreshCcw className="w-3.5 h-3.5" /> Clear
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-500">
            {filtered.length} laborator{filtered.length !== 1 ? 'ies' : 'y'} found
          </div>
          <div className="flex gap-3 text-xs text-gray-500">
            {['BIS-Recognized', 'NABL Accredited', 'Empanelled'].map(t => {
              const count = filtered.filter(l => l.type === t).length;
              return count > 0 ? <span key={t}>{count} {t}</span> : null;
            })}
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(lab => <LabCard key={lab.id} lab={lab} />)}
          </div>
        ) : (
          <div className="text-center py-20 card">
            <FlaskConical className="w-10 h-10 text-gray-300 mx-auto mb-4" />
            <div className="text-gray-700 font-semibold mb-2">No laboratories found</div>
            <p className="text-gray-500 text-sm mb-4">Try adjusting your filters or search term.</p>
            <button onClick={clearFilters} className="btn-secondary">Clear all filters</button>
          </div>
        )}

        {/* Note */}
        <div className="mt-8 card bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <FlaskConical className="w-5 h-5 text-bis-blue flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700">
              <strong className="text-bis-navy">Important:</strong> This is a prototype showing sample laboratory data. For the complete and authoritative list of BIS-recognized and empanelled laboratories, please refer to the{' '}
              <a href="https://www.bis.gov.in" target="_blank" rel="noopener noreferrer" className="text-bis-blue hover:text-bis-navy font-medium underline transition-colors">official BIS portal</a>.
              Laboratory recognition and capabilities are subject to change.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
