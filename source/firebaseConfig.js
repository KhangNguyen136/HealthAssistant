import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCcCeG12jbDMMkjkFiJKj0P0ahTjkfie3c",
    authDomain: "healthassistant-6c04e.firebaseapp.com",
    projectId: "healthassistant-6c04e",
    storageBucket: "healthassistant-6c04e.appspot.com",
    messagingSenderId: "509181761609",
    appId: "1:509181761609:web:70b1cc1d53d010975c8798",
    measurementId: "G-L5STZJV1B7"
};

export default firebaseApp = firebase.initializeApp(firebaseConfig);