import tkinter as tk
from tkinter import messagebox, scrolledtext, filedialog
import pandas as pd
import pyodbc

# Declarar las variables de entrada como globales
entry_query = None
text_preview = None
btn_exportar = None
btn_limpiar = None

def ejecutar_consulta_sql(query):
    # Establecer los detalles de la conexión
    server = 'tcp:datosayer.sistecredito.com'
    database = 'SistecreditoAyer'

    # Configurar la conexión a la base de datos SQL Server
    conn_str = ('DRIVER={ODBC Driver 17 for SQL Server};'
                f'SERVER={server};'
                f'DATABASE={database};'
                'Trusted_Connection=yes;')

    try:
        # Establecer la conexión
        conn = pyodbc.connect(conn_str)

        # Ejecutar la consulta SQL
        df = pd.read_sql(query, conn)

        return df
    except Exception as e:
        messagebox.showerror("Error", f"Error al ejecutar la consulta SQL:\n{e}")
        return None
    finally:
        # Cerrar la conexión
        if 'conn' in locals():
            conn.close()

def guardar_resultados_en_excel(df, file_path):
    try:
        # Guardar los resultados en un archivo Excel (.xlsx)
        df.to_excel(file_path, index=False)
        messagebox.showinfo("Guardado", f"Resultados guardados en {file_path}")
    except Exception as e:
        messagebox.showerror("Error", f"Error al guardar los resultados en el archivo Excel:\n{e}")

def ejecutar():
    query = entry_query.get()
    df_resultados = ejecutar_consulta_sql(query)

    if df_resultados is not None:
        # Mostrar resultados en la vista previa
        text_preview.delete('1.0', tk.END)
        text_preview.insert(tk.END, df_resultados.to_string())

        # Habilitar los botones de exportar y limpiar
        btn_exportar.config(state=tk.NORMAL)
        btn_limpiar.config(state=tk.NORMAL)

def exportar_a_excel():
    query = entry_query.get()
    df_resultados = ejecutar_consulta_sql(query)

    if df_resultados is not None:
        # Solicitar al usuario la ubicación donde guardar el archivo Excel
        file_path = filedialog.asksaveasfilename(defaultextension=".xlsx", filetypes=[("Excel files", "*.xlsx")])

        # Verificar si el usuario ha seleccionado un archivo
        if file_path:
            # Guardar resultados en el archivo Excel seleccionado por el usuario
            guardar_resultados_en_excel(df_resultados, file_path)

def limpiar():
    # Limpiar la vista previa
    text_preview.delete('1.0', tk.END)

    # Deshabilitar los botones de exportar y limpiar
    btn_exportar.config(state=tk.DISABLED)
    btn_limpiar.config(state=tk.DISABLED)

def ejecutar_consulta_desde_ui():
    # Declarar las variables como globales
    global entry_query, text_preview, btn_exportar, btn_limpiar

    # Configuración de la ventana principal
    root = tk.Tk()
    root.title("Gestor Documental")

    # Entrada de texto para la consulta SQL
    tk.Label(root, text="Consulta SQL:").grid(row=0, column=0, padx=5, pady=5, sticky="w")
    entry_query = tk.Entry(root, width=50)
    entry_query.grid(row=0, column=1, padx=5, pady=5, sticky="ew")

    # Botón para ejecutar la consulta
    btn_ejecutar = tk.Button(root, text="Ejecutar Consulta", command=ejecutar)
    btn_ejecutar.grid(row=0, column=2, padx=5, pady=5)

    # Vista previa de los resultados
    tk.Label(root, text="Vista Previa:").grid(row=1, column=0, padx=5, pady=5, sticky="w")
    text_preview = scrolledtext.ScrolledText(root, width=70, height=15)
    text_preview.grid(row=2, column=0, columnspan=3, padx=5, pady=5, sticky="ew")

    # Botón para exportar resultados a Excel
    btn_exportar = tk.Button(root, text="Exportar a Excel", command=exportar_a_excel, state=tk.DISABLED)
    btn_exportar.grid(row=3, column=0, padx=5, pady=5)

    # Botón para limpiar la vista previa
    btn_limpiar = tk.Button(root, text="Limpiar", command=limpiar, state=tk.DISABLED)
    btn_limpiar.grid(row=3, column=1, padx=5, pady=5)

    root.mainloop()

if __name__ == "__main__":
    ejecutar_consulta_desde_ui()
