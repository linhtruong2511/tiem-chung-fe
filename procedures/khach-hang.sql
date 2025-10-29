USE QuanLyTiemChung
GO

-------------------------------------------------------------
-- 1. TÌM KIẾM KHÁCH HÀNG THEO TỪ KHÓA, GIỚI TÍNH, TUỔI, PHÂN TRANG
-------------------------------------------------------------
CREATE OR ALTER PROC SearchKhachHang
    @keyword NVARCHAR(255) = NULL,
    @tuoiTu INT = NULL,
    @tuoiDen INT = NULL,
    @gioiTinh NVARCHAR(10) = NULL,
    @page INT = 0,
    @pageSize INT = 10
AS
BEGIN
    SET NOCOUNT ON;

    SELECT *
    FROM KhachHang
    WHERE 1 = 1
        AND (@keyword IS NULL OR (
            HoTen LIKE N'%' + @keyword + N'%' OR
            DiaChi LIKE N'%' + @keyword + N'%' OR
            Email LIKE N'%' + @keyword + N'%'
        ))
        AND (@tuoiTu IS NULL OR DATEDIFF(YEAR, NgaySinh, GETDATE()) >= @tuoiTu)
        AND (@tuoiDen IS NULL OR DATEDIFF(YEAR, NgaySinh, GETDATE()) <= @tuoiDen)
        AND (@gioiTinh IS NULL OR GioiTinh = @gioiTinh)
    ORDER BY ID DESC
    OFFSET @page * @pageSize ROWS FETCH NEXT @pageSize ROWS ONLY;
END
GO


-------------------------------------------------------------
-- 2. LẤY THÔNG TIN KHÁCH HÀNG KÈM PHIẾU KHÁM SÀNG LỌC
-------------------------------------------------------------
CREATE OR ALTER PROC GetKhachHangByID
    @ID INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        kh.ID,
        kh.HoTen,
        kh.NgaySinh,
        kh.GioiTinh,
        kh.CCCD,
        kh.SoDienThoai,
        kh.DiaChi,
        kh.NgayTao,
        DATEDIFF(YEAR, kh.NgaySinh, GETDATE()) AS Tuoi,
        kh.Email
        -- pksl.ID AS IDPKSL,
        -- pksl.MaNVKham,
        -- pksl.DuDieuKien,
        -- pksl.HuyetAp,
        -- pksl.Mach,
        -- pksl.ThanNhiet,
        -- pksl.TrangThai
    FROM KhachHang kh
        LEFT JOIN PhieuKhamSangLoc pksl ON pksl.MaKH = kh.ID
    WHERE kh.ID = @ID;
END
GO


-------------------------------------------------------------
-- 3. ĐẾM SỐ KHÁCH HÀNG PHÙ HỢP VỚI BỘ LỌC
-------------------------------------------------------------
CREATE OR ALTER PROC CountKhachHang
    @keyword NVARCHAR(255) = NULL,
    @tuoiTu INT = NULL,
    @tuoiDen INT = NULL,
    @gioiTinh NVARCHAR(10) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT COUNT(*) AS Total
    FROM KhachHang
    WHERE 1 = 1
        AND (@keyword IS NULL OR (
            HoTen LIKE N'%' + @keyword + N'%' OR
            DiaChi LIKE N'%' + @keyword + N'%' OR
            Email LIKE N'%' + @keyword + N'%'
        ))
        AND (@tuoiTu IS NULL OR DATEDIFF(YEAR, NgaySinh, GETDATE()) >= @tuoiTu)
        AND (@tuoiDen IS NULL OR DATEDIFF(YEAR, NgaySinh, GETDATE()) <= @tuoiDen)
        AND (@gioiTinh IS NULL OR GioiTinh = @gioiTinh);
END
GO


-------------------------------------------------------------
-- 4. CẬP NHẬT KHÁCH HÀNG
-------------------------------------------------------------
CREATE OR ALTER PROC UpdateKhachHang
    @hoTen NVARCHAR(255),
    @ngaySinh DATE = NULL,
    @gioiTinh NVARCHAR(10),
    @cccd NVARCHAR(50),
    @soDienThoai NVARCHAR(10),
    @diaChi NVARCHAR(255),
    @tuoi INT = NULL,
    @email NVARCHAR(255),
    @ID INT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE KhachHang SET 
        HoTen = @hoTen,
        NgaySinh = @ngaySinh,
        GioiTinh = @gioiTinh,
        CCCD = @cccd,
        SoDienThoai = @soDienThoai,
        DiaChi = @diaChi,
        Tuoi = @tuoi,
        Email = @email
    WHERE ID = @ID;
END
GO


-------------------------------------------------------------
-- 5. XÓA KHÁCH HÀNG VÀ CÁC LIÊN KẾT (NHẮC TIÊM, PHIẾU KHÁM)
-------------------------------------------------------------
CREATE OR ALTER PROC DeleteKhachHang
    @ID INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRANSACTION;
    BEGIN TRY
        DELETE FROM PhieuKhamSangLoc WHERE MaKH = @ID;
        DELETE FROM NhacTiem WHERE MaKH = @ID;
        DELETE FROM KhachHang WHERE ID = @ID;
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
GO


-------------------------------------------------------------
-- 6. TẠO MỚI KHÁCH HÀNG
-------------------------------------------------------------
CREATE OR ALTER PROC CreateKhachHang
    @hoTen NVARCHAR(255) = NULL,
    @ngaySinh DATE = NULL,
    @gioiTinh NVARCHAR(10) = NULL,
    @cccd NVARCHAR(50) = NULL,
    @soDienThoai NVARCHAR(10) = NULL,
    @diaChi NVARCHAR(255) = NULL,
    @tuoi INT = NULL,
    @email NVARCHAR(255) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO KhachHang (
        HoTen, NgaySinh, GioiTinh, CCCD, SoDienThoai, DiaChi, Tuoi, Email, NgayTao
    )
    VALUES (
        @hoTen, @ngaySinh, @gioiTinh, @cccd, @soDienThoai, @diaChi, @tuoi, @email, GETDATE()
    );

    SELECT SCOPE_IDENTITY() AS NewID;
END
GO


-------------------------------------------------------------
-- 1. KHÁCH HÀNG CHƯA KHÁM LẦN NÀO
-------------------------------------------------------------
CREATE OR ALTER PROC ThongKeKhachHangChuaKham
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        kh.ID,
        kh.HoTen,
        kh.NgaySinh,
        DATEDIFF(YEAR, kh.NgaySinh, GETDATE()) AS Tuoi,
        kh.GioiTinh,
        kh.SoDienThoai,
        kh.DiaChi,
        kh.Email,
        kh.NgayTao
    FROM KhachHang kh
    WHERE NOT EXISTS (
        SELECT 1 
        FROM PhieuKhamSangLoc pksl 
        WHERE pksl.MaKH = kh.ID
    )
    ORDER BY kh.ID DESC;
END
GO



-------------------------------------------------------------
-- 2. THỐNG KÊ KHÁCH HÀNG THEO GIỚI TÍNH
-------------------------------------------------------------
CREATE OR ALTER PROC ThongKeKhachHangTheoGioiTinh
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        GioiTinh,
        COUNT(*) AS SoLuong
    FROM KhachHang
    GROUP BY GioiTinh
    ORDER BY GioiTinh;
END
GO
