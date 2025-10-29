use QuanLyTiemChung;

GO
create or alter proc GetVaccineByPhieuTiemID
    @MaPhieuTiem int
as
begin
    select Vaccine.ID, Vaccine.Ten, Vaccine_PhieuTiem.SoLieu
    from Vaccine_PhieuTiem
    JOIN Vaccine on Vaccine.ID = Vaccine_PhieuTiem.MaVaccine
    where MaPhieuTiem = @MaPhieuTiem
end

-- Trigger: Khi thêm vaccine vào phiếu tiêm thì cập nhật số lượng vaccine và cập nhật tổng tiền cho phiếu tiểm
go  
create or alter trigger AddVaccine on Vaccine_PhieuTiem after insert as begin
    Update v SET v.SoLuong = v.SoLuong - i.SoLieu
    from Vaccine v
    join inserted i on i.MaVaccine = v.ID
end

-- Trigger: Khi xóa vaccine trong phiếu tiểm thì cập nhật số lượng vaccine và cập nhật tổng tiền cho phiếu tiểm
go
create or alter trigger DeleteVaccineTrigger on Vaccine_PhieuTiem after delete as begin
    Update v SET v.SoLuong = v.SoLuong + i.SoLieu
    from Vaccine v
    join deleted i on i.MaVaccine = v.ID
end

go
create or alter proc deletePhieuTiemVaccine
    @MaPhieuTiem int
as
begin
    delete from Vaccine_PhieuTiem
    where MaPhieuTiem = @MaPhieuTiem
end

go 
create or alter proc AddVaccineToPhieuTiem (
    @maPhieuTiem int,
    @maVaccine int,
    @soLieu int 
) as begin 
    insert into Vaccine_PhieuTiem (MaPhieuTiem, MaVaccine, SoLieu)
    values (@maPhieuTiem, @maVaccine, @soLieu)
end
GO
create or alter trigger AddVaccine on Vaccine_PhieuTiem after insert as begin
    Update v SET v.SoLuong = v.SoLuong - i.SoLieu
    from Vaccine v
    join inserted i on i.MaVaccine = v.ID
end