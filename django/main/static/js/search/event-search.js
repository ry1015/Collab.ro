var SEARCH_INPUT_ID = "search_input";
var NAVIGATION_DIV_ID = "navigation-div";
var _timer = 0;

// Look up user search input and add a delay after each keyup
function lookUpInput(){
    var user_input = document.getElementById(SEARCH_INPUT_ID).value;

    var delayedCall = function(user_input){
        if (_timer)
            window.clearTimeout(_timer);

        _timer = window.setTimeout(function(){
            processInput(user_input);
        }, 1000);
    };
    if (user_input != "")
        delayedCall(user_input);
}

// Process the user search input
// user_input, user input
function processInput(user_input){
    var data = {};
    var url = "api/get-search-results";
    data["input"] = user_input;

    getRequest(url, data, showSearchResults);
}

// Show user search results
// results, results
function showSearchResults(results){
    console.log(results);
}