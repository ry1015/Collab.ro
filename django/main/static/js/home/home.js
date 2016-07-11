// Creates Current Uploaded Tracks of A User
// user, current user
function createCurrentTracks(user){

    var body_div = document.getElementById("body-div");
    var current_tracks_div = document.createElement("div");
    current_tracks_div.id = "current-tracks-div";

    var table = document.createElement("table");
    var row = table.insertRow(table.rows.length);
    
    for (var i=0; i < 2; i++){
        var cell = row.insertCell(i);
    }
}

function createHomePage(user){
    // Check if user has uploaded some music
    
    createCurrentTracks(user);
    var main_div = document.getElementById("body-div");
    
    var home_div = document.createElement("div");
    home_div.id = "home_div";
    
    var project_span = document.createElement("span");
    project_span.innerHTML = "WELCOME HOME!";
    home_div.appendChild(project_span);
    main_div.appendChild(home_div);
}

function createProject(parent_node){

}

function getMusicTitle(){

}

// Checks if a dictionary is empty
function isEmpty(some_list){
    for (var i in some_list)
        return false;
    return true;
}

// Creates User Home Page
// user, current user
// user contains {info and user}
// info contains address, phone_number, and address
// user contains username, password, and email
function showHome(user){
    console.log("INSIDE SHOWHOME");
    var login = document.getElementById("login");
    if (login.innerHTML != "")
        login.innerHTML = "";
    
    var main = document.getElementById("main");

    // Add Header
    var header_div = createHeader();
    main.appendChild(header_div);

    // Add Navigation
    var nav_div = createNavigationBar(); //navigation.js
    main.appendChild(nav_div);

    // Add Navigation Event Listener
    addNavigationEventListener(); //navigation.js

    var body = document.createElement("div");
    body.id = "body-div"
    main.appendChild(body);
    openHomePage(); //navigation.js
}

