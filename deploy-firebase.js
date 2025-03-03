
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Check if .firebaserc exists, if not create it
if (!fs.existsSync('.firebaserc')) {
  console.log('Creating .firebaserc...');
  fs.writeFileSync('.firebaserc', JSON.stringify({
    "projects": {
      "default": "airoadmapgenerator-b3de9"
    }
  }, null, 2));
}

// Deploy Firestore rules
console.log('Deploying Firestore rules...');
try {
  execSync('firebase deploy --only firestore:rules', { stdio: 'inherit' });
  console.log('Firestore rules deployed successfully!');
} catch (error) {
  console.error('Error deploying Firestore rules:', error.message);
  console.log('You may need to login with Firebase CLI first using: firebase login');
}
