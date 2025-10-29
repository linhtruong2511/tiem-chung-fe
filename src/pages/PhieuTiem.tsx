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
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { PhieuTiem } from '@/types';

export default function PhieuTiemPage() {
  const [page, setPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPhieu, setEditingPhieu] = useState<PhieuTiem | null>(null);

  const mockData: PhieuTiem[] = [
    {
      id: 1,
      maNV: 3,
      maPhieuKham: 1,
      diaDiemTiem: 'Phòng tiêm 1',
      viTriTiem: 'Cánh tay trái',
      maVaccine: 5,
      soLieu: 1,
      daThanhToan: true,
      coPhanUng: false,
      ghiChu: 'Tiêm thành công'
    }
  ];

  const handleDelete = (_id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa phiếu tiêm này?')) {
      // TODO: Call API
      // fetch(`${API_BASE_URL}/phieutiem/${id}`, { method: 'DELETE' })
    }
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const formData = new FormData(e.currentTarget);

    if (editingPhieu) {
      // TODO: Update API
      // fetch(`${API_BASE_URL}/phieutiem/${editingPhieu.id}`, {
      //   method: 'PUT',
      //   body: formData
      // });
    } else {
      // TODO: Create API
      // fetch(`${API_BASE_URL}/phieutiem`, {
      //   method: 'POST',
      //   body: formData
      // });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Phiếu tiêm</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingPhieu(null)}>
              <Plus className="w-4 h-4 mr-2" />
              Tạo phiếu tiêm
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPhieu ? 'Cập nhật' : 'Tạo'} phiếu tiêm</DialogTitle>
              <DialogDescription>
                Điền thông tin phiếu tiêm cho khách hàng
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="MaPhieuKham">Mã phiếu khám</Label>
                  <Input id="MaPhieuKham" name="MaPhieuKham" type="number" defaultValue={editingPhieu?.maPhieuKham} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="MaNV">Mã nhân viên</Label>
                  <Input id="MaNV" name="MaNV" type="number" defaultValue={editingPhieu?.maNV} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="MaVaccine">Mã vaccine</Label>
                  <Input id="MaVaccine" name="MaVaccine" type="number" defaultValue={editingPhieu?.maVaccine} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="SoLieu">Số liều</Label>
                  <Input id="SoLieu" name="SoLieu" type="number" defaultValue={editingPhieu?.soLieu} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="DiaDiemTiem">Địa điểm tiêm</Label>
                  <Input id="DiaDiemTiem" name="DiaDiemTiem" placeholder="Phòng tiêm 1" defaultValue={editingPhieu?.diaDiemTiem} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ViTriTiem">Vị trí tiêm</Label>
                  <Input id="ViTriTiem" name="ViTriTiem" placeholder="Cánh tay trái" defaultValue={editingPhieu?.viTriTiem} required />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="GhiChu">Ghi chú</Label>
                  <Textarea id="GhiChu" name="GhiChu" defaultValue={editingPhieu?.ghiChu} />
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
            <Input placeholder="Tìm theo mã phiếu khám, vaccine..." className="flex-1" />
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
                <TableHead>Mã phiếu khám</TableHead>
                <TableHead>Mã vaccine</TableHead>
                <TableHead>Địa điểm</TableHead>
                <TableHead>Vị trí</TableHead>
                <TableHead>Số liều</TableHead>
                <TableHead>Thanh toán</TableHead>
                <TableHead>Phản ứng</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.map((phieu) => (
                <TableRow key={phieu.id}>
                  <TableCell>{phieu.id}</TableCell>
                  <TableCell>{phieu.maPhieuKham}</TableCell>
                  <TableCell>{phieu.maVaccine}</TableCell>
                  <TableCell>{phieu.diaDiemTiem}</TableCell>
                  <TableCell>{phieu.viTriTiem}</TableCell>
                  <TableCell>{phieu.soLieu}</TableCell>
                  <TableCell>
                    <Badge variant={phieu.daThanhToan ? 'default' : 'secondary'}>
                      {phieu.daThanhToan ? 'Đã thanh toán' : 'Chưa thanh toán'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={phieu.coPhanUng ? 'destructive' : 'default'}>
                      {phieu.coPhanUng ? 'Có' : 'Không'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                          setEditingPhieu(phieu);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(phieu.id)}
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
