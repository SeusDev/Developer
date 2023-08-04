var url = location.href;
 var urlSplit = url.split('appViewId=')
 var idVista = urlSplit[1]

 if (idVista == '8282da4b-4842-436c-af8d-224874fe3e21') {
  setTimeout(() => {
     
var TipoInventario = getFieldValue('9111ff62-254f-4030-9bd8-d6adccb2226e');
     
         if(TipoInventario=="Por producto"){
         $('#SectionsFields > div')[3].hidden = true;//Clasificación ubicación
         $('#Ubicación')[0].hidden = true;
           
         }else if(TipoInventario=="Por ubicación"){
         $('#SectionsFields > div')[2].hidden = true;//Clasificación ubicación
         $('#Productos')[0].hidden = true;              
         }
     }, 1000);
}