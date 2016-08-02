// Global Variables
var HOME_DIV_ID = "home_div";
var PROJ_DIV_ID = "project_div";
var PROJECT_TABLE_ID = "project_table";
var PROJECT_LIST_TABLE_ID = "project_list_table";
var BODY_DIV_ID = "body_div";
var CURRENT_TRACKS_ID = "current-tracks-div";
var NEW_PROJECT_ID = "new_project";

// Add click event when new_project id is clicked
function addProjectButtonEventListener(){
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

// Create user home page
// user, current user
function createHomePage(user){
    // Check if user has uploaded some music
    createCurrentTracks(user);
    var parent_node = document.getElementById(BODY_DIV_ID);
    createTrackList(parent_node); //track-list.js
    createProject(parent_node);
}

// Creates user project div
// parent_node, parent div where the project div will be appended to
function createProject(parent_node){
    var attributes = [];
    var project_node = document.createElement("div");
    project_node.id = PROJ_DIV_ID;

    var project_table = document.createElement("table");
    project_table.id = PROJECT_TABLE_ID;
    project_table.style.border = "1px dashed lightblue";
    var header = project_table.createTHead();
    var row = header.insertRow();
    var cell = row.insertCell(0);
    cell.innerHTML = "<b>PROJECT</b>";
    cell = row.insertCell(1);
    cell.innerHTML = "<button id=new_project>ADD PROJECT</button>";
    project_table.createTBody();
    
    project_node.appendChild(project_table);
    parent_node.appendChild(project_node);
    addProjectButtonEventListener();
    refreshProjects();
}

// Get all music title
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

var processProjectData = function(result)
{
    console.log("Project data loaded");
    var projectData = result;
	$("#project_table tbody tr").remove(); //removes rows from project_table
	
	var projects_list_table = document.getElementById(PROJECT_TABLE_ID);
	var rowLength = projects_list_table.rows.length;

	for (i = 0; i < projectData.length; i++){
		console.log("Inserting row");
		projectRow = projects_list_table.insertRow();
		projectRow.id = "project_row_" + projectData[i]["id"];
		var cell = projectRow.insertCell();
		cell.innerHTML = "<b>" + projectData[i]["name"] + "</b>";
	}
}

function refreshProjects(){
	var username = current_user.user.username;
	console.log("Refreshing projects");
	
	var url = "api/get_projects";
    var data = 
    {
        "username": username
    };
    
    data = JSON.stringify(data);
    console.log("Loading project data")
    postRequest(url, data, processProjectData);
}



