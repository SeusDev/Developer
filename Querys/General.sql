--Test
use LappizV2Test
use Lappiz_Basic_Apps
use PGN_Lappiz

--Prod
use LappizV2Prod
use Kontest_Lappiz

select 


--Buscar eventos borrados
select * from formsEvents where  EntityId = '10020a7b-efeb-4b0e-b628-bf76720e1967'


--Cantidad de registros por tabla
SELECT object_name(id),rowcnt
FROM sys.sysindexes
WHERE indid=1
ORDER BY 1

--Consultar Campos Tablas

Select  * from information_schema.columns WHERE TABLE_NAME= 'Logius_Lappiz_Acta' 

--Reiniciar campos autonumericos
DBCC CHECKIDENT([MA_Lappiz_HC], NORESEED)
DBCC CHECKIDENT([MA_Lappiz_HC], RESEED,0)

--Actualizar campos
select * from dbo.Campos where TablaId = 'de269a42-d7d5-49c0-b36e-07ffcafcb7c5'  order by Name asc

select * from dbo.Campos where Type like '%auto%'

--update dbo.Campos
--set Type='Texto', SqlType='VarChar ',IsVisible='0'
--where CampoId ='D9AE485F-D242-44BB-A7BC-1C4F964E1ACD'


--Proyectos en general

select * from Logius_Lappiz_Acta
select * from Logius_Lappiz_Empresas
select * from Logius_Lappiz_Users
select * from Logius_Lappiz_AreaCargo
select * from Logius_Lappiz_Detallecompromiso	

select distinct
e.Id [Id Empresa],
u.FullName [Nombre Completo],
e.Nempresa [Empresa],
ac.CEAreasoCargos[Cargo]
from Logius_Lappiz_Users u
inner join Logius_Lappiz_Empresas e on u.EmpresaFk = e.id
inner join Logius_Lappiz_AreaCargo ac on u.CargoFk = ac.Id
where e.Id='4BF8BC59-3B50-4D45-81B3-80F20193D0DC'



select distinct
a.Numeroacta [Acta N],
a.Tema[Trema],
format (a.Fecha,'yyyy-MM-dd') [Fecha],
FORMAT(CONVERT(datetime, a.Horainicio), 'hh:mm tt')[Hora Inicio],
FORMAT(CONVERT(datetime, a.Horafinalizacion), 'hh:mm tt')[Hora Finalizacion],
a.Participantesempresa [Participante Empresas],
a.Participantes [Participante E],
u.FullName [Participanete Logius],
ac.CEAreasoCargos [Area o Cargo],
a.Desarrollo [Desarrollo],
dc.Compromisos [Compromisos],
format (dc.Fechaentrega,'yyyy-MM-dd') [Fecha Entrega],
dc.Responsable [Resposable compromiso],
a.Observacion [Observaciones],
a.FirmaAsistentes [Firma Asistentes],
a.Firmaresponsable[Firma Responsable],
e.Nempresa[Empresas]
from Logius_lappiz_Acta a 
inner join Logius_Lappiz_Detallecompromiso dc on dc.ActaFK = a.Id
inner join Logius_lappiz_Users u on a.Participantefk = u.Id
inner join Logius_Lappiz_AreaCargo ac on a.AreaFK = ac.Id
inner join Logius_Lappiz_Empresas e on u.EmpresaFK = e.Id
where a.Id ='BE6DA5E7-B993-419B-9AC5-40DFD9D3D697'