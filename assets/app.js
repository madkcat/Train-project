$(document).ready(function() {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyCMEexNloXEZ6okykV5Li28Bf5wAkrR8Ow",
      authDomain: "train-project-9bff5.firebaseapp.com",
      databaseURL: "https://train-project-9bff5.firebaseio.com",
      projectId: "train-project-9bff5",
      storageBucket: "train-project-9bff5.appspot.com",
      messagingSenderId: "658846807025"
    };
    firebase.initializeApp(config);
    var trainData = firebase.database().ref();
    $("#addTrainBtn").on("click", function() {
      var trainName = $("#trainNameInput").val().trim();
      var lineName = $("#lineInput").val().trim();
      var destination = $("#destinationInput").val().trim();
      var trainTimeInput = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");;
      var frequencyInput = $("#frequencyInput").val().trim();
      console.log(trainName);
      console.log(lineName);
      console.log(destination);
      console.log(trainTimeInput);
      console.log(frequencyInput);
      var newTrain = {
        name: trainName,
        line: lineName,
        destination: destination,
        trainTime: trainTimeInput,
        frequency: frequencyInput,
      }
      trainData.push(newTrain);
      // clear text-boxes
      $("#trainNameInput").val("");
      $("#lineInput").val("");
      $("#destinationInput").val("");
      $("#trainTimeInput").val("");
      $("#frequencyInput").val("");
      return false;
    });
    trainData.on("child_added", function(childSnapshot, prevChildKey) {
      console.log(childSnapshot.val());
      var firebaseName = childSnapshot.val().name;
      var firebaseLine = childSnapshot.val().line;
      var firebaseDestination = childSnapshot.val().destination;
      var firebaseTrainTimeInput = childSnapshot.val().trainTime;
      var firebaseFrequency = childSnapshot.val().frequency;
      var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
      var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency;
      var minutes = firebaseFrequency - timeRemainder;
      var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A");
      console.log(minutes);
      console.log(nextTrainArrival);
      console.log(moment().format("hh:mm A"));
      console.log(nextTrainArrival);
      console.log(moment().format("X"));
      $("#trainTable > tbody").append("<tr><td>" + firebaseName + "</td><td>" + firebaseLine + "</td><td>" + firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");
    });
  });
  // bug 24) doesn't like midnight trains?