$(document).ready(function(){
    $("#login").click(function(){
        var provider = new firebase.auth.GoogleAuthProvider();
        var user;
        firebase.auth().signInWithPopup(provider)
        .then(function(result){
            console.log(result.user)
    }).catch(function(err) {
        console.log(err)
    })
    })
   
});