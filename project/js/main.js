$(document).ready(function(){
  getPosts();
})

function getPosts(){
  return firebase.database().ref("posts").once('value').then((snapshot) => {
    var posts = snapshot.val();
    console.log(posts);
    for(var postKey in posts){
      var post = posts[postKey];
      $("#post-listing").append("<div>"+post.title+" - "+post.body+" </div>");
    }
  });
}


function handleMessageFormSubmit(){
  var postTitle = $("#post-title").val();
  var postBody = $("#post-body").val();
  addMessage(postTitle,postBody);
}

function addMessage(postTitle,postBody){
var postData = {
  title: postTitle,
  body : postBody
}
var database = firebase.database().ref("posts");
// Create a new post reference with an auto-generated id

var newPostRef = database.push();
newPostRef.set(postData, (error) => {
  if (error) {
    // The write failed...
  } else {
    // Data saved successfully!
    window.location.reload();
  }
});

}

function handleSignIn(){
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user.email);
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}


function getWeatherByName(searchQuery){
  var url = "https://api.openweathermap.org/data/2.5/weather?q="+searchQuery+"&lang=tr&units=metric&appid="+apiKey;
  
  $(".city").text("");
  $(".temp").text("");
  $(".error-message").text("")

  $.ajax(url,{success: function(data){
  // console.log(data);
  $(".city").text(data.name);
  $(".temp").text(data.main.temp);
  
  },error: function(error){
    $(".error-message").text("Bir hata oluştu");
  
  }})
  }

function searchWeather(){
  var searchQuery = $(".search").val();
  getWeatherByName(searchQuery)
}
// function getWeather(){
// var url = "http://api.openweathermap.org/data/2.5/weather?id=323786&lang=tr&units=metric&appid="+apiKey;

// $.ajax(url,{success: function(data){
// // console.log(data);
// $(".city").text(data.name);
// $(".temp").text(data.main.temp);

// },error: function(error){
//   $(".error-message").text("Bir hata oluştu");

// }})
// }


// function showPicture(){
//   // use jQuery ($ is shorthand) to find the div on the page and then change the html
//   // 'rounded-circle' is a bootstrap thing! Check out more here: http://getbootstrap.com/css/
//   $("#image").append('<img class="rounded-circle" src="images/high-five.gif"/>');
//   $("p").html("High five! You're building your first web app!");

//   // jQuery can do a lot of crazy stuff, so make sure to Google around to find out more
  
// } 323786