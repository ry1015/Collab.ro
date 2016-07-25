// Add new project
function newProjectEvent(){
    console.log("ADD NEW PROJECT!");
    var new_project_table = document.createElement("table");
    // var row = new_project_table.insertRow(new_project_table.rows.length);
    // var cell = row.insertCell(0);
    // cell.innerHTML = "<input placeholder='ENTER PROJECT NAME'>";

    // row = new_project_table.insertRow(new_project_table.rows.length);
    // cell = row.insertCell(0);
    // cell.innerHTML = "<input placeholder='UPLOAD TRACK'>";

    // row = new_project_table.insertRow(new_project_table.rows.length);
    // cell = row.insertCell(0);
    // cell.innerHTML = "<input placeholder='UPLOAD STEM'>";

    // row = new_project_table.insertRow(new_project_table.rows.length);
    // cell = row.insertCell(0);
    // cell.innerHTML = "<button>SAVE</button>";

    var parent_projects_table = document.getElementById("project_table");
    row = parent_projects_table.insertRow(parent_projects_table.rows.length);
    parent_projects_table.appendChild(new_project_table);
}