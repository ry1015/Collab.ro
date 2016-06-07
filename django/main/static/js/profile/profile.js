function addProfileButtonEventListener(){
    document.getElementById("profile_update").addEventListener('click', updateProfileEvent, false); //event-profile.js
    document.getElementById("info_update").addEventListener('click', updateInfoEvent, false); //event-profile.js
}

// Create User Profile Table
// info, user profile table
function createProfile(info){
    var user_creds = current_user.user;
    var user_info = current_user.info;

    var attributes = [
        ["Username", user_creds.username],
        ["Password", ""],
        ["Email", user_creds.email]
    ];
    for (var i in attributes){
        var row = info.insertRow(info.rows.length);
        for (var j in attributes[i]){
            var cell = row.insertCell(j);
            if (j == 0)
                cell.innerHTML = attributes[i][j];
            else
            {

                if (attributes[i][j-1] == "Username")
                    cell.innerHTML = attributes[i][j];
                else
                {
                    if (attributes[i][j-1] == "Password")
                        cell.innerHTML = "<input type='password' value='"+ attributes[i][j] + "' id= "+ attributes[i][j-1] +">";
                    else
                        cell.innerHTML = "<input type='text' value='"+ attributes[i][j] + "' id= "+ attributes[i][j-1] +">";
                }
            }
        }
    }

    row = info.insertRow(info.rows.length);
    cell = row.insertCell(0);
    var update_button = document.createElement("button");
    update_button.id = "profile_update";
    update_button.textContent = "Update";
    info.appendChild(update_button);
}

// Create User Information Table
// user_info, user information table
function createInfo(info){
    console.log("INSIDE CREATEINFO");
    console.log("CURRENT USER");
    console.log(current_user);
    var user_info = current_user.info;
    var attributes = [
        ["Phone Number", user_info.phone_number],
        ["Address", user_info.address],
        ["Biography", user_info.biography],
        ["Category", user_info.user_category]
    ];

    for (var i in attributes){
        var row = info.insertRow(info.rows.length);
        for (var j in attributes[i]){
            var cell = row.insertCell(j);
            if (j == 0)
                cell.innerHTML = attributes[i][j];
            else
                cell.innerHTML = "<input type='text' value='"+ attributes[i][j] + "' id= "+ attributes[i][j-1] +">";
        }
    }

    row = info.insertRow(info.rows.length);
    cell = row.insertCell(0);
    var update_button = document.createElement("button");
    update_button.id = "info_update";
    update_button.textContent = "Update";
    info.appendChild(update_button);
}