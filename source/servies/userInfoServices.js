import { serverUrl } from "../const";
import axios from "axios";
// const serverUrl = 'https://bca4-112-197-185-79.ngrok.io/';

export async function resgister(userId, email, displayName) {
    try {

        const res = await axios.post(serverUrl + 'api/user/register', {
            userId, email, displayName
        })
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }

}

export async function updateInfo(userId, displayName, fullName, birthday, phoneNumber) {
    try {
        const res = await axios.post(serverUrl + 'api/user/updateInfo', {
            userId, fullName, displayName, birthday, phoneNumber
        })
        return res.data.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getUserInfo(userId) {
    try {
        console.log(userId);
        const res = await axios.post(serverUrl + 'api/user/getInfo', {
            userId
        })
        return res.data
    } catch (error) {
        console.log(error);
        return null;
    }
}