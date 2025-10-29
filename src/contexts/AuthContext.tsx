import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string) => {
    // TODO: Implement API call
    // const response = await fetch(`${API_BASE_URL}/auth/login`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ username, password })
    // });
    // const data = await response.json();
    // setUser(data.user);
    // localStorage.setItem('token', data.token);

    // Mock users for demonstration
    const mockUsers: Record<string, User> = {
      'admin': {
        id: 1,
        hoTen: 'Nguyễn Văn Admin',
        vaiTro: 'QUAN_TRI_VIEN',
        taiKhoan: 'admin'
      },
      'bskham': {
        id: 2,
        hoTen: 'BS. Trần Thị Hoa',
        vaiTro: 'BAC_SI_KHAM',
        taiKhoan: 'bskham'
      },
      'bstiem': {
        id: 3,
        hoTen: 'BS. Lê Văn Minh',
        vaiTro: 'BAC_SI_TIEM',
        taiKhoan: 'bstiem'
      },
      'thungan': {
        id: 4,
        hoTen: 'Phạm Thị Thu',
        vaiTro: 'THU_NGAN',
        taiKhoan: 'thungan'
      },
      'qlvaccine': {
        id: 5,
        hoTen: 'Hoàng Văn Nam',
        vaiTro: 'QUAN_LY_VACCINE',
        taiKhoan: 'qlvaccine'
      }
    };

    const user = mockUsers[username.toLowerCase()];
    if (!user || password !== '123456') {
      throw new Error('Tài khoản hoặc mật khẩu không chính xác');
    }

    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', 'mock-token-' + user.id);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
