use PGN_Lappiz
--Consulta de tablas

-- FILTRO
#UrlBase#/PGN_Lappiz.api/api/PGN_Lappiz_Ciudad?$orderby=Nombre asc



Select  * from information_schema.columns WHERE TABLE_NAME= 'PGN_Lappiz_Solicitud' order by COLUMN_NAME  ASC

select 
s.IUC [IUC], 
s.IUS [IUS], 
s.Estado [Estado],
s.FechaHechos [Fecha hechos],
s.FechaAsignacion [Fecha asignacion]
from PGN_Lappiz_Solicitud s
join PGN_Lappiz_Dependencia d on s.DependenciaFK = d.Id



select * from PGN_Lappiz_Catalogo
select * from PGN_Lappiz_Dependencia
select * from PGN_Lappiz_Solicitud
select * from PGN_Lappiz_Documentos
select * from PGN_Lappiz_Funcionarios
select * from PGN_lappiz_Personas
select * from PGN_Lappiz_Tema
select * from PGN_Lappiz_SubTemaPrevencion
select * from PGN_Lappiz_Entidad
select * from PGN_Lappiz_Actividad
select * from PGN_Lappiz_DetalleActividadSolicitud
select * from PGN_Lappiz_DetalleSolicitudPersona
select * from PGN_Lappiz_DetalleDocumentoProtocolo
select * from PGN_Lappiz_Departamento
SELECT * FROM PGN_Lappiz_Ciudad
select * from PGN_Lappiz_SedeDependencia where Id='86C60158-9DB7-455F-9278-FBAA8079ACFE'
select * from PGN_Lappiz_Users where Email='angelica.cediel@softwareestrategico.com'
select * from Lappiz_HistoryLogs
select * from PGN_Lappiz_Users

select * from PGN_Lappiz_Pais  order by  NombrePais  asc

--insert into PGN_Lappiz_Pais (NombrePais,RowStatus)
--values ('Prueba','Active')


select * from PGN_Lappiz_Personas

select * from PGN_Lappiz_IdProfesion


select * from PGN_Lappiz_TipoDePoblacion order by 


delete PGN_Lappiz_Users where Id='302428CF-79FC-4556-9764-B12F09B3D53B'


select * from PGN_Lappiz_Funcionarios
select * from PGN_Lappiz_Dependencia
select *from PGN_Lappiz_TipoProcesoMisional


select * from PGN_Lappiz_MaestroTipoProcesoIntervencion where Id='6CE64C39-A07A-43F3-AE76-D3800FEAA158'
select * from PGN_Lappiz_ClaseProceso
select*from PGN_Lappiz_Proceso
select * from PGN_Lappiz_Etapa



select u.Nombres [Usuario], dp.CENombre [Dependencia], s.FechaRadicacion [Fecha Radicacion], s.Estado[Estado] from PGN_Lappiz_Solicitud s 
join PGN_Lappiz_Users u on s.UsuarioFK = u.Id
join PGN_Lappiz_Dependencia dp on s.DependenciaFK = dp.Id
where s.Id='D434AD87-1C62-4B16-A318-2056438B39CF'



select * from PGN_Lappiz_Users


select * from PGN_Lappiz_Solicitud

select Id, Actividad from PGN_Lappiz_Solicitud

select * from PGN_Lappiz_DetalleActividadSolicitud


select 
s.Id [Id],
s.IUC [IUC],
s.IUS [IUS],
a.Nombre [Actividad],
s.Estado [Estado],
s.Actividad [Actividad desde solicitud]
from PGN_Lappiz_DetalleActividadSolicitud das
join PGN_Lappiz_Solicitud s on das.SolicitudFK = s.Id
join PGN_Lappiz_Actividad a on das.ActividadFK = a.id
where s.IUC ='P-2022-13'

select
s.Id, 
s.IUC,
s.IUS,
s.Actividad,
s.Estado

from PGN_Lappiz_Solicitud s


SELECT * FROM PGN_Lappiz_Solicitud
SELECT * FROM PGN_Lappiz_Actividad
SELECT * FROM PGN_Lappiz_DetalleActividadSolicitud

select * from PGN_Lappiz_Agenda


select * from PGN_Lappiz_detalleObservacion



#UrlBase#/PGN_Lappiz.api/api/PGN_Lappiz_detalleObservacion?$filter=P
GN_Lappiz_detalleObservacion.DocumentoFK eq 'f3d09d95-8879-42c7-905d-71a94accfcd2'


Select  * from information_schema.columns WHERE TABLE_NAME= 'PGN_Lappiz_detalleObservacion' order by COLUMN_NAME  ASC

update PGN_Lappiz_detalleObservacion
set DocumentoFK= 'f3d09d95-8879-42c7-905d-71a94accfcd2'
where Id='551D9711-DE5B-4F5B-8E7C-AE610F404E45'

insert into PGN_Lappiz_detalleObservacion (Id,CEDetalleObservacion,Created_date,Edited_date,Created_by,Edited_by,UserEmail,IpAddress,EventType,RowStatus,NombreDocumento,FechaObservacion,TextoObservacion,UsuarioSolicitud,DocumentoFK)
values (
'551D9711-DE5B-4F5B-8E7C-AE610F204E45',
'NULL',
'2022-05-03 13:13:00.000',
'2022-05-03 13:13:00.000',
'6394355D-809D-49FA-8F3C-4F49F6DBF7CA',
'6394355D-809D-49FA-8F3C-4F49F6DBF7CA',
'admin@pgn.com',
'NULL',
'Insertar',
'Active',
'NULL',
'2022-05-03 08:12:50.000',
'documento prueba',
'Sebastian',
'f3d09d95-8879-42c7-905d-71a94accfcd2'
)



#UrlBase#/Partesmontaje_Lappiz.api/api/Partesmontajes_Lappiz_Ciudad?filter Id = '1B577E78-5F65-4DD8-8809-324AB43C0E58' 

SELECT * FROM PGN_Lappiz_Ciudad 
order by Nombre asc  


SELECT S.Id AS IdSolicitud, P.Id AS IdProceso, F.Id AS IdFuncionario, S.IUS, S.IUC, D.CENombre AS NombreDependencia,
        (F.CENombre + ' ' + F.ApellidoFuncionario) AS NombreFuncionario, 
        P.NombreProcesoMisional AS Proceso, A.Nombre AS Actividad, S.Estado, S.FechaAsignacion
        FROM PGN_Lappiz_Solicitud S 
        JOIN PGN_Lappiz_Dependencia D ON S.DependenciaFK = D.Id
        JOIN PGN_Lappiz_TipoProcesoMisional P ON P.Id = S.TipoProcesoMisionalFK 
        JOIN PGN_Lappiz_Actividad A ON A.Id = S.ActividadGeneralFK
        JOIN PGN_Lappiz_GrupoDependencia GD ON GD.IdDependenciaIFK = D.Id
        JOIN PGN_Lappiz_Funcionarios F ON F.GrupoDependenciaFK = GD.Id 
        WHERE UsuarioFK='6394355d-809d-49fa-8f3c-4f49f6dbf7ce'

		select * from PGN_Lappiz_AtencionAlPublico
		select * from PGN_Lappiz_DocumentosAtencionUsuario

		Select  * from information_schema.columns WHERE TABLE_NAME= 'PGN_Lappiz_Documentos' order by COLUMN_NAME ASC
		select * from PGN_Lappiz_Documentos
		select * from PGN_Lappiz_TipoDocumentoAP

		Select  * from information_schema.columns WHERE TABLE_NAME= 'PGN_Lappiz_Solicitud' order by COLUMN_NAME ASC


		select * from PGN_Lappiz_AgenciaEspecial order by IdAgencia desc

		update PGN_Lappiz_AgenciaEspecial
		set IdAgencia = '56'
		where Id='B1764AD7-E05D-4576-BD32-289699835E92'

		select * from PGN_Lappiz_OpcionCatalogo order by CEDescripcin asc

		select * from PGN_Lappiz_Users
		select * from Lappiz_HistoryLogs


select * from PGN_Lappiz_OpcionCatalogo order by NombreOpcionCatalogo asc
select * from PGN_Lappiz_Catalogo

		select * from PGN_Lappiz_MaestroTipoDemanda
		select * from PGN_Lappiz_TipoProcesoMisional
		select * from PGN_Lappiz_MaestroTipoInterviniente


		#UrlBase#/PGN_Lappiz.api/api/PGN_Lappiz_OpcionCatalogo?$filter=RowStatus eq 'Active' & $orderby=NombreOpcionCatalogo asc Asc

use Lappiz_Basic_Apps

select * from Dicomo_Lappiz_Vereda 
select * from Dicomo_Lappiz_Municipio where Id ='0B2C3438-C736-4C3A-94EB-E963458BDE52'







select * from PGN_Lappiz_Dependencia