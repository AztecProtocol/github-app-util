if (process.argv.includes("--help") || process.argv.includes("-h")) {
  console.log(`Usage: gh-app check-token

Show the current installation token's validity and expiry time.

Options:
  -h, --help    Show this help message`);
  process.exit(0);
}

import { getInstallationAuth } from "../lib/auth.js";

const { octokit, token, expiresAt } = await getInstallationAuth();

const { data: app } = await octokit.rest.apps.getAuthenticated();
console.log(`App:            ${app.name}`);

const expires = new Date(expiresAt);
const now = new Date();
const minutesLeft = Math.round((expires - now) / 60000);

console.log(`Token prefix:   ${token.slice(0, 8)}...`);
console.log(`Expires at:     ${expires.toISOString()}`);

if (minutesLeft > 0) {
  console.log(`Status:         valid (${minutesLeft} min remaining)`);
} else {
  console.log(`Status:         expired`);
}
