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

// Create User Credential Rows
// table, profile table
function createUserCredentials(table){
    var user = current_user.user
    var row = undefined;
    var cell = undefined;
    var node = undefined;

    // User Creds
    var attributes = [
        ["Username", user.username],
        ["Password", ""],
        ["Email", user.email],
    ];

    for (var i=0; i < attributes.length; ++i){
        row = table.insertRow(table.rows.length);
        for (var j=0; j<2; ++j){
            cell = row.insertCell(j);
            node = document.createElement("INPUT");
            if (j < 1)
                node = document.createTextNode(attributes[i][j]);
            else{
                if (attributes[i][j-1] == "Username")
                    node = document.createTextNode(attributes[i][j]);
                else{
                    node.id = attributes[i][j-1].toLowerCase();
                    node.value = attributes[i][j];
                }
            }
            cell.appendChild(node);
        }
    }
}

// Create User Biography Row
// table, profile table
function createUserBiography(table){
    var biography = current_user.profile.biography;
    var row = undefined;
    var cell = undefined;
    var node = undefined;

    var attributes = [
        ["Biography", biography]
    ];
    
    for (var i=0; i < attributes.length; ++i){
        row = table.insertRow(table.rows.length);
        for (var j=0; j<2; ++j){
            cell = row.insertCell(j);
            if (j < 1){
                node = document.createTextNode(attributes[i][j]);
            }
            else{
                node = document.createElement("TEXTAREA");
                node.rows = 5;
                node.value = attributes[i][j];
                node.id = attributes[i][j-1].toLowerCase();
            }
            cell.appendChild(node);
        }
    }

}

// Create User Category Row
// table, profile table
function createUserCategory(table){
    var categories = current_user.categories.sort();
    var user_category = current_user.profile.user_category;
    var select = document.createElement("SELECT");
    var option = document.createElement("OPTION");
    var row = table.insertRow(table.rows.length);
    var cell = row.insertCell(0);
    var text = document.createTextNode("User Category");
    cell.appendChild(text);
    
    cell = row.insertCell(1);
    option.text = "--------";
    select.appendChild(option);
    select.id = "user_category";

    if (categories.length < 1)
        option.selected = true;
    else
    {
        for (var i in categories)
        {
            option = document.createElement("OPTION");
            option.text = categories[i];
            if (user_category == option.text)
                option.selected = true;
            select.appendChild(option);
        }
    }
    cell.appendChild(select);
}

// Create User Social Network Row
// table, profile table
function createUserSocialNetwork(table){
    var sn_table_id = "social_network_table";
    var sn_input_id = "add_social_network";
    var sn_add_id = "social_network_button";
    var social_networks = current_user.profile.social_network;
    var row = table.insertRow(table.rows.length);
    var cell = row.insertCell(0);
    var text = document.createTextNode("Social Network");
    cell.appendChild(text);

    cell = row.insertCell(1);
    var sn_table = document.createElement("TABLE");
    sn_table.id = sn_table_id;

    var sn_row = undefined;
    var sn_cell = undefined;
    var sn_a = undefined;
    var sn_img = undefined;
    var sn_input = undefined;

    for (var link in social_networks){
        // Social Network Link
        sn_row = sn_table.insertRow(sn_table.rows.length);
        sn_cell = sn_row.insertCell(0);
        sn_a = document.createElement("A");
        sn_a.id = social_networks[link];
        sn_a.href = social_networks[link];
        sn_a.target = "_blank";
        sn_a.text = social_networks[link];
        sn_cell.appendChild(sn_a);

        // Delete Button
        sn_cell = sn_row.insertCell(1);
        sn_img = document.createElement("IMG");
        sn_img.id = social_networks[link]+ "_delete";
        sn_img.src = "media/delete_icon.jpg"
        sn_img.setAttribute("class", "delete_social_network_site");
        sn_cell.appendChild(sn_img);
    }

    // Add Social Network Input
    sn_row = sn_table.insertRow(sn_table.rows.length);
    sn_cell = sn_row.insertCell(0);
    sn_input = document.createElement("INPUT");
    sn_input.id = sn_input_id;
    sn_input.setAttribute("type", "text");
    sn_input.setAttribute("placeholder", "www.facebook.com/user");
    sn_cell.appendChild(sn_input);

    sn_cell = sn_row.insertCell(1);
    sn_img = document.createElement("IMG");
    sn_img.src = "media/add_button.png";
    sn_img.id = sn_add_id;
    sn_cell.appendChild(sn_img);

    cell.appendChild(sn_table); 
}

// Create User Profile Table
// info, user profile table
function createProfile(info){
    createUserCredentials(info);
    createUserBiography(info);
    createUserCategory(info);
    createUserSocialNetwork(info);
}

// Create User Information Table
// user_info, user information table
function createInfo(info){
    var user_info = current_user.contact_info;
    var attributes = [
        ["Phone Number", user_info.phone_number],
        ["Address", user_info.address],
    ];
    var row = undefined;
    var cell = undefined;

    // Add row spacing
    addRowSpacing(info);

    // Contact Information Row
    row = info.insertRow(info.rows.length);
    cell = row.insertCell(0);
    cell.colSpan = "2";
    var bold_tag = document.createElement("B");
    var text = document.createTextNode("Contact Information");
    bold_tag.appendChild(text);
    cell.appendChild(bold_tag);

    for (var i in attributes)
    {
        row = info.insertRow(info.rows.length);
        for (var j in attributes[i]){
            cell = row.insertCell(j);
            if (j == 0)
                cell.innerHTML = attributes[i][j];
            else
                cell.innerHTML = "<input type='text' value='"+ attributes[i][j] + "' id= "+ attributes[i][j-1] +" placeholder=Optional>";
        }
    }
}

function createAddress(table){
    var components = []
}

// Create Profile Update Button
// info, profile table
function createProfileUpdateButton(info){
    addRowSpacing(info);
    var row = info.insertRow(info.rows.length);
    var cell = row.insertCell(0);
    cell.colSpan = "2";
    cell.style.textAlign = "center";
    var update_button = document.createElement("button");
    update_button.id = "user_update";
    update_button.textContent = "Update";
    cell.appendChild(update_button);
}

// Insert row for spacing purposes
// table, table that needs an empty row for spacing
function addRowSpacing(table){
    var row = table.insertRow(table.rows.length);
    var cell = row.insertCell(0);
    cell.colSpan = "2";
    cell.setAttribute("class", "empty_row");
}