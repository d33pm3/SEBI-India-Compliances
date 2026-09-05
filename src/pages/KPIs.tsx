import { AppLayout } from '@/components/AppLayout';
import { useComplianceStore } from '@/store/complianceStore';
import { StatTile } from '@/components/StatTile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { STAT_COLORS } from '@/lib/chartTheme';
import { deriveComplianceState, effectiveRiskLevel } from '@/data/workflowData';
import { Target } from 'lucide-react';
import { useMemo } from 'react';

export default function KPIs() {
  const items = useComplianceStore(s => s.items);
  const tasks = useComplianceStore(s => s.tasks);
  const notices = useComplianceStore(s => s.notices);
  const stats = useMemo(() => {
    const states = items.map(deriveComplianceState);
    return {
      total: items.length,
      completed: states.filter(s => s === 'Completed').length,
      overdue: states.filter(s => s === 'Overdue').length,
      missing: states.filter(s => s === 'Documents Missing').length,
      critical: items.filter(i => effectiveRiskLevel(i) === 'Critical').length,
      openTasks: tasks.filter(t => t.status !== 'Done').length,
      openNotices: notices.filter(n => n.responseStatus !== 'Closed').length,
    };
  }, [items, tasks, notices]);
  const rate = stats.total ? Math.round((stats.completed / stats.total) * 100) : 0;
  return (
    <AppLayout title="KPIs" subtitle="Module 11 — Counts reconcile to the Master Register">
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatTile icon={<Target className="h-4 w-4" />} label="Total Obligations" value={stats.total} bg={STAT_COLORS.total} />
          <StatTile label="Completed" value={stats.completed} bg={STAT_COLORS.completed} />
          <StatTile label="Overdue" value={stats.overdue} bg={STAT_COLORS.overdue} />
          <StatTile label="Docs Missing" value={stats.missing} bg={STAT_COLORS.dueSoon} />
        </div>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Completion Rate</CardTitle></CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{rate}%</p>
            <p className="text-xs text-muted-foreground mt-1">{stats.openTasks} open tasks · {stats.openNotices} open notices · {stats.critical} critical risks</p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
