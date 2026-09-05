import { AppLayout } from '@/components/AppLayout';
import { useComplianceStore } from '@/store/complianceStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FilePlus2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { ComplianceStatus, RiskLevel, ApprovalStatus } from '@/data/complianceData';

export default function RegisterManager() {
  const { items, addItem, deleteItem } = useComplianceStore();
  const [filingName, setFilingName] = useState('');
  const [regReference, setRegReference] = useState('');
  const [category, setCategory] = useState('CORPORATE GOVERNANCE');
  return (
    <AppLayout title="Register Editor" subtitle="Module 14 — Maintain the Master Compliance Register">
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold flex items-center gap-2"><FilePlus2 className="h-4 w-4" /> Add Register Entry</CardTitle></CardHeader>
          <CardContent className="flex flex-wrap gap-2 items-end">
            <Input className="h-8 text-xs w-64" placeholder="Filing name" value={filingName} onChange={e => setFilingName(e.target.value)} />
            <Input className="h-8 text-xs w-48" placeholder="Regulation reference" value={regReference} onChange={e => setRegReference(e.target.value)} />
            <Input className="h-8 text-xs w-52" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
            <Button size="sm" className="h-8 text-xs" onClick={() => {
              if (!filingName.trim() || !regReference.trim()) return;
              addItem({
                category, filingName: filingName.trim(), regReference: regReference.trim(), trigger: 'Manual entry', timeline: 'As prescribed',
                dueDate: new Date().toISOString().split('T')[0], frequency: 'Event-based', filingAuthority: 'NSE / BSE',
                applicableTo: 'All equity-listed entities', format: 'Exchange filing', penalty: 'Reg 91 LODR', sourceUrl: 'https://www.sebi.gov.in',
                complianceNature: '[E]', obligorTier: 'ALL', status: 'Not Started' as ComplianceStatus, riskLevel: 'Medium' as RiskLevel,
                approvalStatus: 'Not Started' as ApprovalStatus, owner: 'Priya Sharma (CS)', approver: 'Suresh Mehta (Director)',
              });
              setFilingName(''); setRegReference('');
              toast.success('Master Register entry added');
            }}>Add</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-sm">{items.length} register items</CardTitle></CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader><TableRow><TableHead className="text-[10px]">#</TableHead><TableHead className="text-[10px]">Filing</TableHead><TableHead className="text-[10px]">Regulation</TableHead><TableHead className="text-[10px]">Due</TableHead><TableHead className="text-[10px]"></TableHead></TableRow></TableHeader>
                <TableBody>
                  {items.map(i => (
                    <TableRow key={i.id}>
                      <TableCell className="text-[11px]">{i.sNo}</TableCell>
                      <TableCell className="text-xs"><Link className="text-primary hover:underline" to={`/compliance/${i.id}`}>{i.filingName}</Link></TableCell>
                      <TableCell className="text-[11px] text-muted-foreground">{i.regReference}</TableCell>
                      <TableCell className="text-[11px]">{i.dueDate}</TableCell>
                      <TableCell><Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => deleteItem(i.id)}><Trash2 className="h-3.5 w-3.5" /></Button></TableCell>
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
