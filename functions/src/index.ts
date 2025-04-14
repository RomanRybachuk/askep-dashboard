import { onRequest } from "firebase-functions/v2/https";
const { setGlobalOptions } = require("firebase-functions/v2");
import { Request, Response } from "express";

import cors = require("cors");

setGlobalOptions({
  maxInstances: 10,
  region: "europe-west1",
});

const corsConfig = cors({
  origin: ["http://localhost:5173"],
});

const routesMap = [
  {
    url: "/feedback",
    method: "GET",
    controller: (request: Request, response: Response) => {
      response.status(201).send("/feedback");
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
