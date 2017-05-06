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
var userRef = firebase.database().ref("user");

//--------------------------------------------------------------------
//------------------------------ jQuery ------------------------------

//login button event
$(document).on('click','#btnLogin', function(event) {
    event.preventDefault();

    user = {
        email: $('#loginEmail').val().trim(),
        password: $('#loginPassword').val().trim()
    };

    userRef.set(user.email).child(user.password);
    
    //Sign In Function
    auth.signInWithEmailAndPassword(user.email, user.password).catch(function(error) {
    // Error Handling
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    });

    $('#loginEmail').val('');
    $('#loginPassword').val('');
});

//signup button event
$(document).on('click','#btnSignup', function(event) {
    event.preventDefault();

    user = {
        email: $('#loginEmail').val().trim(),
        password: $('#loginPassword').val().trim()
    };

    //Create New Account Function
    auth.createUserWithEmailAndPassword(user.email, user.password).catch(function(error) {
        // Error Handling
        adduser(user);
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

// //create a user in the database on sign up
// function createUser(){
//    console.log("createuser executing");
//    console.log("1st: " + $("#signUpPass").val().trim() + "2nd: " + $("#signUpConfirmPass").val().trim() );
//     // if password fields haven't been filled, show error 
//     // and return to page
//    if ($("#signUpPass").val() === '' && $("#signUpConfirmPass").val() === '')
//    { 
//     console.log("passwords blank");
//      //switch content of modal to match error    
//      $(".modal-title").text("Passwords Empty: CreateUser1");
//      $(".modal-body").text("Password and Confirm Password cannot be left blank. Please try again.");
//      //display modal
//      $("#errorModal").modal("show"); 
//      added = false;
//    }
//    //if password and confirmPassword don't match
//    // show error and return to page
//    else if ($("#signUpPass").val() !== $("#signUpConfirmPass").val())
//    {
//     console.log("passwords don't match");
//      //switch content of modal to match error
//      $(".modal-title").text("Password Mismatch: CreateUser2");
//      $(".modal-body").text("Password and Confirm Password do not match. Please try again.");
//      //display modal
//      $("#errorModal").modal("show");
//       added = false;
//     }
//    else
//    { 
//     console.log("passwords match");
//     // passwords match so attempt firebase authorization sign up
//  	  user = {
//       email: $("#signUpEmail").val(),
//       password: $("#signUpPass").val().trim()
//     };
//      auth.createUserWithEmailAndPassword(user.email, user.password).catch(function(error) {
//      console.log("createuser: password ok. checking firebase");
// 		  // Handle Errors here.
//       // signup was not successful so change added to false
// 		   added = false;
// 		   console.log(added + " " + error);
//       // if user was added, wipe email from page
//        $("#signUpEmail").val("");
//    };
//       //wipe values in password fields regardless if user added
//      $("#signUpPass").val('');
//      $("#signUpConfirmPass").val('');

//    console.log("firebase auth executed.  added: " + added + "returning");
// };
  


// // firebase authorization sign in check
// function checkUserExist(userParam) {
//     //grab variables from the screen 

//       encodeEmail(userParam.email);
//      //wipe values in sign up fields
//      $("#loginPassword").val("");
//      $("#loginEmail").val("");
//      // sign in to firebase. 
//       auth.signInWithEmailAndPassword(userParam.email, userParam.password).catch(function(error) {
//          // sign in was not successful so show error
//          // and return to page
//            exist = false;
//            // var tempDiv = $('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>');
//            console.log(error.code + error.message);
//        });

//        console.log("firebase auth executed.  exist: " + exist + "returning");
// };

// function retrieveSearch() {
//   console.log("retrieveSearch Encodedemail " +encodedEmail);
//   var email = firebase.database().ref("user/" + encodedEmail);
//   email.once("value")
//       .then(function(snapshot) {
//           if (snapshot.child("search").exists()){
//             console.log("search param in database")
//             var searchHist = snapshot.val().search;
//            }
//            else {
//             console.log("no search param present")
//            };
//         });
// };

// when user signs up, add to firebase
function adduser(user) {
  encodeEmail(user.email);
  console.log(encodedEmail);
	   firebase.database().ref('user/' + encodedEmail).set(
        {
        email: user.email
        password: user.password
       });
	  console.log("password " + user.password);
};

// replace firebase invalid characters from email for storage
function encodeEmail(email) {
  // regex code to search for all "." and resplace with '%2E'
 encodedEmail = email.toLowerCase();
 encodedEmail =  encodedEmail.replace(/\./g, '%2E');

 console.log("encodeEmail: " + encodedEmail);
};

// return email to original format when retrieve from firebase
function decodeemail(email) {
   // regex code to search for all '%2E' and resplace with '.'
  return email.replace(/\%2E/g, '.');
};