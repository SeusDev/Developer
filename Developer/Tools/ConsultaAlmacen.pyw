import sys
import tkinter as tk
from tkinter import ttk, messagebox
import pyodbc
import pandas as pd
from sqlalchemy import create_engine, text
from urllib import parse
import os
import shutil
from datetime import datetime
import pymongo

# Función para ejecutar las consultas y guardar los resultados en un archivo Excel
def ejecutar_consultas():
    # Obtener el nombre del almacén ingresado por el usuario
    AlmacenCodigo = EntradaAlmacenCodigo.get()
    NombreAlmacen = EntradaAlmacenNombre.get()

    # Obtener Fecha actual de ejecucion

    fecha_actual = datetime.now().strftime("%Y-%m-%d")
    # Definir la ruta de la plantilla de Excel y del nuevo archivo
    nombre_archivo_resultados = f'{NombreAlmacen} resultados {fecha_actual}.xlsx'
    ruta_archivo_resultados = os.path.join(os.path.expanduser("~"), "C:/Users/sehenao/Downloads", nombre_archivo_resultados)

    # Realizar la consulta en SQL Server
            # Establecer la conexión a la base de datos
        # - Conexion a la Base de Datos legado

    server= 'tcp:datosayer.sistecredito.com'
    database= 'SistecreditoAyer'

    conn_str = ('DRIVER={SQL Server}; \
                           SERVER='+ server +'; \
                           DATABASE='+ database +';\
                           Trusted_Connection=yes;')
    engine = create_engine(f"mssql+pyodbc:///?odbc_connect={parse.quote_plus(conn_str)}", fast_executemany=True)

    conexion_sql = pyodbc.connect(conn_str)
    cursor_sql = conexion_sql.cursor()

    # - Conexión a mongo
    client = pymongo.MongoClient("mongodb+srv://sehenao:QUOViZFSdwQHEMNF@credinet2019prod.07jc8.azure.mongodb.net/test")

    # Llamamos la colección llamada "updateAudit"
    UpdateAudit = client["DBRequests_co"]["updateAudit"]
    photoHistory = client["DBRequests_co"]["photoHistory"]

    # Consultas a ejecutar
         
    consulta1 =f"""SELECT R.CODIGO, 
        R.NOMBRE AS RS, 
        R.NIT,
        R.FECHACREACION, 
        A.CODIGO AS [ALMACEN CODIGO],
        A.STOREID, A.NOMBRE AS [NOMBRE ALMACEN], 
        a.FechaCreacion,
        A.DIRECCION ,
        M.Nombre AS [MUNICIPIO], 
        B.NOMBRE AS [BARRIO], 
        COALESCE (cr.Creditos,0) AS Creditos, 
        COALESCE (cr.[cantidad clientes],0) AS [cantidad clientes], 
        COALESCE (cr.ValorCreditos,0) AS ValorCreditos, 
        COALESCE (rr.Recibos,0) AS Recibos, 
        COALESCE (rr.[cantidad clientes],0) AS [cantidad clientes], 
        COALESCE (rr.ValorRecibos,0) AS ValorRecibos
        FROM RAZONSOCIAL AS R WITH(NOLOCK) 
        JOIN ALMACEN AS A WITH(NOLOCK) ON A.RAZONSOCIALCODIGO = R.CODIGO 
        JOIN MUNICIPIO AS M WITH(NOLOCK) ON M.CODIGO = A.MUNICIPIOCODIGO 
        JOIN BARRIO AS B WITH(NOLOCK) ON B.CODIGO = A.BARRIOCODIGO 
        left join (select MIN(C.FECHACREACION) AS [Primer Credito], count(c.codigo) as Creditos, sum(c.ValorFactura) as ValorCreditos, COUNT(DISTINCT C.PERSONACODIGO) AS [cantidad clientes], c.almacencodigo 
                    from credito c with(nolock)  group by c.AlmacenCodigo)cr on cr.AlmacenCodigo = a.codigo 
        left join (select MIN(r.FECHACREACION) AS [Primer Recibo], count(r.codigo) as Recibos, sum(r.ValorRecibo) as ValorRecibos, COUNT(DISTINCT R.PERSONACODIGO) AS [cantidad clientes], r.AlmacenCodigo 
                    from recibo r with(nolock) group by r.AlmacenCodigo)rr on rr.AlmacenCodigo = a.codigo 
        where A.Codigo = {AlmacenCodigo} 
        group by R.CODIGO, R.NOMBRE, R.NIT, R.FECHACREACION, A.CODIGO, A.NOMBRE, a.FechaCreacion, A.DIRECCION , M.Nombre, B.NOMBRE, cr.Creditos, cr.[cantidad clientes], cr.ValorCreditos, rr.Recibos, rr.[cantidad clientes], rr.ValorRecibos, A.STOREID
        """
      
    consulta2 =f"""	SELECT P.IDENTIFICACION, P.NOMBRECOMPLETO, CAST(P.FECHACREACION AS DATE) AS [DIA CREACION CLIENTE], 
		CAST(P.FECHACREACION AS TIME) AS [HORA CREACION CLIENTE], P.EMAIL, P.FIJO,
		P.CELULAR, P.DIRECCIONRESIDENCIA, ES.DESCRIPCION AS [ESTADO PERSONA], P.CUPOTOTAL, P.CUPODISPONIBLETOTAL, 
		CAST (C.FECHACREACION AS DATE) AS [DIA CREACION CREDITO], CAST (C.FECHACREACION AS TIME) AS [HORA CREACION CREDITO], 
		C.CONSECUTIVOALMACEN, C.CODIGO, C.VALORFACTURA, EC.DESCRIPCION AS [ESTADO CREDITO],  CA.DIASMORA, A.Nombre AS [ALMACEN CREDITO], R.NOMBRE AS [RS], M.NOMBRE AS [MUNICIPIO], B.NOMBRE AS [BARRIO], A.DIRECCION,A.PRIMERTELEFONO
		from CREDITO C WITH(NOLOCK)
		JOIN SISTEDESKTOP.CREDITOADICION CA WITH(NOLOCK) ON CA.CREDITOCODIGO= C.CODIGO
		JOIN SISTEDESKTOP.ESTADOSCARTERA EC WITH(NOLOCK) ON EC.CODIGO = CA.ESTADOCARTERACODIGO
		JOIN PERSONA P WITH(NOLOCK) ON c.PersonaCodigo = p.Codigo
		JOIN ESTADOSSOLICITUD ES WITH(NOLOCK)  ON ES.CODIGO = P.ESTADOSOLICITUDCODIGO 
		LEFT JOIN ALMACEN A WITH(NOLOCK) ON A.CODIGO=C.ALMACENCODIGO
		LEFT JOIN RAZONSOCIAL R WITH(NOLOCK) ON R.CODIGO = A.RAZONSOCIALCODIGO
		LEFT JOIN MUNICIPIO M WITH(NOLOCK) ON M.CODIGO = A.MUNICIPIOCODIGO
		LEFT JOIN BARRIO B WITH(NOLOCK) ON B.CODIGO = A.BARRIOCODIGO
	    where A.Codigo = {AlmacenCodigo} 
		AND CAST(C.FECHACREACION AS DATE) >= CAST(A.FECHACREACION AS DATE)
	    ORDER BY C.FECHACREACION ASC
    """

    consulta3 = f"""	SELECT P.IDENTIFICACION, P.NOMBRECOMPLETO, CAST(P.FECHACREACION AS DATE) AS [DIA CREACION CLIENTE], CAST(P.FECHACREACION AS TIME) AS [HORA CREACION CLIENTE]
		, P.EMAIL, P.FIJO, P.CELULAR, P.DIRECCIONRESIDENCIA, ES.DESCRIPCION, P.CUPOTOTAL, P.CUPODISPONIBLETOTAL, 
		C.Codigo AS [CREDITO CODIGO], CAST (C.FECHACREACION AS DATE) AS [DIA CREACION CREDITO], CAST (C.FECHACREACION AS TIME) AS [HORA CREACION CREDITO], 
		C.CONSECUTIVOALMACEN, C.VALORFACTURA, EC.DESCRIPCION AS [ESTADO CREDITO], AL.Nombre AS [ALMACEN CREDITO], RC.NOMBRE AS [RS CREDITO], M.NOMBRE AS [MUNICIPIO CREDITO], 
		B.NOMBRE AS [BARRIO CREDITO], AL.DIRECCION AS [DIRECCION ALMACEN CREDITO], AL.PRIMERTELEFONO [TELEFONO ALM. CREDITO], 
		CAST (RE.FECHACREACION AS DATE) AS [DIA CREACION RECIBO], CAST (RE.FECHACREACION AS TIME) AS [HORA CREACION RECIBO], 
		RE.VALORRECIBO, A.NOMBRE AS [ALMACEN RECIBO], RR.NOMBRE AS [RS RECIBO], MR.NOMBRE AS [MUNICIPIO RECIBO],
		BR.NOMBRE AS [BARRIO RECIBO], A.DIRECCION AS [DIRECCION ALMACEN RECIBO],A.PRIMERTELEFONO [TELEFONO ALM. RECIBO]
	from CREDITO C WITH(NOLOCK)
		JOIN SISTEDESKTOP.CREDITOADICION CA WITH(NOLOCK) ON CA.CREDITOCODIGO= C.CODIGO
		JOIN SISTEDESKTOP.ESTADOSCARTERA EC WITH(NOLOCK) ON EC.CODIGO = CA.ESTADOCARTERACODIGO
		JOIN RECIBO RE WITH(NOLOCK) on re.CreditoCodigo = c.Codigo
		LEFT JOIN PERSONA P WITH(NOLOCK) ON P.CODIGO = C.PERSONACODIGO
		JOIN ESTADOSSOLICITUD ES WITH(NOLOCK)  ON ES.CODIGO = P.ESTADOSOLICITUDCODIGO 
		JOIN ALMACEN AL WITH(NOLOCK) ON al.Codigo = c.AlmacenCodigo
		JOIN ALMACEN A WITH(NOLOCK) ON a.Codigo = re.ALMACENRECIBIOCODIGO
		JOIN RAZONSOCIAL RC WITH(NOLOCK) ON al.RazonSocialCodigo = RC.Codigo
		JOIN RAZONSOCIAL RR WITH(NOLOCK) ON a.RazonSocialCodigo = RR.Codigo
		LEFT JOIN MUNICIPIO M WITH(NOLOCK) ON M.CODIGO = A.MUNICIPIOCODIGO
		LEFT JOIN BARRIO B WITH(NOLOCK) ON B.CODIGO = A.BARRIOCODIGO
		LEFT JOIN MUNICIPIO MR WITH(NOLOCK) ON MR.CODIGO = A.MUNICIPIOCODIGO
		LEFT JOIN BARRIO BR WITH(NOLOCK) ON BR.CODIGO = A.BARRIOCODIGO
	WHERE cast(re.FechaCreacion as date)>= CAST(A.FECHACREACION AS DATE)
		AND A.Codigo = {AlmacenCodigo} 
	ORDER BY RE.FECHACREACION ASC
    """

    consulta4 = f"""
    	SELECT p.Identificacion, p.NombreCompleto,
	M.Nombre AS Municipio,
	D.Nombre AS Departamento, 
	P.Celular, P.Email, A.Nombre, 
	U.NombreCompleto Usuario, 
	G.IniciaGestion, 
	T.Descripcion EstadoActual_C, 
	G.TerminaGestion, 
	TF.Descripcion EstadoFinal_G, 
	TS.Descripcion TipoSolicitud, 
	G.Observacion
	FROM Persona P WITH(NOLOCK)
	JOIN SisteDesktop.GestionSolicitud G WITH(NOLOCK) ON G.PersonaCodigo = P.Codigo
	JOIN Almacen A WITH(NOLOCK) ON A.Codigo = G.AlmacenCodigo
	JOIN RAZONSOCIAL R WITH(NOLOCK) ON R.CODIGO = A.RAZONSOCIALCODIGO
	LEFT JOIN Municipio M WITH(NOLOCK) ON M.Codigo = P.MunicipioCodigo
	LEFT JOIN Departamento D WITH(NOLOCK) ON D.Codigo = P.MunicipioCodigo
	JOIN SisteDesktop.Usuarios U WITH(NOLOCK) ON U.Codigo = G.Operadora
	JOIN EstadosSolicitud T WITH(NOLOCK) ON T.Codigo = p.EstadoSolicitudCodigo
	JOIN EstadosSolicitud TF WITH(NOLOCK) ON TF.Codigo = G.EstadoSolicitudFinalCodigo
	JOIN TipoSolicitudCredito TS WITH(NOLOCK) ON TS.Codigo = G.TipoSolicitudCodigo
	WHERE A.Codigo = {AlmacenCodigo} 
	AND CAST(G.IniciaGestion AS DATE) >= CAST(A.FECHACREACION AS DATE)
	ORDER BY g.IniciaGestion, p.Identificacion asc
    """
    # Ejecutar la consulta SQL
    cursor_sql.execute(consulta1)

    # Obtener la fila de la consulta
    fila = cursor_sql.fetchone()

    # Obtener el valor de la columna A.STOREID
    store_id = fila[5]  # La columna A.STOREID es la sexta columna (0-indexed)
    
    dfMongoCambios = pd.DataFrame(list(UpdateAudit.find({
    "storeId": store_id
    })))

    dfMongoFotos = pd.DataFrame(list(photoHistory.find({
    "storeId": store_id
    })))

    # Ejecutar las consultas y guardar los resultados en DataFrame
    df_resultado1 = pd.read_sql_query(consulta1, engine)
    df_resultado2 = pd.read_sql_query(consulta2, engine)   
    df_resultado3 = pd.read_sql_query(consulta3, engine)   
    df_resultado4 = pd.read_sql_query(consulta4, engine)   
    
    try:
        # Escribir los DataFrames en el archivo Excel
        with pd.ExcelWriter(ruta_archivo_resultados) as writer:
            df_resultado1.to_excel(writer, sheet_name='Detalle', index=False)
            df_resultado2.to_excel(writer, sheet_name='Creditos', index=False)
            df_resultado3.to_excel(writer, sheet_name='Recibos', index=False)
            df_resultado4.to_excel(writer, sheet_name='Solicitudes', index=False)
            dfMongoCambios.to_excel(writer, sheet_name='Cambios', index=False)
            dfMongoFotos.to_excel(writer, sheet_name='Fotos', index=False)

        # Mostrar un mensaje de éxito
        messagebox.showinfo("Éxito", f"Los resultados se guardaron en el archivo: {ruta_archivo_resultados}")
    except Exception as e:
        messagebox.showerror("Error", f"Ocurrió un error al ejecutar las consultas:\n{e}")
    finally:
        engine.dispose()
        client.close()
        cursor_sql.close()
        conexion_sql.close()

# Crear la ventana principal
ventana = tk.Tk()
# Ocultar la consola si se ejecuta como aplicación independiente
if getattr(sys, 'frozen', False) and hasattr(sys, '_MEIPASS'):
    root.withdraw()
ventana.title("Consultas de Almacén")

# Crear un marco para el contenido
marco = ttk.Frame(ventana, padding="10")
marco.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))

# Etiqueta y entrada para ingresar el nombre del almacén
EtiquetaNombreAlmacen = ttk.Label(marco, text="Nombre del almacén:")
EtiquetaNombreAlmacen.grid(row=0, column=0, padx=5, pady=5)

EntradaAlmacenNombre = ttk.Entry(marco, width=30)
EntradaAlmacenNombre.grid(row=0, column=1, padx=5, pady=5)

# Etiqueta y entrada para ingresar el Codigo del almacén
EtiquetaCodigoAlmacen = ttk.Label(marco, text="Codigo del almacén:")
EtiquetaCodigoAlmacen.grid(row=1, column=0, padx=5, pady=5)

EntradaAlmacenCodigo = ttk.Entry(marco, width=30)
EntradaAlmacenCodigo.grid(row=1, column=1, padx=5, pady=5)

# Botón para ejecutar las consultas y guardar los resultados en un archivo Excel
boton_consultar = ttk.Button(marco, text="Ejecutar Consultas y Descargar", command=ejecutar_consultas)
boton_consultar.grid(row=2, column=0, columnspan=2, pady=10)

# Ejecutar el bucle principal de la aplicación
ventana.mainloop()