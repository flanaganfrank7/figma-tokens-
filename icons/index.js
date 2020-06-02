var myHeaders = new Headers();
	var result = {}
	myHeaders.append("X-Figma-Token", "36981-c06004e8-3127-443a-9964-dda94f5fba4b");
	var svgArray = []

	var requestOptions = {
	  method: 'GET',
	  headers: myHeaders,
	  redirect: 'follow'
	};


	fetch("https://api.figma.com/v1/files/MpzengDOK6WT1i29pi7UVx/nodes?ids=169%3A2", requestOptions)
	  .then(response => response.text())
	  .then(result => parseIcons(result))
	  .catch(error => console.log('error', error));



	function parseIcons(result){
		var parsed = JSON.parse(result)
		var children = parsed.nodes
        console.log(children)
		// need to create a bunch of urls here - 1 for each icon
		// let url = "https://api.figma.com/v1/images/MpzengDOK6WT1i29pi7UVx/?ids=169%3A8&format=png"
        let encodedId = encodeURI("170:0")
        let url = `https://api.figma.com/v1/images/MpzengDOK6WT1i29pi7UVx/?ids=${encodedId}&format=png`
		getIcon(url)
	}

	function getIcon(url){
	 	fetch(url, requestOptions)
		  .then(response => response.text())
		  // .then(result => console.log(result))
		  .then(result => storeIcons(result))
		  .catch(error => console.log('error', error));
	 }


	 function storeIcons(result){
	 	console.log(result)
	 	var parsed = JSON.parse(result)
	 	var svgSource = (parsed.images["170:0"])
	 	svgArray.unshift(svgSource)
	 	renderIcons()	
	 }

	 function renderIcons(){
	 	for(let s = 0; s<svgArray.length; s++){
	 		var icon = document.createElement("Img")
            var iconBlock = document.createElement("Div")
            var iconBlockParent = document.createElement("Div")

            iconBlock.className = "icons-block"
            iconBlockParent.className = "icons-block-parent"

	 		icon.src=svgArray[s]

	 		var container = document.getElementById("parent-icons")
            var placeholderContainer = document.getElementById("parent-icons-placeholder")

            iconBlock.append(icon)
            iconBlockParent.append(iconBlock)
	 		container.append(iconBlockParent)
            container.style.visibility = "visible"
            placeholderContainer.style.visibility = "hidden"
	 	}
	 }