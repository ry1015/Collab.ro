function updateProfileEvent(){
    console.log("UPDATE PROFILE CLICKED!");
    var password = document.getElementById("Password").value;
    var email = document.getElementById("Email").value;
    var data = {};

    var updateUserProfile = function(data)
    {
        var url = "api/update-profile";
        var data = data;
        postRequest(url, data, processUserProfileUpdate); //ajax.js
    }

    var processUserProfileUpdate = function(result){
        console.log(result);
    }

    // USER HAS CHANGED PASSWORD
    if (password.length != 0)
        
        data["password"] = password;
    
    // USER HAS CHANGED EMAIL
    if (current_user.email != email)
        data["email"] = email;

    if (isEmpty(data))
        console.log("USER DID NOT CHANGE ANYTHING");
    else
        updateUserProfile(data);
}
