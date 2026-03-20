if (process.argv.includes("--help") || process.argv.includes("-h")) {
  console.log(`Usage: gh-app pull <owner/repo> [branch]

Pull latest changes using a fresh GitHub App installation token.
If a branch is specified, only that branch is pulled.

Options:
  -h, --help    Show this help message

Examples:
  gh-app pull myorg/myrepo
  gh-app pull myorg/myrepo feature-branch`);
  process.exit(0);
}

import { execSync } from "child_process";
import { getInstallationAuth } from "../lib/auth.js";

const [repoSlug, branch] = process.argv.slice(2);

if (!repoSlug) {
  console.error("Usage: gh-app pull <owner/repo> [branch]");
  console.error("Run gh-app pull --help for more information.");
  process.exit(1);
}

const { token } = await getInstallationAuth();
const remote = `https://x-access-token:${token}@github.com/${repoSlug}.git`;

const cmd = branch ? `git pull ${remote} ${branch}` : `git pull ${remote}`;

try {
  execSync(cmd, { stdio: "inherit" });
} catch {
  process.exit(1);
}
