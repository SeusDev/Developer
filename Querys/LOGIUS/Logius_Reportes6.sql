use Lappiz_Basic_Apps

With importacion as (
    select
    ci.Id as id,
    ci.Ci [Ci],
    mu.Unifisica [Unidad Fisica],
    year(i.Flevante) [Fecha levante],
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
    group by ci.Ci, mu.Unifisica ,f.Finalpor,f.Cantidad,ci.Id, year (i.Flevante)
),
exportacion_consolidado as (
select 
cif.Id,
sum(cast(dt.pd as float)) as pd,
sum(cast(e.cant as float)) as cant,
sum(cast(replace(dt.cud,char(9),'') as decimal(38,12))) as cud,
sum(cast(replace(e.cant,char(9),'') as decimal(38,12)) *(cast(replace(dt.Cud,char(9),'') as decimal(38,12)))) as Resultado2
from Logius_Lappiz_Exportacion E
join Logius_Lappiz_CIP cip on cip.Id = e.Ccid
join Logius_Lappiz_DetalleCipCi dt on cip.Id = dt.CipFk
join Logius_Lappiz_CI cif on cif.Id = dt.CiFk
group by cif.Ci,cif.Id
),
calculo_consumo_exportacion_y_desperdicios as (
    select 
    Id,
    (Resultado2) as [consumo por exportacion],
	(cud * cant * pd / 100) as [Desperdicios]
from exportacion_consolidado
),

destino as (
    select
	cid.id,
    dt.Dd [Destino]
    from Logius_Lappiz_DetalleCipCi dt
    join Logius_Lappiz_CI cid on dt.CiFk = cid.id
    group by cid.Ci,dt.Dd, cid.Id
),
Empresa as (
    select 
	ci.Id,
	emp.Nempresa [Empresa]
	from Logius_Lappiz_Empresas emp
	join Logius_Lappiz_CI ci on ci.EmpresaFk = emp.Id
	)
select distinct
    [Ci],
    [Unidad Fisica],
    [Cantidad Importada],
    [Fob Importado total],
    [Desc Nzo],
    [Desc Rex],
    [Fecha levante],
	cast([consumo por exportacion] as decimal(38,2)) as [consumo por exportacion],
	cast([Desperdicios] as decimal(38,2)) as [Desperdicios],
    [Destino],
	[Empresa]
from importacion im
left join empresa as emp on im.id = emp.id
left join calculo_consumo_exportacion_y_desperdicios as  ep  on  im.id = ep.id
left join destino as de on im.id= de.id



select 
cif.Id,
sum(cast(dt.pd as float)) as pd,
sum(cast(e.cant as float)) as cant,
sum(cast(replace(dt.cud,char(9),'') as decimal(38,12))) as cud,
sum(cast(cip.Vfob as float))[ValorUnitario],
sum(cast(e.cant as float)) [Cantidad Exportada],
sum(cast(e.Vfob as float)) [Valor Fob Exportado],
sum(cast(cif.Arancel as float)) [Porcentaje Arancel],
sum(cast(cif.Iva as float)) [Porcentaje Iva],
sum(cast(replace(e.cant,char(9),'') as decimal(38,12)) *(cast(replace(dt.Cud,char(9),'') as decimal(38,12)))) as Resultado2
from Logius_Lappiz_Exportacion E
join Logius_Lappiz_CIP cip on cip.Id = e.Ccid
join Logius_Lappiz_DetalleCipCi dt on cip.Id = dt.CipFk
join Logius_Lappiz_CI cif on cif.Id = dt.CiFk
group by cif.Ci,cif.Id


--Reporte Ahorros

With importacion as (
    select
    ci.Id as id,
    ci.Ci [Ci],
    mu.Unifisica [Unidad Fisica],
    year(i.Flevante) [Fecha levante],
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
    group by ci.Ci, mu.Unifisica ,f.Finalpor,f.Cantidad,ci.Id, year (i.Flevante)
),
exportacion_consolidado as (
select 
cif.Id,
sum(cast(dt.pd as float)) as pd,
sum(cast(e.cant as float)) as cant,
sum(cast(replace(dt.cud,char(9),'') as decimal(38,12))) as cud,
sum(cast(cip.Vfob as float))[ValorUnitario],
sum(cast(e.cant as float)) [Cantidad Exportada],
sum(cast(e.Vfob as float)) [Valor Fob Exportado],
sum(cast(cif.Arancel as float)) [Porcentaje Arancel],
cif.Iva [Porcentaje Iva],
--sum(cast(cif.Iva as float)) [Porcentaje Iva],
sum(cast(replace(e.cant,char(9),'') as decimal(38,12)) *(cast(replace(dt.Cud,char(9),'') as decimal(38,12)))) as Resultado2
from Logius_Lappiz_Exportacion E
join Logius_Lappiz_CIP cip on cip.Id = e.Ccid
join Logius_Lappiz_DetalleCipCi dt on cip.Id = dt.CipFk
join Logius_Lappiz_CI cif on cif.Id = dt.CiFk
group by cif.Ci,cif.Id,cif.Iva
),
calculo_consumo_exportacion_y_desperdicios as (
    select 
    Id,
    (Resultado2) as [consumo por exportacion],
	(cud * cant * pd / 100) as [Desperdicios]
from exportacion_consolidado
),

destino as (
    select
	cid.id,
    dt.Dd [Destino]
    from Logius_Lappiz_DetalleCipCi dt
    join Logius_Lappiz_CI cid on dt.CiFk = cid.id
    group by cid.Ci,dt.Dd, cid.Id
),
Empresa as (
    select 
	ci.Id,
	emp.Nempresa [Empresa]
	from Logius_Lappiz_Empresas emp
	join Logius_Lappiz_CI ci on ci.EmpresaFk = emp.Id
	)
select distinct
    [Ci],
    [Unidad Fisica],
    [Cantidad Importada],
    [Fob Importado total],
	[ValorUnitario],
	[Cantidad Exportada],
	[Valor Fob Exportado],
	[Porcentaje Arancel],
	[Porcentaje Iva],
    [Desc Nzo],
    [Desc Rex],
    [Fecha levante],
	cast([consumo por exportacion] as decimal(38,2)) as [consumo por exportacion],
	cast([Desperdicios] as decimal(38,2)) as [Desperdicios],
    [Destino],
	[Empresa]
from importacion im
left join empresa as emp on im.id = emp.id	
left join calculo_consumo_exportacion_y_desperdicios as  ep  on  im.id = ep.id
left join destino as de on im.id= de.id
left join exportacion_consolidado as ec on im.id = ec.Id
--where  isnull(im.[Fecha levante] ,'')=@Fecha_Levante or emp.Empresa in (@Emp)