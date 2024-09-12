$sourceFolder = "C:\Users\sehenao\Downloads"  # Cambia esta ruta a la carpeta de origen
$vbsScript = "C:\Users\sehenao\OneDrive - SISTECREDITO SAS\Carpeta_Temporal"  # Cambia esta ruta a tu script VBS

# Crear un objeto FileSystemWatcher para monitorear la carpeta
$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $sourceFolder
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true

# Definir la acción a tomar cuando ocurra un cambio en la carpeta
$action = {
    Start-Process "cscript.exe" -ArgumentList "`"$vbsScript`""
}

# Registrar eventos
Register-ObjectEvent $watcher "Changed" -Action $action
Register-ObjectEvent $watcher "Created" -Action $action
Register-ObjectEvent $watcher "Deleted" -Action $action
Register-ObjectEvent $watcher "Renamed" -Action $action

# Mantener el script en ejecución
while ($true) { Start-Sleep 1 }
