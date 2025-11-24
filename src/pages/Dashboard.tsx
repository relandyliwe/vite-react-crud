import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/button';
import { Calendar, CheckCircle, Bell, MessageCircle, Plus, Bot } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    todayCompleted: 0,
    todayTotal: 0,
    activeReminders: 0,
    chats: 0,
  });
  const [todaySchedules, setTodaySchedules] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;

    try {
      const [schedulesRes, remindersRes] = await Promise.all([
        supabase.from('schedules').select('*').eq('user_id', user.id),
        supabase.from('reminders').select('*').eq('user_id', user.id),
      ]);

      const schedules = schedulesRes.data || [];
      const today = new Date().toISOString().split('T')[0];
      const todaySchedules = schedules.filter((s: any) => s.date === today);

      setStats({
        total: schedules.length,
        todayCompleted: todaySchedules.filter((s: any) => s.status === 'completed').length,
        todayTotal: todaySchedules.length,
        activeReminders: (remindersRes.data || []).filter((r: any) => r.is_active).length,
        chats: 0,
      });

      setTodaySchedules(todaySchedules);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="bg-gradient-hero rounded-3xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back {profile?.full_name || 'User'}! 👋
          </h1>
          <p className="text-white/90 mb-6">
            AI Planner siap membantu Anda mengatur jadwal dan meningkatkan produktivitas hari ini.
          </p>
          <div className="flex gap-4">
            <Button
              onClick={() => navigate('/jadwal')}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
            >
              <Plus className="w-5 h-5 mr-2" />
              Tambah Jadwal Baru
            </Button>
            <Button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/20">
              <Bot className="w-5 h-5 mr-2" />
              Chat dengan AI
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={Calendar}
            title="TOTAL KEGIATAN"
            value={stats.total}
            subtitle="+0 dari minggu lalu"
            iconBg="bg-gradient-primary"
          />
          <StatCard
            icon={CheckCircle}
            title="SELESAI HARI INI"
            value={`${stats.todayCompleted}/${stats.todayTotal}`}
            subtitle={`${stats.todayTotal > 0 ? Math.round((stats.todayCompleted / stats.todayTotal) * 100) : 0}% completion rate`}
            iconBg="bg-success"
          />
          <StatCard
            icon={Bell}
            title="REMINDER AKTIF"
            value={stats.activeReminders}
            subtitle="Notifikasi WhatsApp"
            iconBg="bg-warning"
          />
          <StatCard
            icon={MessageCircle}
            title="CHAT AI"
            value={stats.chats}
            subtitle="Percakapan bulan ini"
            iconBg="bg-gradient-secondary"
          />
        </div>

        <div className="bg-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Kegiatan Hari Ini</h2>
              <p className="text-muted-foreground">
                {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
            <Button variant="link" className="text-primary" onClick={() => navigate('/jadwal')}>
              Lihat Semua →
            </Button>
          </div>

          {todaySchedules.length > 0 ? (
            <div className="space-y-4">
              {todaySchedules.map((schedule) => (
                <div
                  key={schedule.id}
                  className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl"
                >
                  <div className="text-lg font-bold w-20">{schedule.start_time}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{schedule.title}</h3>
                    {schedule.status === 'ongoing' && (
                      <span className="inline-block px-3 py-1 bg-warning/20 text-warning text-xs font-semibold rounded-full mt-1">
                        Sedang Berlangsung
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              Tidak ada jadwal untuk hari ini
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
