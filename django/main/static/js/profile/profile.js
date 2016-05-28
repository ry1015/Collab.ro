function addProfileButtonEventListener(){
    document.getElementById("profile_update").addEventListener('click', updateProfileEvent, false); //event-profile.js
}

function createProfile(info, user){
    var attributes = [
    ["Username", user.username],
    ["Password", ""],
    ["Email", user.email]
    ];
    for (var i in attributes){
        var row = info.insertRow(info.rows.length);
        for (var j in attributes[i]){
            var cell = row.insertCell(j);
            if (j == 0)
                cell.innerHTML = attributes[i][j];
            else
                if (attributes[i][j-1] == "Username")
                    cell.innerHTML = attributes[i][j];
                else{
                    if (attributes[i][j-1] == "Password"){
                        cell.innerHTML = "<input type='password' value='"+ attributes[i][j] + "' id= "+ attributes[i][j-1] +">";
                    }
                    else
                        cell.innerHTML = "<input type='text' value='"+ attributes[i][j] + "' id= "+ attributes[i][j-1] +">";
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