setTimeout(() => {
    debugger;
    $('#Grid').ready(()=>{
        window.createGrid = createGrid;
        createGrid('#Grid',[])
        createGrid('#Grid1',[])
    })
}, 1000);

function createGrid(id, data){
    let fields = {
        Id: { type: 'string', editable: false },
        Name: { type: "string", editable: false },
        Buffer: { type: "number", editable: false },
        Type: { type: "string", editable: false },
    }
    let columns = [
        { field: 'Name', title: 'Nombre' },
        { title: "Visualizar", command: { text: "viewAttachment", click: viewAttachment, template: `<a  class='k-grid-viewAttachment btn' style="align-items: center; background-color: white; margin-left: 36%; "><i class='fa fa-eye'></i></a>` } }
    ]

    kendo.jQuery(id).kendoGrid({
        dataSource: {
            data: data,
            schema: {
                model: {
                    fields: fields
                }
            },
            pageSize: 10,
        },
        batch: false,
        editable: true,
        persistSelection: false,
        scrollable: true,
        sortable: false,
        filterable: true,
        resizable: false,
        pageable: {
            input: false,
            numeric: false,
            refresh: false
        },
        dataBound: function (e) {
            var dataGrid = kendo.jQuery(id).data("kendoGrid");

            for (var i = 0; i < dataGrid.columns.length; i++) {
                dataGrid.autoFitColumn(i);
            }
        },
        columns: columns

    });
}

function viewAttachment(e){
    let id = e.target.id;
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    var headerTemplate = "<h4 class='modal-title text-center'>Visor de archivos</h4>";
    var bodyTemplate = `<embed
    src="data:${dataItem.Type};base64,${dataItem.Buffer}" type="${dataItem.Type}" width="100%" height="600px"/>`;
    var footerTemplate = "";
    var showBtnsFooter = false;


    var modal = {
        htmlTemplate: true,
        headerTemplate,
        bodyTemplate,
        footerTemplate,
        showBtnsFooter,
        size: "xl",
        scrollable: true,
        centered: true,
        keyboard: true,
    }
    
    openCustomModal(modal)
}