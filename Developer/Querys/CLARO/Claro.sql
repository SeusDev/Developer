use Tugiroapp_lappiz
use LappizV2Prod

select * from AspNetRoles where EmpresaId='023c3dab-2eea-4e83-b3eb-62824166c18f' order by Name asc
select * from FormsEvents where EntityId = 'f2fab0a1-df6a-4bd1-b38e-ce3c4f67d8f8' and Implementation like '%#PagarGiro%'


select*from AspNetUsers
where Email='martha.castillo@claro.com.co'

-- Bloquear usuarios 

--UPDATE AspNetUsers
--SET LockoutEndDateUtc = NULL
--where Email='martha.castillo@claro.com.co'


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

update TuGiroApp_Lappiz_Giro
set Estado='Disponible'
where NumGiro = '13'


select  NumeroIdentificacion,HuellaPersona from TuGiroApp_Lappiz_Personas  
select * from TuGiroApp_Lappiz_PuntosDeVenta where Id='2D19814F-3307-4A1B-9D86-79552AEF0814'
select * from TuGiroApp_Lappiz_EmpleadosDelPuntoDeVenta where  EmpleadosDelPuntoDeVenta='5A6BFB90-286C-4836-8A96-E644DD48DE67'
select * from TuGiroApp_Lappiz_Agentes where Id='8949D972-B643-425E-BD28-205532911B43'

select * from lappiz_users


select 
pv.Id,
pv.Nombre,
u.FullName
from TuGiroApp_Lappiz_EmpleadosDelPuntoDeVenta epv 
inner join  TuGiroApp_Lappiz_PuntosDeVenta pv on epv.EmpleadosDelPuntoDeVenta = pv.Id
inner join  lappiz_users u on epv.UsuarioFK = u.Id
where u.Id='D7CE9F32-EEA2-41E6-96D9-FEB782C43445'

-- Configuracion

select * from AspNetUsers
where Email ='supervisorQa@qalappiz.com'


update AspNetUsers 
set EmailConfirmed = 1
where Email ='supervisorQa@qalappiz.com'

--Consulta

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
where NumeroIdentificacion = '1144142263'
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
where NumeroIdentificacion = '1144142263'


delete TuGiroApp_Lappiz_Personas where NumeroIdentificacion IN ( '1037605487','70560568')


-- Reiniciar huella
update TuGiroApp_Lappiz_Personas
set HuellaPersona = null, HuellaRegistrada ='NO', EstadoPersona = 'Inactiva', ListasVinculantes= NULL
where NumeroIdentificacion = '1037605487'


delete TuGiroApp_Lappiz_Personas where Id='BA9F4E56-9A08-4686-8E12-D823188AACD7'

--delete TuGiroApp_Lappiz_Giro where Id in (
--'0151E88C-23B5-4B75-8BBB-F6F57CC24FB2',
--'396A5870-1FE2-4954-9EF6-B7C1DB583898',
--'4603784E-3A44-4E4F-A87A-B4D5DAFDC1F4',
--'F3F66BC7-2FD3-4E87-BA32-9C5DAD99BA49',
--'9A51143A-B12D-416D-B0EB-3D4BC568BEC4',
--'C5C2905C-A08C-4E5B-BD08-1C15580032A2'
--)

--select * from TuGiroApp_Lappiz_Alertas where NumeroGiroFk in (
--'0151E88C-23B5-4B75-8BBB-F6F57CC24FB2',
--'396A5870-1FE2-4954-9EF6-B7C1DB583898',
--'4603784E-3A44-4E4F-A87A-B4D5DAFDC1F4',
--'F3F66BC7-2FD3-4E87-BA32-9C5DAD99BA49',
--'9A51143A-B12D-416D-B0EB-3D4BC568BEC4',
--'C5C2905C-A08C-4E5B-BD08-1C15580032A2'
--)

delete TuGiroApp_Lappiz_Alertas where NumeroGiroFk in (
'0151E88C-23B5-4B75-8BBB-F6F57CC24FB2',
'396A5870-1FE2-4954-9EF6-B7C1DB583898',
'4603784E-3A44-4E4F-A87A-B4D5DAFDC1F4',
'F3F66BC7-2FD3-4E87-BA32-9C5DAD99BA49',
'9A51143A-B12D-416D-B0EB-3D4BC568BEC4',
'C5C2905C-A08C-4E5B-BD08-1C15580032A2'
)

select * from TuGiroApp_Lappiz_Alertas
select * from TuGiroApp_Lappiz_Giro

select * from TuGiroApp_Lappiz_DetalleAlertas where GiroFk='4D341C82-B763-4A90-A0D7-01D405E7422E'

--delete TuGiroApp_Lappiz_DetalleAlertas

select * from TuGiroApp_Lappiz_PuntosDeVenta 

delete TuGiroApp_Lappiz_PuntosDeVenta where Id='6BD36297-6A3A-4F0B-99CE-A70A0C6ACC64'

select * from TuGiroApp_Lappiz_Empleados where PuntoVentaFk ='6BD36297-6A3A-4F0B-99CE-A70A0C6ACC64'


delete  TuGiroApp_Lappiz_Empleados where Id='E4A951D3-26E2-4E66-AA0C-D0E1B7C4D21C'

select * from Lappiz_Users where EmpleadoFK ='E4A951D3-26E2-4E66-AA0C-D0E1B7C4D21C'
select * from TuGiroApp_Lappiz_Empleados where Id='E4A951D3-26E2-4E66-AA0C-D0E1B7C4D21C'

update TuGiroApp_Lappiz_Empleados


select * from 

delete TuGiroApp_Lappiz_Empleados where PuntoVentaFK='6BD36297-6A3A-4F0B-99CE-A70A0C6ACC64'


select * from TuGiroApp_Lappiz_EmpleadosDelPuntoDeVenta where EmpleadosDelPuntoDeVenta ='6BD36297-6A3A-4F0B-99CE-A70A0C6ACC64'

delete TuGiroApp_Lappiz_EmpleadosDelPuntoDeVenta where EmpleadosDelPuntoDeVenta ='6BD36297-6A3A-4F0B-99CE-A70A0C6ACC64'

select * from TuGiroApp_Lappiz_CierrePuntoVenta where PuntoVentaFK='6BD36297-6A3A-4F0B-99CE-A70A0C6ACC64'

delete TuGiroApp_Lappiz_CierrePuntoVenta where PuntoVentaFK='6BD36297-6A3A-4F0B-99CE-A70A0C6ACC64'

select * from TuGiroApp_Lappiz_Empleados where PuntoVentaFk = '6BD36297-6A3A-4F0B-99CE-A70A0C6ACC64'

delete TuGiroApp_Lappiz_Empleados where PuntoVentaFk = '6BD36297-6A3A-4F0B-99CE-A70A0C6ACC64'

--delete TuGiroApp_Lappiz_EmpleadosDelPuntoDeVenta where UsuarioFK in (
--'0C607D4E-F048-46ED-B61F-EF854E82758E',
--'0A244EE8-82B0-4AC6-91FB-EE15D1B39104',
--'001A62CC-9FBB-44AD-A526-DCC9ED08A819',
--'04FC79D1-89A9-4D42-A37E-D7766864FE05',
--'C2D05046-4EBA-49EF-AB51-D58F09823B7C',
--'9C3FC91E-06F3-45CC-BA69-D2E0CA324F3A',
--'94EAF690-18EC-4D6F-B37A-C11A53BF428C',
--'E92FB34B-5C4F-4C68-B81D-BFEDDFE678D7',
--'4D3D8793-1624-4DB3-9779-BD5843EA5D41',
--'AF4A3FAF-DE3B-433E-ABA6-BC143D95BDBE',
--'C9B5F2BF-1CFC-496A-BB3C-A59F44E8AB21',
--'0D9509AA-8343-4059-A172-9FB41EE86A78',
--'B14294DA-BEFA-4B43-A313-9C571E34A805',
--'3C49B101-F2E8-4D8A-9E3B-98754CE3B10D',
--'AF7F912E-23B4-446B-8AD6-94525CB1E6BA',
--'B4944930-4965-411A-8340-9374912188F0',
--'3A9D677A-E627-47DD-9345-8CE956C5CE5B',
--'5478E4EE-7A7B-45AF-9A95-78CDD32410DE',
--'9E079FAA-D299-4D2E-8399-7823B60CB39C',
--'3C4F56E7-CC61-43BD-8D0C-762AF211CEA2',
--'63AC6C4B-9356-420D-914D-7376527EB2AE',
--'DBA20325-B01C-4AB7-8921-65C20BC17A84',
--'BDCD0CC3-3102-4E7D-BFBC-641550115EC8',
--'DFD23B5B-7D17-4CC4-8DC2-62A69F863323',
--'DB45B37A-4FC5-424F-86B1-61FAAF225643',
--'772D8EBF-B38D-49B1-9138-593F419296CF',
--'40FD9391-2BAB-4DC9-8E1A-54E71D92D42D',
--'05090279-057B-4B0E-B33B-4D61E07B594A',
--'3EF9CE2F-6797-4791-9C51-48213604CC48',
--'3BB223B2-D918-4C10-8F26-455A28EC235E',
--'6AFC1115-11B0-4599-AA1E-3CBB58CBA7AC',
--'1972FF38-AE67-4D16-9D85-3C3DB88D4511',
--'9828BE88-3CB6-4569-ACE4-31E17C721822',
--'9D0C2B64-A4C0-4C04-AEA0-31C00F5E49BE',
--'22934B8B-80BC-4F2A-8723-3155160642F9',
--'3E62E65B-742F-44B9-9E08-1D344411CC7D',
--'CC24B37A-542A-488A-B51B-13E7749D42DF',
--'6F0BDCEA-C4BD-4863-B901-0CE94AE6DDBF',
--'5EF353FB-6C35-45FC-BCF3-0AE2FFB1CB27',
--'E364EE79-F5F5-43A2-B3A7-08EFE4416183',
--'6DB21D28-D803-4977-8F05-015ACCAD68DD'
--) 



select * from Lappiz_Users where EmpleadoFK in (
'D1D6F48F-CAF0-4C26-80DC-F68F4B276279',
'4B8091BC-E418-46F9-93BD-D6DF557F8FED',
'E4A951D3-26E2-4E66-AA0C-D0E1B7C4D21C',
'BDF59343-7163-4D35-89CA-22B491706C67'
) 

delete Lappiz_Users where Id in (
'0C607D4E-F048-46ED-B61F-EF854E82758E',
'0A244EE8-82B0-4AC6-91FB-EE15D1B39104',
'001A62CC-9FBB-44AD-A526-DCC9ED08A819',
'04FC79D1-89A9-4D42-A37E-D7766864FE05',
'C2D05046-4EBA-49EF-AB51-D58F09823B7C',
'9C3FC91E-06F3-45CC-BA69-D2E0CA324F3A',
'94EAF690-18EC-4D6F-B37A-C11A53BF428C',
'E92FB34B-5C4F-4C68-B81D-BFEDDFE678D7',
'4D3D8793-1624-4DB3-9779-BD5843EA5D41',
'AF4A3FAF-DE3B-433E-ABA6-BC143D95BDBE',
'C9B5F2BF-1CFC-496A-BB3C-A59F44E8AB21',
'0D9509AA-8343-4059-A172-9FB41EE86A78',
'B14294DA-BEFA-4B43-A313-9C571E34A805',
'3C49B101-F2E8-4D8A-9E3B-98754CE3B10D',
'AF7F912E-23B4-446B-8AD6-94525CB1E6BA',
'B4944930-4965-411A-8340-9374912188F0',
'3A9D677A-E627-47DD-9345-8CE956C5CE5B',
'5478E4EE-7A7B-45AF-9A95-78CDD32410DE',
'9E079FAA-D299-4D2E-8399-7823B60CB39C',
'3C4F56E7-CC61-43BD-8D0C-762AF211CEA2',
'63AC6C4B-9356-420D-914D-7376527EB2AE',
'DBA20325-B01C-4AB7-8921-65C20BC17A84',
'BDCD0CC3-3102-4E7D-BFBC-641550115EC8',
'DFD23B5B-7D17-4CC4-8DC2-62A69F863323',
'DB45B37A-4FC5-424F-86B1-61FAAF225643',
'772D8EBF-B38D-49B1-9138-593F419296CF',
'40FD9391-2BAB-4DC9-8E1A-54E71D92D42D',
'05090279-057B-4B0E-B33B-4D61E07B594A',
'3EF9CE2F-6797-4791-9C51-48213604CC48',
'3BB223B2-D918-4C10-8F26-455A28EC235E',
'6AFC1115-11B0-4599-AA1E-3CBB58CBA7AC',
'1972FF38-AE67-4D16-9D85-3C3DB88D4511',
'9828BE88-3CB6-4569-ACE4-31E17C721822',
'9D0C2B64-A4C0-4C04-AEA0-31C00F5E49BE',
'22934B8B-80BC-4F2A-8723-3155160642F9',
'3E62E65B-742F-44B9-9E08-1D344411CC7D',
'CC24B37A-542A-488A-B51B-13E7749D42DF',
'6F0BDCEA-C4BD-4863-B901-0CE94AE6DDBF',
'5EF353FB-6C35-45FC-BCF3-0AE2FFB1CB27',
'E364EE79-F5F5-43A2-B3A7-08EFE4416183',
'6DB21D28-D803-4977-8F05-015ACCAD68DD'
) 

delete TuGiroApp_Lappiz_Giro where OperarioFk in (
'396A5870-1FE2-4954-9EF6-B7C1DB583898',
'4603784E-3A44-4E4F-A87A-B4D5DAFDC1F4',
'9A51143A-B12D-416D-B0EB-3D4BC568BEC4',
'C5C2905C-A08C-4E5B-BD08-1C15580032A2'
)
select * from TuGiroApp_Lappiz_Giro where OperarioFk in (
'0C607D4E-F048-46ED-B61F-EF854E82758E',
'0A244EE8-82B0-4AC6-91FB-EE15D1B39104',
'001A62CC-9FBB-44AD-A526-DCC9ED08A819',
'04FC79D1-89A9-4D42-A37E-D7766864FE05',
'C2D05046-4EBA-49EF-AB51-D58F09823B7C',
'9C3FC91E-06F3-45CC-BA69-D2E0CA324F3A',
'94EAF690-18EC-4D6F-B37A-C11A53BF428C',
'E92FB34B-5C4F-4C68-B81D-BFEDDFE678D7',
'4D3D8793-1624-4DB3-9779-BD5843EA5D41',
'AF4A3FAF-DE3B-433E-ABA6-BC143D95BDBE',
'C9B5F2BF-1CFC-496A-BB3C-A59F44E8AB21',
'0D9509AA-8343-4059-A172-9FB41EE86A78',
'B14294DA-BEFA-4B43-A313-9C571E34A805',
'3C49B101-F2E8-4D8A-9E3B-98754CE3B10D',
'AF7F912E-23B4-446B-8AD6-94525CB1E6BA',
'B4944930-4965-411A-8340-9374912188F0',
'3A9D677A-E627-47DD-9345-8CE956C5CE5B',
'5478E4EE-7A7B-45AF-9A95-78CDD32410DE',
'9E079FAA-D299-4D2E-8399-7823B60CB39C',
'3C4F56E7-CC61-43BD-8D0C-762AF211CEA2',
'63AC6C4B-9356-420D-914D-7376527EB2AE',
'DBA20325-B01C-4AB7-8921-65C20BC17A84',
'BDCD0CC3-3102-4E7D-BFBC-641550115EC8',
'DFD23B5B-7D17-4CC4-8DC2-62A69F863323',
'DB45B37A-4FC5-424F-86B1-61FAAF225643',
'772D8EBF-B38D-49B1-9138-593F419296CF',
'40FD9391-2BAB-4DC9-8E1A-54E71D92D42D',
'05090279-057B-4B0E-B33B-4D61E07B594A',
'3EF9CE2F-6797-4791-9C51-48213604CC48',
'3BB223B2-D918-4C10-8F26-455A28EC235E',
'6AFC1115-11B0-4599-AA1E-3CBB58CBA7AC',
'1972FF38-AE67-4D16-9D85-3C3DB88D4511',
'9828BE88-3CB6-4569-ACE4-31E17C721822',
'9D0C2B64-A4C0-4C04-AEA0-31C00F5E49BE',
'22934B8B-80BC-4F2A-8723-3155160642F9',
'3E62E65B-742F-44B9-9E08-1D344411CC7D',
'CC24B37A-542A-488A-B51B-13E7749D42DF',
'6F0BDCEA-C4BD-4863-B901-0CE94AE6DDBF',
'5EF353FB-6C35-45FC-BCF3-0AE2FFB1CB27',
'E364EE79-F5F5-43A2-B3A7-08EFE4416183',
'6DB21D28-D803-4977-8F05-015ACCAD68DD'
) 

select NumeroIdentificacion from TuGiroApp_Lappiz_Personas where Id = '30303090'

select * from TuGiroApp_Lappiz_Personas where CENombre ='Juan'


--UPDATE tc
--SET tc.PostalCode= (
--    SELECT mc.Codigo 
--    FROM Milagros_Lappiz_Ciudad mc
--	inner join [TuGiroApp_Lappiz].dbo.TuGiroApp_Lappiz_Ciudades tc on tc.Nombre = mc.Nombre
--);

select tc.Nombre, mc.Nombre, tc.PostalCode, mc.Codigo from Milagros_Lappiz_Ciudad mc
inner join [TuGiroApp_Lappiz].dbo.TuGiroApp_Lappiz_Ciudades tc on tc.Nombre = mc.Nombre


--UPDATE
--    tc
--SET
--    tc.PostalCode = mc.Codigo    
--FROM
--    Milagros_Lappiz_Ciudad mc
--inner join [TuGiroApp_Lappiz].dbo.TuGiroApp_Lappiz_Ciudades tc on tc.Nombre = mc.Nombre


select * from TuGiroApp_Lappiz_Ciudades where PostalCode is null
select Nombre,PostalCode from TuGiroApp_Lappiz_Ciudades where Id= '2B89A54D-91D2-40F3-B48C-41D476649F4D' 

SELECT p.HuellaPersona FROM TuGiroApp_Lappiz_Giro g INNER JOIN TuGiroApp_Lappiz_Personas p ON p.Id = g.DestinatarioFk WHERE g.NumGiro = 11

select * from TuGiroApp_Lappiz_Personas where NumeroIdentificacion = '36162662'



SELECT pr.NumeroIdentificacion AS NumeroIdentificacionR, 
        pr.Direccion AS DireccionR, pr.TelfonoMovil AS TelefonoMovilR, u.FullName, 
        g.FechaCreacionComputada, pr.Correo,cpvd.Nombre AS CiudadDestino,
        pd.NumeroIdentificacion AS NumIdentDest, pd.TelfonoMovil AS TelefonoMovilD,
        pd.Correo AS CorreoDest, pvd.Nombre AS PtoVtaDestino,
        cpvo.Nombre AS CiudadOrigen 
        FROM TuGiroApp_Lappiz_Giro g 
        LEFT JOIN TuGiroApp_Lappiz_Personas pd ON pd.Id = g.DestinatarioFk
        LEFT JOIN TuGiroApp_Lappiz_Personas pr ON pr.Id = g.RemitenteFk
        LEFT JOIN TuGiroApp_Lappiz_PuntosDeVenta pvd ON pvd.Id = PuntoDeVentaDestino
        LEFT JOIN TuGiroApp_Lappiz_Ciudades cpvd ON cpvd.Id = pvd.CiudadFk
        LEFT JOIN TuGiroApp_Lappiz_PuntosDeVenta pvo ON pvo.Nombre=g.PuntodeVentaO
        LEFT JOIN TuGiroApp_Lappiz_Ciudades cpvo ON cpvo.Id = pvo.CiudadFk 
        LEFT JOIN Lappiz_Users u ON u.Id = g.OperarioFk WHERE g.NumGiro= '4'