import { baseUrl } from "./baseUrl";
import axios from "axios";
import userService from "../services/users";

const api = axios.create({
    baseURL: baseUrl,
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await userService.refresh()
                return api(originalRequest);
            } catch (err) {
                return Promise.reject(error);
            }
        }
    }
);

export { api }
