import axios from "axios";
import Notify from "../helpers/notify";
import useApi from "./api";
import { ref } from "vue";
const { checkResponse, getResource } = useApi();

export default function useToken() {
    const isAdmin = ref<Boolean>(false);
    async function setToken(token: any) {
        localStorage.setItem('token', JSON.stringify(token));
    }

    function getAccessToken() {
        if (localStorage.getItem('token')) {
            return JSON.parse(localStorage.getItem('token')!);
        }
        return '';
    }

    async function clearToken() {
        localStorage.clear();
    }

    async function decodeToken() {
        try {
            const response = await getResource('/auth/whoami');
            await checkResponse(response);
            checkRole(response.data.type);
            return await response.data;
        } catch (error: any) {
            Notify.error(error.message);
        }
    }

    async function checkRole(role: string) {
        if (role === 'admin') {
            isAdmin.value = true;
            return;
        }
        isAdmin.value = false;
    }

    async function validateToken() {
        try {
            const payload = JSON.parse(window.atob((getAccessToken())!.split(".")[1]));
            const expired = payload.exp;
            const now = Date.now() / 1000;
            if (now > expired) {
                await refresh();
            }
        } catch (error: any) {
            console.log(error);
            Notify.error(error.message);
        }
    }

    async function refresh() {
        try {
            const { data } = await axios.post(import.meta.env.VITE_API_KMW + '/auth/refresh', {}, {
                headers: {
                    "Authorization": "Bearer " + getAccessToken(),
                }
            });
            await setToken(data.data.token);
            await decodeToken();
            return;
        } catch (error: any) {
            clearToken();
            Notify.error(error.message);
        }
    }


    return {
        setToken, clearToken, decodeToken, getAccessToken, validateToken, isAdmin, refresh
    };

}