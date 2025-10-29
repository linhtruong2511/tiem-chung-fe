import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { KhachHang } from '@/types';
import { FilterSection } from '@/components/FilterSection';

export default function KhachHangPage() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [tuoiTu, setTuoiTu] = useState('');
  const [tuoiDen, setTuoiDen] = useState('');
  const [gioiTinh, setGioiTinh] = useState('');
  const [page, setPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingKH, setEditingKH] = useState<KhachHang | null>(null);

  const mockData: KhachHang[] = [
    {
      ID: 1,
      HoTen: 'Nguyễn Văn A',
      NgaySinh: '1990-01-15',
      GioiTinh: 'Nam',
      CCCD: '001234567890',
      SoDienThoai: '0901234567',
      DiaChi: 'Hà Nội',
      Tuoi: 34,
      Email: 'nguyenvana@email.com',
      NgayTao: '2024-01-01'
    },
    {
      ID: 2,
      HoTen: 'Trần Thị B',
      NgaySinh: '1985-05-20',
      GioiTinh: 'Nữ',
      CCCD: '001234567891',
      SoDienThoai: '0901234568',
      DiaChi: 'TP.HCM',
      Tuoi: 39,
      Email: 'tranthib@email.com',
      NgayTao: '2024-01-02'
    },
    {
      ID: 3,
      HoTen: 'Lê Văn C',
      NgaySinh: '1995-08-10',
      GioiTinh: 'Nam',
      CCCD: '001234567892',
      SoDienThoai: '0901234569',
      DiaChi: 'Đà Nẵng',
      Tuoi: 29,
      Email: 'levanc@email.com',
      NgayTao: '2024-01-03'
    }
  ];

  const handleSearch = () => {
    console.log({ searchKeyword, tuoiTu, tuoiDen, gioiTinh });
  };

  const handleReset = () => {
    setSearchKeyword('');
    setTuoiTu('');
    setTuoiDen('');
    setGioiTinh('');
  };

  const handleDelete = (_id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa khách hàng này?')) {
      // TODO: Call API
    }
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Quản lý khách hàng</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setEditingKH(null)}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold shadow-md"
            >
              <Plus className="w-4 h-4 mr-2" />
              Thêm khách hàng
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingKH ? 'Cập nhật' : 'Thêm'} khách hàng</DialogTitle>
              <DialogDescription>
                Điền thông tin khách hàng vào form bên dưới
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="HoTen">Họ tên</Label>
                  <Input id="HoTen" name="HoTen" defaultValue={editingKH?.HoTen} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="NgaySinh">Ngày sinh</Label>
                  <Input id="NgaySinh" name="NgaySinh" type="date" defaultValue={editingKH?.NgaySinh} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="GioiTinh">Giới tính</Label>
                  <Select name="GioiTinh" defaultValue={editingKH?.GioiTinh}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn giới tính" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Nam">Nam</SelectItem>
                      <SelectItem value="Nữ">Nữ</SelectItem>
                      <SelectItem value="Khác">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="CCCD">CCCD</Label>
                  <Input id="CCCD" name="CCCD" defaultValue={editingKH?.CCCD} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="SoDienThoai">Số điện thoại</Label>
                  <Input id="SoDienThoai" name="SoDienThoai" defaultValue={editingKH?.SoDienThoai} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="Email">Email</Label>
                  <Input id="Email" name="Email" type="email" defaultValue={editingKH?.Email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="Tuoi">Tuổi</Label>
                  <Input id="Tuoi" name="Tuoi" type="number" defaultValue={editingKH?.Tuoi} />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="DiaChi">Địa chỉ</Label>
                  <Input id="DiaChi" name="DiaChi" defaultValue={editingKH?.DiaChi} required />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="border-gray-300"
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold"
                >
                  Lưu
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <FilterSection onReset={handleReset} onSearch={handleSearch}>
        <div className="space-y-2">
          <Label>Từ khóa</Label>
          <Input
            placeholder="Tìm theo tên, CCCD, SĐT..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Tuổi từ</Label>
          <Input
            type="number"
            placeholder="VD: 18"
            value={tuoiTu}
            onChange={(e) => setTuoiTu(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Tuổi đến</Label>
          <Input
            type="number"
            placeholder="VD: 65"
            value={tuoiDen}
            onChange={(e) => setTuoiDen(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Giới tính</Label>
          <Select value={gioiTinh} onValueChange={setGioiTinh}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn giới tính" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="Nam">Nam</SelectItem>
              <SelectItem value="Nữ">Nữ</SelectItem>
              <SelectItem value="Khác">Khác</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </FilterSection>

      <Card className="shadow-md">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">ID</TableHead>
                  <TableHead className="font-semibold">Họ tên</TableHead>
                  <TableHead className="font-semibold">Ngày sinh</TableHead>
                  <TableHead className="font-semibold">Giới tính</TableHead>
                  <TableHead className="font-semibold">SĐT</TableHead>
                  <TableHead className="font-semibold">CCCD</TableHead>
                  <TableHead className="font-semibold">Email</TableHead>
                  <TableHead className="text-right font-semibold">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockData.map((kh) => (
                  <TableRow key={kh.ID} className="hover:bg-green-50">
                    <TableCell>{kh.ID}</TableCell>
                    <TableCell className="font-medium">{kh.HoTen}</TableCell>
                    <TableCell>{new Date(kh.NgaySinh).toLocaleDateString('vi-VN')}</TableCell>
                    <TableCell>{kh.GioiTinh}</TableCell>
                    <TableCell>{kh.SoDienThoai}</TableCell>
                    <TableCell>{kh.CCCD}</TableCell>
                    <TableCell>{kh.Email}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="hover:bg-blue-50 hover:text-blue-600"
                          onClick={() => {
                            setEditingKH(kh);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="hover:bg-red-50 hover:text-red-600"
                          onClick={() => handleDelete(kh.ID)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-2">
        <Button
          variant="outline"
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
          className="border-gray-300"
        >
          Trước
        </Button>
        <Button variant="outline" disabled className="border-gray-300">Trang {page}</Button>
        <Button
          variant="outline"
          onClick={() => setPage(page + 1)}
          className="border-gray-300"
        >
          Sau
        </Button>
      </div>
    </div>
  );
}
