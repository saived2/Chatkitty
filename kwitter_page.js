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
room_name=localStorage.getItem("room_name");

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name:user_name,
            message:msg,
            like:0
      });
      document.getElementById("msg").value = "";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
name= message_data['name'];
message= message_data['message'];
like= message_data['like'];
nametag="<h4>"+ name+ "<img class='user_tick' src='tick.png'></h4>";
messtag="<h4 class='message_h4'>"+message +"</h4>";
like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+like+"</span></button><hr>";
row = nametag + messtag +like_button + span_with_tag;
document.getElementById("output").innerHTML += row;

//End code
      } });  }); }
getData();

      function logout(){
            localStorage.removeItem("user_name");
            localStorage.removeItem("room_name");
            window.location = "index.html";
      }

      function updateLike(message_id) {
      button_id = message_id;
      likes = document.getElementById(button_id).value;
           updated_likes = Number(likes) + 1;
           
           firebase.database().ref(room_name).child(message_id).update({
            like : updated_likes
           });
      }
