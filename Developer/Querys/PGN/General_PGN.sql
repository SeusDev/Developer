use PGN_Lappiz
--Consulta General PGN

Select  * from information_schema.columns WHERE TABLE_NAME= 'PGN_Lappiz_Solicitud' order by COLUMN_NAME ASC

select IUS from PGN_Lappiz_Solicitud where Id='4207F62D-E6CD-44AA-86B8-AE92AA61DA0D'

select * from PA

select * from PGN_Lappiz_Departamento
joind

select * from PGN_Lappiz_Dependencia
select * from PGN_Lappiz_MateriaPrevencion



select distinct TipoProcesoFK, COUNT(TipoProcesoFK) from PGN_Lappiz_MaestroTipoActuacion 
group by TipoProcesoFK

select * from PGN_Lappiz_MaestroTipoActuacion where TipoProcesoFK='6D8E212F-2F37-44D8-84D1-8FAE0477146D'

select IUC, IUS from PGN_Lappiz_Solicitud where Id='F7B38A88-3152-449E-A37E-F668B6CFE36B'

select Id, DependenciaFK from PGN_Lappiz_Solicitud

select d.CENombre from PGN_Lappiz_Solicitud s
join PGN_Lappiz_Dependencia d on s.DependenciaFK = d.Id
where s.Id='C27394B2-788C-4842-80F2-F387B0F13590'




select PaisFk,DepartamentoFK,MunicipioFK,Tipo,Estado,Coordinacion,CodigoDependencia from PGN_Lappiz_Dependencia where PaisFK='A3A365DC-7B3F-424B-9DF8-FB7562B54B49' and DepartamentoFK='261C09EB-2044-4C79-858B-C795C71611D2' 

select * from PGN_Lappiz_MateriaPrevencion order by NombreMateriaPreventiva asc


select * from PGN_Lappiz_DetalleActividadSolicitud


select * from PGN_Lappiz_TipoProcesoMisional where Id ='68EFF072-4601-4413-9BFA-4E5E47F2D9BB'

select * from PGN_Lappiz_Actividad WHERE Id='2FDF3649-3CFA-4E65-BFD9-CA878B6B9D8D'



select distinct  
s.Id,
s.IUC as IUC, 
s.IUS AS IUS, 
s.Estado AS Estado,
format (s.FechaHechos,'yyyy-MM-dd') AS Fechahechos,
s.DetalleSolicitud AS Detallesolicitud,
format (s.FechaRadicacion,'yyyy-MM-dd') AS FechaRadicacion,
format (s.FechaAsignacion,'yyyy-MM-dd') AS Fechaasignacion,
das.Estado AS Estado,
da.Estado as EstadoActividad,
s.OrigenDemanda AS Origen,
mfr.Nombre AS Fuentedesolicitud,
e.CENombre as Entidad,
a.Nombre as Nombreactividad,
das.Created_date as Fechaactividad,
p.NumeroIdentificacion as Identificacion,
p.PrimerNombre as Nombre,
p.PrimerApellido as Apellido1,
p.SegundoApellido as Apellido2,
dsp.TipoSolicitante as Relacion,
s.Funcionario  Responsabledependencia,
ap.NombreActividad as ActividadPrimaria,
d.CENombre as Dependecia,
tpm.NombreProcesoMisional as Proceso,
s.DescripcionHechos as DescricionHechos,
s.MunicipioHechos as MunicipioHechos,
s.DescripcionSitioHechos as DescripcionSitioHechos,
s.Conclusiones as Conclusiones,
tp.NombreTemaPrevencion as Prevencion,
dvg.NombreDelDerechoGeneralVulnerado as DerechoGeneralVulnerado,
dve.NombreDerechoEspecificoVulnerado as DerechoEspecificoVulnerado,
pa.NombrePais as Pais, 
dp.Nombre as Departamento, 
cd.NombreCiudad as Ciudad,
clp.NombreClaseProceso as claseproceso
from PGN_Lappiz_DetalleActividadSolicitud das
left JOIN PGN_Lappiz_Solicitud s on das.SolicitudFK = s.id
left join PGN_Lappiz_TipoProcesoMisional tpm on  tpm.Id = s.TipoProcesoMisionalFK
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
left join PGN_Lappiz_Funcionarios f on f.DependenciaFK = gp.Id
left join PGN_Lappiz_DetalleSolicitudPersona dps on dsp.SolicitudFk = s.id
left join PGN_Lappiz_DetalleActividadSolicitud da on das.SolicitudFK = s.Id
left join PGN_Lappiz_TemaPrevencion tp on s.TamaPrevencionFK = tp.id
left join PGN_Lappiz_DerechoVulneradoGeneral dvg on s.DerechoVulneradoGeneralFK = dvg.Id
left join PGN_Lappiz_DerechoVulneradoEspecífico dve on s.DerechoVulneradoEspecficoFK = dve.Id
left join PGN_Lappiz_Pais pa on s.PaisFK = pa.Id
left join PGN_Lappiz_Departamento dp on s.DepartamentoFK = dp.Id
left join PGN_Lappiz_Ciudad cd on s.MunicipioFK = cd.Id
left join PGN_Lappiz_ClaseProceso clp on clp.TipoProcesoIntervencionFK = s.ProcesoItenversionFK
where s.Id='757AA6C5-4FE0-4313-846F-B55AE0C6BD91'
where s.Id='757AA6C5-4FE0-4313-846F-B55AE0C6BD91'and tpm.NombreProcesoMisional= 'Intervención' or tpm.NombreProcesoMisional ='Conciliación extrajudicial'


select DependenciaFK from PGN_Lappiz_Solicitud where IUS='E-2022-000128'

select * from PGN_Lappiz_Funcionarios

select * from PGN_Lappiz_Actividad WHERE TipoProcesoMisionalFK='2D8FE851-02D9-414E-93E4-2710FF39297E'

select * from PGN_Lappiz_TipoProcesoMisional

select a.Nombre, das.FechaAsignacion from PGN_Lappiz_DetalleActividadSolicitud das
join PGN_Lappiz_Actividad a on das.ActividadFK = a.Id
join PGN_Lappiz_Solicitud S on das.SolicitudFK = s.id

select * from PGN_Lappiz_Tema