---
title: "How to Automatically Publish Your NPM Packages with GitHub Actions"
date: "2023-04-03"
tags: typescript, github, actions, publish, npm
---
# Automating NPM Package Publishing with GitHub Actions

As a developer, you may have encountered the tedious process of manually publishing a new version of your NPM package. Updating the version number, creating a new release on GitHub, and publishing the package on NPM can be time-consuming and error-prone. Fortunately, GitHub Actions provides an easy way to automate this process. In this tutorial, we'll create a workflow that automatically updates the version number, creates a new release, and publishes the package on NPM.

## Workflow Overview

Our workflow will be triggered manually, with an input that specifies the type of version update (patch, minor, or major). Here's an overview of the steps that our workflow will perform:

  1. Checkout the repository to the runner environment.
  2. Update the version number in `package.json` using a custom action.
  3. Get the updated version number and store it as an output.
  4. Create a new release on GitHub using the updated version number.
  5. Setup Node.js environment for building and publishing the package on NPM.
  6. Install dependencies and build the package.
  7. Publish the package on NPM.

## Workflow Implementation
### Step 1: Defining Workflow

Let's start by defining our workflow in a new YAML file called `npm-publish.yml`. We'll name our workflow "Publish to NPM", and set it to trigger manually with an input that specifies the type of version update. Here's the code for this step:
```yaml
name: Publish to NPM

on:
  workflow_dispatch:
    inputs:
      version-type:
        type: choice
        description: Version type
        options: 
        - patch
        - minor
        - major
```

### Step 2: Updating Package Version

Next, we'll update the version number in `package.json` using a custom action called `phips28/gh-action-bump-version`. This action takes a version type input (patch, minor, or major) and updates the version number in `package.json` accordingly. Here's the code for this step:
```yaml
jobs:
  publish:
    permissions:
      contents: write
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Update version in package.json.
        uses: 'phips28/gh-action-bump-version@master'
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          version-type:  ${{github.event.inputs.version-type}}
```

### Step 3: Getting Updated Version Number
We need to get the updated version number and store it as an output to use in the next step. We'll use the `node -p` command to retrieve the version number from `package.json` and store it as an output named `version`. Here's the code for this step:
```yaml
      - name: Get version from package.json
        id: get_version
        run: echo "::set-output name=version::$(node -p -e "require('./package.json').version")"

```

### Step 4: Creating GitHub Release

We'll create a new release on GitHub using the updated version number. We'll use the `actions/create-release` action to accomplish this. Here's the code for this step:
```yaml
      - name: Create GitHub release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ steps.get_version.outputs.version }}
          release_name: Release ${{ steps.get_version.outputs.version }}
          body: |
            This is the release for version ${{ steps
```

### Step 5: Setting up Node.js Environment
We need to setup the Node.js environment to build and publish the package on NPM. We'll use the `actions/setup-node` action to install the required version of Node.js and set the NPM registry URL. Here's the code for this step:
```yaml
      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '16.x'
          registry-url: 'https://registry.npmjs.org'

```

### Step 6: Building Package

We'll install dependencies and build the package using the `npm ci` and `npm run build` commands. Here's the code for this step:
```yaml
      - name: Install dependencies and build 🔧
        run: npm ci && npm run build
```

### Step 7: Publishing Package on NPM

Finally, we'll publish the package on NPM using the `npm publish` command. We'll set the `NODE_AUTH_TOKEN` environment variable to the NPM authentication token stored in GitHub secrets. Here's the code for this step:
```yaml
      - name: Publish package on NPM 📦
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_AUTH_TOKEN }}
```

## Complete Workflow Code

Here's the complete code for our workflow:
```yaml
name: Publish to NPM

on:
  workflow_dispatch:
    inputs:
      version-type:
        type: choice
        description: Version type
        options: 
        - patch
        - minor
        - major

jobs:
  publish:
    permissions:
      contents: write
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Update version in package.json.
        uses: 'phips28/gh-action-bump-version@master'
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          version-type:  ${{github.event.inputs.version-type}}

      - name: Get version from package.json
        id: get_version
        run: echo "::set-output name=version::$(node -p -e "require('./package.json').version")"

      - name: Create GitHub release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ steps.get_version.outputs.version }}
          release_name: Release ${{ steps.get_version.outputs.version }}
          body: |
            This is the release for version ${{ steps.get_version.outputs.version }}.
          draft: false
          prerelease: false

      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '16.x'
          registry-url: 'https://registry.npmjs.org'

      - name: Install dependencies and build 🔧
        run: npm ci && npm run build

      - name: Publish package on NPM 📦
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_AUTH_TOKEN }}
```

## Conclusion

In this tutorial, we've learned how to automate the process of publishing an NPM package using GitHub Actions. We've created a workflow that updates the version number, creates a new release on GitHub, and publishes the package on NPM. By automating this process, we can save time and reduce the risk of errors. With GitHub Actions, we can easily customize and automate our workflows to fit our specific needs.
