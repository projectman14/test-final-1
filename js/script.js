
let toggleBtn = document.getElementById('toggle-btn');
let body = document.body;
let darkMode = localStorage.getItem('dark-mode');
let todaydate = document.getElementById("Current-Date");
let todaydate1 = document.getElementById("Current-Date-1");
let todaydate2 = document.getElementById("Current-Date-2");
let todaydate3 = document.getElementById("Current-Date-3");
let todaydate4 = document.getElementById("Current-Date-4");
let todaydate5 = document.getElementById("Current-Date-5");
let date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
// import { getDatabase , ref , set  } from "firebase/database";
// const database = getDatabase();
const firebaseApp = firebase.initializeApp({
   apiKey: "AIzaSyCHjgnRPQqr2czcLvQ6OFAQvy6AaQfbggI",
   authDomain: "ecap-b6bd3.firebaseapp.com",
   databaseURL: "https://ecap-b6bd3-default-rtdb.firebaseio.com",
   projectId: "ecap-b6bd3",
   storageBucket: "ecap-b6bd3.appspot.com",
   messagingSenderId: "822964620757",
   appId: "1:822964620757:web:911b5445e9c6819f15415c",
   measurementId: "G-9P6N39KQ6Q"
});
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
var database = firebaseApp.database();



const enableDarkMode = () => {
   toggleBtn.classList.replace('fa-sun', 'fa-moon');
   body.classList.add('dark');
   localStorage.setItem('dark-mode', 'enabled');
}

const disableDarkMode = () => {
   toggleBtn.classList.replace('fa-moon', 'fa-sun');
   body.classList.remove('dark');
   localStorage.setItem('dark-mode', 'disabled');
}

if (darkMode === 'enabled') {
   enableDarkMode();
}

toggleBtn.onclick = (e) => {
   darkMode = localStorage.getItem('dark-mode');
   if (darkMode === 'disabled') {
      enableDarkMode();
   } else {
      disableDarkMode();
   }
}

let profile = document.querySelector('.header .flex .profile');

document.querySelector('#user-btn').onclick = () => {
   profile.classList.toggle('active');
   search.classList.remove('active');
}

let search = document.querySelector('.header .flex .search-form');

document.querySelector('#search-btn').onclick = () => {
   search.classList.toggle('active');
   profile.classList.remove('active');
}

let sideBar = document.querySelector('.side-bar');

document.querySelector('#menu-btn').onclick = () => {
   sideBar.classList.toggle('active');
   body.classList.toggle('active');
}

document.querySelector('#close-btn').onclick = () => {
   sideBar.classList.remove('active');
   body.classList.remove('active');
}

window.onscroll = () => {
   profile.classList.remove('active');
   search.classList.remove('active');

   if (window.innerWidth < 1200) {
      sideBar.classList.remove('active');
      body.classList.remove('active');
   }
}

// function checkusername() {
//    var DesireUsername = document.getElementById("username").value;
//    const dbRef = firebase.database().ref();
//    const usernameToCheck = "lakshyajain_14"; // Replace with the username you want to check

//    dbRef.child("users").orderByChild("username").equalTo(DesireUsername).get().then((snapshot) => {
//       if (snapshot.exists()) {
//          console.log("Username is taken.");
//       } else {
//          console.log("Username is available.");
//       }
//    }).catch((error) => {
//       console.error(error);
//    });

// }


// todaydate.innerHTML = day +"-"+ month +"-"+ year;
// todaydate1.innerHTML = day +"-"+ month +"-"+ year;
// todaydate2.innerHTML = day +"-"+ month +"-"+ year;
// todaydate3.innerHTML = day +"-"+ month +"-"+ year;
// todaydate4.innerHTML = day +"-"+ month +"-"+ year;
// todaydate5.innerHTML = day +"-"+ month +"-"+ year;

const SignUp = () => {
   const email = document.getElementById("email").value;
   const password = document.getElementById("password").value;
   console.log(email, password);
   firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
         // Signed in
         alert("SignUp Successfull");
         window.location.assign("login.html");
         console.log(result);
         // ...
      })
      .catch((error) => {
         var errorCode = error.code;
         var errorMessage = error.message;
         alert(errorMessage);
         // ..
      });
}

const SignIn = () => {
   const email = document.getElementById("lemail").value;
   const password = document.getElementById("lpassword").value;
   console.log(email, password);


   firebase.auth().signInWithEmailAndPassword(email, password)
      .then((result) => {
         // Signed in
         window.location.replace("home.html");
         console.log(result);
         // ...
      })
      .catch((error) => {
         var errorCode = error.code;
         var errorMessage = error.message;
         alert(errorMessage);
      });
}


const SignOut = () => {
   firebase.auth().signOut().then((result) => {
      // Sign-out successful.
      // alert("SignOut Sucessfull");
      window.location.replace("login.html");
      console.log(result);
      
   }).catch((error) => {
      // An error happened.
   });
}





document.getElementsByClassName("option-btn")[0].innerHTML = "Logout";
document.getElementById("p-log").innerHTML = "LogIn";

document.getElementsByClassName("option-btn")[0].onclick = function () {
   SignOut();
}

document.getElementById("p-log").onclick = function () {
   window.location.assign("login.html");
}

// let p = document.getElementById("lemail").value; 

function save() {
   var email = document.getElementById("email").value;
   var password = document.getElementById("password").value;
   var username = document.getElementById("username").value;
   var name = document.getElementById("name").value;

   database.ref('users/' + username).set({
      name: name,
      email: email,
      password: password,
      username:username
   })

}

var name1;
function get() {
   var username = document.getElementById("lusername").value;
   // var email = document.getElementById("lemail").value;

   var ref = firebase.database().ref("users/"+username);
   ref.once("value") 
      .then(function (snapshot) {
         name1 = snapshot.child("name").val(); // {first:"Ada",last:"Lovelace"}
         alert(name1);

         var passdata = name1;

         sessionStorage.setItem("nameshow", passdata);
         
         
      });
}

function update () {
   var name = document.getElementById("upname").value;
   var username = document.getElementById("usernameup").value;

   var updates = {
      name: name
   }

   database.ref('users/' + username).update(updates)

   alert('sucess');

   //to show name again;
   var ref = firebase.database().ref("users/"+username);
   ref.once("value") 
      .then(function (snapshot) {
         name1 = snapshot.child("name").val(); 
         var passdata = name1;
         sessionStorage.setItem("nameshow", passdata);
         window.location.reload();
         
         
      });

}

function sendEmail() {
   (function(){
      emailjs.init("5GYCjratp_kB7LuEN");

   })();

   var params = {
      sendername : document.getElementById("conusername").value,
      message : document.getElementById("conbody").value,
      subject : document.getElementById("conroll").value

   };

   var serviceID = "service_1ikqpgz";
   var templateID = "template_7sulgy6";

   emailjs.send(serviceID , templateID , params)
   .then( res=> {
      alert("Sucess");
   })
   .catch();
}

function registerSpotlight () {

   let username = prompt('Enter Your Username To Conform');

   database.ref('events/' + 'spotlight/' + username ).set({
      username: username,
   })   
}

function registerDuolouge () {

   let username = prompt('Enter Your Username To Conform');

   database.ref('events/' + 'Duolouge/' + username ).set({
      username: username,
   })   
}

function inkiit () {

   let username = prompt('Enter Your Username To Conform');

   database.ref('events/' + 'Inkiit/' + username ).set({
      username: username,
   })   
}

function cricketInterYear () {

   let username = prompt('Enter Your Username To Conform');

   database.ref('events/' + 'Cricket/' + username ).set({
      username: username,
   })   
}

function BasketballInterYear () {

   let username = prompt('Enter Your Username To Conform');

   database.ref('events/' + 'basketball/' + username ).set({
      username: username,
   })   
}

function polygon () {

   let username = prompt('Enter Your Username To Conform');

   database.ref('events/' + 'polygon Guide/' + username ).set({
      username: username,
   })   
}

function web3Talks () {

   let username = prompt('Enter Your Username To Conform');

   database.ref('events/' + 'Web3 Talk/' + username ).set({
      username: username,
   })   
}

function Dules () {

   let username = prompt('Enter Your Username To Conform');

   database.ref('events/' + 'Dules/' + username ).set({
      username: username,
   })   
}

function Enigma () {

   let username = prompt('Enter Your Username To Conform');

   database.ref('events/' + 'Enigma/' + username ).set({
      username: username,
   })   
}

function avegGrp () {

   let username = prompt('Enter Your Username To Conform');

   database.ref('events/' + 'Aaveg/' + username ).set({
      username: username,
   })   
}

function odeum () {

   let username = prompt('Enter Your Username To Conform');

   database.ref('events/' + 'Odeum/' + username ).set({
      username: username,
   })   
}

function throughTheLens() {

   let username = prompt('Enter Your Username To Conform');

   database.ref('events/' + 'Through The Lenses/' + username ).set({
      username: username,
   })   
}

function photoWorkshop() {

   let username = prompt('Enter Your Username To Conform');

   database.ref('events/' + 'Photography Workshop/' + username ).set({
      username: username,
   })   
}

function sharkTank() {

   let username = prompt('Enter Your Username To Conform');

   database.ref('events/' + 'Shark Tank LNM/' + username ).set({
      username: username,
   })   
}

function startUp() {

   let username = prompt('Enter Your Username To Conform');

   database.ref('events/' + 'StartUp Weekend/' + username ).set({
      username: username,
   })   
}















