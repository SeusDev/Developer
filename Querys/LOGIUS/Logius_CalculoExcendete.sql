declare @Monto int = 400000
declare @Empresa uniqueidentifier = '7D7EBCF5-5B9C-4307-B0A3-54755D010103'
declare @MontoMax int
declare @MontoAcumulado int 
declare @FechaLevante date
declare @Periodo uniqueidentifier  
select 
@MontoMax = Cupoimppv
from Logius_Lappiz_Empresas where Id=@Empresa

select top 1 @Periodo = Id from Logius_Lappiz_Periodo where EmpresaFk='7D7EBCF5-5B9C-4307-B0A3-54755D010103' order by NumeroPeriodo desc
select @FechaLevante=Flevante from Logius_Lappiz_Importacion  where EmpresaFk='7D7EBCF5-5B9C-4307-B0A3-54755D010103' and PeriodoFk =@Periodo order by Flevante asc
select 
@MontoAcumulado = sum(cast(i.Cantimport as int))
from Logius_Lappiz_Importacion  i
join Logius_Lappiz_Periodo  p on i.PeriodoFk = p.Id
where i.EmpresaFk= @Empresa and i.PeriodoFk=@Periodo 

select @MontoAcumulado,@FechaLevante

if @MontoMax < @MontoAcumulado
begin 
	update Logius_Lappiz_Importacion
	set Flevante=DATEADD(MONTH,18,Flevante) 
	where Id=@Id
end


_____


declare @auxId uniqueidentifier 
set @auxId = NEWID()
insert into Logius_Lappiz_Periodo (Id,FechaInicio,FeciaFin,NumeroPeriodo,EmpresaFk) values(@auxId,'2021-04-22 00:00:00.000','2021-04-22 00:00:00.000',1, '7D7EBCF5-5B9C-4307-B0A3-54755D010103')
select @auxId [Id]

delete  Logius_Lappiz_Periodo

update Logius_Lappiz_Importacion
set PeriodoFk = 'D97AD5BE-255D-4E9F-9CE1-CED619EA5FA6'
where EmpresaFk ='7D7EBCF5-5B9C-4307-B0A3-54755D010103'

 select *from Logius_Lappiz_Importacion

select sum(Vfob) from Logius_Lappiz_Importacion
where EmpresaFk ='7D7EBCF5-5B9C-4307-B0A3-54755D010103'