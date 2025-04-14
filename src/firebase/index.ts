import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const app = initializeApp(JSON.parse(import.meta.env.ENV_FIREBASE_CONFIG));

const auth = getAuth(app);

export async function authState() {
  return new Promise((resolve) =>
    onAuthStateChanged(auth, (user) => resolve(user))
  );
}
