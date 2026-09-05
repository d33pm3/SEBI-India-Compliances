import { AppLayout } from '@/components/AppLayout';
import { StatTile } from '@/components/StatTile';
import { StatusBadge, RiskBadge } from '@/components/StatusBadges';
import { STAT_COLORS } from '@/lib/chartTheme';
import { useComplianceStore } from '@/store/complianceStore';
import { Link } from 'react-router-dom';

const Index = () => {
  const items = useComplianceStore(s => s.items);
  const filtered = useComplianceStore(s => s.filteredItems());
  const setFilter = useComplianceStore(s => s.setFilter);
  const filters = useComplianceStore(s => s.filters);
  const completed = items.filter(i => i.status === 'Completed').length;
  const overdue = items.filter(i => i.status === 'Overdue').length;
  const dueSoon = items.filter(i => i.status === 'Due Soon').length;

  return (
    <AppLayout title="Dashboard" subtitle="Public SEBI compliance demonstration">
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Sample obligations are fictional. Not legal or regulatory advice.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatTile label="Total obligations" value={items.length} bg={STAT_COLORS.total} />
          <StatTile label="Completed" value={completed} bg={STAT_COLORS.completed} />
          <StatTile label="Due soon" value={dueSoon} bg={STAT_COLORS.dueSoon} />
          <StatTile label="Overdue" value={overdue} bg={STAT_COLORS.overdue} />
        </div>
        <input
          className="h-9 w-full max-w-md rounded-md border bg-background px-3 text-sm"
          placeholder="Search filings or regulations"
          value={filters.search}
          onChange={e => setFilter('search', e.target.value)}
        />
        <div className="overflow-x-auto rounded-md border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="px-3 py-2 font-medium">#</th>
                <th className="px-3 py-2 font-medium">Filing</th>
                <th className="px-3 py-2 font-medium">Regulation</th>
                <th className="px-3 py-2 font-medium">Due</th>
                <th className="px-3 py-2 font-medium">Status</th>
                <th className="px-3 py-2 font-medium">Risk</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id} className="border-t">
                  <td className="px-3 py-2">{item.sNo}</td>
                  <td className="px-3 py-2">
                    <Link className="underline-offset-2 hover:underline" to={`/compliance/${item.id}`}>{item.filingName}</Link>
                  </td>
                  <td className="px-3 py-2 text-muted-foreground">{item.regReference}</td>
                  <td className="px-3 py-2">{item.dueDate}</td>
                  <td className="px-3 py-2"><StatusBadge status={item.status} /></td>
                  <td className="px-3 py-2"><RiskBadge level={item.riskLevel} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
