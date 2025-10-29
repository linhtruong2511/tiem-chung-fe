SELECT *
FROM ThanhToan;

-- LƯU Ý QUAN TRỌNG: THIẾT KẾ PROC YÊU CẦU PHẢI DYNAMIC NHẤT CÓ THỂ ĐỂ BACKEND XỬ LÝ DỄ DÀNG 
-- Các trường dữ liệu của phiếu tiêm 
-- 1. ID (int) 
-- 2. Tổng tiền (double)
-- 3. MaPTTT (int)
-- 4. MaNVTao (int)
-- 5. ThoiGianTao (datetime) 
-- 6. TienTraLai (double)
-- 7. TienNhan (double)
-- 8. GhiChu (nvarchar)
-- 9. MaKHThanhToan (int)

-- Bảng quan hệ quan trọng 
-- 1. Phiếu tiêm -> Biểu thị phiếu tiêm này sử dụng loại vaccine nào, với số liều là bao nhiêu? 

-- Tìm kiếm theo các trường dữ liệu
-- 1. Tìm kiếm theo khoảng tổng tiền
-- 2. Tìm kiếm theo MaPTTT
-- 3. Tìm kiếm theo mã phiếu tiêm
-- 4. Tìm kiếm theo MaKHThanhToan

-- Phân trang sử dụng @page và @pageSize 
-- Mặc định @page = 0, @pageSize = 10 và sắp xếp theo ID giảm dần
GO
create or alter proc SearchThanhToan(
    @tongTienTu DECIMAL = null,
    @tongTienDen DECIMAL = null,
    @maPhieuTiem DECIMAL = null,
    @maPTTT int = null,
    @maKHTT int = null,
    @page int = 0,
    @pageSize int = 10
)
AS
BEGIN
    SELECT
        tt.*,
        pt.id as maPhieuTiem

    from ThanhToan tt
        left JOIN PhieuTiem pt on pt.MaThanhToan = tt.ID
    where 1 = 1 AND
        (@tongTienTu IS NULL OR TongTien >= @tongTienTu) AND
        (@tongTienDen IS NULL OR TongTien <= @tongTienDen) AND
        (@maPhieuTiem IS NULL OR pt.ID = @maPhieuTiem) AND
        (@maPTTT IS NULL OR MaPTTT = @maPTTT) AND
        (@maKHTT IS NULL OR MaKHThanhToan = @maKHTT)
    ORDER BY tt.id DESC
    OFFSET @page * @pageSize ROWS
    FETCH NEXT @pageSize ROWS ONLY
END
GO


GO
create or alter PROCEDURE GetThanhToanByID
    @ID INT
AS
BEGIN
    SELECT
        tt.*,
        [pt].[MaNVTiem],
        pttt.Ten,
        pt.id as maPhieuTiem,
        kh.HoTen as TenKhachHang,
        nv.HoTen as TenNhanVien
    FROM ThanhToan tt
        JOIN PhuongThucThanhToan pttt on pttt.id = tt.MaPTTT
        LEFT JOIN PhieuTiem pt ON tt.ID = pt.MaThanhToan
        LEFT JOIN KhachHang kh on kh.ID = tt.MaKHThanhToan
        LEFT JOIN NhanVien nv on nv.ID = pt.MaNVTiem
    WHERE tt.ID = @ID
END
GO

GO
create or alter proc CountThanhToan(
    @tongTienTu DECIMAL = null,
    @tongTienDen DECIMAL = null,
    @maPhieuTiem DECIMAL = null,
    @maPTTT DATETIME = null,
    @maKHTT DECIMAL = null
)
as
begin
    select count(*)
    from ThanhToan tt
        left JOIN PhieuTiem pt on pt.MaThanhToan = tt.ID
    where 1 = 1 AND
        (@tongTienTu IS NULL OR TongTien >= @tongTienTu) AND
        (@tongTienDen IS NULL OR TongTien <= @tongTienDen) AND
        (@maPhieuTiem IS NULL OR pt.ID = @maPhieuTiem) AND
        (@maPTTT IS NULL OR MaPTTT = @maPTTT) AND
        (@maKHTT IS NULL OR MaKHThanhToan = @maKHTT)
end
GO

go
create or alter proc createThanhToan(
    @tienNhan DECIMAL,
    @tienTraLai DECIMAL,
    @maPTTT int,
    @maNVTao int,
    @maPhieuTiem int,
    @maKHTT int,
    @ghiChu NVARCHAR(255) = ''
)
as
begin
    insert into ThanhToan
        (MaNVTao, ThoiGian, MaPTTT, TienNhan, TienTraLai, TongTien, GhiChu, MaKHThanhToan)
    values(@maNVTao, GETDATE(), @maPTTT, @tienNhan, @tienTraLai, @tienNhan - @tienTraLai, @ghiChu, @maKHTT)

    update PhieuTiem set MaThanhToan = @@IDENTITY, TrangThaiThanhToan = N'Đã thanh toán' where ID = @maPhieuTiem
end
GO


GO
create or alter proc deleteThanhToan(
    @id int
)
as
begin
    update PhieuTiem set MaThanhToan = null, TrangThaiThanhToan = N'Chưa thanh toán' where MaThanhToan = @id
    delete from ThanhToan where ID = @id

end
GO


GO
create or alter proc updateThanhToan(
    @tienNhan DECIMAL,
    @tienTraLai DECIMAL,
    @maPTTT int,
    @maNV int,
    @maPhieuTiem int,
    @maKHTT int,
    @ghiChu NVARCHAR(255),
    @id int
)
as
begin
    update ThanhToan 
    set GhiChu = @ghiChu, 
        TongTien = @tienNhan - @tienTraLai, 
        MaNVTao = @maNV, 
        TienNhan = @tienNhan, 
        TienTraLai = @tienTraLai, 
        MaPTTT = @maPTTT,
        MaKHThanhToan = @maKHTT
    where ID = @id
end
GO

-- exec GetThanhToan;
-- exec updateThanhToan 16, 'abc', 100000, 9, 100000, 10000, 1;
-- exec GetThanhToan 

