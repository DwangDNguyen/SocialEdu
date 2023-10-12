import axios from "axios";
import Cookies from "js-cookie";

// console.log(token);

export const event = axios.create({
    baseURL: "https://social-website-study-api.vercel.app/api/events",
    headers: {
        "Content-Type": "application/json",
    },
});
event.interceptors.request.use(
    (config) => {
        const token = Cookies.get("token");
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const auth = axios.create({
    baseURL: "https://social-website-study-api.vercel.app/api/auth",
});

export const user = axios.create({
    baseURL: "https://social-website-study-api.vercel.app/api/user",
    headers: {
        "Content-Type": "application/json",
    },
});
user.interceptors.request.use(
    (config) => {
        const token = Cookies.get("token");
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const video = axios.create({
    baseURL: "https://social-website-study-api.vercel.app/api/video",
    headers: {
        "Content-Type": "application/json",
    },
});
video.interceptors.request.use(
    (config) => {
        const token = Cookies.get("token");
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const comment = axios.create({
    baseURL: "https://social-website-study-api.vercel.app/api/comment",
    headers: {
        "Content-Type": "application/json",
    },
});
comment.interceptors.request.use(
    (config) => {
        const token = Cookies.get("token");
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const conversation = axios.create({
    baseURL: "https://social-website-study-api.vercel.app/api/conversation",
});

export const message = axios.create({
    baseURL: "https://social-website-study-api.vercel.app/api/message",
});
message.interceptors.request.use(
    (config) => {
        const token = Cookies.get("token");
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const post = axios.create({
    baseURL: "https://social-website-study-api.vercel.app/api/post",
    headers: {
        "Content-Type": "application/json",
    },
});
post.interceptors.request.use(
    (config) => {
        const token = Cookies.get("token");
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const notification = axios.create({
    baseURL: "https://social-website-study-api.vercel.app/api/notification",
    headers: {
        "Content-Type": "application/json",
    },
});
