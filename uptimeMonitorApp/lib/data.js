// Library for storing and editing data
// Dependencies
import fs from "fs";
import path from "path";

// Container for the module
const lib = {};

// Base directory of the data folder
lib.baseDir = path.join(process.cwd(), ".data/");

// Write data to a file
lib.create = function (dir, file, data, callback) {
	// Open the file for writing
	fs.open(
		lib.baseDir + dir + "/" + file + ".json",
		"wx",
		function (err, fileDescriptor) {
			if (!err && fileDescriptor) {
				// Convert data to string
				const stringData = JSON.stringify(data);

				// Write to file and close it
				fs.writeFile(fileDescriptor, stringData, function (err) {
					if (!err) {
						fs.close(fileDescriptor, function (err) {
							if (!err) {
								callback(false);
							} else {
								callback("Error closing new file");
							}
						});
					} else {
						callback("Error writing to new file");
					}
				});
			} else {
				callback("Could not create new file. It may already exist");
			}
		},
	);
};

// Read data from a file
lib.read = async function (dir, file, callback) {
	await fs.readFile(
		lib.baseDir + dir + "/" + file + ".json",
		"utf8",
		callback,
	);
};

lib.update = async function (dir, file, data, callback) {
	const filePath = lib.baseDir + dir + "/" + file + ".json";
	try {
		// Open the file for writing
		const fileData = fs.readFileSync(filePath, "utf-8");

		const fileDataJSON = await JSON.parse(fileData);

		const newObject = { ...fileDataJSON, ...data };

		const stringData = JSON.stringify(newObject);

		const stream = fs.createWriteStream(filePath, { flags: "w" });
		stream.write(`${stringData} \n`);
		stream.end();
	} catch (error) {
		console.log(error);
	}
};

lib.delete = async function (dir, file) {
	const filePath = lib.baseDir + dir + "/" + file + ".json";

	try {
		console.log(lib.baseDir + dir);
		let files = fs.readdirSync(lib.baseDir + dir);
		console.log(files);
		await fs.unlinkSync(filePath);
		console.log("Done");

		files.forEach((file) => {
			console.log(file);
		});
	} catch (error) {
		console.log(error);
	}
};

// Export it
export default lib;
