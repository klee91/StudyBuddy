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

    user = {
        email: $('#loginEmail').val().trim(),
        password: $('#loginPassword').val().trim()
    };
    
    //Sign In Function
    auth.signInWithEmailAndPassword(user.email, user.password).catch(function(error) {
        // Error Handling
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        window.alert("Sign In Error");
    });

    $('#loginEmail').val('');
    $('#loginPassword').val('');
});

//signup button event
$(document).on('click','#btnSignup', function(event) {
    event.preventDefault();
    console.log("Signing user up");
    user = {
        email: $('#loginEmail').val().trim(),
        password: $('#loginPassword').val().trim()
    };
    console.log(user);

    //Create New Account Function
    auth.createUserWithEmailAndPassword(user.email, user.password).catch(function(error, newuser, insertUID) {

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
auth.onAuthStateChanged(function(user) { 
    if(user) {
        $('#btnLogout').removeClass("hide");
    } else {
        console.log('Not logged in');
        $('#btnLogout').addClass("hide");
    }
    console.log('user', user);
    console.log(user.email);


});