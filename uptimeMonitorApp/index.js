/** @format */
// Dependencies
const http = require("http");
const url = require("url");

// The server should respond to all requests with a string
const server = http.createServer(function (req, res) {
	// Get the url and parse it, true to call query module itself
	const parsedUrl = url.parse(req.url, true);

	// Get the path
	const path = parsedUrl.pathname;
	const trimmedPath = path.replace(/^\/+|\/+$/g, "");

	// Get the HTTP method
	const method = req.method.toLowerCase();

	// Get the query string as an object
	const queryStringObject = parsedUrl.query;

	// Get the headers as an object
	const headers = req.headers;

	console.log(headers);

	// Send the response
	res.end("Hello");
});

// Start the server and have it listen on port 3000
server.listen(3000, function () {
	console.log("The server is listening");
});
