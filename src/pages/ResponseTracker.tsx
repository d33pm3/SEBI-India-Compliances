import { AppLayout } from '@/components/AppLayout';
import { useComplianceStore } from '@/store/complianceStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { RiskBadge } from '@/components/StatusBadges';
import { buildNoticeRisks } from '@/data/workflowData';
import { MailWarning } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ResponseTracker() {
  const notices = useComplianceStore(s => s.notices);
  const risks = buildNoticeRisks(notices);
  return (
    <AppLayout title="Response Tracker" subtitle="Module 8 — SEBI and exchange notices">
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold flex items-center gap-2"><MailWarning className="h-4 w-4 text-destructive" /> Open And Closed Notices</CardTitle></CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader><TableRow><TableHead className="text-[10px]">Notice</TableHead><TableHead className="text-[10px]">Subject</TableHead><TableHead className="text-[10px]">Due</TableHead><TableHead className="text-[10px]">Status</TableHead><TableHead className="text-[10px]">Risk</TableHead><TableHead className="text-[10px]">Owner</TableHead></TableRow></TableHeader>
              <TableBody>
                {notices.map(n => {
                  const risk = risks.find(r => r.noticeId === n.noticeId);
                  return (
                    <TableRow key={n.noticeId}>
                      <TableCell className="text-[11px] font-mono"><Link className="text-primary hover:underline" to={`/notices/${n.noticeId}`}>{n.noticeNo}</Link></TableCell>
                      <TableCell className="text-xs max-w-[280px] truncate">{n.subject}</TableCell>
                      <TableCell className="text-[11px]">{n.responseDue}</TableCell>
                      <TableCell className="text-[11px]">{n.responseStatus}</TableCell>
                      <TableCell>{risk ? <RiskBadge level={risk.riskLevel} /> : '—'}</TableCell>
                      <TableCell className="text-[11px] text-muted-foreground">{n.owner}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <div className="mt-3"><Button asChild variant="outline" size="sm" className="h-8 text-xs"><Link to="/risk-assessment">Open Risk Assessment</Link></Button></div>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
