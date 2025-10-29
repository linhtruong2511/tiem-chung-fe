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
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { PhieuKhamSangLoc } from '@/types';

export default function PhieuKhamSangLocPage() {
  const [page, setPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPhieu, setEditingPhieu] = useState<PhieuKhamSangLoc | null>(null);

  const mockData: PhieuKhamSangLoc[] = [
    {
      id: 1,
      thoiGianTao: '2024-01-15T10:30:00',
      maKH: 1,
      maNV: 2,
      trangThai: 'Hoàn thành',
      duDieuKien: true,
      huyetAp: '120/80',
      mach: '75',
      thanNhiet: '36.5',
      ghiChu: 'Khách hàng khỏe mạnh'
    }
  ];

  const handleDelete = (_id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa phiếu khám này?')) {
      // TODO: Call API
      // fetch(`${API_BASE_URL}/phieukhamsangloc/${id}`, { method: 'DELETE' })
    }
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const formData = new FormData(e.currentTarget);

    if (editingPhieu) {
      // TODO: Update API
      // fetch(`${API_BASE_URL}/phieukhamsangloc/${editingPhieu.id}`, {
      //   method: 'PUT',
      //   body: formData
      // });
    } else {
      // TODO: Create API
      // fetch(`${API_BASE_URL}/phieukhamsangloc`, {
      //   method: 'POST',
      //   body: formData
      // });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Phiếu khám sàng lọc</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingPhieu(null)}>
              <Plus className="w-4 h-4 mr-2" />
              Tạo phiếu khám
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPhieu ? 'Cập nhật' : 'Tạo'} phiếu khám sàng lọc</DialogTitle>
              <DialogDescription>
                Điền thông tin khám sàng lọc cho khách hàng
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="MaKH">Mã khách hàng</Label>
                  <Input id="MaKH" name="MaKH" type="number" defaultValue={editingPhieu?.maKH} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="MaNV">Mã nhân viên</Label>
                  <Input id="MaNV" name="MaNV" type="number" defaultValue={editingPhieu?.maNV} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="HuyetAp">Huyết áp</Label>
                  <Input id="HuyetAp" name="HuyetAp" placeholder="120/80" defaultValue={editingPhieu?.huyetAp} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="Mach">Mạch (nhịp/phút)</Label>
                  <Input id="Mach" name="Mach" placeholder="75" defaultValue={editingPhieu?.mach} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ThanNhiet">Thân nhiệt (°C)</Label>
                  <Input id="ThanNhiet" name="ThanNhiet" placeholder="36.5" defaultValue={editingPhieu?.thanNhiet} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="TrangThai">Trạng thái</Label>
                  <Select name="TrangThai" defaultValue={editingPhieu?.trangThai}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Chờ khám">Chờ khám</SelectItem>
                      <SelectItem value="Đang khám">Đang khám</SelectItem>
                      <SelectItem value="Hoàn thành">Hoàn thành</SelectItem>
                      <SelectItem value="Hoãn">Hoãn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="DuDieuKien">Đủ điều kiện tiêm</Label>
                  <Select name="DuDieuKien" defaultValue={editingPhieu?.duDieuKien ? 'true' : 'false'}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Có</SelectItem>
                      <SelectItem value="false">Không</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="LyDoHoan">Lý do hoãn (nếu có)</Label>
                  <Textarea id="LyDoHoan" name="LyDoHoan" defaultValue={editingPhieu?.lyDoHoan} />
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
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Thời gian</TableHead>
                <TableHead>Mã KH</TableHead>
                <TableHead>Huyết áp</TableHead>
                <TableHead>Mạch</TableHead>
                <TableHead>Thân nhiệt</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Đủ ĐK</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.map((phieu) => (
                <TableRow key={phieu.id}>
                  <TableCell>{phieu.id}</TableCell>
                  <TableCell>{new Date(phieu.thoiGianTao).toLocaleString('vi-VN')}</TableCell>
                  <TableCell>{phieu.maKH}</TableCell>
                  <TableCell>{phieu.huyetAp}</TableCell>
                  <TableCell>{phieu.mach}</TableCell>
                  <TableCell>{phieu.thanNhiet}°C</TableCell>
                  <TableCell>
                    <Badge variant={phieu.trangThai === 'Hoàn thành' ? 'default' : 'secondary'}>
                      {phieu.trangThai}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {phieu.duDieuKien ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
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
