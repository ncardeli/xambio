import { auth } from "firebase-functions";
import * as admin from "firebase-admin";

export default auth.user().onCreate((user) => {
  return admin.database().ref("users").child(user.uid).set({
    email: user.email,
    name: user.displayName,
    createdAt: new Date().getTime(),
    logoUrl: user.photoURL,
    lastBid: null,
  });
});
