# gh-app

A CLI for GitHub App authentication and git operations.

## Prerequisites

- Node.js 18+
- A [GitHub App](https://docs.github.com/en/apps/creating-github-apps) with a private key and at least one installation

## Install

Install directly from GitHub:

```bash
npm install -g git+https://github.com/AztecProtocol/github-app-util.git
```

Or clone and install locally:

```bash
git clone https://github.com/AztecProtocol/github-app-util.git
cd github-app-util
npm install && npm link
```

## Setup

1. Copy the example env file:

```bash
cp .env.example .env
```

2. Fill in your credentials in `.env`:

```
GITHUB_APP_ID=123456
GITHUB_INSTALLATION_ID=789012
GITHUB_PRIVATE_KEY_PATH=./private-key.pem
```

3. Set `GITHUB_PRIVATE_KEY_PATH` to the location of your GitHub App private key (`.pem` file). Defaults to `./private-key.pem` if not set.

## Usage

```
gh-app <command> [options]

Commands:
  token          Generate an installation token
  pull           Pull a repo using a fresh token
  clone          Clone a repo using a fresh token
  check-token    Show token validity and expiry
  list-repos     List accessible repositories
```

Run `gh-app <command> --help` for command-specific help.

### Generate a token

```bash
gh-app token
```

To capture as an environment variable:

```bash
export GITHUB_TOKEN=$(gh-app token 2>/dev/null)
```

### Pull a repo

```bash
gh-app pull owner/repo
gh-app pull owner/repo feature-branch
```

### Clone a repo

```bash
gh-app clone owner/repo
gh-app clone owner/repo my-directory
```

### Check token validity

```bash
gh-app check-token
```

### List accessible repos

```bash
gh-app list-repos
```
