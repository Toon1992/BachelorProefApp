var Controller = {
	makeDocument: function(resource){
		if(!Controller.parser){
			Controller.parser = new DOMParser();
		}

		var doc = Controller.parser.parseFromString(resource, "application/xml");
		return doc;
	},

	modalDialogPresenter: function(xml){
		navigationDocument.presentModal(xml);
	},

	pushDocument: function(xml){
		navigationDocument.pushDocument(xml);
	},

	popDocuemt:function(){
		navigationDocument.popDocuemt();
	}/*,

	addEventToMainButton: function(event){
		var self = this,
			ele = event.target,
			aa
	}*/
}