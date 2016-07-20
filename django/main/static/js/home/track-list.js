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
    track_list_div = TRACK_LIST_DIV_ID;

    var track_list_table = document.createElement("table");
    track_list_table.id = TRACK_LIST_TABLE_ID;

    track_list_div.appendChild(track_list_table);
    parent_node.appendChild(track_list_div);
}