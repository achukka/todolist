## Deploy React App using GitHub Actions

![GitHub Actions](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0b7fpaqnjphye0spfu59.png)

### Step 1: Add `homepage` to `package.json`

```json
"homepage": "https://<githubusername>.github.io/<app>"
```

For todolist, this would be

```json
"homepage": "https://achukka.github.io/todolist"
```

### Step 2: Enable GitHub Pages

Create a branch to deploy from (ex: `gh-pages`)

> This helps use keep our source code separate from the static website

Set your source branch (Example: `gh-pages`) in `Settings` -> `Pages` section

![GitHub Pages](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gasihl3o0giwwg709uf2.png)

### Step 3: Create SSH Deploy Key

Generate your deploy key

```bash
ssh-keygen -t rsa -b 4096 -C "$(git config user.email)" -f `<your-deploy-branch>` -N ""
```

You should get two files 1) `<deploy-branch>.pub` (public key) and `<deploy-branch>` (private key)

### Step 4: Add Keys to GitHub

Add public key to `Settings` -> `Deploy Keys` section and Enable `Write Access`

![Public Key ACTIONS_DEPLOY_KEY](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/sxo1yhnf7r2uxmkehdfj.PNG)

Add private key as `ACTIONS_DEPLOY_KEY` to `Settings` -> `Secret Keys`.

### Step 5: Create workflow for deploy

Create a workflow similar to `Build And Test ` workflow we created in the previous [post](https://dev.to/achukka/build-and-test-react-app-with-github-actions-2jb2)

Add a step to deploy to gh-pages

```yaml
- name: deploy to gh-pages
- uses: peaceiris/actions-gh-pages@v3
with:
    deploy_key: ${{ secrets.ACTIONS_DEPLOY_KEY }}
    publish_dir: ./build
```

The above step, The GitHub Action `peaceiris/actions-gh-pages` uses `deploy_key` (which we created earlier) to publish files from `publish_dir` to github pages.

> Repo linked [here](https://github.com/peaceiris/actions-gh-pages#github-actions-for-github-pages)

The complete yaml would look like below

```yaml
name: Deploy React Application

# Controls when the action will run.
on:
  # Triggers the workflow on push or pull request events but only for the main branch
  push:
    branches: [main]
  pull_request:
    branches: [main]

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  build_test:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [12.x] # We will deploy with only one version of node

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v2
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v2
        with:
          node-version: ${{ matrix.node-version }}
      - name: npm ci, build and test
        run: |
          npm ci
          npm run build --if-present
          npm test
      - name: deploy to gh-pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          deploy_key: ${{ secrets.ACTIONS_DEPLOY_KEY }}
          publish_dir: ./build
```

## Step 6: Commit your changes

- Commit your changes to a new branch
- Create a PR onto main branch

Please check this [commit](https://github.com/achukka/todolist/commit/07734b74557417b70c1c5ef37b094db63154f7a7) for cumulative changes.

If the GithHub Action run successfully :heavy_check_mark:

- You should see A commit to your deploy branch (Ex: `gh-pages)

![gh-pages commit](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vwspduf4bu7yxfm1nqfv.PNG)

- Your React app should be hosted on your homepage

![Hosted App](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/yztjd68im7gb6cbeeros.PNG)

Congratulations 👏. You have now setup a workflow to deploy your react application 👍.

> Merge your PR if everything looks good :wink:

Thanks for reading through the entire article. Please reach out with questions, comments and/or feedback.
