use Lappiz_Basic_Apps

--Tablas

select*from Logius_Lappiz_Users
select*from Logius_Lappiz_CIP where Id='B8FAA441-D1BB-4C7C-BBA2-5757A29CBE3E'
select*from Logius_Lappiz_aduana
select*from Logius_Lappiz_pdestino
select*from Logius_Lappiz_Finalizacion
select*from Logius_Lappiz_Desperdicios
select * from Logius_Lappiz_CI where Id='448359C4-EBFD-4316-9DC8-9CDE4F07C5EB'

select Id, Ci, Ntecnico from Logius_Lappiz_CI 

select Id, Codigo , Ladministrativos from Logius_Lappiz_aduana
select*from Logius_Lappiz_Exportacion
select*from Logius_Lappiz_Maunidadfisica where Id='FF6D428B-C786-49D7-BAA0-FE295F44CE71'
select*from Logius_Lappiz_DetalleCipCi  where CiFk ='448359C4-EBFD-4316-9DC8-9CDE4F07C5EB'
select*from Logius_Lappiz_Importacion
select*from Logius_Lappiz_Empresas

update Logius_Lappiz_DetalleCipCi
set Cud='0.378'
where Id='26FD6666-4517-44AA-A68B-F79D0E6041D1'
decimal(38,12)


delete Logius_Lappiz_Importacion
where Id='6C037FA5-C3B9-42C1-AFE8-78D45A5B2666'


select  sum (cast (Cantimport as SIGNED) from Logius_Lappiz_Importacion

select sum(cast(Cantimport as int))[Sumatoria] from Logius_Lappiz_Importacion


select  e.dex,e.Fechadex, a.Ladministrativos, cip.Cip, e.Cant, e.Vfob,e.Vvan ,p.Dpais from Logius_Lappiz_Exportacion e
join Logius_Lappiz_aduana a on e.Aduana = a.Id
join Logius_Lappiz_pdestino p on e.Pdestino = p.Id
join Logius_Lappiz_CIP cip on e.Ccid = cip.Id

select *from Logius_Lappiz_Exportacion 
select * from Logius_Lappiz_aduana
select*from Logius_Lappiz_pdestino

select*from Logius_Lappiz_CIP


select Id, Cip, Ntcp from Logius_Lappiz_CIP order by Cip asc



select Id, Codigo , Ladministrativos from Logius_Lappiz_aduana
order by Codigo asc

select*from Logius_Lappiz_pdestino where Id='852F826B-DBEB-4272-9CA8-1EBB59277765'


select Id,CodPais,Dpais from Logius_Lappiz_pdestino


select*from Logius_Lappiz_Empresas

select Id, Nit, Nempresa from Logius_Lappiz_Empresas order by Nempresa asc


select*from Logius_Lappiz_Exportacion 

select*from Logius_Lappiz_Exportacion where DEX ='6007682424467'


insert into Logius_Lappiz_Exportacion (EmpresaFk,DEX,Fechadex,Aduana,Ccid,Cant,VFob,Vvan,Pdestino)
Values 

insert into Logius_Lappiz_Exportacion (EmpresaFk,DEX,Fechadex,Aduana,Ccid,Cant,VFob,Vvan,Pdestino)
VALUES ('62D83078-FDDC-46F3-94C4-297286C86403','12345678','2022-02-01','2F49E523-3B75-4E6B-ACD3-48F3CE9CBF60','915A06ED-24D5-4B10-8AF8-613A436584AA','1000','1000','1000','852F826B-DBEB-4272-9CA8-1EBB59277765')

delete  Logius_Lappiz_Exportacion 
where Id ='2B47D61B-BC46-480A-A374-94929F5B7D94'



select Id, Codigo , Ladministrativos from Logius_Lappiz_aduana order by Codigo asc
select Id, Nit, Nempresa from Logius_Lappiz_Empresas order by Nempresa asc




select*from Logius_Lappiz_Importacion Dim 


insert into Logius_Lappiz_Importacion (EmpresaFk,Dim,Autadhesivo,Seccional,Flevante,Cantimport,CiFk,Vfob)
VALUES ('7D7EBCF5-5B9C-4307-B0A3-54755D010103','482021000015593','92482100057980','22976056-EA92-4E57-AADC-41A578F6970C','2021-01-09','249680','1','25129.63')

select * from Logius_Lappiz_Importacion Dim ='12345678'



select*from Logius_Lappiz_Importacion
where Id='65125440-8C03-4DF3-A4CB-BB2DBE1E74FA'


update Logius_Lappiz_Importacion
set Unidadm ='Kilogramo'
where Id='D2ADAC15-3E9A-423C-B9C3-76BF206E9DCC'



select
   ci.Id as id,
    ci.Ci [Ci],
    mu.Unifisica [Unidad Fisica],
    sum(cast(i.Cantimport as int))[Cantidad Importada],
    sum(cast(i.Vfob as int))[Fob Importado total],
    case when f.Finalpor =' Finalización por nacionalización' then f.Cantidad else 0 end [Desc Nzo],
    case when f.Finalpor ='Reexportación' then f.Cantidad else 0 end [Desc Rex]
    from Logius_Lappiz_Importacion i
    left join Logius_Lappiz_CI ci on ci.Id = i.CiFk
    left join Logius_Lappiz_Maunidadfisica mu on Ci.UnidadFk =mu.Id
    left join Logius_Lappiz_Finalizacion f on f.Nc=Ci.Id
	left join Logius_Lappiz_Empresas em on em.Id = i.EmpresaFk
    --join Logius_Lappiz_DetalleCipCi dt on dt.CiFk = ci.Id
    group by ci.Ci, mu.Unifisica ,f.Finalpor,f.Cantidad,ci.Id

	Select 
	*
	from Logius_Lappiz_Importacion i
    full join Logius_Lappiz_CI ci on ci.Id = i.CiFk
    full join Logius_Lappiz_Maunidadfisica mu on Ci.UnidadFk =mu.Id
    full join Logius_Lappiz_Finalizacion f on f.Nc=Ci.Id
	full join Logius_Lappiz_Empresas em on em.Id = i.EmpresaFk

	select * from Logius_Lappiz_DetalleCipCi


	
select
cid.Ci,
    --cid.id,
    dt.Dd [Destino]
    from Logius_Lappiz_DetalleCipCi dt
    join Logius_Lappiz_CI cid on dt.CiFk = cid.id
    group by cid.Ci,dt.Dd, cid.Id,cid.Ci


select 
    cif.Ci,
    cif.Id
    ,sum(cast(dt.cud as float) * cast (e.cant as int)) [consumo por exportacion]
from Logius_Lappiz_Exportacion E
right  join Logius_Lappiz_CIP cip on cip.Id = e.Ccid
right join Logius_Lappiz_DetalleCipCi dt on cip.Id = dt.CipFk
right join Logius_Lappiz_CI cif on cif.Id = dt.CiFk
group by cif.Ci,cif.Id 



select*from Logius_Lappiz_CIP where Id in ('088b5292-9e65-4487-bea7-6b269b67a8e4','9db1ceb9-52f1-4c9f-a8d6-ca7bf990e3cd','f37307f9-5992-4819-a08e-77e2633ceec7')
select*from Logius_Lappiz_CI where Id ='448359c4-ebfd-4316-9dc8-9cde4f07c5eb'



--Reportes


select 
    cif.Ci,
    cif.Id,
	dt.Cud,
	e.Cant,
	E.Id,
	E.DEX,
sum(cast(dt.cud as float) * cast (e.cant as float)) [consumo por exportacion]
from Logius_Lappiz_Exportacion E
right join Logius_Lappiz_CIP cip on cip.Id = e.Ccid
RIGHT join Logius_Lappiz_DetalleCipCi dt on cip.Id = dt.CipFk
right  join Logius_Lappiz_CI cif on cif.Id = dt.CiFk
 group by cif.Ci,cif.Id, dt.Cud,e.Cant,E.Id,E.DEX


select 
cig.Id,
cip.Cip,
E.DEX,
cig.Ci,
sum(cast(dt.cud as float) * cast (e.cant as int) * (cast (dt.pd as int))) / 100 [Desperdicios]
from Logius_Lappiz_Exportacion E
 right join Logius_Lappiz_CIP cip on cip.Id = e.Ccid
 right join Logius_Lappiz_DetalleCipCi dt on cip.Id = dt.CipFk
 right join Logius_Lappiz_CI cig on cig.Id = dt.CiFk
group by cig.Ci, cig.Id,cip.Cip,E.DEX,cig.Ci


select * from Milagros_Lappiz_Ciudad

Select  * from information_schema.columns WHERE TABLE_NAME= 'milagros_Lappiz_pais'

select * from Partesmontajes_Lappiz_Departamento order by NombreDpto asc
select * from Partesmontajes_Lappiz_Ciudad order by Nombre asc


--insert into  Partesmontajes_Lappiz_Ciudad (Id,Nombre,DeptoFk)
--select Id,Nombre,DeptoFk from Lappiz_Basic_Apps.dbo.Milagros_Lappiz_Ciudad

select*from Logius_Lappiz_Importacion  order by Flevante ASC
select * from Logius_Lappiz_Periodo

select count (Id) from Logius_Lappiz_Importacion where EmpresaFk=''

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


select * from Logius_Lappiz_Acta 
select * from Logius_Lappiz_Detallecompromiso	
select * from Logius_Lappiz_Empresas


select 
a.Numeroacta [ActaN],
a.Tema [Tema],
FORMAT(a.Fecha,'yyyy-MM-dd') [Fecha],
a.Horainicio [HoraInicio],
a.Horafinalizacion [HoraFinalizacion],
e.Nempresa [Empresas],
a.Participantesempresa [Participante Empresa],
a.Participantes [Participante E],
u.FullName [Particante logius],
ac.CEAreasoCargos [Area Cargo],
a.Desarrollo [Desarrollo],
dc.Compromisos [Compromisos],
dc.Responsable [Responsable],
FORMAT(dc.Fechaentrega,'yyyy-MM-dd') [Fecha entrega],
a.Observacion [Observacion],
a.FirmaAsistentes [Firma Asistentes], 
a.Firmaresponsable [Firma Responsable]
from Logius_Lappiz_Acta  a
inner join Logius_Lappiz_Detallecompromiso dc on dc.ActaFK= a.Id
inner join Logius_Lappiz_Empresas e on a.EmpresaFK = e.Id
inner join Logius_Lappiz_Users u on a.Participantefk = u.Id
inner join Logius_Lappiz_AreaCargo ac  on a.AreaFK = ac.Id


where Id='192AD7E6-1AA2-4131-BFFA-F1CF761AD4F0'




select * from Logius_Lappiz_Users
select * from Logius_Lappiz_Empresas where Id='62D83078-FDDC-46F3-94C4-297286C86403'