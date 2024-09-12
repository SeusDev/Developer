Option Explicit

' Variables de configuración
Dim sourceFolder, destinationFolder
sourceFolder = "C:\Users\sehenao\Downloads ' Cambia esta ruta a la carpeta de origen
destinationFolder = "C:\Users\sehenao\OneDrive - SISTECREDITO SAS\Carpeta_Temporal" ' Cambia esta ruta a la carpeta de destino

' Crear objetos FileSystemObject
Dim fso, folder, file
Set fso = CreateObject("Scripting.FileSystemObject")

' Comprobar si las carpetas existen
If Not fso.FolderExists(sourceFolder) Then
    WScript.Echo "La carpeta de origen no existe: " & sourceFolder
    WScript.Quit
End If

If Not fso.FolderExists(destinationFolder) Then
    WScript.Echo "La carpeta de destino no existe: " & destinationFolder
    WScript.Quit
End If

' Obtener la carpeta de origen
Set folder = fso.GetFolder(sourceFolder)

' Recorrer todos los archivos en la carpeta de origen
For Each file In folder.Files
    ' Construir la ruta completa para el archivo de destino
    Dim destFilePath
    destFilePath = fso.BuildPath(destinationFolder, fso.GetFileName(file))

    ' Copiar el archivo y reemplazar si ya existe
    file.Copy destFilePath, True ' True indica que se deben reemplazar los archivos existentes
Next

WScript.Echo "Archivos copiados exitosamente de " & sourceFolder & " a " & destinationFolder

' Limpiar los objetos
Set file = Nothing
Set folder = Nothing
Set fso = Nothing
