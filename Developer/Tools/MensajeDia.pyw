import datetime
import tkinter as tk
import pyperclip

def mostrar_saludo():
    # Obtener la hora actual
    hora_actual = datetime.datetime.now().hour

    # Determinar el mensaje de saludo apropiado según la hora actual
    if hora_actual < 12:
        mensaje = "Buenos días,"
    elif hora_actual < 18:
        mensaje = "Buenas tardes,"
    else:
        mensaje = "Buenas noches,"

    # Actualizar el texto de la etiqueta con el nuevo mensaje
    etiqueta_mensaje.config(text=mensaje)

# Crear una ventana principal para la interfaz gráfica de usuario
ventana_principal = tk.Tk()
ventana_principal.title("Saludo")

# Crear un etiqueta para mostrar el mensaje de saludo
etiqueta_mensaje = tk.Label(ventana_principal, font=("Arial", 18))
etiqueta_mensaje.pack(padx=20, pady=20)

# Llamar a la función mostrar_saludo para mostrar el saludo inicial
mostrar_saludo()

# Crear un botón para copiar el mensaje al portapapeles
boton_copiar = tk.Button(ventana_principal, text="Copiar al portapapeles", command=lambda: pyperclip.copy(etiqueta_mensaje.cget("text")))
boton_copiar.pack(padx=20, pady=20)

# Crear un botón para actualizar la fecha
boton_actualizar = tk.Button(ventana_principal, text="Actualizar Fecha", command=mostrar_saludo)
boton_actualizar.pack(padx=20, pady=20)

# Crear un botón para salir de la aplicación
boton_salir = tk.Button(ventana_principal, text="Salir", command=ventana_principal.quit)
boton_salir.pack(padx=20, pady=20)

# Iniciar el bucle principal de la interfaz gráfica de usuario
ventana_principal.mainloop()