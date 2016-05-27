var user;

function signUp(){
    console.log("SOMEONE HAS SIGNED UP!");
    var processSignupRequest = function(result){
        console.log(result);
    }

    var url = "api/signup_user";
    var data = {
        "username" : document.getElementById("username-signup").value,
        "password" : document.getElementById("password-signup").value,
        "email" : document.getElementById("email-signup").value
    }
    postRequest(url, data, processSignupRequest);
}

function checkUsernameAvailability(){
    var timer;
    var username = document.getElementById("username-signup")
    
    clearTimeout(timer);
    
    if (user) return;
    if (username.value){
        setTimeout(function() { // assign timer a new timeout 
            // x = $.getJSON(...); // run ajax request and store in x variable (so we can cancel)
        var checkUsername = function(name){
            var url = "api/check-username";
            data = {"username" : name};
            getRequest(url, data, callback)
        }
        var processUsername = function(result){

        }
        if (username.value == user)
            console.log("USER EXISTS");
        else
            console.log("USER DOES NOT EXIST");
        
        }, 2000);
    }
}