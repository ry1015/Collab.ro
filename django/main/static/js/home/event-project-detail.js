var PROJ_TRACKS = undefined;
var PROJ_STEMS = undefined;

function addProjectTrackEvent(node){
    node.onclick = getTrackOwners;
}

function addProjectStemEvent(node){
    node.onclick = getStemOwners;
}
// Gets project id and info
function getProjectId(){
    var current = this;
    var table_node = findTable(current);
    var project_id = table_node.id.split("_")[2];
    var processProjectId = function(results){
        console.log("PROJECT PROCESS");
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
    var wrapper = document.createElement("DIV");
    wrapper.setAttribute("class", "projectDetailWrapper");
    wrapper.style.textAlign = "center";
    var project_detail_table = document.createElement("TABLE");
    project_detail_table.setAttribute("class", "projectDetail");
    var row = project_detail_table.insertRow(project_detail_table.rows.length);
    var cell = row.insertCell(0);
    cell.colSpan = "2";
    cell.style.textAlign = "center";
    var bold = document.createElement("B");
    var text = document.createTextNode(proj.project_name);
    bold.appendChild(text);
    cell.appendChild(bold);
    wrapper.appendChild(project_detail_table);
    body_div.appendChild(wrapper);
    createProjectDetailTracks(proj, project_detail_table);
    createProjectDetailStems(proj, project_detail_table);
}

function getUniqueTitles(list_obj){
    var unique_titles = []
    for (var i in list_obj){
        if (unique_titles.indexOf(list_obj[i].title) < 0){
            unique_titles.push(list_obj[i].title);
        }
    }
    return unique_titles;
}

function createProjectDetailTracks(proj, table){
    var row = table.insertRow(table.rows.length);
    var cell = row.insertCell(0);
    cell.colSpan = "2";
    var bold = document.createElement("B");
    var text = document.createTextNode("TRACKS");
    bold.appendChild(text);
    cell.appendChild(bold);
    PROJ_TRACKS = proj.tracks;
    PROJ_TRACKS.sort(function(obj1,obj2){
        return new Date(obj1.timestamp) < new Date(obj2.timestamp);
    });

    var unique_titles = getUniqueTitles(PROJ_TRACKS);
    var anchor = undefined;

    for (var i=0; i<unique_titles.length; ++i){
        row = table.insertRow(table.rows.length);
        cell = row.insertCell(0);
        cell.setAttribute("class", "emptyCell");
        
        cell = row.insertCell(1);
        text = document.createTextNode(unique_titles[i]);
        anchor = document.createElement("A");
        anchor.href="#";
        anchor.appendChild(text);
        cell.appendChild(anchor);
        addProjectTrackEvent(anchor);
    }
}

function createProjectDetailStems(proj, table){
    var row = table.insertRow(table.rows.length);
    var cell = row.insertCell(0);
    cell.colSpan = "2";
    var bold = document.createElement("B");
    var text = document.createTextNode("STEMS");
    bold.appendChild(text);
    cell.appendChild(bold);
    PROJ_STEMS = proj.stems;
    PROJ_STEMS.sort(function(obj1,obj2){
        return new Date(obj1.timestamp) < new Date(obj2.timestamp);
    });

    var unique_titles = getUniqueTitles(PROJ_STEMS);
    var anchor = undefined;

    for (var i=0; i<unique_titles.length; ++i){
        row = table.insertRow(table.rows.length);
        cell = row.insertCell(0);
        cell.setAttribute("class", "emptyCell");

        cell = row.insertCell(1);
        text = document.createTextNode(unique_titles[i]);
        anchor = document.createElement("A");
        anchor.href = "#";
        anchor.appendChild(text);
        cell.appendChild(anchor);
        addProjectStemEvent(anchor);
    }
}

function getTrackOwners(){
    var title = this.text;
    var owners = [];
    var obj = undefined;

    for (var i=0; i<PROJ_TRACKS.length; ++i){
        obj = PROJ_TRACKS[i];
        if (obj.title == title)
            owners.push(obj);
    }
    createTrackOwnerTable(owners);
}

function getStemOwners(){
    var title = this.text;
    var owners = [];
    var obj = undefined;

    for (var i=0; i<PROJ_STEMS.length; ++i){
        obj = PROJ_STEMS[i];
        if (obj.title == title)
            owners.push(obj);
    }
    createStemOwnerTable(owners);
}
function createTrackOwnerTable(list_owners){
    var body = document.getElementById(BODY_DIV_ID).childNodes[0];
    var table = document.createElement("TABLE");
    table.setAttribute("class", "projectDetail trackOwners");
    var row = table.insertRow(table.rows.length);
    var cell = row.insertCell(0);
    var anchor = undefined;
    var text = undefined;
    var obj = undefined;
    var bold = document.createElement("B");

    if (body.childElementCount > 1){
        var last_child = body.lastElementChild;
        body.removeChild(last_child);
    }

    if (list_owners.length > 0){
        text = document.createTextNode(list_owners[0].title + " Collaborators");
        bold.appendChild(text);
        cell.appendChild(bold);
        cell.style.width = "300px";
    }

    for (var i=0; i<list_owners.length; ++i){
        obj = list_owners[i];
        row = table.insertRow(table.rows.length);
        cell = row.insertCell(0);
        anchor = document.createElement("A");
        anchor.href = "#";
        text = document.createTextNode(obj.owner);
        anchor.appendChild(text);
        cell.appendChild(anchor);
    }
    body.appendChild(table);
}

function createStemOwnerTable(list_owners){
    var body = document.getElementById(BODY_DIV_ID).childNodes[0];
    var table = document.createElement("TABLE");
    table.setAttribute("class", "projectDetail trackOwners");
    var row = table.insertRow(table.rows.length);
    var cell = row.insertCell(0);
    var anchor = undefined;
    var text = undefined;
    var obj = undefined;
    var bold = document.createElement("B");

    if (body.childElementCount > 1){
        var last_child = body.lastElementChild;
        body.removeChild(last_child);
    }

    if (list_owners.length > 0){
        text = document.createTextNode(list_owners[0].title + " Collaborators");
        bold.appendChild(text);
        cell.appendChild(bold);
        cell.style.width = "300px";
    }

    for (var i=0; i<list_owners.length; ++i){
        obj = list_owners[i];
        row = table.insertRow(table.rows.length);
        cell = row.insertCell(0);
        anchor = document.createElement("A");
        anchor.href = "#";
        text = document.createTextNode(obj.owner);
        anchor.appendChild(text);
        cell.appendChild(anchor);
    }
    body.appendChild(table);
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