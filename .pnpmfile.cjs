function readPackage(pkg) {
	if (pkg.name === "@rspack/binding") {
		pkg.optionalDependencies = {
			"@rspack/binding-wasm32-wasi": "link:rspack-wasi-binding"
		};
	}
	if (pkg.name === "@docusaurus/faster") {
		pkg.dependencies = {
			...pkg.dependencies,
			"@rspack/core": "1.3.6"
		};
	}
	return pkg;
}

module.exports = {
	hooks: {
		readPackage
	}
};
