import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, Syringe, Package, Activity, CreditCard } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  const stats = [
    { icon: Users, label: 'Tổng khách hàng', value: '1,234', color: 'from-green-500 to-emerald-500' },
    { icon: FileText, label: 'Phiếu khám hôm nay', value: '45', color: 'from-blue-500 to-cyan-500' },
    { icon: Syringe, label: 'Phiếu tiêm hôm nay', value: '38', color: 'from-purple-500 to-pink-500' },
    { icon: Package, label: 'Tổng vaccine', value: '25', color: 'from-teal-500 to-cyan-500' },
    { icon: CreditCard, label: 'Doanh thu hôm nay', value: '15.5M VNĐ', color: 'from-orange-500 to-amber-500' },
    { icon: Activity, label: 'Hoạt động', value: '98%', color: 'from-emerald-500 to-green-500' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Tổng quan</h2>
        <p className="text-gray-600 mt-1">
          Chào mừng {user?.hoTen} - {user?.vaiTro.replace(/_/g, ' ')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-xl transition-all hover:-translate-y-1 border-none shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.label}
              </CardTitle>
              <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-xl shadow-md`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Khám sàng lọc hoàn thành</p>
                  <p className="text-xs text-gray-500">Khách hàng: Nguyễn Văn A</p>
                </div>
                <span className="text-xs text-gray-500">5 phút trước</span>
              </div>
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Tiêm chủng thành công</p>
                  <p className="text-xs text-gray-500">Vaccine: Pfizer COVID-19</p>
                </div>
                <span className="text-xs text-gray-500">12 phút trước</span>
              </div>
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Nhập lô vaccine mới</p>
                  <p className="text-xs text-gray-500">Số lượng: 500 liều</p>
                </div>
                <span className="text-xs text-gray-500">1 giờ trước</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thông báo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="font-medium text-sm text-yellow-800">Cảnh báo tồn kho</p>
                <p className="text-xs text-yellow-700 mt-1">
                  Vaccine Hepatitis B sắp hết hàng
                </p>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="font-medium text-sm text-blue-800">Lịch làm việc</p>
                <p className="text-xs text-blue-700 mt-1">
                  Bạn có 15 lượt khám sàng lọc hôm nay
                </p>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="font-medium text-sm text-green-800">Hoàn thành mục tiêu</p>
                <p className="text-xs text-green-700 mt-1">
                  Đã hoàn thành 95% kế hoạch tháng này
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
