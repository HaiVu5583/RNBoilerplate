var fs = require("fs")
var vi = require("./vi.js");

fs.writeFile('./vi.json', JSON.stringify(vi, null, 4), (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
})