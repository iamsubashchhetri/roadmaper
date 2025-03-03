
import { execSync } from 'child_process';
import fs from 'fs';

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
  // Check if the service account has the right project and permissions
  const serviceAccountData = JSON.parse(fs.readFileSync('temp-service-account.json', 'utf8'));
  console.log(`Using service account: ${serviceAccountData.client_email}`);
  console.log(`Project ID from service account: ${serviceAccountData.project_id}`);
  
  if (serviceAccountData.project_id !== 'airoadmapgenerator-b3de9') {
    console.error('WARNING: Service account project ID does not match target project ID');
    console.error('Service account is for project:', serviceAccountData.project_id);
    console.error('Attempting to deploy to project: airoadmapgenerator-b3de9');
  }
  
  // Deploy Firestore rules using the service account
  console.log('Deploying Firestore rules...');
  process.env.GOOGLE_APPLICATION_CREDENTIALS = 'temp-service-account.json';
  
  execSync('npx firebase-tools deploy --only firestore:rules --project airoadmapgenerator-b3de9 --non-interactive --debug', { 
    stdio: 'inherit',
    env: {
      ...process.env,
      GOOGLE_APPLICATION_CREDENTIALS: 'temp-service-account.json'
    }
  });
  
  console.log('Firestore rules deployed successfully!');
} catch (error) {
  console.error('Error deploying Firestore rules:');
  console.error('This is likely a permission issue with your service account.');
  console.error('Please ensure the service account has the following roles:');
  console.error('- Firebase Admin');
  console.error('- Cloud Firestore Admin');
  console.error('- Service Account User');
  console.error('You can update roles at: https://console.cloud.google.com/iam-admin/iam?project=airoadmapgenerator-b3de9');
} finally {
  // Clean up the temporary file
  if (fs.existsSync('temp-service-account.json')) {
    fs.unlinkSync('temp-service-account.json');
    console.log('Temporary service account file removed');
  }
}
