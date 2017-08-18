var BASEURL;

function MenuBar(baseurl){
	BASEURL = baseurl;
}

MenuBar.prototype.loadAndPushDocument = function(url){
		var request =new XMLHttpRequest();
		request.open("GET", url, true);

		request.onreadystatechange = function(){
			if(request.readyState != 4){
				return;
			}

			if(request.status == 200){
				var document = request.responseXML;
				document.addEventListener("select", handleSelectEvent);
				Controller.pushDocument(document);
			} else{
				navigationDocument.popDocument();
				var alertDocument = alertTemplate();
				navigationDocument.modalDialogPresenter(alertDocument);
			}
		};
	request.send();
}

function updateItem(item, url){
	var request = new XMLHttpRequest();
	request.open("GET", url, true);

	request.onreadystatechange = function(){
		if(request.status == 200){
			var document = request.responseXML;
			document.addEventListener("select", handleSelectEvent);
			var menuItemDocument = item.parentNode.getFeature("MenuBarDocument");
			menuItemDocument.setDocument(document,item)
		}
	};

	request.send();
}

function handleSelectEvent(event){
	var selectedElement = event.target;

	var targetURL = selectedElement.getAttribute("selectTargetURL");
	if(!targetURL){
		return;
	}

	targetURL = BASEURL + targetURL;

	if(selectedElement.tagName == "menuItem"){
		updateItem(selectedElement,targetURL);
	} else{
		loadAndPushDocument(targetURL);
	}
}

MenuBar.prototype.alertTemplate = function() {
    var alertDoc = "<document><alertTemplate><title>Error</title><description>Page failed to load</description></alertTemplate></document>";
    return Controller.makeDocument(alertDoc);
}




