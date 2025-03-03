
const fs = require('fs');

async function main() {
  console.log('Reading Firestore rules...');
  try {
    const rules = fs.readFileSync('firestore.rules', 'utf8');
    console.log('Firestore rules found:');
    console.log('-------------------');
    console.log(rules);
    console.log('-------------------');

    console.log('\nIMPORTANT: Your Firestore rules are set correctly in your local file, but you need to deploy them to Firebase.');
    console.log('\nTo fix the "Missing or insufficient permissions" errors, run:');
    console.log('npx firebase deploy --only firestore:rules');
    
    console.log('\nThis will apply your permissive development rules that allow all read/write operations.');
    console.log('Remember to use more restrictive rules before production deployment.');
  } catch (error) {
    console.error('Error reading rules file:', error);
  }
}

main();
