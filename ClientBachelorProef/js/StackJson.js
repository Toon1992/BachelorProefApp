var Stack = {
	parseJson : function(info, baseURL){
		console.log(info);
		var result = JSON.parse(info);
		

		var albums ="";

		for(i = 0; i < result.length; i++) {
       albums += '<lockup><img src="' + result[i].url + '" width="182" height="274" /><title>' + result[i].artist + '</title></lockup>';
   }

		var template = '<document><stackTemplate><banner><title>Top 10 albums</title></banner><collectionList><shelf><section>' + albums + '</section></shelf></collectionList></stackTemplate></document>';
		var parsedTemplate = Controller.makeDocument(template)

		Controller.pushDocument(parsedTemplate);
	},

	parsePrototypeJson : function(info, baseURL){
		var results = JSON.parse(info);
   		let parsedTemplate = templateDocument();
    	Controller.pushDocument(parsedTemplate);
 
    	let shelf = parsedTemplate.getElementsByTagName("shelf").item(0);
    	let section = shelf.getElementsByTagName("section").item(0);
 
    	section.dataItem = new DataItem();
   
    	let newItems = results.map((result) => {
        	let objectItem = new DataItem(result.albumId, result.id);
        	objectItem.url = result.thumbnailUrl;
        	objectItem.title = result.title;
        	return objectItem;
    	});
 
    	section.dataItem.setPropertyPath("images", newItems);
	},
}

function templateDocument() {
    let template = `<?xml version="1.0" encoding="UTF-8" ?>
                    <document>
                        <stackTemplate>
                            <banner>
                                <title>JSON Shelf</title>
                            </banner>
                            <collectionList>
                                <shelf>
                                    <prototypes>
                                        <lockup prototype="1">
                                            <img binding="@src:{thumbnailUrl};" width="200" height="300"/>
                                            <title binding="textContent:{title};" />
                                        </lockup>
                                    </prototypes>
                                    <section binding="items:{images};" />
                                </shelf>
                            </collectionList>
                        </stackTemplate>
                    </document>`;
    return Controller.makeDocument(template);
}