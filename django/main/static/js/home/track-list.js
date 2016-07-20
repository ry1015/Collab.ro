var TRACK_LIST_DIV_ID = "track-list-div";
var TRACK_LIST_TABLE_ID = "track-list-table";

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
        
        var track = "<audio controls>";
        track += "<source src=media/" + track_list[filename] + " type=audio/mpeg>";
        track += "</audio>";
        var cell = row.insertCell(0);
        cell.innerHTML = track;
    }

    track_list_div.appendChild(track_list_table);
    parent_node.insertBefore(track_list_div, parent_node.firstChild);
    var audio = document.getElementsByTagName("audio");
    for (var i of audio){
        i.addEventListener('play', pauseOther, false);
    }
}

function pauseOther(){
    var audio = document.getElementsByTagName("audio");
    for (var i of audio){
        if (i != this)
            i.pause();
    }
}