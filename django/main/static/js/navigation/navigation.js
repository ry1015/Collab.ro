var nav_links = ["Search", "Projects", "My Account"];
var nav_links_id = ["search", "projects", "my_account"];
var DELETE_PROFILE_ID = "delete_profile";

// Adds event listener to the navigation options
function addNavigationEventListener()
{
    document.getElementById("projects").addEventListener('click', openHomePage, false);
    document.getElementById("my_account").addEventListener('click', openProfilePage, false);
    // document.getElementById("Search").addEventListener('click', openSearchPage, false);
    // document.getElementById("Logout").addEventListener('click', logOutUser, false);
    document.getElementById("search_input").addEventListener('keyup', lookUpInput, false);
}

function addDeleteProfileEventListener(node){
    node.onclick = deleteProfile; //event-profile.js
}

// Creates the navigation bar
// navigations_div, navigation bar
function createNavigationBar()
{
    var navigation_div = document.createElement("div");
    navigation_div.id = "navigation-div";
    var table = document.createElement("table");
    table.id = "navigation-table";
    var row = table.insertRow(table.rows.length);
    
    for (var i in nav_links){
        var cell = row.insertCell(i);
        if (nav_links[i] != "Search")
            cell.innerHTML = "<a id='"+ nav_links_id[i] + "' class='add-pointer'>" + nav_links[i] + "</a>";
        else{
            cell.innerHTML = "<input type=text id=search_input placeholder='Search artist or music title'>";
            // cell.innerHTML += "<button id=Search class='add-pointer'>Search</button>";
        }
    }   

    navigation_div.appendChild(table);
    return navigation_div;
}

// Creates the user profile page
function openProfilePage()
{
    var body_div = document.getElementById(BODY_DIV_ID);
    if (body_div.innerHTML != "")
        body_div.innerHTML = "";

    var profile = document.createElement("div");
    profile.id = "div-user-profile";

    // Table 1
    // username, pw, email
    var info = document.createElement("table");
    info.id = "table-user-profile";
    info.style.border = "1px dashed black";
    var row = info.insertRow(info.rows.length);
    var cell = row.insertCell(0);
    var b = document.createElement("B");
    var text = document.createTextNode("Profile");
    b.appendChild(text);
    cell.appendChild(b);
    createDeleteAccountButton(cell);
    createProfile(info); //profile.js
    profile.appendChild(info);
    body_div.appendChild(profile);
    document.getElementById("biography").value = current_user.profile["biography"];
    
    createInfo(info); //profile.js
    createProfileUpdateButton(info); //profile.js
    profile.appendChild(info);
    body_div.appendChild(profile);

    addProfileButtonEventListener(); //profile.js
    addSocialNetworkEventListener(); //profile.js
    deleteSocialNetworkEventListener(); //profile.js
}

function createDeleteAccountButton(node){
    node.colSpan = "2";
    var div = document.createElement("DIV");
    div.style.display = "inline-block";
    div.style.float = "right";
    var span = document.createElement("SPAN");
    span.style.fontSize = "10px";
    span.style.float = "right";
    span.id = DELETE_PROFILE_ID;
    addDeleteProfileEventListener(span);
    var text = document.createTextNode("DELETE");
    span.appendChild(text);
    div.appendChild(span);
    node.appendChild(div);
}
// Creates the user home page
function openHomePage()
{
    var body_div = document.getElementById(BODY_DIV_ID);
    if (body_div.innerHTML != "")
        body_div.innerHTML = "";
    console.log("CURRENT USER:");
    console.log(current_user);
    createHomePage(current_user); //home.js
}

// Creates the search result page
function openSearchPage()
{
    console.log("SEARCH BUTTON CLICKED!");
    var body_div = document.getElementById(BODY_DIV_ID);
    if (body_div.innerHTML != "")
        body_div.innerHTML = "";
}

// Redirects to login page
function openLoginPage(result)
{
    current_user={};
    location.reload();
}

// Logs out current user
function logOutUser(){
    var data = {};
    var url = 'api/logout';
    data["username"] = current_user.username;
    postRequest(url, data, openLoginPage);
}