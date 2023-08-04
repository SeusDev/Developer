var header = ``, body = ``, footer = ``
header = `<h4 class="modal-title">Guardado temporal de inspección</h4>`
body = `<p>
<span>
<br>
Desea guardar parcialmente la inspección, recuerde completarla en su debido momento. 
</span>
</p>`
footer = `<div></div>`;

var config = {
htmlTemplate: true,
headerTemplate: header,
bodyTemplate: body,
footerTemplate: footer,
showBtnsFooter: true,
size: 'sm',
scrollable: true,
centered: true
}

const Guardar = () => {
debugger;
}
const Cancelar = () => {
    console.log('Cancel callback')
  }

openCustomModal(config, Guardar, Cancelar)


// Propierdades modal
/* 
var config = {
    htmlTemplate: true,
    headerTemplate: header,
    bodyTemplate: body,
    footerTemplate: footer,
    showBtnsFooter: true|false,
    size: 'sm'|'lg'|'xl',
    scrollable: true|false,
    centered: true|false
  } */