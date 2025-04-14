import { defineStore } from "pinia";
import type { TRequestFilter } from "@/types";
import { doctorApiInstance } from "@/api/doctors";

export const useDoctorService = defineStore("doctorService", () => {
  async function getDoctors(filters: TRequestFilter[]) {
    return await doctorApiInstance.getDoctors(filters);
  }

  return {
    getDoctors,
  };
});
