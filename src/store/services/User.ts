import { defineStore } from "pinia";
import { ref } from "vue";
import { userApiInstance } from "@/api/users";

import { createUser, authState, logOut, signIn } from "@/firebase";

export const useUserService = defineStore("userService", () => {
  const authUser = ref(null);

  async function userSignUp(email: string, password: string) {
    const userData = await createUser(email, password);

    // Handle create user error
    if (!userData.user) return;

    const response = await userApiInstance.userCreate(userData.user.uid);

    setAuthUser(userData.user);

    return response;
  }

  async function userSignIn(email: string, password: string) {
    const userData = await signIn(email, password);

    // Handle create user error
    if (!userData.user) return;

    setAuthUser(userData.user);

    return userData;
  }

  async function userSignOut() {
    const response = await logOut();

    setAuthUser(null);

    return response;
  }

  async function getUserState() {
    const user = await authState();

    setAuthUser(user);

    return user;
  }

  async function setAuthUser(value: any) {
    authUser.value = value;
  }

  return {
    userSignUp,
    userSignIn,
    getUserState,
    userSignOut,
    authUser,
    setAuthUser,
  };
});
