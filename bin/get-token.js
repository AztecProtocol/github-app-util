#!/usr/bin/env node

import "dotenv/config";
import { App } from "octokit";
import fs from "fs";
import { resolve } from "path";

const appId = process.env.GITHUB_APP_ID;
const installationId = process.env.GITHUB_INSTALLATION_ID;
const keyPath = process.env.GITHUB_PRIVATE_KEY_PATH || "./private-key.pem";

if (!appId || !installationId) {
  console.error("Missing GITHUB_APP_ID or GITHUB_INSTALLATION_ID in environment");
  process.exit(1);
}

const privateKey = fs.readFileSync(resolve(keyPath), "utf8");

const app = new App({ appId, privateKey });

// This automatically handles JWT generation and token exchange
const octokit = await app.getInstallationOctokit(installationId);

const { data } = await octokit.rest.apps.getAuthenticated();
console.log(`Authenticated as: ${data.name}`);

// Output the token for use in other tools
const auth = await octokit.auth({ type: "installation" });

if (process.stdout.isTTY) {
  console.warn("\n⚠  Token below — avoid logging this in CI or shared terminals.\n");
}
console.log(auth.token);
