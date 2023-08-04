// Obtener la URL actual
var url = location.href;

// Dividir la URL en dos partes usando "appViewId=" como separador
var urlSplit = url.split("appViewId=");
var idVista = urlSplit[1];

// Verificar si la variable idVista es igual a "524f75e3-dda6-490f-bab7-fdd73fd39f45"
if (idVista == "46b5976c-eaaa-4b44-85ad-b1937d3350c2") {

    // Esperar 800 milisegundos antes de ejecutar el código dentro de esta función
    setTimeout(function () {
        // Activar el depurador del navegador
        debugger;

        // Verificar si e.isNew es verdadero
        if (e.isNew) {

            // Definir la función "aleatorio" que genera un número aleatorio dentro de un rango
            function aleatorio(inferior, superior) {
                var numPosibilidades = superior - inferior;
                var aleatorio = Math.random() * (numPosibilidades + 1);
                aleatorio = Math.floor(aleatorio);
                return inferior + aleatorio;
            }

            // Generar un código alfanumérico aleatorio y asignarlo a la variable "codigo"
            var codigo = 'PROYECTO' + '-' + aleatorio(10000, 99999);

            // Asignar el valor de "codigo" al campo de formulario con el identificador "7988474f-47f8-4857-9b8e-c6d11b8acbd5"
            setFieldValue("e1e341a1-f22c-4568-832e-035444968c69", codigo);

        } else if (!e.isNew) {
            // Si e.isNew es falso, obtener el valor de "CodigoInmueble" de la variable "e.dataItem" y asignarlo al campo de formulario correspondiente
            let proyecto = e.dataItem.Codigo;
            setFieldValue("e1e341a1-f22c-4568-832e-035444968c69", proyecto);
        }
    }, 800);
}