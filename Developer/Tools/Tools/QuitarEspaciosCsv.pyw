import tkinter as tk
from tkinter import ttk
from tkinter import filedialog
from tkinter import messagebox
import pandas as pd
import re

class CSVCleanerApp:
    def __init__(self, master):
        self.master = master
        master.title("Limpieza de Archivo CSV")
        master.geometry("400x200")

        self.frame = ttk.Frame(master)
        self.frame.pack(padx=10, pady=10)

        self.label = ttk.Label(self.frame, text="Seleccione un archivo CSV para limpiar:")
        self.label.grid(row=0, column=0, columnspan=2, padx=5, pady=5)

        self.entry = ttk.Entry(self.frame, width=40)
        self.entry.grid(row=1, column=0, padx=5, pady=5)

        self.button_examinar = ttk.Button(self.frame, text="Examinar", command=self.examinar_archivo)
        self.button_examinar.grid(row=1, column=1, padx=5, pady=5)

        self.button_limpiar = ttk.Button(master, text="Limpiar CSV", command=self.limpiar_csv)
        self.button_limpiar.pack(pady=10)

    def examinar_archivo(self):
        archivo_csv = filedialog.askopenfilename(title="Seleccionar archivo CSV", filetypes=[("Archivos CSV", "*.csv")])
        if archivo_csv:
            self.entry.delete(0, tk.END)
            self.entry.insert(0, archivo_csv)

    def limpiar_csv(self):
        archivo_entrada = self.entry.get()
        if archivo_entrada:
            archivo_salida = filedialog.asksaveasfilename(title="Guardar archivo CSV limpio", filetypes=[("Archivos CSV", "*.csv")], defaultextension=".csv")
            if archivo_salida:
                try:
                    # Cargar el archivo CSV
                    df = pd.read_csv(archivo_entrada)
                    
                    # Reemplazar dobles espacios por un solo espacio en todo el DataFrame
                    df = df.applymap(lambda x: re.sub(' {2,}', ' ', str(x)) if isinstance(x, str) else x)

                    # Guardar el DataFrame limpio en un nuevo archivo CSV
                    df.to_csv(archivo_salida, index=False)
                    
                    messagebox.showinfo("Éxito", "Archivo CSV limpiado exitosamente.")
                except Exception as e:
                    messagebox.showerror("Error", f"Error al limpiar el archivo CSV: {e}")
        else:
            messagebox.showwarning("Advertencia", "Por favor seleccione un archivo CSV para limpiar.")

if __name__ == "__main__":
    root = tk.Tk()
    app = CSVCleanerApp(root)
    root.mainloop()
