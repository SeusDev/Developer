edad=input("Ingresa la edad")

edad= int(edad)

if edad >= 20: 
    print("Puedes ver la pelicula con descuento")
elif edad > 17:
    print("Puedes ver la pelicula")
else:
    print("No puedes entrar")
    print("Ve a otro lado")
