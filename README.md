

# Built with Figma 2 

This site uses the Figma API to create a small library of design tokens and assets. It is the second iteration of this project. Here is the first: https://built-with-figma.netlify.app/ 

Typography and Colors Steps: 
- Use the /files endpoint to look at the nodes of a page in a file 
- Create elements for each node, and style them appropriately

Icons Steps: 
- Use the /files endpoint to look at the nodes on a frame on a page in a file 
- Grab the ID of each icon, convert to URL encoded value 
- Make a call to the /images endpoint with the following params: 
    - File ID
    - Node ID (URI)
    - Format (SVG, PNG, JPG)
- Create elements for each url 

Current issues: 
- Making too many API calls at once
- Receiving 429 errors on Iconography page, due to too many requests 
- No code exports / copying
- Lots of crossed wires between JS styling and CSS 

Future Improvements: 
- Rewrite in React
- Export icons as react components
- Export design tokens (color, type) as js variables 
- Add support for grids 
- Find ways to make it faster 
- Quickstart documentation for people that want to clone