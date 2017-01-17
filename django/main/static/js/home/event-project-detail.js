var PROJ_TRACKS = undefined;
var PROJ_STEMS = undefined;

function addProjectTrackEvent(node){
    node.onclick = getTrackOwners;
}

function addProjectStemEvent(node){
    node.onclick = getStemOwners;
}

function addVersionEvent(node){
    node.onclick = createVersionTable;
}

// Gets project id and info
function getProjectId(){
    var current = this;
    var table_node = findTable(current);
    var project_id = table_node.id.split("_")[2];
    var processProjectId = function(results){
        console.log("PROCESS LIST");
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

// Create Project Detail Page
// proj, project detail object
function createProjectDetail(proj){
    console.log("CREATING PROJECT DETAIL");
    console.log(proj);
    var body_div = document.getElementById(BODY_DIV_ID);
    if (body_div.innerHTML != "")
        body_div.innerHTML = "";
    var wrapper = document.createElement("DIV");
    // wrapper.setAttribute("class", "projectDetailWrapper");
    // wrapper.style.textAlign = "center";
    // var project_detail_table = document.createElement("TABLE");
    // project_detail_table.setAttribute("class", "projectDetail");
    // var row = project_detail_table.insertRow(project_detail_table.rows.length);
    // var cell = row.insertCell(0);
    // cell.colSpan = "2";
    // cell.style.textAlign = "center";
    // var bold = document.createElement("B");
    // var text = document.createTextNode(proj.project_name);
    // bold.appendChild(text);
    // cell.appendChild(bold);
    // wrapper.appendChild(project_detail_table);
    
    // createProjectDetailTracks(proj, project_detail_table);
    // createProjectDetailStems(proj, project_detail_table);
    var project_navigation_div = createProjectNavigation(document.createElement("DIV"), proj);
    project_navigation_div.setAttribute("class", "project-detail-navigation");

    var track_div = document.createElement("DIV");
    track_div.setAttribute("class", "project-detail-track");
    track_div.appendChild(document.createTextNode('PASS THIS DIV INTO YOUR FUNCTION **** LOCATION: event-project-detail.js LINE: 60'));
    
    var options_div = createOptionsDiv(document.createElement("DIV"), proj);
    options_div.setAttribute("class", "options-div");

    var info_div = createInfoDiv(document.createElement("DIV"), proj);
    info_div.setAttribute("class", "info-div");

    wrapper.appendChild(project_navigation_div);
    wrapper.appendChild(track_div);
    wrapper.appendChild(options_div);
    wrapper.appendChild(info_div);

    body_div.appendChild(wrapper);

    var updates_div = document.getElementById("updates-div");
    getRecentUpdates(updates_div, proj);

}

// Updates updates_div
// updates_div, updates_div
function getRecentUpdates(updates_div, proj_obj){
    var loading_div = document.createElement("DIV");
    loading_div.setAttribute("class", "loading-icon");
    updates_div.appendChild(loading_div);

    var insertRecentUpdates = function(result){
        console.log(result);
        if (updates_div.lastChild.className == "loading-icon");
            updates_div.removeChild(updates_div.lastChild);

        var recent_updates = document.createElement("DIV");
        recent_updates.id = "recent-updates";

        updates_div.appendChild(recent_updates);
    }

    var url = "api/get-recent-updates";
    var formData = new FormData();
    formData.append("project_id", proj_obj["project_id"]);
    postFormRequest(url, formData, insertRecentUpdates);
}
// Create Project Detail Navigation
// navi_node, navigation div
// proj_obj, project detail object
// @return updated navi_node
function createProjectNavigation(navi_node, proj_obj){
    // Button DIV
    var previous_button_div = document.createElement("DIV");
    previous_button_div.setAttribute("class", "previous-page-button project-detail-navigation");
    
    // Title DIV
    var project_title_div = document.createElement("DIV");
    project_title_div.setAttribute("class", "project-detail-title project-detail-navigation");
    var project_title_span = document.createElement("SPAN");
    project_title_span.appendChild(document.createTextNode(proj_obj.project_name));
    project_title_div.appendChild(project_title_span);

    // Overview DIV
    var overview_div = document.createElement("DIV");
    overview_div.setAttribute("class", "project-detail-overview project-detail-navigation");
    var total_stems = proj_obj.stems.length;
    var total_tracks = proj_obj.tracks.length;
    var overview_span = document.createElement("SPAN");
    var b = document.createElement("B");
    var u = document.createElement("U");
    u.appendChild(document.createTextNode("Overview"));
    b.appendChild(u);
    overview_span.appendChild(b);
    overview_div.appendChild(overview_span);

    if (total_stems > 0){ 
        var empty_div = document.createElement("DIV");
        empty_div.setAttribute("class", "empty-spacing-div");

        var stem_span = document.createElement("SPAN");
        stem_span.appendChild(document.createTextNode('Stem Files'));
        
        overview_div.appendChild(empty_div);
        overview_div.appendChild(stem_span);
    }

    if (total_tracks > 0){
        var empty_div = document.createElement("DIV");
        empty_div.setAttribute("class", "empty-spacing-div");

        var track_span = document.createElement("SPAN");
        track_span.appendChild(document.createTextNode('Track Files'));
        
        overview_div.appendChild(empty_div);
        overview_div.appendChild(track_span);
    }

    navi_node.appendChild(previous_button_div);
    navi_node.appendChild(project_title_div);
    navi_node.appendChild(overview_div)

    return navi_node;
}

// Create Project Detail Options DIV
// options_node, options DIV
// proj_obj, project detail object
// @return updated options_node
function createOptionsDiv(options_node, proj_obj){
    var stem_files = document.createElement("DIV");
    var stem_span = document.createElement("SPAN");
    var text = "(" + proj_obj.stems.length + ")" + " Stem Files";
    stem_span.appendChild(document.createTextNode(text));
    stem_files.appendChild(stem_span);

    var comments = document.createElement("DIV");
    var comments_span = document.createElement("SPAN");
    text = "(" + proj_obj.stems.length + ")" + " Comments";
    comments_span.appendChild(document.createTextNode(text));
    comments.appendChild(comments_span);

    var download = document.createElement("DIV");
    var download_span = document.createElement("SPAN");
    text = "Download";
    download_span.appendChild(document.createTextNode(text));
    download.appendChild(download_span);

    var empty_div = document.createElement("DIV");
    empty_div.setAttribute("class", "empty-spacing-div");

    options_node.appendChild(stem_files);
    options_node.appendChild(empty_div);
    options_node.appendChild(comments);
    options_node.appendChild(empty_div.cloneNode(true));

    options_node.appendChild(download);

    return options_node;
}

// Create Information DIV
// info_div, project information DIV
// proj_obj, project detail object
// @return updated info_div
function createInfoDiv(info_div, proj_obj){
    // Recent Updates DIV
    var updates_div = document.createElement("DIV");
    updates_div.id ="updates-div";
    var updates_span = document.createElement("SPAN");
    updates_span.appendChild(document.createTextNode("Recent Updates"));
    updates_div.appendChild(updates_span);

    // Project Information DIV
    var project_info = document.createElement("DIV");
    project_info.id = "project-info-div";
    var project_info_span = document.createElement("SPAN");
    project_info_span.appendChild(document.createTextNode("Project Information"));
    project_info.appendChild(project_info_span);

    var project_description_div = document.createElement("DIV");
    project_description_div.id = "project-description";

    if (proj_obj.project_desc != ""){
        project_description_div.innerHTML = proj_obj.project_desc.replace(/(\r\n|\n|\r)/gm, "<br>");;
    }
    else{
        project_description_div.innerHTML = "Leave Project Description Here";
    }
    project_info.appendChild(project_description_div);

    info_div.appendChild(updates_div);
    info_div.appendChild(project_info);

    return info_div;
}

// Get Only Unique Titles From A List
// list_obj, list of objects
// @return list with only unique titles
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
    createOwnerTable(owners, "track");
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
    createOwnerTable(owners, "stem");
}

function createOwnerTable(list_owners, type){
    var body = document.getElementById(BODY_DIV_ID).childNodes[0];
    var table = document.createElement("TABLE");
    table.setAttribute("class", "projectDetail trackOwners");
    var row = table.insertRow(table.rows.length);
    var cell = row.insertCell(0);
    var anchor = undefined;
    var text = undefined;
    var obj = undefined;
    var bold = document.createElement("B");
    var unique_owners = [];

    if (body.childElementCount > 1){
        while (body.childElementCount > 1){
            var last_child = body.lastElementChild;
            body.removeChild(last_child);
        }
    }

    if (list_owners.length > 0){
        text = document.createTextNode(list_owners[0].title + " Collaborators");
        bold.appendChild(text);
        cell.appendChild(bold);
        cell.style.width = "300px";
    }

    for (var i=0; i<list_owners.length; ++i){
        obj = list_owners[i];
        if (unique_owners.indexOf(obj.owner) < 0){
            unique_owners.push(obj.owner);
            row = table.insertRow(table.rows.length);
            cell = row.insertCell(0);
            anchor = document.createElement("A");
            anchor.href = "#";
            anchor.setAttribute("sid", obj.title);
            anchor.setAttribute("type", type);
            addVersionEvent(anchor);
            text = document.createTextNode(obj.owner);
            anchor.appendChild(text);
            cell.appendChild(anchor);
        }
    }
    body.appendChild(table);
}
// Locates the parent table node
// node, the current node
// returns table node
function findTable(node){
    while (!node.id.includes('project_table')){
        node = node.parentNode;
    }
    return node;
}

function createVersionTable(){
    console.log(this.getAttribute("sid"));
    var current_node = this;
    var body = document.getElementById(BODY_DIV_ID).childNodes[0]; //get wrapper
    var table = document.createElement("TABLE");
    table.setAttribute("class", "projectDetail trackOwners");
    var row = table.insertRow(table.rows.length);
    var cell = row.insertCell(0);
    var anchor = undefined;
    var text = undefined;
    var obj = undefined;
    var list = undefined;
    var bold = document.createElement("B");

    if (body.childElementCount > 2){
        var last_child = body.lastElementChild;
        body.removeChild(last_child);
    }

    if (this.getAttribute("type") == "stem")
        list = ownerVersionList(PROJ_STEMS, this.text, this.getAttribute("sid"));
    else
        list = ownerVersionList(PROJ_TRACKS, this.text, this.getAttribute("sid"));

    if (list.length > 0){
        text = document.createTextNode(list[0].owner + " " + list[0].title + " Versions");
        bold.appendChild(text);
        cell.appendChild(bold);
        cell.style.width = "300px";
    }

    for (var i=0; i<list.length; ++i){
        obj = list[i];
        row = table.insertRow(table.rows.length);
        cell = row.insertCell(0);
        anchor = document.createElement("A");
        anchor.href = "#";
        text = document.createTextNode(obj.timestamp);
        anchor.appendChild(text);
        cell.appendChild(anchor);
    }
    body.appendChild(table);
    }

function ownerVersionList(list, owner, title){
    var owner_versions = [];
    var obj = undefined;
    for (var i=0; i<list.length; ++i){
        obj = list[i];
        if (obj.title == title && obj.owner == owner)
            owner_versions.push(obj);
    }
    return owner_versions;
}