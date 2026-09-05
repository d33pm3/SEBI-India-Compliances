import { AppLayout } from '@/components/AppLayout';
import { useComplianceStore } from '@/store/complianceStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DocumentUploadForm } from '@/components/DocumentUploadForm';
import { FolderArchive } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DocumentVault() {
  const vaultDocs = useComplianceStore(s => s.vaultDocs);
  const items = useComplianceStore(s => s.items);
  return (
    <AppLayout title="Document Vault" subtitle="Module 4 — Evidence linked to the Master Register">
      <div className="space-y-4">
        <DocumentUploadForm />
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold flex items-center gap-2"><FolderArchive className="h-4 w-4" /> Vault Documents ({vaultDocs.length})</CardTitle></CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader><TableRow><TableHead className="text-[10px]">Title</TableHead><TableHead className="text-[10px]">Type</TableHead><TableHead className="text-[10px]">FY</TableHead><TableHead className="text-[10px]">Status</TableHead><TableHead className="text-[10px]">Linked Filing</TableHead></TableRow></TableHeader>
                <TableBody>
                  {vaultDocs.map(d => {
                    const item = items.find(i => i.id === d.itemId);
                    return (
                      <TableRow key={d.id || d.vaultId}>
                        <TableCell className="text-xs">{d.title}</TableCell>
                        <TableCell className="text-[11px]">{d.documentType}</TableCell>
                        <TableCell className="text-[11px]">{d.fiscalYear}</TableCell>
                        <TableCell className="text-[11px]">{d.status}</TableCell>
                        <TableCell className="text-[11px]">{item ? <Link className="text-primary hover:underline" to={`/compliance/${item.id}`}>{item.filingName}</Link> : d.regulation}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
