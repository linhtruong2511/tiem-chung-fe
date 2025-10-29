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
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { ThanhToan } from '@/types';

export default function ThanhToanPage() {
  const [page, setPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTT, setEditingTT] = useState<ThanhToan | null>(null);

  const mockData: ThanhToan[] = [
    {
      id: 1,
      tongTien: 500000,
      tienNhan: 500000,
      tienTraLai: 0,
      maPTTT: 1,
      maNV: 4,
      maPhieuTiem: 1,
      ghiChu: 'Thanh toán tiền mặt'
    }
  ];

  const handleDelete = (_id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa thanh toán này?')) {
      // TODO: Call API
      // fetch(`${API_BASE_URL}/thanhtoan/${id}`, { method: 'DELETE' })
    }
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const formData = new FormData(e.currentTarget);

    if (editingTT) {
      // TODO: Update API
      // fetch(`${API_BASE_URL}/thanhtoan/${editingTT.id}`, {
      //   method: 'PUT',
      //   body: formData
      // });
    } else {
      // TODO: Create API
      // fetch(`${API_BASE_URL}/thanhtoan`, {
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
        <h2 className="text-3xl font-bold text-gray-900">Quản lý thanh toán</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingTT(null)}>
              <Plus className="w-4 h-4 mr-2" />
              Tạo thanh toán
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingTT ? 'Cập nhật' : 'Tạo'} thanh toán</DialogTitle>
              <DialogDescription>
                Điền thông tin thanh toán
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maPhieuTiem">Mã phiếu tiêm</Label>
                  <Input id="maPhieuTiem" name="maPhieuTiem" type="number" defaultValue={editingTT?.maPhieuTiem} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maNV">Mã nhân viên</Label>
                  <Input id="maNV" name="maNV" type="number" defaultValue={editingTT?.maNV} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tienNhan">Tiền nhận (VNĐ)</Label>
                  <Input id="tienNhan" name="tienNhan" type="number" defaultValue={editingTT?.tienNhan} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tienTraLai">Tiền trả lại (VNĐ)</Label>
                  <Input id="tienTraLai" name="tienTraLai" type="number" defaultValue={editingTT?.tienTraLai} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maPTTT">Phương thức thanh toán</Label>
                  <Select name="maPTTT" defaultValue={editingTT?.maPTTT.toString()}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn phương thức" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Tiền mặt</SelectItem>
                      <SelectItem value="2">Chuyển khoản</SelectItem>
                      <SelectItem value="3">Thẻ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="ghiChu">Ghi chú</Label>
                  <Textarea id="ghiChu" name="ghiChu" defaultValue={editingTT?.ghiChu} />
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
            <Input placeholder="Tìm theo mã phiếu tiêm..." className="flex-1" />
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
                <TableHead>Mã phiếu tiêm</TableHead>
                <TableHead>Tổng tiền</TableHead>
                <TableHead>Tiền nhận</TableHead>
                <TableHead>Tiền trả lại</TableHead>
                <TableHead>PTTT</TableHead>
                <TableHead>Ghi chú</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.map((tt) => (
                <TableRow key={tt.id}>
                  <TableCell>{tt.id}</TableCell>
                  <TableCell>{tt.maPhieuTiem}</TableCell>
                  <TableCell className="font-medium">{formatCurrency(tt.tongTien)}</TableCell>
                  <TableCell>{formatCurrency(tt.tienNhan)}</TableCell>
                  <TableCell>{formatCurrency(tt.tienTraLai)}</TableCell>
                  <TableCell>
                    {tt.maPTTT === 1 ? 'Tiền mặt' : tt.maPTTT === 2 ? 'Chuyển khoản' : 'Thẻ'}
                  </TableCell>
                  <TableCell>{tt.ghiChu}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                          setEditingTT(tt);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(tt.id)}
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
