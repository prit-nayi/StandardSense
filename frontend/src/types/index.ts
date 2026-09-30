export interface Standard {
  id: string;
  is_number: string;
  title: string;
  scope: string;
  sector: string;
  product_category: string;
  year: number;
  status: 'ACTIVE' | 'SUPERSEDED' | 'UNDER_REVISION';
  key_requirements: string[];
  certification_required: boolean;
  qco_applicable: boolean;
  related_standards: string[];
  description: string;
  testing_parameters?: string[];
  certification_scheme?: string;
  source_url?: string;
}

export interface Laboratory {
  id: string;
  name: string;
  type: 'BIS-Recognized' | 'NABL Accredited' | 'Empanelled';
  city: string;
  state: string;
  address: string;
  phone: string;
  email?: string;
  capabilities: string[];
  standards: string[];
  status: 'ACTIVE';
}

export interface Citation {
  id: string;
  document_title: string;
  document_type: string;
  page_number?: number;
  clause_number?: string;
  source_url?: string;
  relevant_passage?: string;
  standard_number?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  grounding_status?: 'SUPPORTED' | 'PARTIALLY_SUPPORTED' | 'INSUFFICIENT' | 'CONFLICTING';
  citations?: Citation[];
  recommendations?: StandardRecommendation[];
  sections?: ResponseSection[];
  intent?: string;
}

export interface ResponseSection {
  type: 'standards' | 'certification' | 'testing' | 'laboratories' | 'next_steps' | 'text';
  title: string;
  content: string | StandardRecommendation[] | Laboratory[] | string[];
}

export interface StandardRecommendation {
  standard_id: string;
  is_number: string;
  title: string;
  reason: string;
  evidence_count: number;
  relevance: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface Conversation {
  id: string;
  title: string;
  updated_at: Date;
  messages: ChatMessage[];
}

export interface QCO {
  id: string;
  title: string;
  product: string;
  standard_id: string;
  notification_number: string;
  effective_date: string;
  status: 'Mandatory' | 'Voluntary';
  description: string;
}

export interface CertificationScheme {
  id: string;
  name: string;
  scheme_type: string;
  description: string;
  applicable_products: string[];
  requirements: string[];
}
