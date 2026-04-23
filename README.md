# Hello World - Node.js

A simple Node.js Express application with intentional vulnerabilities for Snyk integration testing.

## Vulnerabilities

- **Path traversal** - `/file` endpoint allows directory traversal attacks
- **SQL injection** - `/user/:id` endpoint enables SQL injection
- **XXE (XML External Entity)** - `/xml` endpoint processes external entities
- **Hardcoded credentials** - Database URL and API tokens exposed in code
- **Vulnerable dependencies** - express 4.16.3, request 2.87.0, moment 2.19.1, libxmljs 0.18.0 with known CVEs

## Run

```bash
npm install
npm start
```

## Purpose

This repository is designed for security testing with Snyk to validate vulnerability detection capabilities.
