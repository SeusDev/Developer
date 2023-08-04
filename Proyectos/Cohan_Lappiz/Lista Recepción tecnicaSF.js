
//	Lista Recepción tecnicaSF

var url = location.href;
var urlSplit = url.split('appViewId=')
var idVista = urlSplit[1]
debugger
if (idVista == 'dfcae31f-5e51-4f00-9eac-5c2676f8f2bc') {
    setTimeout(() => {
        let html = ''
        execSP('Cohan_Lappiz_RecepcionTecnicaSFlist').then(success => {
            debugger

            let data = success.data[0];
            let recepContainer = document.getElementById('recepContainer')

            if (data.length > 0) {
                data.forEach(appendCard);

                function appendCard(element, index) {
                    console.log(index)
                    html += `
                <div class="k-card k-card-vertical">
                <div class="k-card-header k-display-flex k-align-items-center ">
                    <h5 class="k-card-title" style="font-weight: bold;">${element.NumeroPedido}</h5>
                    <hr class="k-card-separator" style="margin: 8px 0;">
                        <h6 class="k-card-subtitle" style="padding-left: 4px;">  Número del pedido</h6>
                                        </div>
                    <div class="k-card-body">
                        <div class="info-container" style="padding: 6px 0;">
                            <div class="k-column" style="font-size: 18px;">Bodega de salida:<br> <span class="dynamic-text" style="font-weight: bold;">${element.NombreBodega}</span> </div>
                            <div class="k-column" style="font-size: 18px;">Bodega de destino:<br> <span class="dynamic-text" style="font-weight: bold;">${element.BodegaDestino}</span> </div>
                        </div>
                        <hr class="k-card-separator" style="margin: 8px 0;">
                            <div class="k-card-actions k-card-actions-stretched" style="padding-top: 6px;">
                                <div class="add-btn-container">
                                    <button id="${element.idRecepcion}" class="addBtn" style="padding: 2px 15px; font-size: 12px;"><i class='fa fa-tasks'></i> Tomar tarea</button>
                                </div>
                            </div>
                        </div>
                        <div class="k-card-footer">
                    </div>
                </div>`
                }
                recepContainer.innerHTML = html
                $(".addBtn").click((e) => {
                    debugger
                    tomarTarea(e.target.id)
                })

                function tomarTarea(idRecepcion) {
                    location.assign(`#/forms?rowId=${idRecepcion}&viewName=Cohan_Lappiz_Recepciones&entityId=e8514028-c528-4149-b5da-d79a68934d03&appViewId=81688133-5f91-423f-9492-189b328d9c44`)
                }
            } else {
                recepContainer.innerHTML = '<h2>No se han encontrado resultados</h2>'
            }
        });
    }, 800);
}s