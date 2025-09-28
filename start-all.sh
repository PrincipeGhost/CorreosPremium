#!/bin/bash

echo "Starting integrated Node.js + Python Telegram Bot application..."

# Function to handle cleanup on exit
cleanup() {
    echo "Shutting down all services..."
    kill -TERM $NODE_PID $PYTHON_PID 2>/dev/null
    wait $NODE_PID $PYTHON_PID 2>/dev/null
    echo "All services stopped."
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Start Node.js application
echo "Starting Node.js web application..."
NODE_ENV=development tsx server/index.ts &
NODE_PID=$!

# Give Node.js a moment to start
sleep 2

# Start Python Telegram bot
echo "Starting Python Telegram bot..."
cd bot && python3 bot.py &
PYTHON_PID=$!

echo "Both services started:"
echo "  - Node.js web app (PID: $NODE_PID) running on port 5000"
echo "  - Python Telegram bot (PID: $PYTHON_PID)"
echo "Press Ctrl+C to stop all services"

# Wait for either process to exit
wait $NODE_PID $PYTHON_PID

# If we reach here, one of the processes has exited
echo "One of the services has stopped. Shutting down remaining services..."
cleanup