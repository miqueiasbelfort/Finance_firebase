import firebase from "firebase/app"
import 'firebase/database'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDPDG4B4XXWoD9Q_QGUx8zBoXAgx62Ej1M",
    authDomain: "finance-d67f4.firebaseapp.com",
    databaseURL: "https://finance-d67f4-default-rtdb.firebaseio.com",
    projectId: "finance-d67f4",
    storageBucket: "finance-d67f4.appspot.com",
    messagingSenderId: "260534633241",
    appId: "1:260534633241:web:2e8d1d3d7cdc128ba5fb88"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export default firebase