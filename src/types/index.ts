export type VaiTro = 'QUAN_TRI_VIEN' | 'BAC_SI_KHAM' | 'BAC_SI_TIEM' | 'THU_NGAN' | 'QUAN_LY_VACCINE';

export interface User {
  id: number;
  hoTen: string;
  vaiTro: VaiTro;
  taiKhoan: string;
}

export interface KhachHang {
  id: number;
  hoTen: string;
  ngaySinh: string;
  gioiTinh: string;
  cccd: string;
  soDienThoai: string;
  diaChi: string;
  tuoi: number;
  email: string;
}

export interface PhieuKhamSangLoc {
  id: number;
  thoiGianTao: string;
  maKH: number;
  maNV: number;
  trangThai: string;
  duDieuKien: boolean;
  huyetAp: string;
  mach: string;
  thanNhiet: string;
  lyDoHoan?: string;
  ghiChu?: string;
}

export interface PhieuTiem {
  id: number;
  maNV: number;
  ghiChu?: string;
  maPhieuKham: number;
  diaDiemTiem: string;
  viTriTiem: string;
  maVaccine: number;
  soLieu: number;
  daThanhToan: boolean;
  coPhanUng: boolean;
}

export interface Vaccine {
  id: number;
  ten: string;
  soLuong: number;
  donGia: number;
  moTa?: string;
  ghiChu?: string;
  maLoai: number;
  donVi: string;
  doTuoi: string;
}

export interface ThanhToan {
  id: number;
  tongTien: number;
  tienNhan: number;
  tienTraLai: number;
  maPTTT: number;
  maNV: number;
  maPhieuTiem: number;
  ghiChu?: string;
}

export interface LoVaccine {
  id: number;
  hangVC: string;
  maNV: number;
  ngayTao: string;
}

export interface NhanVien {
  id: number;
  hoTen: string;
  ngaySinh: string;
  gioiTinh: string;
  cccd: string;
  soDienThoai: string;
  diaChi: string;
  taiKhoan: string;
  luongCoBan: number;
  anh?: string;
  ngayVaoLam: string;
  soNamKinhNghiem: number;
  diemManh?: string;
  diemYeu?: string;
  vaiTro: VaiTro;
  ngayNghiViec?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
