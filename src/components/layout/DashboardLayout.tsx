import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Menu,
  X,
  LogOut,
  User,
  Users,
  FileText,
  Syringe,
  CreditCard,
  Package,
  LayoutDashboard,
  Activity
} from 'lucide-react';
import { VaiTro } from '@/types';

const menuItems: Record<VaiTro, Array<{ icon: any; label: string; path: string }>> = {
  QUAN_TRI_VIEN: [
    { icon: LayoutDashboard, label: 'Tổng quan', path: '/dashboard' },
    { icon: Users, label: 'Nhân viên', path: '/nhan-vien' },
    { icon: User, label: 'Khách hàng', path: '/khach-hang' },
    { icon: Package, label: 'Vaccine', path: '/vaccine' },
    { icon: Activity, label: 'Thống kê', path: '/thong-ke' }
  ],
  BAC_SI_KHAM: [
    { icon: FileText, label: 'Phiếu khám sàng lọc', path: '/phieu-kham-sang-loc' },
    { icon: User, label: 'Khách hàng', path: '/khach-hang' }
  ],
  BAC_SI_TIEM: [
    { icon: Syringe, label: 'Phiếu tiêm', path: '/phieu-tiem' },
    { icon: FileText, label: 'Phiếu khám', path: '/phieu-kham-sang-loc' }
  ],
  THU_NGAN: [
    { icon: CreditCard, label: 'Thanh toán', path: '/thanh-toan' },
    { icon: Syringe, label: 'Phiếu tiêm', path: '/phieu-tiem' }
  ],
  QUAN_LY_VACCINE: [
    { icon: Package, label: 'Vaccine', path: '/vaccine' },
    { icon: FileText, label: 'Lô vaccine', path: '/lo-vaccine' }
  ]
};

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userMenuItems = user ? menuItems[user.vaiTro] : [];

  const getDefaultPath = () => {
    if (userMenuItems.length > 0) {
      return userMenuItems[0].path;
    }
    return '/dashboard';
  };

  if (location.pathname === '/' || location.pathname === '/dashboard') {
    const defaultPath = getDefaultPath();
    if (location.pathname !== defaultPath && user?.vaiTro !== 'QUAN_TRI_VIEN') {
      navigate(defaultPath, { replace: true });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg z-50">
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-green-700"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X /> : <Menu />}
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
                <Syringe className="w-6 h-6 text-green-600" />
              </div>
              <h1 className="text-xl font-bold text-white">Quản Lý Tiêm Chủng</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-white">{user?.hoTen}</p>
              <p className="text-xs text-green-100">{user?.vaiTro.replace(/_/g, ' ')}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-green-700"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <aside
        className={`fixed top-16 left-0 bottom-0 w-56 bg-white shadow-xl transition-transform duration-300 z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <nav className="p-3 space-y-1">
          {userMenuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Button
                key={item.path}
                variant="ghost"
                className={`w-full justify-start h-11 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-md'
                    : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                }`}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </aside>

      <main className="pt-16 lg:pl-56">
        <div className="p-8 max-w-[1800px] mx-auto">
          <Outlet />
        </div>
      </main>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
