export type ComplianceNature = '[P]' | '[E]' | '[P+E]' | '[A]';
export type ObligorTier = 'ALL' | 'TOP 1000' | 'TOP 500' | 'TOP 250' | 'TOP 100' | 'DEBT-LISTED' | 'HVDLE' | 'NEWLY-LISTED' | 'LARGE-CORPORATE';
export type RiskLevel = 'Critical' | 'High' | 'Medium' | 'Low';
export type ComplianceStatus = 'Completed' | 'Due Soon' | 'Overdue' | 'Not Due' | 'In Progress' | 'Not Started';
export type ApprovalStatus = 'Approved' | 'Pending' | 'Doc Missing' | 'Rejected' | 'Not Started';
export interface Comment { id: string; author: string; text: string; timestamp: string; }
export interface ComplianceItem {
  id: number; sNo: number; category: string; filingName: string; regReference: string; applicableTo: string;
  filingAuthority: string; frequency: string; trigger: string; timeline: string; format: string; penalty: string;
  sourceUrl: string; complianceNature: ComplianceNature; obligorTier: ObligorTier; dueDate: string; status: ComplianceStatus;
  riskLevel: RiskLevel; owner: string; approver: string; approvalStatus: ApprovalStatus; comments: Comment[]; evidenceUploaded: boolean;
}
const owners = ['Priya Sharma (CS)', 'Rajesh Kumar (CFO)', 'Anita Desai (Legal)', 'Vikram Singh (Compliance)', 'Neha Patel (Finance)', 'Amit Joshi (Secretarial)'];
const approvers = ['Suresh Mehta (Director)', 'Kavita Rao (Audit Chair)', 'Deepak Gupta (MD)', 'Ritu Agarwal (ID)'];
function mockStatus(i: number): ComplianceStatus {
  const statuses: ComplianceStatus[] = ['Completed', 'Due Soon', 'Overdue', 'Not Due', 'In Progress', 'Not Started'];
  if (i % 7 === 0) return 'Overdue'; if (i % 5 === 0) return 'Due Soon'; if (i % 3 === 0) return 'Completed'; if (i % 4 === 0) return 'In Progress';
  return statuses[i % statuses.length];
}
function mockRisk(nature: ComplianceNature, freq: string, i: number): RiskLevel {
  if (nature === '[E]' && freq.toLowerCase().includes('event')) return i % 3 === 0 ? 'Critical' : 'High';
  if (nature === '[P+E]') return 'High';
  if (freq.toLowerCase().includes('quarter')) return 'Medium';
  return 'Low';
}
function mockDueDate(i: number): string { const d = new Date(2026, 3, 1); d.setDate(d.getDate() + ((i * 7) % 180)); return d.toISOString().split('T')[0]; }
function mockApprovalStatus(status: ComplianceStatus, i: number): ApprovalStatus {
  if (status === 'Completed') return 'Approved';
  if (status === 'Overdue') return i % 2 === 0 ? 'Doc Missing' : 'Not Started';
  if (status === 'In Progress') return 'Pending';
  if (status === 'Due Soon') return i % 3 === 0 ? 'Pending' : 'Not Started';
  return 'Not Started';
}
type Raw = Omit<ComplianceItem, 'id' | 'dueDate' | 'status' | 'riskLevel' | 'owner' | 'approver' | 'approvalStatus' | 'comments' | 'evidenceUploaded'>;
const rawItems: Raw[] = [
  { sNo: 1, category: 'FINANCIAL RESULTS', filingName: 'Quarterly Financial Results — Unaudited Standalone & Consolidated', regReference: 'Reg 33(3)(a) LODR 2015', applicableTo: 'All equity-listed entities', filingAuthority: 'NSE / BSE', frequency: 'Quarterly', trigger: 'End of each quarter', timeline: '45 days of Q1-Q3; 60 days of Q4', format: 'XBRL + PDF', penalty: 'Reg 91 LODR', sourceUrl: 'https://www.sebi.gov.in', complianceNature: '[P]', obligorTier: 'ALL' },
  { sNo: 2, category: 'FINANCIAL RESULTS', filingName: 'Annual Financial Results — Audited Standalone & Consolidated', regReference: 'Reg 33(3)(d) LODR 2015', applicableTo: 'All equity-listed entities', filingAuthority: 'NSE / BSE', frequency: 'Annual', trigger: 'End of financial year', timeline: 'Within 60 days of FY end', format: 'XBRL + PDF; Audited', penalty: 'Reg 91 LODR', sourceUrl: 'https://www.sebi.gov.in', complianceNature: '[P]', obligorTier: 'ALL' },
  { sNo: 3, category: 'FINANCIAL RESULTS', filingName: 'CEO / CFO Certification with Financial Results', regReference: 'Reg 33(2)(a) LODR 2015', applicableTo: 'All equity-listed entities', filingAuthority: 'NSE / BSE', frequency: 'Quarterly / Annual', trigger: 'With each set of results', timeline: 'Along with results', format: 'Prescribed certificate', penalty: 'Reg 91 LODR', sourceUrl: 'https://www.sebi.gov.in', complianceNature: '[P]', obligorTier: 'ALL' },
  { sNo: 4, category: 'FINANCIAL RESULTS', filingName: 'Newspaper Advertisement of Financial Results', regReference: 'Reg 47 LODR 2015', applicableTo: 'All equity-listed entities', filingAuthority: 'NSE/BSE + Newspaper', frequency: 'Quarterly / Annual', trigger: 'Filing of results', timeline: 'Within 48 hours of filing', format: 'English + regional daily', penalty: 'Reg 91 LODR', sourceUrl: 'https://www.sebi.gov.in', complianceNature: '[P]', obligorTier: 'ALL' },
  { sNo: 5, category: 'FINANCIAL RESULTS', filingName: 'Statement of Deviation / Variation in Use of Proceeds', regReference: 'Reg 32(1) LODR 2015', applicableTo: 'Entities with undeployed proceeds', filingAuthority: 'NSE / BSE', frequency: 'Quarterly', trigger: 'End of quarter until utilised', timeline: 'With quarterly results', format: 'XBRL + PDF', penalty: 'Reg 91 LODR', sourceUrl: 'https://www.sebi.gov.in', complianceNature: '[P]', obligorTier: 'ALL' },
  { sNo: 6, category: 'FINANCIAL RESULTS', filingName: 'Statement on Impact of Audit Qualifications', regReference: 'Reg 33(3)(d) LODR 2015', applicableTo: 'All listed entities', filingAuthority: 'NSE / BSE', frequency: 'Annual', trigger: 'Qualified audit opinion', timeline: 'Within 60 days of FY end', format: 'Form A / Form B', penalty: 'Reg 91 LODR', sourceUrl: 'https://www.sebi.gov.in', complianceNature: '[P]', obligorTier: 'ALL' },
  { sNo: 7, category: 'FINANCIAL RESULTS', filingName: '9M / Provisional Financial Results', regReference: 'LODR Reg 30', applicableTo: 'Voluntary disclosers', filingAuthority: 'NSE / BSE', frequency: 'Event-based', trigger: 'Decision to disclose', timeline: 'Simultaneous exchange filing', format: 'Exchange disclosure', penalty: 'Reg 91 if misleading', sourceUrl: 'https://www.sebi.gov.in', complianceNature: '[E]', obligorTier: 'ALL' },
  { sNo: 8, category: 'SHAREHOLDING PATTERN', filingName: 'Quarterly Shareholding Pattern', regReference: 'Reg 31(1)(b) LODR 2015', applicableTo: 'All equity-listed entities', filingAuthority: 'NSE / BSE', frequency: 'Quarterly', trigger: 'End of each quarter', timeline: 'Within 21 days of quarter end', format: 'XBRL', penalty: 'Reg 91 LODR', sourceUrl: 'https://www.sebi.gov.in', complianceNature: '[P]', obligorTier: 'ALL' },
  { sNo: 9, category: 'SHAREHOLDING PATTERN', filingName: 'Shareholding Pattern — Capital Restructuring >2%', regReference: 'Reg 31(1)(c) LODR 2015', applicableTo: 'All equity-listed entities', filingAuthority: 'NSE / BSE', frequency: 'Event-based', trigger: 'Capital restructuring >2%', timeline: 'Within 10 days', format: 'XBRL', penalty: 'Reg 91 LODR', sourceUrl: 'https://www.sebi.gov.in', complianceNature: '[E]', obligorTier: 'ALL' },
  { sNo: 10, category: 'SHAREHOLDING PATTERN', filingName: 'Post-Listing Shareholding Pattern', regReference: 'Reg 31(1)(a) LODR 2015', applicableTo: 'Newly listed entities', filingAuthority: 'NSE / BSE', frequency: 'One-time', trigger: 'Listing of securities', timeline: '1 WD prior to listing', format: 'XBRL', penalty: 'Reg 91 LODR', sourceUrl: 'https://www.sebi.gov.in', complianceNature: '[A]', obligorTier: 'NEWLY-LISTED' },
  { sNo: 11, category: 'SHAREHOLDING PATTERN', filingName: 'Reconciliation of Share Capital Audit Report', regReference: 'SEBI Depositories Reg 74(5)', applicableTo: 'All equity-listed entities', filingAuthority: 'NSE / BSE', frequency: 'Quarterly', trigger: 'End of each quarter', timeline: 'Within 30 days', format: 'PCS certificate', penalty: 'Reg 91 LODR', sourceUrl: 'https://www.sebi.gov.in', complianceNature: '[P]', obligorTier: 'ALL' },
  { sNo: 12, category: 'SHAREHOLDING PATTERN', filingName: 'Promoter Reclassification', regReference: 'Reg 31A LODR 2015', applicableTo: 'Entities with promoter reclassification', filingAuthority: 'NSE / BSE', frequency: 'Event-based', trigger: 'Promoter seeks reclassification', timeline: 'Immediate; GM approval', format: 'Structured intimation', penalty: 'Reg 91 LODR', sourceUrl: 'https://www.sebi.gov.in', complianceNature: '[E]', obligorTier: 'ALL' },
  { sNo: 13, category: 'SHAREHOLDING PATTERN', filingName: 'Credit of Securities in Demat Form', regReference: 'LODR Reg 39(2)', applicableTo: 'All listed entities', filingAuthority: 'NSE / BSE', frequency: 'Event-based', trigger: 'Investor service request', timeline: 'Within 30 days', format: 'Demat credit', penalty: 'Reg 91 LODR', sourceUrl: 'https://www.sebi.gov.in', complianceNature: '[E]', obligorTier: 'ALL' },
  { sNo: 14, category: 'SHAREHOLDING PATTERN', filingName: 'Appointment / Change of RTA', regReference: 'LODR Reg 7(2)', applicableTo: 'All listed entities', filingAuthority: 'NSE / BSE', frequency: 'Event-based', trigger: 'RTA change', timeline: 'Within 7 days', format: 'Tripartite agreement', penalty: 'Reg 91 LODR', sourceUrl: 'https://www.sebi.gov.in', complianceNature: '[E]', obligorTier: 'ALL' },
  { sNo: 15, category: 'CORPORATE GOVERNANCE', filingName: 'Integrated Filing — Governance', regReference: 'Reg 27(2)(a) + Reg 13(3) LODR 2015', applicableTo: 'All equity-listed entities', filingAuthority: 'NSE / BSE', frequency: 'Quarterly', trigger: 'End of each quarter', timeline: 'Within 30 days', format: 'XBRL', penalty: 'Reg 91 LODR', sourceUrl: 'https://www.sebi.gov.in', complianceNature: '[P]', obligorTier: 'ALL' },
  { sNo: 16, category: 'CORPORATE GOVERNANCE', filingName: 'Annual Report including CG Report and BRSR', regReference: 'Reg 34 LODR 2015', applicableTo: 'All equity-listed entities', filingAuthority: 'NSE / BSE', frequency: 'Annual', trigger: 'End of financial year', timeline: 'Same day as shareholder dispatch', format: 'Digital AR + XBRL', penalty: 'Reg 91 LODR', sourceUrl: 'https://www.sebi.gov.in', complianceNature: '[P+E]', obligorTier: 'ALL' },
  { sNo: 17, category: 'CORPORATE GOVERNANCE', filingName: 'Annual Secretarial Compliance Report', regReference: 'Reg 24A(2) LODR 2015', applicableTo: 'All equity-listed entities', filingAuthority: 'NSE / BSE', frequency: 'Annual', trigger: 'End of financial year', timeline: 'Within 60 days of FY end', format: 'SEBI format; peer-reviewed PCS', penalty: 'Reg 91 LODR', sourceUrl: 'https://www.sebi.gov.in', complianceNature: '[P]', obligorTier: 'ALL' },
  { sNo: 18, category: 'CORPORATE GOVERNANCE', filingName: 'Secretarial Audit Report', regReference: 'Reg 24A(1) LODR 2015', applicableTo: 'Listed entities and material subsidiaries', filingAuthority: 'NSE / BSE', frequency: 'Annual', trigger: 'End of financial year', timeline: 'Annexed to Annual Report', format: 'MR-3', penalty: 'Reg 91 LODR', sourceUrl: 'https://www.sebi.gov.in', complianceNature: '[P]', obligorTier: 'ALL' },
  { sNo: 19, category: 'CORPORATE GOVERNANCE', filingName: 'Certificate under Reg 40(9) — Share Transfer', regReference: 'Reg 40(9) LODR 2015', applicableTo: 'All equity-listed entities', filingAuthority: 'NSE / BSE', frequency: 'Annual', trigger: 'End of financial year', timeline: 'By 30 April', format: 'PCS certificate', penalty: 'Reg 91 LODR', sourceUrl: 'https://www.sebi.gov.in', complianceNature: '[P]', obligorTier: 'ALL' },
  { sNo: 20, category: 'CORPORATE GOVERNANCE', filingName: 'Compliance Certificate — Transfer Facility Reg 7(3)', regReference: 'LODR Reg 7(3)', applicableTo: 'All listed entities', filingAuthority: 'NSE / BSE', frequency: 'Half-yearly', trigger: 'End of each half-year', timeline: 'Within 1 month', format: 'CO + RTA certificate', penalty: 'Reg 91 LODR', sourceUrl: 'https://www.sebi.gov.in', complianceNature: '[P]', obligorTier: 'ALL' },
];
export const complianceItems: ComplianceItem[] = rawItems.map((item, i) => ({
  ...item, id: item.sNo, dueDate: mockDueDate(i), status: mockStatus(i),
  riskLevel: mockRisk(item.complianceNature, item.frequency, i), owner: owners[i % owners.length],
  approver: approvers[i % approvers.length], approvalStatus: mockApprovalStatus(mockStatus(i), i),
  comments: [] as Comment[], evidenceUploaded: mockStatus(i) === 'Completed',
}));
export const categories = [...new Set(complianceItems.map(i => i.category))];
