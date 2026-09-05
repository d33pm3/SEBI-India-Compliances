import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockUsers } from '@/data/adminData';
import { Settings } from 'lucide-react';

export default function AdminModule() {
  return (
    <AppLayout title="Admin" subtitle="Module 7 — Demo users and roles">
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold flex items-center gap-2"><Settings className="h-4 w-4" /> Users</CardTitle></CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader><TableRow><TableHead className="text-[10px]">Name</TableHead><TableHead className="text-[10px]">Role</TableHead><TableHead className="text-[10px]">Department</TableHead><TableHead className="text-[10px]">Email</TableHead><TableHead className="text-[10px]">Status</TableHead></TableRow></TableHeader>
              <TableBody>
                {mockUsers.map(u => (
                  <TableRow key={u.id}><TableCell className="text-xs">{u.name}</TableCell><TableCell className="text-[11px]">{u.role}</TableCell><TableCell className="text-[11px]">{u.department}</TableCell><TableCell className="text-[11px] text-muted-foreground">{u.email}</TableCell><TableCell className="text-[11px]">{u.status}</TableCell></TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
