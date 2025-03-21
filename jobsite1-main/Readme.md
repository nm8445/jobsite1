# command to find the process using port 3000
netstat -ano | findstr :3000
# command for killing the process
taskkill /PID 39600 /F
