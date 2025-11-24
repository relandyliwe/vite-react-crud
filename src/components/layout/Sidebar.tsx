import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, User, LogOut, Brain } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

export const Sidebar = () => {
  const { user, logout } = useAuth();

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/jadwal', icon: Calendar, label: 'Jadwal' },
    { to: '/profil', icon: User, label: 'Profil' },
  ];

  return (
    <div className="w-52 h-screen bg-sidebar-bg text-sidebar-fg flex flex-col">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">AI</h1>
          <h2 className="text-xl font-bold text-white">Planner</h2>
        </div>
      </div>

      <nav className="flex-1 px-3 mt-8 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-sidebar-active text-white'
                  : 'text-sidebar-fg hover:bg-sidebar-active/10'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
            {user?.fullName?.charAt(0) || 'B'}
          </div>
          <div>
            <p className="font-semibold text-white">{user?.fullName || 'Brayen'}</p>
            <p className="text-xs text-sidebar-fg/70">
              {user?.isPremium ? 'Premium User' : 'Free User'}
            </p>
          </div>
        </div>
        <Button
          onClick={logout}
          variant="destructive"
          size="sm"
          className="w-full"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};
