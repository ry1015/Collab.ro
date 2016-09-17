var nav_links = ["Home", "Profile", "Search", "Logout"];

// Adds event listener to the navigation options
function addNavigationEventListener()
{
    document.getElementById("Home").addEventListener('click', openHomePage, false);
    document.getElementById("Profile").addEventListener('click', openProfilePage, false);
    document.getElementById("Search").addEventListener('click', openSearchPage, false);
    document.getElementById("Logout").addEventListener('click', logOutUser, false);
    document.getElementById("search_input").addEventListener('keyup', lookUpInput, false);
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
            cell.innerHTML = "<a id='"+ nav_links[i] + "' class='add-pointer'>" + nav_links[i] + "</a>";
        else{
            cell.innerHTML = "<input type=text id=search_input placeholder='Search artist or music title'>";
            cell.innerHTML += "<button id=Search class='add-pointer'>Search</button>";
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
    info.createCaption();
    info.innerHTML = "<b>Profile</b>";
    createProfile(info); //profile.js
    profile.appendChild(info);
    body_div.appendChild(profile);
    document.getElementById("biography").value = current_user.profile["biography"];
    
    // Table 2
    // address, phone_number
    // info = document.createElement("table");
    // info.id = "table-user-info";
    // info.style.border = "1px dashed black";
    // info.style.marginTop = "10px";
    // info.createCaption();
    // info.innerHTML = "<b>Contact Information</b>";
    createInfo(info); //profile.js
    createProfileUpdateButton(info); //profile.js
    profile.appendChild(info);
    body_div.appendChild(profile);

    addProfileButtonEventListener(); //profile.js
    addSocialNetworkEventListener(); //profile.js
    deleteSocialNetworkEventListener(); //profile.js
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