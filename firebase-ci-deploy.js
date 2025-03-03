
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

// Use token from environment or command line
const token = process.env.FIREBASE_TOKEN;

if (!token) {
  console.log('No Firebase token found in environment.');
  console.log('Please run: firebase login:ci');
  console.log('Then save the token using the Secrets tool in Replit.');
  process.exit(1);
}

// Deploy Firestore rules
console.log('Deploying Firestore rules...');
try {
  execSync(`npx firebase-tools deploy --only firestore:rules --token "${token}" --project airoadmapgenerator-b3de9`, { stdio: 'inherit' });
  console.log('Firestore rules deployed successfully!');
} catch (error) {
  console.error('Error deploying Firestore rules:', error.message);
}
