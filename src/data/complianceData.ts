export type ComplianceNature = '[P]' | '[E]' | '[P+E]' | '[A]';
export type ObligorTier = 'ALL' | 'TOP 1000' | 'TOP 500' | 'TOP 250' | 'TOP 100' | 'DEBT-LISTED' | 'HVDLE' | 'NEWLY-LISTED' | 'LARGE-CORPORATE';
export type RiskLevel = 'Critical' | 'High' | 'Medium' | 'Low';
export type ComplianceStatus = 'Completed' | 'Due Soon' | 'Overdue' | 'Not Due' | 'In Progress' | 'Not Started';
export type ApprovalStatus = 'Approved' | 'Pending' | 'Doc Missing' | 'Rejected' | 'Not Started';

export interface ComplianceItem {
  id: number;
  sNo: number;
  category: string;
  filingName: string;
  regReference: string;
  applicableTo: string;
  filingAuthority: string;
  frequency: string;
  trigger: string;
  timeline: string;
  format: string;
  penalty: string;
  sourceUrl: string;
  complianceNature: ComplianceNature;
  obligorTier: ObligorTier;
  dueDate: string;
  status: ComplianceStatus;
  riskLevel: RiskLevel;
  owner: string;
  approver: string;
  approvalStatus: ApprovalStatus;
  comments: Comment[];
  evidenceUploaded: boolean;
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

const owners = ['Priya Sharma (CS)', 'Rajesh Kumar (CFO)', 'Anita Desai (Legal)', 'Vikram Singh (Compliance)', 'Neha Patel (Finance)', 'Amit Joshi (Secretarial)'];
const approvers = ['Suresh Mehta (Director)', 'Kavita Rao (Audit Chair)', 'Deepak Gupta (MD)', 'Ritu Agarwal (ID)'];

function mockStatus(i: number): ComplianceStatus {
  const statuses: ComplianceStatus[] = ['Completed', 'Due Soon', 'Overdue', 'Not Due', 'In Progress', 'Not Started'];
  if (i % 7 === 0) return 'Overdue';
  if (i % 5 === 0) return 'Due Soon';
  if (i % 3 === 0) return 'Completed';
  if (i % 4 === 0) return 'In Progress';
  return statuses[i % statuses.length];
}

function mockRisk(nature: ComplianceNature, freq: string, i: number): RiskLevel {
  if (nature === '[E]' && freq.toLowerCase().includes('event')) return i % 3 === 0 ? 'Critical' : 'High';
  if (nature === '[P+E]') return 'High';
  if (freq.toLowerCase().includes('quarter')) return 'Medium';
  return 'Low';
}

function mockDueDate(i: number): string {
  const base = new Date(2026, 3, 1);
  const offset = (i * 7) % 180;
  const d = new Date(base);
  d.setDate(d.getDate() + offset);
  return d.toISOString().split('T')[0];
}

function mockApprovalStatus(status: ComplianceStatus, i: number): ApprovalStatus {
  if (status === 'Completed') return 'Approved';
  if (status === 'Overdue') return i % 2 === 0 ? 'Doc Missing' : 'Not Started';
  if (status === 'In Progress') return 'Pending';
  if (status === 'Due Soon') return i % 3 === 0 ? 'Pending' : 'Not Started';
  return 'Not Started';
}

const rawItems: Array<Omit<ComplianceItem, 'id' | 'dueDate' | 'status' | 'riskLevel' | 'owner' | 'approver' | 'approvalStatus' | 'comments' | 'evidenceUploaded'>> = [
  { sNo: 1, category: 'FINANCIAL RESULTS', filingName: 'Quarterly Financial Results — Unaudited Standalone & Consolidated', regReference: 'Reg 33(3)(a) LODR 2015', applicableTo: 'All equity-listed entities', filingAuthority: 'NSE / BSE', frequency: 'Quarterly', trigger: 'End of each quarter', timeline: 'Within 45 days of end of Q1/Q2/Q3; within 60 days of Q4', format: 'XBRL + PDF; CEO/CFO certification required', penalty: 'Reg 91 LODR — fine up to ₹1 crore + ₹1,000/day', sourceUrl: 'https://www.sebi.gov.in', complianceNature: '[P]', obligorTier: 'ALL' },
  { sNo: 2, category: 'FINANCIAL RESULTS', filingName: 'Annual Financial Results — Audited Standalone & Consolidated', regReference: 'Reg 33(3)(d) LODR 2015', applicableTo: 'All equity-listed entities', filingAuthority: 'NSE / BSE', frequency: 'Annual', trigger: 'End of financial year (March 31)', timeline: 'Within 60 days of end of financial year', format: 'XBRL + PDF; Audited; Signed by CEO/CFO', penalty: 'Reg 91 LODR — fine up to ₹1 crore + ₹1,000/day', sourceUrl: 'https://www.sebi.gov.in', complianceNature: '[P]', obligorTier: 'ALL' },
  { sNo: 3, category: 'FINANCIAL RESULTS', filingName: 'CEO / CFO Certification (with each set of Financial Results)', regReference: 'Reg 33(2)(a) LODR 2015', applicableTo: 'All equity-listed entities', filingAuthority: 'NSE / BSE', frequency: 'Quarterly / Annual', trigger: 'With each set of financial results', timeline: 'Along with financial results (within 45/60 days)', format: 'Prescribed certificate format; signed by CEO AND CFO', penalty: 'Reg 91 LODR — fine up to ₹1 crore + ₹1,000/day', sourceUrl: 'https://www.sebi.gov.in', complianceNature: '[P]', obligorTier: 'ALL' },
  { sNo: 4, category: 'FINANCIAL RESULTS', filingName: 'Newspaper Advertisement of Financial Results', regReference: 'Reg 47 LODR 2015', applicableTo: 'All equity-listed entities', filingAuthority: 'NSE/BSE + Newspaper', frequency: 'Quarterly / Annual', trigger: 'Filing of financial results with stock exchange', timeline: 'Within 48 hours of filing results', format: 'Published in English national daily + regional language daily', penalty: 'Reg 91 LODR fine', sourceUrl: 'https://www.sebi.gov.in', complianceNature: '[P]', obligorTier: 'ALL' },
  { sNo: 5, category: 'FINANCIAL RESULTS', filingName: 'Statement of Deviation / Variation in Use of Proceeds', regReference: 'Reg 32(1) LODR 2015', applicableTo: 'Listed entities with undeployed capital proceeds', filingAuthority: 'NSE / BSE', frequency: 'Quarterly', trigger: 'End of each quarter until proceeds fully utilised', timeline: 'With quarterly financial results (within 45/60 days)', format: 'XBRL + PDF; Audit Committee review mandatory', penalty: 'Reg 91 LODR — fine up to ₹1 crore + ₹1,000/day', sourceUrl: 'https://www.sebi.gov.in', complianceNature: '[P]', obligorTier: 'ALL' },
  { sNo: 6, category: 'FINANCIAL RESULTS', filingName: 'Statement on Impact of Audit Qualifications (Form A / Form B)', regReference: 'Reg 33(3)(d) LODR 2015; SEBI Circular 2016', applicableTo: 'All listed entities', filingAuthority: 'NSE / BSE', frequency: 'Annual', trigger: 'Annual audit report carrying qualified opinion', timeline: 'Within 60 days of FY end', format: 'Form A (unmodified) or Form B (qualified)', penalty: 'Reg 91; SEBI scrutiny', sourceUrl: 'https://www.sebi.gov.in', complianceNature: '[P]', obligorTier: 'ALL' },
  { sNo: 7, category: 'FINANCIAL RESULTS', filingName: '9M / Provisional Financial Results (Voluntary Disclosure)', regReference: 'LODR Reg 30', applicableTo: 'Listed entities choosing voluntary disclosure', filingAuthority: 'NSE / BSE', frequency: 'Event-based', trigger: 'Company decision to disclose provisional results', timeline: 'Simultaneously on exchange portal', format: 'Free-form exchange disclosure; labelled provisional', penalty: 'Reg 91 if misleading', sourceUrl: 'https://www.sebi.gov.in', complianceNature: '[E]', obligorTier: 'ALL' },
  { sNo: 8, category: 'SHAREHOLDING PATTERN', filingName: 'Quarterly Shareholding Pattern', regReference: 'Reg 31(1)(b) LODR 2015', applicableTo: 'All equity-listed entities', filingAuthority: 'NSE / BSE', frequency: 'Quarterly', trigger: 'End of each quarter', timeline: 'Within 21 days of end of each quarter', format: 'XBRL format; PAN-based consolidation', penalty: 'Reg 91 LODR — fine up to ₹1 crore + ₹1,000/day', sourceUrl: 'https://www.sebi.gov.in', complianceNature: '[P]', obligorTier: 'ALL' },
];

export const complianceItems: ComplianceItem[] = rawItems.map((item, i) => ({
  ...item,
  id: item.sNo,
  dueDate: mockDueDate(i),
  status: mockStatus(i),
  riskLevel: mockRisk(item.complianceNature, item.frequency, i),
  owner: owners[i % owners.length],
  approver: approvers[i % approvers.length],
  approvalStatus: mockApprovalStatus(mockStatus(i), i),
  comments: [] as Comment[],
  evidenceUploaded: mockStatus(i) === 'Completed',
}));

export const categories = [...new Set(complianceItems.map(i => i.category))];
