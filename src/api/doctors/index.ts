import type { TRequestFilter } from "@/types";
import doctorWomenPhoto from "@/assets/doctorwomen.png";
import doctorManPhoto from "@/assets/doctorman.png";

const doctors = [
  {
    id: 1,
    title: "Ірина Михайлівна",
    specialties: [1],
    experience: 12,
    clinic: "Медичний центр «Гармонія»",
    address: "вул. Куліша, 12, Львів",
    room: "101",
    photo: doctorWomenPhoto,
  },
  {
    id: 2,
    title: "Володимир Іванович",
    specialties: [1],
    experience: 16,
    clinic: "Медіс",
    address: "вул. Джерельна, 69, Львів",
    room: "102",
    photo: doctorManPhoto,
  },
  {
    id: 3,
    title: "Олена Сергіївна",
    specialties: [1],
    experience: 9,
    clinic: "Клініка Експерт",
    address: "вул. Городоцька, 128, Львів",
    room: "103",
    photo: doctorWomenPhoto,
  },
  {
    id: 4,
    title: "Микола Петрович",
    specialties: [1],
    experience: 14,
    clinic: "Сіті Клінік",
    address: "вул. Шевченка, 60, Львів",
    room: "104",
    photo: doctorManPhoto,
  },

  {
    id: 5,
    title: "Наталія Василівна",
    specialties: [2],
    experience: 13,
    clinic: "Дитяча поліклініка №1",
    address: "вул. Пекарська, 69а, Львів",
    room: "201",
    photo: doctorWomenPhoto,
  },
  {
    id: 6,
    title: "Юрій Анатолійович",
    specialties: [2],
    experience: 15,
    clinic: "Smart Medical Center",
    address: "вул. Зеленська, 12, Львів",
    room: "202",
    photo: doctorManPhoto,
  },
  {
    id: 7,
    title: "Світлана Григорівна",
    specialties: [2],
    experience: 11,
    clinic: "Медична допомога",
    address: "вул. Коновальця, 32, Львів",
    room: "203",
    photo: doctorWomenPhoto,
  },
  {
    id: 8,
    title: "Андрій Миколайович",
    specialties: [2],
    experience: 7,
    clinic: "Варта Клінік",
    address: "вул. Кульпарківська, 95, Львів",
    room: "204",
    photo: doctorManPhoto,
  },

  {
    id: 9,
    title: "Олександр Леонідович",
    specialties: [3],
    experience: 17,
    clinic: "Добробут",
    address: "вул. Антоновича, 123, Львів",
    room: "301",
    photo: doctorManPhoto,
  },
  {
    id: 10,
    title: "Марина Ігорівна",
    specialties: [3],
    experience: 14,
    clinic: "Інноваційна Клініка",
    address: "вул. Шота Руставелі, 22, Львів",
    room: "302",
    photo: doctorWomenPhoto,
  },
  {
    id: 11,
    title: "Ігор Борисович",
    specialties: [3],
    experience: 10,
    clinic: "Клініка Серця",
    address: "вул. Виговського, 28, Львів",
    room: "303",
    photo: doctorManPhoto,
  },
  {
    id: 12,
    title: "Галина Аркадіївна",
    specialties: [3],
    experience: 8,
    clinic: "Амбулаторія Здоров'я",
    address: "вул. Сахарова, 35, Львів",
    room: "304",
    photo: doctorWomenPhoto,
  },

  {
    id: 13,
    title: "Вікторія Павлівна",
    specialties: [4],
    experience: 9,
    clinic: "Центр Неврології",
    address: "вул. Генерала Чупринки, 15, Львів",
    room: "401",
    photo: doctorWomenPhoto,
  },
  {
    id: 14,
    title: "Сергій Дмитрович",
    specialties: [4],
    experience: 13,
    clinic: "Медичний Центр ЛОРНІ",
    address: "вул. Стороженка, 16, Львів",
    room: "402",
    photo: doctorManPhoto,
  },
  {
    id: 15,
    title: "Тетяна Михайлівна",
    specialties: [4],
    experience: 11,
    clinic: "Львівський Нейроцентр",
    address: "вул. Зелена, 147, Львів",
    room: "403",
    photo: doctorWomenPhoto,
  },
  {
    id: 16,
    title: "Роман Євгенович",
    specialties: [4],
    experience: 18,
    clinic: "Альтамедика",
    address: "вул. Тичини, 18, Львів",
    room: "404",
    photo: doctorManPhoto,
  },

  {
    id: 17,
    title: "Валерій Степанович",
    specialties: [5],
    experience: 19,
    clinic: "Медикал Центр",
    address: "вул. Замарстинівська, 34, Львів",
    room: "501",
    photo: doctorManPhoto,
  },
  {
    id: 18,
    title: "Оксана Олександрівна",
    specialties: [5],
    experience: 12,
    clinic: "Травматологія Плюс",
    address: "вул. Личаківська, 41, Львів",
    room: "502",
    photo: doctorWomenPhoto,
  },
  {
    id: 19,
    title: "Богдан Віталійович",
    specialties: [5],
    experience: 7,
    clinic: "Ортопедична Клініка",
    address: "вул. Княгині Ольги, 5, Львів",
    room: "503",
    photo: doctorManPhoto,
  },
  {
    id: 20,
    title: "Леся Василівна",
    specialties: [5],
    experience: 10,
    clinic: "Медцентр-Львів",
    address: "вул. Бандери, 9, Львів",
    room: "504",
    photo: doctorWomenPhoto,
  },

  {
    id: 21,
    title: "Інна Юріївна",
    specialties: [6],
    experience: 11,
    clinic: "ДермаКлінік",
    address: "вул. Наукова, 7а, Львів",
    room: "601",
    photo: doctorWomenPhoto,
  },
  {
    id: 22,
    title: "Євген Валентинович",
    specialties: [6],
    experience: 15,
    clinic: "Центр Шкіри",
    address: "вул. Любінська, 89, Львів",
    room: "602",
    photo: doctorManPhoto,
  },
  {
    id: 23,
    title: "Віра Степанівна",
    specialties: [6],
    experience: 9,
    clinic: "Космедика",
    address: "вул. Липинського, 54, Львів",
    room: "603",
    photo: doctorWomenPhoto,
  },
  {
    id: 24,
    title: "Тимофій Артемович",
    specialties: [6],
    experience: 6,
    clinic: "ДерматоКлініка",
    address: "вул. Бойківська, 27, Львів",
    room: "604",
    photo: doctorManPhoto,
  },

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

  {
    id: 29,
    title: "Катерина Романівна",
    specialties: [8],
    experience: 9,
    clinic: "Алергологічний Центр",
    address: "вул. Шота Руставелі, 10, Львів",
    room: "801",
    photo: doctorWomenPhoto,
  },
  {
    id: 30,
    title: "Олег Тарасович",
    specialties: [8],
    experience: 14,
    clinic: "Клініка Імунітет",
    address: "вул. Вернадського, 3, Львів",
    room: "802",
    photo: doctorManPhoto,
  },
  {
    id: 31,
    title: "Юлія Олександрівна",
    specialties: [8],
    experience: 8,
    clinic: "Львів Алерго Центр",
    address: "вул. Панаса Мирного, 33, Львів",
    room: "803",
    photo: doctorWomenPhoto,
  },
  {
    id: 32,
    title: "Максим Васильович",
    specialties: [8],
    experience: 11,
    clinic: "Алерго+",
    address: "вул. Каховська, 19, Львів",
    room: "804",
    photo: doctorManPhoto,
  },
];

export default class DoctorsApi {
  async getDoctors(filters: TRequestFilter[]) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = doctors.filter((doctor) => {
          let passed = true;

          for (let filter of filters) {
            let loopCheck = true;

            const item = (doctor as any)[filter.prop];

            switch (filter.strategy) {
              case "contains":
                loopCheck = item.includes(filter.value);

                break;
              case "equals":
                loopCheck = item;
                break;
            }

            if (!loopCheck) {
              passed = false;
              break;
            }
          }

          return passed;
        });

        resolve(result);
      }, 1500);
    });
  }
}

export const doctorApiInstance = new DoctorsApi();
