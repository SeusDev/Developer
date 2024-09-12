import wx
from datetime import datetime
import pyperclip

class ConcatenadorFechaApp(wx.Frame):
    def __init__(self):
        super().__init__(parent=None, title="Concatenador con Fecha", size=(500, 400))
        self.SetBackgroundColour("#F5F5F5")
        self.SetMinSize((500, 400))
        self.InitUI()

    def InitUI(self):
        panel = wx.Panel(self)
        font = wx.Font(12, wx.FONTFAMILY_DEFAULT, wx.FONTSTYLE_NORMAL, wx.FONTWEIGHT_NORMAL)
        bold_font = wx.Font(12, wx.FONTFAMILY_DEFAULT, wx.FONTSTYLE_NORMAL, wx.FONTWEIGHT_BOLD)

        main_sizer = wx.BoxSizer(wx.VERTICAL)

        # Sección de fecha
        fecha_sizer = wx.BoxSizer(wx.HORIZONTAL)
        label_fecha = wx.StaticText(panel, label="Fecha actual:")
        label_fecha.SetFont(bold_font)
        fecha_sizer.Add(label_fecha, 0, wx.RIGHT, 10)
        self.fecha_actual = wx.StaticText(panel, label=self.obtener_fecha_actual())
        self.fecha_actual.SetFont(font)
        fecha_sizer.Add(self.fecha_actual, 0, wx.RIGHT, 10)
        self.boton_actualizar_fecha = wx.Button(panel, label="Actualizar Fecha", size=(140, 30))
        self.boton_actualizar_fecha.Bind(wx.EVT_BUTTON, self.actualizar_fecha)
        fecha_sizer.Add(self.boton_actualizar_fecha, 0)
        main_sizer.Add(fecha_sizer, 0, wx.EXPAND | wx.ALL, 20)

        # Entrada de texto
        texto_sizer = wx.BoxSizer(wx.HORIZONTAL)
        label_texto = wx.StaticText(panel, label="Ingrese el texto:")
        label_texto.SetFont(bold_font)
        texto_sizer.Add(label_texto, 0, wx.RIGHT, 10)
        self.entrada_texto = wx.TextCtrl(panel, size=(300, -1))
        self.entrada_texto.SetFont(font)
        texto_sizer.Add(self.entrada_texto, 1)
        main_sizer.Add(texto_sizer, 0, wx.EXPAND | wx.LEFT | wx.RIGHT, 20)

        # Combobox para seleccionar el símbolo de concatenación
        self.simbolos = ["-", "_", "@", "#", "*", " ",
         
           ":",
";",
"<",
"=",
">",
"?",
"!",
"#",
"$",
"%",
"&",
"'",
"(",
")",
"*",
"+",
",",
"-",
".",
" / ",
" [ ",
" ] ",
" \ ",
"_",
"`",
"{",
"|",
" } ",
"^"
 ]
        simbolo_sizer = wx.BoxSizer(wx.HORIZONTAL)
        label_simbolo = wx.StaticText(panel, label="Símbolo de concatenación:")
        label_simbolo.SetFont(bold_font)
        simbolo_sizer.Add(label_simbolo, 0, wx.RIGHT, 10)
        self.simbolo_combobox = wx.ComboBox(panel, choices=self.simbolos, style=wx.CB_READONLY)
        self.simbolo_combobox.SetSelection(0)
        self.simbolo_combobox.SetFont(font)
        simbolo_sizer.Add(self.simbolo_combobox, 0)
        main_sizer.Add(simbolo_sizer, 0, wx.EXPAND | wx.LEFT | wx.RIGHT, 20)

        # Botón para concatenar
        self.boton_concatenar = wx.Button(panel, label="Concatenar", size=(150, 30))
        self.boton_concatenar.Bind(wx.EVT_BUTTON, self.concatenar_y_mostrar)
        main_sizer.Add(self.boton_concatenar, 0, wx.ALIGN_CENTER | wx.TOP, 20)

        # Etiqueta para el resultado
        resultado_sizer = wx.BoxSizer(wx.HORIZONTAL)
        label_resultado = wx.StaticText(panel, label="Resultado:")
        label_resultado.SetFont(bold_font)
        resultado_sizer.Add(label_resultado, 0, wx.RIGHT, 10)
        self.resultado_texto = wx.StaticText(panel, label="")
        self.resultado_texto.SetFont(font)
        resultado_sizer.Add(self.resultado_texto, 1)
        main_sizer.Add(resultado_sizer, 0, wx.EXPAND | wx.LEFT | wx.RIGHT, 20)

        # Botones adicionales
        botones_sizer = wx.BoxSizer(wx.HORIZONTAL)
        self.boton_copiar = wx.Button(panel, label="Copiar al portapapeles", size=(170, 30))
        self.boton_copiar.Bind(wx.EVT_BUTTON, self.copiar_al_portapapeles)
        botones_sizer.Add(self.boton_copiar, 0, wx.RIGHT, 10)
        self.boton_limpiar = wx.Button(panel, label="Limpiar", size=(90, 30))
        self.boton_limpiar.Bind(wx.EVT_BUTTON, self.limpiar_datos)
        botones_sizer.Add(self.boton_limpiar, 0, wx.RIGHT, 10)
        self.boton_salir = wx.Button(panel, label="Salir", size=(80, 30))
        self.boton_salir.Bind(wx.EVT_BUTTON, self.salir_aplicacion)
        botones_sizer.Add(self.boton_salir, 0)
        main_sizer.Add(botones_sizer, 0, wx.ALIGN_CENTER | wx.TOP, 20)

        panel.SetSizer(main_sizer)

    def obtener_fecha_actual(self):
        fecha_actual = datetime.now().strftime("%Y%m%d")
        return fecha_actual

    def actualizar_fecha(self, event):
        fecha_actualizada = self.obtener_fecha_actual()
        self.fecha_actual.SetLabel(fecha_actualizada)

    def concatenar_y_mostrar(self, event):
        fecha_actual = self.fecha_actual.GetLabel()
        texto_ingresado = self.entrada_texto.GetValue()
        simbolo_seleccionado = self.simbolo_combobox.GetValue()
        resultado = f"{fecha_actual}{simbolo_seleccionado}{texto_ingresado}.txt"
        self.resultado_texto.SetLabel(resultado)

    def copiar_al_portapapeles(self, event):
        resultado = self.resultado_texto.GetLabel()
        pyperclip.copy(resultado)
        print("Texto copiado al portapapeles exitosamente.")

    def limpiar_datos(self, event):
        self.entrada_texto.Clear()
        self.resultado_texto.SetLabel("")

    def salir_aplicacion(self, event):
        self.Close()

def main():
    app = wx.App()
    frame = ConcatenadorFechaApp()
    frame.Show()
    app.MainLoop()

if __name__ == "__main__":
    main()