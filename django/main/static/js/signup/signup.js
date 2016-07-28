// *******************************************
// Start HERE when signup.html finishes loading
// *******************************************
window.onload = function()
{
    // var sign_up_div = document.getElementById("signup-body");
    // var header_div = createHeader(); //header.js
    // sign_up_div.appendChild(header_div);
    // createSignupForm();
}

// Add click event listner to signup-button
// Add input event listener on username-signup
function addSignUpEvent(){
    document.getElementById("signup-button").addEventListener('click', signUp, false);
    document.getElementById("username-signup").addEventListener('input', checkUsernameAvailability, false);
}

// Create Sign up Form
function createSignupForm()
{
    // Empty existing divs
    var login_div = document.getElementById("login-div");
    var signup_body = document.getElementById("signup-div");

    if (login_div.innerHTML != "")
        login_div.innerHTML = "";

    if (signup_body.innerHTML != "")
        signup_body.innerHTML = "";
    var attributes = ["Username", "Password", "Email"];
    // var signup_body = document.getElementById("signup-div");
    var signup_form_div = document.createElement("div");
    signup_form_div.id = "signup-form";

    var table = document.createElement("table");
    
    
    for (var i=0; i < attributes.length; i++)
    {
        var row = table.insertRow(table.rows.length);
        for (var j=0; j < 2; j++)
        {
            var cell = row.insertCell(j);
            if (j == 0)
                cell.innerHTML = attributes[i];
            else
            {
                var textfield = document.createElement("input");
                textfield.id = attributes[i].toLowerCase() + "-signup";
                if (attributes[i] == "Password")
                    textfield.type = "password";
                textfield.value = addPlaceHolder(attributes[i]);
                cell.appendChild(textfield);
            }
        }

    }
    var row = table.insertRow(table.rows.length);
    var cell = row.insertCell();
    var signup_button = document.createElement("button");
    signup_button.id = "signup-button";
    signup_button.innerHTML = "Sign Up";
    cell.appendChild(signup_button);

    signup_form_div.appendChild(table);
    signup_body.appendChild(signup_form_div);
    addSignUpEvent();
}

// Prefills Sign Up Form
function addPlaceHolder(attribute)
{
    var placeHolders = 
    {
        "Username" : "ryry",
        "Password" : "password",
        "Email" : "ryry@collabro.com"
    }
    return placeHolders[attribute];
}

function test(){
    return null;
}