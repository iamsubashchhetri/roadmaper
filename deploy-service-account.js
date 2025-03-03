
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

// Check if service account key file exists
const serviceAccountPath = 'service-account.json';
if (!fs.existsSync(serviceAccountPath)) {
  console.error(`Service account key file not found at ${serviceAccountPath}`);
  console.log('Please create a service account key in the Firebase console and save it as service-account.json');
  console.log('Follow these steps:');
  console.log('1. Go to https://console.firebase.google.com/project/airoadmapgenerator-b3de9/settings/serviceaccounts/adminsdk');
  console.log('2. Click "Generate new private key"');
  console.log('3. Save the file as service-account.json in your Replit project');
  process.exit(1);
}

// Deploy Firestore rules using service account
console.log('Deploying Firestore rules with service account...');
try {
  process.env.GOOGLE_APPLICATION_CREDENTIALS = serviceAccountPath;
  execSync('npx firebase-tools deploy --only firestore:rules --project airoadmapgenerator-b3de9', { 
    stdio: 'inherit',
    env: {
      ...process.env,
      GOOGLE_APPLICATION_CREDENTIALS: serviceAccountPath
    }
  });
  console.log('Firestore rules deployed successfully!');
} catch (error) {
  console.error('Error deploying Firestore rules:', error.message);
}
