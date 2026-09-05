import { AppLayout } from '@/components/AppLayout';
import { useComplianceStore } from '@/store/complianceStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatTile } from '@/components/StatTile';
import { STAT_COLORS } from '@/lib/chartTheme';
import { deriveComplianceState } from '@/data/workflowData';
import { BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ComplianceAssistant() {
  const items = useComplianceStore(s => s.items);
  const overdue = items.filter(i => deriveComplianceState(i) === 'Overdue');
  const missing = items.filter(i => deriveComplianceState(i) === 'Documents Missing');
  return (
    <AppLayout title="Assistant" subtitle="Module 6 — Suggested next actions from the Master Register">
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <StatTile icon={<BarChart3 className="h-4 w-4" />} label="Overdue" value={overdue.length} bg={STAT_COLORS.overdue} />
          <StatTile label="Documents Missing" value={missing.length} bg={STAT_COLORS.dueSoon} />
          <StatTile label="Total" value={items.length} bg={STAT_COLORS.total} />
        </div>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Suggested actions</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-xs">
            {overdue.slice(0, 8).map(i => <p key={i.id}>File <Link className="text-primary hover:underline" to={`/compliance/${i.id}`}>{i.filingName}</Link> — overdue since {i.dueDate}</p>)}
            {missing.slice(0, 8).map(i => <p key={`m-${i.id}`}>Upload evidence for <Link className="text-primary hover:underline" to={`/compliance/${i.id}`}>{i.filingName}</Link></p>)}
            {overdue.length === 0 && missing.length === 0 && <p className="text-muted-foreground">No urgent actions in the demo register.</p>}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
