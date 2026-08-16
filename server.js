const http = require('http');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const db = require('./db.js');

const SALT_ROUNDS = 12;
const VIEWS_DIR = path.join(__dirname, 'views');

console.log('Views directory:', VIEWS_DIR);

function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json'
  });

  res.end(JSON.stringify(data));
}


// ========================================
// SERVE STATIC FILES
// ========================================

function serveStaticFile(req, res) {

  console.log('\n--- STATIC FILE REQUEST ---');
  console.log('Method:', req.method);
  console.log('URL:', req.url);

  let requestedPath =
    req.url === '/'
      ? 'registration_form.html'
      : req.url;

  // Remove query string
  requestedPath = requestedPath.split('?')[0];

  // Remove leading /
  requestedPath = requestedPath.replace(/^\/+/, '');

  const filePath = path.join(
    VIEWS_DIR,
    requestedPath
  );

  // THIS WAS MISSING
  const ext = path.extname(filePath).toLowerCase();

  console.log('Requested path:', requestedPath);
  console.log('Full file path:', filePath);
  console.log('Extension:', ext);
  console.log('File exists:', fs.existsSync(filePath));

  const contentTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
  };


  fs.readFile(filePath, (err, content) => {

    if (err) {

      console.error('File not found:', filePath);
      console.error('Error:', err.message);

      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });

      return res.end('Not found');
    }


    console.log('File successfully loaded:', filePath);

    res.writeHead(200, {
      'Content-Type':
        contentTypes[ext] || 'text/plain'
    });

    res.end(content);
  });
}


// ========================================
// HANDLE REGISTRATION
// ========================================

async function handleRegister(req, res) {

  console.log('\n--- REGISTRATION REQUEST ---');

  let body = '';

  req.on('data', chunk => {

    body += chunk;

    console.log('Received chunk:', chunk.toString());
  });


  req.on('end', async () => {

    console.log('Complete request body:', body);

    let payload;

    try {

      payload = JSON.parse(body);

      console.log('Parsed payload:', payload);

    } catch (error) {

      console.error('JSON parsing error:', error);

      return sendJSON(res, 400, {
        message: 'Invalid JSON'
      });
    }


    const {
      name,
      email,
      password,
      role
    } = payload;


    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password provided:', !!password);
    console.log('Role:', role);


    // ========================================
    // VALIDATION
    // ========================================

    if (!name || !email || !password || !role) {

      console.log('Validation failed');

      return sendJSON(res, 400, {
        message: 'All fields are required'
      });
    }


    if (password.length < 8) {

      console.log('Password too short');

      return sendJSON(res, 400, {
        message: 'Password must be at least 8 characters'
      });
    }


    try {

      // ========================================
      // CHECK EXISTING USER
      // ========================================

      console.log('Checking if email already exists...');

      const existingUser =
        await db.findUserbyMail(email);

      console.log(
        'Existing user:',
        existingUser
      );


      if (existingUser) {

        return sendJSON(res, 409, {
          message: 'Email already registered'
        });
      }


      // ========================================
      // HASH PASSWORD
      // ========================================

      console.log('Hashing password...');

      const passwordHash =
        await bcrypt.hash(
          password,
          SALT_ROUNDS
        );

      console.log('Password hashed successfully');


      // ========================================
      // CREATE USER
      // ========================================

      console.log('Creating user...');

      // IMPORTANT:
      // Use passwordHash, NOT password
      const newUser =
        await db.createUser(
          name,
          email,
          password,
          role
        );


      console.log(
        'Created user:',
        newUser
      );


      // ========================================
      // SUCCESS
      // ========================================

      return sendJSON(res, 201, {
        message: 'User registered successfully',
        user: newUser
      });


    } catch (err) {

      console.error(
        'Registration error:',
        err
      );

      return sendJSON(res, 500, {
        message: 'Server error, please try again'
      });
    }
  });
}


// ========================================
// CREATE SERVER
// ========================================

const server = http.createServer((req, res) => {

  console.log('\n================================');
  console.log('NEW REQUEST');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('================================');


  res.setHeader(
    'Access-Control-Allow-Origin',
    '*'
  );

  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS'
  );

  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type'
  );


  // ========================================
  // OPTIONS
  // ========================================

  if (req.method === 'OPTIONS') {

    console.log('OPTIONS request');

    res.writeHead(204);

    return res.end();
  }


  // ========================================
  // REGISTER
  // ========================================

  if (
    req.method === 'POST' &&
    req.url === '/register'
  ) {

    console.log('REGISTER ROUTE MATCHED');

    return handleRegister(req, res);
  }


  // ========================================
  // STATIC FILES
  // ========================================

  if (req.method === 'GET') {

    console.log('GET request - serving static file');

    return serveStaticFile(req, res);
  }


  // ========================================
  // 404
  // ========================================

  console.log(
    'Route not found:',
    req.method,
    req.url
  );

  return sendJSON(res, 404, {
    message: 'Not found'
  });
});

server.listen(3000, () => {

  console.log('\n================================');
  console.log(
    'Server running on http://localhost:3000'
  );
  console.log('================================');
});