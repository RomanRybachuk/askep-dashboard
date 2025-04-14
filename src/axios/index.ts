import axios from "axios";
import { authState } from "@/firebase";

const request = axios.create({
  baseURL: import.meta.env.ENV_SERVER_BASE_URL,
});

async function getAccessToken() {
  const user: any = await authState();

  if (user) return user.accessToken;

  return "";
}

request.interceptors.request.use(
  async (request) => {
    request.headers["Authorization"] = `Bearer ${await getAccessToken()}`;

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.data &&
      error.response.data.idTokenExpired
    ) {
      originalRequest.headers[
        "Authorization"
      ] = `Bearer ${await getAccessToken()}`;

      const newURL = new URL("https://fake" + originalRequest.url);
      newURL.searchParams.set("second", "1");

      originalRequest.url = newURL.pathname + newURL.search;

      request(originalRequest);
    }
  }
);

export default request;
