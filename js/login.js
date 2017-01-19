    
    
    //add login event
    
login.addEventListener('click', e => {
    // get email and pass
    const email = $('#email').val();
    const pass = $('#password').val();
    const login = $('#login').val();
    const auth = firebase.auth();
    
    //sign in
    const promise= auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
})

// add signUp event
    signUp.addEventListener('click', e => {
    // get email and pass
    const email = $('#email').val();
    const pass = $('#password').val();
    const signUp = $('#signUp').val();
    const auth = firebase.auth();
    
    //sign in
    const promise= auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
    })
    
//log out
logout.addEventListener('click', e => {
    // get email and pass
   firebase.auth().signOut();
})

// add reatime listener
firebase.auth().onAuthStateChanged (firebaseUser => {    
    if (firebaseUser){
        console.log(firebaseUser);
        logout.classList.remove('hide');
        
    }else{
        console.log('not logged in');
        logout.classList.add('hide');
    }


});

}());
