function readPackage(pkg) {
	if (pkg.name === "@rspack/binding") {
		pkg.optionalDependencies = {
			"@rspack/binding-wasm32-wasi": "link:rspack-wasi-binding"
		};
	}
	return pkg;
}

module.exports = {
	hooks: {
		readPackage
	}
};
