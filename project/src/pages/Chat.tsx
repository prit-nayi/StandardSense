import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Send, Plus, MessageSquare, CheckCircle, AlertTriangle,
  HelpCircle, BookOpen, ExternalLink, ChevronDown, ChevronUp,
  X, FileText, Building2, FlaskConical, ArrowRight,
} from 'lucide-react';
import type { ChatMessage, Citation, Conversation, StandardRecommendation } from '@/types';
import { generateMockResponse, getThinkingSequence, SUGGESTED_QUESTIONS } from '@/data/mockResponses';
import { LABORATORIES } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

let msgCounter = 0;
const nextId = () => `msg-${++msgCounter}`;

function GroundingBadge({ status }: { status: ChatMessage['grounding_status'] }) {
  if (!status) return null;
  if (status === 'SUPPORTED') return (
    <span className="badge-source"><CheckCircle className="w-3 h-3" /> Source-backed</span>
  );
  if (status === 'PARTIALLY_SUPPORTED') return (
    <span className="badge-partial"><AlertTriangle className="w-3 h-3" /> Partially supported</span>
  );
  if (status === 'INSUFFICIENT') return (
    <span className="badge-insufficient"><HelpCircle className="w-3 h-3" /> Not verified from available sources</span>
  );
  if (status === 'CONFLICTING') return (
    <span className="badge-partial"><AlertTriangle className="w-3 h-3" /> Sources may conflict</span>
  );
  return null;
}

function CitationItem({ citation, onOpen }: { citation: Citation; onOpen: (c: Citation) => void }) {
  return (
    <button
      onClick={() => onOpen(citation)}
      className="flex items-start gap-2 text-left w-full hover:bg-bis-bg rounded-lg p-2 transition-colors group"
    >
      <span className="w-5 h-5 bg-bis-navy text-white rounded text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
        {citation.id.split('-').pop()}
      </span>
      <div className="min-w-0">
        <div className="text-xs font-medium text-gray-700 group-hover:text-bis-blue transition-colors truncate">
          {citation.document_title}
        </div>
        <div className="text-[11px] text-gray-400">
          {[citation.page_number && `Page ${citation.page_number}`, citation.clause_number && `Clause ${citation.clause_number}`]
            .filter(Boolean).join(' · ')}
        </div>
      </div>
    </button>
  );
}

function RecommendationCard({ rec }: { rec: StandardRecommendation }) {
  const navigate = useNavigate();
  const relevanceBg = rec.relevance === 'HIGH' ? 'bg-green-50 border-green-200' :
    rec.relevance === 'MEDIUM' ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-200';

  return (
    <div className={`border rounded-lg p-4 ${relevanceBg}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-bis-navy">{rec.is_number}</span>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
              rec.relevance === 'HIGH' ? 'bg-green-100 text-green-700' :
              rec.relevance === 'MEDIUM' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'
            }`}>
              {rec.relevance} relevance
            </span>
          </div>
          <div className="text-sm font-medium text-gray-900 mb-2 leading-snug">{rec.title}</div>
          <div className="text-xs text-gray-600 leading-relaxed mb-3">{rec.reason}</div>
          <div className="flex items-center gap-3 text-[11px] text-gray-500">
            <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-bis-teal" />{rec.evidence_count} supporting sources</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => navigate(`/standards/${rec.standard_id}`)}
          className="text-xs font-semibold text-bis-blue hover:text-bis-navy flex items-center gap-1 transition-colors"
        >
          View Standard <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

function ThinkingIndicator({ steps }: { steps: string[] }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep >= steps.length - 1) return;
    const t = setTimeout(() => setCurrentStep(c => c + 1), 900);
    return () => clearTimeout(t);
  }, [currentStep, steps.length]);

  return (
    <div className="flex items-start gap-3 animate-fade-in">
      <div className="w-8 h-8 bg-bis-navy rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
        <BookOpen className="w-4 h-4 text-white" />
      </div>
      <div className="card py-3 px-4 max-w-sm">
        <div className="flex flex-col gap-1.5">
          {steps.map((step, i) => (
            <div key={step} className={`flex items-center gap-2 text-sm transition-opacity duration-300 ${i <= currentStep ? 'opacity-100' : 'opacity-20'}`}>
              {i < currentStep ? (
                <CheckCircle className="w-3.5 h-3.5 text-bis-teal flex-shrink-0" />
              ) : i === currentStep ? (
                <div className="flex gap-0.5 w-3.5 justify-center">
                  <div className="w-1 h-1 bg-bis-blue rounded-full dot-1" />
                  <div className="w-1 h-1 bg-bis-blue rounded-full dot-2" />
                  <div className="w-1 h-1 bg-bis-blue rounded-full dot-3" />
                </div>
              ) : (
                <div className="w-3.5 h-3.5 rounded-full border border-gray-200 flex-shrink-0" />
              )}
              <span className={i === currentStep ? 'text-bis-blue font-medium' : i < currentStep ? 'text-gray-600' : 'text-gray-400'}>
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AssistantMessage({ msg, onCitationOpen }: { msg: ChatMessage; onCitationOpen: (c: Citation) => void }) {
  const [citationsExpanded, setCitationsExpanded] = useState(false);
  const hasCitations = (msg.citations?.length ?? 0) > 0;
  const hasRecs = (msg.recommendations?.length ?? 0) > 0;

  const renderContent = (content: string) => {
    const parts = content.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1 ? <strong key={i} className="font-semibold text-gray-900">{part}</strong> : part
    );
  };

  const paragraphs = msg.content.split('\n\n').filter(Boolean);

  return (
    <div className="flex items-start gap-3 animate-fade-in">
      <div className="w-8 h-8 bg-bis-navy rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
        <BookOpen className="w-4 h-4 text-white" />
      </div>
      <div className="flex-1 min-w-0 space-y-3">
        <div className="text-xs font-semibold text-bis-navy mb-1">StandardSense</div>

        {/* Grounding badge */}
        <GroundingBadge status={msg.grounding_status} />

        {/* Insufficient evidence state */}
        {msg.grounding_status === 'INSUFFICIENT' && (
          <div className="card border-amber-200 bg-amber-50 py-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-800 leading-relaxed">{msg.content}</div>
            </div>
          </div>
        )}

        {/* Main content */}
        {msg.grounding_status !== 'INSUFFICIENT' && (
          <div className="card py-4">
            <div className="prose-bis text-sm text-gray-700 leading-relaxed space-y-2">
              {paragraphs.map((para, i) => {
                if (para.startsWith('- ')) {
                  const items = para.split('\n').filter(l => l.startsWith('- '));
                  return (
                    <ul key={i} className="space-y-1">
                      {items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-bis-blue rounded-full mt-2 flex-shrink-0" />
                          <span>{renderContent(item.slice(2))}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                return <p key={i}>{renderContent(para)}</p>;
              })}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {hasRecs && (
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Potentially Relevant Standards</div>
            <div className="space-y-3">
              {msg.recommendations!.map(rec => <RecommendationCard key={rec.standard_id} rec={rec} />)}
            </div>
          </div>
        )}

        {/* Citations */}
        {hasCitations && (
          <div className="card py-3">
            <button
              onClick={() => setCitationsExpanded(!citationsExpanded)}
              className="flex items-center justify-between w-full text-xs font-semibold text-gray-700"
            >
              <span className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-bis-blue" />
                Sources ({msg.citations!.length})
              </span>
              {citationsExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {citationsExpanded && (
              <div className="mt-3 space-y-1 border-t border-bis-border pt-3">
                {msg.citations!.map(cit => <CitationItem key={cit.id} citation={cit} onOpen={onCitationOpen} />)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function CitationDrawer({ citation, onClose }: { citation: Citation; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white rounded-t-2xl md:rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-bis-border">
          <div className="text-sm font-semibold text-gray-900">Source Details</div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Document</div>
            <div className="text-sm font-semibold text-gray-900">{citation.document_title}</div>
            {citation.standard_number && (
              <div className="text-xs text-bis-blue mt-1">{citation.standard_number}</div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Type</div>
              <div className="text-sm text-gray-700">{citation.document_type}</div>
            </div>
            {citation.page_number && (
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Page</div>
                <div className="text-sm text-gray-700">{citation.page_number}</div>
              </div>
            )}
            {citation.clause_number && (
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Clause</div>
                <div className="text-sm font-mono text-gray-700">{citation.clause_number}</div>
              </div>
            )}
          </div>
          {citation.relevant_passage && (
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">Relevant Passage</div>
              <div className="bg-bis-bg border border-bis-border rounded-lg p-4 text-sm text-gray-700 italic leading-relaxed">
                "{citation.relevant_passage}"
              </div>
            </div>
          )}
          {citation.source_url && (
            <a
              href={citation.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-bis-blue hover:text-bis-navy font-medium transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View on BIS Portal
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

let convCounter = 0;
const newConv = (title = 'New Conversation'): Conversation => ({
  id: `conv-${++convCounter}`,
  title,
  updated_at: new Date(),
  messages: [],
});

export default function Chat() {
  const location = useLocation();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<Conversation[]>(() => [newConv()]);
  const [activeConvId, setActiveConvId] = useState<string>(conversations[0].id);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingSteps, setThinkingSteps] = useState<string[]>([]);
  const [activeCitation, setActiveCitation] = useState<Citation | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const hasInitialized = useRef(false);

  const activeConv = conversations.find(c => c.id === activeConvId)!;

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => {
    scrollToBottom();
  }, [activeConv?.messages, isThinking]);

  useEffect(() => {
    const initialQuery = location.state?.initialQuery as string | undefined;
    if (initialQuery && !hasInitialized.current) {
      hasInitialized.current = true;
      setInputValue(initialQuery);
      setTimeout(() => sendMessage(initialQuery), 300);
    }
  }, []);

  const sendMessage = async (text?: string) => {
    const msgText = (text ?? inputValue).trim();
    if (!msgText || isThinking) return;

    const userMsg: ChatMessage = {
      id: nextId(),
      role: 'user',
      content: msgText,
      timestamp: new Date(),
    };

    setInputValue('');
    const steps = getThinkingSequence(msgText);
    setThinkingSteps(steps);
    setIsThinking(true);

    setConversations(prev => prev.map(c =>
      c.id === activeConvId
        ? { ...c, messages: [...c.messages, userMsg], title: c.messages.length === 0 ? msgText.slice(0, 40) : c.title, updated_at: new Date() }
        : c
    ));

    const thinkTime = steps.length * 900 + 500;
    await new Promise(r => setTimeout(r, thinkTime));

    const response = generateMockResponse(msgText);
    const assistantMsg: ChatMessage = {
      id: nextId(),
      role: 'assistant',
      content: response.content,
      timestamp: new Date(),
      grounding_status: response.grounding_status,
      citations: response.citations,
      recommendations: response.recommendations,
      intent: response.intent,
    };

    setIsThinking(false);
    setConversations(prev => prev.map(c =>
      c.id === activeConvId
        ? { ...c, messages: [...c.messages, assistantMsg], updated_at: new Date() }
        : c
    ));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const startNewConversation = () => {
    const conv = newConv();
    setConversations(prev => [conv, ...prev]);
    setActiveConvId(conv.id);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-[calc(100vh-68px)] bg-bis-bg">
      {/* Sidebar overlay on mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40 lg:z-auto
        w-72 bg-white border-r border-bis-border flex flex-col
        transition-transform duration-200
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4 border-b border-bis-border">
          <button onClick={startNewConversation} className="btn-primary w-full flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" /> New Conversation
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-2 py-2">Conversations</div>
          {conversations.map(conv => (
            <button
              key={conv.id}
              onClick={() => { setActiveConvId(conv.id); setSidebarOpen(false); }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex items-start gap-2 ${
                conv.id === activeConvId ? 'bg-bis-bg text-bis-navy font-medium' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <div className="truncate">{conv.title}</div>
                <div className="text-[11px] text-gray-400 mt-0.5">{conv.messages.length} messages</div>
              </div>
            </button>
          ))}
        </div>
        <div className="p-3 border-t border-bis-border">
          <button
            onClick={() => navigate('/standards')}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-bis-navy hover:bg-bis-bg rounded-lg transition-colors"
          >
            <BookOpen className="w-4 h-4" /> Explore Standards
          </button>
          <button
            onClick={() => navigate('/laboratories')}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-bis-navy hover:bg-bis-bg rounded-lg transition-colors"
          >
            <FlaskConical className="w-4 h-4" /> Find Laboratories
          </button>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat header */}
        <div className="bg-white border-b border-bis-border px-5 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <MessageSquare className="w-5 h-5 text-gray-500" />
          </button>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-gray-900 truncate">{activeConv.title}</div>
            <div className="text-xs text-gray-400">Evidence-grounded BIS guidance</div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {activeConv.messages.length === 0 && !isThinking && (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-14 h-14 bg-bis-navy rounded-2xl flex items-center justify-center mb-5 shadow-lg">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ask StandardSense</h3>
              <p className="text-sm text-gray-500 max-w-xs mb-8 leading-relaxed">
                Ask about Indian Standards, BIS certification, testing labs, hallmarking or any BIS-related question.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg w-full">
                {SUGGESTED_QUESTIONS.slice(0, 4).map(q => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-left px-4 py-3 text-sm text-gray-700 bg-white border border-bis-border rounded-lg hover:border-bis-blue hover:text-bis-blue transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeConv.messages.map(msg =>
            msg.role === 'user' ? (
              <div key={msg.id} className="flex justify-end animate-fade-in">
                <div className="bg-bis-navy text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[75%] text-sm leading-relaxed">
                  {msg.content}
                </div>
              </div>
            ) : (
              <AssistantMessage key={msg.id} msg={msg} onCitationOpen={setActiveCitation} />
            )
          )}

          {isThinking && <ThinkingIndicator steps={thinkingSteps} />}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="bg-white border-t border-bis-border p-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-3 bg-bis-bg border border-bis-border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-bis-blue focus-within:border-bis-blue transition-all">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask StandardSense anything... (Enter to send, Shift+Enter for new line)"
                rows={2}
                disabled={isThinking}
                className="flex-1 bg-transparent px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none resize-none disabled:opacity-50"
              />
              <div className="flex items-end p-2">
                <button
                  onClick={() => sendMessage()}
                  disabled={!inputValue.trim() || isThinking}
                  className="w-9 h-9 bg-bis-navy text-white rounded-lg flex items-center justify-center hover:bg-deep-navy transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="text-[11px] text-gray-400 text-center mt-2">
              Answers are based on available BIS sources. Always verify with{' '}
              <a href="https://www.bis.gov.in" target="_blank" rel="noopener noreferrer" className="text-bis-blue hover:underline">bis.gov.in</a>
              {' '}for authoritative information.
            </div>
          </div>
        </div>
      </div>

      {/* Citation drawer */}
      {activeCitation && (
        <CitationDrawer citation={activeCitation} onClose={() => setActiveCitation(null)} />
      )}
    </div>
  );
}
