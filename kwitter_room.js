var firebaseConfig = {
      apiKey: "AIzaSyC8YjCL_qhq3FRtG0U0u6pLxMBxGwz-BFo",
      authDomain: "kwitter-cd58f.firebaseapp.com",
      databaseURL: "https://kwitter-cd58f-default-rtdb.firebaseio.com",
      projectId: "kwitter-cd58f",
      storageBucket: "kwitter-cd58f.appspot.com",
      messagingSenderId: "385123823497",
      appId: "1:385123823497:web:5d5c6796963a56b56fbb58"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    user_name=localStorage.getItem("user_name");
    document.getElementById("user_name").innerHTML="Welcome "+user_name+" ! ;)";

    function addroom() {
      room_name = document.getElementById("room_name").value;

      firebase.database().ref("/").child(room_name).update({
            purpose : "adding room name"
      });

      localStorage.setItem("room_name", room_name);

      window.location="kwitter_page.html";
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      //Start code
      row="<div class='room_name' id="+Room_names+" onclick='redirect(this.id)'>#" +Room_names+"</div><hr>";
      document.getElementById("output").innerHTML += row;
      //End code
      });});}
getData();

function redirect(name){
      localStorage.setItem("room_name", name);
      window.location="kwitter_page.html";
}

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}
