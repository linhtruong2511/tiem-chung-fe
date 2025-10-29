-- Tìm kiếm theo keyword
-- 1. Tên
-- 2. HangSX
-- 3. MoTa

GO
CREATE OR ALTER PROCEDURE SearchVaccine
    (
    @keyword NVARCHAR(255) = null,
    @page int = 0,
    @pageSize int = 10
)
as
begin
    select *
    from Vaccine
    where 1 = 1 and
        (@keyword is null or (
        Ten like '%' + @keyword + '%' or
        HangSX like '%' + @keyword + '%' or
        MoTa like '%' + @keyword + '%'
    ))
    ORDER BY ID DESC
    OFFSET @page * @pageSize ROWS 
    FETCH NEXT @pageSize ROWS ONLY
end
GO

GO
CREATE or alter PROCEDURE GetVaccineByID
    @ID INT
AS
BEGIN
    SELECT v.*,
        l.ID as MaLo,
        NgayHH,
        NgaySX,
        td.Ten as TenTuDung,
        lv2.Ten as TenLoai,
        lv2.NhomBenh
    From Vaccine v
        LEFT join Lo_Vaccine lv on lv.MaVaccine = v.ID
        LEFT join Lo l on l.id = lv.MaLo
        left join  LoaiVaccine lv2 on lv2.id = v.MaLoai
        left join  TuDungVaccine td on td.id = lv2.MaTu
    WHERE v.ID = @ID
END
Go  
exec SearchVaccine 
EXEC GetVaccineByID 20;


GO
create or alter PROCEDURE countVaccine(
    @keyword NVARCHAR(255) = null
)
AS
begin
    select COUNT(*) as 'Total'
    from Vaccine
    where 1 = 1 and
        (@keyword is null or (
        Ten like '%' + @keyword + '%' or
        HangSX like '%' + @keyword + '%' or
        MoTa like '%' + @keyword + '%'
    ))
end

GO
CREATE or alter PROCEDURE CreateVaccine
    @ten NVARCHAR(100) = null,
    @hangSX NVARCHAR(100) = null,
    @donGia DECIMAL(18,2) = null,
    @moTa NVARCHAR(255) = null,
    @ghiChu NVARCHAR(255) = null,
    @maLoai INT = null,
    @donVi NVARCHAR(50) = null,
    @doTuoi NVARCHAR(50) = null
AS
BEGIN
    INSERT INTO Vaccine
        (Ten, HangSX, DonGia, MoTa, GhiChu, MaLoai, DonVi)
    VALUES
        (@ten, @hangSX, @donGia, @moTa, @ghiChu, @maLoai, @donVi)
END
-- alter table vaccine alter column doTuoi nvarchar(100)

GO
CREATE or alter PROCEDURE updateVaccine
    @ten NVARCHAR(100) = null,
    @soLuong INT = null,
    @hangSX NVARCHAR(100) = null,
    @donGia DECIMAL(18,2) = null,
    @moTa NVARCHAR(255) = null,
    @ghiChu NVARCHAR(255) = null,
    @maLoai INT = null,
    @donVi NVARCHAR(50) = null,
    @doTuoi NVARCHAR(50) = null,
    @ID INT
AS
BEGIN
    update Vaccine set 
        Ten = @ten, 
        SoLuong = @soLuong, 
        HangSX = @hangSX, 
        DonGia = @donGia, 
        MoTa = @moTa, 
        GhiChu = @ghiChu, 
        MaLoai = @maLoai, 
        DonVi = @donVi,
        DoTuoi = @doTuoi
    where ID = @ID
END


GO
create or alter proc deleteVaccine
    @ID INT
AS
BEGIN
    update Lo_Vaccine set MaVaccine = null where MaVaccine = @ID
    update Vaccine_PhieuTiem set MaVaccine = null where MaVaccine = @ID
    delete from Vaccine where ID = @ID
END