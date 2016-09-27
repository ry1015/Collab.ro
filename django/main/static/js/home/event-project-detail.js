// Gets project id and info
function getProjectId(){
    var current = this;
    var table_node = findTable(current);
    var project_id = table_node.id.split("_")[2];
    var processProjectId = function(results){
        console.log(results);
        createProjectDetail(results);
    }

    var url = "api/get-project-details";
    var data = {
        "username": current_user.user.username,
        "project_id": project_id
    };
    postRequest(url, data, processProjectId)
}

function createProjectDetail(proj){
    var body_div = document.getElementById(BODY_DIV_ID);
    if (body_div.innerHTML != "")
        body_div.innerHTML = "";
    var project_detail_table = document.createElement("TABLE");
    project_detail_table.style.width = "20%";
    project_detail_table.style.marginLeft = "auto";
    project_detail_table.style.marginRight = "auto";
    project_detail_table.setAttribute("class", "projectDetail");
    var row = project_detail_table.insertRow(project_detail_table.rows.length);
    var cell = row.insertCell(0);
    cell.colSpan = "2";
    cell.style.textAlign = "center";
    var bold = document.createElement("B");
    var text = document.createTextNode(proj.project_name);
    bold.appendChild(text);
    cell.appendChild(bold);
    body_div.appendChild(project_detail_table);

    createProjectDetailTracks(proj, project_detail_table);
    createProjectDetialStems(proj, project_detail_table);
}

function createProjectDetailTracks(proj, table){
    var row = table.insertRow(table.rows.length);
    var cell = row.insertCell(0);
    cell.colSpan = "2";
    var bold = document.createElement("B");
    var text = document.createTextNode("TRACKS");
    bold.appendChild(text);
    cell.appendChild(bold);
    var tracks = proj.tracks;
    var obj = {};
    for (var i=0; i<tracks.length; ++i){
        obj = tracks[i];
        row = table.insertRow(table.rows.length);
        cell = row.insertCell(0);
        cell.setAttribute("class", "emptyCell");

        cell = row.insertCell(1);
        text = document.createTextNode(obj.title);
        cell.appendChild(text);
    }

}

function createProjectDetialStems(proj, table){
    var row = table.insertRow(table.rows.length);
    var cell = row.insertCell(0);
    cell.colSpan = "2";
    var bold = document.createElement("B");
    var text = document.createTextNode("STEMS");
    bold.appendChild(text);
    cell.appendChild(bold);
    var stems = proj.stems;
    var obj = {};
    for (var i=0; i<stems.length; ++i){
        obj = stems[i];
        row = table.insertRow(table.rows.length);
        cell = row.insertCell(0);
        cell.setAttribute("class", "emptyCell");

        cell = row.insertCell(1);
        text = document.createTextNode(obj.title);
        cell.appendChild(text);
    }
}
// Locates the parent table node
// node, the current node
// returns table node
function findTable(node){
    while (node.tagName != "TABLE"){
        node = node.parentNode;
    }
    return node;
}