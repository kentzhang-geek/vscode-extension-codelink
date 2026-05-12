# OpenCodeLink VSCode Extension

This extension allows you to open a link to a file in a GitHub repository in VSCode.

## Build a `.vsix` package locally

1. Install the VS Code packaging CLI once:
   ```bash
   npm install -g @vscode/vsce
   ```
2. From this repository, run:
   ```bash
   npm run package:vsix
   ```

If you want a fixed output filename, run:

```bash
npm run package:vsix:out
```

That writes `codelink.vsix` in the repo root.

## GitHub automation for VSIX

This repo includes `.github/workflows/vsix.yml` to automate packaging:

- On every PR and push to `main`, GitHub Actions builds and uploads `codelink.vsix` as an artifact.
- On a published GitHub Release, the workflow also uploads `codelink.vsix` into that release automatically.
- You can run it manually with **Run workflow** (`workflow_dispatch`).

### Suggested release flow

1. Bump `version` in `package.json`.
2. Create and push a tag like `v0.0.2`.
3. Publish a GitHub Release from that tag.
4. The action attaches `codelink.vsix` to the release.
