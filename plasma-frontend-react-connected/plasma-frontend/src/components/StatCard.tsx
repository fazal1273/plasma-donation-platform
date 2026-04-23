import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  variant?: "primary" | "secondary" | "success" | "warning";
};

const variantStyles: Record<NonNullable<Props["variant"]>, string> = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
};

export function StatCard({ title, value, icon: Icon, trend, variant = "primary" }: Props) {
  return (
    <Card className="overflow-hidden border-0 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-card)] transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
            {trend && <p className="mt-1 text-xs text-success font-medium">{trend}</p>}
          </div>
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${variantStyles[variant]}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
