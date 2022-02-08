import { serverUrl } from "../const";
import axios from "axios";

export async function saveMsg(userId, msg) {
    try {
        //data is list obj with 2 elements
        axios.post(serverUrl + 'api/historyChat/saveMsg', { userId, msg });
        // console.log(res.data);
    } catch (error) {
        console.log('Save error msg');
        console.log(error);
    }
}

export async function loadMsg(userId, currentN) {
    try {
        console.log({ userId, currentN });
        const res = await axios.post(serverUrl + 'api/historyChat/loadHistory', {
            userId, currentN
        })
        console.log(res.data.data.length);
        const data = [];
        res.data.data.forEach(item =>
            data.push(item.msg))
        return data;
    } catch (error) {
        console.log('Get history fail');
        console.log(error);
        return [];
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