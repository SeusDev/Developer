import tkinter as tk
import tkinter.font as tkfont
import tkinter.scrolledtext as tkscrolledtext
import pyperclip
from tkinter import ttk

# Texto base con marcadores [Cedula] y [Correo]
texto_base = """
Cordial saludo,

Es un gusto atender su requerimiento.

Se realiza la eliminación del cliente las siguientes bases de datos :


App Sistecrédito Personas:

Lugar #1 "DBIdentity_co" 


-- Se realiza la eliminación con el correo electrónico ([Correo]) obtenido de la información del sistema legado.


Lugar #2 "DBRequests_co.customerAuthorizeCenter" 


-- Se realiza la eliminación con el correo electrónico ([Correo]) obtenido de la información del sistema legado.


Lugar #3 "DBRequests_co.customerAuthentication" 


-- Se realiza la eliminación con el correo electrónico ([Correo]) obtenido de la información del sistema legado.


Aplicativo CrediNet:


Lugar #3 "DBRequests_co.requests"

-- Se realiza la eliminación con la identificación indicada ([Cedula])


Lugar #2 "DBRequests_co.customer"

-- Se realiza la eliminación con la identificación indicada ([Cedula])



Sistema Legado:

Aplicación de ajuste cliente:


Quedo atento a cualquier duda e inquietud.


Feliz día.
"""

def generar_texto():
    cedula = entry_cedula.get()
    correo = entry_correo.get()
    
    if not cedula or not correo:
        resultado.set("Por favor, ingresa valores para Cedula y Correo.")
        return
    
    texto_generado = texto_base.replace("[Cedula]", cedula).replace("[Correo]", correo)
    resultado_text_scroll.delete("1.0", tk.END)
    resultado_text_scroll.insert(tk.END, texto_generado)

def copiar_resultado():
    pyperclip.copy(resultado_text_scroll.get("1.0", tk.END))

def limpiar_datos():
    entry_cedula.delete(0, tk.END)
    entry_correo.delete(0, tk.END)
    resultado_text_scroll.delete("1.0", tk.END)
    resultado.set("")

# Crear la ventana principal
root = tk.Tk()
root.title("Reemplazar Cedula y Correo en Texto")
root.geometry("800x600")

main_font = tkfont.Font(family="Segoe UI", size=12)
root.option_add("*Font", main_font)

# Marco para contener los controles de entrada
frame_controles = ttk.Frame(root, padding=20)
frame_controles.pack(fill=tk.BOTH, expand=True)

# Etiqueta y entrada para Cedula
cedula_label = ttk.Label(frame_controles, text="Cedula:")
cedula_label.grid(row=0, column=0, sticky=tk.W, padx=5, pady=5)
entry_cedula = ttk.Entry(frame_controles)
entry_cedula.grid(row=0, column=1, sticky=tk.EW, padx=5, pady=5)

# Etiqueta y entrada para Correo
correo_label = ttk.Label(frame_controles, text="Correo:")
correo_label.grid(row=1, column=0, sticky=tk.W, padx=5, pady=5)
entry_correo = ttk.Entry(frame_controles)
entry_correo.grid(row=1, column=1, sticky=tk.EW, padx=5, pady=5)

# Marco para contener los botones
frame_botones = ttk.Frame(root, padding=20)
frame_botones.pack(fill=tk.X)

# Botón para generar el texto
button_generar = ttk.Button(frame_botones, text="Generar Texto", command=generar_texto)
button_generar.pack(side=tk.LEFT, padx=5, pady=5)

# Botón para copiar el resultado al portapapeles
button_copiar = ttk.Button(frame_botones, text="Copiar al Portapapeles", command=copiar_resultado)
button_copiar.pack(side=tk.LEFT, padx=5, pady=5)

# Botón para limpiar los datos
button_limpiar = ttk.Button(frame_botones, text="Limpiar Datos", command=limpiar_datos)
button_limpiar.pack(side=tk.LEFT, padx=5, pady=5)

# Botón para salir de la aplicación
button_salir = ttk.Button(frame_botones, text="Salir", command=root.quit)
button_salir.pack(side=tk.RIGHT, padx=5, pady=5)

# Marco para contener el resultado
frame_resultado = ttk.Frame(root, padding=20)
frame_resultado.pack(fill=tk.BOTH, expand=True)

# Etiqueta para mostrar el resultado
resultado = tk.StringVar()
resultado_label = ttk.Label(frame_resultado, textvariable=resultado)
resultado_label.pack()

# ScrolledText para mostrar el resultado
resultado_text_scroll = tkscrolledtext.ScrolledText(frame_resultado, height=20, width=80)
resultado_text_scroll.pack(fill=tk.BOTH, expand=True)

# Ejecutar la interfaz gráfica
root.mainloop()
