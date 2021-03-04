/** @format */
// Dependencies
const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;

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

	// Get the payload if any
	const decoder = new StringDecoder("utf-8");
	let buffer = "";

	req.on("data", function (data) {
		buffer += decoder.write(data);
	});

	req.on("end", function () {
		buffer += decoder.end();
		// Choose the handler this request should go to. If not found use the not found handler
		const chosenHandler =
			typeof router[trimmedPath] !== "undefined"
				? router[trimmedPath]
				: handlers.notFound;

		// Construct the data object to send to the handler
		const data = {
			trimmedPath,
			queryStringObject,
			method,
			payload: buffer,
		};

		// Route the request to the handler specified in the router
		chosenHandler(data, function (statusCode, payload) {
			// Use the status code called back by the handler or default to 200
			statusCode = typeof statusCode == "number" ? statusCode : 200;

			// Use the payload called back by the handler or default to an empty object
			payload = typeof payload == "object" ? payload : {};

			// Convert payload to a string
			const payloadString = JSON.stringify(payload);

			// Return the response
			res.writeHead(statusCode);
			res.end(payloadString);

			// Log the requested path
			console.log("Returning this response", statusCode, payloadString);
		});
	});
});

// Start the server and have it listen on port 3000
server.listen(3000, function () {
	console.log("The server is listening");
});

// Define the handlers
var handlers = {};

// Sample handler
handlers.sample = function (data, callback) {
	// Callback a http status code nad a payload object
	callback(406, { name: "sample handler" });
};

// 404 handler
handlers.notFound = function (data, callback) {
	callback(404);
};

// Define a request router
var router = {
	sample: handlers.sample,
};
