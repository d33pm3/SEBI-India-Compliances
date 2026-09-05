import { AppLayout } from '@/components/AppLayout';
import { useComplianceStore } from '@/store/complianceStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatTile } from '@/components/StatTile';
import { RiskBadge } from '@/components/StatusBadges';
import { MaterialEventsSection } from '@/components/MaterialEventsSection';
import { STAT_COLORS } from '@/lib/chartTheme';
import { deriveComplianceState, effectiveRiskLevel, riskReasons, buildNoticeRisks } from '@/data/workflowData';
import { ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';

export default function RiskAssessment() {
  const items = useComplianceStore(s => s.items);
  const notices = useComplianceStore(s => s.notices);
  const rows = useMemo(() => items.map(i => ({ i, state: deriveComplianceState(i), risk: effectiveRiskLevel(i), reasons: riskReasons(i) })), [items]);
  const critical = rows.filter(r => r.risk === 'Critical').length;
  const high = rows.filter(r => r.risk === 'High').length;
  const noticeRisks = buildNoticeRisks(notices);
  return (
    <AppLayout title="Risk Assessment" subtitle="Module 3 — Risk is derived live from the Master Register">
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatTile icon={<ShieldAlert className="h-4 w-4" />} label="Critical" value={critical} bg={STAT_COLORS.overdue} />
          <StatTile label="High" value={high} bg={STAT_COLORS.dueSoon} />
          <StatTile label="Open Notices" value={noticeRisks.filter(n => n.riskStatus !== 'Closed').length} bg={STAT_COLORS.inProgress} />
          <StatTile label="Total Items" value={items.length} bg={STAT_COLORS.total} />
        </div>
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-sm">Register Risk View</CardTitle></CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader><TableRow><TableHead className="text-[10px]">Filing</TableHead><TableHead className="text-[10px]">State</TableHead><TableHead className="text-[10px]">Risk</TableHead><TableHead className="text-[10px]">Why</TableHead></TableRow></TableHeader>
                <TableBody>
                  {rows.map(r => (
                    <TableRow key={r.i.id}>
                      <TableCell className="text-xs"><Link className="text-primary hover:underline" to={`/compliance/${r.i.id}`}>{r.i.filingName}</Link></TableCell>
                      <TableCell className="text-[11px]">{r.state}</TableCell>
                      <TableCell><RiskBadge level={r.risk} /></TableCell>
                      <TableCell className="text-[11px] text-muted-foreground max-w-[360px] truncate">{r.reasons[0]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        <MaterialEventsSection />
      </div>
    </AppLayout>
  );
}
