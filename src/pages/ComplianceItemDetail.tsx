import { AppLayout } from '@/components/AppLayout';
import { useComplianceStore } from '@/store/complianceStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge, RiskBadge, NatureBadge, ApprovalBadge } from '@/components/StatusBadges';
import { deriveComplianceState, effectiveRiskLevel, riskReasons, buildItemTimeline } from '@/data/workflowData';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function ComplianceItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const items = useComplianceStore(s => s.items);
  const filings = useComplianceStore(s => s.filings);
  const approvals = useComplianceStore(s => s.approvalRequests);
  const tasks = useComplianceStore(s => s.tasks);
  const item = items.find(i => i.id === Number(id));
  if (!item) {
    return (
      <AppLayout title="Filing Detail">
        <p className="text-sm text-muted-foreground">This filing could not be found.</p>
        <Button variant="outline" size="sm" className="mt-3" onClick={() => navigate('/')}>Back to dashboard</Button>
      </AppLayout>
    );
  }
  const timeline = buildItemTimeline(item, filings, approvals, tasks);
  return (
    <AppLayout title="Filing Detail" subtitle={item.regReference}>
      <div className="space-y-4 max-w-4xl">
        <Button variant="ghost" size="sm" className="h-7 text-[11px] gap-1" onClick={() => navigate(-1)}><ArrowLeft className="h-3.5 w-3.5" /> Back</Button>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-wrap gap-2 items-center">
              <NatureBadge nature={item.complianceNature} />
              <StatusBadge status={item.status} />
              <RiskBadge level={effectiveRiskLevel(item)} />
              <ApprovalBadge status={item.approvalStatus} />
            </div>
            <CardTitle className="text-base pt-2">{item.filingName}</CardTitle>
            <p className="text-[11px] text-muted-foreground">{item.category} · {item.frequency} · Due {item.dueDate}</p>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <p><span className="font-semibold">Applicable to:</span> {item.applicableTo}</p>
            <p><span className="font-semibold">Trigger:</span> {item.trigger}</p>
            <p><span className="font-semibold">Timeline:</span> {item.timeline}</p>
            <p><span className="font-semibold">Format:</span> {item.format}</p>
            <p><span className="font-semibold">Penalty:</span> {item.penalty}</p>
            <p><span className="font-semibold">Owner:</span> {item.owner} · <span className="font-semibold">Approver:</span> {item.approver}</p>
            <p><span className="font-semibold">State:</span> {deriveComplianceState(item)}</p>
            <ul className="list-disc pl-4 text-muted-foreground">{riskReasons(item).map(r => <li key={r}>{r}</li>)}</ul>
            {item.sourceUrl && <a className="inline-flex items-center gap-1 text-secondary hover:underline" href={item.sourceUrl} target="_blank" rel="noreferrer">SEBI source <ExternalLink className="h-3 w-3" /></a>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Timeline</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-xs">
            {timeline.map(m => <p key={m.id}><span className="font-mono text-muted-foreground">{m.date}</span> · {m.kind} · {m.title}</p>)}
            <Link className="text-primary hover:underline" to={`/timeline?item=${item.id}`}>Open full timeline</Link>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
