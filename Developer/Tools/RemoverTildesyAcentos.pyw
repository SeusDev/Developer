import tkinter as tk
import tkinter.font as tkfont
import pyperclip
import ttkbootstrap as ttk
import unicodedata
from ttkbootstrap.constants import *

def remove_accents(text):
    return ''.join(c for c in unicodedata.normalize('NFD', text) if unicodedata.category(c) != 'Mn')

def remove_accents_and_copy():
    text = input_text_area.get("1.0", "end-1c")
    cleaned_text = remove_accents(text)
    output_text_area.configure(state="normal")
    output_text_area.delete("1.0", "end")
    output_text_area.insert("end", cleaned_text)
    output_text_area.configure(state="disabled")

def copy_to_clipboard():
    text = output_text_area.get("1.0", "end-1c")
    pyperclip.copy(text)

def clear_text():
    input_text_area.delete("1.0", "end")
    output_text_area.configure(state="normal")
    output_text_area.delete("1.0", "end")
    output_text_area.configure(state="disabled")

def exit_app():
    root.destroy()

root = ttk.Window(themename="cosmo")
root.title("Remover Tildes y Acentos")

main_font = tkfont.Font(family="Segoe UI", size=12)
root.option_add("*Font", main_font)

input_frame = ttk.Frame(root, padding=20)
input_frame.pack(pady=10)

input_text_area = tk.Text(input_frame, height=10, width=40)
input_text_area.pack(side=LEFT, padx=10)

buttons_frame = ttk.Frame(input_frame)
buttons_frame.pack(side=LEFT, padx=10, fill=BOTH)

remove_accents_button = ttk.Button(buttons_frame, text="Remover Tildes y Acentos", command=remove_accents_and_copy, width=20)
remove_accents_button.pack(pady=5)

clear_button = ttk.Button(buttons_frame, text="Limpiar", command=clear_text, width=20)
clear_button.pack(pady=5)

exit_button = ttk.Button(buttons_frame, text="Salir", command=exit_app, width=20)
exit_button.pack(pady=5)

output_frame = ttk.Frame(root, padding=20)
output_frame.pack(pady=10)

output_text_area = tk.Text(output_frame, height=10, width=40, state="disabled")
output_text_area.pack(side=LEFT, padx=10)

copy_button = ttk.Button(output_frame, text="Copiar al Portapapeles", command=copy_to_clipboard, width=20)
copy_button.pack(side=LEFT, padx=10)

root.mainloop()