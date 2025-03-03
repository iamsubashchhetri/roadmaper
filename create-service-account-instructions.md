
# Creating a Firebase Service Account Key

To fix your permission issues, you need to:

1. Go to the [Firebase Console](https://console.firebase.google.com/project/airoadmapgenerator-b3de9/settings/serviceaccounts/adminsdk)
2. Click on "Generate new private key"
3. Save the downloaded JSON file
4. In your Replit project, create a new secret:
   - Click on the "Secrets" tool in the sidebar
   - Add a new secret named `FIREBASE_SERVICE_ACCOUNT`
   - Paste the entire contents of the downloaded JSON file as the value
   - Save the secret

This key will allow you to deploy your Firestore rules without needing to login through the CLI.
