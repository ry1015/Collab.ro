// Add new project
function newProjectEvent(){
    console.log("ADD NEW PROJECT!");
    var new_project_exist = document.getElementById("new_project_row");
    if (new_project_exist != undefined)
      return
    var project_table = document.getElementById(PROJECT_TABLE_ID).getElementsByTagName('tbody')[0];
     
    // row = new_project_table.insertRow(new_project_table.rows.length);
    // cell = row.insertCell(0);
    // cell.innerHTML = "<input placeholder='UPLOAD TRACK'>";

    // row = new_project_table.insertRow(new_project_table.rows.length);
    // cell = row.insertCell(0);
    // cell.innerHTML = "<input placeholder='UPLOAD STEM'>";

    var row = project_table.insertRow(0);
	row.className = "projectRow"; //copied over from update_project_html branch
    row.id = NEW_PROJECT_ROW_ID; 
    var cell = row.insertCell(0);
    var new_project_table = document.createElement("table");
    new_project_table.className = "projectTable"; //new
	
    new_project_table.className = NEW_PROJECT_TABLE_ID;
	new_project_table.id = NEW_PROJECT_TABLE_ID; //copied over from update_project_html branch
    cell.appendChild(new_project_table);


    // TITLE ROW
    row = new_project_table.insertRow(new_project_table.rows.length); //use new_project_table.rows.length to append row to the last index
    cell = row.insertCell(0);
    var text = document.createTextNode("TITLE");
    cell.appendChild(text);

    cell = row.insertCell(1);
    // Please move style to css file
    cell.style.width = "100%";
    var input = document.createElement("INPUT");
    input.id = "project_name_field";
    input.value = "Test Project";
    cell.appendChild(input);

    // Extra spacing
    row = new_project_table.insertRow(new_project_table.rows.length);
    cell = row.insertCell(0);
    cell.setAttribute("class", "empty_cell");


    // INSERT TRACKS ROW
    row = new_project_table.insertRow(new_project_table.rows.length);
    cell = row.insertCell(0);
    text = document.createTextNode("TRACK");
    cell.appendChild(text);

    cell = row.insertCell(1);
    input = document.createElement("INPUT");
    input.id = "track_title";
    input.placeholder = "Enter track title";
    cell.appendChild(input);

    row = new_project_table.insertRow(new_project_table.rows.length);
    cell = row.insertCell(0);
    cell.width = "10%";
    
    cell = row.insertCell(1);
    cell.innerHTML = "<select id='track_genre'>"+
                        "<option selected disabled>Genre</option>"+
                        "<option value='jazz'>Jazz"+
                        "<option value='metal'>Metal"+
                        "<option value='pop'>Pop"+
                        "<option value='rap'>Rap";

    row = new_project_table.insertRow(new_project_table.rows.length);
    cell = row.insertCell(0);
    cell.width = "10%";
    
    row = new_project_table.insertRow(new_project_table.rows.length);
    cell = row.insertCell(0);
    cell.width = "10%";
    cell = row.insertCell(1);
    cell.innerHTML = "<input id='track_upload' type='file'>";

    // Extra spacing
    row = new_project_table.insertRow(new_project_table.rows.length);
    cell = row.insertCell(0);
    cell.setAttribute("class", "empty_cell");


    // STEMS ROW
    row = new_project_table.insertRow(new_project_table.rows.length);
    cell = row.insertCell(0);
    text = document.createTextNode("STEMS");
    cell.appendChild(text);

    cell = row.insertCell(1);
    input = document.createElement("INPUT");
    input.id = "stem_title";
    input.placeholder = "Enter steam title";
    cell.appendChild(input);

    row = new_project_table.insertRow(new_project_table.rows.length);
    cell = row.insertCell(0);
    cell.width = "10%";

    cell = row.insertCell(1);
    cell.innerHTML = "<select id='stem_category'>"+
                        "<option selected disabled>Category</option>"+
                        "<option value='drums'>Drums"+
                        "<option value='guitar'>Guitar"+
                        "<option value='producer'>Producer"+
                        "<option value='vocal'>Vocal";
    
    row = new_project_table.insertRow(new_project_table.rows.length);
    cell = row.insertCell(0);
    cell.width = "10%";
    cell = row.insertCell(1);
    cell.innerHTML = "<input id='stem_upload' type='file'>";
//     row = new_project_table.insertRow(4);
//     cell = row.insertCell(0);
//     cell.innerHTML = "<button id='upload_button'>UPLOAD</button";

//     row = new_project_table.insertRow(project_table.rows.length);
//     cell = row.insertCell(5);
    
	// Extra spacing
    row = new_project_table.insertRow(new_project_table.rows.length);
    cell = row.insertCell(0);
    cell.setAttribute("class", "empty_cell");
	
    row = new_project_table.insertRow(new_project_table.rows.length);
    cell = row.insertCell(0);
    cell.innerHTML = "<button id='save_button'>SAVE</button>";
	cell = row.insertCell(1);
	cell.innerHTML = "<button id='cancel_button'>CANCEL</button";

    var parent_projects_table = document.getElementById("project_table");
    row = parent_projects_table.insertRow(parent_projects_table.rows.length);
    parent_projects_table.appendChild(project_table);
    
    document.getElementById("save_button").addEventListener('click', saveProjectEvent, false);
	document.getElementById("cancel_button").addEventListener('click', cancelProjectEvent, false);
}

function cancelProjectEvent() {
	var project_table_body = document.getElementById(PROJECT_TABLE_BODY_ID);
	project_table_body.deleteRow(0); 
}

function saveProjectEvent(){
  var username = current_user.user.username;
  var project_name = document.getElementById("project_name_field").value;
  
  var trackGenre = document.getElementById("track_genre");
  var selectedTrackGenreIndex = trackGenre.selectedIndex;
  var selectedTrackGenre = trackGenre.options[selectedTrackGenreIndex].value;
  var track_name = document.getElementById("track_title").value;
  var track_filename = document.getElementById("track_upload");
  
  var stemCategory = document.getElementById("stem_category");
  var selectedStemCategoryIndex = stemCategory.selectedIndex;
  var selectedStemCategory = stemCategory.options[selectedStemCategoryIndex].value;
  var stem_name = document.getElementById("stem_title").value;
  var stem_filename = document.getElementById("stem_upload");
  
  console.log("Save clicked");
  var processProject = function(result)
  {
      console.log("Project saved with id: " + result["id"]);
      var element = document.getElementById(NEW_PROJECT_ROW_ID).outerHTML = "";
      delete element;
      refreshProjects();
  }
  var url = "api/add_project";
  var formData = new FormData();
  formData.append("username", username);
  formData.append("project_name", project_name);
  formData.append("genre", selectedTrackGenre);
  formData.append("track_name", track_name);
  formData.append("track_filename", track_filename.files[0]);
  formData.append("category", selectedStemCategory);
  formData.append("stem_name", stem_name);
  formData.append("stem_filename", stem_filename.files[0]);
    /* var data = 
    {
        "username": username,
        "project_name": document.getElementById("project_name_field").value
    };
    
    data = JSON.stringify(data); */
    
    
    postProjectRequest(url, formData, processProject);
}

// Post Request used with form data
function postProjectRequest(url, data, callback){
   $.ajax({
       type: "POST",
       url: url,
       data: data,
       dataType: 'json',
       processData: false, // important
       contentType: false, // important
       success : function (result){
           callback(result);
       },
       error : function(result){
           failCallback(result);
       }
   });
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



