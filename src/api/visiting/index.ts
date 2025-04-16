import axios from "@/axios";
import type { TVisiting } from "@/types";

export default class VisitingApi {
  async visitingCreate({
    doctor,
    dateTime,
    createdAt,
  }: {
    doctor: number;
    dateTime: number;
    createdAt: number;
  }) {
    return await axios.post("/visiting/create", {
      doctor,
      dateTime,
      createdAt,
    });
  }

  async visitingGet() {
    return await axios.get("/visiting/get");
  }

  async visitingCancel({ id }: { id: TVisiting["id"] }) {
    return await axios.post("/visiting/cancel", {
      id,
    });
  }
}

export const visitingApiInstance = new VisitingApi();
