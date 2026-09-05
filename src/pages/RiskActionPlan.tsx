import { AppLayout } from '@/components/AppLayout';
import { useComplianceStore } from '@/store/complianceStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RiskBadge } from '@/components/StatusBadges';
import { deriveComplianceState, effectiveRiskLevel, buildNoticeRisks } from '@/data/workflowData';
import { ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RiskActionPlan() {
  const items = useComplianceStore(s => s.items);
  const notices = useComplianceStore(s => s.notices);
  const actions = items.filter(i => deriveComplianceState(i) !== 'Completed' && (effectiveRiskLevel(i) === 'Critical' || effectiveRiskLevel(i) === 'High'));
  const noticeRisks = buildNoticeRisks(notices).filter(n => n.riskStatus !== 'Closed');
  return (
    <AppLayout title="Risk Action Plan" subtitle="Module 13 — High and critical items that need action">
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold flex items-center gap-2"><ClipboardList className="h-4 w-4" /> Filing Actions ({actions.length})</CardTitle></CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader><TableRow><TableHead className="text-[10px]">Filing</TableHead><TableHead className="text-[10px]">Due</TableHead><TableHead className="text-[10px]">State</TableHead><TableHead className="text-[10px]">Risk</TableHead><TableHead className="text-[10px]">Owner</TableHead></TableRow></TableHeader>
                <TableBody>
                  {actions.map(i => (
                    <TableRow key={i.id}>
                      <TableCell className="text-xs"><Link className="text-primary hover:underline" to={`/compliance/${i.id}`}>{i.filingName}</Link></TableCell>
                      <TableCell className="text-[11px]">{i.dueDate}</TableCell>
                      <TableCell className="text-[11px]">{deriveComplianceState(i)}</TableCell>
                      <TableCell><RiskBadge level={effectiveRiskLevel(i)} /></TableCell>
                      <TableCell className="text-[11px]">{i.owner}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Notice Actions ({noticeRisks.length})</CardTitle></CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader><TableRow><TableHead className="text-[10px]">Notice</TableHead><TableHead className="text-[10px]">Subject</TableHead><TableHead className="text-[10px]">Deadline</TableHead><TableHead className="text-[10px]">Risk</TableHead></TableRow></TableHeader>
                <TableBody>
                  {noticeRisks.map(n => (
                    <TableRow key={n.id}>
                      <TableCell className="text-[11px] font-mono"><Link className="text-primary hover:underline" to={`/notices/${n.noticeId}`}>{n.noticeNo}</Link></TableCell>
                      <TableCell className="text-xs truncate max-w-[280px]">{n.subject}</TableCell>
                      <TableCell className="text-[11px]">{n.deadline}</TableCell>
                      <TableCell><RiskBadge level={n.riskLevel} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
