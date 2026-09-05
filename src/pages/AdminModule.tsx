import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { users, roles } from '@/data/adminData';
import { Settings } from 'lucide-react';

export default function AdminModule() {
  return (
    <AppLayout title="Admin" subtitle="Module 7 — Demo users and roles">
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold flex items-center gap-2"><Settings className="h-4 w-4" /> Users</CardTitle></CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader><TableRow><TableHead className="text-[10px]">Name</TableHead><TableHead className="text-[10px]">Role</TableHead><TableHead className="text-[10px]">Email</TableHead></TableRow></TableHeader>
                <TableBody>
                  {users.map((u: { id?: string; name: string; role: string; email: string }) => (
                    <TableRow key={u.id || u.email}><TableCell className="text-xs">{u.name}</TableCell><TableCell className="text-[11px]">{u.role}</TableCell><TableCell className="text-[11px] text-muted-foreground">{u.email}</TableCell></TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-sm">Roles</CardTitle></CardHeader>
          <CardContent>
            <ul className="text-xs space-y-1">{roles.map((r: { id?: string; name: string; description?: string }) => <li key={r.id || r.name}><span className="font-medium">{r.name}</span>{r.description ? ` — ${r.description}` : ''}</li>)}</ul>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
