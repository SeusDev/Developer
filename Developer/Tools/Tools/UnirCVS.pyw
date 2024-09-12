import os
import pandas as pd
import tkinter as tk
from tkinter import filedialog, ttk, messagebox

def unir_archivos():
    archivos_csv = filedialog.askopenfilenames(
        title="Seleccionar archivos CSV",
        filetypes=[("Archivos CSV", "*.csv")]
    )

    if archivos_csv:
        dataframes = []
        total_registros = 0

        # Crear la barra de progreso
        barra_progreso = ttk.Progressbar(ventana, mode="determinate")
        barra_progreso.pack(pady=10)

        for i, archivo in enumerate(archivos_csv, start=1):
            df = pd.read_csv(archivo)
            dataframes.append(df)
            total_registros += len(df)

            # Actualizar la barra de progreso
            progreso = (i / len(archivos_csv)) * 100
            barra_progreso.config(value=progreso)
            ventana.update_idletasks()

        df_unificado = pd.concat(dataframes, ignore_index=True)

        ruta_salida = filedialog.asksaveasfilename(
            title="Guardar archivo unificado",
            defaultextension=".csv",
            filetypes=[("Archivos CSV", "*.csv")]
        )

        if ruta_salida:
            df_unificado.to_csv(ruta_salida, index=False)
            mostrar_mensaje(f"Archivos unidos exitosamente. Total de registros: {total_registros}", "green")
            messagebox.showinfo("Archivo guardado", f"El archivo CSV unificado se ha guardado en:\n{ruta_salida}")
        else:
            mostrar_mensaje("No se seleccionó ruta de salida", "red")

        # Ocultar la barra de progreso
        barra_progreso.pack_forget()
    else:
        mostrar_mensaje("No se seleccionaron archivos CSV", "red")

def mostrar_mensaje(mensaje, color):
    mensaje_label.config(text=mensaje, foreground=color)

def salir_app():
    ventana.destroy()

# Crear la ventana principal
ventana = tk.Tk()
ventana.title("Unir archivos CSV")
ventana.geometry("400x200")
ventana.configure(bg="#F0F0F0")

# Estilo de botones y etiquetas
estilo = ttk.Style()
estilo.theme_use("clam")

# Crear etiqueta de mensaje
mensaje_label = ttk.Label(ventana, text="", font=("Arial", 12))
mensaje_label.pack(pady=10)

# Crear botón para seleccionar archivos
boton_seleccionar = ttk.Button(ventana, text="Seleccionar archivos CSV", command=unir_archivos, style="Accent.TButton")
boton_seleccionar.pack(pady=10)

# Crear botón de salida
boton_salir = ttk.Button(ventana, text="Salir", command=salir_app, style="Accent.TButton")
boton_salir.pack(pady=10)

# Iniciar el bucle principal de la aplicación
ventana.mainloop()