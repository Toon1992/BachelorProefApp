var baseURL;
var currentDocument;
var menuBarController;

App.onLaunch = function(options){
	baseURL = options.BASEURL;

	loadingApp("template/MainMenu.xml");
}

function getDocument(url){
	var templateXHR = new XMLHttpRequest();
  var finalUrl = baseURL + url;

	templateXHR.responseType = "document";
	templateXHR.addEventListener("load", function(){
		Controller.pushDocument(templateXHR.responseXML);
	}, false);
	templateXHR.open("GET", finalUrl,true);
	templateXHR.send();

  return templateXHR;
}

function getJSONDocument(url){
  var templateXHR = new XMLHttpRequest();
  var finalUrl = baseURL + url;

  templateXHR.responseType = "document";
  templateXHR.addEventListener("load", function(){
    Stack.parseJson(templateXHR.responseText, baseURL);}, false);
  templateXHR.open("GET", finalUrl,true);
  templateXHR.send();

  return templateXHR;
}


function loadingApp(url){
 var javascriptFiles = [
    baseURL + "js/Controller.js",
    baseURL + "js/StackJson.js",
    baseURL + "js/MenuBar.js"
  ];

evaluateScripts(javascriptFiles, function(success) {

    if(success) {
      menuBarController = new MenuBar(baseURL);
      createMainMenu();
		}
		else {
			 var errorDoc = createAlert("Evaluate Scripts Error", "Error attempting to evaluate external JavaScript files.");
      		navigationDocument.presentModal(errorDoc);
		}
	});
}

function createMainMenu(){
  var main = `<document>
  <alertTemplate>
    <title>Bachelor proef applicatie</title>
    <button>
      <text>Albums</text>
    </button>
    <button>
      <text>MenuBar</text>
    </button>
  </alertTemplate>
</document>`

  var doc = Controller.makeDocument(main);
  Controller.pushDocument(doc);

  addEventListenerToButton(doc);

  return doc;
}

function addEventListenerToButton(doc){
  var buttonElements = doc.getElementsByTagName("button");
  var buttonStack = buttonElements.item(0);
  var buttonMenuBar = buttonElements.item(1);

  buttonStack.addEventListener("select", function(){ getJSONDocument("json/Albums.json")}, false);
  buttonMenuBar.addEventListener("select", function(){ 
    menuBarDoc = baseURL + "template/MenuBar.xml";
    menuBarController.loadAndPushDocument(menuBarDoc);
  }, false);
}

var createAlert = function(title , description){
  var alertString = `<?xml version="1.0" encoding="UTF-8" ?>
  	<document>
  		<alertTemplate>
  			<title>${title}</title>
  			<description>${description}</description>
  			<button>
  				<text>OK</text>
  			</button>
  		</alertTemplate>
  	</document>`

    var parser = new DOMParser();
    var alertDoc = parser.parseFromString(alertString, "application/xml");
    return alertDoc
   }