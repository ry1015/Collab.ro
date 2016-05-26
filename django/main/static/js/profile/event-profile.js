function updateProfileEvent(){
    console.log("UPDATE PROFILE CLICKED!");
    var password = document.getElementById("Password").value;
    var email = document.getElementById("Email").value;
    var data = {};

    var updateUserProfile = function(data)
    {
        var url = "api/update-profile";
        var data = data;
        postRequest(url, data, processUserProfileUpdate);
    }

    var processUserProfileUpdate = function(result){
        console.log(result);
    }

    if (password.length != 0)
    {
        // USER HAS CHANGED PASSWORD
        data["password"] = password;
    }
    
    if (current_user.email != email)
    {
        // USER HAS CHANGED EMAIL
        data["email"] = email;
    }

    if (isEmpty(data))
        console.log("USER DID NOT CHANGE ANYTHING");
    else
    {
        updateUserProfile(data);
    }
}
