var query = `select isnull (p.Nombre,'') [Nombre],
            isnull (ti.cedescripcin,'')[Tipodocumento],
            p.NumeroIdentificacion [Identficacion],
            format (P.edited_date,'dd-mm-yyyy') [Actualizacion],
            P.estado[Estado],
            mp.cedescripcin[Tipopersona]
            from PGN_Lappiz_Personas P
            full join pgn_lappiz_maestrotipopersona mp on p.TipoPersonaFK = mp. Id
            full join pgn_lappiz_maestrotipoidentificacion ti on P.TipoIdentificacionFK = ti.Id
            where p.Nombre like'%${Nombregrupo}%' and mp.Id='${Tipo}'`;

            var data = ajaxQuery(query);
            if (data.length > 0) {
              debugger;
              $("#GridCi").kendoGrid({
                dataSource: {
                  data: data,
                  autoSync: true,
                  schema: {
                    model: {
                      fields: {
                        Id: { type: "string", editable: false},
                        Nombre: { type: "string", editable: false },
                        Identficacion: { type: "string", editable: false },
                        Tipodocumento: { type: "string", editable: false },
                        Actualizacion: { type: "string", editable: false },
                        Estado: { type: "string", editable: false },
                      },
                    },
                  },
                  sort: [{ field: "Reserva", dir: "asc" }],
                },
                height: 450,
                scrollable: true,
                sortable: true,
                filterable: true,
                resizable: true,
                change: onChange,
                pageable: {
                  pageable: true,
                  previousNext: false,
                  pageSize: 10,
                  alwaysVisible: true,
                  numeric: true,
                  buttonCount: 5,
                },
                dataBound: function () {
                  for (var i = 0; i < this.columns.length; i++) {
                    this.autoFitColumn(i);
                  }
                },
      
                columns: [
                  { selectable: true, width: "50px" },
                  { field: "Nombre", title: "Nombre" },
                  { field: "Identficacion", title: "identficación" },
                  { field: "Tipodocumento", title: "Tipodocumento" },
                  { field: "Actualizacion", title: "Actualizacion" },
                  { field: "Estado", title: "Estado" },
                ],
                editable: true,
              });
            }


            $.ajax({
                async: false,
                url: `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/sp/query`,
                type: "POST",
                data: JSON.stringify(newquery),
                beforeSend: function (xhr) {
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.setRequestHeader("Authorization", localStorage.Authorization);
                },
                success: function (result) {
                data = result[0];
                },
                error: function (error) {
                console.log(error);
                },
            });
            return data;
            }
        