import tkinter as tk
from tkinter import ttk
from datetime import datetime
from tkinter import simpledialog
from tkcalendar import DateEntry

# Función para calcular la diferencia entre dos fechas
def calcular_diferencia():
    try:
        fecha1 = entrada_fecha1.get_date()
        fecha2 = entrada_fecha2.get_date()
        diferencia = fecha2 - fecha1
        resultado_label.config(text=f"La diferencia es: {diferencia.days} días")
    except ValueError:
        resultado_label.config(text="Fecha inválida.")

# Función para borrar las entradas de fecha
def borrar_datos():
    entrada_fecha1.set_date(datetime.today())
    entrada_fecha2.set_date(datetime.today())
    resultado_label.config(text="")

# Función para copiar el resultado al portapapeles
def copiar_resultado():
    root.clipboard_clear()
    root.clipboard_append(resultado_label.cget("text"))

# Función para salir de la aplicación
def salir_app():
    root.destroy()

# Crear la ventana principal
root = tk.Tk()
root.title("Calculadora de Diferencia de Fechas")
root.geometry("400x300")

# Estilo para los botones
style = ttk.Style()
style.theme_use("clam")  # Estilo moderno y llamativo

# Entradas de fecha con calendario
entrada_fecha1 = DateEntry(root, width=12, background='darkblue', foreground='white', borderwidth=2, date_pattern='yyyy-mm-dd')
entrada_fecha1.pack(padx=10, pady=10)

entrada_fecha2 = DateEntry(root, width=12, background='darkblue', foreground='white', borderwidth=2, date_pattern='yyyy-mm-dd')
entrada_fecha2.pack(padx=10, pady=10)

# Botones
calcular_button = ttk.Button(root, text="Calcular", command=calcular_diferencia)
calcular_button.pack(pady=10)

borrar_button = ttk.Button(root, text="Borrar Datos", command=borrar_datos)
borrar_button.pack(pady=10)

copiar_button = ttk.Button(root, text="Copiar Resultado", command=copiar_resultado)
copiar_button.pack(pady=10)

salir_button = ttk.Button(root, text="Salir", command=salir_app)
salir_button.pack(pady=10)

# Etiqueta para mostrar el resultado
resultado_label = ttk.Label(root, text="")
resultado_label.pack(pady=10)

# Inicializar las entradas de fecha con la fecha actual
entrada_fecha1.set_date(datetime.today())
entrada_fecha2.set_date(datetime.today())

# Iniciar el bucle principal de la aplicación
root.mainloop()