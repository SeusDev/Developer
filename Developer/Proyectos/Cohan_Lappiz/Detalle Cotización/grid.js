$("#grid-detallecotizacion").kendoGrid({
    dataSource: {
        data: [],
        schema: {
            model: {
                fields: {
                    Cotizacion: { type: "string", editable: false },
                    Hospital: { type: "string", editable: false },
                    Listadeprecio: { type: "string", editable: false },
                    FechaVigencia: { type: "string", editable: false },
                    CodigoCliente: { type: "string", editable: false },
                    Codigoproductocohan: { type: "string", editable: false },
                    Codigosustituto: { type: "string", editable: false },
                    Nombreproductocliente: { type: "string", editable: false },
                    Nombreproducto: { type: "string", editable: false },
                    Unidadespedidas: { type: "string", editable: false },
                    Unidadesdisponibles: { type: "string", editable: false },
                    Precio: { type: "string", editable: false },
                    Operacion: { type: "string", editable: true },
                    Comentario: { type: "string", editable: false },
                    Estado: { type: "string", editable: false },
                    Detalleproducto: { type: "string", editable: false },
                    CodigoCUM: { type: "string", editable: false },
                    CodigoATC: { type: "string", editable: false },
                    Laboratorio: { type: "string", editable: false },
                    Presentacion: { type: "string", editable: false },
                    Cantidadpresentacion: { type: "string", editable: false },
                    Registroinvima: { type: "string", editable: false },
                    Fechavencimiento: { type: "string", editable: false },
                }
            }
        },
        pageSize: 10
    },
    batch: true,
    editable: true,
    persistSelection: true,
    scrollable: true,
    sortable: true,
    filterable: true,
    resizable: true,
    pageable: {
        buttonCount: 5,
        pageSizes: true,
        refresh: true
    },
    dataBound: function () {
        //
        for (var i = 0; i < this.columns.length; i++) {
            this.autoFitColumn(i);
        }
    },
    cellClose: function (e) {
        debugger;
        let modelo = e.model
        //Evento para actualizar los campos

    },
    columns: [{
        field: "Cotizacion",
        title: "Cotizacion",
        width: 250,
        media: "(min-width: 850px)"
    },
    {
        field: "Hospital",
        title: "Hospital",
        media: "(min-width: 450px)"
    },
 
    /* {
        command: [{
            text: "nuevoconteo",
            click: nuevoconteo,
            template: "<a class='k-grid-nuevoconteo btn'><i class='fa fa-plus'></i> Nuevo conteo</a>",
            media: "(min-width: 450px)"
        }]
    } */]
});
/* setTimeout(() => {
    $(".k-i-reload")[1].click();
}, 500); */