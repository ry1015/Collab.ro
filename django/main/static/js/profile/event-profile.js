function addSocialNetworkSite(){
    console.log("ADD SOCIAL NETWORK");
}

function deleteSocialNetworkSite(x){
    console.log("DELETE SOCIAL NETWORK");
    var test = document.getElementById(this.id);
    console.log(test.parentNode.parentNode.rowIndex);
    var test_index = test.parentNode.parentNode.rowIndex;
    var table = document.getElementById("social_network_table");
    table.deleteRow(test_index);
    
    // var sn_link = this.id.split("_")[0];
    // console.log(sn_link);
    // var deleteUserSocialSite = function(social_network){
    //     var url = "api/delete-social-network";
    //     var data = {};
    //     data["username"] = current_user.user.username;
    //     data["social_network"] = social_network;
    //     deleteRequest(url, data, processDeletedSocialSite);
    // }

    // var processDeletedSocialSite = function(result){
    //     console.log("USER'S SOCIAL SITE DELETED!");
    //     current_user = result;
    //     console.log("CURRENT USER");
    //     console.log(current_user);
    //     openProfilePage();
    // }

    // deleteUserSocialSite(sn_link);
}

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
        var data = JSON.stringify(data);
        console.log(data);
        postRequest(url, data, processUserProfileUpdate); //ajax.js
    }

    var processUserProfileUpdate = function(result){
        console.log("USER PROFILE UPDATE SUCCESSFUL!")
        current_user = result;
        console.log("CURRENT USER");
        console.log(current_user);
        openProfilePage(); //navigation.js
    }

    // USER HAS CHANGED PASSWORD
    if (password.length != 0)
        data["password"] = password;

    var user = {};
    var contact_info = {};
    var profile = {};

    if (current_user.user.email == email)
        email = "";
    
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