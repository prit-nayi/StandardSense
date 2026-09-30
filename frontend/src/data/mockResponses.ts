import type { ChatMessage, Citation, StandardRecommendation } from '@/types';

const CITATIONS_STEEL_BOTTLE: Citation[] = [
  {
    id: 'cit-1',
    document_title: 'IS 14543: Packaged Drinking Water Specification',
    document_type: 'Indian Standard',
    page_number: 3,
    clause_number: '4.1',
    standard_number: 'IS 14543',
    source_url: 'https://www.bis.gov.in',
    relevant_passage: 'The containers used for packaged drinking water shall be made of food-grade materials including stainless steel (grade 304 or 316), glass or food-grade plastics. The material shall not impart any taste, odour or toxic substance to the water.',
  },
  {
    id: 'cit-2',
    document_title: 'IS 15498: Stainless Steel in Food Contact Applications',
    document_type: 'Indian Standard',
    page_number: 8,
    clause_number: '5.2',
    standard_number: 'IS 15498',
    source_url: 'https://www.bis.gov.in',
    relevant_passage: 'For food and beverage contact applications, austenitic stainless steel grades 304 (1.4301) and 316 (1.4401) are recommended. Migration of metallic constituents shall not exceed specified limits.',
  },
  {
    id: 'cit-3',
    document_title: 'Packaged Drinking Water Quality Control Order',
    document_type: 'Quality Control Order',
    clause_number: '3(1)',
    source_url: 'https://www.bis.gov.in',
    relevant_passage: 'All packaged drinking water conforming to IS 14543 shall bear the Standard Mark before being sold, stocked, exhibited for sale or processed for sale in India.',
  },
  {
    id: 'cit-4',
    document_title: 'BIS Certification Mark Scheme — Product Certification Procedure',
    document_type: 'BIS Procedure Document',
    page_number: 2,
    clause_number: '2.1',
    source_url: 'https://www.bis.gov.in',
    relevant_passage: 'The BIS Certification Mark Scheme (Scheme I) applies to domestic manufacturers. The process involves application, factory inspection, product testing and grant of licence.',
  },
];

const RECOMMENDATIONS_STEEL_BOTTLE: StandardRecommendation[] = [
  {
    standard_id: 'std-001',
    is_number: 'IS 14543',
    title: 'Packaged Drinking Water (Other than Packaged Natural Mineral Water) — Specification',
    reason: 'This standard directly covers containers used for packaged drinking water, including stainless steel containers intended for storing and supplying drinking water. It specifies material requirements, quality parameters and labelling norms.',
    evidence_count: 3,
    relevance: 'HIGH',
  },
  {
    standard_id: 'std-002',
    is_number: 'IS 15498',
    title: 'Guidelines for Packaging Materials — Stainless Steel and Alloys',
    reason: 'This standard provides guidelines for stainless steel used in food contact applications, including water bottles. It specifies permissible metal migration limits and acceptable grades of stainless steel.',
    evidence_count: 2,
    relevance: 'HIGH',
  },
  {
    standard_id: 'std-003',
    is_number: 'IS 6911',
    title: 'Stainless Steel Plate, Sheet and Strip — Specification',
    reason: 'This standard covers the raw material specification for stainless steel sheets used in manufacturing water bottles. It defines acceptable chemical composition, mechanical properties and surface finish grades.',
    evidence_count: 1,
    relevance: 'MEDIUM',
  },
];

const GENERIC_CITATIONS: Citation[] = [
  {
    id: 'gen-cit-1',
    document_title: 'BIS — About Certification Services',
    document_type: 'BIS Service Document',
    page_number: 1,
    source_url: 'https://www.bis.gov.in',
    relevant_passage: 'BIS provides product certification services to help manufacturers demonstrate compliance with Indian Standards and build consumer trust.',
  },
];

export const THINKING_SEQUENCES: Record<string, string[]> = {
  standard_search: [
    'Analysing query and extracting product attributes...',
    'Searching BIS standards knowledge base...',
    'Matching product description to relevant Indian Standards...',
    'Evaluating certification and QCO evidence...',
    'Preparing source-backed answer...',
  ],
  certification: [
    'Identifying product and applicable standard...',
    'Checking Quality Control Order (QCO) information...',
    'Retrieving BIS certification scheme details...',
    'Evaluating testing and laboratory requirements...',
    'Preparing source-backed answer...',
  ],
  laboratory: [
    'Identifying testing requirements for the standard...',
    'Searching BIS-recognized laboratory database...',
    'Filtering by capability and location...',
    'Preparing laboratory discovery results...',
  ],
  hallmarking: [
    'Searching BIS hallmarking information...',
    'Retrieving HUID and consumer guidance...',
    'Preparing source-backed answer...',
  ],
  general: [
    'Searching BIS sources...',
    'Comparing relevant information...',
    'Preparing source-backed answer...',
  ],
};

function detectIntent(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes('hallmark') || lower.includes('huid') || lower.includes('gold') || lower.includes('jewel')) return 'hallmarking';
  if (lower.includes('lab') || lower.includes('test') || lower.includes('where can i get')) return 'laboratory';
  if (lower.includes('certif') || lower.includes('mandatory') || lower.includes('qco') || lower.includes('compulsory')) return 'certification';
  if (lower.includes('steel') || lower.includes('bottle') || lower.includes('water') || lower.includes('standard') || lower.includes('which')) return 'standard_search';
  return 'general';
}

interface MockResponse {
  content: string;
  grounding_status: 'SUPPORTED' | 'PARTIALLY_SUPPORTED' | 'INSUFFICIENT' | 'CONFLICTING';
  citations: Citation[];
  recommendations: StandardRecommendation[];
  intent: string;
}

export function generateMockResponse(message: string): MockResponse {
  const lower = message.toLowerCase();
  const intent = detectIntent(message);

  if (
    (lower.includes('steel') || lower.includes('bottle') || lower.includes('stainless')) &&
    (lower.includes('water') || lower.includes('standard') || lower.includes('manufacture') || lower.includes('certif'))
  ) {
    return {
      content: `Based on the available BIS sources, I have identified the following information relevant to your stainless steel water bottle manufacturing query:

**Potentially Relevant Indian Standards**

Two primary standards appear relevant to stainless steel water bottles intended for drinking water storage:

1. **IS 14543** — This is the most directly applicable standard. It covers packaged drinking water containers including those made from stainless steel. It mandates food-grade stainless steel (Grade 304 minimum), specifies water quality parameters, and prescribes container labelling requirements.

2. **IS 15498** — This guideline specifies the requirements for stainless steel used in food contact applications. It defines permissible metal migration limits and recommends Grade 304 (1.4301) or 316 (1.4401) stainless steel for food and beverage contact.

3. **IS 6911** — The raw material specification for stainless steel sheets used in manufacturing. You may need to source material conforming to this standard.

**Certification & Regulatory Status**

The available QCO evidence indicates that **BIS certification under IS 14543 is mandatory** for packaged drinking water containers. Products must bear the BIS Standard Mark before being sold in India.

The applicable scheme is the **BIS Certification Mark Scheme (Scheme I)**, which involves factory inspection, product testing at a BIS-recognized laboratory, and grant of a licence to use the Standard Mark.

**Testing Requirements**

Key tests typically required:
- Chemical analysis of water and container material
- Microbiological testing for water quality
- Migration testing for metallic constituents
- Material composition verification

**Relevant Laboratories**

Testing can be performed at BIS-recognized or NABL-accredited laboratories. Several options are available across India with capability for IS 14543 and IS 15498 testing.

**Next Steps**

1. Confirm the applicable standard with BIS regional office
2. Ensure raw material (stainless steel) conforms to IS 6911 / IS 15498 grade requirements
3. Apply for BIS certification under IS 14543 via the BIS portal
4. Arrange product testing at a BIS-recognized laboratory`,
      grounding_status: 'SUPPORTED',
      citations: CITATIONS_STEEL_BOTTLE,
      recommendations: RECOMMENDATIONS_STEEL_BOTTLE,
      intent: 'STANDARD_RECOMMENDATION',
    };
  }

  if (lower.includes('certif') || lower.includes('mandatory') || lower.includes('qco')) {
    return {
      content: `Based on the available BIS sources:

**BIS Certification Overview**

BIS operates several certification schemes for different product categories. The primary ones relevant to manufacturers are:

1. **BIS Certification Mark Scheme (Scheme I)** — For domestic manufacturers. Involves application, factory inspection, product sample testing and grant of licence to use the BIS Standard Mark.

2. **Compulsory Registration Scheme (CRS)** — For electronic and IT products. Registration-based system where product testing is done first, followed by registration.

3. **Foreign Manufacturers Certification Scheme (FMCS)** — For importers and foreign manufacturers.

**Mandatory vs Voluntary Status**

Whether BIS certification is mandatory depends on whether a Quality Control Order (QCO) has been notified for the product by the Government of India. The system has identified QCOs for several product categories.

*Please specify your product to receive targeted information about whether certification is mandatory for your particular item.*

**Note:** The system provides guidance based on available BIS sources. Always verify with the BIS regional office for your specific product.`,
      grounding_status: 'PARTIALLY_SUPPORTED',
      citations: GENERIC_CITATIONS,
      recommendations: [],
      intent: 'CERTIFICATION',
    };
  }

  if (lower.includes('hallmark') || lower.includes('huid') || lower.includes('gold') || lower.includes('jewel')) {
    return {
      content: `Based on the available BIS hallmarking information:

**Hallmarking in India**

BIS operates the hallmarking system for gold jewellery in India. Hallmarking is the accurate determination and official recording of the precious metal content in jewellery.

**What is HUID?**

The Hallmark Unique ID (HUID) is a six-character alphanumeric code unique to every piece of hallmarked jewellery. It was introduced to provide complete traceability from the jeweller to the consumer.

**BIS Hallmark Components**
- BIS Mark (triangle with BIS logo)
- Fineness/Purity (e.g., 916 for 22-carat gold)
- Assaying and Hallmarking Centre (AHC) mark
- HUID (six-character code)

**Is Hallmarking Mandatory?**

As per BIS notification, hallmarking is mandatory for gold jewellery sold in India. Jewellers must be registered with BIS.

**Consumer Verification**

You can verify HUID authenticity using the BIS CARE mobile app or the BIS portal. This helps confirm the purity of your gold jewellery.`,
      grounding_status: 'SUPPORTED',
      citations: [{
        id: 'huid-cit-1',
        document_title: 'BIS Hallmarking Scheme — Consumer Guidance',
        document_type: 'BIS Service Document',
        page_number: 1,
        source_url: 'https://www.bis.gov.in',
        relevant_passage: 'Hallmarking is mandatory for gold jewellery and artefacts. The HUID is a unique identifier assigned to each hallmarked piece, enabling traceability and consumer verification.',
      }],
      recommendations: [],
      intent: 'HALLMARKING',
    };
  }

  if (lower.includes('lab') || lower.includes('testing') || lower.includes('where can')) {
    return {
      content: `Based on the available BIS laboratory information:

**Finding Testing Laboratories**

For BIS certification testing, you should use BIS-recognized or NABL-accredited laboratories with capability for the relevant Indian Standard.

**Types of Recognized Laboratories**
- **BIS Central Laboratories** — Operated directly by BIS
- **BIS-recognized External Laboratories** — Empanelled by BIS for specific standards
- **NABL-accredited Laboratories** — Accredited by the National Accreditation Board for Testing and Calibration Laboratories

**How to Find a Laboratory**

You can search for recognized laboratories on the BIS portal (bis.gov.in) by selecting the relevant Indian Standard number. The portal provides contact information and capability details.

*Please specify the Indian Standard number or product you need testing for, and I can provide more targeted laboratory suggestions from the available information.*`,
      grounding_status: 'PARTIALLY_SUPPORTED',
      citations: GENERIC_CITATIONS,
      recommendations: [],
      intent: 'TESTING_LAB',
    };
  }

  if (lower.includes('what is') || lower.includes('explain') || lower.includes('bis')) {
    return {
      content: `Based on the available BIS information:

**Bureau of Indian Standards (BIS)**

BIS is the National Standards Body of India, established under the BIS Act, 2016. It operates under the Ministry of Consumer Affairs, Food & Public Distribution.

**Core Functions of BIS**
- Formulation of Indian Standards
- Product Certification (BIS Mark Scheme)
- Hallmarking of precious metals
- Management of testing laboratories
- Consumer awareness and protection
- Training and information dissemination

**What BIS Sahayak Can Help With**

This assistant can help you:
- Discover relevant Indian Standards for your product
- Understand BIS certification requirements
- Find testing laboratories
- Learn about hallmarking and HUID
- Navigate consumer protection services

*Try asking: "Which standard applies to [your product]?" or "Is BIS certification mandatory for [product]?"*`,
      grounding_status: 'SUPPORTED',
      citations: GENERIC_CITATIONS,
      recommendations: [],
      intent: 'GENERAL_BIS',
    };
  }

  return {
    content: `I could not verify sufficient information from the available BIS sources to answer this specific question confidently.

**What I can tell you:**

The available BIS knowledge base covers:
- Indian Standards (IS numbers and specifications)
- BIS certification schemes and processes
- Quality Control Orders (QCOs)
- Testing laboratory information
- Hallmarking and HUID guidance
- Consumer service information

**Suggestion**

Try rephrasing your question to mention:
- A specific product or product category
- An IS number if you know it
- The type of guidance you need (certification, testing, hallmarking, etc.)

For authoritative information on this topic, please refer directly to the BIS website at **bis.gov.in** or contact your nearest BIS regional office.`,
    grounding_status: 'INSUFFICIENT',
    citations: [],
    recommendations: [],
    intent: 'UNKNOWN',
  };
}

export function getThinkingSequence(message: string): string[] {
  const intent = detectIntent(message);
  return THINKING_SEQUENCES[intent] || THINKING_SEQUENCES.general;
}

export { CITATIONS_STEEL_BOTTLE, RECOMMENDATIONS_STEEL_BOTTLE };

export const SUGGESTED_QUESTIONS = [
  'I manufacture stainless steel water bottles. Which Indian Standard applies?',
  'Is BIS certification mandatory for pressure cookers?',
  'Where can I get my product tested for IS 14543?',
  'What is hallmarking and how do I verify HUID?',
  'Which standard applies to electric water heaters?',
  'What are the BIS certification schemes available?',
  'How do I find a BIS-recognized testing laboratory?',
  'What is the difference between IS 14543 and IS 15498?',
];
