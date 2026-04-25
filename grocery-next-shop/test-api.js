const https = require('https');
const http = require('http');

function testAPI(method, path, data) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: body
        });
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function runTests() {
  console.log('=== Testing Grocery Next Shop ===\n');

  // Test 1: Admin Login
  console.log('1. Testing Admin Login...');
  const adminLogin = await testAPI('POST', '/api/admin/login', {
    username: 'admin@grocery.local',
    password: 'admin123'
  });
  console.log(`   Status: ${adminLogin.status}`);
  console.log(`   Response: ${adminLogin.body}`);
  console.log(`   Cookie: ${adminLogin.headers['set-cookie'] ? 'Set' : 'Not set'}\n`);

  // Test 2: User Registration
  console.log('2. Testing User Registration...');
  const userReg = await testAPI('POST', '/api/auth/register', {
    email: 'test@example.com',
    password: 'test123',
    name: 'Test User'
  });
  console.log(`   Status: ${userReg.status}`);
  console.log(`   Response: ${userReg.body}\n`);

  // Test 3: User Login
  console.log('3. Testing User Login...');
  const userLogin = await testAPI('POST', '/api/auth/login', {
    email: 'test@example.com',
    password: 'test123'
  });
  console.log(`   Status: ${userLogin.status}`);
  console.log(`   Response: ${userLogin.body}`);
  console.log(`   Cookie: ${userLogin.headers['set-cookie'] ? 'Set' : 'Not set'}\n`);

  console.log('=== Tests Complete ===');
}

runTests().catch(console.error);
