var myHeaders = new Headers();
myHeaders.append("X-Figma-Token", "36981-c06004e8-3127-443a-9964-dda94f5fba4b");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

var data;
var colors = []
var type = []
var cdiv = parent.document.createElement("div")
var containerColor = document.getElementById("parent-color")



function createColors(){
	for(var b=0; b<colors.length; b++){
		var cdiv = document.createElement("div")
		cdiv.className = "colors-block-parent"
		var cdetails = document.createElement("div")
		cdetails.className = "colors-block-details"
		var cName = document.createElement("P")
		var cValue = document.createElement("P")

		// cdiv.className = "colorRow";

		cdiv.style.borderRadius = "15px";
		cdiv.style.display = "inline-block";
		cdiv.style.padding = "0";
		var rgb = "rgb(" + colors[b][0]*255 + "," + colors[b][1]*255 + "," + colors[b][2]*255 + ")"
		cdiv.style.background = rgb;
		
		cName.innerHTML = colors[b][3]
		cValue.innerHTML = "R: " + Math.floor(colors[b][0]*255) + " G: " + Math.floor(colors[b][1]*255) + " B: " + Math.floor(colors[b][2]*255)


		cdetails.style.background = "#fff"
		cdetails.append(cName)
		cdetails.append(cValue)
		cdiv.append(cdetails)
		containerColor.appendChild(cdiv)
	}
}


function displayColorData(result){
	
	var data = JSON.parse(result).nodes
	var current = data["0:1"].document.children[0].children
	console.log(current)
	
	
	for(var i=0; i < current.length; i++){
		let childR = current[i].fills[0].color.r
		let childG = current[i].fills[0].color.g
		let childB = current[i].fills[0].color.b
		let colorName = current[i].name
		colors.unshift([childR, childG, childB, colorName])

	}

	createColors()
}





fetch("https://api.figma.com/v1/files/MpzengDOK6WT1i29pi7UVx/nodes?ids=0%3A1", requestOptions)
  .then(response => response.text())
  .then(result => displayColorData(result))
  .catch(error => console.log('error', error));



