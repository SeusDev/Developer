import tkinter as tk

def click_boton(valor):
    actual = entrada.get()
    entrada.delete(0, tk.END)
    entrada.insert(tk.END, str(actual) + str(valor))

def borrar():
    entrada.delete(0, tk.END)

def calcular():
    try:
        resultado = eval(entrada.get())
        entrada.delete(0, tk.END)
        entrada.insert(tk.END, str(resultado))
    except Exception as e:
        entrada.delete(0, tk.END)
        entrada.insert(tk.END, "Error")

# Crear la ventana principal
ventana = tk.Tk()
ventana.title("Calculadora")

# Crear la entrada
entrada = tk.Entry(ventana, width=20, font=('Arial', 16))
entrada.grid(row=0, column=0, columnspan=4)

# Definir los botones
botones = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+'
]

# Configurar los botones
row_val = 1
col_val = 0

for boton in botones:
    tk.Button(ventana, text=boton, width=5, height=2, command=lambda valor=boton: click_boton(valor) if valor != '=' else calcular()).grid(row=row_val, column=col_val)
    col_val += 1
    if col_val > 3:
        col_val = 0
        row_val += 1

# Iniciar el bucle principal
ventana.mainloop()
