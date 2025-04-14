import axios from "@/axios";

export default class UsersApi {
  async userCreate(id: string) {
    return axios.post("/users/create?ok=true", {
      id,
    });
  }
}

export const userApiInstance = new UsersApi();
