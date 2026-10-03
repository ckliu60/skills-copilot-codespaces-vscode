# 開機速度清理腳本 (Windows 10/11) — 請以「系統管理員」身分執行 PowerShell
# 只做:報告 → 清暫存 → 修復系統檔。不會自動停用任何啟動項目。

$ErrorActionPreference = 'SilentlyContinue'

Write-Host "`n[1/5] 最近 5 次開機耗時 (秒)" -ForegroundColor Cyan
Get-WinEvent -FilterHashtable @{LogName='Microsoft-Windows-Diagnostics-Performance/Operational'; Id=100} -MaxEvents 5 |
  Select-Object TimeCreated,
    @{n='BootTime_s'; e={ [math]::Round(([xml]$_.ToXml()).Event.EventData.Data[1].'#text' / 1000, 1) }} |
  Format-Table -AutoSize

Write-Host "[2/5] 開機自啟項目 (請自行到 工作管理員 → 啟動應用程式 停用非必要項)" -ForegroundColor Cyan
Get-CimInstance Win32_StartupCommand |
  Select-Object Name, Command, Location | Format-Table -AutoSize

Write-Host "[3/5] C 槽剩餘空間" -ForegroundColor Cyan
$c = Get-PSDrive C
"{0:N1} GB 可用 / {1:N1} GB 總計 ({2:P0} 可用)" -f ($c.Free/1GB), (($c.Used+$c.Free)/1GB), ($c.Free/($c.Used+$c.Free))

Write-Host "`n[4/5] 清除暫存檔" -ForegroundColor Cyan
$before = $c.Free
Remove-Item "$env:TEMP\*" -Recurse -Force
Remove-Item "C:\Windows\Temp\*" -Recurse -Force
$after = (Get-PSDrive C).Free
"釋放約 {0:N0} MB" -f (($after-$before)/1MB)

Write-Host "`n[5/5] 系統檔檢查與修復 (需數分鐘)" -ForegroundColor Cyan
sfc /scannow
DISM /Online /Cleanup-Image /RestoreHealth

Write-Host "`n完成。請重新開機,再執行本腳本的步驟 [1/5] 比較開機秒數。" -ForegroundColor Green
