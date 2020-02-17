const { execSync } = require("child_process");

function run(cmd, envAppend = {}) {
	return String(
		execSync(cmd, {
			encoding: "utf8",
			env: Object.assign(process.env, envAppend),
		}),
	).trim();
}

function main() {
	if (process.env.INPUT_SKIP_INSTALL) {
		console.log("Skipping install");
	} else {
		run("go get mvdan.cc/sh/v3/cmd/shfmt", { GO111MODULE: "on" });
	}
	console.log("Running shfmt");
	run(`shfmt ${process.env.INPUT_SHFMT_ARGS}`, {
		PATH: `${run("go env GOPATH")}/bin:${process.env.PATH}`,
	});
}

main();
