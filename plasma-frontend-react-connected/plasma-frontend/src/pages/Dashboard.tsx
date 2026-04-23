import { Users, UserCheck, FileText, Heart, Search, UserPlus, Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/StatCard";
import { useNavigate } from "react-router-dom";
import { useDonors } from "@/store/donorStore";
import { stats } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const navigate = useNavigate();
  const donors = useDonors();
  const available = donors.filter((d) => d.available).length;

  return (
    <div className="space-y-6">
      {/* Hero banner */}
      <section className="relative overflow-hidden rounded-2xl p-6 md:p-10 text-primary-foreground shadow-[var(--shadow-glow)]" style={{ background: "var(--gradient-hero)" }}>
        <div className="relative z-10 max-w-2xl">
          <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">Save Lives Today</Badge>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Donate Plasma, Save Lives</h1>
          <p className="mt-2 text-white/90 max-w-lg">
            Connect with verified plasma donors near you. Every donation can help save up to three lives.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button size="lg" variant="secondary" onClick={() => navigate("/donors")} className="bg-white text-primary hover:bg-white/90">
              <Search className="mr-2 h-4 w-4" /> Find Donors
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/donors/add")} className="bg-transparent border-white text-white hover:bg-white/10">
              <UserPlus className="mr-2 h-4 w-4" /> Add Donor
            </Button>
          </div>
        </div>
        <Droplet className="absolute -right-8 -bottom-8 h-56 w-56 text-white/10" fill="currentColor" />
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Donors" value={stats.totalDonors + donors.length - 8} icon={Users} variant="primary" trend="+12% this month" />
        <StatCard title="Available Donors" value={available + 179} icon={UserCheck} variant="success" trend="+8% this week" />
        <StatCard title="Requests" value={stats.requests} icon={FileText} variant="warning" />
        <StatCard title="Donations" value={stats.donations} icon={Heart} variant="secondary" trend="+24 today" />
      </section>

      {/* Recent donors */}
      <Card className="border-0 shadow-[var(--shadow-soft)]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Recent Donors</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => navigate("/donors")}>View all</Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {donors.slice(0, 4).map((d) => (
            <div key={d.id} className="flex items-center justify-between rounded-lg border bg-card p-3 hover:bg-muted/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                  {d.bloodGroup}
                </div>
                <div>
                  <p className="font-medium text-sm">{d.name}</p>
                  <p className="text-xs text-muted-foreground">{d.location}</p>
                </div>
              </div>
              <Badge variant={d.available ? "default" : "secondary"} className={d.available ? "bg-success text-success-foreground hover:bg-success/90" : ""}>
                {d.available ? "Available" : "Unavailable"}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
