USE QuanLyTiemChung
-- Tìm kiếm theo keyword
-- 1. Họ tên
-- 2. Địa chỉ
-- 3. Email

-- Tìm kiếm theo trạng thái
-- 1. Giới tính (Nam/Nu)
-- 2. Tuoi

-- Phân trang sử dụng @page và @pageSize
-- Mặc định @page = 0, @pageSize = 10 và sắp xếp theo ID giảm dần
GO
CREATE OR ALTER PROC SearchKhachHang
    (@keyword NVARCHAR(255) = null,
    @tuoiTu int = null,
    @tuoiDen int = null,
    @gioiTinh NVARCHAR(10) = null
    )
AS
BEGIN
    SELECT *
    FROM KhachHang
    WHERE 1 = 1 AND
    (@keyword is null or (
        HoTen LIKE '%'+@keyword+'%' OR
        DiaChi LIKE '%'+@keyword+'%' OR
        Email LIKE '%'+@keyword+'%'
    )) AND
    (@tuoiTu is null or (
        DATEDIFF(YEAR, NgaySinh, GETDATE()) >= @tuoiTu
    )) AND
    (@tuoiDen is null or (
        DATEDIFF(YEAR, NgaySinh, GETDATE()) <= @tuoiDen
    )) AND
    (@gioiTinh is null or (
        GioiTinh = @gioiTinh
    ))
END
GO


-- Lây khách hàng kết hợp với phiếu khám sàng lọc
GO
CREATE OR ALTER PROC GetKhachHangByID
    (@iD INT)
AS
BEGIN
    SELECT [kh].[ID],
    [kh].[HoTen],
    [kh].[NgaySinh],
    [kh].[GioiTinh],
    [kh].[CCCD],
    [kh].[SoDienThoai],
    [kh].[DiaChi],
    [kh].[NgayTao],
    [kh].[tuoi],
    [kh].[email],
    [pksl].[ID] as IDPKSL,
    [pksl].[MaNVKham],
    [pksl].[DuDieuKien],
    [pksl].[HuyetAp],
    [pksl].[Mach],
    [pksl].[ThanNhiet],
    [pksl].[trangThai]
    FROM KhachHang kh 
    LEFT JOIN PhieuKhamSangLoc pksl on pksl.MaKH = kh.ID 
    WHERE kh.ID = @id
END
GO


-- Đếm số khách hàng phù hợp với keyword, giới tính và tuổi
GO
CREATE OR ALTER PROC CountKhachHang
AS
BEGIN
    
END
GO

-- Cập nhật khách hàng sẽ yêu cầu gửi toàn bộ các trường dữ liệu cũ và cập nhật
GO
CREATE OR ALTER PROC UpdateKhachHang
    (@id int,
    @hoTen NVARCHAR(255),
    @ngaySinh DATE = null,
    @gioiTinh NVARCHAR(10),
    @cccd NVARCHAR(50),
    @soDienThoai NVARCHAR(10),
    @diaChi NVARCHAR(255),
    @tuoi int,
    @email NVARCHAR)
AS
BEGIN

    --  Mẫu <--
    UPDATE KhachHang SET 
		HoTen = @hoTen,
		NgaySinh = @ngaySinh,
		GioiTinh = @GioiTinh,
		CCCD = @cccd,
		SoDienThoai = @soDienThoai,
		DiaChi = @diaChi,
		EMAIL = @email
	WHERE ID = @ID
END
GO


-- Khi xóa khách hàng thì sẽ xóa cả các lượt nhắc tiêm và phiếu khám sàng lọc
GO
CREATE OR ALTER PROC DeleteKhachHang
    (@iD int)
AS
BEGIN
    DELETE PhieuKhamSangLoc WHERE MaKH = @ID
    DELETE NhacTiem WHERE MaKH = @ID
    DELETE KhachHang WHERE ID = @ID
END
GO

--- Tạo mới khách hàng cũng sẽ yêu cầu gửi toàn bộ dữ liệu như là update khách hàng 
--- Nhưng sẽ khác mặc định là dữ liệu mặc định là null -> Cho phép BE có thể có hay không gửi dữ liêu cũng được
GO
CREATE OR ALTER PROC CreateKhachHang
AS
BEGIN
    -- Thêm code vào đây <-
END
GO
