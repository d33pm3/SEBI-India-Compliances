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
const SEBI = 'https://www.sebi.gov.in';
function mockStatus(i: number): ComplianceStatus {
  if (i % 7 === 0) return 'Overdue'; if (i % 5 === 0) return 'Due Soon'; if (i % 3 === 0) return 'Completed'; if (i % 4 === 0) return 'In Progress';
  return 'Not Due';
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
type Row = [number, string, string, string, string, ComplianceNature, ObligorTier];
const rows: Row[] = [
  [1,'FINANCIAL RESULTS','Quarterly Financial Results — Unaudited Standalone & Consolidated','Reg 33(3)(a) LODR 2015','Quarterly','[P]','ALL'],
  [2,'FINANCIAL RESULTS','Annual Financial Results — Audited Standalone & Consolidated','Reg 33(3)(d) LODR 2015','Annual','[P]','ALL'],
  [3,'FINANCIAL RESULTS','CEO / CFO Certification with Financial Results','Reg 33(2)(a) LODR 2015','Quarterly / Annual','[P]','ALL'],
  [4,'FINANCIAL RESULTS','Newspaper Advertisement of Financial Results','Reg 47 LODR 2015','Quarterly / Annual','[P]','ALL'],
  [5,'FINANCIAL RESULTS','Statement of Deviation / Variation in Use of Proceeds','Reg 32(1) LODR 2015','Quarterly','[P]','ALL'],
  [6,'FINANCIAL RESULTS','Statement on Impact of Audit Qualifications','Reg 33(3)(d) LODR 2015','Annual','[P]','ALL'],
  [7,'FINANCIAL RESULTS','9M / Provisional Financial Results','LODR Reg 30','Event-based','[E]','ALL'],
  [8,'SHAREHOLDING PATTERN','Quarterly Shareholding Pattern','Reg 31(1)(b) LODR 2015','Quarterly','[P]','ALL'],
  [9,'SHAREHOLDING PATTERN','Shareholding Pattern — Capital Restructuring Trigger','Reg 31(1)(c) LODR 2015','Event-based','[E]','ALL'],
  [10,'SHAREHOLDING PATTERN','Post-Listing Shareholding Pattern','Reg 31(1)(a) LODR 2015','One-time','[A]','NEWLY-LISTED'],
  [11,'SHAREHOLDING PATTERN','Reconciliation of Share Capital Audit Report','SEBI Depositories Reg 74(5)','Quarterly','[P]','ALL'],
  [12,'SHAREHOLDING PATTERN','Promoter Reclassification','Reg 31A LODR 2015','Event-based','[E]','ALL'],
  [13,'SHAREHOLDING PATTERN','Credit of Securities in Dematerialised Form','LODR Reg 39(2)','Event-based','[E]','ALL'],
  [14,'SHAREHOLDING PATTERN','Appointment / Change of RTA','LODR Reg 7(2)','Event-based','[E]','ALL'],
  [15,'CORPORATE GOVERNANCE','Integrated Filing — Governance','Reg 27(2)(a) + Reg 13(3) LODR 2015','Quarterly','[P]','ALL'],
  [16,'CORPORATE GOVERNANCE','Annual Report including CG Report and BRSR','Reg 34 LODR 2015','Annual','[P+E]','ALL'],
  [17,'CORPORATE GOVERNANCE','Annual Secretarial Compliance Report','Reg 24A(2) LODR 2015','Annual','[P]','ALL'],
  [18,'CORPORATE GOVERNANCE','Secretarial Audit Report','Reg 24A(1) LODR 2015','Annual','[P]','ALL'],
  [19,'CORPORATE GOVERNANCE','Certificate under Reg 40(9) — Share Transfer','Reg 40(9) LODR 2015','Annual','[P]','ALL'],
  [20,'CORPORATE GOVERNANCE','Compliance Certificate — Transfer Facility Reg 7(3)','LODR Reg 7(3)','Half-yearly','[P]','ALL'],
  [21,'CORPORATE GOVERNANCE','Compliance Certificate — Depositories Reg 74(5)','SEBI Depositories Reg 74(5)','Quarterly','[P]','ALL'],
  [22,'CORPORATE GOVERNANCE','Risk Management Committee Disclosure','LODR Reg 21','Quarterly + Event-based','[P+E]','TOP 1000'],
  [23,'CORPORATE GOVERNANCE','Material Subsidiary Identification and Disclosures','LODR Reg 16(1)(c); Reg 24','Annual + Quarterly','[P+E]','ALL'],
  [24,'CORPORATE GOVERNANCE','Corporate Governance Compliance Certificate from PCS','Schedule V Para E LODR 2015','Annual','[P]','ALL'],
  [25,'RELATED PARTY TRANSACTIONS','Half-Yearly RPT Disclosure','Reg 23(9) LODR 2015','Half-yearly','[P+E]','ALL'],
  [26,'RELATED PARTY TRANSACTIONS','Material RPT — Shareholder Approval','Reg 23(1) + Reg 23(4) LODR 2015','Event-based','[E]','ALL'],
  [27,'RELATED PARTY TRANSACTIONS','Audit Committee Omnibus Approval for RPT','Reg 23(3)(d) LODR 2015','Quarterly','[P]','ALL'],
  [28,'BOARD MEETINGS','Prior Intimation of Board Meeting','Reg 29 LODR 2015','Event-based','[E]','ALL'],
  [29,'BOARD MEETINGS','Outcome of Board Meeting — Market Hours','Reg 30(6) LODR 2015','Event-based','[E]','ALL'],
  [30,'BOARD MEETINGS','Outcome of Board Meeting — After Market Hours','Reg 30(6) LODR 2015','Event-based','[E]','ALL'],
  [31,'BOARD MEETINGS','Cancellation or Postponement of Board Meeting','Reg 29(1) LODR 2015','Event-based','[E]','ALL'],
  [32,'MATERIAL EVENTS — DEEMED','Material Event Disclosure — Schedule III Part A','Reg 30 LODR 2015','Event-based','[E]','ALL'],
  [33,'MATERIAL EVENTS — POLICY-BASED','Material Event Disclosure — Schedule III Part B','Reg 30 LODR 2015','Event-based','[E]','ALL'],
  [34,'MATERIAL EVENTS — SPECIAL','Market Rumour Verification / Clarification','Reg 30A LODR 2015','Event-based','[E]','TOP 250'],
  [35,'MATERIAL EVENTS — SPECIAL','News / Media Clarification','Reg 30(11) LODR 2015','Event-based','[E]','ALL'],
  [36,'MATERIAL EVENTS — SPECIAL','Cyber Security Incident Disclosure','SEBI Circular Aug 2023; Reg 30','Event-based','[E]','ALL'],
  [37,'AGM / EGM / VOTING','Notice of AGM / EGM / Postal Ballot','Reg 30 + Reg 34(1) LODR 2015','Event-based','[E]','ALL'],
  [38,'AGM / EGM / VOTING','Newspaper Advertisement for AGM / EGM','Reg 47 LODR 2015','Event-based','[E]','ALL'],
  [39,'AGM / EGM / VOTING','Proceedings and Outcome of AGM or EGM','Reg 30 LODR 2015','Event-based','[E]','ALL'],
  [40,'AGM / EGM / VOTING','Voting Results and Scrutinizer Report','Reg 44(3) LODR 2015','Event-based','[E]','ALL'],
  [41,'AGM / EGM / VOTING','Corrigendum to AGM / EGM Notice','Reg 30 LODR 2015','Event-based','[E]','ALL'],
  [42,'DIVIDENDS / RECORD DATE','Record Date Intimation','Reg 42 LODR 2015','Event-based','[E]','ALL'],
  [43,'DIVIDENDS / RECORD DATE','Ex-Date Intimation — Corporate Actions','Reg 42 LODR 2015','Event-based','[E]','ALL'],
  [44,'DIVIDENDS / RECORD DATE','Payment of Dividend','Reg 43 + Reg 42 LODR 2015','Event-based','[E]','ALL'],
  [45,'DIVIDENDS / RECORD DATE','Intimation of Gap Between Two Record Dates','Reg 42(5) LODR 2015','Event-based','[E]','ALL'],
  [46,'DIVIDENDS / RECORD DATE','Unpaid Dividend Transfer to IEPF','Companies Act Sec 124-125','Annual','[P]','ALL'],
  [47,'INSIDER TRADING (PIT)','Trading Window Closure / Opening Intimation','SEBI PIT Reg 9; Schedule B','Event-based','[E]','ALL'],
  [48,'INSIDER TRADING (PIT)','Initial Disclosure by Promoters / Directors / DPs','SEBI PIT Reg 7(1)','Event-based','[E]','ALL'],
  [49,'INSIDER TRADING (PIT)','Continual Disclosure — Trades by Promoters / Directors / DPs','SEBI PIT Reg 7(2)','Event-based','[E]','ALL'],
  [50,'INSIDER TRADING (PIT)','Annual Disclosure — PIT Holdings as of March 31','SEBI PIT Reg 7(3)','Annual','[P]','ALL'],
  [51,'INSIDER TRADING (PIT)','Structured Digital Database Maintenance','SEBI PIT Reg 3(5)','Continuous','[A]','ALL'],
  [52,'SAST FILINGS','Event-Based Disclosure — Threshold Crossing','SEBI SAST Reg 29','Event-based','[E]','ALL'],
  [53,'SAST FILINGS','Annual Disclosure — Promoter Holdings','SEBI SAST Reg 29(2)','Annual','[P]','ALL'],
  [54,'SAST FILINGS','Annual Disclosure — 25 Percent Holders','SEBI SAST Reg 30(2)','Annual','[P]','ALL'],
  [55,'SAST FILINGS','Public Announcement for Open Offer','SEBI SAST Reg 13-15','Event-based','[E]','ALL'],
  [56,'DEBT SECURITIES','Debenture Trustee Appointment Intimation','Reg 53 + Reg 56 LODR','Event-based','[E]','DEBT-LISTED'],
  [57,'DEBT SECURITIES','Asset Cover Certificate for NCDs','Reg 56(1)(d) LODR','Half-yearly','[P]','DEBT-LISTED'],
  [58,'DEBT SECURITIES','Interest / Principal Payment Prior Intimation','Reg 52(2) + Reg 54(3) LODR','Event-based','[E]','DEBT-LISTED'],
  [59,'DEBT SECURITIES','Default in Payment of Interest / Principal','Reg 50 LODR 2015','Event-based','[E]','DEBT-LISTED'],
  [60,'DEBT SECURITIES','Record Date Intimation for Debt Securities','Reg 60(2) LODR 2015','Event-based','[E]','DEBT-LISTED'],
  [61,'DEBT SECURITIES','Certificate of Interest / Principal Payment','Reg 57(1) LODR','Event-based','[E]','DEBT-LISTED'],
  [62,'DEBT SECURITIES','Credit Rating Action on Listed Debt','Reg 64 + Reg 30 LODR 2015','Annual + Event-based','[P+E]','DEBT-LISTED'],
  [63,'CAPITAL ACTIONS','Buyback Public Announcement','SEBI Buyback Regulations 2018','Event-based','[E]','ALL'],
  [64,'CAPITAL ACTIONS','Rights Issue Filing','SEBI ICDR Reg 2018','Event-based','[E]','ALL'],
  [65,'CAPITAL ACTIONS','Preferential Allotment Filing','SEBI ICDR Reg 2018 Ch VI','Event-based','[E]','ALL'],
  [66,'CAPITAL ACTIONS','QIP Filing','SEBI ICDR Reg 2018 Ch VII','Event-based','[E]','ALL'],
  [67,'CAPITAL ACTIONS','ESOP / ESOS / SAR Annual Disclosure','SEBI SBEB Reg 2021 Reg 14','Annual','[P]','ALL'],
  [68,'CAPITAL ACTIONS','Offer for Sale T-1 Intimation','SEBI OFS Framework','Event-based','[E]','ALL'],
  [69,'CAPITAL ACTIONS','NCRPS Issuance Filing','SEBI NCS Reg 2021','Event-based','[E]','DEBT-LISTED'],
  [70,'CAPITAL ACTIONS','Commercial Paper Issuance and Listing','SEBI NCS Reg 2021','Event-based','[E]','ALL'],
  [71,'CAPITAL ACTIONS','Delisting of Securities','SEBI Delisting Reg 2021','Event-based','[E]','ALL'],
  [72,'INVESTOR GRIEVANCES','Investor Grievances Statement','Reg 13(3) LODR 2015','Quarterly','[P]','ALL'],
  [73,'ESG / SUSTAINABILITY','BRSR','Reg 34(2)(f) LODR 2015','Annual','[P]','TOP 1000'],
  [74,'ESG / SUSTAINABILITY','BRSR Core with Third-Party Assurance','SEBI Circular Jul 2023','Annual','[P]','TOP 1000'],
  [75,'ESG / SUSTAINABILITY','ESG Rating Disclosure','Reg 30 LODR','Event-based','[E]','ALL'],
  [76,'DIRECTORS / KMP','Change in Directors / KMP / Compliance Officer','Reg 30 + Sch III Part A LODR','Event-based','[E]','ALL'],
  [77,'DIRECTORS / KMP','Shareholder Approval for Director Appointment','Reg 17(1C) LODR','Event-based','[E]','ALL'],
  [78,'DIRECTORS / KMP','Appointment or Change of Statutory Auditor','Reg 30 + Sch III LODR','Event-based','[E]','ALL'],
  [79,'DIRECTORS / KMP','Separation of Chairperson and MD/CEO','Reg 17(1B) LODR 2015','Annual + Event-based','[P+E]','TOP 1000'],
  [80,'DIRECTORS / KMP','Filling Vacancy in Board Committees','Reg 18(1), 19, 20, 21 LODR','Event-based','[E]','ALL'],
  [81,'WEBSITE DISCLOSURES','Website Disclosures under Reg 46','Reg 46 LODR 2015','Continuous','[A]','ALL'],
  [82,'WEBSITE DISCLOSURES','Commencement of Commercial Operations Disclosure','Reg 30 Sch III Part A','One-time','[A]','NEWLY-LISTED'],
  [83,'WEBSITE DISCLOSURES','Change in Website / Email / Registered Office','Reg 30 + Reg 46(2)(a) LODR','Event-based','[E]','ALL'],
  [84,'WEBSITE DISCLOSURES','Analyst / Investor Meet Disclosure','Reg 30 + Sch III Part A Para 15','Event-based','[E]','ALL'],
  [85,'SEBI / MCA FILINGS','Annual Return MGT-7 / MGT-7A','Companies Act 2013 Sec 92','Annual','[P]','ALL'],
  [86,'SEBI / MCA FILINGS','Director KYC DIR-3 KYC','Companies Directors Rules 2014','Annual','[P]','ALL'],
  [87,'SEBI / MCA FILINGS','Benpos Report to Exchange','SEBI Benpos Circular','Monthly','[P]','ALL'],
  [88,'SEBI / MCA FILINGS','Annual Statement of Compliance','Reg 14 LODR 2015','Annual','[P]','ALL'],
  [89,'SEBI / MCA FILINGS','Reporting of Large Exposures / Defaults','Reg 50 LODR 2015','Event-based','[E]','ALL'],
  [90,'SEBI / MCA FILINGS','Scheme of Arrangement Filing','Reg 37 LODR','Event-based','[E]','ALL'],
  [91,'SEBI / MCA FILINGS','Large Corporate Annual Borrowing Disclosure','SEBI LC Circular 2018','Annual + Event-based','[P+E]','LARGE-CORPORATE'],
  [92,'SEBI / MCA FILINGS','HVDLE Reclassification','LODR Reg 15(1A) + Reg 62C(1)','One-time + Annual','[E]','HVDLE'],
  [93,'POST-LISTING FILINGS','Dematerialisation Mandatory for Transfer','LODR Reg 40(2)/40(3)','Event-based','[E]','ALL']
];
export const complianceItems: ComplianceItem[] = rows.map((r, i) => {
  const status = mockStatus(i);
  return {
    id: r[0], sNo: r[0], category: r[1], filingName: r[2], regReference: r[3],
    applicableTo: r[6] === 'ALL' ? 'All equity-listed entities' : 'Entities in the stated obligor tier',
    filingAuthority: 'NSE / BSE', frequency: r[4], trigger: r[4].toLowerCase().includes('event') ? 'Specified corporate event' : 'End of the reporting period',
    timeline: 'As prescribed under the cited regulation', format: 'Exchange filing', penalty: 'Reg 91 LODR',
    sourceUrl: SEBI, complianceNature: r[5], obligorTier: r[6], dueDate: mockDueDate(i), status,
    riskLevel: mockRisk(r[5], r[4], i), owner: owners[i % owners.length], approver: approvers[i % approvers.length],
    approvalStatus: mockApprovalStatus(status, i), comments: [] as Comment[], evidenceUploaded: status === 'Completed',
  };
});
export const categories = [...new Set(complianceItems.map(i => i.category))];
