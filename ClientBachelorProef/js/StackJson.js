var Stack = {
    readAlbums : [],
    albums : "",
	parseJson : function(info, baseURL){
		var result = JSON.parse(info);
		
		for(i = 0; i < result.length; i++) {
       this.albums += '<lockup itemID="' + result[i].id + '"><img src="' + result[i].url + '" width="182" height="274" /><title>' + result[i].artist + '</title></lockup>';

       var album = {id:result[i].id, artist:result[i].artist, url:result[i].url,title:result[i].title};
       this.readAlbums.push(album);
   }

		var template = '<document><stackTemplate><banner><title>Top 10 albums</title></banner><collectionList><shelf><section>' + this.albums + '</section></shelf></collectionList></stackTemplate></document>';
        var parsedTemplate = Controller.makeDocument(template);
		Controller.pushDocument(parsedTemplate);
        addEvent(parsedTemplate);
	}
}

function addEvent(parsedTemplate){
    var list = parsedTemplate.getElementsByTagName("collectionList").item(0).getElementsByTagName("section").item(0).getElementsByTagName("lockup");

    for(i = 0; i < Stack.readAlbums.length; i++){
        list.item(i).addEventListener("select", function(event){
                 console.log("Ik kom hier voorbij");
        var selectedElement = event.target;

        var id = selectedElement.getAttribute("itemID");
        console.log(id);
        if(!id){
            return;
        }

        createProduct(Stack.readAlbums[id-1]);
        }, false);
    }
}

https://www.clker.com/cliparts/T/O/2/h/I/8/return-button.svg

function createProduct(album){
    console.log(album);
    let template = '<document><productTemplate><banner><stack><title>' + album.title + '</title><description> Made by: ' + album.artist + '</description><row><buttonLockup><badge src="http://www.freeiconspng.com/uploads/undo-back-return-button-png-3.png"/></buttonLockup></row></stack><heroImg src="' + album.url + '"/></banner><shelf><header><title>Top 10 Albums</title></header><section>' + Stack.albums + '</section></shelf></productTemplate></document>';
    console.log(template);

    var temp = Controller.makeDocument(template);
    Controller.pushDocument(temp);
}
