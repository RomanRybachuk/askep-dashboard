import * as admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

admin.initializeApp();

export const db = getFirestore("production");
export const auth = admin.auth();

export const FIREBASE_APP_API_KEY = "AIzaSyCAMIXBTMN7crwjVtlXgnBXl23qNhjoCkw";
