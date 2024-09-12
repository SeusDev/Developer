Option Explicit

' Variables de configuración
Dim sourceFolder, destinationFolder
sourceFolder = "C:\Users\sehenao\Downloads" ' Cambia esta ruta a la carpeta de origen
destinationFolder = "C:\Users\sehenao\OneDrive - SISTECREDITO SAS\Carpeta_Temporal" ' Cambia esta ruta a la carpeta de destino

' Crear objetos FileSystemObject
Dim fso
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

' Función para copiar el contenido de una carpeta a otra
Sub CopyFolderContents(srcFolder, destFolder)
    Dim folder, file, subFolder, destSubFolder

    ' Crear la carpeta de destino si no existe
    If Not fso.FolderExists(destFolder) Then
        fso.CreateFolder destFolder
    End If

    ' Copiar archivos
    For Each file In fso.GetFolder(srcFolder).Files
        file.Copy fso.BuildPath(destFolder, file.Name), True ' True indica que se deben reemplazar los archivos existentes
    Next

    ' Copiar subcarpetas
    For Each subFolder In fso.GetFolder(srcFolder).SubFolders
        destSubFolder = fso.BuildPath(destFolder, subFolder.Name)
        CopyFolderContents subFolder.Path, destSubFolder
    Next
End Sub

' Llamar a la función para copiar el contenido de la carpeta de origen a la de destino
CopyFolderContents sourceFolder, destinationFolder

WScript.Echo "Contenido copiado exitosamente de " & sourceFolder & " a " & destinationFolder

' Limpiar los objetos
Set fso = Nothing
