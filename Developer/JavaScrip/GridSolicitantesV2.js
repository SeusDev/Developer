/* GridSolicitantesAnterior*/
if (  window.location.href.includes("7d32941b-c3dc-4f90-80d3-0c1176322edf")) {

  setTimeout(function () {
    delete sessionStorage.sw;
    delete sessionStorage.switchPersona;
    delete sessionStorage.dataSolicitantes;

    //? ocultar DETALLE DE INFORMACIÓN DE UBICACIONES
    $(`.form-section-title:contains(3.Detalle de información de ubicaciones)`).parent().parent().hide();

    //? ocultar sesion
    $(`.form-section-title:contains(2.Datos de la persona)`).parent().parent().hide();
    // ocultar boton de Buscar
    $("#Buscar").hide();

    $('#AgregarJuridica').hide() 

    //ocultar boton nuevogrupo
    $("#Nuevogrupo").hide();

    //ocultar boton Agregar
    $("#Consultar").hide();

    // ocultar boton agregarGrupo
    $("#AgregarGrupo").hide();

    // ocultar boton AgregarNatural
    $("#AgregarNatural").hide();

    // ocultar nombre grupo
    visibilityField("fee9ac16-2662-4a5d-b689-819e24345dbf", false);

    // ocultar razon social
    visibilityField("1f48142c-d40f-41aa-8821-6da2113459ea", false);

    // ocultar tipo documento
    visibilityField("ba221603-80f6-43eb-b611-97097646abe2", false);

    // required Tipo solicitante
    var campoId = "ae89d269-3a0a-421b-a4dd-1241c44d2a3d";
    requireField(campoId, false);

     // required Tipo persona
    var campoId1 = "9036bc3c-d2ee-4196-8abc-3593999409aa";
    requireField(campoId1, true);

 

    // ? Boton buscar
    $("#Buscar").click(function () {
      debugger;

      $("#ContendorGrid").html("");
      $("#ContendorGrid").append(' <div id="GridCi"></div>');

      var Nombregrupo = $("#fee9ac16-2662-4a5d-b689-819e24345dbf").val();
      var Razonsocial = $("#1f48142c-d40f-41aa-8821-6da2113459ea").val();
      var Tipo = $("#9036bc3c-d2ee-4196-8abc-3593999409aa").data("kendoDropDownList").value();
      var TipoInterviniente = 

      if(TipoInterviniente != '' && (Nombregrupo != null && Nombregrupo != undefined && Nombregrupo != '') || (Razonsocial != null && Razonsocial != undefined && Razonsocial != '')){
          var query='';
          if ($("#fee9ac16-2662-4a5d-b689-819e24345dbf").val() == Nombregrupo ) {

            // Consulta para grupo
            query = `select isnull (p.Nombre,'') [Nombre],
            isnull (ti.cedescripcin,'')[Tipodocumento],
            p.NumeroIdentificacion [Identficacion],
            format (P.edited_date,'dd-mm-yyyy') [Actualizacion],
            P.estado[Estado],
            mp.cedescripcin[Tipopersona]
            from PGN_Lappiz_Personas P
            full join pgn_lappiz_maestrotipopersona mp on p.TipoPersonaFK = mp. Id
            full join pgn_lappiz_maestrotipoidentificacion ti on P.TipoIdentificacionFK = ti.Id
            where p.Nombre like'%${Nombregrupo}%' and mp.Id='${Tipo}'`;
            
          }else{
            
            // consulta razon social   
            query = `select isnull (p.Nombre,'') [Nombre],
            isnull (ti.cedescripcin,'')[Tipodocumento],
            p.NumeroIdentificacion [Identficacion],
            format (P.edited_date,'dd-mm-yyyy') [Actualizacion],
            P.estado[Estado],
            mp.cedescripcin[Tipopersona]
            from PGN_Lappiz_Personas P
            full join pgn_lappiz_maestrotipopersona mp on p.TipoPersonaFK = mp. Id
            full join pgn_lappiz_maestrotipoidentificacion ti on P.TipoIdentificacionFK = ti.Id
            where p.NumeroIdentificacion like'%${Razonsocial}%' and mp.Id='${Tipo}'`;

          }
          var data = ajaxQuery(query);
          if (data.length > 0) {
            debugger;
            data.TipoIntervinientes = sessionStorage.Tipointerviente;
            data.Tipodocumento= sessionStorage.TipoDocumento;

            $("#GridCi").kendoGrid({
              dataSource: {
                data: data,
                autoSync: true,
                schema: {
                  model: {
                    fields: {
                      Id: { type: "string", editable: false},
                      Nombre: { type: "string", editable: false },
                      Identficacion: { type: "string", editable: false },
                      Tipodocumento: { type: "string", editable: false },
                      Actualizacion: { type: "string", editable: false },
                      Estado: { type: "string", editable: false },
                      TipoInterviniente : { type: "string", editable: false },
                    },
                  },
                },
                sort: [{ field: "Reserva", dir: "asc" }],
              },
              height: 450,
              scrollable: true,
              sortable: true,
              filterable: true,
              resizable: true,
              change: onChange,
              pageable: {
                pageable: true,
                previousNext: false,
                pageSize: 10,
                alwaysVisible: true,
                numeric: true,
                buttonCount: 5,
              },
              dataBound: function () {
                for (var i = 0; i < this.columns.length; i++) {
                  this.autoFitColumn(i);
                }
              },
    
              columns: [
                { selectable: true, width: "50px" },
                { field: "Nombre", title: "Nombre" },
                { field: "Identficacion", title: "identficación" },
                { field: "Tipodocumento", title: "Tipodocumento" },
                { field: "Actualizacion", title: "Actualizacion" },
                { field: "Estado", title: "Estado" },
              ],
              editable: true,
            });
            setFieldValue('ae89d269-3a0a-421b-a4dd-1241c44d2a3d','')
          }
          
      }else{
        toastr.warning('Agrege el item a buscar y seleccione tipo de interviniente','Atención');
      }
    });

    // ? Boton Agregar
    var isNew = true;
    $("#Consultar").click(function () {
        debugger;
        if(isNew){
            $("#ContendorGrid").html("");
            $("#ContendorGrid").append(' <div id="GridCi"></div>');
        }
    
        var Tipodocumento = $("#ba221603-80f6-43eb-b611-97097646abe2").data("kendoDropDownList").value();
        var NumeroIdentificacion = $("#ddbc36a7-f9b7-4d91-872d-1db43e79cea2").val();
        var TipoInterviniente = $('#ae89d269-3a0a-421b-a4dd-1241c44d2a3d').data('kendoDropDownList').value()
        if(NumeroIdentificacion != undefined && NumeroIdentificacion != null    && NumeroIdentificacion != '' ){
          if (TipoInterviniente  != '' ){            // consulta para natural
            var query = `select isnull (p.Nombre,'') [Nombre],
            isnull (ti.cedescripcin,'')[Tipodocumento],
            p.NumeroIdentificacion [Identficacion],
            format (P.edited_date,'dd-mm-yyyy') [Actualizacion],
            P.estado[Estado],
            mp.cedescripcin[Tipopersona]
            from PGN_Lappiz_Personas P
            full join pgn_lappiz_maestrotipopersona mp on p.TipoPersonaFK = mp. Id
            full join pgn_lappiz_maestrotipoidentificacion ti on P.TipoIdentificacionFK = ti.Id
            where P.NumeroIdentificacion like'%${NumeroIdentificacion}%' and ti.Id='${Tipodocumento}'and P.RowStatus='Active'`;
    
            var data = ajaxQuery(query);
            if (data.length > 0) {
              data.TipoIntervinientes = sessionStorage.Tipointerviente;
              data.Tipodocumento= sessionStorage.TipoDocumento;
                if(isNew){
                    $("#GridCi").kendoGrid({
                        dataSource: {
                        autoSync: true,
                        schema: {
                            model: {
                            fields: {
                                Id: { type: "string", editable: false},
                                PrimerNombreIDF:{ type: "string", editable: false },
                                SegundoNombreIDF:{ type: "string", editable: false },
                                PrimerApellidoIDF:{ type: "string", editable: false },
                                SegundoApellidoIDF:{ type: "string", editable: false },
                                Alias:{ type: "string", editable: false},
                                Correo1: { type: "string", editable: false },
                                Correo2: { type: "string", editable: false },
                                Nombre: { type: "string", editable: false },
                                Identficacion: { type: "string", editable: false },
                                Tipodocumento: { type: "string", editable: false },
                                Actualizacion: { type: "string", editable: false },
                                Estado: { type: "string", editable: false },
                                Origen: {type: "string", editable: false},
                                TipoInterviniente: { type: "string", editable: false },
                            },
                            },
                        },
                        sort: [{ field: "Reserva", dir: "asc" }],
                        },
                        height: 450,
                        scrollable: true,
                        sortable: true,
                        filterable: true,
                        resizable: true,
                        change: onChange,
                        pageable: {
                        pageable: true,
                        previousNext: false,
                        pageSize: 10,
                        alwaysVisible: true,
                        numeric: true,
                        buttonCount: 5,
                        },
                        dataBound: function () {
                        for (var i = 0; i < this.columns.length; i++) {
                            this.autoFitColumn(i);
                        }
                        },
            
                        columns: [
                        { selectable: true, width: "50px" },
                        { field: "Nombre", title: "Nombre" },
                        { field: "Identficacion", title: "identficación" },
                        { field: "Tipodocumento", title: "Tipodocumento" },
                        { field: "Actualizacion", title: "Actualizacion" },
                        { field: "Estado", title: "Estado" },
                        ],
                        editable: true,
                    });
                    isNew = !isNew;
                }            
                let grid = $("#GridCi").data("kendoGrid");
                data.forEach(element => {
                    grid.dataSource.add(element);
                });
                
            setFieldValue('ae89d269-3a0a-421b-a4dd-1241c44d2a3d','')
            
            }
          }else
          toastr.warning('Primero seleccione el tipo de interviente', 'Atención');
        }else{
            toastr.warning('Primero diligencie una cedula para la busqueda', 'Atención');
        }

    });

    $("#AgregarNatural").click(function () {
        debugger;
        if ($('#ae89d269-3a0a-421b-a4dd-1241c44d2a3d').data('kendoDropDownList').value() != '') {
          
          let nombre = $("#d2d08720-8857-4ce3-87d2-5a8e1e80800a").val();
        let apellido = $("#45d8b3f2-ce40-424e-aeef-ef1ec3bc7fa1").val();
        let identificacion = $("#ddbc36a7-f9b7-4d91-872d-1db43e79cea2").val();
        let tipoDocumento = $("#ba221603-80f6-43eb-b611-97097646abe2").data("kendoDropDownList").text();
        var TipoInterviniente = $('#ae89d269-3a0a-421b-a4dd-1241c44d2a3d').data('kendoDropDownList').value()
        let actuacion = formatDate(new Date())
        let estado = "Activo";
        if (TipoInterviniente  != '') {
          if(isNew){
            $("#GridCi").kendoGrid({
              dataSource: {
                autoSync: true,
                schema: {
                  model: {
                    fields: {
                      PrimerNombre:{ type: "string", editable: false },
                      SegundoNombre:{ type: "string", editable: false },
                      PrimerApellido:{ type: "string", editable: false },
                      SegundoApellido:{ type: "string", editable: false },
                      Alias:{ type: "string", editable: false},
                      Correo1:{ type: "string", editable: false },
                      Correo2:{ type: "string", editable: false },
                      Nombre: { type: "string", editable: false },
                      Identficacion: { type: "string", editable: false },
                      Tipodocumento: { type: "string", editable: false },
                      Actualizacion: { type: "string", editable: false },
                      Estado: { type: "string", editable: false },
                      Origen: {type: "string", editable: false},
                      TipoInterviniente: { type: "string", editable: false },
                    },
                  },
                },
                sort: [{ field: "Reserva", dir: "asc" }],
              },
              height: 450,
              scrollable: true,
              sortable: true,
              filterable: true,
              resizable: true,
              change: onChange,
              pageable: {
                pageable: true,
                previousNext: false,
                pageSize: 10,
                alwaysVisible: true,
                numeric: true,
                buttonCount: 5,
              },
              dataBound: function () {
                for (var i = 0; i < this.columns.length; i++) {
                  this.autoFitColumn(i);
                }
              },
      
              columns: [
                { selectable: true, width: "50px" },
                { field: "Nombre", title: "Nombre" },
                { field: "Identficacion", title: "identficación" },
                { field: "Tipodocumento", title: "Tipodocumento" },
                { field: "Actualizacion", title: "Actualizacion" },
                { field: "Estado", title: "Estado" },
              ],
              editable: true,
            });
            isNew = !isNew;
        }
        let grid = $("#GridCi").data("kendoGrid");
  
        let newRow = {
          PrimerNombre: $('#d2d08720-8857-4ce3-87d2-5a8e1e80800a').val(),
          SegundoNombre : $('#ea7f38c8-2c6d-4de9-a37a-01290fb4d133').val(),
          PrimerApellido : $('#45d8b3f2-ce40-424e-aeef-ef1ec3bc7fa1').val(),
          SegundoApellido : $('#09c899d9-6e9c-4f0d-ae82-5cf947f1035b').val(),
          Alias : $('#17e8031b-7031-487f-a2ca-d0e6d509ad12').val(),
          Correo1 : $('#48116dc0-f2cc-47db-b643-b4806a1127c7').val(),
          Correo2 : $('#89645a5a-2ab2-49ad-a170-79f34a3555cd').val(),
          Nombre: `${nombre} ${apellido}`,
          Identficacion: identificacion,
          Tipodocumento: tipoDocumento,
          Actualizacion: actuacion,
          Estado: estado,
          Origen: 'new',
          TipoInterviniente :sessionStorage.Tipointerviente
        };
        
        grid.dataSource.add(newRow);

        
        setFieldValue('ae89d269-3a0a-421b-a4dd-1241c44d2a3d','')
        }else
        toastr.warning('Primero seleccione el tipo de interviente')
        }else
          toastr.info('Seleccionar tipo de interviente');
      });

    // ? Boton Nuevogrupo
    $("#Nuevogrupo").click(function () {
        
    $("#ContendorGrid").html("");
    $("#ContendorGrid").append(' <div id="GridCi"></div>');
    
      // ? msotrar DETALLE DE INFORMACIÓN DE UBICACIONES
      sessionStorage.switchPersona = true;
      $(`.form-section-title:contains(3.Detalle de información de ubicaciones)`).parent().parent().show();

      //? ocultar sesion
      $(`.form-section-title:contains(2.Datos de la persona)`).parent().parent().show();

      // ? ocultar boton de Nuevogrupo
      $("#Nuevogrupo").hide();

      // ? ocultar boton de Buscar
      $("#Buscar").hide();

     
      $("#GridCi").show();

      //? Mostrar boton
      $("#AgregarGrupo").show();

      $("#Consultar").hide();

      $('#AgregarJuridica').hide() 

      debugger;

      // ! Mostrar campo nombre
      visibilityField("a784aaa5-07e9-4d5e-b816-4c8deef3314c", true);

      // ! Mostrar Correo
      visibilityField("dd5309bd-babf-4aa7-8044-d3f973bf61eb", true);

      // ! ocultar campo nombre grupo
      visibilityField("fee9ac16-2662-4a5d-b689-819e24345dbf", false);

      // ! ocultar  Numero de identificacion
      visibilityField("ddbc36a7-f9b7-4d91-872d-1db43e79cea2", false);

      // ! ocultar Primer nombre
      visibilityField("d2d08720-8857-4ce3-87d2-5a8e1e80800a", false);

      // ! ocultar Segundo Nombre
      visibilityField("ea7f38c8-2c6d-4de9-a37a-01290fb4d133", false);

      // ! ocultar Primer apellido
      visibilityField("45d8b3f2-ce40-424e-aeef-ef1ec3bc7fa1", false);

      // ! ocultar Segundo apellido
      visibilityField("09c899d9-6e9c-4f0d-ae82-5cf947f1035b", false);

      // ! ocultar Alias
      visibilityField("17e8031b-7031-487f-a2ca-d0e6d509ad12", false);

      // ! ocultar Correo electrónico1
      visibilityField("48116dc0-f2cc-47db-b643-b4806a1127c7", false);

      // ! ocultar Correo electrónico2
      visibilityField("89645a5a-2ab2-49ad-a170-79f34a3555cd", false);

      // ! deshabilitar tipo de la persona
      disableField("9036bc3c-d2ee-4196-8abc-3593999409aa", true);

      // !Cargar valor  por defecto el grupo
      var nombre = "fee9ac16-2662-4a5d-b689-819e24345dbf";
      if ($("#fee9ac16-2662-4a5d-b689-819e24345dbf").data("KendoDropDrownList").value() != nombre) {
        setFieldValue("fee9ac16-2662-4a5d-b689-819e24345dbf", nombre);
        $("#Nuevogrupo").click();
      }

      sessionStorage.sw = true;
    });

    var isNew2 = true;
$("#AgregarGrupo").click(function () {
    debugger;

    let nombre = $("#a784aaa5-07e9-4d5e-b816-4c8deef3314c").val();
    let Correo = $("#dd5309bd-babf-4aa7-8044-d3f973bf61eb").val();
    let Direcciones = JSON.stringify($('#bb0bed1f-dded-4706-a219-0bf3a8718ed8').data('kendoGrid').dataSource.data());
    var TipoInterviniente = $('#ae89d269-3a0a-421b-a4dd-1241c44d2a3d').data('kendoDropDownList').value()
    let Actualizacion = formatDate(new Date())
    $('#bb0bed1f-dded-4706-a219-0bf3a8718ed8').data('kendoGrid').dataSource.data([]);
    $("#89f8a03c-6a10-4dc8-b478-45703d9db181").val('');
    $("#617e9421-7c3c-4406-8fac-0d1eab8145b3").val('')
    if (TipoInterviniente  != '' ) {
      if(Correo.includes('@') && Correo.includes('.')  && nombre != undefined && nombre != null && nombre != '' ){
        if(isNew2){
            $("#GridCi").kendoGrid({
                dataSource: {
                  autoSync: true,
                  schema: {
                    model: {
                      fields: {
                        Direcciones: { type: "string", editable: false},
                        Nombre: { type: "string", editable: false },
                        Correo: { type: "string", editable: false },
                        Actualizacion: { type: "string", editable: false },
                        TipoInterviniente: { type: "string", editable: false },
                      },
                    },
                  },
                  sort: [{ field: "Reserva", dir: "asc" }],
                },
                height: 450,
                scrollable: true,
                sortable: true,
                filterable: true,
                resizable: true,
                change: onChange,
                pageable: {
                  pageable: true,
                  previousNext: false,
                  pageSize: 10,
                  alwaysVisible: true,
                  numeric: true,
                  buttonCount: 5,
                },
                dataBound: function () {
                  for (var i = 0; i < this.columns.length; i++) {
                    this.autoFitColumn(i);
                  }
                },
        
                columns: [
                  { selectable: true, width: "50px" },
                  { field: "Nombre", title: "Nombre" },
                  { field: "Correo", title: "Correo" },
                ],
                editable: true,
            });
            isNew2 = !isNew2;
        }
      
      let grid = $("#GridCi").data("kendoGrid");
      let newRow = { Nombre: nombre, Correo: Correo, Direcciones: Direcciones, Actualizacion: Actualizacion,TipoInterviniente: sessionStorage.Tipointerviente};

      grid.dataSource.add(newRow);
   
      setFieldValue('ae89d269-3a0a-421b-a4dd-1241c44d2a3d','')

  }else{
    toastr.warning('Llene los datos correctamente','Atención')
  }
    }else{
      toastr.warning('Seleccione el tipo de interviniente');
    }
   

  });
    
    $("#AgregarJuridica").click(function () {
        debugger;
  
        let razon = $("#1f48142c-d40f-41aa-8821-6da2113459ea").val();
         
        $("#GridCi").kendoGrid({
          dataSource: {
            autoSync: true,
            schema: {
              model: {
                fields: {
                  razon: { type: "string", editable: false },                  
                },
              },
            },
            sort: [{ field: "Reserva", dir: "asc" }],
          },
          height: 450,
          scrollable: true,
          sortable: true,
          filterable: true,
          resizable: true,
          change: onChange,
          pageable: {
            pageable: true,
            previousNext: false,
            pageSize: 10,
            alwaysVisible: true,
            numeric: true,
            buttonCount: 5,
          },
          dataBound: function () {
            for (var i = 0; i < this.columns.length; i++) {
              this.autoFitColumn(i);
            }
          },
  
          columns: [
            { selectable: true, width: "50px" },
            { field: "razon", title: "Razón social" },
          ],
          editable: true,
        });
        let grid = $("#GridCi").data("kendoGrid");
  
        let newRow = {Nombre: `${razon}`};  

        grid.dataSource.add(newRow);

    });

    function ajaxQuery(query) {
    let data;
    let newquery = {
        query: query,
        parameters: {
        aType: "execTx",
        environment: `${backandGlobal.environment}`,
        },
    };
    $.ajax({
        async: false,
        url: `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/sp/query`,
        type: "POST",
        data: JSON.stringify(newquery),
        beforeSend: function (xhr) {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Authorization", localStorage.Authorization);
        },
        success: function (result) {
        data = result[0];
        },
        error: function (error) {
        console.log(error);
        },
    });
    return data;
    }

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    function formatDate(date) {
        return [
          padTo2Digits(date.getDate()),
          padTo2Digits(date.getMonth() + 1),
          date.getFullYear(),
        ].join('/');
    }
    function onChange(e) {
      debugger;
      var rows = e.sender.select(),
          items = [];

      rows.each(function(e) {
        var grid = $("#GridCi").data("kendoGrid");
        var dataItem = grid.dataItem(this);
        items.push(dataItem);
      });
      sessionStorage.dataSelected = JSON.stringify(items);
    };

  }, 3000);
}