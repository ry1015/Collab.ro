// Add new project
function newProjectEvent(){
    console.log("ADD NEW PROJECT!");
    var project_table = document.getElementById(PROJECT_TABLE_ID).getElementsByTagName('tbody')[0];
     var row = project_table.insertRow(0);
     var cell = row.insertCell(0);
     cell.innerHTML = "<input id='project_name_field' value='Test Project'>";

    // row = new_project_table.insertRow(new_project_table.rows.length);
    // cell = row.insertCell(0);
    // cell.innerHTML = "<input placeholder='UPLOAD TRACK'>";

    // row = new_project_table.insertRow(new_project_table.rows.length);
    // cell = row.insertCell(0);
    // cell.innerHTML = "<input placeholder='UPLOAD STEM'>";

     row = project_table.insertRow(project_table.rows.length);
     cell = row.insertCell(0);
     cell.innerHTML = "<button id='save_button'>SAVE</button>";

    var parent_projects_table = document.getElementById("project_table");
    row = parent_projects_table.insertRow(parent_projects_table.rows.length);
    parent_projects_table.appendChild(project_table);
    
    document.getElementById("save_button").addEventListener('click', saveProjectEvent, false);
}

function saveProjectEvent(){
	var username = current_user.user.username;
	console.log("Save clicked");
	var processProject = function(result)
	{
        console.log("Project saved");
        loadProjects(username);
	}
	
	var url = "api/add_project";
    var data = 
    {
        "username": username,
        "project_name": document.getElementById("project_name_field").value
    };
    
    data = JSON.stringify(data);
    postRequest(url, data, processProject);
    refreshProjects();
}



