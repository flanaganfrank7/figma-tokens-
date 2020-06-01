var myHeaders = new Headers();
myHeaders.append("X-Figma-Token", "36981-c06004e8-3127-443a-9964-dda94f5fba4b");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

var data;
var type = []
var cdiv = parent.document.createElement("div")
var containerType = document.getElementById("parent-type")




function createType(){
	
	for(var d=0; d<type.length; d++){

		var typeBlock = document.createElement("Div")
		typeBlock.className = "typeBlock"

		var tp = document.createElement("P")
		tp.style.fontFamily = type[d][0];
		tp.style.fontSize = type[d][1] + "px";
		tp.style.fontWeight = type[d][2];
		tp.style.display = "block";
		tp.style.lineHeight = type[d][3] + "px";
		tp.style.letterSpacing = type[d][4];
		tp.style.marginLeft = "48px";
		tp.innerHTML = "The quick brown fox jumped over the lazy dog."
		typeBlock.appendChild(tp)


		// Details
		var tpDetailsContainer = document.createElement("Div")
		tpDetailsContainer.className = "typeDetails"

		var tpDetailsFamily = document.createElement("P")
		tpDetailsFamily.innerHTML = "Font Family: " + type[d][0]
		tpDetailsContainer.appendChild(tpDetailsFamily)

		var tpDetailsSize = document.createElement("P")
		tpDetailsSize.innerHTML = "Font Size: " + type[d][1] + "px"
		tpDetailsContainer.appendChild(tpDetailsSize)

		var tpDetailsWeight = document.createElement("P")
		tpDetailsWeight.innerHTML = "Font Weight: " + type[d][2]
		tpDetailsContainer.appendChild(tpDetailsWeight)

		typeBlock.append(tpDetailsContainer)

		containerType.append(typeBlock)

	}
	console.log('hi')
}

function displayTypeData(result){
	
	var data = JSON.parse(result).nodes
	var typography = data["0:1"].document.children[1].children
	console.log(data)

	for (var c=0; c < typography.length; c++){
		var font = typography[c].style.fontFamily
		var fontSize = typography[c].style.fontSize
		var weight = typography[c].style.fontWeight
		var lineHeight = typography[c].style.lineHeightPx
		var letterSpacing = typography[c].style.letterSpacing
		type.unshift([font, fontSize, weight, lineHeight,letterSpacing])

	}

	
	createType()
}


fetch("https://api.figma.com/v1/files/MpzengDOK6WT1i29pi7UVx/nodes?ids=0%3A1", requestOptions)
  .then(response => response.text())
  .then(result => displayTypeData(result))
  .catch(error => console.log('error', error));



