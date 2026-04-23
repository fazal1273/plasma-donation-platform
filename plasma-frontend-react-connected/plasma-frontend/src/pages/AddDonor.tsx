import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addDonor } from "@/store/donorStore";
import { BLOOD_GROUPS } from "@/data/mockData";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  bloodGroup: z.string().min(1, "Select a blood group"),
  location: z.string().trim().min(2, "Location is required").max(100),
  contact: z.string().trim().min(7, "Enter a valid contact number").max(20),
  lastDonationDate: z.string().min(1, "Select a date"),
});

const AddDonor = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", bloodGroup: "", location: "", contact: "", lastDonationDate: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await addDonor(parsed.data as Required<typeof form>);
      toast.success("Donor added successfully");
      navigate("/donors");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to add donor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-0 shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle>Add New Donor</CardTitle>
          <CardDescription>Register a plasma donor to the directory.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Jane Doe" />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Blood Group</Label>
                <Select value={form.bloodGroup} onValueChange={(v) => update("bloodGroup", v)}>
                  <SelectTrigger><SelectValue placeholder="Select blood group" /></SelectTrigger>
                  <SelectContent>
                    {BLOOD_GROUPS.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                  </SelectContent>
                </Select>
                {errors.bloodGroup && <p className="text-xs text-destructive">{errors.bloodGroup}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="Mumbai" />
                {errors.location && <p className="text-xs text-destructive">{errors.location}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact">Contact Number</Label>
                <Input id="contact" value={form.contact} onChange={(e) => update("contact", e.target.value)} placeholder="+91 98765 43210" />
                {errors.contact && <p className="text-xs text-destructive">{errors.contact}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Last Donation Date</Label>
                <Input id="date" type="date" value={form.lastDonationDate} onChange={(e) => update("lastDonationDate", e.target.value)} />
                {errors.lastDonationDate && <p className="text-xs text-destructive">{errors.lastDonationDate}</p>}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add Donor
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate("/donors")}>Cancel</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddDonor;
