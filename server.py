#!/usr/bin/env python3
"""
Einfacher lokaler HTTP-Server für die Recklinghausen-Website
"""

import http.server
import socketserver
import os

# Port, auf dem der Server lauschen soll
PORT = 8001

# Verzeichnis, das als Basis für den Server verwendet werden soll
DIRECTORY = "."

# Wechseln in das Verzeichnis der Website
os.chdir(DIRECTORY)

class ReusableThreadingHTTPServer(http.server.ThreadingHTTPServer):
    allow_reuse_address = True
    daemon_threads = True


# Erstellen des HTTP-Servers
Handler = http.server.SimpleHTTPRequestHandler
with ReusableThreadingHTTPServer(("", PORT), Handler) as httpd:
    print(f"Server wird auf Port {PORT} gestartet...")
    print(f"Zugriff über: http://localhost:{PORT}")
    print(f"Verzeichnis: {os.getcwd()}")
    httpd.serve_forever()
