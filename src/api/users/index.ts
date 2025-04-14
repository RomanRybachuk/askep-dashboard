import axios from "@/axios";

export default class UsersApi {
  async userCreate(id: string) {
    return await axios.post("/users/create", {
      id,
    });
  }

  async userGet() {
    return await axios.get("/users/get");
  }
}

export const userApiInstance = new UsersApi();
