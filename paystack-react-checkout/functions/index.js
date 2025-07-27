/**
//  * Import function triggers from their respective submodules:
//  *
//  * const {onCall} = require("firebase-functions/v2/https");
//  * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
//  *
//  * See a full list of supported triggers at https://firebase.google.com/docs/functions
//  */

// const {setGlobalOptions} = require("firebase-functions");
// const {onRequest} = require("firebase-functions/https");
// const logger = require("firebase-functions/logger");

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
// setGlobalOptions({ maxInstances: 10 });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// functions/index.js
const functions = require('firebase-functions');
const fetch = require('node-fetch'); // or use axios
const admin = require('firebase-admin');
admin.initializeApp();

exports.verifyPayment = functions.https.onRequest(async (req, res) => {
  const { reference, name, email, amount } = req.body;

  try {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer sk_test_xxxxx`, // Your secret key (DO NOT EXPOSE in frontend)
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (data.status && data.data.status === 'success') {
      const paymentChannel = data.data.channel; // e.g., 'bank_transfer' or 'card'

      // Save to Firebase
      await admin.firestore().collection('orders').add({
        name,
        email,
        amount,
        paymentMethod: paymentChannel,
        reference,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });

      return res.status(200).json({ success: true, message: 'Verified and stored' });
    } else {
      return res.status(400).json({ success: false, message: 'Payment not successful' });
    }
  } catch (error) {
    console.error('Verification error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});