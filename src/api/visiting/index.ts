import axios from "@/axios";

export default class VisitingApi {
  async visitingCreate({
    doctor,
    dateTime,
  }: {
    doctor: number;
    dateTime: number;
  }) {
    return await axios.post("/visiting/create", {
      doctor,
      dateTime,
    });
  }

  async visitingGet() {
    return await axios.get("/visiting/get");
  }
}

export const visitingApiInstance = new VisitingApi();
