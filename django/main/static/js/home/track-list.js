var TRACK_LIST_DIV_ID = "track-list-div";

function createTrackList(parent_node){
    console.log("CREATING TRACK LIST");
    var track_list_div = document.createElement("div");
    track_list_div.id = TRACK_LIST_DIV_ID;
    getTracks(username, parent_node);
    parent_node.appendChild(track_list_div);
}