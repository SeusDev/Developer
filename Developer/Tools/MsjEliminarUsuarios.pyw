import tkinter as tk
from tkinter import ttk
import pyperclip

def generar_mensaje():
    identificacion = entrada_identificacion.get()
    correo = entrada_correo.get()

    mensaje = f"Se realiza la eliminación con el correo electrónico ({correo}) obtenido de la información del sistema legado.\n \n"
    mensaje += f"Se realiza la eliminación con la identificación indicada ({identificacion}).\n"  # Agregar salto de línea aquí

    resultado_text.config(state=tk.NORMAL)
    resultado_text.delete("1.0", tk.END)
    resultado_text.insert(tk.END, mensaje)
    resultado_text.config(state=tk.DISABLED)

def limpiar_datos():
    entrada_identificacion.delete(0, tk.END)
    entrada_correo.delete(0, tk.END)
    resultado_text.config(state=tk.NORMAL)
    resultado_text.delete("1.0", tk.END)
    resultado_text.config(state=tk.DISABLED)

def copiar_portapapeles():
    mensaje = resultado_text.get("1.0", tk.END).strip()
    pyperclip.copy(mensaje)

# Crear ventana principal
ventana = tk.Tk()
ventana.title("Eliminación de Usuarios")

# Crear y posicionar elementos en la ventana
frame = ttk.Frame(ventana, padding="20")
frame.pack()

ttk.Label(frame, text="Identificación:").grid(row=0, column=0, pady=5)
entrada_identificacion = ttk.Entry(frame, width=30)
entrada_identificacion.grid(row=0, column=1, pady=5)

ttk.Label(frame, text="Correo electrónico:").grid(row=1, column=0, pady=5)
entrada_correo = ttk.Entry(frame, width=30)
entrada_correo.grid(row=1, column=1, pady=5)

ttk.Button(frame, text="Generar Mensaje", command=generar_mensaje).grid(row=2, column=0, columnspan=2, pady=10)
ttk.Button(frame, text="Limpiar Datos", command=limpiar_datos).grid(row=3, column=0, columnspan=2, pady=5)
ttk.Button(frame, text="Copiar al Portapapeles", command=copiar_portapapeles).grid(row=4, column=0, columnspan=2, pady=5)

resultado_text = tk.Text(frame, height=8, width=50, state=tk.DISABLED)
resultado_text.grid(row=5, column=0, columnspan=2, pady=10)

# Ejecutar la ventana principal
ventana.mainloop()
