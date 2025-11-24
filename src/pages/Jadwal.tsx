import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ScheduleCard } from '@/components/schedule/ScheduleCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Calendar, Clock, Zap, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Jadwal = () => {
  const { user } = useAuth();
  const [schedules, setSchedules] = useState<any[]>([]);
  const [filteredSchedules, setFilteredSchedules] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    start_time: '',
    end_time: '',
    location: '',
    priority: 'medium',
    status: 'pending',
  });

  useEffect(() => {
    loadSchedules();
  }, [user]);

  useEffect(() => {
    filterSchedules();
  }, [schedules, searchQuery, filterStatus]);

  const loadSchedules = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('schedules')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) throw error;
      setSchedules(data || []);
    } catch (error) {
      console.error('Error loading schedules:', error);
    }
  };

  const filterSchedules = () => {
    let filtered = schedules;

    if (searchQuery) {
      filtered = filtered.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter((s) => s.status === filterStatus);
    }

    setFilteredSchedules(filtered);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const scheduleData = {
        ...formData,
        user_id: user?.id,
        description: '',
      };

      if (editingSchedule) {
        const { error } = await supabase
          .from('schedules')
          .update(scheduleData)
          .eq('id', editingSchedule.id);

        if (error) throw error;
        toast.success('Jadwal berhasil diperbarui');
      } else {
        const { error } = await supabase
          .from('schedules')
          .insert([scheduleData]);

        if (error) throw error;
        toast.success('Jadwal berhasil ditambahkan');
      }

      loadSchedules();
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Gagal menyimpan jadwal');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('schedules')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Jadwal berhasil dihapus');
      loadSchedules();
    } catch (error) {
      toast.error('Gagal menghapus jadwal');
    }
  };

  const handleStatusChange = async (schedule: any, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('schedules')
        .update({ status: newStatus })
        .eq('id', schedule.id);

      if (error) throw error;
      toast.success('Status berhasil diperbarui');
      loadSchedules();
    } catch (error) {
      toast.error('Gagal memperbarui status');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      date: '',
      start_time: '',
      end_time: '',
      location: '',
      priority: 'medium',
      status: 'pending',
    });
    setEditingSchedule(null);
  };

  const openEditDialog = (schedule: any) => {
    setEditingSchedule(schedule);
    setFormData({
      title: schedule.title,
      date: schedule.date,
      start_time: schedule.start_time,
      end_time: schedule.end_time,
      location: schedule.location,
      priority: schedule.priority,
      status: schedule.status,
    });
    setIsDialogOpen(true);
  };

  const stats = {
    total: schedules.length,
    pending: schedules.filter((s) => s.status === 'pending').length,
    ongoing: schedules.filter((s) => s.status === 'ongoing').length,
    completed: schedules.filter((s) => s.status === 'completed').length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Calendar className="w-8 h-8" />
              Kelola Jadwal
            </h1>
            <p className="text-muted-foreground mt-1">
              Pantau dan atur seluruh kegiatan Anda dengan mudah
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90" onClick={resetForm}>
                <Plus className="w-5 h-5 mr-2" />
                Tambah Jadwal Baru
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingSchedule ? 'Edit Jadwal' : 'Tambah Jadwal Baru'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Judul Kegiatan</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Tanggal</Label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Lokasi</Label>
                    <Input
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Waktu Mulai</Label>
                    <Input
                      type="time"
                      value={formData.start_time}
                      onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Waktu Selesai</Label>
                    <Input
                      type="time"
                      value={formData.end_time}
                      onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Prioritas</Label>
                    <Select
                      value={formData.priority}
                      onValueChange={(value) => setFormData({ ...formData, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Rendah</SelectItem>
                        <SelectItem value="medium">Sedang</SelectItem>
                        <SelectItem value="high">Tinggi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Belum Dimulai</SelectItem>
                        <SelectItem value="ongoing">Sedang Berlangsung</SelectItem>
                        <SelectItem value="completed">Selesai</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  {editingSchedule ? 'Perbarui Jadwal' : 'Tambah Jadwal'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card border-2 border-primary rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-10 h-10 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Jadwal</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-10 h-10 text-info" />
              <div>
                <p className="text-sm text-muted-foreground">Belum Dimulai</p>
                <p className="text-2xl font-bold">{stats.pending}</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Zap className="w-10 h-10 text-warning" />
              <div>
                <p className="text-sm text-muted-foreground">Sedang Berjalan</p>
                <p className="text-2xl font-bold">{stats.ongoing}</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-10 h-10 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Selesai</p>
                <p className="text-2xl font-bold">{stats.completed}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Cari kegiatan atau lokasi..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">🔍 Semua Status</SelectItem>
              <SelectItem value="pending">Belum Dimulai</SelectItem>
              <SelectItem value="ongoing">Sedang Berlangsung</SelectItem>
              <SelectItem value="completed">Selesai</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchedules.map((schedule) => (
            <ScheduleCard
              key={schedule.id}
              {...schedule}
              startTime={schedule.start_time}
              endTime={schedule.end_time}
              onEdit={() => openEditDialog(schedule)}
              onDelete={() => handleDelete(schedule.id)}
              onStatusChange={(status) => handleStatusChange(schedule, status)}
            />
          ))}
        </div>

        {filteredSchedules.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Tidak ada jadwal yang ditemukan</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Jadwal;
