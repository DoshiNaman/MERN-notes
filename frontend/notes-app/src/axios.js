import axios from "axios";

const instance = axios.create({
  baseURL: "https://mern-notes-backend-eta.vercel.app/", // Adjust the base URL as needed
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

export default instance; 