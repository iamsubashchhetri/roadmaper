
# Creating a Firebase Service Account Key with Proper Permissions

To fix your permission issues, you need to:

1. Go to the [Firebase Console](https://console.firebase.google.com/project/airoadmapgenerator-b3de9/settings/serviceaccounts/adminsdk)
2. Click on "Generate new private key"
3. Save the downloaded JSON file

4. Make sure the service account has the correct permissions:
   - Go to [IAM & Admin > IAM](https://console.cloud.google.com/iam-admin/iam?project=airoadmapgenerator-b3de9)
   - Find the service account email (it should end with `@airoadmapgenerator-b3de9.iam.gserviceaccount.com`)
   - Click the pencil icon to edit its permissions
   - Make sure it has the following roles:
     - Firebase Admin
     - Cloud Firestore Admin
     - Service Account User

5. In your Replit project, create a new secret:
   - Click on the "Secrets" tool in the sidebar
   - Add a new secret named `FIREBASE_SERVICE_ACCOUNT`
   - Paste the entire contents of the downloaded JSON file as the value
   - Save the secret

6. Try deploying again with: `node deploy-simple.js`

This key will allow you to deploy your Firestore rules without needing to login through the CLI.
