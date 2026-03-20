import "dotenv/config";
import { App } from "octokit";
import fs from "fs";
import { resolve } from "path";

export async function getInstallationAuth() {
  const appId = process.env.GITHUB_APP_ID;
  const installationId = process.env.GITHUB_INSTALLATION_ID;
  const keyPath = process.env.GITHUB_PRIVATE_KEY_PATH || "./private-key.pem";

  if (!appId || !installationId) {
    console.error(
      "Missing GITHUB_APP_ID or GITHUB_INSTALLATION_ID in environment"
    );
    process.exit(1);
  }

  const privateKey = fs.readFileSync(resolve(keyPath), "utf8");
  const app = new App({ appId, privateKey });
  const octokit = await app.getInstallationOctokit(installationId);
  const auth = await octokit.auth({ type: "installation" });

  return { octokit, token: auth.token, expiresAt: auth.expiresAt };
}
