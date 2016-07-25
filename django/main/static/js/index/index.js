// *******************************************
// Start HERE when index.html finishes loading
// *******************************************
window.onload = function()
{
    var current_user = "";
    var login_div = document.getElementById("login");

    var header_div = createHeader(); //header.js
    login_div.appendChild(header_div);
    
    var login_node = createLogin();
    login_div.appendChild(login_node);
    var signup_node = createSignup();
    login_div.appendChild(signup_node);
    addIndexEventListener();
}

// Add event listeners to username and password inputs and login button
function addIndexEventListener()
{
    document.getElementById("username").addEventListener('keydown', attachEventToLogin, false); //event-index.js
    document.getElementById("password").addEventListener('keydown', attachEventToLogin, false); //event-index.js
    document.getElementById("login_button").addEventListener('click', loginEvent, false); //event-index.js
}

// Creates login div
// returns login node
function createLogin()
{
    var node = document.createElement("div");
    node.innerHTML = "<span>Username</span>";
    node.id = "login-div";
    var login_form = "<input id='username' type='text' size='20' value='admin'>";
    login_form += "<span>Password</span>";
    login_form += "<input id='password' type='password' size='20' value='Spring20!6'>";
    node.innerHTML += login_form;

    var login_button = "<button id='login_button' class='add-pointer' type='button'>Log In</button>";
    node.innerHTML += login_button;
    return node;
}

// Create Signup div
// node, signup div
function createSignup()
{
    var node = document.createElement("div");
    node.id = "signup-div";
    var sign_up = document.createElement("a");
    sign_up.id = "sign-up";
    sign_up.className = "TEST";
    sign_up.href = "/signup";
    sign_up.innerHTML = "Sign Up";
    node.appendChild(sign_up);
    return node;
}
