import axios from "axios";
import Cookies from "js-cookie";

// console.log(token);

export const auth = axios.create({
    baseURL: "http://localhost:5000/api/auth",
});

export const event = axios.create({
    baseURL: "http://localhost:5000/api/events",
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

event.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
        console.log("access token expired");
        if (error.response && error.response.status === 403) {
            originalRequest._retry = true;

            try {
                console.log("calling refresh token");
                const refreshToken = Cookies.get("refresh_token");
                const response = await auth.post(
                    "/refreshToken",
                    { refreshToken },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${refreshToken}`,
                        },
                    }
                );

                const { access_token } = response.data;

                Cookies.set("token", access_token);

                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${access_token}`;
                return axios(originalRequest);
            } catch (error) {
                // Handle refresh token error or redirect to login
                Cookies.remove("token");
                Cookies.remove("refresh_token");

                window.location.href = "/login";

                // window.location.href = "/login";
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

export const user = axios.create({
    baseURL: "http://localhost:5000/api/user",
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

user.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
        console.log("access token expired");
        if (error.response && error.response.status === 403) {
            originalRequest._retry = true;

            try {
                console.log("calling refresh token");
                const refreshToken = Cookies.get("refresh_token");
                const response = await auth.post(
                    "/refreshToken",
                    { refreshToken },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${refreshToken}`,
                        },
                    }
                );

                const { access_token } = response.data;

                Cookies.set("token", access_token);

                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${access_token}`;
                return axios(originalRequest);
            } catch (error) {
                // Handle refresh token error or redirect to login
                Cookies.remove("token");
                Cookies.remove("refresh_token");

                window.location.href = "/login";

                // window.location.href = "/login";
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

export const video = axios.create({
    baseURL: "http://localhost:5000/api/video",
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
video.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
        console.log("access token expired");
        if (error.response && error.response.status === 403) {
            originalRequest._retry = true;

            try {
                console.log("calling refresh token");
                const refreshToken = Cookies.get("refresh_token");
                const response = await auth.post(
                    "/refreshToken",
                    { refreshToken },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${refreshToken}`,
                        },
                    }
                );

                const { access_token } = response.data;

                Cookies.set("token", access_token);

                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${access_token}`;
                return axios(originalRequest);
            } catch (error) {
                // Handle refresh token error or redirect to login
                Cookies.remove("token");
                Cookies.remove("refresh_token");
                window.location.href = "/login";
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);
// video.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const navigate = useNavigate();

//         const originalRequest = error.config;

//         // If the error status is 401 and there is no originalRequest._retry flag,
//         // it means the token has expired and we need to refresh it
//         if (error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;

//             try {
//                 const refreshToken = Cookies.get("refresh_token");
//                 const response = await auth.post("/refreshToken", {
//                     refreshToken,
//                 });
//                 const { access_token } = response.data;

//                 Cookies.set("token", access_token);

//                 // Retry the original request with the new token
//                 originalRequest.headers.Authorization = `Bearer ${access_token}`;
//                 return axios(originalRequest);
//             } catch (error) {
//                 // Handle refresh token error or redirect to login
//                 navigate("/login");
//                 Cookies.remove("token");
//             }
//         }

//         return Promise.reject(error);
//     }
// );

export const comment = axios.create({
    baseURL: "http://localhost:5000/api/comment",
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
comment.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
        console.log("access token expired");
        if (error.response && error.response.status === 403) {
            originalRequest._retry = true;

            try {
                console.log("calling refresh token");
                const refreshToken = Cookies.get("refresh_token");
                const response = await auth.post(
                    "/refreshToken",
                    { refreshToken },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${refreshToken}`,
                        },
                    }
                );
                const { access_token } = response.data;

                Cookies.set("token", access_token);

                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${access_token}`;
                return axios(originalRequest);
            } catch (error) {
                // Handle refresh token error or redirect to login
                Cookies.remove("token");
                Cookies.remove("refresh_token");
                window.location.href = "/login";
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

export const conversation = axios.create({
    baseURL: "http://localhost:5000/api/conversation",
});

export const message = axios.create({
    baseURL: "http://localhost:5000/api/message",
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
message.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
        console.log("access token expired");
        if (error.response && error.response.status === 403) {
            originalRequest._retry = true;

            try {
                console.log("calling refresh token");
                const refreshToken = Cookies.get("refresh_token");
                const response = await auth.post(
                    "/refreshToken",
                    { refreshToken },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${refreshToken}`,
                        },
                    }
                );
                const { access_token } = response.data;

                Cookies.set("token", access_token);

                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${access_token}`;
                return axios(originalRequest);
            } catch (error) {
                // Handle refresh token error or redirect to login
                Cookies.remove("token");
                Cookies.remove("refresh_token");
                window.location.href = "/login";
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);
export const post = axios.create({
    baseURL: "http://localhost:5000/api/post",
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
post.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
        console.log("access token expired");
        if (error.response && error.response.status === 403) {
            originalRequest._retry = true;

            try {
                console.log("calling refresh token");
                const refreshToken = Cookies.get("refresh_token");
                const response = await auth.post(
                    "/refreshToken",
                    { refreshToken },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${refreshToken}`,
                        },
                    }
                );
                const { access_token } = response.data;

                Cookies.set("token", access_token);

                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${access_token}`;
                return axios(originalRequest);
            } catch (error) {
                // Handle refresh token error or redirect to login
                Cookies.remove("token");
                Cookies.remove("refresh_token");
                window.location.href = "/login";
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);
export const notification = axios.create({
    baseURL: "http://localhost:5000/api/notification",
    headers: {
        "Content-Type": "application/json",
    },
});

export const chatbot = axios.create({
    baseURL: "http://localhost:5000/api/chatbot",
    headers: {
        "Content-Type": "application/json",
    },
});
