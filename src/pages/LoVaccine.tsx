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
import { Search, Plus, Edit, Trash2, PackagePlus } from 'lucide-react';
import { LoVaccine } from '@/types';

export default function LoVaccinePage() {
  const [page, setPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isNhapDialogOpen, setIsNhapDialogOpen] = useState(false);
  const [editingLo, setEditingLo] = useState<LoVaccine | null>(null);

  const mockData: LoVaccine[] = [
    {
      id: 1,
      hangVC: 'VNPost',
      maNV: 5,
      ngayTao: '2024-01-15T08:00:00'
    }
  ];

  const handleDelete = (_id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa lô này?')) {
      // TODO: Call API
      // fetch(`${API_BASE_URL}/lo/${id}`, { method: 'DELETE' })
    }
  };

  const handleSaveLo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const formData = new FormData(e.currentTarget);

    if (editingLo) {
      // TODO: Update API
      // fetch(`${API_BASE_URL}/lo`, {
      //   method: 'PUT',
      //   body: formData
      // });
    } else {
      // TODO: Create API
      // fetch(`${API_BASE_URL}/lo`, {
      //   method: 'POST',
      //   body: formData
      // });
    }
  };

  const handleNhapVaccine = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const formData = new FormData(e.currentTarget);

    // TODO: Call API
    // fetch(`${API_BASE_URL}/lo/nhap-vaccine`, {
    //   method: 'POST',
    //   body: formData
    // });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Quản lý lô vaccine</h2>
        <div className="flex gap-2">
          <Dialog open={isNhapDialogOpen} onOpenChange={setIsNhapDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <PackagePlus className="w-4 h-4 mr-2" />
                Nhập vaccine
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nhập vaccine vào lô</DialogTitle>
                <DialogDescription>
                  Thêm vaccine vào lô đã tạo
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleNhapVaccine} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="maLo">Mã lô</Label>
                  <Input id="maLo" name="maLo" type="number" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maVaccine">Mã vaccine</Label>
                  <Input id="maVaccine" name="maVaccine" type="number" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="soLuong">Số lượng</Label>
                  <Input id="soLuong" name="soLuong" type="number" required />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsNhapDialogOpen(false)}>
                    Hủy
                  </Button>
                  <Button type="submit">Nhập</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingLo(null)}>
                <Plus className="w-4 h-4 mr-2" />
                Tạo lô mới
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingLo ? 'Cập nhật' : 'Tạo'} lô vaccine</DialogTitle>
                <DialogDescription>
                  Điền thông tin lô vaccine
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSaveLo} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hangVC">Hãng vận chuyển</Label>
                  <Input id="hangVC" name="hangVC" defaultValue={editingLo?.hangVC} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maNV">Mã nhân viên nhận</Label>
                  <Input id="maNV" name="maNV" type="number" defaultValue={editingLo?.maNV} required />
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
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tìm kiếm</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input placeholder="Tìm theo hãng vận chuyển..." className="flex-1" />
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
                <TableHead>Hãng vận chuyển</TableHead>
                <TableHead>Mã NV nhận</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.map((lo) => (
                <TableRow key={lo.id}>
                  <TableCell>{lo.id}</TableCell>
                  <TableCell className="font-medium">{lo.hangVC}</TableCell>
                  <TableCell>{lo.maNV}</TableCell>
                  <TableCell>{new Date(lo.ngayTao).toLocaleString('vi-VN')}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                          setEditingLo(lo);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(lo.id)}
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
