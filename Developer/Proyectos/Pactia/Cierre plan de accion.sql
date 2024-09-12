use lappiz_basic_apps


DECLARE @Abiertas INT, @Inspeccion INT , @Correor varchar(max), @correosst varchar(max), @correoa varchar (max)
SELECT @Abiertas = COUNT(p.Id),
@Correor =r.Email,
@correosst= rs.Email,
@correoa= a.Email 
FROM PactiaTest_Lappiz_PlanAccionInspecciones p
JOIN PactiaTest_Lappiz_Inspeccion_Pactia [Inspeccion] on p.InpeccionesFk = Inspeccion.Id     
JOIN PactiaTest_Lappiz_CriticidadHallazgos AS c ON p.CriticidadFk = c.Id
JOIN PactiaTest_Lappiz_Inmueble as i ON Inspeccion.ActivoFk = i.Id
JOIN PactiaTest_Lappiz_responsableactivo r on i.ResposableactivoFk = r.Id
JOIN PactiaTest_Lappiz_ResponsableSSTEnSitio rs on i.ResponsablesSST = rs.Id
JOIN PactiaTest_Lappiz_Analista a on i.AnalistaFk = a.Id
WHERE p.InpeccionesFK = '5671B4CF-5353-4820-B795-F9E9F0927746' or p.EstadoPlanAccion = 'Abierto'
GROUP BY r.Email,rs.Email,a.Email
SELECT @Inspeccion = NumeroInspeccion FROM PactiaTest_Lappiz_Inspeccion_Pactia WHERE Id = '5671B4CF-5353-4820-B795-F9E9F0927746'
SELECT 
@Abiertas AS Abiertas, 
@Inspeccion AS NumeroInspeccion,
@Correor  as Correor,
@correosst as Correosst,
@correoa as Correoa

select * from PactiaTest_Lappiz_PlanAccionInspecciones where Id='E2E4799B-3A72-41E6-A0E2-21CCE5C1B45C'

update PactiaTest_Lappiz_PlanAccionInspecciones
set
where Id=''

select * from PactiaTest_Lappiz_Inspeccion_Pactia

SELECT 
[Inspeccion].NumeroInspeccion as NumeroInspeccion,
NumeroPlanAccion AS NumeroPA, 
CEDescripcionHallazgo AS Hallazgo, 
c.CEPotencial AS Potencial, 
c.TiempoReporte AS Reporte,
c.TiempoCorrecion AS Correcion, 
i.CENombre AS Activo,
r.Email as Email,
rs.Email as EmailSST,
a.Email as EmailA
FROM PactiaTest_Lappiz_PlanAccionInspecciones as p
JOIN PactiaTest_Lappiz_Inspeccion_Pactia [Inspeccion] on p.InpeccionesFk = Inspeccion.Id     
JOIN PactiaTest_Lappiz_CriticidadHallazgos AS c ON p.CriticidadFk = c.Id
JOIN PactiaTest_Lappiz_Inmueble as i ON Inspeccion.ActivoFk = i.Id
JOIN PactiaTest_Lappiz_responsableactivo r on i.ResposableactivoFk = r.Id
JOIN PactiaTest_Lappiz_ResponsableSSTEnSitio rs on i.ResponsablesSST = rs.Id
JOIN PactiaTest_Lappiz_Analista a on i.AnalistaFk = a.Id
where p.InpeccionesFK ='5671B4CF-5353-4820-B795-F9E9F0927746'  AND p.EstadoPlanAccion = 'Abierto'





select COUNT(p.Id), 
r.Email,
rs.Email,
a.Email
FROM PactiaTest_Lappiz_PlanAccionInspecciones p
JOIN PactiaTest_Lappiz_Inspeccion_Pactia [Inspeccion] on p.InpeccionesFk = Inspeccion.Id     
JOIN PactiaTest_Lappiz_CriticidadHallazgos AS c ON p.CriticidadFk = c.Id
JOIN PactiaTest_Lappiz_Inmueble as i ON Inspeccion.ActivoFk = i.Id
JOIN PactiaTest_Lappiz_responsableactivo r on i.ResposableactivoFk = r.Id
JOIN PactiaTest_Lappiz_ResponsableSSTEnSitio rs on i.ResponsablesSST = rs.Id
JOIN PactiaTest_Lappiz_Analista a on i.AnalistaFk = a.Id
WHERE p.InpeccionesFK = '5671B4CF-5353-4820-B795-F9E9F0927746'
GROUP BY r.Email,rs.Email,a.Email