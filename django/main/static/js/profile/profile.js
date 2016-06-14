function addProfileButtonEventListener(){
    document.getElementById("profile_update").addEventListener('click', updateProfileEvent, false); //event-profile.js
    document.getElementById("info_update").addEventListener('click', updateInfoEvent, false); //event-profile.js
}

// Create User Profile Table
// info, user profile table
function createProfile(info){
    console.log("INSIDE CREATEPROFILE");
    var user_creds = current_user.user;
    var user_profile = current_user.profile;
    var categories = current_user.categories.sort();

    var attributes = [
        ["Username", user_creds.username],
        ["Password", ""],
        ["Email", user_creds.email],
        ["Biography", user_profile.biography],
        ["User Category", user_profile.user_category]
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
                    else if (attributes[i][j-1] == "Biography")
                        cell.innerHTML = "<textarea id='" + attributes[i][j-1] +"'>";
                    else if (attributes[i][j-1] == "User Category")
                    {
                        var select = "<select id='"+ attributes[i][j-1] + "'>";
                        var empty = false;
                        for (var i in categories)
                        {
                            if (categories[i] == user_profile.user_category)
                                select+="<option selected>" + categories[i] + "</option>";
                            else if (!empty && user_profile.user_category == "")
                            {
                                select+="<option selected>" + categories[0] + "</option>";
                                empty = true;
                            }
                            else
                                select+="<option>" + categories[i] + "</option>";
                        }
                        select += "</select>";
                        cell.innerHTML = select;
                    }
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
    var user_info = current_user.contact_info;
    var attributes = [
        ["Phone Number", user_info.phone_number],
        ["Address", user_info.address],
    ];

    for (var i in attributes)
    {
        var row = info.insertRow(info.rows.length);
        for (var j in attributes[i]){
            var cell = row.insertCell(j);
            if (j == 0)
                cell.innerHTML = attributes[i][j];
            else
                cell.innerHTML = "<input type='text' value='"+ attributes[i][j] + "' id= "+ attributes[i][j-1] +" placeholder=Optional>";
        }
    }

    row = info.insertRow(info.rows.length);
    cell = row.insertCell(0);
    var update_button = document.createElement("button");
    update_button.id = "info_update";
    update_button.textContent = "Update";
    info.appendChild(update_button);
}