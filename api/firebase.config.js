// set up firebase connection
import admin from "firebase-admin";

if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(
      Buffer.from(
        process.env.FIREBASE_SERVICE_ACCOUNT_BASE64,
        "base64"
      ).toString("utf8")
    );

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://nba-shot-chart-default-rtdb.firebaseio.com",
    });
  } catch (error) {
    console.error("Firebase config error:", error);
    throw new Error("Firebase Admin initialization failed.");
  }
}
const db = admin.database();

export default db;
