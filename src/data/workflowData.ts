import { ComplianceItem, RiskLevel } from '@/data/complianceData';

export interface FilingSubmission {
  id: string; itemId: number; filingName: string; category: string; referenceNo: string;
  filingDate: string; submittedBy: string; approver: string;
  approvalStatus: 'Pending' | 'Approved' | 'Rejected'; approvedOn: string | null;
  documents: string[]; remarks: string; vaultId: string;
}

export type TaskStatus = 'Open' | 'In Progress' | 'Blocked' | 'Done';
export interface ComplianceTask {
  id: string; itemId: number; title: string; owner: string; deadline: string; status: TaskStatus; createdAt: string;
}

const taskTemplateByStatus: Record<string, string> = {
  Completed: 'Archive filed papers and close the compliance file',
  Overdue: 'Escalate and file immediately — deadline breached',
  'Due Soon': 'Prepare draft filing and obtain approver sign-off',
  'In Progress': 'Complete the draft and upload supporting evidence',
  'Not Started': 'Collect supporting data and start the filing',
  'Not Due': 'Track the deadline and gather supporting data',
};

export function taskStatusForItem(item: ComplianceItem): TaskStatus {
  switch (item.status) {
    case 'Completed': return 'Done';
    case 'Overdue': return 'Blocked';
    case 'Due Soon':
    case 'In Progress': return 'In Progress';
    default: return 'Open';
  }
}
export function taskTitleForItem(item: ComplianceItem): string {
  return taskTemplateByStatus[item.status] ?? 'Complete the compliance obligation';
}
export function seedTasks(items: ComplianceItem[]): ComplianceTask[] {
  return items.map(item => ({
    id: `T-${item.id}`, itemId: item.id, title: taskTitleForItem(item),
    owner: item.owner, deadline: item.dueDate, status: taskStatusForItem(item), createdAt: '2026-04-01',
  }));
}

export type NoticeResponseStatus = 'Awaiting Response' | 'Drafting' | 'Submitted' | 'Closed';
export interface NoticeResponse {
  noticeId: string; noticeNo: string; subject: string; issuedBy: string; regulation: string;
  receivedOn: string; responseDue: string; responseStatus: NoticeResponseStatus;
  responseDate: string | null; submittedDocuments: string[]; owner: string; remarks: string;
  riskStatus: 'Open' | 'Mitigating' | 'Closed';
  noticeType?: string; referenceOfficer?: string; background?: string;
  allegations?: string[]; informationSought?: string[]; penaltyExposure?: string;
  internalActions?: { date: string; action: string; by: string }[];
  correspondence?: { date: string; direction: 'Received' | 'Sent'; document: string }[];
}

export const noticeResponses: NoticeResponse[] = [
  {
    noticeId: '11', noticeNo: 'SEBI/CFD/2026/0341',
    subject: 'Show Cause Notice — Non-submission of Corporate Governance Report Q2',
    issuedBy: 'SEBI', regulation: 'LODR Reg 27', receivedOn: '2026-03-05', responseDue: '2026-03-20',
    responseStatus: 'Submitted', responseDate: '2026-03-18',
    submittedDocuments: ['Reply to SCN dated 18 Mar 2026.pdf', 'Corporate Governance Report Q2.pdf'],
    owner: 'Priya Sharma (CS)', remarks: 'Reply filed within timeline; awaiting SEBI acknowledgement.',
    riskStatus: 'Mitigating', noticeType: 'Show Cause Notice',
  },
  {
    noticeId: '12', noticeNo: 'SEBI/ISD/2026/0198',
    subject: 'Inquiry — Insider Trading Allegation',
    issuedBy: 'SEBI', regulation: 'PIT Reg 3', receivedOn: '2026-04-02', responseDue: '2026-04-25',
    responseStatus: 'Drafting', responseDate: null, submittedDocuments: [],
    owner: 'Anita Desai (Legal)', remarks: 'Legal counsel engaged; trading window records under compilation.',
    riskStatus: 'Open', noticeType: 'Inquiry',
  },
  {
    noticeId: '13', noticeNo: 'NSE/LIST/2026/0412',
    subject: 'Penalty Notice — Late Filing of Shareholding Pattern',
    issuedBy: 'NSE', regulation: 'LODR Reg 31', receivedOn: '2026-02-18', responseDue: '2026-03-05',
    responseStatus: 'Closed', responseDate: '2026-02-28',
    submittedDocuments: ['Penalty payment challan.pdf', 'Explanation letter.pdf'],
    owner: 'Rajesh Kumar (CFO)', remarks: 'Fine paid; exchange confirmed closure.',
    riskStatus: 'Closed', noticeType: 'Penalty Notice',
  },
  {
    noticeId: '14', noticeNo: 'BSE/CORP/2026/0087',
    subject: 'Advisory — New XBRL Filing Format',
    issuedBy: 'BSE', regulation: 'LODR Reg 33', receivedOn: '2026-04-10', responseDue: '2026-05-01',
    responseStatus: 'Awaiting Response', responseDate: null, submittedDocuments: [],
    owner: 'Vikram Singh (Compliance)', remarks: 'Confirmation of readiness to be filed on the exchange portal.',
    riskStatus: 'Open', noticeType: 'Advisory',
  },
];

export interface NoticeRiskItem {
  id: string; noticeId: string; noticeNo: string; subject: string; source: string; regulation: string;
  riskLevel: 'Critical' | 'High' | 'Medium' | 'Low'; riskStatus: 'Open' | 'Mitigating' | 'Closed';
  deadline: string; owner: string; responseStatus: NoticeResponseStatus; daysToDeadline: number;
}
export function buildNoticeRisks(responses: NoticeResponse[], today = new Date()): NoticeRiskItem[] {
  return responses.map(n => {
    const days = Math.ceil((new Date(n.responseDue).getTime() - today.getTime()) / 86400000);
    const riskLevel: NoticeRiskItem['riskLevel'] =
      n.riskStatus === 'Closed' ? 'Low' : days < 0 ? 'Critical' : n.responseStatus === 'Submitted' ? 'Medium' : 'High';
    return {
      id: `RISK-NOTICE-${n.noticeNo.replace(/[^A-Za-z0-9]/g, '-')}`,
      noticeId: n.noticeId, noticeNo: n.noticeNo, subject: n.subject, source: n.issuedBy,
      regulation: n.regulation, riskLevel, riskStatus: n.riskStatus, deadline: n.responseDue,
      owner: n.owner, responseStatus: n.responseStatus, daysToDeadline: days,
    };
  });
}

export type ComplianceState = 'Completed' | 'Overdue' | 'Documents Missing' | 'On Track';
export function deriveComplianceState(item: ComplianceItem): ComplianceState {
  if (item.status === 'Completed') return 'Completed';
  if (item.status === 'Overdue') return 'Overdue';
  if (item.approvalStatus === 'Doc Missing' || !item.evidenceUploaded) return 'Documents Missing';
  return 'On Track';
}
export function effectiveRiskLevel(item: ComplianceItem): RiskLevel {
  if (item.status === 'Overdue') return 'Critical';
  if (item.approvalStatus === 'Doc Missing') return 'High';
  return item.riskLevel;
}
export function riskReasons(item: ComplianceItem): string[] {
  const reasons: string[] = [];
  if (item.status === 'Overdue') reasons.push(`Past its due date of ${item.dueDate}`);
  if (item.approvalStatus === 'Doc Missing') reasons.push('Supporting documents have not been provided');
  if (!item.evidenceUploaded) reasons.push('No evidence uploaded to the Document Vault');
  if (reasons.length === 0) reasons.push('No open risk — filing is complete and approved');
  return reasons;
}

export type ApprovalDecision = 'Pending' | 'Approved' | 'Declined';
export interface EmailNotification { id: string; to: string; subject: string; body: string; sentAt: string; }
export interface ApprovalRequest {
  id: string; itemId: number; filingId: string | null; requestedBy: string; approver: string;
  approverEmail: string; requestedOn: string; dueBy: string; note: string; status: ApprovalDecision;
  decidedOn: string | null; decidedBy: string | null; decisionNote: string; notifications: EmailNotification[];
}
export const approverDirectory: Record<string, string> = {
  'Suresh Mehta (Director)': 'suresh.mehta@example.com',
  'Kavita Rao (Audit Chair)': 'kavita.rao@example.com',
  'Deepak Gupta (MD)': 'deepak.gupta@example.com',
  'Ritu Agarwal (ID)': 'ritu.agarwal@example.com',
};
export function approverEmail(name: string): string {
  if (approverDirectory[name]) return approverDirectory[name];
  const slug = name.replace(/\(.*\)/, '').trim().toLowerCase().replace(/[^a-z]+/g, '.');
  return `${slug || 'approver'}@example.com`;
}

export interface OverdueTaskRisk {
  taskId: string; itemId: number; title: string; owner: string; deadline: string; status: TaskStatus;
  daysLeft: number; filingName: string; category: string; riskLevel: 'Critical' | 'High';
}
export function buildOverdueTaskRisks(tasks: ComplianceTask[], items: ComplianceItem[], today = new Date()): OverdueTaskRisk[] {
  const byId = new Map(items.map(i => [i.id, i]));
  const midnight = new Date(today.toISOString().split('T')[0]);
  return tasks.filter(t => t.status !== 'Done').map(t => {
    const days = Math.ceil((new Date(t.deadline).getTime() - midnight.getTime()) / 86400000);
    const item = byId.get(t.itemId);
    return {
      taskId: t.id, itemId: t.itemId, title: t.title, owner: t.owner, deadline: t.deadline, status: t.status,
      daysLeft: days, filingName: item?.filingName ?? '—', category: item?.category ?? '—',
      riskLevel: (days < -7 ? 'Critical' : 'High') as 'Critical' | 'High',
    };
  }).filter(t => t.daysLeft < 0).sort((a, b) => a.daysLeft - b.daysLeft);
}

export type MilestoneKind = 'Due Date' | 'Filing' | 'Approval' | 'Task' | 'Document' | 'Comment';
export interface TimelineMilestone { id: string; date: string; kind: MilestoneKind; title: string; detail: string; state: 'done' | 'pending' | 'late'; }
export function buildItemTimeline(item: ComplianceItem, filings: FilingSubmission[], approvals: ApprovalRequest[], tasks: ComplianceTask[], today = new Date()): TimelineMilestone[] {
  const todayStr = today.toISOString().split('T')[0];
  const ms: TimelineMilestone[] = [{
    id: `due-${item.id}`, date: item.dueDate, kind: 'Due Date', title: `Statutory deadline — ${item.frequency}`,
    detail: `${item.regReference} · ${item.filingAuthority}`,
    state: item.status === 'Completed' ? 'done' : item.dueDate < todayStr ? 'late' : 'pending',
  }];
  return ms.sort((a, b) => a.date.localeCompare(b.date));
}

export function linkedComplianceItems<T extends { regReference: string; category: string }>(regulation: string, items: T[]): T[] {
  const m = regulation.match(/(PIT|LODR|SAST|ICDR|NCS|SBEB|BRSR)\s*Reg\.?\s*([0-9]+)/i);
  if (!m) return [];
  const family = m[1].toUpperCase();
  return items.filter(i => `${i.regReference} ${i.category}`.toUpperCase().includes(family)).slice(0, 12);
}

export interface ResolvedVaultDoc {
  item?: ComplianceItem; category: string; regulation: string; state?: ComplianceState;
  riskLevel: RiskLevel | null; riskReason: string; reasons: string[]; dueDate?: string; owner?: string;
}
export function resolveVaultDoc(doc: { itemId?: number; regulation: string; category: string; section: string; status?: string; responseDue?: string }, items: ComplianceItem[]): ResolvedVaultDoc {
  const item = doc.itemId != null ? items.find(i => i.id === doc.itemId) : linkedComplianceItems(doc.regulation, items)[0];
  if (!item) return { item: undefined, category: doc.category, regulation: doc.regulation, riskLevel: null, riskReason: '', reasons: ['Reference document — not linked to a filing obligation'] };
  return {
    item, category: item.category, regulation: item.regReference, state: deriveComplianceState(item),
    riskLevel: effectiveRiskLevel(item), riskReason: deriveComplianceState(item),
    reasons: riskReasons(item), dueDate: item.dueDate, owner: item.owner,
  };
}
