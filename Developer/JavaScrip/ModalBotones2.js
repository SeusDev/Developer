var header = ``, body = ``, footer = ``
header = `<h4 class="modal-title">Finalizar inspección</h4>`
body = `<p>
  <span>
  ¿Desea guardar y finalizar? Recuerde que si guarda y finaliza, no podrá editar la inspección nuevamente?
  </span>
</p>`
footer = `<h4>Modal footer</h4>`

var config = {
  htmlTemplate: true,
  headerTemplate: header,
  bodyTemplate: body,
  footerTemplate: footer,
  showBtnsFooter: true|false,
  size: 'sm'|'lg'|'xl',
  scrollable: true|false,
  centered: true|false
}

const Guardar = () => {
  console.log('Done callback')
}

const Cancelar = () => {
  console.log('Cancel callback')
}
openCustomModal(config, Guardar, Cancelar)