/* Descargar plantilla
 */
function Descargar() {

    var excelContratos = XLSX.utils.book_new(); // Creando Excel
    excelContratos.Props = { // Cambiando propiedades
        Title: "Reporte ingreso sin reserva",
        Subject: "Reporte ingreso sin reserva",
        Author: "Skandia",
    };
    excelContratos.SheetNames.push("RESERVA");

    var Reserva = [
        [
            "NumeroReserva", "Sede","Fecha", "Hora", "NombreReserva", "Colaborador","Observacion",
        ]
    ]
    var GridReporteIngresoSinReserva = [...$("#GridReporteIngresoSinReserva").data("kendoGrid").dataSource.data()]
    // Aseguradoras 

    // Aseguradoras 
    debugger
    for (var i = 0; i < GridReporteIngresoSinReserva.length; i++) {

        var arr = []
        arr.push(GridReporteIngresoSinReserva[i].NumeroReserva)
        arr.push(GridReporteIngresoSinReserva[i].Sede)
        arr.push(GridReporteIngresoSinReserva[i].Fecha)
        arr.push(GridReporteIngresoSinReserva[i].Hora)
        arr.push(GridReporteIngresoSinReserva[i].NombreReserva)
        arr.push(GridReporteIngresoSinReserva[i].Colaborador)
        arr.push(GridReporteIngresoSinReserva[i].Observacion)

        Reserva.push(arr)
    }
    /*XLSX.utils.aoa_to_sheettoma una matriz de matrices de valores JS y devuelve una hoja*/
    var hoja1 = XLSX.utils.aoa_to_sheet(Reserva);

    excelContratos.Sheets["RESERVA"] = hoja1;
    //exportando

    /*Las funciones exportadas write y writeFile aceptan un argumento de opciones:*/
    var archivo = XLSX.write(excelContratos, {
        bookType: 'xlsx',
        type: 'binary'
    });

    function conversion(s) {

        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

    if (confirm('¿Quiere descargar la plantilla de excel?')) {
        /*nombre del archivo de excell*/

        saveAs(new Blob([conversion(archivo)], {
            type: "application/octet-stream"
        }), 'Reporte.xlsx');
    }

}