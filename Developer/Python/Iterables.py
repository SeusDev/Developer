buscar = 10
for numero in range(5):
    print(numero)
    if numero == buscar:
        print ("El numero es: ", numero)
        break
else:
    print ("No se encontró el numero")


for char in "Ultimate python":
    print(char)