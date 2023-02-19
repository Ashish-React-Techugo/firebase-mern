go to google firebase console
create new app and get the credentials
frontend 
-> in public folder in firebase-messaging-sw.js -> var firebaseConfig paste your firebase credentials
-> in src folder in firebase.js -> var firebaseConfig paste your firebase  and you vapidKey

backend
-> in firebase.json file -> firebase project got to project-> project settings -> Service accounts->Generate new private key->get private key and paste the entire json in firebase.json file