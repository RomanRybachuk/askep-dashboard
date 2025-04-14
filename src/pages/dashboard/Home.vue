<script setup lang="ts">
import { ref } from "vue";

import doctorWomenPhoto from "@/assets/doctorwomen.png";
import doctorManPhoto from "@/assets/doctorman.png";

import LogoutButton from "@/components/LogoutButton.vue";
import Autocomplete from "@/components/ui/Autocomplete.vue";

import Btn from "@/components/ui/Btn.vue";

import { useDoctorService } from "@/store/services/Doctor";
import type { TDoctor } from "@/types";
import DataLoader from "@/components/DataLoader.vue";

const doctorService = useDoctorService();

const specialties = [
  { id: 1, title: "Терапевт" },
  { id: 2, title: "Педіатр" },
  { id: 3, title: "Кардіолог" },
  { id: 4, title: "Невролог" },
  { id: 5, title: "Травматолог" },
  { id: 6, title: "Дерматолог" },
  { id: 7, title: "Психіатр" },
  { id: 8, title: "Алерголог" },
];

const specialtyValue = ref<string | number>("");
const dateTimeValue = ref<string>("");

// const doctors = ref<TDoctor[] | null>(null);
const doctors = ref<TDoctor[] | null>([
  {
    id: 25,
    title: "Любов Костянтинівна",
    specialties: [7],
    experience: 16,
    clinic: "Центр ментального здоров'я",
    address: "вул. Тарнавського, 18, Львів",
    room: "701",
    photo: doctorWomenPhoto,
  },
  {
    id: 26,
    title: "Георгій Володимирович",
    specialties: [7],
    experience: 12,
    clinic: "Психологічна допомога",
    address: "вул. Сихівська, 12, Львів",
    room: "702",
    photo: doctorManPhoto,
  },
  {
    id: 27,
    title: "Дарина Миколаївна",
    specialties: [7],
    experience: 10,
    clinic: "Менталіс",
    address: "вул. Пасічна, 70, Львів",
    room: "703",
    photo: doctorWomenPhoto,
  },
  {
    id: 28,
    title: "Павло Ігорович",
    specialties: [7],
    experience: 13,
    clinic: "Центр психотерапії",
    address: "вул. Володимира Великого, 26, Львів",
    room: "704",
    photo: doctorManPhoto,
  },
]);

const doctorsLoading = ref(false);

async function handleClickSubmit() {
  doctorsLoading.value = true;
  doctors.value = null;

  const doctorsResponse = (await doctorService.getDoctors([
    {
      prop: "specialties",
      value: specialtyValue.value as string | number,
      strategy: "contains",
    },
  ])) as TDoctor[];

  doctorsLoading.value = false;

  specialtyValue.value = "";

  doctors.value = doctorsResponse;
}

function getMinDateTimeValue() {
  const now = new Date();
  const pad = (n: any) => n.toString().padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
    now.getDate()
  )}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
}
</script>

<template>
  <div class="home-page">
    <logout-button></logout-button>
    <form @submit.prevent="handleClickSubmit" class="d-flex align-center">
      <autocomplete
        label="Спеціальність"
        :items="specialties"
        v-model="specialtyValue"
      ></autocomplete>
      <input
        v-model="dateTimeValue"
        :min="getMinDateTimeValue()"
        type="datetime-local"
      />
      <btn
        :disabled="!(specialtyValue && dateTimeValue && !doctorsLoading)"
        type="submit"
        >Знайти вільного лікаря</btn
      >
    </form>
    <div v-if="doctors">
      <ul v-if="doctors.length" class="d-flex flex-column ga-5">
        <li
          class="doctor-card d-flex ga-5"
          v-for="doctor of doctors"
          :key="doctor.id"
        >
          <div class="doctor-card__photo">
            <img :src="doctor.photo" alt="doctor photo" />
          </div>
          <div class="d-flex flex-column ga-3">
            <ul class="doctor-card__features">
              <li>Ім'я: {{ doctor.title }}</li>
              <li>Стаж: {{ doctor.experience }}</li>
              <li>Лікарня: {{ doctor.clinic }}</li>
              <li>Адреса: {{ doctor.address }}</li>
              <li>Кабінет: {{ doctor.room }}</li>
            </ul>
            <btn>Записатись</btn>
          </div>
        </li>
      </ul>
      <div v-else>Вільних лікарів на жаль немає</div>
    </div>
    <DataLoader v-if="doctorsLoading"></DataLoader>
  </div>
</template>

<style scoped lang="scss">
.doctor-card {
  &__photo {
    width: 150px;
    height: 150px;
    overflow: hidden;
    border-radius: 8px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__features {
    font-size: 14px;
  }
}
</style>
