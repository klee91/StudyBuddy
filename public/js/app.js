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

const database = firebase.database();
const auth = firebase.auth();

//--------------------------------------------------------------------

//------------------------------ jQuery ------------------------------

//login button event
$(document).on('click','#btnLogin', function(event) {
    event.preventDefault();

    var email = $('#loginEmail').val().trim();
    var password = $('#loginPassword').val().trim();

    database.ref().set(email).child(password)
    
    //Sign In Function
    auth.signInWithEmailAndPassword(email, password).catch(function(error) {
    // Error Handling
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    });
});

//signup button event
$(document).on('click','#btnSignup', function(event) {
    event.preventDefault();

    //Create New Account Function
    auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Error Handling
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    });
});

//logout button event
$(document).on('click','#btnLogout', function(event) {
    event.preventDefault();

    //Sign Out Function
    auth.signOut().then(function() {
        console.log("user signed out");
    }).catch(function(error) {
        console.log("Error: Sign Out " + error);
    });
});

//add a realtime listener
auth.onAuthStateChange(User => { 
    if(User) {
        console.log(User);
        $('#btnLogout').removeClass("hide");
    } else {
        console.log('Not logged in');
        $('#btnLogout').addClass("hide");
    }
});