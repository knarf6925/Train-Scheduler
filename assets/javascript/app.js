var config = {
    apiKey: "AIzaSyCZQB3pQyeQNXpPcHoxTaQuB9IV5HxSks0",
    authDomain: "um-project-dd6e2.firebaseapp.com",
    databaseURL: "https://um-project-dd6e2.firebaseio.com",
    projectId: "um-project-dd6e2",
    storageBucket: "um-project-dd6e2.appspot.com",
    messagingSenderId: "781467276835"
};
firebase.initializeApp(config);

$(document).ready(function () {

    var database = firebase.database();

    var TrainName;
    var Destination;
    var FirstTrainTime;
    var Frequency;
    var MinutesAway;
    

    $("button").on("click", function () {

        TrainName = $("#TrainName").val().trim();
        Destination = $("#Destination").val().trim();
        FirstTrainTime = $("#FirstTrainTime").val().trim();
        Frequency = $("#Frequency").val().trim();
        MinutesAway = $("#monthsRate").val().trim();
        

        database.ref().push({
            TrainName: Name,
            Destination: Destination,
            FirstTrainTime: FirstTrainTime,
            Frequency: Frequency,
            MinutesAway: MinutesAway
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

            // Handle the errors
        }, function (errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });
    });

});





