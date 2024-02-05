from num2words import num2words

def convertir_numero_a_letras(numero):
    resultado = num2words(numero, lang='es')
    return resultado

# Ejemplo de uso
numero_ingresado = int(input("Ingrese un número: "))
resultado_letras = convertir_numero_a_letras(numero_ingresado)
print(f"{numero_ingresado} en letras es: {resultado_letras}")

