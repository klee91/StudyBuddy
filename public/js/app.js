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
    // location.reload();
    //Sign In Function
    auth.signInWithEmailAndPassword(user.email, user.password).catch(function(error) {
        // Error Handling
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        window.alert("Sign In Error. Please input correct username/password");
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
    window.location.href = "/";
    
});

//logout button event
$(document).on('click','#btnLogout', function(event) {
    event.preventDefault();

    //Sign Out Function
    auth.signOut().then(function() {
        console.log("user signed out");
        window.location.href = "/";
    }).catch(function(error) {
        console.log("Error: Sign Out " + error);
    });
});

//add a realtime listener
auth.onAuthStateChanged(function(user) { 
    if(user) {
        $('.circlemenu').show();
        $(document).on('click', '#seeProfile', function(event){
            event.preventDefault();
            window.location.href = "/profile?email=" + user.email;
        });
        $(document).on('click', '#seeSettings', function(event){
            event.preventDefault();
            window.location.href = "/settings";
        });

        $(document).on('click', '#seeStudybuddy', function(event){
            event.preventDefault();
            window.location.href = "/studybuddy";
        });
        
        $(document).on('click', '#seeChat', function(event){
            event.preventDefault();
            window.location.href = "/chat";
        });
    } else {
        console.log('Not logged in');
        $('.circlemenu').hide();
    }
    console.log('user', user);
    console.log(user.email);

});

$(document).on("click", "#btnSettings", function(event){
    event.preventDefault();

    window.location.href = "/settings";
});