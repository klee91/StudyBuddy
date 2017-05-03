
//<----------- Firebase script ----------->
<script src="https://www.gstatic.com/firebasejs/3.9.0/firebase.js"></script>

// Initialize Firebase
//------------------------------------------------------
var config = {
apiKey: "AIzaSyAtY-zCyeszxyiCBVH6ytqyD1X3G5QzDGo",
authDomain: "studybuddy-e45e3.firebaseapp.com",
databaseURL: "https://studybuddy-e45e3.firebaseio.com",
projectId: "studybuddy-e45e3",
storageBucket: "studybuddy-e45e3.appspot.com",
messagingSenderId: "162379515453"
};

firebase.initializeApp(config);

var database = firebase.database();
//------------------------------------------------------

//Create New Account Function
firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Error Handling
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorCode);
  console.log(errorMessage);
});

//Sign In Function
firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Error Handling
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorCode);
  console.log(errorMessage);
});

//Sign Out Function
firebase.auth().signOut().then(function() {
  console.log("user signed out");
}).catch(function(error) {
  console.log("Error: Sign Out " + error)
});