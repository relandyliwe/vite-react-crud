import { Calendar, Clock, MapPin, Edit, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ScheduleCardProps {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  priority: 'low' | 'medium' | 'high';
  status: 'completed' | 'ongoing' | 'pending';
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: (status: string) => void;
}

const priorityConfig = {
  low: { label: 'Rendah', color: 'bg-success' },
  medium: { label: 'Sedang', color: 'bg-warning' },
  high: { label: 'Tinggi', color: 'bg-destructive' },
};

const statusConfig = {
  completed: { label: 'Selesai', variant: 'default' as const },
  ongoing: { label: 'Sedang Berlangsung', variant: 'secondary' as const },
  pending: { label: 'Belum Dimulai', variant: 'outline' as const },
};

export const ScheduleCard = ({
  title,
  date,
  startTime,
  endTime,
  location,
  priority,
  status,
  onEdit,
  onDelete,
  onStatusChange,
}: ScheduleCardProps) => {
  return (
    <Card className="p-5 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${priorityConfig[priority].color}`} />
          <span className="text-xs font-semibold">{priorityConfig[priority].label}</span>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={onEdit}>
            <Edit className="w-4 h-4 text-primary" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onDelete}>
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
        </div>
      </div>

      <h3 className="text-lg font-bold mb-3">{title}</h3>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{startTime} - {endTime}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
      </div>

      {status === 'completed' ? (
        <Button
          variant="default"
          size="sm"
          className="w-full bg-success hover:bg-success/90"
          disabled
        >
          ✓ Selesai
        </Button>
      ) : (
        <div className="space-y-2">
          {status === 'pending' && (
            <Button
              variant="outline"
              size="sm"
              className="w-full border-info text-info hover:bg-info/10"
            >
              ← Ojevy
            </Button>
          )}
          <Button
            variant={status === 'ongoing' ? 'default' : 'secondary'}
            size="sm"
            className="w-full bg-primary/10 text-primary hover:bg-primary/20"
            onClick={() => onStatusChange(status === 'ongoing' ? 'completed' : 'ongoing')}
          >
            ⚡ Sedang Berlangsung
          </Button>
        </div>
      )}
    </Card>
  );
};
