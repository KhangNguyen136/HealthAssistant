import { serverUrl } from "../const";
import axios from "axios";

export async function saveMsg(data) {
    try {
        //data is list obj with 2 elements
        const res = await axios.post(serverUrl + 'msg/save', data);
        console.log(res.data);
    } catch (error) {
        console.log('Save error msg');
        console.log(error);
    }
}

export async function getHistory(n, id) {
    try {
        const res = await axios.get(serverUrl + 'msg/history', {
            params: { userID: id, n }
        })
        return res.data;
    } catch (error) {
        console.log('Get history fail');
        console.log(error);
    }
}

export async function searchOtherInfo(text) {
    try {
        const res = await axios.post(serverUrl + 'api/searchOtherInfo', { text });
        return res.data;
    } catch (error) {
        return null;
    }
}