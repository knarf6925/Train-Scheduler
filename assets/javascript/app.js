// Initialize Firebase
var config = {
    apiKey: "AIzaSyBMsxDCeB2YxWT7_rWhclSBr1xSKO1y4rc",
    authDomain: "train-scheduler-4a315.firebaseapp.com",
    databaseURL: "https://train-scheduler-4a315.firebaseio.com",
    projectId: "train-scheduler-4a315",
    storageBucket: "train-scheduler-4a315.appspot.com",
    messagingSenderId: "810942950494"
};
firebase.initializeApp(config);

var trainData = firebase.database();


$("#addTrainBtn").on("click", function () {
  
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(),"HH:mm").subtract(10,"years").format("x");
    var frequency = $("#frequencyInput").val().trim();



   var newTrain = {
       name: trainName,
       destination: destination,
       firstTrain: firstTrain,
       frequency: frequency
   }
   trainData.ref().push(newTrain);

    alert("Train Added!");

   $("#trainNameInput").val("");
   $("#destinationInput").val("");
   $("#firstTrainInput").val("");
   $("#frequencyInput").val("");

   return false;

})

trainData.ref().on("child_added",function(snapshot) {
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;

    var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes,"m").format("hh:mm A");

    console.log(remainder);
    console.log(minutes);
    console.log(arrival);

$("#trainTable > tbody").prepend("<tr><td>"+name+"<td><td>"+destination+"<td><td>"+frequency+"<td><td>"+arrival+"<td><td>"+
minutes+"<td><tr>");


});




   






















