import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, User as UserIcon, Shield, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Profil = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    gender: user?.gender || '',
    birthDate: user?.birthDate || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser(formData);
      toast.success('Profil berhasil diperbarui');
    } catch (error) {
      toast.error('Gagal memperbarui profil');
    }
  };

  const scheduleCount = 3;
  const memberSince = user?.joinedDate ? new Date(user.joinedDate).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }) : 'November 2025';

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-gradient-hero rounded-3xl p-8 text-white">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-primary text-4xl font-bold">
              {user?.fullName?.charAt(0) || 'B'}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-1">{user?.fullName || 'Brayen'}</h1>
              <p className="text-white/90 mb-3">@{user?.username || 'brayen'}</p>
              <div className="flex gap-3">
                <span className="px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                  📧 {user?.email || 'brayen@gmail.com'}
                </span>
                <span className="px-4 py-1 bg-warning/90 rounded-full text-sm font-semibold">
                  Premium User
                </span>
                <span className="px-4 py-1 bg-success/90 rounded-full text-sm font-semibold">
                  ✓ Aktif
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="text-3xl font-bold">{scheduleCount}</p>
                <p className="text-muted-foreground">Jadwal</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center">
                <Calendar className="w-8 h-8 text-accent" />
              </div>
              <div>
                <p className="text-3xl font-bold">{memberSince}</p>
                <p className="text-muted-foreground">Member Sejak</p>
              </div>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <UserIcon className="w-4 h-4" />
              Informasi Pribadi
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Keamanan Akun
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Pengaturan
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <UserIcon className="w-6 h-6" />
                    Informasi Pribadi
                  </h2>
                  <p className="text-muted-foreground">
                    Kelola data pribadi dan informasi kontak Anda
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label>Nama Lengkap *</Label>
                  <Input
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Email *</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Nomor WhatsApp</Label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Jenis Kelamin</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) => setFormData({ ...formData, gender: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis kelamin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                        <SelectItem value="Perempuan">Perempuan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Tanggal Lahir</Label>
                    <Input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    />
                  </div>
                </div>

                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  Simpan Perubahan
                </Button>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Keamanan Akun
              </h2>
              <p className="text-muted-foreground mb-6">
                Kelola password dan pengaturan keamanan akun Anda
              </p>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  Ubah Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Autentikasi Dua Faktor
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Riwayat Login
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Settings className="w-6 h-6" />
                Pengaturan
              </h2>
              <p className="text-muted-foreground mb-6">
                Atur preferensi dan notifikasi aplikasi
              </p>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  Preferensi Notifikasi
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Bahasa & Regional
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Privasi
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Profil;
