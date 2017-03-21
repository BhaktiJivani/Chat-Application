//1.basic hello wolrd in node.js
//use this link for basic https://nodejs.org/en/about/
//Define variable http
//varible is constant
//require contain module and files
//
//const http = require('http');
//
//create constant variable for hostname and port number
//const hostname = '127.0.0.1';
//const port = 1337;
//
//use http module 
//createserver method with request and response parameter
//
//http.createServer((req, res) => {
//  res.writeHead(200, { 'Content-Type': 'text/plain' });
//  res.end('Hello World\n');
//}).listen(port, hostname, () => {
//  console.log(`Server running at http://${hostname}:${port}/`);
//});

//create modules
const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const mimeTypes = {
	"html": "text/html",
	"jpeg": "image/jpeg",
	"jpg": "image/jpg",
	"png": "image/png",
	"js": "text/javascript",
	"css": "text/css"
};

//use create function and pass request and response
http.createServer(function(req, res){
    //use uri variable for pathname
	var uri = url.parse(req.url).pathname;
    //forfile name use path module with join and process and unescape methods
	var fileName = path.join(process.cwd(), unescape(uri));
	console.log('Loading '+ uri);
	var stats;

    //use try cath block 
	try{
        //take stats and use latatsync and pass filename
		stats = fs.lstatSync(fileName);
	} catch(e){
        
        //it give error
		res.writeHead(404, {'Content-type': 'text/plain'});
		res.write('404 Not Found\n');
		res.end();
		return;
	}
//if it is file 
	if(stats.isFile()){
        //mimetype is array which take path.filename and split(getting extension of the file) with dote in index of 0.
        
		var mimeType = mimeTypes[path.extname(fileName).split(".").reverse()[0]];
        //it will take stats 200 and content type value is mimetype
		res.writeHead(200, {'Content-type': mimeType});
        
        //it tell file stream module tp create readstream and passfile name.
        
		var fileStream = fs.createReadStream(fileName);
		fileStream.pipe(res);
	}
    //if it is directory then go inside directory
    else if(stats.isDirectory()) {
        //pass stats 302 and rediredt it to location -idex.html
        //if directory then load index.html file.
		res.writeHead(302, {
			'Location': 'index.html'
		});
		res.end();
	}
    //if it is not file and directory tehn use this data
    else {
        //stats 500 and internal error message display.
		res.writeHead(500, {'Content-type':'text/plain'});
		res.write('500 Internal Error\n');
		res.end();
	}

}).listen(1337);//listen port 1337