export type VaiTro = 'QUAN_TRI_VIEN' | 'BAC_SI_KHAM' | 'BAC_SI_TIEM' | 'THU_NGAN' | 'QUAN_LY_VACCINE';

export interface User {
  id: number;
  hoTen: string;
  vaiTro: VaiTro;
  taiKhoan: string;
}

export interface KhachHang {
  ID: number;
  HoTen: string;
  NgaySinh: string;
  GioiTinh: string;
  CCCD: string;
  SoDienThoai: string;
  DiaChi: string;
  Tuoi?: number;
  Email?: string;
  NgayTao?: string;
}

export interface PhieuKhamSangLoc {
  ID: number;
  ThoiGianTao: string;
  MaKH: number;
  MaNVKham: number;
  TrangThai: string;
  DuDieuKien: number;
  HuyetAp?: number;
  Mach?: number;
  ThanNhiet?: number;
  LyDoHoan?: string;
  GhiChu?: string;
  TenKhachHang?: string;
  TenNhanVien?: string;
}

export interface PhieuTiem {
  ID: number;
  NgayTao: string;
  GhiChu?: string;
  MaThanhToan?: number;
  DiaDiemTiem?: string;
  ViTriTiem?: string;
  MaNVTiem: number;
  MaPhieuKhamSangLoc: number;
  TenNhanVien?: string;
  TenKhachHang?: string;
  TongTien?: number;
  TrangThaiThanhToan?: string;
}

export interface Vaccine {
  ID: number;
  Ten: string;
  SoLuong?: number;
  HangSX?: string;
  DonGia: number;
  MoTa?: string;
  GhiChu?: string;
  MaLoai?: number;
  DonVi?: string;
  DoTuoi?: string;
  TenLoai?: string;
  NhomBenh?: string;
}

export interface ThanhToan {
  ID: number;
  TongTien: number;
  TienNhan: number;
  TienTraLai: number;
  MaPTTT: number;
  MaNVTao: number;
  ThoiGian: string;
  GhiChu?: string;
  MaKHThanhToan?: number;
  maPhieuTiem?: number;
  TenKhachHang?: string;
  TenNhanVien?: string;
  Ten?: string;
}

export interface LoVaccine {
  ID: number;
  HangVanChuyen?: string;
  MaNVNhan?: number;
  NgayNhap: string;
  TenNhanVienNhan?: string;
  TenVaccine?: string;
  soLuong?: number;
}

export interface NhanVien {
  ID: number;
  HoTen: string;
  NgaySinh: string;
  GioiTinh: string;
  CCCD: string;
  SoDienThoai: string;
  DiaChi: string;
  TaiKhoan: string;
  MatKhau?: string;
  LuongCoBan: number;
  Anh?: string;
  NgayVaoLam: string;
  NgayNghiViec?: string;
  SoNamKinhNghiem?: number;
  DiemManh?: string;
  DiemYeu?: string;
  VaiTro: string;
  TenChucVu?: string;
  DaNghiViec?: boolean;
  Email?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
