var hoy = new Date();
var cumpleanos = new Date(e.value);
var edades = hoy.getFullYear() - cumpleanos.getFullYear();
var m = hoy.getMonth() - cumpleanos.getMonth();

if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
    edades--;
}

var result = edades;

var fieldId = '690f63c5-9f7b-4963-a27e-667539aa3dd6';
setFieldValue(fieldId, result);