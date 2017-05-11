// // Initialize Firebase
// //------------------------------------------------------
// var config = {
// apiKey: "AIzaSyAtY-zCyeszxyiCBVH6ytqyD1X3G5QzDGo",
// authDomain: "studybuddy-e45e3.firebaseapp.com",
// databaseURL: "https://studybuddy-e45e3.firebaseio.com",
// projectId: "studybuddy-e45e3",
// storageBucket: "studybuddy-e45e3.appspot.com",
// messagingSenderId: "162379515453"
// };

// firebase.initializeApp(config);

// const database = firebase.database();
// const auth = firebase.auth();

//--------------------------------------------------------------------
//------------------------------ jQuery ------------------------------

//add a realtime listener
auth.onAuthStateChanged(function(user) { 
    if(user) {
        $('#btnLogout').removeClass("hide");
    } else {
        console.log('Not logged in');
        $('#btnLogout').addClass("hide");
    }
    console.log('user', user);

  var queryUrl = "api/buddies/" + user.email;  

  $.get(queryUrl, function(data) {
    console.log(data);
    });


});


