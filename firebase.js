// Initialize Firebase
    var config = {
      apiKey: "AIzaSyD0eqc2eJpYHPkZUlHo5ShrLPJEMCAQe_g",
      authDomain: "ghost-hunting.firebaseapp.com",
      databaseURL: "https://ghost-hunting.firebaseio.com",
      projectId: "ghost-hunting",
      storageBucket: "ghost-hunting.appspot.com",
      messagingSenderId: "654748020520"
    };
      //initialize your firebase
   firebase.initializeApp(config);
   var database = firebase.database();
   
   //create a variable to hold our orders list from firebase
   var firebaseOrdersCollection = database.ref().child('scores');
   //this function is called when the submit button is clicked
   function submitScore(score) {
      //Grab order data from the form
      var newScore = {
         score: score //another way you could write is $('#myForm [name="fullname"]').
      };
      
      //'push' (aka add) your order to the existing list
      firebaseOrdersCollection.push(newScore); //'orders' is the name of the 'collection' (aka database table)
      
   };
   
   //create a 'listener' which waits for changes to the values inside the firebaseOrdersCollection 
   firebaseOrdersCollection.on('value',function(scores){

        //create an empty string that will hold our new HTML
      var highestScore = 0;
      scores.forEach(function(scoreReference)
      {
         //this gets the actual data (JSON) for the order.
         var score = scoreReference.val()['score'];
         if (score>highestScore)
         {
          highestScore=score;
         }
      });       
      console.log(highestScore); //check your console to see it!               
      //actaull put the html on the page inside the element with the id PreviousOrders
      $('.scores').append('<div class = "text" id="score">Highest Score: '+highestScore+'</div>');
        
      //note: an alternative approach would be to create a hidden html element for one order on the page, duplicate it in the forEach loop, unhide it, and replace the information, and add it back. 
    });