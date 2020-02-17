const { execSync } = require("child_process");

function run(cmd, env_vars){
  return execSync(cmd, { encoding: "utf8", stdio: "inherit", env: env_vars });
}

function main() {
  if (process.env.INPUT_SKIP_INSTALL) {
    console.log("Skipping install");
  } else {
    run("go get mvdan.cc/sh/v3/cmd/shfmt", {"GO111MODULE": "on"});
  }
  console.log("Running shfmt");
  run(`shfmt ${process.env.INPUT_SHFMT_ARGS}`);
}

main();
