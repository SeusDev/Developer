use Lappiz_Basic_Apps

--Select  * from information_schema.columns WHERE TABLE_NAME= 'Logius_Lappiz_Exportacion'
--Select  * from information_schema.columns WHERE TABLE_NAME= 'Logius_Lappiz_DetalleCipCi'
Select  * from information_schema.columns WHERE TABLE_NAME= 'importacion'

With importacion as (
    select
    ci.Id as id,
    ci.Ci [Ci],
    mu.Unifisica [Unidad Fisica],
    year(i.Flevante) [Fecha levante],
    sum(cast(i.Cantimport as int))[Cantidad Importada],
    sum(cast(i.Vfob as int))[Fob Importado total],
    case when f.Finalpor =' Finalizaci�n por nacionalizaci�n' then f.Cantidad else 0 end [Desc Nzo],
    case when f.Finalpor ='Reexportaci�n' then f.Cantidad else 0 end [Desc Rex]	
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
sum(cast(replace(dt.cud,char(9),'') as decimal(38,12))) as cud
from Logius_Lappiz_Exportacion E
join Logius_Lappiz_CIP cip on cip.Id = e.Ccid
join Logius_Lappiz_DetalleCipCi dt on cip.Id = dt.CipFk
join Logius_Lappiz_CI cif on cif.Id = dt.CiFk
group by cif.Ci,cif.Id
),
calculo_consumo_exportacion_y_desperdicios as (
    select 
    Id,
    (cud * cant) as [consumo por exportacion],
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
--where  im.[Fecha levante] =@Fecha_Levante or emp.Empresa = @Empresa
--where  im.[Fecha levante] = @Flevante or emp.Empresa = @emp.Empresa
where  im.[Fecha levante] ='2021' and emp.Empresa in ('TOPTEC S.A.','QUINTAL S.A.')
-----------------------------------------------------------------------------

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
sum(cast(replace(dt.cud,char(9),'') as decimal(38,12))) as cud
from Logius_Lappiz_Exportacion E
join Logius_Lappiz_CIP cip on cip.Id = e.Ccid
join Logius_Lappiz_DetalleCipCi dt on cip.Id = dt.CipFk
join Logius_Lappiz_CI cif on cif.Id = dt.CiFk
group by cif.Ci,cif.Id
),
calculo_consumo_exportacion_y_desperdicios as (
    select 
    Id,
    (cud * cant) as [consumo por exportacion],
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
where  im.[Fecha levante] = '' or emp.Empresa in ('QUINTAL S.A.','TOPTEC S.A.')

-----------------------------------------------


select year(Flevante) [Periodo] from Logius_Lappiz_Importacion i
left join Logius_Lappiz_CI ci on ci.Id = i.CiFk
group by  year (i.Flevante)


select e.Id, e.Nempresa [Empresa] from Logius_Lappiz_Importacion  im
join Logius_Lappiz_Empresas e on im.EmpresaFk = e.Id
group by e.Id,e.Nempresa


 select e.Id, e.Nempresa from Logius_Lappiz_Importacion  im
        join Logius_Lappiz_Empresas e on im.EmpresaFk = e.Id
        group by e.Id,e.Nempresa order by e.Nempresa asc



-- LOGIUS

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
sum(cast(replace(dt.cud,char(9),'') as decimal(38,12))) as cud
from Logius_Lappiz_Exportacion E
join Logius_Lappiz_CIP cip on cip.Id = e.Ccid
join Logius_Lappiz_DetalleCipCi dt on cip.Id = dt.CipFk
join Logius_Lappiz_CI cif on cif.Id = dt.CiFk
group by cif.Ci,cif.Id
),
calculo_consumo_exportacion_y_desperdicios as (
    select 
    Id,
    (cud * cant) as [consumo por exportacion],
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
where  isnull(im.[Fecha levante] ,'')=@Fecha_Levante or emp.Empresa in (@Emp)

select *  from Logius_Lappiz_Exportacion
select *  from Logius_Lappiz_DetalleCipCi
