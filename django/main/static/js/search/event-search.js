var SEARCH_INPUT_ID = "search_input";
var NAVIGATION_DIV_ID = "navigation-div";
var SEARCH_RESULTS_IGNORE_IDS = ["search-results-div"];
var SEARCH_RESULTS_CLASS = "search-results-class";
var SEARCH_RESULTS_IGNORE_CLASSES = [SEARCH_RESULTS_CLASS];
var _timer = 0;

// Add Event Listeners
function addSearchEventListener(){
    document.addEventListener('click', traceSearchClick, false);
}

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
    if (user_input.replace( / +/g, "" ) != ""){
        data["input"] = user_input;
        data["username"] = current_user.user.username;

        getRequest(url, data, showSearchResults);
    }
}

// Show user search results
// results, results
function showSearchResults(results){
    var parent = document.getElementById(NAVIGATION_DIV_ID);
    if (parent.children.length > 1){
        var child = document.getElementById("search-results-div");
        parent.removeChild(child);
    }

    var child = document.createElement("div");
    child.id = "search-results-div";
    var table = document.createElement("table");
    table.id = "search-resutls-table";
    var row = "";
    var cell = "";
    var div = "";
    var elem = "";
    var text = "";
    for (var i=0; i<results["exact_projects"].length; ++i){
        row = table.insertRow(table.rows.length);
        cell = row.insertCell(0)
        div = document.createElement("div");
        div.setAttribute("class", SEARCH_RESULTS_CLASS);
        text = document.createTextNode(results["exact_projects"][i]["artist"] + " - " + results["exact_projects"][i]["title"]);
        div.setAttribute("u", results["exact_projects"][i]["artist"]);
        div.setAttribute("t", results["exact_projects"][i]["title"]);
        div.appendChild(text);
        cell.appendChild(div);
    }
    child.appendChild(table);

    for (var i=0; i<results["other_projects"].length; ++i){
        row = table.insertRow(table.rows.length);
        cell = row.insertCell(0)
        div = document.createElement("div");
        elem = document.createElement("a");
        text = document.createTextNode(results["other_projects"][i]["artist"] + " - " + results["other_projects"][i]["title"]);
        elem.appendChild(text);
        div.appendChild(elem);
        cell.appendChild(div);
    }
    child.appendChild(table);
    parent.appendChild(child);
    addSearchEventListener();
}

function findSearchDivParent(node){
    var current = node;
    if (node.tagName == "HTML")
        return node;

    while (current.tagName != "DIV"){
        current = current.parentNode;
    }
    return current;
}

function traceSearchClick(){
    var parent = findSearchDivParent(event.target);
    if (!(SEARCH_RESULTS_IGNORE_IDS.includes(parent.id) || SEARCH_RESULTS_IGNORE_CLASSES.includes(parent.className))){
        parent = document.getElementById(NAVIGATION_DIV_ID);
        if (parent.children.length > 1){
            var child = document.getElementById("search-results-div");
            parent.removeChild(child);
        }
        document.removeEventListener('click', traceSearchClick, false);
    }
}