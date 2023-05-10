import axios from "axios";
import { auth } from "../redux/axios/axios";

export async function getUser({ username }) {
    try {
        const { data } = await axios.get(`/api/user/${username}`);
        return data;
    } catch (err) {
        return err;
    }
}

export async function registerUser(credentials) {
    try {
        const {
            data: { msg },
        } = await auth.post("/register", credentials);
        let { email, username } = credentials;

        return Promise.resolve(msg);
    } catch (err) {
        return Promise.reject(err);
    }
}

export async function loginUser({ email, password }) {
    try {
        if (email) {
            const { data } = await auth.post("/login", { email, password });
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error: "Password doesn't Match...!" });
    }
}
