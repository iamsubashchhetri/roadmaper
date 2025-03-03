
# Firebase Authentication Domain Issue

Your authentication is failing because your Replit domain is not authorized in Firebase. According to the logs, you need to add this domain to Firebase Console:

```
f574449b-0133-4cde-9db6-8fa3038b0e83-00-1h5oztfuupr21.spock.replit.dev
```

Steps to fix:
1. Go to the Firebase Console (https://console.firebase.google.com/)
2. Select your project: `airoadmapgenerator-b3de9`
3. Go to Authentication → Settings → Authorized domains
4. Add your Replit domain to the list of authorized domains
5. Save the changes

This should resolve the Firebase authentication error.
