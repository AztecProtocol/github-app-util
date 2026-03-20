if (process.argv.includes("--help") || process.argv.includes("-h")) {
  console.log(`Usage: gh-app list-repos

List all repositories accessible to the GitHub App installation.

Options:
  -h, --help    Show this help message`);
  process.exit(0);
}

import { getInstallationAuth } from "../lib/auth.js";

const { octokit } = await getInstallationAuth();

const repos = await octokit.paginate(
  octokit.rest.apps.listReposAccessibleToInstallation,
  { per_page: 100 }
);

if (repos.length === 0) {
  console.log("No repositories accessible to this installation.");
  process.exit(0);
}

console.log(`Accessible repositories (${repos.length}):\n`);
for (const repo of repos) {
  const visibility = repo.private ? "private" : "public";
  console.log(`  ${repo.full_name}  (${visibility})`);
}
