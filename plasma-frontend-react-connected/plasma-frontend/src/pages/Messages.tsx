import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare } from "lucide-react";

const messages = [
  { id: 1, from: "Priya Patel", preview: "I'm available this weekend for donation.", time: "2h ago", unread: true },
  { id: 2, from: "Vikram Singh", preview: "Thanks for connecting!", time: "1d ago", unread: false },
  { id: 3, from: "Apollo Hospital", preview: "Your request has been received.", time: "3d ago", unread: false },
];

const Messages = () => (
  <div className="space-y-5">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
      <p className="text-sm text-muted-foreground">Conversations with donors and recipients.</p>
    </div>
    <Card className="border-0 shadow-[var(--shadow-soft)] divide-y">
      {messages.map((m) => (
        <div key={m.id} className="flex items-center gap-3 p-4 hover:bg-muted/40 transition-colors cursor-pointer">
          <Avatar><AvatarFallback className="bg-secondary/10 text-secondary"><MessageSquare className="h-4 w-4" /></AvatarFallback></Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between">
              <p className="font-medium text-sm">{m.from}</p>
              <p className="text-xs text-muted-foreground">{m.time}</p>
            </div>
            <p className="text-sm text-muted-foreground truncate">{m.preview}</p>
          </div>
          {m.unread && <span className="h-2 w-2 rounded-full bg-primary" />}
        </div>
      ))}
    </Card>
  </div>
);

export default Messages;
