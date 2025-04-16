export type TLayout = "auth" | "dashboard";

export type TRequestFilter = {
  prop: string;
  strategy: "equals" | "contains";
  value: number | string;
};

export type TSpecialty = {
  id: number;
  title: string;
};

export type TDoctor = {
  id: number;
  title: string;
  specialties: TSpecialty["id"][];

  experience: number;
  clinic: string;
  address: string;
  room: string;
  photo: string;
};

export type TVisiting = {
  id: string;
  doctor: number | TDoctor;
  dateTime: number;
  createdAt: number;
};
