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

exports.writeOrder = functions.database.ref('/customerList/{uid}/cart').onCreate( async(change,context) => {
  const eventStatus = change.val();
  console.log( 'Thing:', eventStatus );
  const followerUid = context.params.uid;


  const snapshot = await admin.database().ref(`/itemList/${eventStatus.itemkey}/`).once('value')
  const item = snapshot.val();
  console.log( 'Look for: ' , eventStatus.itemkey );
  console.log( 'Found item: ', item );
  if ( !item ){
    return null;
  }

  eventStatus.uid = followerUid;
  eventStatus.vendorid = item.uid;
  eventStatus.item = item;
  console.log(eventStatus);

  let token = eventStatus.payment.token.id;
  stripe.charges.create({
    amount: 20,
    currency: "usd",
    source: token,
    description: "Charge for Toolbudd"
  }, (err, charge) =>{
    console.err(err);
    console.log(charge);
    // asynchronously called
  });

  // Adding Order to Order List
  const pushedPostRef = admin.database().ref('/orderList/').push();
  const postId = pushedPostRef.key;

  return admin.database().ref('/customerList/'+followerUid).update({cart:null}).then(()=>{
    return admin.database().ref('/orderList/'+postId).set(eventStatus).then(()=>{
      return admin.database().ref('/itemList/'+eventStatus.itemkey).update({status:'pending'});
    });
  })

});
