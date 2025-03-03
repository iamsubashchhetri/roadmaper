
const fs = require('fs');
const https = require('https');

// Function to make HTTPS requests
function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      res.on('end', () => {
        resolve({ 
          statusCode: res.statusCode,
          headers: res.headers,
          body: responseData 
        });
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (data) {
      req.write(data);
    }
    req.end();
  });
}

async function main() {
  console.log('Reading Firestore rules file...');
  const rules = fs.readFileSync('firestore.rules', 'utf8');
  console.log('Firestore rules:', rules);
  console.log('These rules will allow all read/write operations in development.');
  console.log('Remember to update them before going to production!');
}

main().catch(console.error);
