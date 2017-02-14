var audio_stack = [];
var home = "http://127.0.0.1:8000/";

// Add function to node
function addStemControls(node){
    node.onclick = stemControls;
}

// Gets project id and info
function getProjectId(){
    var current = this;
    var table_node = findTable(current);
    var project_id = table_node.id.split("_")[2];
    var processProjectId = function(results){
        createProjectDetail(results);
    }

    var url = "api/get-project-details";
    var data = {
        "username": current_user.user.username,
        "project_id": project_id
    };
    postRequest(url, data, processProjectId)
}

// Pause audio if playing
function pauseAudio(){
    for (i = 0; i < audio_stack.length; ++i){
        if (!audio_stack[i]["audio"].paused){ //check if audio is playing
            audio_stack[i]["audio"].pause();
            var audio_parent = findAudioDiv(audio_stack[i]["grandparent"], audio_stack[i]["audio"].getAttribute("stem-id"));
            audio_parent.setAttribute("class", "play-stem");
            audio_parent.classList.remove("pause-stem");
            audio_parent.classList.add("play-stem");
        }
    }
}

// Create Project Detail Page
// proj, project detail object
function createProjectDetail(proj){
    var body_div = document.getElementById(BODY_DIV_ID);
    if (body_div.innerHTML != "")
        body_div.innerHTML = "";
    var wrapper = document.createElement("DIV");
    wrapper.id = "project-detail-wrapper";

    var project_navigation_div = createProjectNavigation(document.createElement("DIV"), proj);
    project_navigation_div.id = "project-detail-navigation";
    project_navigation_div.setAttribute("pid", proj.project_id);

    var track_div = document.createElement("DIV");
    track_div.id = "project-detail-track";
    track_div.appendChild(getTrack(proj));
    
    var options_div = createOptionsDiv(document.createElement("DIV"), proj);
    options_div.id = "options-div";

    var info_div = createInfoDiv(document.createElement("DIV"), proj);
    info_div.id = "info-div";

    wrapper.appendChild(project_navigation_div);
    wrapper.appendChild(track_div);
    wrapper.appendChild(options_div);
    wrapper.appendChild(info_div);

    body_div.appendChild(wrapper);

    var updates_div = document.getElementById("updates-div");
    getRecentUpdates(updates_div, proj);
}

// Gets the project track
// Assigns triggers to image tag track_play
// @return track_play image
function getTrack(proj){
    if(proj.tracks.length != 0){
        var track_audio;
        proj_track = proj.tracks[0];
        track_audio = new Howl({
            src: ["media/" + proj_track.filename]
        });

        var track_play = document.createElement("IMG");
        track_play.setAttribute("class", "track_play_button");
        track_play.setAttribute("src", "media/play.png");;
        track_play.onclick = function() { track_audio.play(); }
         
        track_audio.on("play", function(){
           track_play.setAttribute("src", "media/pause.png");
           track_play.onclick = function() { track_audio.pause(); }
        });
        
        track_audio.on("pause", function(){
            track_play.setAttribute("src", "media/play.png");
            track_play.onclick = function() { track_audio.play(); }
         });
        return track_play;
    }
    var empty_div = document.createElement("DIV");
    empty_div.id = "empty-div";
    return empty_div;
}
// Updates updates_div
// updates_div, updates_div
function getRecentUpdates(updates_div, proj_obj){
    var loading_div = document.createElement("DIV");
    loading_div.setAttribute("class", "loading-icon");
    updates_div.appendChild(loading_div);

    var insertRecentUpdates = function(result){
        if (updates_div.lastChild.className == "loading-icon");
            updates_div.removeChild(updates_div.lastChild);

        var recent_updates = document.createElement("DIV");
        recent_updates.id = "recent-updates";

        for (var i=0; i < result.length; ++i){
            var header = document.createElement("DIV");
            header.setAttribute("class", "recent-updates-header");
            var author_div = document.createElement("DIV");
            var duration_div = document.createElement("DIV");
            var text;
            var content = document.createElement("DIV");
            
            if (result[i]["stem_comment"] != undefined){
                text = "<b>" + result[i]["stem_comment_sender"] + "</b> added a comment to <b>" + result[i]["stem_title"] + "</b>";

                var stem_comments = document.createTextNode(result[i]["stem_comment"]);
                var span_comments = document.createElement("SPAN");
                span_comments.appendChild(stem_comments);
                content.appendChild(span_comments);
                
            }
            else{
                text = "<b>" + result[i]["stem_uploaded_by"] + "</b> uploaded a stem file: <b>" + result[i]["stem_filename"] + "</b>";

                content.setAttribute("class", "play-stem");
                content.setAttribute("stem-id", result[i]["stem_filename"]);
                addStemControls(content);
            }

            var span = document.createElement("SPAN");
            span.innerHTML = text;
            author_div.appendChild(span);

            var date_text = document.createTextNode(getMaxTime(result[i]["date"]));
            duration_div.appendChild(date_text);

            header.appendChild(author_div);
            header.appendChild(duration_div);
            header.appendChild(content);

            recent_updates.appendChild(header);
            updates_div.appendChild(recent_updates);
        }

        updates_div.appendChild(recent_updates);
    }

    var url = "api/get-recent-updates";
    var formData = new FormData();
    formData.append("project_id", proj_obj["project_id"]);
    postFormRequest(url, formData, insertRecentUpdates);
}

// Play/Pause audio
function stemControls(){
    var node = this;

    // Audio stack contains currently playing stems
    for (i = 0; i < audio_stack.length; ++i){
        if (!audio_stack[i]["audio"].paused){ //check if audio is playing
            audio_stack[i]["audio"].pause();
            if (audio_stack[i]["audio"].getAttribute("stem-id").includes(node.getAttribute("stem-id"))){
                // this object will contain stem-id, if what contains in audio_stack == this node,
                // change class
                node.classList.remove("pause-stem");
                node.classList.add("play-stem");
                return
            }
            else {
                // this node's stem-id is not equal to what is currently playing thus find the node
                // via grandparent
                var audio_parent = findAudioDiv(audio_stack[i]["grandparent"], audio_stack[i]["audio"].getAttribute("stem-id"));
                audio_parent.setAttribute("class", "play-stem");
                audio_parent.classList.remove("pause-stem");
                audio_parent.classList.add("play-stem");
            }
        }
    }

    // Play a puased stem
    for (i = 0; i < audio_stack.length; ++i){
        if (audio_stack[i]["audio"].getAttribute("stem-id").includes(node.getAttribute("stem-id"))){
            node.classList.remove("play-stem");
            node.classList.add("pause-stem");
            audio_stack[i]["audio"].play();

            // Pauses playing audio if non-audio link is selected
            document.onmouseup = function(event){
                console.log(event.target);
                if (event.target.getAttribute("stem-id") == null){
                    pauseAudio();
                }
                else {
                    document.onmouseup = null;
                }
            }
            return;
        }
    }

    // If this node is not in the audio stack, retrieve the stem-id and add to audio_stack
    var url = "api/get-stem-file";
    var formData = new FormData();
    formData.append("filename", node.getAttribute("stem-id"));
    var xhr = new XMLHttpRequest();
    xhr.open("POST", home + url, true);
    var csrftoken = getCookie('csrftoken');
    xhr.setRequestHeader("X-CSRFToken", csrftoken);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.responseType = 'blob';
    xhr.onload = function(){
        var binaryData = [];
        binaryData.push(xhr.response);
        var audio = new Audio();
        var objectUrl = window.URL.createObjectURL(new Blob(binaryData, {type: "audio/mpeg"}));
        audio.src = objectUrl;
        // Release resource when it's loaded
        audio.onload = function(evt) {
            URL.revokeObjectUrl(objectUrl);
        };
        var stem_id = xhr.getResponseHeader("Content-Disposition").split("=")[1];
        node.classList.remove("play-stem");
        node.classList.add("pause-stem");
        audio.setAttribute("stem-id", stem_id);
        audio.play();
        // audio.ontimeupdate = function(){
        //     console.log(Math.floor(this.currentTime));
        // };
        var tmp = {
            "audio" : audio,
            "grandparent" : getGrandparentDIV(node)
        }
        audio_stack.push(tmp);

        // Pauses playing audio if non-audio link is selected
        document.onmouseup = function(event){
            console.log(event.target);
            if (event.target.onclick != null && event.target.getAttribute("stem-id") == null){
                pauseAudio();
            }
            else {
                document.onmouseup = null;
            }
        }

        // SAVE THIS CODE FOR NOW TO DISPLAY WAVEFORM
        // var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        // var arrayBuffer;
        // var fileReader = new FileReader();
        // fileReader.readAsArrayBuffer(new Blob(binaryData, {type: "audio/mpeg"}));
        // fileReader.onload = function() {
        //     arrayBuffer = this.result;
        //     audioCtx.decodeAudioData(arrayBuffer, function(decodedData) {
        //       // use the decoded data here
        //       displayBuffer(decodedData);
        //     });
        // };
        
    }
    xhr.send(formData);
}

// DO NOT DELETE THE FUNCTIONS
// var canvasWidth = window.innerWidth/2,  canvasHeight = 120 ;
// var newCanvas   = createCanvas (canvasWidth, canvasHeight);
// var context     =  newCanvas.getContext('2d');

// function displayBuffer(buff /* is an AudioBuffer */) {
  
//     var drawLines = 400;
//     var leftChannel = buff.getChannelData(0); // Float32Array describing left channel     
//     var lineOpacity = canvasWidth / leftChannel.length  ;      
//     context.save();
//     context.fillStyle = '#080808' ;
//     context.fillRect(0,0,canvasWidth,canvasHeight );
//     context.strokeStyle = '#46a0ba';
//     context.globalCompositeOperation = 'lighter';
//     context.translate(0,canvasHeight / 2);
//     //context.globalAlpha = 0.6 ; // lineOpacity ;
//     context.lineWidth=1;
//     var totallength = leftChannel.length;
//     var eachBlock = Math.floor(totallength / drawLines);
//     var lineGap = (canvasWidth/drawLines);

//     context.beginPath();
//     for(var i=0;i<=drawLines;i++){
//         var audioBuffKey = Math.floor(eachBlock * i);
//         var x = i*lineGap;
//         var y = leftChannel[audioBuffKey] * canvasHeight / 2;
//         context.moveTo( x, y );
//         context.lineTo( x, (y*-1) );
//     }
//     context.stroke();
//     context.restore();
//     document.getElementById("recent-updates").appendChild(newCanvas);
// }

// function createCanvas ( w, h ) {
//     var newCanvas = document.createElement('canvas');
//     newCanvas.width  = w;     newCanvas.height = h;
//     return newCanvas;
// };


// Find div that contains stem-id
// node, grandparent node
// stem_id, stem-id to locate
// @return the DIV that contains the stem-id
function findAudioDiv(node, stem_id){
    for (i = 0; i < node.childNodes.length; ++i){
        if (node.childNodes[i].childNodes[2].getAttribute("stem-id") != null){
            if (node.childNodes[i].childNodes[2].getAttribute("stem-id").includes(stem_id)){
                // console.log(node.childNodes[i].childNodes[2]);
                // console.log(stem_id);
                return node.childNodes[i].childNodes[2];
            }
        }
    }
    return undefined;
}

// Find parent DIV
// node, current node
// @return parent DIV
function getGrandparentDIV(node) {
    var grandparent_node = node.parentNode.parentNode;
    var new_node = node;
    while (new_node != null){
        if (new_node.parentNode == grandparent_node)
            return new_node.parentNode;
        else
            new_node = new_node.parentNode;
    }

    return undefined;
}
// Get max time
// time, specified time
// @return max time
function getMaxTime(time){
    var current_date = new Date;
    var duration = current_date - new Date(time);
    var days = Math.round(getDay(duration));
    var hours = Math.round(getHour(duration));
    var mins = Math.round(getMinute(duration));
    
    if (days > 1)
        return days + " days";
    else if (hours > 1)
        return hours + " hours";
    else if (hours > 0)
        return "1 hour";
    else if (mins > 1)
        return mins + " mins";
    else
        return "1 min";
}

// Get hour of a specied time
// time, specified time
// @return number of hours
function getHour(time){
    return time/1000/60/60;
}

// Get minute of a specied time
// time, specified time
// @return number of minutes
function getMinute(time){
    return time/1000/60;
}

// Get day of a specied time
// time, specified time
// @return number of days
function getDay(time){
    return time/1000/60/60/24;
}

// Create project detail navigation
// navi_node, navigation div
// proj_obj, project detail object
// @return updated navi_node
function createProjectNavigation(navi_node, proj_obj){
    // Button DIV
    var previous_button_div = document.createElement("DIV");
    previous_button_div.setAttribute("class", "previous-page-button");
    
    // Title DIV
    var project_title_div = document.createElement("DIV");
    project_title_div.id = "project-detail-title";
    project_title_div.setAttribute("pid", proj_obj.project_id);
    
    var project_title_span = document.createElement("SPAN");
    project_title_span.appendChild(document.createTextNode(proj_obj.project_name));
    project_title_div.appendChild(project_title_span);

    // Overview DIV
    var overview_div = document.createElement("DIV");
    overview_div.id = "project-detail-overview";

    var total_stems = proj_obj.stems.length;
    var total_tracks = proj_obj.tracks.length;
    var overview_span = document.createElement("SPAN");
    overview_span.id = "project-overview-link";
    var b = document.createElement("B");
    var u = document.createElement("U");
    u.appendChild(document.createTextNode("Overview"));
    b.appendChild(u);
    overview_span.onclick = function(){
        createProjectDetail(proj_obj);
        pauseAudio();
    }

    overview_span.appendChild(b);
    overview_div.appendChild(overview_span);

    if (total_stems > 0){ 
        var stem_span = document.createElement("SPAN");
        stem_span.id = "project-stem-files-link";
        stem_span.appendChild(document.createTextNode('Stem Files'));
        createProjectStemEvent(stem_span, proj_obj); //event-stem.js

        overview_div.appendChild(stem_span);
    }

    if (total_tracks > 0){
        var track_span = document.createElement("SPAN");
        track_span.appendChild(document.createTextNode('Track Files'));
        
        overview_div.appendChild(track_span);
    }

    navi_node.appendChild(previous_button_div);
    navi_node.appendChild(project_title_div);
    navi_node.appendChild(overview_div)

    return navi_node;
}

// Create project detail options DIV
// options_node, options DIV
// proj_obj, project detail object
// @return updated options_node
function createOptionsDiv(options_node, proj_obj){
    var stem_files = document.createElement("DIV");
    var stem_span = document.createElement("SPAN");
    var text;
    if (proj_obj.stems.length == 1)
        text = "(1) Stem File";
    else
        text = "(" + proj_obj.stems.length + ")" + " Stem Files";
    stem_span.appendChild(document.createTextNode(text));
    stem_files.appendChild(stem_span);

    var comments = document.createElement("DIV");
    var comments_span = document.createElement("SPAN");
    if (proj_obj.stem_comments_count == 1)
        text = "(1) Comment";
    else
        text = "(" + proj_obj.stem_comments_count + ")" + " Comments";
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

// Create information DIV
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

// Locates the parent table node
// node, the current node
// returns table node
function findTable(node){
    while (!node.id.includes('project_table')){
        node = node.parentNode;
    }
    return node;
}