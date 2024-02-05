import tkinter as tk
from tkinter import ttk
import sqlite3
from datetime import datetime

class SistemaInventario:
    def __init__(self, root):
        self.root = root
        self.root.title("Sistema de Inventario")

        # Conectar a la base de datos SQLite
        self.conexion = sqlite3.connect('inventario.db')
        self.crear_tabla()

        # Variables para el formulario
        self.nombre_producto = tk.StringVar()
        self.cantidad_producto = tk.StringVar()
        self.precio_producto = tk.StringVar()

        # Crear y posicionar los widgets
        self.etiqueta_producto = tk.Label(root, text="Nombre del Producto:")
        self.etiqueta_producto.grid(row=0, column=0, padx=10, pady=10)
        self.entrada_producto = tk.Entry(root, textvariable=self.nombre_producto)
        self.entrada_producto.grid(row=0, column=1, padx=10, pady=10)

        self.etiqueta_cantidad = tk.Label(root, text="Cantidad del Producto:")
        self.etiqueta_cantidad.grid(row=1, column=0, padx=10, pady=10)
        self.entrada_cantidad = tk.Entry(root, textvariable=self.cantidad_producto)
        self.entrada_cantidad.grid(row=1, column=1, padx=10, pady=10)

        self.etiqueta_precio = tk.Label(root, text="Precio del Producto:")
        self.etiqueta_precio.grid(row=2, column=0, padx=10, pady=10)
        self.entrada_precio = tk.Entry(root, textvariable=self.precio_producto)
        self.entrada_precio.grid(row=2, column=1, padx=10, pady=10)

        self.boton_agregar = tk.Button(root, text="Agregar Producto", command=self.agregar_producto)
        self.boton_agregar.grid(row=3, column=0, columnspan=2, pady=10)

        # Crear tabla para mostrar el inventario
        self.tabla_inventario = ttk.Treeview(root, columns=('Nombre', 'Cantidad', 'Precio'), show='headings')
        self.tabla_inventario.heading('Nombre', text='Nombre del Producto')
        self.tabla_inventario.heading('Cantidad', text='Cantidad')
        self.tabla_inventario.heading('Precio', text='Precio por Unidad')
        self.tabla_inventario.grid(row=4, column=0, columnspan=2, padx=10, pady=10)

        self.cargar_inventario()

    def crear_tabla(self):
        cursor = self.conexion.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS productos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT,
                cantidad INTEGER,
                precio REAL
            )
        ''')
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS transacciones (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                producto_id INTEGER,
                cantidad INTEGER,
                fecha TEXT,
                FOREIGN KEY (producto_id) REFERENCES productos (id)
            )
        ''')
        self.conexion.commit()

    def agregar_producto(self):
        nombre = self.nombre_producto.get()
        cantidad = int(self.cantidad_producto.get())
        precio = float(self.precio_producto.get())

        # Insertar datos en la tabla de productos
        cursor = self.conexion.cursor()
        cursor.execute('INSERT INTO productos (nombre, cantidad, precio) VALUES (?, ?, ?)', (nombre, cantidad, precio))
        producto_id = cursor.lastrowid

        # Insertar transacción en la tabla de transacciones
        fecha_actual = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        cursor.execute('INSERT INTO transacciones (producto_id, cantidad, fecha) VALUES (?, ?, ?)', (producto_id, cantidad, fecha_actual))

        # Confirmar la transacción
        self.conexion.commit()

        # Limpiar el formulario
        self.nombre_producto.set('')
        self.cantidad_producto.set('')
        self.precio_producto.set('')

        # Recargar la tabla del inventario
        self.cargar_inventario()

    def cargar_inventario(self):
        # Limpiar la tabla del inventario
        for row in self.tabla_inventario.get_children():
            self.tabla_inventario.delete(row)

        # Consultar la base de datos y cargar el inventario en la tabla
        cursor = self.conexion.cursor()
        cursor.execute('SELECT * FROM productos')
        productos = cursor.fetchall()

        for producto in productos:
            self.tabla_inventario.insert('', 'end', values=producto[1:])

if __name__ == "__main__":
    root = tk.Tk()
    app = SistemaInventario(root)
    root.mainloop()
