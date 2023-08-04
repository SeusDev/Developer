use LappizV2Test
use LappizV2Prod
use SERVAL_Lappiz
USE Lappiz_Basic_Apps

select * from eSkepsi_Lappiz_Users where Email ='pruebaguardar@yopmail.com'


select * from  lappiz_Users where Id = '5d48309c-d835-4c76-8349-170fd1678153'

select * from lappiz_Users where FullName like '%blogomez%'
delete lappiz_Users where Id = 'EA3A7E6B-A963-49A4-BF64-00B45454369A'

select * from AspNetRoles where EmpresaId='ab4a0e5d-c8d8-4384-afda-5a098dcff86b'

select * from AspNetUsers
--where  Id = '625647E2-7584-44B7-B5EB-6C077883123B'
--where Email =' blgomez.manpower@gestioncargo.com'
--where EmpresaId ='03D31F39-19E7-41AD-94E0-EF22069C4072' order by Email asc
where EmpresaId ='ab4a0e5d-c8d8-4384-afda-5a098dcff86b' and Email like'%lacuartas%'


select * from AspNetUsers
where Email ='admin@semco.com'


update AspNetUsers 
set EmailConfirmed = 1
where Email ='admin@semco.com'

update AspNetUsers 
set Activo = 1
Where Id ='021fd88e-b8a0-470a-b70e-ebeec838e4e8'


--Consultar roles
select distinct Name [Roles],RoleId,Email,u.EmpresaId,r.AplicacionId from AspNetUsers U
join AspNetUserRoles Ar on U.Id = Ar.UserId
join AspNetRoles r on r.Id =Ar.RoleId
where Email ='natalia.gil@asr.com.co'
where u.EmpresaId='11329779-AA4F-408E-AAF6-CBACFF3AEF70'


select distinct Name [Roles],RoleId,Email,u.EmpresaId,r.AplicacionId from AspNetUsers U
join AspNetUserRoles Ar on U.Id = Ar.UserId
join AspNetRoles r on r.Id =Ar.RoleId
where u.EmpresaId ='11329779-AA4F-408E-AAF6-CBACFF3AEF70'

select * from AspNetUserRoles where RoleId='280c55c4-142f-4a9a-86c5-bb4502753367'

select distinct Name Id,[Roles],RoleId,Email,u.EmpresaId,r.AplicacionId from AspNetUsers U
join AspNetUserRoles Ar on U.Id = Ar.UserId
join AspNetRoles r on r.Id =Ar.RoleId
where  u.EmpresaId='ab4a0e5d-c8d8-4384-afda-5a098dcff86b' 

select*from AspNetUserRoles where UserId='f0e27498-e80a-4e4f-ab45-6a2928795bef'

where RoleId ='adb8005c-75e4-4709-8ed8-ae7f538ae501'

Asignar rol 

--update AspNetUserRoles 
--set RoleId = 'e6d93f79-a834-43d1-b71e-f82b6152af7c'
--where UserId='f0e27498-e80a-4e4f-ab45-6a2928795bef'


where u.EmpresaId='03D31F39-19E7-41AD-94E0-EF22069C4072' and r.Id= 'e6d93f79-a834-43d1-b71e-f82b6152af7c'

where U.Email='admin@logius.com'

where u.EmpresaId='503DA64C-D1B7-4F26-A866-BFC4F5257689'

select * from AspNetRoles where EmpresaId='503DA64C-D1B7-4F26-A866-BFC4F5257689' order by Name ASC


--delete AspNetRoles
--where Id='9f0b174f-7a31-439c-9a13-4b4b3f901de2'

where EmpresaId='7F174003-C6B9-4482-9ADA-5B3BE5C3678F'

select*from AspNetUsers
where Email='admin@kontest.com'


select*from AspNetUsers
where Email='admin@logius.com'

--update AspNetUsers
--set EmailConfirmed='1'
--where Id='355fc252-448c-47af-8578-ade78df38ef4'

select*from AspNetUserRoles
where RoleId ='f0e27498-e80a-4e4f-ab45-6a2928795bef'

-- Actualizar plan 

select * from empresas 
where Email='admin@gutierrezlopez.com'

--update empresas 
--set FechaFinPlan ='2022-12-31 09:53:48.023'
--where EmpresaId = 'F6EED449-82AC-4D51-855E-461B8E5ACB8E'



select * from empresas
where EmpresaId ='503DA64C-D1B7-4F26-A866-BFC4F5257689'

update empresas 
Set FechaFinPlan ='2022-12-31 09:29:40.410'
where EmpresaId ='503DA64C-D1B7-4F26-A866-BFC4F5257689'

--update empresas 
--Set FechaRegistro ='2022-02-11 09:29:40.410'
--where EmpresaId ='7F174003-C6B9-4482-9ADA-5B3BE5C3678F'

select * from empresas 
where RazonSocial ='Tennis london'
--where Nit=''

--Consultar Usuarios para desbloquear

select*from AspNetUsers
where Email='admin@pgn.com'

-- Bloquear usuarios 

UPDATE AspNetUsers
SET LockoutEndDateUtc = 1
WHERE Email = 'cesar.tellez@logius.com.co'


-- Desbloquear usuarios 

UPDATE AspNetUsers
SET LockoutEndDateUtc = NULL
WHERE Email = 'admin@pgn.com'



-- Agregar accion a vista por bd 

select * from Actions
where EntityId ='1904967f-627b-4035-944a-7ba9a0bbc5c5'


-- Migracion 

insert into Serval_Lappiz_Users
select * from [192.168.29.13].[SERVAL_Lappiz].[dbo].[Lappiz_Users]
where Id !='f63e5157-ed22-4c1f-9ec0-b42988d5582d'
;


select * from AspNetUsers
where Email ='sstqa@lappiz.io'

select * from Empresas where RazonSocial like '%Semco%'  

select * from aplicaciones where EmpresaId='A9E9499E-02BA-48DB-BC7E-AD691688F2D4'


select * from aplicaciones where  Nombre like '%Semco%'

update aplicaciones
set EmpresaId='A9E9499E-02BA-48DB-BC7E-AD691688F2D4'
where AplicacionId ='1848B997-62D0-47C2-80EF-C3BBFF31D84B'
