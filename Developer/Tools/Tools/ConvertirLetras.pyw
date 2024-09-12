import tkinter as tk
from ttkbootstrap import Style, Frame, Label, Text, Button

def cambiar_caso():
    texto = entrada_texto.get("1.0", "end-1c")
    resultado = ''.join(c.lower() if c.isupper() else c.upper() for c in texto)
    cuadro_resultado.delete("1.0", "end")
    cuadro_resultado.insert("1.0", resultado)

def limpiar():
    entrada_texto.delete("1.0", "end")
    cuadro_resultado.delete("1.0", "end")

def copiar_portapapeles():
    texto = cuadro_resultado.get("1.0", "end-1c")
    pyperclip.copy(texto)

def salir():
    ventana.quit()

ventana = tk.Tk()
ventana.title("Cambiar Mayúsculas/Minúsculas")
ventana.geometry("600x400")

style = Style(theme="cosmo")

frame_entrada = Frame(ventana, padding=10)
frame_entrada.pack(fill="x")

etiqueta_texto = Label(frame_entrada, text="Ingrese el texto:")
etiqueta_texto.pack(side="left")

entrada_texto = Text(frame_entrada, height=5, width=30)
entrada_texto.pack(side="left", fill="both", expand=True)

cuadro_resultado = Text(ventana, height=10, width=50)
cuadro_resultado.pack(pady=10)

frame_botones = Frame(ventana, padding=10)
frame_botones.pack(fill="x")

boton_cambiar_caso = Button(frame_botones, text="Convertir", command=cambiar_caso)
boton_cambiar_caso.pack(side="left", padx=5)

boton_limpiar = Button(frame_botones, text="Limpiar", command=limpiar)
boton_limpiar.pack(side="left", padx=5)

boton_copiar = Button(frame_botones, text="Copiar al Portapapeles", command=copiar_portapapeles)
boton_copiar.pack(side="left", padx=5)

boton_salir = Button(frame_botones, text="Salir", command=salir)
boton_salir.pack(side="left", padx=5)

ventana.mainloop()