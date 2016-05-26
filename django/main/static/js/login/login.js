function addLoginEventListener(){
    document.getElementById("username").addEventListener('keydown', attachEventToLogin, false);
    document.getElementById("password").addEventListener('keydown', attachEventToLogin, false);
    document.getElementById("login_button").addEventListener('click', loginEvent, false);
}

// Creates login div
// returns login node
function createLogin(){
    var node = document.createElement("div");
    node.innerHTML = "<span>Username</span>";

    var login_form = "<input id='username' type='text' size='20' value='admin'>";
    login_form += "<span>Password</span>";
    login_form += "<input id='password' type='password' size='20' value='Spring20!6'>";
    node.innerHTML += login_form;

    var login_button = "<button id='login_button' class='add-pointer' type='button'>Log In</button>";
    node.innerHTML += login_button;
    return node;
}


// ****************************************
// Start HERE when website finishes loading
// ****************************************
window.onload = function(){
    var current_user = "";
    var login_div = document.getElementById("login");

    var header_div = createHeader(); //header.js
    login_div.appendChild(header_div);
    
    var login_node = createLogin();
    login_div.appendChild(login_node);
    addLoginEventListener();
}