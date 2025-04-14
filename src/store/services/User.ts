import { defineStore } from "pinia";

import { userApiInstance } from "@/api/users";

import { createUser, authState } from "@/firebase";

export const useUserService = defineStore("userService", () => {
  async function signUp(email: string, password: string) {
    const userData = await createUser(email, password);

    // Handle create user error
    if (!userData.user) return;

    const response = await userApiInstance.userCreate(userData.user.uid);

    console.log("response", response);
  }

  async function getUserState() {
    return await authState();
  }

  return {
    signUp,
    getUserState,
  };
});
