import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Brain, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('brayen');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(username, password);
      if (success) {
        toast.success('Login berhasil!');
        navigate('/dashboard');
      } else {
        toast.error('Username atau password salah');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <div className="w-full max-w-md">
        <div className="bg-gradient-primary rounded-3xl p-8 text-center mb-6">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Brain className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">AI Planner</h1>
          <p className="text-white/90">✨ Asisten Pribadi Cerdas Anda ✨</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Selamat Datang Kembali! 👋</h2>
            <p className="text-muted-foreground">Masuk untuk mengatur jadwal Anda</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 bg-muted/50 border-none"
                  placeholder="brayen"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-muted/50 border-none"
                  placeholder="••••••"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-primary hover:opacity-90 text-white font-semibold py-6 text-lg"
              disabled={isLoading}
            >
              Masuk →
            </Button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm">
              Belum punya akun?{' '}
              <Link to="/register" className="text-primary font-semibold hover:underline">
                Daftar di sini →
              </Link>
            </p>
            <Link to="/forgot-password" className="text-sm text-primary hover:underline block">
              Lupa password?
            </Link>
          </div>

          <p className="text-xs text-center text-muted-foreground mt-8">
            © 2025 AI Planner. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
