import { defineStore } from "pinia";
import { ref } from "vue";
import { userApiInstance } from "@/api/users";

import { createUser, authState, logOut, signIn } from "@/firebase";

export const useUserService = defineStore("userService", () => {
  const authUser = ref(null);
  const authData = ref(null);

  async function userSignUp(email: string, password: string) {
    const userData = await createUser(email, password);

    // Handle create user error
    if (!userData.user) return;

    const response = await createUserData(userData.user.uid);

    setAuthUser(userData.user);
    setAuthUser(response.data.data);

    return response;
  }

  async function userSignIn(email: string, password: string) {
    const userData = await signIn(email, password);

    // Handle create user error
    if (!userData.user) return;

    await getUserData();

    setAuthUser(userData.user);

    return userData;
  }

  async function userSignOut() {
    const response = await logOut();

    setAuthUser(null);
    setAuthData(null);

    return response;
  }

  // API
  async function getUserData() {
    const response = await userApiInstance.userGet();

    setAuthData(response.data.data);

    return response;
  }

  // API
  async function createUserData(id: string) {
    const response = await userApiInstance.userCreate(id);

    return response;
  }

  // FIREBASE
  async function getUserState() {
    const user = await authState();

    setAuthUser(user);

    return user;
  }

  // SETTER
  async function setAuthUser(value: any) {
    authUser.value = value;
  }

  // SETTER
  async function setAuthData(value: any) {
    authData.value = value;
  }

  return {
    userSignUp,
    userSignIn,
    getUserState,
    userSignOut,
    authUser,
    setAuthUser,
    getUserData,
    setAuthData,
  };
});
