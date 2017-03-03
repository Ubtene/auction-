
  // Initialize Firebas
  var config = {
    apiKey: "AIzaSyBrRC4FZkFlBTq1s3ZNVUZOaElhw_UNr9I",
    authDomain: "test-3975c.firebaseapp.com",
    databaseURL: "https://test-3975c.firebaseio.com",
    storageBucket: "test-3975c.appspot.com",
    messagingSenderId: "682933607636"
  };
    firebase.initializeApp(config);

// Create a variable to reference the database

var database = firebase.database();
// Initial Values
var initialBid = 0;
var initialBidder = "No one";
var highPrice = initialBid;
var highBidder = initialBidder;

// --------------------------------------------------------------

// At the initial load, get a snapshot of the current data.
database.ref().on("value", function(snapshot) {

  // If Firebase has a highPrice and highBidder stored (first case)
  if (snapshot.child("highestBidder").exists() && snapshot.child("highestPrice").exists()) {

    // Set the initial variables for highBidder equal to the stored values.

    highPrice = snapshot.val().highestPrice;
    $("#highest-price").html(highPrice);

    // Change the HTML to reflect the initial value

    highBidder = snapshot.val().highestBidder;
    $("#highest-bidder").html(highBidder);


  }

  // Keep the initial variables for highBidder equal to the initial values
  else {

    $("#highest-bidder").html(highBidder)

    $("#highest-price").html("$" + highPrice);
  }

});

// If any errors are experienced, log them to console.
// }, function(errorObject) {
//   console.log("The read failed: " + errorObject.code);
// });

// --------------------------------------------------------------

// Whenever a user clicks the submit-bid button
$("#submit-bid").on("click", function(event) {
  // Prevent form from submitting
  event.preventDefault();


// Get the input values


var bidderName  = $("#bidder-name").val().trim();



var bidderPrice =$("#bidder-price").val().trim();

console.log(bidderPrice);
console.log(bidderName);

if (bidderPrice >= 500  ) {


  if (bidderPrice > highPrice)  {

    // Alert

    alert("You are now the highest bidder " + bidderName + "!"   );

    // Save the new price in Firebase

    database.ref().set({

    highestBidder: bidderName,    
    highestPrice: bidderPrice,

    }); 

    $("#bidder-name").val("");

    $("#bidder-price").val("");

    // Log the new High Price


    // Store the new high price and bidder name as a local variable (could have also used the Firebase variable)


    // Change the HTML to reflect the new high price and bidder

  }

  else {
    // Alert
    alert("Sorry that bid is too low. Try again.");

     $("#bidder-name").val("");

    $("#bidder-price").val("");

  }

}


else{

  alert("Please input a price equal to or above the reserve price");

   $("#bidder-name").val("");

    $("#bidder-price").val("");
  


} 
    // return false;     


});
