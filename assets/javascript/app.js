var config = {
    apiKey: "AIzaSyBMsxDCeB2YxWT7_rWhclSBr1xSKO1y4rc",
    authDomain: "train-scheduler-4a315.firebaseapp.com",
    databaseURL: "https://train-scheduler-4a315.firebaseio.com",
    projectId: "train-scheduler-4a315",
    storageBucket: "",
    messagingSenderId: "810942950494"
};
firebase.initializeApp(config);

setInterval(function () {
    $('.current-time').html(moment().format('hh:mm:ss A'))
}, 1000);

moment().format('MMMM Do YYYY, h:mm:ss a');

var database = firebase.database();

var TrainName;
var Destination;
var FirstTrainTime;
var Frequency;
var MinutesAway;


$("button").on("click", function () {
    event.preventDefault();
    alert("Train added");
    TrainName = $("#TrainName").val().trim();
    Destination = $("#Destination").val().trim();
    FirstTrainTime = $("#FirstTrainTime").val().trim();
    Frequency = $("#Frequency").val().trim();
    MinutesAway = $("#MinutesAway").val().trim();


    database.ref().push({
        TrainName: TrainName,
        Destination: Destination,
        FirstTrainTime: FirstTrainTime,
        Frequency: Frequency,
        MinutesAway: MinutesAway,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });


    database.ref().on("child_added", function (snapshot) {
        // Log everything that's coming out of snapshot
        console.log(snapshot.val());
        console.log(snapshot.val().TrainName);
        console.log(snapshot.val().Destination);
        console.log(snapshot.val().FirstTrainTime);
        console.log(snapshot.val().Frequency);
        console.log(snapshot.val().MinutesAway);

        // Change the HTML to reflect
        $("#TrainName").text(snapshot.val().TrainName);
        $("#Destination").text(snapshot.val().Destination);
        $("#FirstTrainTime").text(snapshot.val().FirstTrainTime);
        $("#Frequency").text(snapshot.val().Frequency);
        $("#MinutesAway").text(snapshot.val().MinutesAway);

        addToTable();


        function addToTable() {

            var tbody = $("tbody");
            tbody.append("<tr><td>" + TrainName + "</td><td>" + Destination + "</td><td>" +
                FirstTrainTime + "</td><td>" + Frequency + "</td><td>" + MinutesAway + "</td><td>");
        }


        // Handle the errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

});















