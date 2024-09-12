use PGN_Lappiz


select * from PGN_Lappiz_DetalleSolicitudPersona order by Created_date desc

delete PGN_Lappiz_DetalleSolicitudPersona where
Id='12CEB879-AFC3-4243-B016-793CCAD7F0A5' 


insert into PGN_Lappiz_DetalleSolicitudPersona (Id,TipoPersonaFK,TipoInterviniente,TipoIdentificacion,NumeroIdentificacion,Nombre,PrimerNombreIDF,SegundoNombreIDF,PrimerApellidoIDF,SegundoApellidoIDF,Alias,Correo,Correo1,Correo2)

values(NEWID(),'079747EC-BCBB-4DF0-9D4F-73DDC3ACDC91','1D2B5193-5A8C-4B4F-81A0-0B858E43F47D','E2C3D77A-91E2-465C-851F-D3BA06970C9C','1037605487','SebasG','Juan','Sebastian','Henao','Estrada','Prueba','Correo1','Correo2','Correo3')








INSERT INTO PGN_Lappiz_DetalleSolicitudPersona (Id,TipoPersonaFK,TipoIdentificacion,NumeroIdentificacion,PrimerNombreIDF,PrimerApellidoIDF,SegundoNombreIDF,SegundoApellidoIDF,Alias,Correo,Correo1,correo2,TipoInterviniente,Nombregrupo,Estado,Created_by,Created_date,Edited_date,Edited_by,EventType,IpAddress,RowStatus) 
VALUES ('d13c642e-8b63-4a78-9d09-930ce773a764','14CCA8BD-CD4C-4CC0-AC62-A03C6735760F','undefined','null','undefined','undefined','undefined','undefined','null','sebas@gmail.com','undefined','undefined','undefined','sebas','Activo','6394355d-809d-49fa-8f3c-4f49f6dbf7ce','Tue Aug 16 2022 14:19:41 GMT-0500 (hora estándar de Colombia)Z','Tue Aug 16 2022 14:19:41 GMT-0500 (hora estándar de Colombia)Z','6394355d-809d-49fa-8f3c-4f49f6dbf7ce','Insertar','135.181.185.211','Active')


INSERT INTO PGN_Lappiz_Ubicacion (Id,CEDireccion,Created_by,Created_date,DetallePersonaSolicitud,Edited_by,Edited_date,EstadoUbicacion,EstructuraUbicacion,EventType,Extension,IdDepartamentoFK,IdMunicipioFK,IdPaisFK,IdTipoUbicacion,IpAddress,NumeroONombreVia,NumeroPlaca,NumeroViaUbicacion,PersonasFK,PrefijoOCuadranteUbicacion,PrefijoOCuadranteVia,RowStatus,TelefonoFijo,TelefonoMovil,TipoVia,UserEmail) 

VALUES (NEWID(),'d13c642e-8b63-4a78-9d09-930ce773a764','undefined','6394355d-809d-49fa-8f3c-4f49f6dbf7ce','Tue Aug 16 2022 14:19:41 GMT-0500 (hora estándar de Colombia)Z','undefined','6394355d-809d-49fa-8f3c-4f49f6dbf7ce','Tue Aug 16 2022 14:19:41 GMT-0500 (hora estándar de Colombia)Z','undefined','undefined','Insertar','undefined','undefined','undefined','undefined','undefined','135.181.185.211','undefined','undefined','undefined','undefined','undefined','undefined','Active','undefined','undefined


"INSERT INTO PGN_Lappiz_DetalleSolicitudPersona (Id,TipoPersonaFK,TipoIdentificacion,NumeroIdentificacion,PrimerNombreIDF,PrimerApellidoIDF,SegundoNombreIDF,SegundoApellidoIDF,Alias,Correo,Correo1,correo2,TipoInterviniente,Nombregrupo,Estado,Created_by,Created_date,Edited_date,Edited_by,EventType,IpAddress,RowStatus) VALUES ('670af386-c390-4519-a62a-e9c874ad09a4','14CCA8BD-CD4C-4CC0-AC62-A03C6735760F','undefined','null','undefined','undefined','undefined','undefined','null','sebas@gmail.com','undefined','undefined','undefined','sebas','Activo','6394355d-809d-49fa-8f3c-4f49f6dbf7ce','Tue Aug 16 2022 14:54:26 GMT-0500 (hora estándar de Colombia)Z','Tue Aug 16 2022 14:54:26 GMT-0500 (hora estándar de Colombia)Z','6394355d-809d-49fa-8f3c-4f49f6dbf7ce','Insertar','135.181.185.211','Active')}'),

INSERT INTO PGN_Lappiz_Ubicacion (Id,CEDireccion,Created_by,Created_date,DetallePersonaSolicitud,Edited_by,Edited_date,EstadoUbicacion,EstructuraUbicacion,EventType,Extension,IdDepartamentoFK,IdMunicipioFK,IdPaisFK,IdTipoUbicacion,IpAddress,NumeroONombreVia,NumeroPlaca,NumeroViaUbicacion,PersonasFK,PrefijoOCuadranteUbicacion,PrefijoOCuadranteVia,RowStatus,TelefonoFijo,TelefonoMovil,TipoVia,UserEmail) VALUES (NEWID(),'670af386-c390-4519-a62a-e9c874ad09a4','undefined','6394355d-809d-49fa-8f3c-4f49f6dbf7ce','Tue Aug 16 2022 14:54:26 GMT-0500 (hora estándar de Colombia)Z','undefined','6394355d-809d-49fa-8f3c-4f49f6dbf7ce','Tue Aug 16 2022 14:54:26 GMT-0500 (hora estándar de Colombia)Z','undefined','undefined','Insertar','undefined','undefined','undefined','undefined','undefined','135.181.185.211','undefined','undefined','undefined','undefined','undefined','undefined','Active','undefined','undefined','undefined','undefined')}'),"