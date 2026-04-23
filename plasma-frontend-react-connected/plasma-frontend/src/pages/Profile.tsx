import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/store/authStore";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const initials = user?.name?.slice(0, 2).toUpperCase() || "GU";

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <Card className="border-0 shadow-[var(--shadow-card)] overflow-hidden">
        <div className="h-24" style={{ background: "var(--gradient-hero)" }} />
        <CardContent className="-mt-10 pb-6">
          <Avatar className="h-20 w-20 border-4 border-card">
            <AvatarFallback className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground text-xl font-bold">{initials}</AvatarFallback>
          </Avatar>
          <h2 className="mt-3 text-xl font-bold">{user?.name || "Guest User"}</h2>
          <p className="text-sm text-muted-foreground">{user?.email || "Not signed in"}</p>
        </CardContent>
      </Card>
      <Card className="border-0 shadow-[var(--shadow-soft)]">
        <CardHeader><CardTitle className="text-base">Account</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {user ? (
            <Button variant="destructive" onClick={() => { logout(); navigate("/login"); }}>Log out</Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={() => navigate("/login")}>Log in</Button>
              <Button variant="outline" onClick={() => navigate("/signup")}>Sign up</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
