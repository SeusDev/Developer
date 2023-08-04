use Lappiz_Basic_Apps


select 
--count(*) as item,
Ci.Ci[N°ci],
cip.Cip [cip],
mu.Unifisica[Unidad],
sum(cast(i.Cantimport as int))[Cantidad importada],
sum(cast(e.Cant as int))[Consumo exportacion],
sum (cast(i.Vfob as int))[FOB importado total],
sum (cast(dt.Cud as float))[total desperdicio],
--dt.Cud [Cantidad desperdicio],
case when f.Finalpor =' Finalización por nacionalización' then f.Cantidad else 0 end [Desc Nzo],
case when f.Finalpor ='Reexportación' then f.Cantidad else 0 end [Desc Rex],
f.Finalpor [Finalpor],
dt.Dd [Destino]

from Logius_Lappiz_DetalleCipCi dt
join Logius_Lappiz_CI Ci on Ci.Id= dt.CiFk
join Logius_Lappiz_CIP Cip on Cip.Id = dt.CipFk
join Logius_Lappiz_Maunidadfisica mu on Ci.UnidadFk= mu.Id
join Logius_Lappiz_Finalizacion f on f.Nc=Ci.Id
join Logius_Lappiz_Exportacion e on e.Ccid = dt.CipFk
join Logius_Lappiz_Importacion i on i.CiFk = Ci.Id

group by Ci.Ci,cip.Cip,mu.Unifisica,f.Finalpor,f.Cantidad,dt.Cud,dt.Dd
order by cip.Cip asc

select

sum(cast(ci.Ci as int))[N°ci],
mu.Unifisica[Unidad],
--i.Cantimport [Cantidad importada],
sum(cast(i.Cantimport as int))[Cantidad importada],
sum (cast(i.Vfob as int))[FOB importado total],
sum (cast(dt.Cud as float))[total desperdicio],
case when f.Finalpor =' Finalización por nacionalización' then f.Cantidad else 0 end [Desc Nzo],
case when f.Finalpor ='Reexportación' then f.Cantidad else 0 end [Desc Rex],
f.Finalpor [Finalpor],
dt.Dd [Destino]

from Logius_Lappiz_Importacion i
join Logius_Lappiz_CI Ci on Ci.Id= i.CiFk
join Logius_Lappiz_Maunidadfisica mu on Ci.UnidadFk= mu.Id
join Logius_Lappiz_Finalizacion f on f.Nc=Ci.Id
join Logius_Lappiz_DetalleCipCi dt on dt.CiFk = ci.Id

group by Ci.Ci,i.Cantimport,mu.Unifisica,f.Finalpor,f.Cantidad,dt.Dd