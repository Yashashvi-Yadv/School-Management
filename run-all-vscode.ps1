# Open Client in VS Code
Start-Process code -ArgumentList "-n", "Client"
Start-Sleep -Seconds 2

# Open Gateway in VS Code
Start-Process code -ArgumentList "-n", "Server/gateway"
Start-Sleep -Seconds 2

# Open Authentication Service in VS Code
Start-Process code -ArgumentList "-n", "Server/services/Authenticatio-service"
Start-Sleep -Seconds 2

# Open Student Service in VS Code
Start-Process code -ArgumentList "-n", "Server/services/Student-service"
Start-Sleep -Seconds 2

# Open Teacher Service in VS Code
Start-Process code -ArgumentList "-n", "Server/services/Teacher-service"
Start-Sleep -Seconds 2

# Instructions: In each VS Code window, open the integrated terminal and run:
#   npm install
#   npm run dev   (for Client)
#   node index.js (for Gateway and Student-service)
#   node server.js (for Authenticatio-service and Teacher-service)
