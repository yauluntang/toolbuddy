import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
const stripe = require('stripe')(functions.config().stripe.token);


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.writeOrder = functions.database.ref('/customerList/{uid}/cart').onCreate((change,context) => {
  const eventStatus = change.after.val();
  const followerUid = context.params.uid;
  const itemid = eventStatus.item.key;

  eventStatus.uid = followerUid;
  eventStatus.vendorid = eventStatus.item.uid;

  console.log(eventStatus);

  // Adding Order to Order List
  const pushedPostRef = admin.database().ref('/orderList/').push();
  const postId = pushedPostRef.key;

  return admin.database().ref('/customerList/'+followerUid).update({cart:null}).then(()=>{
    return admin.database().ref('/orderList/'+postId).set(eventStatus).then(()=>{
      return admin.database().ref('/itemList/'+itemid).update({status:'pending'});
    });
  })

});
