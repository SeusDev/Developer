const remitente = kendo.jQuery('#1f7b3ca5-4517-4a7c-bcb3-ec9e568de947').data('kendoDropDownList').value();
const destinatario = kendo.jQuery('#9a27276c-9dd2-4913-b7b0-a0c53eb59f34').data('kendoDropDownList').value();

if (remitente == destinatario) {
    console.log('Mismo remitente')
    debugger;
    kendo.jQuery('#9a27276c-9dd2-4913-b7b0-a0c53eb59f34').data('kendoDropDownList').value('');
    toastr.warning('No se permite imponer giros al mismo remitente')
}