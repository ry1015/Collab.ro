// Add new project
function newProjectEvent(){
    console.log("ADD NEW PROJECT!");
    var project_table = document.getElementById(PROJECT_TABLE_ID).getElementsByTagName('tbody')[0];
     
     

    // row = new_project_table.insertRow(new_project_table.rows.length);
    // cell = row.insertCell(0);
    // cell.innerHTML = "<input placeholder='UPLOAD TRACK'>";

    // row = new_project_table.insertRow(new_project_table.rows.length);
    // cell = row.insertCell(0);
    // cell.innerHTML = "<input placeholder='UPLOAD STEM'>";
    
     var row = project_table.insertRow(0);
     var cell = row.insertCell(0);
     cell.innerHTML = "<input id='project_name_field' value='Test Project'>";
	 cell = row.insertCell(1);
	 cell.innerHTML = "STEMS:<input id='stem_title' placeholder='ENTER TITLE'>";
	 cell = row.insertCell(2);
	 cell.innerHTML = "Category:<select id='stem_category'> <option value='drums'>Drums" +
	                           "<option value='guitar'>Guitar" +
						       "<option value='producer'>Producer" +
							   "<option value='vocal'>Vocal";
	 cell = row.insertCell(3);
	 cell.innerHTML = "<input id='stem_upload' type='file'>";
	 cell = row.insertCell(4);
	 cell.innerHTML = "<button id='upload_button'>UPLOAD</button";
	
//     row = project_table.insertRow(project_table.rows.length);
//     cell = row.insertCell(5);

     cell = row.insertCell(5);
     cell.innerHTML = "<button id='save_button'>SAVE</button>";

    var parent_projects_table = document.getElementById("project_table");
    row = parent_projects_table.insertRow(parent_projects_table.rows.length);
    parent_projects_table.appendChild(project_table);
    
	document.getElementById("upload_button").addEventListener('click', uploadStemEvent, false);
    document.getElementById("save_button").addEventListener('click', saveProjectEvent, false);
}

function saveProjectEvent(){
	var username = current_user.user.username;
	console.log("Save clicked");
	var processProject = function(result)
	{
        console.log("Project saved with id: " + result);
        refreshProjects();
	}
	
	var url = "api/add_project";
    var data = 
    {
        "username": username,
        "project_name": document.getElementById("project_name_field").value
    };
    
    data = JSON.stringify(data);
    postRequest(url, data, processProject);
}

function deleteProjectEvent(id){
	console.log("Delete project " + id + " clicked.");
	var processProject = function(result)
	{
        console.log("Project " + id + " deleted.");
        refreshProjects();
	}
	
	var url = "api/delete_project";
    var data = 
    {
        "id":id
    };
    
    data = JSON.stringify(data);
    deleteRequest(url, data, processProject);
}



