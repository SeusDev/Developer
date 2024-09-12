use Tugiroapp_lappiz

Select  * from information_schema.columns WHERE TABLE_NAME= 'TuGiroApp_Lappiz_Personas'
Select  * from information_schema.columns WHERE TABLE_NAME= 'TuGiroApp_Lappiz_Giro'
Select  * from information_schema.columns WHERE TABLE_NAME= 'TuGiroApp_Lappiz_EmpleadosDelPuntoDeVenta'\

DBCC CHECKIDENT([TuGiroApp_Lappiz_Giro], NORESEED)
DBCC CHECKIDENT([TuGiroApp_Lappiz_Giro], RESEED,0)

SELECT object_name(id) as Tablas ,rowcnt as Registros
FROM sys.sysindexes
WHERE indid=1
ORDER BY 1

select * from TuGiroApp_Lappiz_Personas where NumeroIdentificacion = '10203040'
select ListasVinculantes from TuGiroApp_Lappiz_Personas where Id = '048A73A0-B2E5-4D25-92E7-012980081005'
select Estado from TuGiroApp_Lappiz_Giro where NumGiro = '1'

select Huella,HuellaDestinatario,Estado from TuGiroApp_Lappiz_Giro where NumGiro = '1'

select * from TuGiroApp_Lappiz_Giro g
inner join TuGiroApp_Lappiz_Personas p on g.RemitenteFk = p.Id
where g.NumGiro = '4'

select * from TuGiroApp_Lappiz_Personas

SELECT STUFF((SELECT ',' + CENombre
FROM TuGiroApp_Lappiz_Personas
FOR XML PATH('')), 1, 1, '') AS columnas_vertical




update TuGiroApp_Lappiz_Giro
set HuellaDestinatario=NULL
where NumGiro = '11'

--update TuGiroApp_Lappiz_Giro
--set Estado='Pagado'
--where NumGiro = '80639'

--update TuGiroApp_Lappiz_Giro
--set Estado='Disponible'
--where NumGiro = '13'


--Consulta
select * from TuGiroApp_Lappiz_Personas where NumeroIdentificacion = '1037605487' 


select 
Id,
NumGiro,
Remitente,
Destinatario,
PuntoDeVentaDestino,
Valor,
Total,
Observaciones,
FechaYHora,
Estado
from TuGiroApp_Lappiz_Giro where RemitenteFk in (
select 
Id
from TuGiroApp_Lappiz_Personas
where NumeroIdentificacion = '1037605487'
)

select 
Id,
NombreCompleto,
NumeroIdentificacion,
HuellaPersona,
HuellaRegistrada, 
EstadoPersona,
ListasVinculantes
from TuGiroApp_Lappiz_Personas
where NumeroIdentificacion = '1037605487'


delete TuGiroApp_Lappiz_Personas where NumeroIdentificacion IN ( '1037605487','70560568')


-- Reiniciar huella
update TuGiroApp_Lappiz_Personas
set HuellaPersona = null, HuellaRegistrada ='NO', EstadoPersona = 'Inactiva', ListasVinculantes= NULL
where NumeroIdentificacion = '1037605487'



