import { create } from 'zustand';
import { complianceItems, ComplianceItem, ComplianceStatus, ApprovalStatus, Comment, RiskLevel } from '@/data/complianceData';
import { vaultDocuments, VaultDocument } from '@/data/vaultData';
import {
  ApprovalRequest, ComplianceTask, EmailNotification, FilingSubmission,
  NoticeResponse, TaskStatus, approverEmail, seedTasks, taskStatusForItem, taskTitleForItem,
  noticeResponses as seedNotices,
} from '@/data/workflowData';

export interface ApprovalRequestInput { approver: string; requestedBy: string; dueBy: string; note: string; filingId?: string | null; }
export interface FilingSubmissionInput { filingDate: string; referenceNo: string; submittedBy: string; approver: string; documents: string[]; remarks: string; }
export interface UploadedFileMeta { name: string; sizeBytes: number; extension: string; url: string; }
export interface DocumentUploadInput {
  itemId: number | null; section: VaultDocument['section']; documentType: string; fiscalYear: string;
  uploadedBy: string; docStatus: 'Uploaded' | 'Filed'; remarks: string; files: UploadedFileMeta[];
}
export interface MasterEntryInput {
  category: string; filingName: string; regReference: string; trigger: string; timeline: string;
  dueDate: string; frequency: string; filingAuthority: string; applicableTo: string; format: string;
  penalty: string; sourceUrl: string; complianceNature: ComplianceItem['complianceNature'];
  obligorTier: ComplianceItem['obligorTier']; status: ComplianceStatus; riskLevel: RiskLevel;
  approvalStatus: ApprovalStatus; owner: string; approver: string;
}

interface Filters {
  search: string; category: string; status: string; state: string; riskLevel: string;
  approvalStatus: string; complianceNature: string; obligorTier: string;
}
interface AgentState { status: 'Idle' | 'Running' | 'Completed' | 'Error'; lastRunTime: string | null; itemsExtracted: number; schedule: string; logs: string[]; }

interface ComplianceStore {
  items: ComplianceItem[]; filings: FilingSubmission[]; tasks: ComplianceTask[]; notices: NoticeResponse[];
  vaultDocs: VaultDocument[]; approvalRequests: ApprovalRequest[]; emailLog: EmailNotification[];
  filters: Filters; selectedItemId: number | null; drawerOpen: boolean; agent: AgentState;
  setFilter: (key: keyof Filters, value: string) => void;
  resetFilters: () => void;
  selectItem: (id: number | null) => void;
  setDrawerOpen: (open: boolean) => void;
  updateItemStatus: (id: number, status: ComplianceStatus) => void;
  updateApprovalStatus: (id: number, status: ApprovalStatus) => void;
  addComment: (id: number, comment: Comment) => void;
  toggleEvidence: (id: number) => void;
  addItem: (input: MasterEntryInput) => number;
  updateItem: (id: number, input: MasterEntryInput) => void;
  deleteItem: (id: number) => void;
  submitFiling: (id: number, input: FilingSubmissionInput) => void;
  approveFiling: (filingId: string, approve: boolean) => void;
  uploadDocuments: (input: DocumentUploadInput) => void;
  deleteVaultDoc: (vaultId: string) => void;
  addTask: (itemId: number, task: { title: string; owner: string; deadline: string }) => void;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  deleteTask: (taskId: string) => void;
  requestApproval: (itemId: number, input: ApprovalRequestInput) => void;
  decideApprovalRequest: (requestId: string, approve: boolean, note: string, decidedBy?: string) => void;
  updateNotice: (noticeId: string, patch: Partial<NoticeResponse>) => void;
  submitNoticeResponse: (noticeId: string, input: { responseDate: string; documents: string[]; remarks: string }) => void;
  startAgent: () => void; stopAgent: () => void; addAgentLog: (log: string) => void;
  setAgentSchedule: (schedule: string) => void; setAgentStatus: (status: AgentState['status']) => void;
  setAgentCompleted: (itemsExtracted: number) => void;
  filteredItems: () => ComplianceItem[];
}

const defaultFilters: Filters = { search: '', category: '', status: '', state: '', riskLevel: '', approvalStatus: '', complianceNature: '', obligorTier: '' };

export const useComplianceStore = create<ComplianceStore>((set, get) => ({
  items: complianceItems,
  filings: [],
  tasks: seedTasks(complianceItems),
  notices: seedNotices,
  vaultDocs: vaultDocuments,
  approvalRequests: [],
  emailLog: [],
  filters: defaultFilters,
  selectedItemId: null,
  drawerOpen: false,
  agent: { status: 'Idle', lastRunTime: null, itemsExtracted: 0, schedule: 'Daily', logs: [] },

  setFilter: (key, value) => set(state => ({ filters: { ...state.filters, [key]: value } })),
  resetFilters: () => set({ filters: defaultFilters }),
  selectItem: (id) => set({ selectedItemId: id, drawerOpen: id !== null }),
  setDrawerOpen: (open) => set({ drawerOpen: open, selectedItemId: open ? get().selectedItemId : null }),
  updateItemStatus: (id, status) => set(state => ({ items: state.items.map(item => item.id === id ? { ...item, status } : item) })),
  updateApprovalStatus: (id, status) => set(state => ({ items: state.items.map(item => item.id === id ? { ...item, approvalStatus: status } : item) })),
  addComment: (id, comment) => set(state => ({ items: state.items.map(item => item.id === id ? { ...item, comments: [...item.comments, comment] } : item) })),
  toggleEvidence: (id) => set(state => ({ items: state.items.map(item => item.id === id ? { ...item, evidenceUploaded: !item.evidenceUploaded } : item) })),

  addItem: (input) => {
    const state = get();
    const id = state.items.reduce((max, i) => Math.max(max, i.id), 0) + 1;
    const item: ComplianceItem = {
      id, sNo: id, ...input, sourceUrl: input.sourceUrl || 'https://www.sebi.gov.in',
      comments: [], evidenceUploaded: false,
    };
    set({ items: [...state.items, item], tasks: [{ id: `T-${id}`, itemId: id, title: taskTitleForItem(item), owner: item.owner, deadline: item.dueDate, status: taskStatusForItem(item), createdAt: new Date().toISOString().split('T')[0] }, ...state.tasks] });
    return id;
  },
  updateItem: (id, input) => set(state => ({ items: state.items.map(i => i.id === id ? { ...i, ...input } : i) })),
  deleteItem: (id) => set(state => ({ items: state.items.filter(i => i.id !== id), tasks: state.tasks.filter(t => t.itemId !== id) })),

  submitFiling: (id, input) => set(state => ({
    filings: [{ id: `F-${Date.now()}`, itemId: id, filingName: state.items.find(i => i.id === id)?.filingName ?? '', category: state.items.find(i => i.id === id)?.category ?? '', referenceNo: input.referenceNo, filingDate: input.filingDate, submittedBy: input.submittedBy, approver: input.approver, approvalStatus: 'Pending', approvedOn: null, documents: input.documents, remarks: input.remarks, vaultId: `VAULT-DEMO-${id}` }, ...state.filings],
    items: state.items.map(i => i.id === id ? { ...i, status: 'In Progress' as ComplianceStatus } : i),
  })),
  approveFiling: (filingId, approve) => set(state => ({
    filings: state.filings.map(f => f.id === filingId ? { ...f, approvalStatus: approve ? 'Approved' : 'Rejected', approvedOn: new Date().toISOString().split('T')[0] } : f),
  })),

  uploadDocuments: (input) => set(state => ({
    vaultDocs: [
      ...input.files.map((file, idx) => ({
        id: `${Date.now()}-${idx}`, vaultId: `VAULT-DEMO-${Date.now()}-${idx}`, title: file.name,
        category: 'Agent Output', section: input.section, documentType: input.documentType,
        fiscalYear: input.fiscalYear, uploadedBy: input.uploadedBy, uploadedAt: new Date().toISOString().split('T')[0],
        fileSize: `${Math.round(file.sizeBytes / 1024)} KB`, fileType: file.extension.toUpperCase(),
        regulation: 'Demo', status: input.docStatus, itemId: input.itemId ?? undefined, fileUrl: file.url, fileName: file.name,
      }) as VaultDocument),
      ...state.vaultDocs,
    ],
  })),
  deleteVaultDoc: (vaultId) => set(state => ({ vaultDocs: state.vaultDocs.filter(d => d.vaultId !== vaultId) })),

  addTask: (itemId, task) => set(state => ({ tasks: [{ id: `T-${Date.now()}`, itemId, title: task.title, owner: task.owner, deadline: task.deadline, status: 'Open', createdAt: new Date().toISOString().split('T')[0] }, ...state.tasks] })),
  updateTaskStatus: (taskId, status) => set(state => ({ tasks: state.tasks.map(t => t.id === taskId ? { ...t, status } : t) })),
  deleteTask: (taskId) => set(state => ({ tasks: state.tasks.filter(t => t.id !== taskId) })),

  requestApproval: (itemId, input) => set(state => ({
    approvalRequests: [{
      id: `AR-${Date.now()}`, itemId, filingId: input.filingId ?? null, requestedBy: input.requestedBy,
      approver: input.approver, approverEmail: approverEmail(input.approver),
      requestedOn: new Date().toISOString().split('T')[0], dueBy: input.dueBy, note: input.note,
      status: 'Pending', decidedOn: null, decidedBy: null, decisionNote: '', notifications: [],
    }, ...state.approvalRequests],
  })),
  decideApprovalRequest: (requestId, approve, note, decidedBy) => set(state => ({
    approvalRequests: state.approvalRequests.map(r => r.id === requestId ? { ...r, status: approve ? 'Approved' : 'Declined', decidedOn: new Date().toISOString().split('T')[0], decidedBy: decidedBy ?? r.approver, decisionNote: note } : r),
  })),

  updateNotice: (noticeId, patch) => set(state => ({ notices: state.notices.map(n => n.noticeId === noticeId ? { ...n, ...patch } : n) })),
  submitNoticeResponse: (noticeId, input) => set(state => ({
    notices: state.notices.map(n => n.noticeId === noticeId ? { ...n, responseStatus: 'Submitted', responseDate: input.responseDate, submittedDocuments: input.documents, remarks: input.remarks } : n),
  })),

  startAgent: () => set(state => ({ agent: { ...state.agent, status: 'Running', logs: [...state.agent.logs, 'Agent started'] } })),
  stopAgent: () => set(state => ({ agent: { ...state.agent, status: 'Idle' } })),
  addAgentLog: (log) => set(state => ({ agent: { ...state.agent, logs: [...state.agent.logs, log] } })),
  setAgentSchedule: (schedule) => set(state => ({ agent: { ...state.agent, schedule } })),
  setAgentStatus: (status) => set(state => ({ agent: { ...state.agent, status } })),
  setAgentCompleted: (itemsExtracted) => set(state => ({ agent: { ...state.agent, status: 'Completed', itemsExtracted, lastRunTime: new Date().toISOString() } })),

  filteredItems: () => {
    const { items, filters } = get();
    return items.filter(i => {
      if (filters.search && !`${i.filingName} ${i.regReference} ${i.category}`.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.category && i.category !== filters.category) return false;
      if (filters.status && i.status !== filters.status) return false;
      if (filters.riskLevel && i.riskLevel !== filters.riskLevel) return false;
      if (filters.approvalStatus && i.approvalStatus !== filters.approvalStatus) return false;
      if (filters.complianceNature && i.complianceNature !== filters.complianceNature) return false;
      if (filters.obligorTier && i.obligorTier !== filters.obligorTier) return false;
      return true;
    });
  },
}));
