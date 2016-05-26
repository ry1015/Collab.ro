var nav_links = ["Home", "Profile", "Search", "Logout"];
var current_user = "";
function addNavigationEventListener(){
    document.getElementById("Home").addEventListener('click', openHomePage, false);
    document.getElementById("Profile").addEventListener('click', openProfilePage, false);
    document.getElementById("Search").addEventListener('click', openSearchPage, false);
    document.getElementById("Logout").addEventListener('click', openLoginPage, false);
}

function createNavigationBar(user){
    current_user = user;
    var navigation_div = document.createElement("div");
    navigation_div.id = "navigation-div";
    var table = document.createElement("table");
    var row = table.insertRow(table.rows.length);
    
    for (var i in nav_links){
        var cell = row.insertCell(i);
        if (nav_links[i] != "Search")
            cell.innerHTML = "<a id='"+ nav_links[i] + "' class='add-pointer'>" + nav_links[i] + "</a>";
        else{
            cell.innerHTML = "<input type='text' placeholder='Search artist or music title'>";
            cell.innerHTML += "<button id='Search' class='add-pointer'>Search</button>";
        }
    }   

    navigation_div.appendChild(table);
    return navigation_div;
}

function openProfilePage(){
    console.log("NAV PROFILE BUTTON CLICKED!");

    var body_div = document.getElementById("body-div");
    if (body_div.innerHTML != "")
        body_div.innerHTML = "";

    var profile = document.createElement("div");
    profile.id = "div-user-profile";

    var info = document.createElement("table");
    info.id = "table-user-profile";
    createProfile(info, current_user);

    profile.appendChild(info);
    body_div.appendChild(profile);
    addProfileButtonEventListener();
}

function openHomePage(){
    console.log("HOME BUTTON CLICKED!");
    var body_div = document.getElementById("body-div");
    if (body_div.innerHTML != "")
        body_div.innerHTML = "";
    createHomePage(current_user);
}

function openSearchPage(){
    console.log("SEARCH BUTTON CLICKED!");
    var body_div = document.getElementById("body-div");
    if (body_div.innerHTML != "")
        body_div.innerHTML = "";
}

function openLoginPage(){
    current_user={};
    location.reload();
}