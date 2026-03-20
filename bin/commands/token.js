if (process.argv.includes("--help") || process.argv.includes("-h")) {
  console.log(`Usage: gh-app token

Generate a GitHub App installation token.

Options:
  -h, --help    Show this help message

Environment variables:
  GITHUB_APP_ID              GitHub App ID (required)
  GITHUB_INSTALLATION_ID     Installation ID (required)
  GITHUB_PRIVATE_KEY_PATH    Path to private key (default: ./private-key.pem)`);
  process.exit(0);
}

import { getInstallationAuth } from "../lib/auth.js";

const { token } = await getInstallationAuth();

if (!token) {
  console.error("Failed to obtain installation token");
  process.exit(1);
}

if (process.stdout.isTTY) {
  console.warn("\n⚠  Token below — avoid logging this in CI or shared terminals.\n");
}
console.log(token);
