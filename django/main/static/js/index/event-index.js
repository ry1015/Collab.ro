var COMMENT_SECTION_PARENT_IDS = ["comment-table-id", "comment-div"];

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

// function traceClick(event){
//     var parentNode = event.target.parentNode.parentNode.parentNode.parentNode.id;
//     // console.log(parentNode);

//     var comment_div = document.getElementById("comment-div");
//     console.log(comment_div.innerHTML);
//     if (comment_div != null){
//         if (parentNode != null && COMMENT_SECTION_PARENT_IDS.includes(parentNode)){
//             console.log("INSIDE TABLE");
//         }
//         else{
//             console.log("OUTSIDE TABLE");
//         }
//     }
//     // }
//     // if (parentNode == null && )
//     //     comment_div.innerHTML = "";
//     // else if (COMMENT_SECTION_PARENT_IDS.includes(parentNode)){
//     //     console.log("INSIDE COMMENT SECTION");
//     // } 
//     // else {
//     //     var comment_div = document.getElementById("comment-div");
//     //     if (comment_div != null)
//     //         comment_div.innerHTML = "";
//     // }
// }