// Add click event listener to user_update
function addProfileButtonEventListener(){
    // document.getElementById("profile_update").addEventListener('click', updateProfileEvent, false); //event-profile.js
    document.getElementById("user_update").addEventListener('click', updateEvent, false); //event-profile.js
}

// Add click event listener to social_network_button
function addSocialNetworkEventListener(){
    document.getElementById("social_network_button").addEventListener('click', addSocialNetworkSite, false); //event-profile.js
}

// Add click event listener to all elemeents which contains the class, delete_social_network_site
function deleteSocialNetworkEventListener(){
    var social_network_list = document.getElementsByClassName("delete_social_network_site");
    for (var i in social_network_list){
        if (!isNaN(Number(i)))
            document.getElementById(social_network_list[i].id).addEventListener('click', deleteSocialNetworkSite, false) //event-profile.js
    }
    
}

// Create User Profile Table
// info, user profile table
function createProfile(info){
    console.log("INSIDE CREATEPROFILE");
    var user_creds = current_user.user;
    var user_profile = current_user.profile;
    var categories = current_user.categories.sort();
    var social_network_id = "social_network_table";
    var social_network_add_button = "social_network_button";
    var new_social_network_id = "add_social_network";

    var attributes = [
        ["Username", user_creds.username],
        ["Password", ""],
        ["Email", user_creds.email],
        ["Biography", user_profile.biography],
        ["User Category", user_profile.user_category],
        ["Social Network", user_profile.social_network]
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
                        var options = "";
                        var found = false;
                        if (categories.length != 0){
                            for (var i in categories)
                            {
                                if (categories[i] == user_profile.user_category){
                                    options+="<option selected>" + categories[i] + "</option>";
                                    found = true;
                                    break;
                                }
                                else
                                    options+="<option>" + categories[i] + "</option>";
                            }
                            if (!found)
                                options = "<option selected>--------</option>" + options;
                        } else {
                            options = "<option selected>--------</option>" + options;
                        }
                        var select = "<select id='"+ attributes[i][j-1] + "'>";
                        select += options;
                        select += "</select>";
                        cell.innerHTML = select;
                    }
                    else if (attributes[i][j-1] == "Social Network")
                    {

                        console.log("Social Networks");
                        var social_network_list = attributes[i][j];
                        console.log(social_network_list);
                        var sn_table = document.createElement("table");
                        
                        // Add table rows for social network
                        for (var link in social_network_list){
                            var sn_row = sn_table.insertRow(sn_table.rows.length);
                            var sn_cell = sn_row.insertCell(0);
                            sn_cell.innerHTML = "<a id=" + social_network_list[link]+ " href=" + social_network_list[link]+ " target=_blank>" + social_network_list[link] + "</a>";
                            sn_cell = sn_row.insertCell(1);
                            sn_cell.innerHTML = "<img src=media/delete_icon.jpg id=" + social_network_list[link]+ "_delete class=delete_social_network_site>";
                        }

                        // Append Social Network rows to social_network table                        
                        var table_node = "<table id=" + social_network_id + ">";
                        sn_row = sn_table.insertRow(sn_table.rows.length);
                        sn_cell = sn_row.insertCell(0);
                        sn_cell.innerHTML = "<input id=" + new_social_network_id + " type=text placeholder='www.facebook.com/user'>";
                        sn_cell = sn_row.insertCell(1);
                        sn_cell.innerHTML = "<img src='media/add_button.png' id='social_network_button'>";
                        table_node+=sn_table.innerHTML;
                        table_node+="</table>";
                        // console.log(table_node);
                        cell.innerHTML = table_node;
                    }
                    else
                        cell.innerHTML = "<input type='text' value='"+ attributes[i][j] + "' id= "+ attributes[i][j-1] +">";
                }
            }
        }
    }

    // row = info.insertRow(info.rows.length);
    // cell = row.insertCell(0);
    // var update_button = document.createElement("button");
    // update_button.id = "profile_update";
    // update_button.textContent = "Update";
    // info.appendChild(update_button);
}

// Create User Information Table
// user_info, user information table
function createInfo(info){
    console.log("INSIDE CREATEINFO");
    // console.log("CURRENT USER");
    // console.log(current_user);
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
    update_button.id = "user_update";
    update_button.textContent = "Update";
    info.appendChild(update_button);
}