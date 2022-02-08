import { serverUrl } from "../const";
import axios from "axios";

export async function sendFeedback(userId, rating, feedback) {
    try {
        const res = await axios.post(serverUrl + 'api/feedback/save', {
            userId, rating, feedback
        })
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }

}