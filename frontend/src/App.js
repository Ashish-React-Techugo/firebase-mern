import React, { useState, useEffect } from "react";
import { getNotificationToken, onMessageListener } from "./firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


function App() {
  const [notification, setNotification] = useState({ title: '', body: '' });
  const notify = () => {
    toast.success(<ToastDisplay />)
  };
  function ToastDisplay() {
    return (
      <div>
        <p><b>{notification?.title}</b></p>
        <p>{notification?.body}</p>
        <img style={{ width: "25px", height: "25px" }} src={notification?.imageUrl} alt="" />
      </div>
    );
  };

  useEffect(() => {
    if (notification?.title) {
      notify()
    }
  }, [notification])

  useEffect(() => {
    getNotificationToken();
  }, [])

  onMessageListener()
    .then((payload) => {
      console.log(payload?.notification || "Received")
      setNotification({ title: payload?.notification?.title, body: payload?.notification?.body });
    })
    .catch((err) => console.log('failed: ', err));

  const sendNotification = async () => {
    await axios.post('http://localhost:8000/notifications', { title: "Hello 123", body: "How are you feeling", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp7GzicHxh05lpi8qm59yc9uuO2P6b3IyH5g&usqp=CAU" });
  }
  return (
    <div className="App">
      <ToastContainer />
      <h1>Click button to send notification</h1>
      <button onClick={sendNotification}>Send</button>
    </div >
  );
}

export default App;
