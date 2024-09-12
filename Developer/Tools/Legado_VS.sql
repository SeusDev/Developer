--Buscar Persona
DECLARE @Cedula varchar(max) ='4551723'
select p.Identificacion, p.Codigo, p.NombreCompleto
from Persona p
where p. Identificacion = @Cedula

--delete from persona where Codigo= 9183227


Select NombreCompletoValido,IdentificacionCliente,*
from SisteDesktop.PersonaAdicion a  WITH(nolock)
where IdentificacionCliente ='4551723' and a.PersonaCodigo= 9183227

-- delete from SisteDesktop.PersonaAdicion where personaCodigo=9183227

DECLARE @Nombre VARCHAR(MAX)='Luzmila chaverra'
SELECT p.Codigo,* 
FROM Persona p WITH (nolock)
WHERE CHARINDEX(@Nombre, p.NombreCompleto) > 0;



