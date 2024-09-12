import tkinter as tk
import tkinter.font as tkfont
import tkinter.scrolledtext as tkscrolledtext
from tkinter import ttk
import pyperclip

def concatenar_texto():
    caracter1 = entry_caracter1.get()
    caracter2 = entry_caracter2.get()
    texto = text_scroll.get("1.0", tk.END).strip()

    if not texto:
        resultado.set("Por favor, ingresa el texto a concatenar.")
        return

    lineas = texto.split('\n')
    texto_concatenado = ''
    for linea in lineas:
        if linea:
            if opcion.get() == "horizontal":
                texto_concatenado += f"{caracter1}{linea.strip()}{caracter2} "
            elif opcion.get() == "vertical":
                texto_concatenado += f"{caracter1}{linea.strip()}{caracter2}\n"

    resultado_text_scroll.delete("1.0", tk.END)
    resultado_text_scroll.insert(tk.END, texto_concatenado.strip())

    if opcion.get() == "horizontal":
        resultado.set("Texto concatenado horizontalmente.")
    elif opcion.get() == "vertical":
        resultado.set("Texto concatenado verticalmente.")

def limpiar_datos():
    entry_caracter1.delete(0, tk.END)
    entry_caracter2.delete(0, tk.END)
    text_scroll.delete("1.0", tk.END)
    resultado_text_scroll.delete("1.0", tk.END)
    resultado.set("")
    opcion.set("")

def copiar_resultado():
    pyperclip.copy(resultado_text_scroll.get("1.0", tk.END))

def salir_aplicacion():
    root.quit()

# Crear la ventana principal
root = tk.Tk()
root.title("Concatenador de Texto Horizontal/Vertical")
root.geometry("800x600")

main_font = tkfont.Font(family="Segoe UI", size=12)
root.option_add("*Font", main_font)

# Variable para la opción de concatenación
opcion = tk.StringVar(value="")

# Marco para contener los controles de entrada
frame_controles = ttk.Frame(root, padding=20)
frame_controles.pack(fill=tk.BOTH, expand=True)

# Etiqueta y entrada para el primer caracter de concatenación
caracter1_label = ttk.Label(frame_controles, text="Caracter de concatenación (Opl):")
caracter1_label.grid(row=0, column=0, sticky=tk.W, padx=5, pady=5)
entry_caracter1 = ttk.Entry(frame_controles)
entry_caracter1.grid(row=0, column=1, sticky=tk.EW, padx=5, pady=5)

# Etiqueta y entrada para el segundo caracter de concatenación
caracter2_label = ttk.Label(frame_controles, text="Caracter de concatenación (Op2):")
caracter2_label.grid(row=1, column=0, sticky=tk.W, padx=5, pady=5)
entry_caracter2 = ttk.Entry(frame_controles)
entry_caracter2.grid(row=1, column=1, sticky=tk.EW, padx=5, pady=5)

# Opciones de concatenación horizontal o vertical
horizontal_radio = ttk.Radiobutton(frame_controles, text="Horizontal", variable=opcion, value="horizontal")
horizontal_radio.grid(row=2, column=0, sticky=tk.W, padx=5, pady=5)

vertical_radio = ttk.Radiobutton(frame_controles, text="Vertical", variable=opcion, value="vertical")
vertical_radio.grid(row=2, column=1, sticky=tk.W, padx=5, pady=5)

# Etiqueta y ScrolledText para el texto a concatenar
texto_label = ttk.Label(frame_controles, text="Texto a concatenar (una línea por entrada):")
texto_label.grid(row=3, column=0, sticky=tk.W, padx=5, pady=5)
text_scroll = tkscrolledtext.ScrolledText(frame_controles, height=10, width=40)
text_scroll.grid(row=4, column=0, columnspan=2, sticky=tk.EW, padx=5, pady=5)

# Marco para contener los botones
frame_botones = ttk.Frame(root, padding=20)
frame_botones.pack(fill=tk.X)

# Botón para concatenar
button_concatenar = ttk.Button(frame_botones, text="Concatenar", command=concatenar_texto)
button_concatenar.pack(side=tk.LEFT, padx=5, pady=5)

# Botón para limpiar los datos ingresados
button_limpiar = ttk.Button(frame_botones, text="Limpiar Datos", command=limpiar_datos)
button_limpiar.pack(side=tk.LEFT, padx=5, pady=5)

# Botón para copiar el resultado al portapapeles
button_copiar = ttk.Button(frame_botones, text="Copiar al Portapapeles", command=copiar_resultado)
button_copiar.pack(side=tk.LEFT, padx=5, pady=5)

# Botón para salir de la aplicación
button_salir = ttk.Button(frame_botones, text="Salir", command=salir_aplicacion)
button_salir.pack(side=tk.RIGHT, padx=5, pady=5)

# Marco para contener el resultado
frame_resultado = ttk.Frame(root, padding=20)
frame_resultado.pack(fill=tk.BOTH, expand=True)

# Etiqueta para mostrar el resultado
resultado = tk.StringVar()
resultado_label = ttk.Label(frame_resultado, textvariable=resultado)
resultado_label.pack()

# ScrolledText para mostrar el resultado
resultado_text_scroll = tkscrolledtext.ScrolledText(frame_resultado, height=10, width=40)
resultado_text_scroll.pack(fill=tk.BOTH, expand=True)

# Ejecutar la interfaz gráfica
root.mainloop()

