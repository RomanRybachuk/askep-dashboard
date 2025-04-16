import { onRequest } from "firebase-functions/v2/https";
import { setGlobalOptions } from "firebase-functions/v2";
import { Request, Response } from "firebase-functions/v1";
import { verifyAuth } from "./utils";

import { db } from "./firebase";

import cors = require("cors");

interface TVisitingSnapshot {
  user: string;
  doctor: number;
  dateTime: string;
}

interface TVisitingData extends TVisitingSnapshot {
  id: string;
}

setGlobalOptions({
  maxInstances: 10,
  region: "europe-west1",
});

const corsConfig = cors({
  origin: [
    "http://localhost:5173",
    "https://askep-dashboard.web.app",
    "https://askep-dashboard.firebaseapp.com",
  ],
});

const routesMap = [
  {
    url: "/users/create",
    method: "POST",
    controller: async (request: Request, response: Response) => {
      const verifyResponse: any = await verifyAuth(request, response);

      if (!verifyResponse) {
        return response.status(401).send(401);
      }

      const userData = {
        data: true,
      };

      await db.collection("users").doc(request.body.id).set(userData);

      return response.status(200).send({ success: true, data: userData });
    },
  },
  {
    url: "/users/get",
    method: "GET",
    controller: async (request: Request, response: Response) => {
      const verifyResponse: any = await verifyAuth(request, response);

      if (!verifyResponse) {
        return response.status(401).send(401);
      }

      const userData = await db
        .collection("users")
        .doc(verifyResponse.uid)
        .get();

      return response
        .status(200)
        .send({ success: true, data: userData.data() });
    },
  },
  {
    url: "/visiting/create",
    method: "POST",
    controller: async (request: Request, response: Response) => {
      const verifyResponse: any = await verifyAuth(request, response);

      if (!verifyResponse) {
        return response.status(401).send(401);
      }

      const data = {
        doctor: request.body.doctor,
        dateTime: request.body.dateTime,
        createdAt: request.body.createdAt,
        user: verifyResponse.uid,
      };

      await db.collection("visiting").add(data);

      return response.status(200).send({ success: true, data: data });
    },
  },
  {
    url: "/visiting/cancel",
    method: "POST",
    controller: async (request: Request, response: Response) => {
      const verifyResponse: any = await verifyAuth(request, response);

      if (!verifyResponse) {
        return response.status(401).send(401);
      }

      await db.collection("visiting").doc(request.body.id).delete();

      return response.status(200).send({ success: true });
    },
  },
  {
    url: "/visiting/get",
    method: "GET",
    controller: async (request: Request, response: Response) => {
      const verifyResponse: any = await verifyAuth(request, response);

      if (!verifyResponse) {
        return response.status(401).send(401);
      }

      const snapshots = await db
        .collection("visiting")
        .orderBy("dateTime", "desc")
        .where("user", "==", verifyResponse.uid)
        .get();

      const data: TVisitingData[] = [];

      snapshots.forEach((snapshot) => {
        data.push({
          id: snapshot.id,
          ...(snapshot.data() as TVisitingSnapshot),
        });
      });

      return response.status(200).send({ success: true, data: data });
    },
  },
];

export const api = onRequest((request: Request, response: Response) => {
  corsConfig(request, response, () => {
    const currentRoute = routesMap.find((route) => route.url === request.path);

    if (!currentRoute) {
      return response.status(404).send(404);
    }

    if (currentRoute.method !== request.method) {
      return response.status(405).send(405);
    }

    currentRoute.controller(request, response);

    return true;
  });
});

export const apiStaging = api;
