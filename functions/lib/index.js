"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const stripe = require('stripe')(functions.config().stripe.token);
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.writeOrder = functions.database.ref('/customerList/{uid}/cart').onCreate((change, context) => __awaiter(this, void 0, void 0, function* () {
    const eventStatus = change.val();
    console.log('Thing:', eventStatus);
    const followerUid = context.params.uid;
    const snapshot = yield admin.database().ref(`/itemList/${eventStatus.itemkey}/`).once('value');
    const item = snapshot.val();
    console.log('Look for: ', eventStatus.itemkey);
    console.log('Found item: ', item);
    if (!item) {
        return null;
    }
    eventStatus.uid = followerUid;
    eventStatus.vendorid = item.uid;
    eventStatus.item = item;
    console.log(eventStatus);
    // Adding Order to Order List
    const pushedPostRef = admin.database().ref('/orderList/').push();
    const postId = pushedPostRef.key;
    return admin.database().ref('/customerList/' + followerUid).update({ cart: null }).then(() => {
        return admin.database().ref('/orderList/' + postId).set(eventStatus).then(() => {
            return admin.database().ref('/itemList/' + eventStatus.itemkey).update({ status: 'pending' });
        });
    });
}));
//# sourceMappingURL=index.js.map