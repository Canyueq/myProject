import request from "../utils/request";

export const api = {
  login: (data: any) => {
    return request.post("/auth/login", data);
  },
  signup: (data: any) => {
    return request.post("/auth/signup", data);
  },
  getUserInfo: () => {
    return request.post("/user/info");
  },
};
