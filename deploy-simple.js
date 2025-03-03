
const { execSync } = require('child_process');
const fs = require('fs');

// Check if .firebaserc exists, if not create it
if (!fs.existsSync('.firebaserc')) {
  console.log('Creating .firebaserc...');
  fs.writeFileSync('.firebaserc', JSON.stringify({
    "projects": {
      "default": "airoadmapgenerator-b3de9"
    }
  }, null, 2));
}

// Get the service account from secrets
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;

if (!serviceAccount) {
  console.error('FIREBASE_SERVICE_ACCOUNT secret not found');
  console.log('Please create a service account key and add it as a secret named FIREBASE_SERVICE_ACCOUNT');
  console.log('Follow the instructions in create-service-account-instructions.md');
  process.exit(1);
}

// Write the service account to a temporary file
fs.writeFileSync('temp-service-account.json', serviceAccount);
console.log('Temporary service account file created');

try {
  // Deploy Firestore rules using the service account
  console.log('Deploying Firestore rules...');
  process.env.GOOGLE_APPLICATION_CREDENTIALS = 'temp-service-account.json';
  
  execSync('npx firebase-tools deploy --only firestore:rules --project airoadmapgenerator-b3de9 --non-interactive', { 
    stdio: 'inherit',
    env: {
      ...process.env,
      GOOGLE_APPLICATION_CREDENTIALS: 'temp-service-account.json'
    }
  });
  
  console.log('Firestore rules deployed successfully!');
} catch (error) {
  console.error('Error deploying Firestore rules:', error.message);
} finally {
  // Clean up the temporary file
  if (fs.existsSync('temp-service-account.json')) {
    fs.unlinkSync('temp-service-account.json');
    console.log('Temporary service account file removed');
  }
}
