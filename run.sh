#!/bin/bash

PID_FILE=".dev-server.pid"

start() {
    if [ -f "$PID_FILE" ] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null; then
        echo " Server already running (PID $(cat "$PID_FILE"))"
        echo "   → http://localhost:5173"
        return
    fi
    echo " Starting DSA Mastery..."
    npm run dev &>/dev/null &
    echo $! > "$PID_FILE"
    sleep 1
    echo " Running at http://localhost:5173  (PID $(cat "$PID_FILE"))"
}

stop() {
    if [ -f "$PID_FILE" ]; then
        PID=$(cat "$PID_FILE")
        kill "$PID" 2>/dev/null
        # Also kill any child node processes on port 5173
        lsof -ti:5173 2>/dev/null | xargs kill 2>/dev/null
        rm -f "$PID_FILE"
        echo " Server stopped"
    else
        # Try killing by port anyway
        lsof -ti:5173 2>/dev/null | xargs kill 2>/dev/null
        echo " Server stopped"
    fi
}

case "${1:-start}" in
    start)   start ;;
    stop)    stop ;;
    restart) stop; sleep 1; start ;;
    *)       echo "Usage: ./run.sh [start|stop|restart]" ;;
esac
