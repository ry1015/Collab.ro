// Uploads a Stem
function uploadStemEvent() {
    console.log("UPLOAD STEM CLICKED");
	var url = "api/upload_stem";
    var username = current_user.user.username;
    var stemCategory = document.getElementById("stem_category");
    var selectedStemCategoryIndex = stemCategory.selectedIndex
	var selectedStemCategory = StemCategory.options[selectedStemCategoryIndex].value
	var stem_name = document.getElementById("stem_title").value
	
	var formData = new FormData();
	formData.append("username", username);
	formData.append("category", selectedStemCategory);
	formData.append("stem_name", stem_name);
	formData.append("file", formData.files[0]);

    var processStem = function(result) {
        console.log("Upload Successful");
	}	
	
	postStemRequest(url, data, processStem);
}

function postStemRequest(url, data, callback){
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