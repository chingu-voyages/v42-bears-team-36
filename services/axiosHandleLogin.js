import axiosInstance from "./axiosInstance";

export default async function handleLogin(email, password) {
  const response = await axiosInstance.post("/login", {
    email,
    password,
  });
  return response.data;
}
