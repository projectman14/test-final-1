const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCHjgnRPQqr2czcLvQ6OFAQvy6AaQfbggI",
    authDomain: "ecap-b6bd3.firebaseapp.com",
    projectId: "ecap-b6bd3",
    storageBucket: "ecap-b6bd3.appspot.com",
    messagingSenderId: "822964620757",
    appId: "1:822964620757:web:911b5445e9c6819f15415c",
    measurementId: "G-9P6N39KQ6Q"
});
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

const SignUp=()=>{
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    alert(email);
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
}