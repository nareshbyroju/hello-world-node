const express = require('express');
const fs = require('fs');
const path = require('path');
const http = require('http');

const app = express();

// VULNERABILITY: Hardcoded credentials
const DATABASE_URL = 'postgresql://admin:admin123@localhost:5432/mydb';
const API_TOKEN = 'secret_token_12345';

app.get('/', (req, res) => {
  res.send('Hello, World! (Node.js)');
});

// VULNERABILITY: Path traversal
app.get('/file', (req, res) => {
  const filename = req.query.name || 'readme.txt';
  const filepath = path.join(__dirname, 'files', filename);
  // No validation - allows traversal like ../../etc/passwd
  fs.readFile(filepath, (err, data) => {
    res.send(data || 'File not found');
  });
});

// VULNERABILITY: SQL injection (simulated)
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  // Simulated SQL query - no parameterization
  const query = `SELECT * FROM users WHERE id = ${userId}`;  // SQL injection
  res.send(`Executing: ${query}`);
});

// VULNERABILITY: XXE (XML External Entity)
app.post('/xml', express.text({ type: 'application/xml' }), (req, res) => {
  const libxmljs = require('libxmljs');
  const xmlDoc = libxmljs.parseXml(req.body, { 
    dtdload: true,
    dtdvalid: true,
    noent: true  // XXE vulnerability
  });
  res.send(xmlDoc.toString());
});

app.listen(3000, () => {
  console.log('Node server running on port 3000');
});
