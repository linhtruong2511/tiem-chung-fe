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
import { Search, Plus, Edit, Trash2, Package } from 'lucide-react';
import { Vaccine } from '@/types';

export default function VaccinePage() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVaccine, setEditingVaccine] = useState<Vaccine | null>(null);

  const mockData: Vaccine[] = [
    {
      id: 1,
      ten: 'Pfizer COVID-19',
      soLuong: 1000,
      donGia: 500000,
      moTa: 'Vaccine phòng COVID-19',
      ghiChu: 'Bảo quản -70°C',
      maLoai: 1,
      donVi: 'Liều',
      doTuoi: '18+'
    },
    {
      id: 2,
      ten: 'Hepatitis B',
      soLuong: 500,
      donGia: 200000,
      moTa: 'Vaccine phòng viêm gan B',
      ghiChu: 'Bảo quản 2-8°C',
      maLoai: 2,
      donVi: 'Liều',
      doTuoi: 'Trẻ em'
    }
  ];

  const handleSearch = () => {
    // TODO: Call API
    // const params = new URLSearchParams({
    //   keyword: searchKeyword,
    //   page: page.toString(),
    //   pageSize: '10'
    // });
    // fetch(`${API_BASE_URL}/vaccine?${params}`)
  };

  const handleDelete = (_id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa vaccine này?')) {
      // TODO: Call API
      // fetch(`${API_BASE_URL}/vaccine/${id}`, { method: 'DELETE' })
    }
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams();
    formData.forEach((value, key) => {
      params.append(key, value.toString());
    });

    if (editingVaccine) {
      // TODO: Update API
      // fetch(`${API_BASE_URL}/vaccine?${params}`, { method: 'PUT' })
    } else {
      // TODO: Create API
      // fetch(`${API_BASE_URL}/vaccine?${params}`, { method: 'POST' })
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Quản lý vaccine</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingVaccine(null)}>
              <Plus className="w-4 h-4 mr-2" />
              Thêm vaccine
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingVaccine ? 'Cập nhật' : 'Thêm'} vaccine</DialogTitle>
              <DialogDescription>
                Điền thông tin vaccine
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="Ten">Tên vaccine</Label>
                  <Input id="Ten" name="Ten" defaultValue={editingVaccine?.ten} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="MaLoai">Mã loại</Label>
                  <Input id="MaLoai" name="MaLoai" type="number" defaultValue={editingVaccine?.maLoai} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="SoLuong">Số lượng</Label>
                  <Input id="SoLuong" name="SoLuong" type="number" defaultValue={editingVaccine?.soLuong} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="DonGia">Đơn giá (VNĐ)</Label>
                  <Input id="DonGia" name="DonGia" type="number" defaultValue={editingVaccine?.donGia} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="DonVi">Đơn vị</Label>
                  <Input id="DonVi" name="DonVi" defaultValue={editingVaccine?.donVi} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="DoTuoi">Độ tuổi</Label>
                  <Input id="DoTuoi" name="DoTuoi" placeholder="VD: 18+, Trẻ em" defaultValue={editingVaccine?.doTuoi} required />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="MoTa">Mô tả</Label>
                  <Textarea id="MoTa" name="MoTa" defaultValue={editingVaccine?.moTa} />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="GhiChu">Ghi chú</Label>
                  <Textarea id="GhiChu" name="GhiChu" defaultValue={editingVaccine?.ghiChu} />
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
              placeholder="Tìm theo tên vaccine..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSearch}>
              <Search className="w-4 h-4 mr-2" />
              Tìm kiếm
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tổng vaccine</CardTitle>
            <Package className="w-5 h-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tổng số liều</CardTitle>
            <Package className="w-5 h-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockData.reduce((sum, v) => sum + v.soLuong, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Giá trị kho</CardTitle>
            <Package className="w-5 h-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(mockData.reduce((sum, v) => sum + (v.soLuong * v.donGia), 0))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tên vaccine</TableHead>
                <TableHead>Số lượng</TableHead>
                <TableHead>Đơn giá</TableHead>
                <TableHead>Độ tuổi</TableHead>
                <TableHead>Đơn vị</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.map((vaccine) => (
                <TableRow key={vaccine.id}>
                  <TableCell>{vaccine.id}</TableCell>
                  <TableCell className="font-medium">{vaccine.ten}</TableCell>
                  <TableCell>
                    <Badge variant={vaccine.soLuong < 100 ? 'destructive' : 'default'}>
                      {vaccine.soLuong}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatCurrency(vaccine.donGia)}</TableCell>
                  <TableCell>{vaccine.doTuoi}</TableCell>
                  <TableCell>{vaccine.donVi}</TableCell>
                  <TableCell>
                    {vaccine.soLuong < 100 ? (
                      <Badge variant="destructive">Sắp hết</Badge>
                    ) : vaccine.soLuong < 500 ? (
                      <Badge variant="secondary">Còn ít</Badge>
                    ) : (
                      <Badge variant="default">Đủ hàng</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                          setEditingVaccine(vaccine);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(vaccine.id)}
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
