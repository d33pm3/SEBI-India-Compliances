import { AppLayout } from '@/components/AppLayout';
import { useComplianceStore } from '@/store/complianceStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TaskStatus } from '@/data/workflowData';
import { ListTodo, Plus, Search, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

const badge = 'inline-flex items-center justify-center rounded-full text-[10px] font-semibold whitespace-nowrap min-w-[80px] h-5 px-2.5';
const statusStyle: Record<TaskStatus, string> = {
  Open: 'bg-muted text-muted-foreground',
  'In Progress': 'bg-secondary text-secondary-foreground',
  Blocked: 'bg-destructive text-destructive-foreground',
  Done: 'bg-success text-success-foreground',
};

export default function TaskManager() {
  const { items, tasks, addTask, updateTaskStatus, deleteTask } = useComplianceStore();
  const [params] = useSearchParams();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [itemFilter, setItemFilter] = useState(params.get('item') ?? 'all');
  const [title, setTitle] = useState('');
  const [itemId, setItemId] = useState(items[0] ? String(items[0].id) : '');
  const itemById = useMemo(() => new Map(items.map(i => [i.id, i])), [items]);
  const rows = useMemo(() => tasks.filter(t => {
    const item = itemById.get(t.itemId);
    if (statusFilter !== 'all' && t.status !== statusFilter) return false;
    if (itemFilter !== 'all' && String(t.itemId) !== itemFilter) return false;
    if (search && !`${t.title} ${item?.filingName ?? ''}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }), [tasks, statusFilter, itemFilter, search, itemById]);
  return (
    <AppLayout title="Task Manager" subtitle="Module 9 — One task per Master Register item">
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold flex items-center gap-2"><ListTodo className="h-4 w-4" /> Add Task</CardTitle></CardHeader>
          <CardContent className="flex flex-wrap gap-2 items-end">
            <Select value={itemId} onValueChange={setItemId}><SelectTrigger className="h-8 text-xs w-72"><SelectValue /></SelectTrigger><SelectContent>{items.map(i => <SelectItem key={i.id} value={String(i.id)}>{i.filingName}</SelectItem>)}</SelectContent></Select>
            <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Task title" className="h-8 text-xs w-64" />
            <Button size="sm" className="h-8 text-xs gap-1" onClick={() => {
              if (!title.trim() || !itemId) return;
              const item = itemById.get(Number(itemId));
              addTask(Number(itemId), { title: title.trim(), owner: item?.owner ?? 'Compliance Team', deadline: item?.dueDate ?? new Date().toISOString().split('T')[0] });
              setTitle('');
              toast.success('Task added');
            }}><Plus className="h-3.5 w-3.5" /> Add</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-wrap gap-2 items-center">
              <div className="relative"><Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" /><Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tasks" className="h-8 text-xs pl-8 w-52" /></div>
              <Select value={statusFilter} onValueChange={setStatusFilter}><SelectTrigger className="h-8 text-xs w-36"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All Status</SelectItem><SelectItem value="Open">Open</SelectItem><SelectItem value="In Progress">In Progress</SelectItem><SelectItem value="Blocked">Blocked</SelectItem><SelectItem value="Done">Done</SelectItem></SelectContent></Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader><TableRow><TableHead className="text-[10px]">Task</TableHead><TableHead className="text-[10px]">Filing</TableHead><TableHead className="text-[10px]">Owner</TableHead><TableHead className="text-[10px]">Deadline</TableHead><TableHead className="text-[10px]">Status</TableHead><TableHead className="text-[10px]"></TableHead></TableRow></TableHeader>
                <TableBody>
                  {rows.map(t => {
                    const item = itemById.get(t.itemId);
                    return (
                      <TableRow key={t.id}>
                        <TableCell className="text-xs">{t.title}</TableCell>
                        <TableCell className="text-xs"><Link className="text-primary hover:underline" to={`/compliance/${t.itemId}`}>{item?.filingName ?? t.itemId}</Link></TableCell>
                        <TableCell className="text-[11px] text-muted-foreground">{t.owner}</TableCell>
                        <TableCell className="text-[11px]">{t.deadline}</TableCell>
                        <TableCell>
                          <Select value={t.status} onValueChange={v => updateTaskStatus(t.id, v as TaskStatus)}>
                            <SelectTrigger className="h-7 text-[10px] w-32"><SelectValue /></SelectTrigger>
                            <SelectContent><SelectItem value="Open">Open</SelectItem><SelectItem value="In Progress">In Progress</SelectItem><SelectItem value="Blocked">Blocked</SelectItem><SelectItem value="Done">Done</SelectItem></SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell><Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => deleteTask(t.id)}><Trash2 className="h-3.5 w-3.5" /></Button></TableCell>
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
