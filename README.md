# github-app-util

Generate GitHub App installation tokens for API access.

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
npm install
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

If installed globally:

```bash
github-app-util
```

If cloned locally:

```bash
node bin/get-token.js
```

The tool outputs an installation token you can use for API calls.

To capture the token as an environment variable:

```bash
export GITHUB_TOKEN=$(github-app-util 2>/dev/null)
```

The `2>/dev/null` suppresses the TTY warning so only the token is captured.

