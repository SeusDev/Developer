import tkinter as tk
from tkinter import messagebox
import pyperclip

def generar_url():
    valor = entry_valor.get()
    if valor:
        url = f"https://apps.sae1.pure.cloud/directory/#/analytics/interactions/{valor}/admin?tabId=2"
        pyperclip.copy(url)
        messagebox.showinfo("URL Generada", f"La URL generada es:\n{url}\n\nLa URL ha sido copiada al portapapeles.")
    else:
        messagebox.showwarning("Entrada Vacía", "Por favor, ingrese un valor.")

# Configuración de la interfaz gráfica
root = tk.Tk()
root.title("Generador de URL")
root.geometry("500x300")
root.config(bg="#e0f7fa")  # Fondo de color azul claro

# Etiqueta de título
label_titulo = tk.Label(root, text="Generador de URL", font=("Arial", 20, "bold"), bg="#e0f7fa", fg="#00796b")
label_titulo.pack(pady=20)

# Etiqueta y campo de entrada para el valor
label_valor = tk.Label(root, text="Ingrese el valor:", font=("Arial", 14), bg="#e0f7fa", fg="#004d40")
label_valor.pack(pady=10)

entry_valor = tk.Entry(root, font=("Arial", 14), width=30)
entry_valor.pack(pady=10)

# Botón para generar la URL
btn_generar = tk.Button(root, text="Generar URL", font=("Arial", 14, "bold"), bg="#004d40", fg="white", command=generar_url)
btn_generar.pack(pady=20)

# Iniciar la aplicación
root.mainloop()
