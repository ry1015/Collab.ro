var TRACK_LIST_DIV_ID = "track-list-div";
var TRACK_LIST_TABLE_ID = "track-list-table";
var COMMENT_CLASS = "track-comment";

function pauseEventListener(){
    var audio_list = document.getElementsByTagName("audio");
    for (var i of audio_list){
        i.addEventListener('play', pauseOther, false);
    }
}

function commentsEventListener(){
    var track_comments = document.getElementsByClassName("track-comment");
    for (var i of track_comments){
        console.log(i.parentNode.previousSibling.childNodes[0].src);
    }
}

function createTrackList(parent_node){
    console.log("CREATING TRACK LIST");
    var track_list_div = document.createElement("div");
    track_list_div.id = TRACK_LIST_DIV_ID;
    getUserTracks(parent_node); //event-track-list.js
}

function createUserTrackList(parent_node){
    var track_list_div = document.createElement("div");
    track_list_div.id = TRACK_LIST_DIV_ID;

    var track_list_table = document.createElement("table");
    track_list_table.id = TRACK_LIST_TABLE_ID;

    var track_list = current_user.tracks.sort();

    for (filename in track_list){
        var row = track_list_table.insertRow(track_list_table.rows.length);
        var track = new Audio("media/" + track_list[filename]);
        track.controls = true;


        var cell = row.insertCell(0);
        cell.appendChild(track);

        var comment = document.createElement("img");
        comment.setAttribute("class", COMMENT_CLASS);
        comment.src = "media/comment.ico";
        cell = row.insertCell(1);
        cell.appendChild(comment);
    }

    track_list_div.appendChild(track_list_table);
    parent_node.insertBefore(track_list_div, parent_node.firstChild);
    pauseEventListener();
    commentsEventListener();
}

function pauseOther(){
    var audio = document.getElementsByTagName("audio");
    for (var i of audio){
        if (i != this)
            i.pause();
    }
}