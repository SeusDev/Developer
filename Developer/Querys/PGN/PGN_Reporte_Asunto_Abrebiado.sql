select * from PGN_Lappiz_ActividadPreventiva
select * from PGN_Lappiz_DetalleActividadSolicitud
select * from PGN_Lappiz_Solicitud
select * from PGN_Lappiz_ActividadPreventiva

Select  * from information_schema.columns WHERE TABLE_NAME= 'PGN_Lappiz_Solicitud'

select distinct  
s.Id,
s.IUC as IUC, 
s.IUS AS IUS, 
s.Estado AS ESTADO,
format (s.FechaHechos,'yyyy-MM-dd') AS FECHAHECHOS,
s.DetalleSolicitud AS Detallesolicitud,
format (s.FechaAsignacion,'yyyy-MM-dd') AS Fechaasignacion,
a.Nombre AS Actividad,
das.Estado AS Estado,
s.OrigenDemanda AS Origen,
mfr.Nombre AS Fuentedesolicitud,
mp.NombreMateriaPreventiva AS Materia,
t.NombreTema as Tema,
sp.NombreSubtemaPrevencion as Subtema,
e.CENombre as Entidad,
a.Nombre as Nombreactividad,
das.Estado as Estadoactividad,
das.Created_date as Fechaactividad,
p.NumeroIdentificacion as Identificacion,
p.PrimerNombre as Nombre,
p.PrimerApellido as Apellido1,
p.SegundoApellido as Apellido2,
dsp.TipoSolicitante as Relacion,
s.Funcionario  Responsabledependencia,
ap.NombreActividad as ActividadPrimaria,
d.CENombre as Dependencia,
s.ActuacionPreventiva as Actuacionpreventiva
from PGN_Lappiz_DetalleActividadSolicitud das
left JOIN PGN_Lappiz_Solicitud s on das.SolicitudFK = s.id
left JOIN PGN_Lappiz_Actividad a on das.ActividadFK = a.Id
left join PGN_Lappiz_ActividadPreventiva ap on ap.ActividadFK = a.Id
left JOIN PGN_Lappiz_MaestroFuenteRadicacion mfr on s.FuenteFK = mfr.Id
left JOIN PGN_Lappiz_MateriaPrevencion mp on s.MateriFK = mp.Id
left join PGN_Lappiz_Tema t on s.TamaPrevencionFK = t.Id
left join PGN_Lappiz_SubTemaPrevencion sp on s.SubtemaFK = sp.Id
left join PGN_Lappiz_Entidad e on s.EntidadFK = e.Id
left join PGN_Lappiz_DetalleSolicitudPersona dsp on dsp.SolicitudFk = s.Id
left join PGN_Lappiz_Personas p on  dsp.PersonaFk = p.Id
left join PGN_Lappiz_Dependencia d on s.DependenciaFK = d.id
left join PGN_Lappiz_GrupoDependencia gp on gp.IdDependenciaIFK = d.Id
left join PGN_Lappiz_Funcionarios f on f.GrupoDependenciaFK = gp.Id
left join PGN_Lappiz_DetalleSolicitudPersona dps on dsp.SolicitudFk = s.id

select 
s.Id,
pa.Nombre as Pais,
dp.Nombre as Departamento, 
cd.Nombre as Ciudad
from PGN_Lappiz_DetalleActividadSolicitud das
left JOIN PGN_Lappiz_Solicitud s on das.SolicitudFK = s.id
left join PGN_Lappiz_Pais pa on s.PaisFK = pa.Id
left join PGN_Lappiz_Departamento dp on s.DepartamentoFK = dp.Id
left join PGN_Lappiz_Ciudad cd on s.MunicipioFK = cd.Id
where s.Id=@Id


select 
mr.Nombre AS Fuente,
format (s.FechaAsignacion,'yyyy-MM-dd') AS Fecha,
s.Funcionario as Usuario
from PGN_Lappiz_DetalleActividadSolicitud das
left JOIN PGN_Lappiz_Solicitud s on das.SolicitudFK = s.id
left JOIN PGN_Lappiz_MaestroFuenteRadicacion mr on s.FuenteFK = mr.Id
where s.Id=@Id




select ActuacionPreventiva,ActividadPreventivaFK from PGN_Lappiz_Solicitud 
select * from PGN_Lappiz_ActividadPreventiva

select * from PGN_Lappiz_DetalleActividadPreventiva


select * from PGN_Lappiz_Actividad

select * from PGN_Lappiz_