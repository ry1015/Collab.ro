function updateProfileEvent(){
    console.log("UPDATE PROFILE CLICKED!");
    var password = document.getElementById("Password").value;
    var email = document.getElementById("Email").value;
    var data = {};
    console.log("UPDATE PROFILE EVENT");
    console.log("CURRENT USER:");
    console.log(current_user);

    var updateUserProfile = function(data)
    {
        var url = "api/update-profile";
        var data = data;
        data["username"] = current_user.user.username
        postRequest(url, data, processUserProfileUpdate); //ajax.js
    }

    var processUserProfileUpdate = function(result){
        current_user = result;
        openProfilePage(); //navigation.js
    }

    // USER HAS CHANGED PASSWORD
    if (password.length != 0)
        data["password"] = password;
    
    // USER HAS CHANGED EMAIL
    if (current_user.user.email != email)
        data["email"] = email;

    if (isEmpty(data))
        console.log("USER DID NOT CHANGE ANYTHING");
    else
        updateUserProfile(data);
}

function updateInfoEvent(){
    console.log("UPDATE INFO CLICKED!");
    var phone_number = document.getElementById("Phone");
    var address = document.getElementById("Address");
}