// Add a user's social network site
function addSocialNetworkSite(){
    var sn_node = document.getElementById(this.id);
    var sn_index = sn_node.parentNode.parentNode.rowIndex;
    var table = document.getElementById("social_network_table");
    var row = null;
    var sn_link = document.getElementById("add_social_network").value;

    var addUserSocialSite = function(){
        var url = "api/add-social-network";
        var data = {};
        data["username"] = current_user.user.username;
        data["social_network"] = sn_link;
        data = JSON.stringify(data);
        postRequest(url, data, processAddedSocialSite)
    }

    var processAddedSocialSite = function(result){
        current_user = result;
        console.log("CURRENT USER");
        console.log(current_user);
    }

    var contains = function(list, new_link){
        for (var i in list){
            if (list[i] == new_link)
                return true;
        }
        return false;
    }

    if (sn_link != ""){
        var new_link = "http://" + sn_link;
        if (!contains(current_user.profile.social_network, new_link)){
            if (sn_index == 0)
                row = table.insertRow(0);
            else
                row = table.insertRow(sn_index);
            
            var cell = row.insertCell(0);
            cell.innerHTML = "<a id=http://" + sn_link+ " href=http://" + sn_link+ " target=_blank>http://" + sn_link + "</a>";
            var add_social_network_input = document.getElementById("add_social_network");
            add_social_network_input.value = "";
            add_social_network_input.placeholder = "www.facebook.com/user";
            cell = row.insertCell(1);
            cell.innerHTML = "<img src=media/delete_icon.jpg id=" + sn_link + "_delete class=delete_social_network_site>";
            deleteSocialNetworkEventListener(); // profile.js
            addUserSocialSite();
        }
    }
}

// Delete a user's social network
function deleteSocialNetworkSite(){
    // Delete row from Social Network Table
    var sn_node = document.getElementById(this.id);
    var sn_index = sn_node.parentNode.parentNode.rowIndex;
    var table = document.getElementById("social_network_table");
    table.deleteRow(sn_index);
    
    // Delete User Social Network from Database
    var sn_link = this.id.split("_")[0];

    var deleteUserSocialSite = function(social_network){
        var url = "api/delete-social-network";
        var data = {};
        data["username"] = current_user.user.username;
        data["social_network"] = social_network;
        // console.log(data);
        data = JSON.stringify(data);
        deleteRequest(url, data, processDeletedSocialSite);
    }

    var processDeletedSocialSite = function(result){
        console.log("USER'S SOCIAL SITE DELETED!");
        current_user = result;
        console.log("CURRENT USER");
        console.log(current_user);
        // openProfilePage();
    }

    deleteUserSocialSite(sn_link);
}

// Update event when a user changes their info/profile
function updateEvent(){
    var password = document.getElementById("password").value;
    var email = document.getElementById("email").value;
    var biography = document.getElementById("biography").value;
    var user_category = document.getElementById("user_category").value;
    if (user_category == "--------")
        user_category = "";

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

// Delete User Profile
// Called by navigation.js
function deleteProfile(){
    console.log("USER WOULD LIKE TO DELETE ACCOUNT");
}