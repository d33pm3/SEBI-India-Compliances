import { AppLayout } from '@/components/AppLayout';
import { StatTile } from '@/components/StatTile';
import { StatusBadge, RiskBadge } from '@/components/StatusBadges';
import { ComplianceDetailDrawer } from '@/components/ComplianceDetailDrawer';
import { MaterialEventsSection } from '@/components/MaterialEventsSection';
import { STAT_COLORS } from '@/lib/chartTheme';
import { useComplianceStore } from '@/store/complianceStore';
import { deriveComplianceState, effectiveRiskLevel } from '@/data/workflowData';
import { Link } from 'react-router-dom';

const Index = () => {
  const items = useComplianceStore(s => s.items);
  const filtered = useComplianceStore(s => s.filteredItems());
  const setFilter = useComplianceStore(s => s.setFilter);
  const selectItem = useComplianceStore(s => s.selectItem);
  const filters = useComplianceStore(s => s.filters);
  const completed = items.filter(i => i.status === 'Completed').length;
  const overdue = items.filter(i => i.status === 'Overdue').length;
  const dueSoon = items.filter(i => i.status === 'Due Soon').length;
  return (
    <AppLayout title="Dashboard" subtitle="Master Compliance Register — public demo data only">
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">Sample obligations are fictional. Not legal or regulatory advice.</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatTile label="Total obligations" value={items.length} bg={STAT_COLORS.total} onClick={() => setFilter('status', '')} />
          <StatTile label="Completed" value={completed} bg={STAT_COLORS.completed} onClick={() => setFilter('status', 'Completed')} />
          <StatTile label="Due soon" value={dueSoon} bg={STAT_COLORS.dueSoon} onClick={() => setFilter('status', 'Due Soon')} />
          <StatTile label="Overdue" value={overdue} bg={STAT_COLORS.overdue} onClick={() => setFilter('status', 'Overdue')} />
        </div>
        <input className="h-9 w-full max-w-md rounded-md border bg-background px-3 text-sm" placeholder="Search filings or regulations" value={filters.search} onChange={e => setFilter('search', e.target.value)} />
        <div className="overflow-x-auto rounded-md border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="px-3 py-2 font-medium">#</th>
                <th className="px-3 py-2 font-medium">Filing</th>
                <th className="px-3 py-2 font-medium">Regulation</th>
                <th className="px-3 py-2 font-medium">Due</th>
                <th className="px-3 py-2 font-medium">State</th>
                <th className="px-3 py-2 font-medium">Risk</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id} className="border-t cursor-pointer hover:bg-muted/40" onClick={() => selectItem(item.id)}>
                  <td className="px-3 py-2">{item.sNo}</td>
                  <td className="px-3 py-2"><Link className="underline-offset-2 hover:underline" to={`/compliance/${item.id}`} onClick={e => e.stopPropagation()}>{item.filingName}</Link></td>
                  <td className="px-3 py-2 text-muted-foreground">{item.regReference}</td>
                  <td className="px-3 py-2">{item.dueDate}</td>
                  <td className="px-3 py-2"><StatusBadge status={item.status} /></td>
                  <td className="px-3 py-2"><RiskBadge level={effectiveRiskLevel(item)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-muted-foreground">{filtered.length} of {items.length} items · state {filtered.filter(i => deriveComplianceState(i) === 'Overdue').length} overdue in current filter</p>
        <MaterialEventsSection />
        <ComplianceDetailDrawer />
      </div>
    </AppLayout>
  );
};

export default Index;
