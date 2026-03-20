if (process.argv.includes("--help") || process.argv.includes("-h")) {
  console.log(`Usage: gh-app clone <owner/repo> [directory]

Clone a repo using a fresh GitHub App installation token.

Options:
  -h, --help    Show this help message

Examples:
  gh-app clone myorg/myrepo
  gh-app clone myorg/myrepo ./my-directory`);
  process.exit(0);
}

import { execSync } from "child_process";
import { getInstallationAuth } from "../lib/auth.js";

const [repoSlug, directory] = process.argv.slice(2);

if (!repoSlug) {
  console.error("Usage: gh-app clone <owner/repo> [directory]");
  console.error("Run gh-app clone --help for more information.");
  process.exit(1);
}

const { token } = await getInstallationAuth();
const remote = `https://x-access-token:${token}@github.com/${repoSlug}.git`;

const cmd = directory ? `git clone ${remote} ${directory}` : `git clone ${remote}`;

try {
  execSync(cmd, { stdio: "inherit" });
} catch {
  process.exit(1);
}
