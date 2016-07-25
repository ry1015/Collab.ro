// Attach event to return key button
// Event causes user to log in
function attachEventToLogin(event)
{
    if (event.keyCode == 13)
        document.getElementById("login_button").click();
}

// Authenticates user when user enters username and password
function loginEvent()
{
    console.log("Login Button Clicked!");
    var processUser = function(result)
    {
        var user = result;
        current_user = result;
        showHome(current_user); //home.js
    }

    var url = "api/login";
    var data = 
    {
        "username": document.getElementById("username").value,
        "password": document.getElementById("password").value
    };
    
    getRequest(url, data, processUser); //ajax.js    
}