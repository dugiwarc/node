/** @format */

// Create and export configuration variables

// Container for all the environments
const environments = {};

// Staging (default) environment
environments.staging = {
	httpPort: 3000,
	httpsPort: 3001,
	envName: "staging",
};

// Production
environments.production = {
	httpPort: 5000,
	httpsPort: 5001,
	envName: "production",
};

// Determine which environment was passed as a command-line
const currentEnvironment =
	typeof process.env.NODE_ENV == "string"
		? process.env.NODE_ENV.toLowerCase()
		: "";

// Check that the current environment is one of the environments above, if not, default to staging
const environmentToExport =
	typeof environments[currentEnvironment] == "object"
		? environments[currentEnvironment]
		: environments.staging;

// Export the modules
export default environmentToExport;
