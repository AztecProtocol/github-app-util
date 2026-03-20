#!/usr/bin/env node

const command = process.argv[2];

const commands = {
  token: "./commands/token.js",
  pull: "./commands/pull.js",
  clone: "./commands/clone.js",
  "check-token": "./commands/check-token.js",
  "list-repos": "./commands/list-repos.js",
};

const help = `Usage: gh-app <command> [options]

Commands:
  token          Generate an installation token
  pull           Pull a repo using a fresh token
  clone          Clone a repo using a fresh token
  check-token    Show token validity and expiry
  list-repos     List accessible repositories

Options:
  -h, --help     Show this help message

Run gh-app <command> --help for command-specific help.`;

if (!command || command === "--help" || command === "-h") {
  console.log(help);
  process.exit(0);
}

if (!commands[command]) {
  console.error(`Unknown command: ${command}\n`);
  console.log(help);
  process.exit(1);
}

// Shift argv so subcommands see their own args starting at index 2
process.argv = [process.argv[0], process.argv[1], ...process.argv.slice(3)];

await import(commands[command]);
