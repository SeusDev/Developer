--use Lappiz_Basic_Apps

With importacion as (
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
),
consumo_exportacion as (
    select 
    cif.Id
    ,sum(cast(dt.cud as float) * cast (e.cant as float)) [consumo por exportacion]
from Logius_Lappiz_Exportacion E
join Logius_Lappiz_CIP cip on cip.Id = e.Ccid
join Logius_Lappiz_DetalleCipCi dt on cip.Id = dt.CipFk
join Logius_Lappiz_CI cif on cif.Id = dt.CiFk
group by cif.Ci,cif.Id 
),
total_desperdicio as (
select 
cig.Id,
sum(cast(dt.cud as float) * cast (e.cant as float) * (cast (dt.pd as float))) / 100 [Desperdicios]
from Logius_Lappiz_Exportacion E
 join Logius_Lappiz_CIP cip on cip.Id = e.Ccid
 join Logius_Lappiz_DetalleCipCi dt on cip.Id = dt.CipFk
 join Logius_Lappiz_CI cig on cig.Id = dt.CiFk
group by cig.Ci, cig.Id
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
	left join Logius_Lappiz_CI ci on ci.EmpresaFk = emp.Id
	)
select
    [Ci],
    [Unidad Fisica],
    [Cantidad Importada],
    [Fob Importado total],
    [Desc Nzo],
    [Desc Rex],
    [consumo por exportacion],
    [Desperdicios],
    [Destino],
	[Empresa]
from importacion im
left join empresa as emp on im.id = emp.id
left join consumo_exportacion as  ep  on  im.id = ep.id
left join total_desperdicio as desp on im.id = desp.Id
left join destino as de on im.id= de.id