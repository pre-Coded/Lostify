/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

exports.restrictEmailDomain = functions.auth.user().onCreate((user) => {
    if (user.email && !user.email.endsWith('@nitj.ac.in')) {
        // If the email domain is not @nitj.ac.in, delete the user account.
        return admin.auth().deleteUser(user.uid)
            .then(() => {
                console.log('User deleted because of invalid email domain:', user.email);
            })
            .catch((error) => {
                console.error('Error deleting user:', error);
            });
    }
    return null;
});


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
