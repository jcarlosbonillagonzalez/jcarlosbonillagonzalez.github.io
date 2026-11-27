# Publica este sitio en GitHub Pages (repositorio <usuario>.github.io)
# Requisitos: Git y GitHub CLI (gh). Ejecutar con publicar.bat
$ErrorActionPreference = 'Continue'
Set-Location $PSScriptRoot

function Salir($msg) { Write-Host $msg -ForegroundColor Red; Read-Host 'Presiona Enter para salir'; exit 1 }

if (-not (Get-Command git -ErrorAction SilentlyContinue)) { Salir 'Falta Git. Instalalo con:  winget install Git.Git   y vuelve a ejecutar publicar.bat' }
if (-not (Get-Command gh  -ErrorAction SilentlyContinue)) { Salir 'Falta GitHub CLI. Instalalo con:  winget install GitHub.cli   cierra esta ventana y vuelve a ejecutar publicar.bat' }

gh auth status *> $null
if ($LASTEXITCODE -ne 0) {
  Write-Host 'Inicia sesion en GitHub (se abrira el navegador)...' -ForegroundColor Cyan
  gh auth login --web --git-protocol https --hostname github.com
  if ($LASTEXITCODE -ne 0) { Salir 'No se pudo iniciar sesion en GitHub.' }
}
gh auth setup-git *> $null

$user = (gh api user --jq .login).Trim()
$id   = (gh api user --jq .id).Trim()
$repo = "$user.github.io"

Write-Host ''
Write-Host "Usuario de GitHub:  $user" -ForegroundColor Green
Write-Host "Repositorio:        https://github.com/$user/$repo  (PUBLICO)"
Write-Host "Sitio publicado en: https://$repo"
Write-Host ''
$ok = Read-Host 'Continuar con la publicacion? (s/n)'
if ($ok -ne 's') { Write-Host 'Cancelado.'; exit 0 }

if (-not (Test-Path .git)) { git init -b main | Out-Null }
if (-not (git config user.name))  { git config user.name  $user }
if (-not (git config user.email)) { git config user.email "$id+$user@users.noreply.github.com" }

git add -A
git commit -m "Sitio web personal: hoja de vida y servicios" | Out-Null

gh repo view "$user/$repo" *> $null
if ($LASTEXITCODE -eq 0) {
  Write-Host "El repositorio $repo ya existe; se subiran los archivos ahi." -ForegroundColor Yellow
  git remote remove origin *> $null
  git remote add origin "https://github.com/$user/$repo.git"
  git push -u origin main
  if ($LASTEXITCODE -ne 0) { Salir 'GitHub rechazo el envio (el repositorio ya tiene otros archivos). Avisale a Claude para resolverlo.' }
} else {
  gh repo create $repo --public --source . --remote origin --push --description 'Sitio web personal de Juan Carlos Bonilla: desarrollo web y sistemas a la medida'
  if ($LASTEXITCODE -ne 0) { Salir 'No se pudo crear el repositorio.' }
}

# Activar GitHub Pages desde la rama main (si ya esta activo, no pasa nada)
gh api -X POST "repos/$user/$repo/pages" -f "source[branch]=main" -f "source[path]=/" *> $null

Write-Host ''
Write-Host 'Listo. En 1 o 2 minutos tu sitio estara en linea en:' -ForegroundColor Green
Write-Host "  https://$repo" -ForegroundColor Green
Write-Host "Estado de la publicacion: https://github.com/$user/$repo/actions"
Start-Process "https://github.com/$user/$repo"
Read-Host 'Presiona Enter para cerrar'
