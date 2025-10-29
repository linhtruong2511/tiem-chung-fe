import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { NhanVien } from '@/types';

export default function NhanVienPage() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNV, setEditingNV] = useState<NhanVien | null>(null);

  const mockData: NhanVien[] = [
    {
      id: 1,
      hoTen: 'Bs. Nguyễn Văn A',
      ngaySinh: '1985-05-15',
      gioiTinh: 'Nam',
      cccd: '001234567890',
      soDienThoai: '0901234567',
      diaChi: 'Hà Nội',
      taiKhoan: 'bskhama',
      luongCoBan: 15000000,
      ngayVaoLam: '2020-01-01',
      soNamKinhNghiem: 10,
      vaiTro: 'BAC_SI_KHAM'
    }
  ];

  const handleDelete = (_id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
      // TODO: Call API
      // fetch(`${API_BASE_URL}/nhanvien/${id}`, { method: 'DELETE' })
    }
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const formData = new FormData(e.currentTarget);

    if (editingNV) {
      // TODO: Update API
      // fetch(`${API_BASE_URL}/nhanvien/${editingNV.id}`, {
      //   method: 'POST',
      //   body: formData
      // });
    } else {
      // TODO: Create API
      // fetch(`${API_BASE_URL}/nhanvien`, {
      //   method: 'POST',
      //   body: formData
      // });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Quản lý nhân viên</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingNV(null)}>
              <Plus className="w-4 h-4 mr-2" />
              Thêm nhân viên
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingNV ? 'Cập nhật' : 'Thêm'} nhân viên</DialogTitle>
              <DialogDescription>
                Điền thông tin nhân viên
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="HoTen">Họ tên</Label>
                  <Input id="HoTen" name="HoTen" defaultValue={editingNV?.hoTen} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="NgaySinh">Ngày sinh</Label>
                  <Input id="NgaySinh" name="NgaySinh" type="date" defaultValue={editingNV?.ngaySinh} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="GioiTinh">Giới tính</Label>
                  <Select name="GioiTinh" defaultValue={editingNV?.gioiTinh}>
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
                  <Input id="CCCD" name="CCCD" defaultValue={editingNV?.cccd} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="SoDienThoai">Số điện thoại</Label>
                  <Input id="SoDienThoai" name="SoDienThoai" defaultValue={editingNV?.soDienThoai} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="TaiKhoan">Tài khoản</Label>
                  <Input id="TaiKhoan" name="TaiKhoan" defaultValue={editingNV?.taiKhoan} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="VaiTro">Vai trò</Label>
                  <Select name="VaiTro" defaultValue={editingNV?.vaiTro}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn vai trò" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="QUAN_TRI_VIEN">Quản trị viên</SelectItem>
                      <SelectItem value="BAC_SI_KHAM">Bác sĩ khám</SelectItem>
                      <SelectItem value="BAC_SI_TIEM">Bác sĩ tiêm</SelectItem>
                      <SelectItem value="THU_NGAN">Thu ngân</SelectItem>
                      <SelectItem value="QUAN_LY_VACCINE">Quản lý vaccine</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="LuongCoBan">Lương cơ bản (VNĐ)</Label>
                  <Input id="LuongCoBan" name="LuongCoBan" type="number" defaultValue={editingNV?.luongCoBan} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="NgayVaoLam">Ngày vào làm</Label>
                  <Input id="NgayVaoLam" name="NgayVaoLam" type="date" defaultValue={editingNV?.ngayVaoLam} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="SoNamKinhNghiem">Số năm kinh nghiệm</Label>
                  <Input id="SoNamKinhNghiem" name="SoNamKinhNghiem" type="number" defaultValue={editingNV?.soNamKinhNghiem} required />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="DiaChi">Địa chỉ</Label>
                  <Input id="DiaChi" name="DiaChi" defaultValue={editingNV?.diaChi} required />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="DiemManh">Điểm mạnh</Label>
                  <Textarea id="DiemManh" name="DiemManh" defaultValue={editingNV?.diemManh} />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="DiemYeu">Điểm yếu</Label>
                  <Textarea id="DiemYeu" name="DiemYeu" defaultValue={editingNV?.diemYeu} />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Hủy
                </Button>
                <Button type="submit">Lưu</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tìm kiếm</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder="Tìm theo tên, CCCD, SĐT..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="flex-1"
            />
            <Button>
              <Search className="w-4 h-4 mr-2" />
              Tìm kiếm
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Họ tên</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead>SĐT</TableHead>
                <TableHead>Lương cơ bản</TableHead>
                <TableHead>Kinh nghiệm</TableHead>
                <TableHead>Ngày vào làm</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.map((nv) => (
                <TableRow key={nv.id}>
                  <TableCell>{nv.id}</TableCell>
                  <TableCell className="font-medium">{nv.hoTen}</TableCell>
                  <TableCell>
                    <Badge>{nv.vaiTro.replace(/_/g, ' ')}</Badge>
                  </TableCell>
                  <TableCell>{nv.soDienThoai}</TableCell>
                  <TableCell>{formatCurrency(nv.luongCoBan)}</TableCell>
                  <TableCell>{nv.soNamKinhNghiem} năm</TableCell>
                  <TableCell>{new Date(nv.ngayVaoLam).toLocaleDateString('vi-VN')}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                          setEditingNV(nv);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(nv.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-2">
        <Button variant="outline" onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>
          Trước
        </Button>
        <Button variant="outline" disabled>Trang {page}</Button>
        <Button variant="outline" onClick={() => setPage(page + 1)}>
          Sau
        </Button>
      </div>
    </div>
  );
}
