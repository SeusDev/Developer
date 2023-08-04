// Este código utiliza el statement "debugger" para detener la ejecución y permitir al desarrollador inspeccionar el estado del código.
debugger;

// Verifica si el registro es nuevo.
if (e.isNew) {
    // Si es así, ejecuta una consulta para obtener el número de registros en la tabla RentasTemporales_Lappiz_Paises.
    let query = `select count (Id) as codigo from Apuntador_Lappiz_DatalleLabor`;
    execQuery(query).then(function (response) {
        //Declaramos la variable codigo2
        var codigo2;
        // Obtiene el número de registros devueltos por la consulta.
        let data = response[0][0].codigo;

        // Verifica el valor de "data" y establece el valor del campo "05fa586d-7ff1-49a4-9541-aadd1f073683" en consecuencia.
        if (data === 0 || data <= 9) {
            // Si "data" es menor o igual a 9, agrega ceros a la izquierda del valor de "data" y establece el valor del campo.
            let codigo = data + 1;
            codigo2 = 'Lt ' + codigo;
            setFieldValue("f9c132ac-3639-43bb-8b50-cf6b2c63eea0", codigo2);
        } else if (data >= 10 || data <= 99) {
            // Si "data" está entre 10 y 99, agrega ceros a la izquierda del valor de "data" y establece el valor del campo.
            let codigo = data + 1;
            codigo2 = 'Lt ' + codigo;
            setFieldValue("f9c132ac-3639-43bb-8b50-cf6b2c63eea0", codigo2);
        } else if (data >= 99 || data <= 999) {
            // Si "data" está entre 100 y 999, agrega ceros a la izquierda del valor de "data" y establece el valor del campo.
            let codigo = data + 1;
            codigo2 = 'Lt ' + codigo;
            setFieldValue("f9c132ac-3639-43bb-8b50-cf6b2c63eea0", codigo2);
        }
    });
} else if (e.isNew) {
    // Si el registro no es nuevo, obtiene el valor del campo "CodigoPais" del registro y establece el valor del campo "05fa586d-7ff1-49a4-9541-aadd1f073683" en consecuencia.
    let codigo = e.dataItem.Id;
    setFieldValue("f9c132ac-3639-43bb-8b50-cf6b2c63eea0", codigo);
}