function getUserProject(user, project){
    var url = "api/get-user-public-project";
    form = new FormData();
    form.append("username", user);
    form.append("project_title", project);
    form.append("viewer", current_user.user.username);
    postFormRequest(url, form, processUserProject);
}

function processUserProject(result){
    var body = document.getElementById(BODY_DIV_ID);
    var search_result_div = document.getElementById("search-results-div");
    if (search_result_div != undefined)
        document.getElementById("navigation-div").removeChild(search_result_div);

    createProjectSection(body, result);
}

function createProjectSection(body, project){
    while(body.childNodes.length > 0){
        var child = body.firstChild;
        body.removeChild(child);
    }

    console.log(project);
    var wrapper = document.createElement("DIV");
    wrapper.id = "project-wrapper";
    wrapper.style.width = "70%";
    var title_div = document.createElement("DIV");
    title_div.setAttribute("class", "project");
    var span = document.createElement("SPAN");
    var text = document.createTextNode(project.project.name);
    span.appendChild(text);
    title_div.appendChild(span);
    

    // Create Status DIV
    var status_div = document.createElement("DIV");
    status_div.setAttribute("class", "project");
    status_div.id = "status-div";
    span = document.createElement("SPAN");
    text = document.createTextNode(project.project.status);
    span.appendChild(text);
    status_div.appendChild(span);
    wrapper.appendChild(status_div);
    wrapper.appendChild(title_div);

    addTrackSection(wrapper, project);
    body.appendChild(wrapper);
}

function addTrackSection(parent, project){
    var track_wrapper = document.createElement("DIV");
    var tracks = project.tracks;
    var track_div = undefined;
    var span = undefined;
    var text = undefined;
    var div = document.createElement("DIV");
    div.style.marginTop = "10px";
    span = document.createElement("SPAN");
    text = document.createTextNode("TRACKS");
    span.appendChild(text);
    div.appendChild(span);
    track_wrapper.appendChild(div);

    for (var i=0; i<tracks.length; ++i){
        track = tracks[i];
        track_div = document.createElement("DIV");
        track_div.style.width = "25%";
        track_div.setAttribute("class", "project track");
        track_div.style.border = "1px dashed black";
        span = document.createElement("SPAN");
        text = document.createTextNode("TITLE: " + track.title);
        span.appendChild(text);
        track_div.appendChild(span);

        span = document.createElement("SPAN");
        text = document.createTextNode("STATUS: " + track.status);
        span.appendChild(text);
        track_div.appendChild(span);

        span = document.createElement("SPAN");
        text = document.createTextNode("GENRE: " + track.genre);
        span.appendChild(text);
        track_div.appendChild(span);

        track_wrapper.appendChild(track_div);
    }

    parent.appendChild(track_wrapper);
}