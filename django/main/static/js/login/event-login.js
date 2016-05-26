function attachEventToLogin(event){
    if (event.keyCode == 13)
        document.getElementById("login_button").click();
}

// Authenticates user when user enters username and password
function loginEvent(){
    var verifyUser = function(username, password){
        var url = "api/login";
        var data = {
            "username": username,
            "password": password
        };
        getRequest(url, data, processUser); //ajax.js
    }

    var processUser = function(result){
        var user = result;
        current_user = user;
        showHome(user); //home.js
    }
    
    var username = document.getElementById("username");
    var password = document.getElementById("password");
    verifyUser(username.value, password.value);
    console.log("Login Button Clicked!");
}