// function updateProfileEvent(){
//     console.log("UPDATE PROFILE CLICKED!");
//     var password = document.getElementById("Password").value;
//     var email = document.getElementById("Email").value;
//     var biography = document.getElementById("Biography").value;
//     var user_category = document.getElementById("User Category").value;
//     var data = {};
//     console.log("function: UPDATE PROFILE EVENT");
//     console.log("CURRENT USER:");
//     console.log(current_user);
//     console.log("------------------------------------");

//     var updateUserProfile = function(data)
//     {
//         var url = "api/update-profile";
//         var data = data;
//         data["username"] = current_user.user.username;
//         console.log(data);
//         // postRequest(url, data, processUserProfileUpdate); //ajax.js
//     }

//     var processUserProfileUpdate = function(result){
//         current_user = result;
//         openProfilePage(); //navigation.js
//     }

//     // USER HAS CHANGED PASSWORD
//     if (password.length != 0)
//         data["password"] = password;
    
//     // USER HAS CHANGED EMAIL
//     if (current_user.user.email != email)
//         data["email"] = email;

//     if (current_user.profile.biography != biography)
//         data["biography"] = biography;

//     if (current_user.profile.biography != biography)
//         data["user_category"] = user_category;

//     if (isEmpty(data))
//         console.log("USER DID NOT CHANGE ANYTHING");
//     else
//         updateUserProfile(data);
// }

function updateEvent(){
    console.log("UPDATE BUTTON CLICKED!");
    var password = document.getElementById("Password").value;
    var email = document.getElementById("Email").value;
    var biography = document.getElementById("Biography").value;
    var user_category = document.getElementById("User Category").value;
    
    var phone_number = document.getElementById("Phone").value;
    var address = document.getElementById("Address").value;
    var data = {};

    var updateUserProfile = function(data){
        var url = "api/update-profile";
        var data = data;
        console.log(data);
        postRequest(url, data, processUserProfileUpdate); //ajax.js
    }

    var processUserProfileUpdate = function(result){
        current_user = result;
        openProfilePage(); //navigation.js
    }

    // USER HAS CHANGED PASSWORD
    if (password.length != 0)
        data["password"] = password;

    var user = {};
    var contact_info = {};
    var profile = {};

    user["email"] = email;
    user["password"] = password;

    contact_info["address"] = address;
    contact_info["phone_number"] = phone_number;

    profile["biography"] = biography;
    profile["user_category"] = user_category;

    data["user"] = user;
    data["contact_info"] = contact_info;
    data["profile"] = profile;

    data["username"] = current_user.user.username;

    updateUserProfile(data);
}