import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import axios from 'axios'
var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const getNotificationToken = async() => {
    await getToken(messaging, { vapidKey: '' }).then(async(currentToken) => {
        // debugger
        if (currentToken) {
            console.log('current token for client: ', currentToken);
            localStorage.setItem('fcm-token', currentToken);
            await axios.post('http://localhost:8000/register', {token:currentToken});
            // Track the token -> client mapping, by sending to backend server
            // show on the UI that permission is secured
        } else {
            console.log('No registration token available. Request permission to generate one.');
            // shows on the UI that permission is required 
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // catch error while creating client token
    });
}

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });