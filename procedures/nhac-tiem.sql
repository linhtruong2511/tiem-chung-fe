GO
CREATE OR ALTER PROC AddNhacTiem
    (@iDNVTao int,
    @iDKH int,
    @thoiGianNhacLai DATE)
AS
BEGIN
    INSERT INTO NhacTiem
        (MaNVTAo, MaKH, ThoiGianTiemNhacLai, NgayTao, TrangThai)
    VALUES
        (@iDNVTao, @iDKH, @thoiGianNhacLai, GETDATE(), N'Chưa tới hạn')
END
GO
CREATE OR ALTER PROC DeleteNhacTiem
    (@iD int)
AS
BEGIN
    DELETE NhacTiem WHERE ID = @ID
END
GO
CREATE OR ALTER PROC SearchNhacTiem
    (@ngayTaoTu DATE = NULL,
    @ngayTaoDen DATE = NULL,
    @tenKhachHang NVARCHAR(100) = NULL,
    @trangThai NVARCHAR(100) = NULL)
AS
BEGIN
    SELECT NT.*, KH.HoTen AS TenKhachHang, NV.HoTen AS TenNhanVien
    FROM NhacTiem NT
        JOIN KhachHang KH ON KH.ID = NT.MaKH
        JOIN NhanVien NV ON NV.ID = NT.MaNVTAo
    WHERE 
		(@tenKhachHang IS NULL OR KH.HoTen LIKE '%' + @tenKhachHang + '%') AND
        (@ngayTaoTu IS NULL OR NT.NgayTao > @ngayTaoTu) AND
        (@ngayTaoDen IS NULL OR NT.NgayTao < @ngayTaoDen) AND
        (@trangThai IS NULL OR NT.TrangThai = @trangThai)
END
GO

AddNhacTiem 11, 8, '2025-8-12';
-- SearchNhacTiem @trangThai = N'Chưa tới hạn';