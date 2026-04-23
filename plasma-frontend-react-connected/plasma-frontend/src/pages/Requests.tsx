import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";

const requests = [
  { id: 1, patient: "Rahul K.", bloodGroup: "O+", hospital: "Apollo Mumbai", status: "Pending", date: "2025-04-20" },
  { id: 2, patient: "Meera S.", bloodGroup: "A-", hospital: "Fortis Delhi", status: "Fulfilled", date: "2025-04-15" },
  { id: 3, patient: "Anil G.", bloodGroup: "B+", hospital: "Manipal Bangalore", status: "Pending", date: "2025-04-22" },
];

const Requests = () => (
  <div className="space-y-5">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">My Requests</h1>
      <p className="text-sm text-muted-foreground">Track your plasma requests.</p>
    </div>
    <div className="grid gap-3">
      {requests.map((r) => (
        <Card key={r.id} className="border-0 shadow-[var(--shadow-soft)]">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><FileText className="h-5 w-5" /></div>
              <div>
                <CardTitle className="text-base">{r.patient}</CardTitle>
                <p className="text-xs text-muted-foreground">{r.hospital} • {r.date}</p>
              </div>
            </div>
            <Badge className={r.status === "Fulfilled" ? "bg-success text-success-foreground" : "bg-warning text-warning-foreground"}>{r.status}</Badge>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Blood Group: <span className="font-semibold text-primary">{r.bloodGroup}</span></p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default Requests;
