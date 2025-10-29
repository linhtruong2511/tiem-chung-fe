USE QuanLyTiemChung
GO

-------------------------------------------------------------
-- 1️⃣ TÌM KIẾM PHIẾU KHÁM SÀNG LỌC (PKSL)
-------------------------------------------------------------
CREATE OR ALTER PROC SearchPKSL
    @maKh INT = NULL,
    @maNV INT = NULL,
    @trangThai NVARCHAR(50) = NULL,
    @duDieuKien INT = NULL,
    @page INT = 0,
    @pageSize INT = 10
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        pksl.ID,
        pksl.ThoiGianTao,
        pksl.MaKH,
        pksl.MaNVKham,
        pksl.TrangThai,
        pksl.DuDieuKien,
        pksl.HuyetAp,
        pksl.Mach,
        pksl.ThanNhiet,
        pksl.LyDoHoan,
        pksl.GhiChu,
        kh.HoTen AS TenKhachHang,
        nv.HoTen AS TenNhanVien
    FROM PhieuKhamSangLoc pksl
        LEFT JOIN KhachHang kh ON pksl.MaKH = kh.ID
        LEFT JOIN NhanVien nv ON pksl.MaNVKham = nv.ID
    WHERE 1 = 1
        AND (@maKh IS NULL OR pksl.MaKH = @maKh)
        AND (@maNV IS NULL OR pksl.MaNVKham = @maNV)
        AND (@trangThai IS NULL OR pksl.TrangThai = @trangThai)
        AND (@duDieuKien IS NULL OR pksl.DuDieuKien = @duDieuKien)
    ORDER BY pksl.ID DESC
    OFFSET @page * @pageSize ROWS FETCH NEXT @pageSize ROWS ONLY;
END
GO


-------------------------------------------------------------
-- 2️⃣ LẤY THÔNG TIN CHI TIẾT PHIẾU KHÁM + KHÁCH HÀNG + NHÂN VIÊN
-------------------------------------------------------------
CREATE OR ALTER PROC GetPKSLByID
    @ID INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        pksl.ID AS IDPKSL,
        pksl.ThoiGianTao,
        pksl.MaKH,
        kh.HoTen AS HoTenKH,
        kh.SoDienThoai,
        kh.DiaChi,
        pksl.MaNVKham,
        nv.HoTen AS HoTenNV,
        pksl.DuDieuKien,
        pksl.HuyetAp,
        pksl.Mach,
        pksl.ThanNhiet,
        pksl.LyDoHoan,
        pksl.GhiChu,
        pksl.TrangThai
    FROM PhieuKhamSangLoc pksl
        LEFT JOIN KhachHang kh ON pksl.MaKH = kh.ID
        LEFT JOIN NhanVien nv ON pksl.MaNVKham = nv.ID
    WHERE pksl.ID = @ID;
END
GO


-------------------------------------------------------------
-- 3️⃣ ĐẾM TỔNG PHIẾU KHÁM THEO BỘ LỌC
-------------------------------------------------------------
CREATE OR ALTER PROC CountPKSL
    @maKh INT = NULL,
    @maNV INT = NULL,
    @trangThai NVARCHAR(50) = NULL,
    @duDieuKien INT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT COUNT(*) AS Total
    FROM PhieuKhamSangLoc
    WHERE 1 = 1
        AND (@maKh IS NULL OR MaKH = @maKh)
        AND (@maNV IS NULL OR MaNVKham = @maNV)
        AND (@trangThai IS NULL OR TrangThai = @trangThai)
        AND (@duDieuKien IS NULL OR DuDieuKien = @duDieuKien);
END
GO


-------------------------------------------------------------
-- 4️⃣ CẬP NHẬT PHIẾU KHÁM SÀNG LỌC
-------------------------------------------------------------
CREATE OR ALTER PROC UpdatePKSL
    @ThoiGianTao DATETIME,
    @MaKH INT,
    @MaNVKham INT,
    @TrangThai NVARCHAR(50),
    @DuDieuKien INT,
    @HuyetAp INT,
    @Mach INT,
    @ThanNhiet INT,
    @LyDoHoan NVARCHAR(255),
    @GhiChu NVARCHAR(255),
    @ID INT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE PhieuKhamSangLoc
    SET
        ThoiGianTao = @ThoiGianTao,
        MaKH = @MaKH,
        MaNVKham = @MaNVKham,
        TrangThai = @TrangThai,
        DuDieuKien = @DuDieuKien,
        HuyetAp = @HuyetAp,
        Mach = @Mach,
        ThanNhiet = @ThanNhiet,
        LyDoHoan = @LyDoHoan,
        GhiChu = @GhiChu
    WHERE ID = @ID;
END
GO


-------------------------------------------------------------
-- 5️⃣ XÓA PHIẾU KHÁM VÀ CÁC PHIẾU TIÊM LIÊN QUAN
-------------------------------------------------------------
CREATE OR ALTER PROC DeletePKSL
    @ID INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRANSACTION;
    BEGIN TRY
        DELETE FROM PhieuTiem WHERE MaPhieuKhamSangLoc = @ID;
        DELETE FROM PhieuKhamSangLoc WHERE ID = @ID;
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END
GO


-------------------------------------------------------------
-- 6️⃣ TẠO MỚI PHIẾU KHÁM SÀNG LỌC
-------------------------------------------------------------
CREATE OR ALTER PROC CreatePKSL
    @ThoiGianTao DATETIME = NULL,
    @MaKH INT = NULL,
    @MaNVKham INT = NULL,
    @TrangThai NVARCHAR(50) = NULL,
    @DuDieuKien INT = NULL,
    @HuyetAp INT = NULL,
    @Mach INT = NULL,
    @ThanNhiet INT = NULL,
    @LyDoHoan NVARCHAR(255) = NULL,
    @GhiChu NVARCHAR(255) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO PhieuKhamSangLoc (
        ThoiGianTao, MaKH, MaNVKham, TrangThai, DuDieuKien, 
        HuyetAp, Mach, ThanNhiet, LyDoHoan, GhiChu
    )
    VALUES (
        ISNULL(@ThoiGianTao, GETDATE()),
        @MaKH,
        @MaNVKham,
        @TrangThai,
        @DuDieuKien,
        @HuyetAp,
        @Mach,
        @ThanNhiet,
        @LyDoHoan,
        @GhiChu
    );

    SELECT SCOPE_IDENTITY() AS NewID;
END
GO


-------------------------------------------------------------
-- 7️⃣ GỢI Ý CÁC Ý TƯỞNG THỐNG KÊ MỞ RỘNG
-------------------------------------------------------------
-- 📊 Ý tưởng 1: Thống kê số lượng phiếu khám theo tình trạng "đủ điều kiện" / "không đủ điều kiện"
--      SELECT DuDieuKien, COUNT(*) AS SoLuong
--      FROM PhieuKhamSangLoc
--      GROUP BY DuDieuKien;

-- 📅 Ý tưởng 2: Thống kê số phiếu khám được tạo theo tháng/năm
--      SELECT YEAR(ThoiGianTao) AS Nam, MONTH(ThoiGianTao) AS Thang, COUNT(*) AS TongSo
--      FROM PhieuKhamSangLoc
--      GROUP BY YEAR(ThoiGianTao), MONTH(ThoiGianTao)
--      ORDER BY Nam, Thang;

-- 👩‍⚕️ Ý tưởng 3: Thống kê số phiếu khám theo nhân viên khám (MaNVKham)
--      SELECT MaNVKham, COUNT(*) AS SoLuong
--      FROM PhieuKhamSangLoc
--      GROUP BY MaNVKham;

-- 👨‍⚕️ Ý tưởng 4: Thống kê tỷ lệ khách hàng đã được tạo phiếu tiêm sau khi khám sàng lọc
--      SELECT
--          CASE WHEN EXISTS (SELECT 1 FROM PhieuTiem WHERE MaPhieuKhamSangLoc = pksl.ID) THEN 'Đã tạo phiếu tiêm' ELSE 'Chưa tạo' END AS TrangThaiTiem,
--          COUNT(*) AS SoLuong
--      FROM PhieuKhamSangLoc pksl
--      GROUP BY CASE WHEN EXISTS (SELECT 1 FROM PhieuTiem WHERE MaPhieuKhamSangLoc = pksl.ID) THEN 'Đã tạo phiếu tiêm' ELSE 'Chưa tạo' END;

-- 🧠 Ý tưởng 5: Thống kê trung bình chỉ số sức khỏe (Huyết áp, Mạch, Thân nhiệt) của khách hàng trong kỳ
--      SELECT 
--          AVG(HuyetAp) AS TB_HuyetAp,
--          AVG(Mach) AS TB_Mach,
--          AVG(ThanNhiet) AS TB_ThanNhiet
--      FROM PhieuKhamSangLoc;
GO
