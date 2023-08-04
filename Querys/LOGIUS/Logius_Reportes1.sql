--Importacion

select 
ci.Ci [Ci],
mu.Unifisica [Unidad Fisica],
sum(cast(i.Cantimport as int))[Cantidad Importada],
sum(cast(i.Vfob as int))[Fob Importado total],
'Consumo Exportacion' = (
select
sum(cast(e.cant as int))[consumo exportacion]
from Logius_Lappiz_Exportacion E
join Logius_Lappiz_CIP cip on cip.Id = e.Ccid
join Logius_Lappiz_DetalleCipCi dt on cip.Id = dt.CipFk
join Logius_Lappiz_CI cie on cie.Id = dt.CiFk
where cie.Id= ci.Id
group by cie.Ci
), 
'Total desperdicio'=(
select
sum(cast(dt.Cud as float)) [Total desperdicio]
from Logius_Lappiz_DetalleCipCi dt
join Logius_Lappiz_CI cid on dt.CiFk = cid.id
where cid.Id= ci.Id
group by cid.Ci
),
case when f.Finalpor =' Finalización por nacionalización' then f.Cantidad else 0 end [Desc Nzo],
case when f.Finalpor ='Reexportación' then f.Cantidad else 0 end [Desc Rex],
'Destino'=(
select
dt.Dd [Destino]
from Logius_Lappiz_DetalleCipCi dt
join Logius_Lappiz_CI cid on dt.CiFk = cid.id
where cid.Id= ci.Id
group by cid.Ci,dt.Dd
)
from Logius_Lappiz_Importacion i
join Logius_Lappiz_CI ci on ci.Id = i.CiFk
join Logius_Lappiz_Maunidadfisica mu on Ci.UnidadFk =mu.Id
join Logius_Lappiz_Finalizacion f on f.Nc=Ci.Id
--join Logius_Lappiz_DetalleCipCi dt on dt.CiFk = ci.Id
group by ci.Ci, mu.Unifisica ,f.Finalpor,f.Cantidad,ci.Id

