if (window.location.href.includes('appViewId=310e10b3-2801-42e8-b673-0badb74374c2')) {

        setTimeout(() => {        
          //Configuración fecha remision

      let FechaRadicacion = sessionStorage.fechaRadicacion

      // Restricción a las fechas mayores a la actual:
      $('#d35c84b8-4a28-4d54-acc0-bf7446e761b3').dxDateBox('instance').option('max', new Date() + 1);

      // Restricción a las fechas menores a la de radicación:
      if(FechaRadicacion.length > 10){

          let Fecha = new Date(FechaRadicacion);

          let newFecha = Fecha.setDate(Fecha.getDate() + 1);

          let FechaRemi = new Date (newFecha).toISOString().split('T')[0].replaceAll('-',','); 

          $('#d35c84b8-4a28-4d54-acc0-bf7446e761b3').dxDateBox('instance').option('min', new Date(FechaRemi));

      } else{

          let Fecha = new Date(FechaRadicacion);
          let newFecha = Fecha.setDate(Fecha.getDate() + 1);
          let FechaRemi = new Date(newFecha).toISOString().split('T')[0].replaceAll('-',',');       

          $('#d35c84b8-4a28-4d54-acc0-bf7446e761b3').dxDateBox('instance').option('min', new Date(FechaRemi));

      }  

    }, 200);  
    }