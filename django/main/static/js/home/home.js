// Global Variables
var HOME_DIV_ID = "home_div";
var PROJ_DIV_ID = "project_div";
var PROJECT_TABLE_ID = "project_table";
var BODY_DIV_ID = "body_div";
var CURRENT_TRACKS_ID = "current-tracks-div";
var NEW_PROJECT_ID = "new_project";

function addProjectButtonEventListener(){
    // document.getElementById("profile_update").addEventListener('click', updateProfileEvent, false); //event-profile.js
    document.getElementById(NEW_PROJECT_ID).addEventListener('click', newProjectEvent, false); //event-home.js
}

// Creates Current Uploaded Tracks of A User
// user, current user
function createCurrentTracks(user){
    var body_div = document.getElementById(BODY_DIV_ID);
    var current_tracks_div = document.createElement("div");
    current_tracks_div.id = CURRENT_TRACKS_ID;

    var table = document.createElement("table");
    var row = table.insertRow(table.rows.length);
    
    for (var i=0; i < 2; i++){
        var cell = row.insertCell(i);
    }
}

function createHomePage(user){
    // Check if user has uploaded some music
    createCurrentTracks(user);
    var parent_node = document.getElementById(BODY_DIV_ID);
    createTrackList(parent_node); //track-list.js
    createProject(parent_node);
}

function createProject(parent_node){
    var attributes = [];
    var project_node = document.createElement("div");
    project_node.id = PROJ_DIV_ID;

    var project_table = document.createElement("table");
    project_table.id = PROJECT_TABLE_ID;
    project_table.style.border = "1px dashed lightblue";
    var row = project_table.insertRow(project_table.rows.length);
    var cell = row.insertCell(0);
    cell.innerHTML = "<b>PROJECT</b>";
    cell = row.insertCell(1);
    cell.innerHTML = "<button id=new_project>ADD PROJECT</button>";

    project_node.appendChild(project_table);
    parent_node.appendChild(project_node);
    addProjectButtonEventListener();
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
    body.id = BODY_DIV_ID;
    main.appendChild(body);
    openHomePage(); //navigation.js
}

