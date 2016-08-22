// Uploads a Track
function uploadTrackEvent() {
    console.log("UPLOAD TRACK CLICKED");
    var url = "api/upload_track";
    var username = current_user.user.username;
    var trackGenre = document.getElementById("track_genre");
    var selectedTrackGenreIndex = trackGenre.selectedIndex
    var selectedTrackGenre = TrackGenre.options[selectedTrackGenreIndex].value
    var track_name = document.getElementById("track_title").value
    var filename = document.getElementById("track_upload")
    
    var formData = new FormData();
    formData.append("username", username);
    formData.append("genre", selectedTrackGenre);
    formData.append("track_name", track_name);
    formData.append("filename", filename.files[0]);

    var processTrack = function(result) {
        console.log(result);
    }   
    
    postTrackRequest(url, formData, processTrack);
}

function postTrackRequest(url, data, callback){
   $.ajax({
       type: "POST",
       url: url,
       data: data,
       dataType: 'json',
       processData: false, // important
       contentType: false, // important
       success : function (result){
           callback(result);
       },
       error : function(result){
           failCallback(result);
       }
   });
}