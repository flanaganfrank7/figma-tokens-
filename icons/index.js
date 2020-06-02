var myHeaders = new Headers();
	var result = {}
	myHeaders.append("X-Figma-Token", "36981-c06004e8-3127-443a-9964-dda94f5fba4b");
	
var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

var iconDetails = []
var svgArray = []

// Step 1
// Make the initial call the files endpoint 
fetch("https://api.figma.com/v1/files/MpzengDOK6WT1i29pi7UVx/nodes?ids=169%3A2", requestOptions)
    .then(response => response.text())
    .then(result => parseIcons(result))
    .catch(error => console.log('error', error));

// Step 2
// Here we start to parse through the initial call
function parseIcons(result){
    var parsed = JSON.parse(result)
    var children = parsed.nodes
    var drill = children["169:2"].document.children[0].children
    


    // HERE HERE

    // Need to store both the image url + the name + the svg url


    // Get a url for each item in drill
    for (let i = 0; i < drill.length; i++){
        let rawID = drill[i].id
        let iconName = drill[i].name
        let encodedId = encodeURI(rawID)    
        let pngUrl = `https://api.figma.com/v1/images/MpzengDOK6WT1i29pi7UVx/?ids=${encodedId}&format=png`
        let svgUrl = `https://api.figma.com/v1/images/MpzengDOK6WT1i29pi7UVx/?ids=${encodedId}&format=svg`
        let iconObject = {"name": iconName, "png": pngUrl, "svg": svgUrl}
        iconDetails.unshift(iconObject)
    }
    // console.log(iconDetails)
    getIcon()
}

// Step 3
// Here we make a call to the images endpoint to get the icon
function getIcon(){
    for (let i = 0; i < iconDetails.length; i++){
        let url = iconDetails[i].svg
        
        fetch(url, requestOptions,svgArray)
            .then(response => response.text())
            .then(result => Object.entries(JSON.parse(result).images))
            .then(entries => entries[0][1])
            .then(assetUrl => ({"name": iconDetails[i].name, "path": assetUrl}))
            .then(finalObject => renderIcons(finalObject.name, finalObject.path))
            .catch(error => console.log('error', error));
        
    }
    console.log('here')

    }


// Step 5
//  Here we loop through the array of stored icons and render them to the page 
function renderIcons(name, path){
    
    // for(let s = 0; s<svgArray.length; s++){
        
        var icon = document.createElement("Img")
        var iconBlock = document.createElement("Div")
        var iconBlockParent = document.createElement("Div")

        iconBlock.className = "icons-block"
        iconBlockParent.className = "icons-block-parent"

        icon.src=path

        var container = document.getElementById("parent-icons")
        var placeholderContainer = document.getElementById("parent-icons-placeholder")

        iconBlock.append(icon)
        iconBlockParent.append(iconBlock)
        container.append(iconBlockParent)
        container.style.visibility = "visible"
        placeholderContainer.style.visibility = "hidden"
    
    }