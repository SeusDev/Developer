from datetime import datetime

def restar_fechas(fecha1, fecha2):
    # Convertir las fechas a objetos datetime
    fecha1_obj = datetime.strptime(fecha1, '%Y-%m-%d')
    fecha2_obj = datetime.strptime(fecha2, '%Y-%m-%d')

    # Calcular la diferencia entre las fechas
    diferencia = fecha2_obj - fecha1_obj

    # Obtener el número de días transcurridos
    dias_transcurridos = diferencia.days

    return dias_transcurridos

# Ejemplo de uso
fecha_inicio = input("Ingrese la fecha de inicio (formato YYYY-MM-DD): ")
fecha_fin = input("Ingrese la fecha de fin (formato YYYY-MM-DD): ")

resultado = restar_fechas(fecha_inicio, fecha_fin)
print(f"El número de días transcurridos entre {fecha_inicio} y {fecha_fin} es: {resultado} días.")
