use LappizV2Prod
use Skandias_Lappiz

SELECT object_name(id),rowcnt
FROM sys.sysindexes
WHERE indid=1
ORDER BY 1

select * from Lappiz_HistoryLogs
select * from Skandias_Lappiz_EncuestasDeSalud

select * from AspNetUsers where EmpresaId ='d2402522-5f20-4995-aa0e-2e1c8543df8b'

SELECT * from Empresas where RazonSocial like '%skandia%'

select * from Aplicaciones where Codigo like '%skandia%'
 
select * from Entities where AplicacionId ='30042d5a-040b-4a9f-bf81-0db631987230'


select * from Lappiz_Users


select * from AppViews where EntityId in (
'7f36f743-ff41-4582-911a-0085fd5eba0f',
'950c333f-d668-405d-9376-04b35aab2689',
'58a863e7-5680-468a-8ee2-06ca3c3cb096',
'f19c6be5-6e2a-4a9b-aaed-08d47dcb1fcb',
'73833475-a400-4845-b466-0a961d61f199',
'5a1a9a69-7ea2-4f9b-82a2-0e9944c34a7a',
'dc89bad0-5a57-42b1-a446-259ba32fee50',
'37c76777-3e14-4bd7-bbbd-294378e7622f',
'8a569509-4259-45f6-8d3a-3c0b85b312d3',
'88640376-9b71-4ad1-927e-40fd09ac31c8',
'b46c08cb-43e6-4efc-90fb-413ec08f767a',
'455586b2-4a14-41fc-814d-4a2d4673ba9d',
'98d25e73-8dbb-4d69-afe6-4b4c7e9a6db7',
'38eb5600-1b9d-48f4-b915-5ee729011a83',
'16ec654d-898e-4cc6-b66c-7312fef9a303',
'f5f28e62-0a21-4f1a-98c5-79f70c038cc5',
'4a5ae973-026a-4a6d-86b3-7e84c3eefc94',
'8209f36e-ab98-4040-86f0-89233f8fc7a8',
'47981612-3721-48ac-99eb-9367114a6127',
'ea29bdda-6a69-41a8-8f84-9b70e616a074',
'1837152d-b1db-48e8-911b-9b7413e80353',
'07deb5de-704b-4eee-984b-a47788412b1c',
'55b6ad15-79fa-49f7-a103-a96a2d06b392',
'7dd406b8-0262-4dfd-9e99-b0b4e0066b77',
'2edb952c-f12a-484c-80cb-b4e2e567a7dc',
'e9f31bdc-b18a-4931-85ce-bb0ebc5b7e4c',
'e68ce7cc-ed05-45d8-8442-d875867d94db',
'7b707d1d-6ea8-4863-8aef-e252acabfb37',
'8e709db9-e8a3-486b-aab5-e82ae564c366',
'e8aca83d-16b2-4ad0-9a63-f37d173173b8',
'626203cc-d156-44e3-a1a8-fbce36dae80b',
'6aaf9739-a4ae-4e06-961e-fdcd9bfd478d'
)



select * from empresas
where EmpresaId ='d2402522-5f20-4995-aa0e-2e1c8543df8b'

/* update empresas 
Set FechaFinPlan ='2022-12-31 09:29:40.410'
where EmpresaId ='d2402522-5f20-4995-aa0e-2e1c8543df8b' */


select * from AspNetUsers where EmpresaId ='d2402522-5f20-4995-aa0e-2e1c8543df8b'


/* update AspNetUsers
set  Activo='0'
Where  EmpresaId ='d2402522-5f20-4995-aa0e-2e1c8543df8b'  and Email != 'Admin@skandia.com' */

select * from Lappiz_Users where Email != 'Admin@skandia.com'
select * from Lappiz_Users where Email='Admin@skandia.com'

/* update Lappiz_Users 
set Activo ='0'
where Email != 'Admin@skandia.com'
 */


