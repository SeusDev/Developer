    create table #CalificacionJurados( 
    Titulo nvarchar(100),Concurso nvarchar(max), 
    Categoria nvarchar(max),
    Tema nvarchar(max), 
    TipoEntrada nvarchar(max), 
    IdEntrada uniqueidentifier, 
    Criterio varchar(max), 
    Promedio decimal(12,1),  
    Nombre varchar(max), 
    Apellido varchar(max), 
    Archivos varchar(max), 
    JuradoFk uniqueidentifier,
     Enlace varchar(max))
  
  insert into #CalificacionJurados 
  SELECT 
  CP.Titulo,
  C.CEConcursos'Concurso',
   CT.Nombre'Categoria',
    T.Nombre'Tema',CP.TipoEntra,
    CP.IdEntrada,
       Criterio = (
        SELECT STUFF(
          ( SELECT ', ' +(JZ.CEJuzgamientos + ': ' + CONVERT(nvarchar(50),sum(CONVERT(decimal(12,1),DCF.Nota *(JZ.Peso/100))))) 
          from Kontest_Lappiz_Calificacion CF           
  join  Kontest_Lappiz_DetalleCalificacion DCF on CF.Id = DCF.CalificacionFk           
  join Kontest_Lappiz_Juzgamiento JZ on DCF.CriterioJuzgamientoFk = JZ.Id         
  where CF.Id = CLF.Id           
  group by JZ.CEJuzgamientos          
  order by JZ.CEJuzgamientos  asc          
  FOR XML PATH ('')),
   1,2, '')
   ), 
   Promedio = (
    SELECT SUM(CONVERT(decimal(12,2), Nota *CONVERT(decimal(12,2), JZ.Peso / 100))) 
    from Kontest_Lappiz_Calificacion CF           
  join  Kontest_Lappiz_DetalleCalificacion DCF on CF.Id = DCF.CalificacionFk           
  join Kontest_Lappiz_Juzgamiento JZ on DCF.CriterioJuzgamientoFk = JZ.Id          
  where CF.Id = CLF.Id 
  ),         
  Nombre = Part.Nombre, 
  Apellidos = Part.Apellido,
  CP.NombreFoto 'Archivos', 
  DCLF.JuradoFk, 
  replace('https://drive.google.com/file/d/URL/view','URL',CP.UrlImagen) as 'URL'         
  FROM Kontest_Lappiz_CargasPorTemaPorParticipante CP          
  join Kontest_Lappiz_AsignacionJurado AJ on CP.ConcursoFk = AJ.ConcursoFk and CP.CategoriaFk = AJ.CategoriaFk          
  join Kontest_Lappiz_Ronda R on AJ.RondaConcursoFk = R.Id          
  join Kontest_Lappiz_DetalleAsignacionJurado DAJ on AJ.Id = DAJ.AsignacionJuradoFk          
  join Kontest_Lappiz_Jurados J on DAJ.JuradoFk = J.Id          
  join Kontest_Lappiz_Concurso C on CP.ConcursoFk = C.Id          
  join Kontest_Lappiz_Categoria CT on CP.CategoriaFk = CT.Id          
  left join Kontest_Lappiz_Tema T on CP.TemaFk = T.Id          
  join Kontest_Lappiz_Pago P on C.PagoFk = P.Id          
  join Kontest_Lappiz_Calificacion CLF on CP.IdEntrada = CLF.IdEntrada          
  join Kontest_Lappiz_DetalleCalificacion DCLF on CLF.Id = DCLF.CalificacionFk          
  join Kontest_Lappiz_Participante Part on CP.ParticipanteFk = Part.Id         
  WHERE  R.Tipo = 'Calificación'                                           
  and CP.TipoEntra = 'Individual' 
  and P.OrganizadorFk = 'DE756986-C47A-4606-AFBA-B0B47BD278F4'           
  and C.Id = 'BE0275CC-E5BD-44B8-BE07-810E53BAF6A2'         
  group by  CP.Titulo,C.CEConcursos,CT.Nombre,T.Nombre,CP.TipoEntra,CP.IdEntrada,Part.Nombre,Part.Apellido,CP.NombreFoto,CP.NombreFoto,DCLF.JuradoFk,CLF.Id,CP.UrlImagen
  UNION ALL
  SELECT CP.Titulo,
   C.CEConcursos'Concurso',
    CT.Nombre'Categoria', 
    T.Nombre'Tema', 
    CP.TipoEntra,
    CP.IdEntrada, 
    Criterio = (
      SELECT STUFF(
        ( SELECT ', ' +(JZ.CEJuzgamientos + ': ' + CONVERT(nvarchar(50),sum(CONVERT(decimal(12,1),DCF.Nota *(JZ.Peso/100)))))           
  from Kontest_Lappiz_Calificacion CF            
  join  Kontest_Lappiz_DetalleCalificacion DCF on CF.Id = DCF.CalificacionFk            
  join Kontest_Lappiz_Juzgamiento JZ on DCF.CriterioJuzgamientoFk = JZ.Id           
  where CF.Id = CLF.Id            
  group by JZ.CEJuzgamientos           
  order by JZ.CEJuzgamientos  asc           
  FOR XML PATH ('')),
   1,2, '')), 
   Promedio = (
    SELECT SUM(CONVERT(decimal(12,2), Nota *CONVERT(decimal(12,2), JZ.Peso / 100)))          
    from Kontest_Lappiz_Calificacion CF           
    join  Kontest_Lappiz_DetalleCalificacion DCF on CF.Id = DCF.CalificacionFk           
    join Kontest_Lappiz_Juzgamiento JZ on DCF.CriterioJuzgamientoFk = JZ.Id          
    where CF.Id = CLF.Id ),Nombre = Part.Nombre, Apellidos = Part.Apellido, 
    Archivos = (
    SELECT STUFF(
      ( SELECT ',   ' + NombreFoto from Kontest_Lappiz_CargasPorTemaPorParticipante CP                                     
       where IdEntrada = (select IdEntrada from Kontest_Lappiz_Calificacion where Id = CLF.Id)                                      
  FOR XML PATH ('')), 
  1,2, '')
  ), 
  DCLF.JuradoFk,
  replace('https://drive.google.com/file/d/URL/view','URL',CP.UrlImagen) as 'URL'                              
  FROM Kontest_Lappiz_CargasPorTemaPorParticipante CP                                  
  join Kontest_Lappiz_AsignacionJurado AJ on CP.ConcursoFk = AJ.ConcursoFk and CP.CategoriaFk = AJ.CategoriaFk                                  
  join Kontest_Lappiz_Ronda R on AJ.RondaConcursoFk = R.Id                                  
  join Kontest_Lappiz_DetalleAsignacionJurado DAJ on AJ.Id = DAJ.AsignacionJuradoFk                                  
  join Kontest_Lappiz_Jurados J on DAJ.JuradoFk = J.Id                                  
  join Kontest_Lappiz_Concurso C on CP.ConcursoFk = C.Id                                  
  join Kontest_Lappiz_Categoria CT on CP.CategoriaFk = CT.Id                                  
  left join Kontest_Lappiz_Tema T on CP.TemaFk = T.Id                                  
  join Kontest_Lappiz_Pago P on C.PagoFk = P.Id                                  
  join Kontest_Lappiz_Calificacion CLF on CP.IdEntrada = CLF.IdEntrada          
  join Kontest_Lappiz_DetalleCalificacion DCLF on CLF.Id = DCLF.CalificacionFk                                  
  join Kontest_Lappiz_Participante Part on CP.ParticipanteFk = Part.Id                              
  WHERE  R.Tipo = 'Calificación' and CP.TipoEntra = 'Serie' 
  and P.OrganizadorFk = 'DE756986-C47A-4606-AFBA-B0B47BD278F4'
  and C.Id ='BE0275CC-E5BD-44B8-BE07-810E53BAF6A2'                              
  group by  Cp.Titulo,C.CEConcursos,CT.Nombre,T.Nombre,CP.TipoEntra,Cp.IdEntrada,Part.Nombre,Part.Apellido,CLF.Id,DCLF.JuradoFk,CP.UrlImagen                              
  order by Categoria,Tema                              
  select  Titulo,Categoria,Tema,TipoEntrada,Criterio,CONVERT(decimal(12,2),(Promedio/COUNT(JuradoFk)))as Promedio, Nombre, Apellido, Archivos,Enlace  
  from #CalificacionJurados                               
  where Criterio is not null             
  group by Titulo,Categoria,Tema,TipoEntrada,Promedio, Criterio, Nombre, Apellido, Archivos,Enlace                               
  order by Categoria,Tema                              
  drop table #CalificacionJurados
  