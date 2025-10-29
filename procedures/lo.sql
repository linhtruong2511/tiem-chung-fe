create or alter proc getLoByID
    @id int
as
begin
    select l.*,
        nv.HoTen as TenNhanVienNhan,
        v.Ten as TenVaccine,
        lv.soLuong
    from Lo l
        left join Lo_Vaccine lv on lv.MaLo = l.ID
        left join Vaccine v on v.id = lv.MaVaccine
        left join NhanVien nv on nv.ID = l.MaNVNhan
    where l.ID = @id
end


GO
create or alter proc searchLoVaccine
    (
    @keyword NVARCHAR(255) = null,
    @ngayTaoTu DATETIME = null,
    @ngayTaoDen DATETIME = null,

    @page int = 0,
    @pageSize int = 10
)
as
BEGIN
    set nocount on

    select l.*, nv.HoTen as TenNhanVienNhan
    from Lo l
        left join Lo_Vaccine lv on lv.MaLo = l.ID
        left join Vaccine v on v.id = lv.MaVaccine
        left join NhanVien nv on nv.ID = l.MaNVNhan
    where 1 = 1 and
        (@keyword is null or (
        HangVanChuyen like '%' + @keyword + '%' or
        Ten like '%' + @keyword + '%' or
        HangSX like '%' + @keyword + '%' or
        MoTa like '%' + @keyword + '%' or
        nv.HoTen like '%' + @keyword + '%'
    ))
        and (@ngayTaoTu is null or l.NgayNhap >= @ngayTaoTu)
        and (@ngayTaoDen is null or l.NgayNhap <= @ngayTaoDen)
    ORDER BY l.ID DESC
    OFFSET @page * @pageSize ROWS 
    FETCH NEXT @pageSize ROWS ONLY
end
GO

create or alter proc CountLo(
    @keyword NVARCHAR(255) = null,
    @ngayTaoTu DATETIME = null,
    @ngayTaoDen DATETIME = null
)
as
begin
    select count(*) as Total
    from Lo l
        join Lo_Vaccine lv on lv.MaLo = l.ID
        join Vaccine v on v.id = lv.MaVaccine
        join NhanVien nv on nv.ID = l.MaNVNhan
    where 1 = 1 and
        (@keyword is null or (
        Ten like '%' + @keyword + '%' or
        HangSX like '%' + @keyword + '%' or
        MoTa like '%' + @keyword + '%' or
        nv.HoTen like '%' + @keyword + '%'
    ))
        and (@ngayTaoTu is null or l.NgayNhap >= @ngayTaoTu)
        and (@ngayTaoDen is null or l.NgayNhap <= @ngayTaoDen)
end 

go
create or alter proc CreateLo
    (
    @hangVC NVARCHAR(100) = null,
    @maNVNhan INT = null
)
as
begin
    insert into Lo
        (HangVanChuyen, NgayNhap, MaNVNhan)
    values
        (@hangVC, GETDATE(), @maNVNhan)
end

go
create or alter proc UpdateLo
    (
    @hangVC NVARCHAR(100) = null,
    @maNVNhan INT = null,
    @ID int
)
as
begin
    update Lo
    set HangVanChuyen = @hangVC, MaNVNhan = @maNVNhan
    where id = @ID
end

GO
create or alter proc NhapVaccine
    (
    @maLo INT = null,
    @maVaccine INT = null,
    @soLuong INT = null
)
as
begin
    insert into Lo_Vaccine
        (MaLo, MaVaccine, SoLuong)
    values
        (@maLo, @maVaccine, @soLuong)
end

go  
create or alter trigger updateSoLuongVaccine on Lo_Vaccine
after insert, delete
as
begin
    update Vaccine set SoLuong = SoLuong + (select SoLuong from inserted)
    update Vaccine set SoLuong = SoLuong - (select SoLuong from deleted)
end

go  

GO
create or alter proc DeleteLo
    @id int
as
begin
    delete from Lo_Vaccine where MaLo = @id
    delete from Lo where ID = @id

    update Vaccine set SoLuong = SoLuong - (select sum(SoLuong) from Lo_Vaccine where MaLo = @id)
end

