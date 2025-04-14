import { auth } from "./firebase";
import { Request, Response } from "express";

export async function verifyAuth(request: Request, response: Response) {
  const authorizationHeader = request.headers["authorization"];

  if (!authorizationHeader) return null;

  const accessToken = authorizationHeader.split("Bearer ")[1];

  try {
    return await auth.verifyIdToken(accessToken as string);
  } catch (error: any) {
    if (error.code === "auth/id-token-expired" && !request.query.second) {
      return response.status(401).send({ idTokenExpired: true });
    } else {
      return null;
    }
  }
}
