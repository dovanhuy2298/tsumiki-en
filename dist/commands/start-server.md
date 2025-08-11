# Development Server Startup and Management

Commands for starting and managing development environment servers.

## Server Startup Verification and Management

Check server status before starting development and start if necessary:

```bash
# Check existing Vite server
ps aux | grep -E "vite.*--port 3000" | grep -v grep

# Start new server if not running
if ! ps aux | grep -E "vite.*--port 3000" | grep -v grep > /dev/null; then
  echo "Server is not running. Starting development server..."
  npm run dev &
  echo "Starting server... waiting 5 seconds"
  sleep 5
else
  echo "Found existing server. Using it as is."
  ps aux | grep -E "vite.*--port 3000" | grep -v grep | awk '{print "PID: " $2 " - Vite server already running"}'
fi

# Server operation verification
echo "Checking server operation..."
curl -s http://localhost:3000 > /dev/null && echo "✅ Server is operating normally" || echo "⚠️ Cannot connect to server"
```

## Server Management Commands

### Server Status Check

```bash
# Check currently running server processes
ps aux | grep -E "vite.*--port 3000" | grep -v grep

# Check port usage status
lsof -i :3000
```

### Server Stop

```bash
# Stop Vite server
pkill -f "vite.*--port 3000"

# Force stop (if the above doesn't work)
ps aux | grep -E "vite.*--port 3000" | grep -v grep | awk '{print $2}' | xargs kill -9
```

### Server Restart

```bash
# Stop server
pkill -f "vite.*--port 3000"

# Wait a bit
sleep 2

# Restart server
npm run dev &

# Startup verification
sleep 5
curl -s http://localhost:3000 > /dev/null && echo "✅ Server is operating normally" || echo "⚠️ Cannot connect to server"
```

## Use Cases

- Environment preparation before starting TDD development
- Recovery when server is stopped
- When server status check is needed
- When setting up development environment

## Notes

- If port 3000 is being used by another process, please terminate that process
- After server startup, you can verify operation by accessing http://localhost:3000 in your browser
- It is recommended to properly stop servers started in the background when work is finished
