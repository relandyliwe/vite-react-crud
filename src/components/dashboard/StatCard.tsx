import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  subtitle?: string;
  iconBg: string;
}

export const StatCard = ({ icon: Icon, title, value, subtitle, iconBg }: StatCardProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-4">
        <div className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-muted-foreground uppercase font-medium">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          {subtitle && <p className="text-xs text-success mt-1">{subtitle}</p>}
        </div>
      </div>
    </Card>
  );
};
