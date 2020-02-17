const { execSync } = require("child_process");

function run(cmd, envVars) {
	return execSync(cmd, { encoding: "utf8", stdio: "inherit", env: envVars });
}

function main() {
	if (process.env.INPUT_SKIP_INSTALL) {
		console.log("Skipping install");
	} else {
		run("go get mvdan.cc/sh/v3/cmd/shfmt", {
			GO111MODULE: "on",
			GOCACHE: "/tmp",
			GOPATH: process.env.HOME,
		});
	}
	console.log("Running shfmt");
	run(`shfmt ${process.env.INPUT_SHFMT_ARGS}`);
}

main();
