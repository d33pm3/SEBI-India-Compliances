import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { sampleSessions } from '@/data/chatData';
import { MessageSquare } from 'lucide-react';
import { useState } from 'react';

export default function ComplianceChatbot() {
  const [activeId, setActiveId] = useState(sampleSessions[0]?.id);
  const session = sampleSessions.find(s => s.id === activeId) ?? sampleSessions[0];
  return (
    <AppLayout title="AI Chatbot" subtitle="Module 5 — Demo conversations only. Not legal advice.">
      <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><MessageSquare className="h-4 w-4" /> Sessions</CardTitle></CardHeader>
          <CardContent className="space-y-1">
            {sampleSessions.map(s => (
              <button key={s.id} onClick={() => setActiveId(s.id)} className={`w-full text-left rounded-md px-2 py-2 text-xs ${s.id === session?.id ? 'bg-secondary/15 border border-secondary/40' : 'hover:bg-muted'}`}>
                <p className="font-medium">{s.title}</p>
                <p className="text-[10px] text-muted-foreground">{s.date}</p>
              </button>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">{session?.title}</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {session?.messages.map(m => (
              <div key={m.id} className={`rounded-md p-3 text-xs ${m.role === 'user' ? 'bg-secondary/10' : 'bg-muted/40'}`}>
                <p className="text-[10px] font-semibold mb-1">{m.role === 'user' ? 'You' : 'Assistant'} · {m.timestamp}</p>
                <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
