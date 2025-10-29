import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Syringe } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(username, password);
      toast({
        title: 'Đăng nhập thành công',
        description: 'Chào mừng bạn quay trở lại!'
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Đăng nhập thất bại',
        description: 'Tài khoản hoặc mật khẩu không chính xác',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = (user: string) => {
    setUsername(user);
    setPassword('123456');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100">
      <div className="w-full max-w-5xl px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-4 shadow-xl">
            <Syringe className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Hệ Thống Quản Lý Tiêm Chủng</h1>
          <p className="text-gray-600 text-lg">Đăng nhập để tiếp tục</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Đăng nhập</CardTitle>
              <CardDescription>Nhập thông tin tài khoản của bạn</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Tài khoản</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Nhập tài khoản"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-11"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Mật khẩu</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-11 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Tài khoản demo</CardTitle>
              <CardDescription>Click vào tài khoản để đăng nhập nhanh</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('admin')}
                  className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-lg border-2 border-green-200 transition-all hover:shadow-md"
                >
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">admin</p>
                    <p className="text-sm text-gray-600">Nguyễn Văn Admin</p>
                  </div>
                  <span className="text-xs font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
                    Quản trị viên
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin('bskham')}
                  className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 rounded-lg border-2 border-blue-200 transition-all hover:shadow-md"
                >
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">bskham</p>
                    <p className="text-sm text-gray-600">BS. Trần Thị Hoa</p>
                  </div>
                  <span className="text-xs font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                    Bác sĩ khám
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin('bstiem')}
                  className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-lg border-2 border-purple-200 transition-all hover:shadow-md"
                >
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">bstiem</p>
                    <p className="text-sm text-gray-600">BS. Lê Văn Minh</p>
                  </div>
                  <span className="text-xs font-medium text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                    Bác sĩ tiêm
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin('thungan')}
                  className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 rounded-lg border-2 border-orange-200 transition-all hover:shadow-md"
                >
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">thungan</p>
                    <p className="text-sm text-gray-600">Phạm Thị Thu</p>
                  </div>
                  <span className="text-xs font-medium text-orange-700 bg-orange-100 px-3 py-1 rounded-full">
                    Thu ngân
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin('qlvaccine')}
                  className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-teal-50 to-cyan-50 hover:from-teal-100 hover:to-cyan-100 rounded-lg border-2 border-teal-200 transition-all hover:shadow-md"
                >
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">qlvaccine</p>
                    <p className="text-sm text-gray-600">Hoàng Văn Nam</p>
                  </div>
                  <span className="text-xs font-medium text-teal-700 bg-teal-100 px-3 py-1 rounded-full">
                    Quản lý vaccine
                  </span>
                </button>
              </div>

              <p className="text-xs text-center text-gray-500 mt-4">
                Mật khẩu mặc định: <span className="font-semibold">123456</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
