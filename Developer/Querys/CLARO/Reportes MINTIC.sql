use TuGiroApp_Lappiz

-- Parámetros de entrada GIRONOVEDADDTO 
select
g.NumGiro [Consecutivo],
pv.CodigoCav [CodOfiAdmision],
pc.Codigopostal [CodPostalAdm],
pv.Nombre [oficinaAdmision],
g.MedioElegido [Canalimposición],
FORMAT(CAST(g.FechaCreacionComputada AS DATETIME), 'dd/MM/yyyy hh:mm:ss') [fechaAdmision],
g.Remitente [emisor],
g.Destinatario [receptor],
COALESCE(CAST(g.TotalApagar  AS VARCHAR(255)), '')[monto],
g.GiroFlete [flete],
CASE
WHEN pp.TipoDocumento='Sin validacion biometrica' THEN 'CRE'
WHEN pp.TipoDocumento='Disponible' THEN 'CRE'
WHEN pp.TipoDocumento='Anulado' THEN 'DEV'
WHEN pp.TipoDocumento='Devolución' THEN 'DEV'
WHEN pp.TipoDocumento='Rezagado' THEN 'INAC'
WHEN pp.TipoDocumento='Rechazado' THEN 'DEV'
WHEN pp.TipoDocumento='Pagado' THEN 'PAG'
END AS [evento],
pv.CodigoCav[CodOfiPago],
pc.Codigopostal [CodPostalPago],
pv.Nombre [oficinaPago],
g.MedioElegido [CanalPago],
c.Nombre [divciuOrigen],
g.CiuDes[CiuDes],
g.NITEmpresaClaro [nitPrestador],
COALESCE (FORMAT(CAST(g.FechaPagoComputada AS DATETIME), 'dd/MM/yyyy hh:mm:ss'),'') [fechaPago],
COALESCE(CAST(g.Observaciones  AS VARCHAR(255)), '') [Observaciones]
from TuGiroApp_Lappiz_Giro g
inner join TuGiroApp_Lappiz_PuntosDeVenta  pv on g.PuntoDeVentaDestino =pv.Id
inner join TuGiroApp_Lappiz_postalcav pc on pv.CodigopostalcavFk = pc.Id
inner join TuGiroApp_Lappiz_Ciudades c on g.CiudadOrigen = c.Id
WHERE 
-- Ayer a las 5 PM (asumiendo que estás en una zona horaria GMT-7)
g.Created_date >= CONVERT(DATETIME, CONVERT(DATE, GETDATE())) + CONVERT(DATETIME, '17:00:00')-1 
  AND 
  -- Hoy a las 5 PM (asumiendo que estás en una zona horaria GMT-7)
  g.Created_date <= CONVERT(DATETIME, CONVERT(DATE, GETDATE())) + CONVERT(DATETIME, '17:00:00')


select * from TuGiroApp_Lappiz_Giro

SELECT *
FROM TuGiroApp_Lappiz_Giro
WHERE Created_date >= CONVERT(DATETIME, CONVERT(DATE, GETDATE())) + CONVERT(DATETIME, '17:00:00')-1 -- Ayer a las 5 PM (asumiendo que estás en una zona horaria GMT-7)
  AND Created_date <= CONVERT(DATETIME, CONVERT(DATE, GETDATE())) + CONVERT(DATETIME, '17:00:00')-- Hoy a las 5 PM (asumiendo que estás en una zona horaria GMT-7)

--Parámetros de salida TRANSACCIÓNDTO 


select 
g.Id [idTransacción],
CASE
WHEN pp.TipoDocumento='Sin validacion biometrica' THEN 'Error'
WHEN pp.TipoDocumento='Disponible' THEN 'Error'
WHEN pp.TipoDocumento='Anulado' THEN 'Error'
WHEN pp.TipoDocumento='Devolución' THEN 'Error'
WHEN pp.TipoDocumento='Rezagado' THEN 'Error'
WHEN pp.TipoDocumento='Rechazado' THEN 'Error'
WHEN pp.TipoDocumento='Pagado' THEN 'Éxito'
END AS [codTransacción],
isnull (g.Observaciones,'') [descTransacción]
from TuGiroApp_Lappiz_Giro g
inner join TuGiroApp_Lappiz_PuntosDeVenta  pv on g.PuntoDeVentaDestino =pv.Id
inner join TuGiroApp_Lappiz_postalcav pc on pv.CodigopostalcavFk = pc.Id
inner join TuGiroApp_Lappiz_Ciudades c on g.CiudadOrigen = c.Id


--Parámetros de salida BeneficiarioDTO 

select distinct
pp.NumeroIdentificacion [Identificacion],
CASE
WHEN pp.TipoDocumento='Cédula de ciudadanía' THEN 'CC'
WHEN pp.TipoDocumento='Cédula de Extranjería' THEN 'CE'
WHEN pp.TipoDocumento='Pasaporte Colombiano expedido por el Ministerio de Relaciones Exteriores' THEN 'PA'
WHEN pp.TipoDocumento='Tarjeta de identidad' THEN 'TI'
END AS [Tipoidentificacion],
CONCAT ( pp.PrimerApellido, ' ', pp.SegundoApellido) [Apellidos],
CONCAT ( pp.CENombre, ' ', pp.SegundoNombre) [Nombres],
pp.Direccion [Direccion],
pp.TelfonoMovil [Telefono]
from	TuGiroApp_Lappiz_Giro g 
inner join TuGiroApp_Lappiz_Personas pp on   g.DestinatarioFk = pp.Id




select 
CONCAT(PrimerApellido, ' ' ,SegundoApellido) as Apellidos 
from 
TuGiroApp_Lappiz_Personas where NumeroIdentificacion = '1144142263' 