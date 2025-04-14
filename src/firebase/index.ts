import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const app = initializeApp(JSON.parse(import.meta.env.ENV_FIREBASE_CONFIG));

const auth = getAuth(app);

export async function authState() {
  return new Promise((resolve) =>
    onAuthStateChanged(auth, (user) => resolve(user))
  );
}

export async function createUser(email: string, password: string) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

export async function signIn(email: string, password: string) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function logOut() {
  return await signOut(auth);
}
