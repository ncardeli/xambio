import { database } from "firebase-functions";
import * as admin from "firebase-admin";

export default database
  .ref("/users/{uid}")
  .onUpdate(async ({ before, after }, context) => {
    const originalUserData = before.val();
    const updatedUserData = after.val();

    if (originalUserData.lastBid && !updatedUserData.lastBid) {
      // Mark bid as aborted when 'lastBid' is cleared
      if (context.auth) {
        return admin
          .database()
          .ref("/bids")
          .child(originalUserData.lastBid)
          .child("status")
          .set("aborted");
      }
    }
  });
