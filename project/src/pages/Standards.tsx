import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ArrowRight, CheckCircle, AlertCircle, RefreshCcw } from 'lucide-react';
import { STANDARDS } from '@/data/mockData';
import type { Standard } from '@/types';

const SECTORS = ['All Sectors', ...Array.from(new Set(STANDARDS.map(s => s.sector)))];
const STATUSES = ['All Statuses', 'ACTIVE', 'SUPERSEDED', 'UNDER_REVISION'];
const YEARS = ['All Years', '2021', '2020', '2019', '2018', '2017', '2016'];

function StandardCard({ standard }: { standard: Standard }) {
  const navigate = useNavigate();

  return (
    <div
      className="card hover:shadow-md hover:border-bis-blue/30 transition-all cursor-pointer group"
      onClick={() => navigate(`/standards/${standard.id}`)}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <div className="text-xs font-bold text-bis-blue uppercase tracking-wide">{standard.is_number}</div>
          <div className="text-sm font-semibold text-gray-900 mt-1 leading-snug group-hover:text-bis-navy transition-colors">
            {standard.title}
          </div>
        </div>
        <span className={standard.status === 'ACTIVE' ? 'badge-active whitespace-nowrap' : 'badge-superseded whitespace-nowrap'}>
          {standard.status === 'ACTIVE' ? <CheckCircle className="w-3 h-3 inline mr-1" /> : <AlertCircle className="w-3 h-3 inline mr-1" />}
          {standard.status === 'ACTIVE' ? 'Active' : standard.status === 'SUPERSEDED' ? 'Superseded' : 'Under Revision'}
        </span>
      </div>

      <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">{standard.scope}</p>

      <div className="flex items-center gap-2 flex-wrap mb-4">
        <span className="text-[11px] bg-blue-50 text-bis-blue px-2 py-0.5 rounded-full font-medium">{standard.sector}</span>
        <span className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{standard.product_category}</span>
        <span className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{standard.year}</span>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-bis-border">
        <div className="flex items-center gap-3">
          {standard.certification_required && (
            <span className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full font-medium">
              Certification required
            </span>
          )}
          {standard.qco_applicable && (
            <span className="text-[11px] text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full font-medium">
              QCO applicable
            </span>
          )}
        </div>
        <div className="text-bis-blue flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all">
          Details <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
}

export default function Standards() {
  const [query, setQuery] = useState('');
  const [sector, setSector] = useState('All Sectors');
  const [status, setStatus] = useState('All Statuses');
  const [year, setYear] = useState('All Years');
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    return STANDARDS.filter(s => {
      const matchesQuery = !query ||
        s.is_number.toLowerCase().includes(query.toLowerCase()) ||
        s.title.toLowerCase().includes(query.toLowerCase()) ||
        s.scope.toLowerCase().includes(query.toLowerCase()) ||
        s.product_category.toLowerCase().includes(query.toLowerCase());
      const matchesSector = sector === 'All Sectors' || s.sector === sector;
      const matchesStatus = status === 'All Statuses' || s.status === status;
      const matchesYear = year === 'All Years' || String(s.year) === year;
      return matchesQuery && matchesSector && matchesStatus && matchesYear;
    });
  }, [query, sector, status, year]);

  const clearFilters = () => {
    setQuery('');
    setSector('All Sectors');
    setStatus('All Statuses');
    setYear('All Years');
  };

  const hasFilters = query || sector !== 'All Sectors' || status !== 'All Statuses' || year !== 'All Years';

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="bg-bis-navy py-12">
        <div className="page-container">
          <div className="section-label text-white/50 mb-2">Indian Standards</div>
          <h1 className="text-white text-3xl font-bold mb-3">Standards Explorer</h1>
          <p className="text-white/60 max-w-xl">
            Search and explore Indian Standards by number, product, sector or keyword. Find applicable standards for your product or industry.
          </p>
        </div>
      </div>

      <div className="page-container py-8">
        {/* Search + Filters */}
        <div className="card mb-6">
          <div className="flex gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by IS number, product name, keyword..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="input-field pl-9"
              />
            </div>
            <button
              onClick={() => navigate('/chat')}
              className="btn-primary flex items-center gap-2 whitespace-nowrap"
            >
              Ask AI Assistant
            </button>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={sector}
              onChange={e => setSector(e.target.value)}
              className="input-field max-w-[180px]"
            >
              {SECTORS.map(s => <option key={s}>{s}</option>)}
            </select>
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="input-field max-w-[160px]"
            >
              {STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
            <select
              value={year}
              onChange={e => setYear(e.target.value)}
              className="input-field max-w-[130px]"
            >
              {YEARS.map(y => <option key={y}>{y}</option>)}
            </select>
            {hasFilters && (
              <button onClick={clearFilters} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                <RefreshCcw className="w-3.5 h-3.5" /> Clear
              </button>
            )}
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-500">
            {filtered.length} standard{filtered.length !== 1 ? 's' : ''} found
            {hasFilters && <span className="text-bis-blue ml-1">(filtered)</span>}
          </div>
        </div>

        {/* Results grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(s => <StandardCard key={s.id} standard={s} />)}
          </div>
        ) : (
          <div className="text-center py-20 card">
            <Search className="w-10 h-10 text-gray-300 mx-auto mb-4" />
            <div className="text-gray-700 font-semibold mb-2">No standards found</div>
            <p className="text-gray-500 text-sm mb-4">Try a broader search term or clear filters.</p>
            <button onClick={clearFilters} className="btn-secondary">Clear all filters</button>
          </div>
        )}

        {/* Suggest AI */}
        <div className="mt-8 card bg-blue-50 border-blue-200 flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-bis-navy mb-1">Can't find the right standard?</div>
            <div className="text-sm text-gray-600">
              Describe your product to StandardSense and it will suggest potentially applicable standards with reasoning and evidence.
            </div>
          </div>
          <button
            onClick={() => navigate('/chat')}
            className="btn-primary whitespace-nowrap flex items-center gap-2"
          >
            Ask AI <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
