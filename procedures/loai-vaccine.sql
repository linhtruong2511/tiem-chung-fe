SELECT * from LoaiVaccine;
go 
create or alter proc createLoaiVaccine (
    @ten NVARCHAR(100) = null,
    @xuatXu NVARCHAR(100) = null,
    @hangSX NVARCHAR(100) = null,
    @moTa NVARCHAR(255) = null,
    @nhomBenh NVARCHAR(100) = null,
    @maTu int = null
) as BEGIN 
    INSERT INTO LoaiVaccine (Ten, XuatXu, HangSX, MoTa, NhomBenh, MaTu)
    VALUES (@ten, @xuatXu, @hangSX, @moTa, @nhomBenh, @maTu)
END
GO
