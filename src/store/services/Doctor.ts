import { defineStore } from "pinia";
import { ref } from "vue";
import type { TDoctor, TRequestFilter } from "@/types";
import { doctorApiInstance } from "@/api/doctors";

export const useDoctorService = defineStore("doctorService", () => {
  const doctors = ref<TDoctor[] | null>(null);

  async function getDoctors(filters: TRequestFilter[]) {
    const doctorResponse = (await doctorApiInstance.getDoctors(
      filters
    )) as TDoctor[];

    setDoctors(doctorResponse);

    return doctorResponse;
  }

  // Setter
  function setDoctors(value: TDoctor[] | null) {
    doctors.value = value;
  }

  return {
    getDoctors,
    doctors,
    setDoctors,
  };
});
