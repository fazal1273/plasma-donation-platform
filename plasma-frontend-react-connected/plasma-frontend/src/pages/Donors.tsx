import { useMemo, useState } from "react";
import { Search, Phone, MapPin, Eye, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDonors } from "@/store/donorStore";
import { BLOOD_GROUPS } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Donor } from "@/data/mockData";

const Donors = () => {
  const donors = useDonors();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [bg, setBg] = useState("all");
  const [loc, setLoc] = useState("all");
  const [selected, setSelected] = useState<Donor | null>(null);

  const locations = useMemo(() => Array.from(new Set(donors.map((d) => d.location))), [donors]);

  const filtered = donors.filter((d) => {
    const matchQ = !q || d.name.toLowerCase().includes(q.toLowerCase()) || d.location.toLowerCase().includes(q.toLowerCase());
    const matchBg = bg === "all" || d.bloodGroup === bg;
    const matchLoc = loc === "all" || d.location === loc;
    return matchQ && matchBg && matchLoc;
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Find Donors</h1>
          <p className="text-sm text-muted-foreground">Search and filter verified plasma donors.</p>
        </div>
        <Button onClick={() => navigate("/donors/add")}>
          <Plus className="mr-2 h-4 w-4" /> Add Donor
        </Button>
      </div>

      <Card className="p-4 border-0 shadow-[var(--shadow-soft)]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative md:col-span-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by name or location" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
          </div>
          <Select value={bg} onValueChange={setBg}>
            <SelectTrigger><SelectValue placeholder="Blood group" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All blood groups</SelectItem>
              {BLOOD_GROUPS.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={loc} onValueChange={setLoc}>
            <SelectTrigger><SelectValue placeholder="Location" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All locations</SelectItem>
              {locations.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card className="border-0 shadow-[var(--shadow-soft)] overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead>Name</TableHead>
                <TableHead>Blood Group</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Last Donation</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-10">No donors found.</TableCell>
                </TableRow>
              ) : filtered.map((d) => (
                <TableRow key={d.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs">
                        {d.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </div>
                      <div>
                        <p className="font-medium">{d.name}</p>
                        <p className="text-xs text-muted-foreground">{d.available ? "Available" : "Unavailable"}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell><Badge variant="outline" className="border-primary/30 text-primary font-semibold">{d.bloodGroup}</Badge></TableCell>
                  <TableCell><span className="inline-flex items-center gap-1 text-sm"><MapPin className="h-3.5 w-3.5 text-muted-foreground" />{d.location}</span></TableCell>
                  <TableCell><span className="inline-flex items-center gap-1 text-sm"><Phone className="h-3.5 w-3.5 text-muted-foreground" />{d.contact}</span></TableCell>
                  <TableCell className="text-sm">{new Date(d.lastDonationDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => setSelected(d)}>
                      <Eye className="mr-1 h-4 w-4" /> View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selected?.name}</DialogTitle>
            <DialogDescription>Donor profile</DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><p className="text-muted-foreground">Blood Group</p><p className="font-semibold">{selected.bloodGroup}</p></div>
              <div><p className="text-muted-foreground">Status</p><p className="font-semibold">{selected.available ? "Available" : "Unavailable"}</p></div>
              <div><p className="text-muted-foreground">Location</p><p className="font-semibold">{selected.location}</p></div>
              <div><p className="text-muted-foreground">Contact</p><p className="font-semibold">{selected.contact}</p></div>
              <div className="col-span-2"><p className="text-muted-foreground">Last Donation</p><p className="font-semibold">{new Date(selected.lastDonationDate).toLocaleDateString()}</p></div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Donors;
