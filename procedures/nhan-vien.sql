select *
from NhanVien;
-- Tìm kiếm nhân viên theo keyword 
-- 1. HoTen
-- 2. DiaChi
-- 3. DiemManh
-- 4. DiemYeu
-- 5. Email

-- Tiếm kiếm theo khoảng
-- 1. LuongTu
-- 2. LuongDen

-- Tìm kiếm theo trường cụ thể
-- 1. VaiTro

-- Phân trang sử dụng @page và @pageSize 
-- Mặc định @page = 0, @pageSize = 10 và sắp xếp theo ID giảm dần


-- alter table nhanvien add VaiTro nvarchar(100);
-- alter table nhanvien add daNghiViec bit;

go
create or alter proc SearchNhanVien
    (
    @keyword nvarchar(100) = null,
    @vaiTro nvarchar(100) = null,
    @LuongTu decimal = null,
    @LuongDen decimal = null,
    @page int = 0,
    @pageSize int = 10
)
as
begin
    select nv.*, cv.ten as TenChucVu
    from NhanVien nv
        join NhanVien_ChucVu nvcv on nvcv.MaNV = nv.ID
        join ChucVu cv on cv.ID = nvcv.MaCV
    where 1 = 1 and
        (@keyword is null or (
            nv.HoTen like '%'+@keyword+'%' or
        nv.DiaChi like '%'+@keyword+'%' or
        nv.DiemManh like '%'+@keyword+'%' or
        nv.DiemYeu like '%'+@keyword+'%' or
        nv.Email like '%'+@keyword+'%'))
        and (@LuongTu is null or nv.LuongCoBan >= @LuongTu)
        and (@LuongDen is null or nv.LuongCoBan <= @LuongDen)
        and (@vaiTro is null or nv.vaiTro = @vaiTro)
    ORDER BY nv.ID DESC
    OFFSET @page * @pageSize ROWS
    FETCH NEXT @pageSize ROWS ONLY
end


GO
CREATE or alter PROCEDURE CreateNhanVien
    @HoTen NVARCHAR(100) = NULL,
    @NgaySinh DATE = NULL,
    @GioiTinh NVARCHAR(10) = NULL,
    @CCCD NVARCHAR(20) = NULL,
    @SoDienThoai NVARCHAR(15) = NULL,
    @DiaChi NVARCHAR(255) = NULL,
    @TaiKhoan NVARCHAR(50) = NULL,
    @MatKhau NVARCHAR(255) = NULL,
    @LuongCoBan DECIMAL(18,2) = NULL,
    @Anh NVARCHAR(255) = NULL,
    @NgayVaoLam DATE = NULL,
    @SoNamKinhNghiem INT = NULL,
    @DiemManh NVARCHAR(255) = NULL,
    @DiemYeu NVARCHAR(255) = NULL,
    @VaiTro NVARCHAR(255) = NULL
AS
BEGIN
    INSERT INTO NhanVien 
    (HoTen, NgaySinh, GioiTinh, CCCD, SoDienThoai, DiaChi, TaiKhoan, MatKhau, LuongCoBan, Anh, NgayVaoLam, SoNamKinhNghiem, DiemManh, DiemYeu, VaiTro)
    VALUES 
    (@HoTen, @NgaySinh, @GioiTinh, @CCCD, @SoDienThoai, @DiaChi, @TaiKhoan, @MatKhau, @LuongCoBan, @Anh, @NgayVaoLam, @SoNamKinhNghiem, @DiemManh, @DiemYeu, @VaiTro);
END

GO
CREATE or alter PROCEDURE UpdateNhanVien
    @HoTen NVARCHAR(100) = NULL,
    @NgaySinh DATE = NULL,
    @GioiTinh NVARCHAR(10) = NULL,
    @CCCD NVARCHAR(20) = NULL,
    @SoDienThoai NVARCHAR(15) = NULL,
    @DiaChi NVARCHAR(255) = NULL,
    @TaiKhoan NVARCHAR(50) = NULL,
    @MatKhau NVARCHAR(255) = NULL,
    @LuongCoBan DECIMAL(18,2) = NULL,
    @Anh NVARCHAR(255) = NULL,
    @NgayVaoLam DATE = NULL,
    @NgayNghiViec DATE = NULL,
    @SoNamKinhNghiem INT = NULL,
    @DiemManh NVARCHAR(255) = NULL,
    @DiemYeu NVARCHAR(255) = NULL,
    @VaiTro NVARCHAR(255) = NULL
AS
BEGIN
    UPDATE NhanVien
    SET HoTen = @HoTen,
        NgaySinh = @NgaySinh,
        GioiTinh = @GioiTinh,
        CCCD = @CCCD,
        SoDienThoai = @SoDienThoai,
        DiaChi = @DiaChi,
        TaiKhoan = @TaiKhoan,
        MatKhau = @MatKhau,
        LuongCoBan = @LuongCoBan,
        Anh = @Anh,
        NgayVaoLam = @NgayVaoLam,
        NgayNghiViec = @NgayNghiViec,
        SoNamKinhNghiem = @SoNamKinhNghiem,
        DiemManh = @DiemManh,
        DiemYeu = @DiemYeu,
        VaiTro = @VaiTro
END

GO
CREATE or alter PROCEDURE DeleteNhanVien
    @ID INT
AS
BEGIN
    Update NhanVien set DaNghiViec = 1 where ID = @ID
END
GO

create or alter proc GetNhanVienByID 
    @id int
as
begin 
    select * from NhanVien where ID = @id
end