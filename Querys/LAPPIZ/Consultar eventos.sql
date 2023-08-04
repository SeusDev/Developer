SELECT Aplicaciones.Codigo, Entities.Code, FormsEvents.Description
FROM FormsEvents
JOIN Entities ON Entities.TablaId = FormsEvents.EntityId
JOIN Aplicaciones ON Aplicaciones.AplicacionId = Entities.AplicacionId
WHERE FormsEvents.Implementation LIKE  '%GridConteoCiclico%'
ORDER BY Aplicaciones.Codigo, Entities.Code