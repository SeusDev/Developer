

var Query = `select b.Id as Id,b.NombreBodega,b.CodigoBodega from Cohan_Lappiz_Bodega b 
join Cohan_Lappiz_TipoBodegas t on t.Id = b.TipoBodegasFK where NombreTipoBodega = 'Bodega tránsito'`

execQuery(Query).then(response => {
    debugger;
    var cadena = JSON.stringify(response.data[0]);
    var data = JSON.parse(cadena);
    for (let index = 0; index < data.length; index++) {
        data[index].CodigoBodega = data[index].CodigoBodega.toString()
    }

    $("#cd92369b-d20b-4073-890f-ceb4cbd52f27").kendoDropDownList({
        optionLabel: "Seleccione una bodega",
        dataTextField: "NombreBodega",
        dataValueField: "Id",
        filter: "contains",
        template:
            "<table style='width=700px; table-layout: fixed;'> " +
            "<colgroup><col style='width:500px;'><col style='width:500px;'>" +
            "</colgroup><tbody><tr><td padding-right: 2px; padding-left: 2px;'>${CodigoBodega}</td><td style='width:200px; padding-right: 2px; padding-left: 2px;'>${NombreBodega}</td></tr><tbody></table>",
        dataSource: {
            transport: {
                read: function (options) {
                    debugger;
                    var filter = options.data.filter;

                    if (filter && filter.filters.length) {
                        var value = filter.filters[0].value.toLowerCase();
                        var result = data.filter(function (item) {
                            return (
                                item.CodigoBodega.toLowerCase().indexOf(value) >= 0 ||
                                item.NombreBodega.toLowerCase().indexOf(value) >= 0
                            );
                        });
                        options.success(result);
                    } else {
                        options.success(data);
                    }
                }
            },
            serverFiltering: true
        },
        columns: [{ field: "CodigoBodega" }, { field: "NombreBodega" }],
        placeholder: "Seleccione una bodega",
        change: function (e) {
            debugger;
            var cliente = $("#cd92369b-d20b-4073-890f-ceb4cbd52f27").data("kendoDropDownList").value();
        }
    }).data("kendoDropDownList");
    $("#SectionsFields > div > div > ng-form > span").css('width','100%');
});

var Query2 = `select b.Id as Id,b.NombreBodega,b.CodigoBodega from Cohan_Lappiz_Bodega b 
join Cohan_Lappiz_TipoBodegas t on t.Id = b.TipoBodegasFK where NombreTipoBodega = 'Bodega devolución'`

execQuery(Query2).then(response => {
    debugger;
    var cadena = JSON.stringify(response.data[0]);
    var data = JSON.parse(cadena);

    for (let index = 0; index < data.length; index++) {
        data[index].CodigoBodega = data[index].CodigoBodega.toString()
    }

    $("#3ab833fd-850a-4a2d-9e43-0c887356e839").kendoDropDownList({
        optionLabel: "Seleccione una bodega",
        dataTextField: "NombreBodega",
        dataValueField: "Id",
        filter: "contains",
        template:
            "<table style='width=700px; table-layout: fixed;'> " +
            "<colgroup><col style='width:500px;'><col style='width:500px;'>" +
            "</colgroup><tbody><tr><td padding-right: 2px; padding-left: 2px;'>${CodigoBodega}</td><td style='width:200px; padding-right: 2px; padding-left: 2px;'>${NombreBodega}</td></tr><tbody></table>",
        dataSource: {
            transport: {
                read: function (options) {
                    debugger;
                    var filter = options.data.filter;

                    if (filter && filter.filters.length) {
                        var value = filter.filters[0].value.toLowerCase();
                        var result = data.filter(function (item) {
                            return (
                                item.CodigoBodega.toLowerCase().indexOf(value) >= 0 ||
                                item.NombreBodega.toLowerCase().indexOf(value) >= 0
                            );
                        });
                        options.success(result);
                    } else {
                        options.success(data);
                    }
                }
            },
            serverFiltering: true
        },
        columns: [{ field: "CodigoBodega" }, { field: "NombreBodega" }],
        placeholder: "Seleccione una bodega",
        change: function (e) {
            debugger;
            var cliente = $("#3ab833fd-850a-4a2d-9e43-0c887356e839").data("kendoDropDownList").value();
        }
    }).data("kendoDropDownList");
    $("#SectionsFields > div > div > ng-form > span").css('width','100%');
});

var Query3 = `select b.Id as Id,b.NombreBodega,b.CodigoBodega from Cohan_Lappiz_Bodega b 
join Cohan_Lappiz_TipoBodegas t on t.Id = b.TipoBodegasFK where NombreTipoBodega = 'Bodega fraccionamiento'`

execQuery(Query3).then(response => {
    debugger;
    var cadena = JSON.stringify(response.data[0]);
    var data = JSON.parse(cadena);

    for (let index = 0; index < data.length; index++) {
        data[index].CodigoBodega = data[index].CodigoBodega.toString()
    }

    $("#9b04fee6-17c3-4689-a82b-5c6a69d964ee").kendoDropDownList({
        optionLabel: "Seleccione una bodega",
        dataTextField: "NombreBodega",
        dataValueField: "Id",
        filter: "contains",
        template:
            "<table style='width=700px; table-layout: fixed;'> " +
            "<colgroup><col style='width:500px;'><col style='width:500px;'>" +
            "</colgroup><tbody><tr><td padding-right: 2px; padding-left: 2px;'>${CodigoBodega}</td><td style='width:200px; padding-right: 2px; padding-left: 2px;'>${NombreBodega}</td></tr><tbody></table>",
        dataSource: {
            transport: {
                read: function (options) {
                    debugger;
                    var filter = options.data.filter;

                    if (filter && filter.filters.length) {
                        var value = filter.filters[0].value.toLowerCase();
                        var result = data.filter(function (item) {
                            return (
                                item.CodigoBodega.toLowerCase().indexOf(value) >= 0 ||
                                item.NombreBodega.toLowerCase().indexOf(value) >= 0
                            );
                        });
                        options.success(result);
                    } else {
                        options.success(data);
                    }
                }
            },
            serverFiltering: true
        },
        columns: [{ field: "CodigoBodega" }, { field: "NombreBodega" }],
        placeholder: "Seleccione una bodega",
        change: function (e) {
            debugger;
            var cliente = $("#9b04fee6-17c3-4689-a82b-5c6a69d964ee").data("kendoDropDownList").value();
        }
    }).data("kendoDropDownList");
    $("#SectionsFields > div > div > ng-form > span").css('width','100%');
});

var Query4 = `select b.Id as Id,b.NombreBodega,b.CodigoBodega from Cohan_Lappiz_Bodega b 
join Cohan_Lappiz_TipoBodegas t on t.Id = b.TipoBodegasFK where NombreTipoBodega = 'Bodega principal'`

execQuery(Query4).then(response => {
    debugger;
    var cadena = JSON.stringify(response.data[0]);
    var data = JSON.parse(cadena);

    for (let index = 0; index < data.length; index++) {
        data[index].CodigoBodega = data[index].CodigoBodega.toString()
    }

    $("#f95e916c-20a0-49fd-9f50-1f664bffcd0d").kendoDropDownList({
        optionLabel: "Seleccione una bodega",
        dataTextField: "NombreBodega",
        dataValueField: "Id",
        filter: "contains",
        template:
            "<table style='width=700px; table-layout: fixed;'> " +
            "<colgroup><col style='width:500px;'><col style='width:500px;'>" +
            "</colgroup><tbody><tr><td padding-right: 2px; padding-left: 2px;'>${CodigoBodega}</td><td style='width:200px; padding-right: 2px; padding-left: 2px;'>${NombreBodega}</td></tr><tbody></table>",
        dataSource: {
            transport: {
                read: function (options) {
                    debugger;
                    var filter = options.data.filter;

                    if (filter && filter.filters.length) {
                        var value = filter.filters[0].value.toLowerCase();
                        var result = data.filter(function (item) {
                            return (
                                item.CodigoBodega.toLowerCase().indexOf(value) >= 0 ||
                                item.NombreBodega.toLowerCase().indexOf(value) >= 0
                            );
                        });
                        options.success(result);
                    } else {
                        options.success(data);
                    }
                }
            },
            serverFiltering: true
        },
        columns: [{ field: "CodigoBodega" }, { field: "NombreBodega" }],
        placeholder: "Seleccione una bodega",
        change: function (e) {
            debugger;
            var cliente = $("#f95e916c-20a0-49fd-9f50-1f664bffcd0d").data("kendoDropDownList").value();
        }
    }).data("kendoDropDownList");
    $("#SectionsFields > div > div > ng-form > span").css('width','100%');
});

var Query5 = `select b.Id as Id,b.NombreBodega,b.CodigoBodega from Cohan_Lappiz_Bodega b 
join Cohan_Lappiz_TipoBodegas t on t.Id = b.TipoBodegasFK where NombreTipoBodega = 'Bodega secundaria'`

execQuery(Query5).then(response => {
    debugger;
    var cadena = JSON.stringify(response.data[0]);
    var data = JSON.parse(cadena);

    for (let index = 0; index < data.length; index++) {
        data[index].CodigoBodega = data[index].CodigoBodega.toString()
    }

    $("#f80556a1-b6c9-4354-9a91-9329f7c5cbb6").kendoDropDownList({
        optionLabel: "Seleccione una bodega",
        dataTextField: "NombreBodega",
        dataValueField: "Id",
        filter: "contains",
        template:
            "<table style='width=700px; table-layout: fixed;'> " +
            "<colgroup><col style='width:500px;'><col style='width:500px;'>" +
            "</colgroup><tbody><tr><td padding-right: 2px; padding-left: 2px;'>${CodigoBodega}</td><td style='width:200px; padding-right: 2px; padding-left: 2px;'>${NombreBodega}</td></tr><tbody></table>",
        dataSource: {
            transport: {
                read: function (options) {
                    debugger;
                    var filter = options.data.filter;

                    if (filter && filter.filters.length) {
                        var value = filter.filters[0].value.toLowerCase();
                        var result = data.filter(function (item) {
                            return (
                                item.CodigoBodega.toLowerCase().indexOf(value) >= 0 ||
                                item.NombreBodega.toLowerCase().indexOf(value) >= 0
                            );
                        });
                        options.success(result);
                    } else {
                        options.success(data);
                    }
                }
            },
            serverFiltering: true
        },
        columns: [{ field: "CodigoBodega" }, { field: "NombreBodega" }],
        placeholder: "Seleccione una bodega",
        change: function (e) {
            debugger;
            var cliente = $("#f80556a1-b6c9-4354-9a91-9329f7c5cbb6").data("kendoDropDownList").value();
        }
    }).data("kendoDropDownList");
    $("#SectionsFields > div > div > ng-form > span").css('width','100%');
});

var Query6 = `select b.Id as Id,b.NombreBodega,b.CodigoBodega from Cohan_Lappiz_Bodega b 
join Cohan_Lappiz_TipoBodegas t on t.Id = b.TipoBodegasFK where NombreTipoBodega = 'Bodega recepción'`

execQuery(Query6).then(response => {
    debugger;
    var cadena = JSON.stringify(response.data[0]);
    var data = JSON.parse(cadena);

    for (let index = 0; index < data.length; index++) {
        data[index].CodigoBodega = data[index].CodigoBodega.toString()
    }

    $("#5ca68c9a-2f50-4fb0-aea2-2dfdc2d28087").kendoDropDownList({
        optionLabel: "Seleccione una bodega",
        dataTextField: "NombreBodega",
        dataValueField: "Id",
        filter: "contains",
        template:
            "<table style='width=700px; table-layout: fixed;'> " +
            "<colgroup><col style='width:500px;'><col style='width:500px;'>" +
            "</colgroup><tbody><tr><td padding-right: 2px; padding-left: 2px;'>${CodigoBodega}</td><td style='width:200px; padding-right: 2px; padding-left: 2px;'>${NombreBodega}</td></tr><tbody></table>",
        dataSource: {
            transport: {
                read: function (options) {
                    debugger;
                    var filter = options.data.filter;

                    if (filter && filter.filters.length) {
                        var value = filter.filters[0].value.toLowerCase();
                        var result = data.filter(function (item) {
                            return (
                                item.CodigoBodega.toLowerCase().indexOf(value) >= 0 ||
                                item.NombreBodega.toLowerCase().indexOf(value) >= 0
                            );
                        });
                        options.success(result);
                    } else {
                        options.success(data);
                    }
                }
            },
            serverFiltering: true
        },
        columns: [{ field: "CodigoBodega" }, { field: "NombreBodega" }],
        placeholder: "Seleccione una bodega",
        change: function (e) {
            debugger;
            var cliente = $("#5ca68c9a-2f50-4fb0-aea2-2dfdc2d28087").data("kendoDropDownList").value();
        }
    }).data("kendoDropDownList");
    $("#SectionsFields > div > div > ng-form > span").css('width', '100%');
});

var Query7 = `select b.Id as Id,b.NombreBodega,b.CodigoBodega from Cohan_Lappiz_Bodega b 
join Cohan_Lappiz_TipoBodegas t on t.Id = b.TipoBodegasFK where NombreTipoBodega = 'Bodega ventas'`

execQuery(Query7).then(response => {
    debugger;
    var cadena = JSON.stringify(response.data[0]);
    var data = JSON.parse(cadena);

    for (let index = 0; index < data.length; index++) {
        data[index].CodigoBodega = data[index].CodigoBodega.toString()
    }

    $("#115138fa-78bd-4c33-a1f8-9beb25a41e50").kendoDropDownList({
        optionLabel: "Seleccione una bodega",
        dataTextField: "NombreBodega",
        dataValueField: "Id",
        filter: "contains",
        template:
            "<table style='width=700px; table-layout: fixed;'> " +
            "<colgroup><col style='width:500px;'><col style='width:500px;'>" +
            "</colgroup><tbody><tr><td padding-right: 2px; padding-left: 2px;'>${CodigoBodega}</td><td style='width:200px; padding-right: 2px; padding-left: 2px;'>${NombreBodega}</td></tr><tbody></table>",
        dataSource: {
            transport: {
                read: function (options) {
                    debugger;
                    var filter = options.data.filter;

                    if (filter && filter.filters.length) {
                        var value = filter.filters[0].value.toLowerCase();
                        var result = data.filter(function (item) {
                            return (
                                item.CodigoBodega.toLowerCase().indexOf(value) >= 0 ||
                                item.NombreBodega.toLowerCase().indexOf(value) >= 0
                            );
                        });
                        options.success(result);
                    } else {
                        options.success(data);
                    }
                }
            },
            serverFiltering: true
        },
        columns: [{ field: "CodigoBodega" }, { field: "NombreBodega" }],
        placeholder: "Seleccione una bodega",
        change: function (e) {
            debugger;
            var cliente = $("#115138fa-78bd-4c33-a1f8-9beb25a41e50").data("kendoDropDownList").value();
        }
    }).data("kendoDropDownList");
    $("#SectionsFields > div > div > ng-form > span").css('width', '100%');
});
