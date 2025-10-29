-- =========================================
-- ========== PHIEU TIEM MODULE ============
-- =========================================
USE QuanLyTiemChung
GO

-- =========================================
-- SEARCH PHIEU TIEM (Dynamic - phân trang)
-- =========================================
CREATE OR ALTER PROC SearchPhieuTiem
    @maVaccine INT = NULL,
    @maNVTiem INT = NULL,
    @maPhieuKham INT = NULL,
    @daThanhToan BIT = NULL,
    -- 1: Đã thanh toán, 0: Chưa
    @coPhanUng BIT = NULL,
    -- 1: Có phản ứng sau tiêm
    @page INT = 0,
    @pageSize INT = 10
AS
BEGIN
    SELECT
        pt.ID,
        pt.NgayTao,
        pt.GhiChu,
        pt.MaThanhToan,
        pt.DiaDiemTiem,
        pt.ViTriTiem,
        pt.MaNVTiem,
        pt.MaPhieuKhamSangLoc,
        nv.HoTen AS TenNhanVien,
        kh.HoTen AS TenKhachHang,
        tt.TongTien,
        CASE WHEN pt.MaThanhToan IS NULL THEN N'Chưa thanh toán' ELSE N'Đã thanh toán' END AS TrangThaiThanhToan
    FROM PhieuTiem pt
        LEFT JOIN PhieuKhamSangLoc pksl ON pt.MaPhieuKhamSangLoc = pksl.ID
        LEFT JOIN KhachHang kh ON kh.ID = pksl.MaKH
        LEFT JOIN NhanVien nv ON nv.ID = pt.MaNVTiem
        LEFT JOIN ThanhToan tt ON tt.ID = pt.MaThanhToan
        LEFT JOIN Vaccine_PhieuTiem vpt ON vpt.MaPhieuTiem = pt.ID
        LEFT JOIN Vaccine v ON v.ID = vpt.MaVaccine
        LEFT JOIN TheoDoiSauTiem td ON td.MaPhieuTiem = pt.ID
    WHERE 1 = 1
        AND (@maVaccine IS NULL OR v.ID = @maVaccine)
        AND (@maNVTiem IS NULL OR pt.MaNVTiem = @maNVTiem)
        AND (@maPhieuKham IS NULL OR pt.MaPhieuKhamSangLoc = @maPhieuKham)
        AND (@daThanhToan IS NULL OR
        (@daThanhToan = 1 AND pt.MaThanhToan IS NOT NULL) OR
        (@daThanhToan = 0 AND pt.MaThanhToan IS NULL))
        AND (@coPhanUng IS NULL OR
        (@coPhanUng = 1 AND td.CoPhanUngSauTiem = 1) OR
        (@coPhanUng = 0 AND (td.CoPhanUngSauTiem = 0 OR td.ID IS NULL)))
    ORDER BY pt.ID DESC
    OFFSET (@page) * @pageSize ROWS
    FETCH NEXT @pageSize ROWS ONLY
END
GO

-- =========================================
-- COUNT PHIEU TIEM
-- =========================================
CREATE OR ALTER PROC CountPhieuTiem
    @maVaccine INT = NULL,
    @maNVTiem INT = NULL,
    @maPhieuKham INT = NULL,
    @daThanhToan BIT = NULL,
    @coPhanUng BIT = NULL
AS
BEGIN
    SELECT COUNT(DISTINCT pt.ID) AS TotalCount
    FROM PhieuTiem pt
        LEFT JOIN Vaccine_PhieuTiem vpt ON vpt.MaPhieuTiem = pt.ID
        LEFT JOIN TheoDoiSauTiem td ON td.MaPhieuTiem = pt.ID
    WHERE 1=1
        AND (@maVaccine IS NULL OR vpt.MaVaccine = @maVaccine)
        AND (@maNVTiem IS NULL OR pt.MaNVTiem = @maNVTiem)
        AND (@maPhieuKham IS NULL OR pt.MaPhieuKhamSangLoc = @maPhieuKham)
        AND (@daThanhToan IS NULL OR
        (@daThanhToan = 1 AND pt.MaThanhToan IS NOT NULL) OR
        (@daThanhToan = 0 AND pt.MaThanhToan IS NULL))
        AND (@coPhanUng IS NULL OR
        (@coPhanUng = 1 AND td.CoPhanUngSauTiem = 1) OR
        (@coPhanUng = 0 AND (td.CoPhanUngSauTiem = 0 OR td.ID IS NULL)))
END
GO

-- =========================================
-- GET PHIEU TIEM BY ID (Chi tiết đầy đủ)

-- Cập nhật: Bỏ thông tin về loại vaccine được sử dụng
-- =========================================
CREATE OR ALTER PROCEDURE GetPhieuTiemByID
    @ID INT
AS
BEGIN
    SELECT
        pt.*,
        kh.HoTen AS TenKhachHang,
        nv.HoTen AS TenNhanVien,
        tt.TongTien,
        tt.ThoiGian AS ThoiGianThanhToan,
        -- v.Ten AS TenVaccine,
        -- vpt.SoLieu,
        td.CoPhanUngSauTiem,
        td.GhiChu AS GhiChuTheoDoi
    FROM PhieuTiem pt
        LEFT JOIN PhieuKhamSangLoc pksl ON pksl.ID = pt.MaPhieuKhamSangLoc
        LEFT JOIN KhachHang kh ON kh.ID = pksl.MaKH
        LEFT JOIN NhanVien nv ON nv.ID = pt.MaNVTiem
        LEFT JOIN ThanhToan tt ON tt.ID = pt.MaThanhToan
        -- LEFT JOIN Vaccine_PhieuTiem vpt ON vpt.MaPhieuTiem = pt.ID
        -- LEFT JOIN Vaccine v ON v.ID = vpt.MaVaccine
        LEFT JOIN TheoDoiSauTiem td ON td.MaPhieuTiem = pt.ID
    WHERE pt.ID = @ID
END
GO

-- =========================================
-- CREATE PHIEU TIEM

-- CẬP NHẬT: Chỉ tạo phiếu tiêm chứ không cần phải gửi thêm ID của vaccine
-- Cập nhật vaccine cho phiếu tiêm này sẽ sử dụng proc khác để cập nhật
-- =========================================
CREATE OR ALTER PROC CreatePhieuTiem
    @maNV INT = NULL,
    @ghiChu NVARCHAR(255) = NULL,
    @maPhieuKham INT = NULL,
    @diaDiemTiem NVARCHAR(255) = NULL,
    @viTriTiem NVARCHAR(100) = NULL
-- @maVaccine INT = NULL,
-- @soLieu INT = NULL
AS
BEGIN
    SET NOCOUNT ON; -- Tránh trigger 

    DECLARE @New TABLE (MaPhieuTiem INT);

    INSERT INTO PhieuTiem
        (MaNVTiem, GhiChu, MaPhieuKhamSangLoc, DiaDiemTiem, ViTriTiem, NgayTao)

    OUTPUT INSERTED.ID INTO @New
    VALUES(@maNV, @ghiChu, @maPhieuKham, @diaDiemTiem, @viTriTiem, GETDATE())

    -- Sai do python không nhận đc 1 scalar: SELECT SCOPE_IDENTITY() 
    -- Lấy ID vừa thêm mới hiện tại
    SELECT MaPhieuTiem FROM @New;
-- IF (@maVaccine IS NOT NULL)
-- BEGIN
--     INSERT INTO Vaccine_PhieuTiem (MaPhieuTiem, MaVaccine, SoLieu)
--     VALUES(SCOPE_IDENTITY(), @maVaccine, ISNULL(@soLieu, 1))
-- END
END
GO

-- =========================================
-- UPDATE PHIEU TIEM

-- Cập nhật: Chi tạo phiếu tiêm chứ không cần phải gửi thêm ID của vaccine
-- =========================================
CREATE OR ALTER PROC UpdatePhieuTiem
    @maNVTiem INT,
    @ghiChu NVARCHAR(255),
    @maPhieuKham INT,
    @diaDiemTiem NVARCHAR(255),
    @viTriTiem NVARCHAR(100),
    @id INT
    -- @maVaccine INT = NULL,
    -- @soLieu INT = NULL
AS
BEGIN
    UPDATE PhieuTiem 
    SET 
        GhiChu = @ghiChu,
        DiaDiemTiem = @diaDiemTiem,
        ViTriTiem = @viTriTiem,
        MaNVTiem = @maNVTiem,
        MaPhieuKhamSangLoc = @maPhieuKham
    WHERE ID = @id

    -- IF (@maVaccine IS NOT NULL)
    -- BEGIN
    --     IF EXISTS(SELECT 1
    --     FROM Vaccine_PhieuTiem
    --     WHERE MaPhieuTiem = @id)
    --         UPDATE Vaccine_PhieuTiem SET MaVaccine = @maVaccine, SoLieu = @soLieu WHERE MaPhieuTiem = @id
    --     ELSE
    --         INSERT INTO Vaccine_PhieuTiem
    --         (MaPhieuTiem, MaVaccine, SoLieu)
    --     VALUES(@id, @maVaccine, ISNULL(@soLieu,1))
    -- END
END
GO

-- =========================================
-- DELETE PHIEU TIEM (Xóa luôn theo dõi sau tiêm)
-- =========================================
CREATE OR ALTER PROC DeletePhieuTiem
    @id INT
AS
BEGIN
    DELETE FROM TheoDoiSauTiem WHERE MaPhieuTiem = @id
    DELETE FROM Vaccine_PhieuTiem WHERE MaPhieuTiem = @id
    DELETE FROM PhieuTiem WHERE ID = @id
END
GO

-- =========================================
-- THỐNG KÊ MỞ RỘNG
-- =========================================
-- Thống kê theo tháng
CREATE OR ALTER PROC ThongKeTiemTheoThang
AS
BEGIN
    SELECT YEAR(NgayTao) AS Nam, MONTH(NgayTao) AS Thang, COUNT(ID) AS SoPhieuTiem
    FROM PhieuTiem
    GROUP BY YEAR(NgayTao), MONTH(NgayTao)
    ORDER BY Nam DESC, Thang DESC
END
GO

-- Vaccine phổ biến
CREATE OR ALTER PROC ThongKeVaccinePhoBien
AS
BEGIN
    SELECT v.Ten AS TenVaccine, COUNT(vpt.MaPhieuTiem) AS SoLanSuDung
    FROM Vaccine v
        LEFT JOIN Vaccine_PhieuTiem vpt ON vpt.MaVaccine = v.ID
    GROUP BY v.Ten
    ORDER BY SoLanSuDung DESC
END
GO

-- Nhân viên tiêm nhiều
CREATE OR ALTER PROC ThongKeNhanVienTiemNhieu
AS
BEGIN
    SELECT nv.HoTen AS TenNhanVien, COUNT(pt.ID) AS SoPhieuTiem
    FROM NhanVien nv
        LEFT JOIN PhieuTiem pt ON pt.MaNVTiem = nv.ID
    GROUP BY nv.HoTen
    ORDER BY SoPhieuTiem DESC
END
GO

-- Phản ứng sau tiêm
CREATE OR ALTER PROC ThongKePhanUngSauTiem
AS
BEGIN
    SELECT CASE WHEN td.CoPhanUngSauTiem = 1 THEN N'Có phản ứng' ELSE N'Không phản ứng' END AS TrangThai,
        COUNT(td.ID) AS SoLuong
    FROM TheoDoiSauTiem td
    GROUP BY td.CoPhanUngSauTiem
END
GO

-- Khách hàng chưa tiêm
CREATE OR ALTER PROC ThongKeKhachHangChuaTiem
AS
BEGIN
    SELECT kh.ID, kh.HoTen, kh.GioiTinh, kh.NgaySinh, kh.SoDienThoai
    FROM KhachHang kh
    WHERE kh.ID NOT IN (
        SELECT DISTINCT pksl.MaKH
    FROM PhieuKhamSangLoc pksl
        INNER JOIN PhieuTiem pt ON pt.MaPhieuKhamSangLoc = pksl.ID
    )
END
GO

-- Thống kê theo giới tính (Nam/Nữ)
CREATE OR ALTER PROC ThongKeTheoGioiTinh
AS
BEGIN
    SELECT kh.GioiTinh, COUNT(pt.ID) AS SoLanTiem
    FROM KhachHang kh
        LEFT JOIN PhieuKhamSangLoc pksl ON pksl.MaKH = kh.ID
        LEFT JOIN PhieuTiem pt ON pt.MaPhieuKhamSangLoc = pksl.ID
    GROUP BY kh.GioiTinh
END
GO

-- Doanh thu theo tháng
CREATE OR ALTER PROC ThongKeDoanhThuTheoThang
AS
BEGIN
    SELECT YEAR(tt.ThoiGian) AS Nam, MONTH(tt.ThoiGian) AS Thang, SUM(tt.TongTien) AS TongDoanhThu
    FROM ThanhToan tt
    GROUP BY YEAR(tt.ThoiGian), MONTH(tt.ThoiGian)
    ORDER BY Nam DESC, Thang DESC
END
GO

exec SearchPhieuTiem
exec GetPhieuTiemByID 13
exec ThongKeDoanhThuTheoThang
exec ThongKeTheoGioiTinh