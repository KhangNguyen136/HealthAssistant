import { showMessage } from "react-native-flash-message";

export default function errorHandle(error) {
    if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        showMessage({
            type: 'danger', message: error.response.data
        })
    } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        showMessage({
            type: 'danger', message: "Can't connect to server!"
        })
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        showMessage({
            type: 'danger', message: 'Something broken'
        })
    }
}