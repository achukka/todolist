# Build and Test React App using GitHub Actions

![Cover Page](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ffcb0neehajy9y09qbny.png)

## GitHub Actions

GitHub Actions helps developer automate tasks with in the software development lifecycle. These actions are event-driven, for example, when someone creates a pull request for repository, the developer can run a command to run unit tests.

> Reference: [GitHub Actions](https://docs.github.com/en/actions/learn-github-actions/introduction-to-github-actions)

## Git Workflow

A Git Workflow is a configurable automated process that can run one or more jobs.

> Reference: [GitHub Docs](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#:~:text=A%20workflow%20is%20a%20configurable,to%20define%20your%20workflow%20configuration.&text=GitHub%20Actions%20is%20not%20available,using%20legacy%20per%2Drepository%20plans.)

GitHub provides a way to setup one or more workflows per project.

### Where can I use multiple workflows ?

Following are some examples I can think of

- Dev workflow vs Prod workflow
  - Your API keys and dependencies could be different
- Linting workflow vs Unit Testing Workflow
  - Linting is not mandatory for Unit Testing to work
- Tests are written in language different from actual application

> In one of my projects, I wrote the REST API in dotnet where as the integration tests were written in python.

---

### Setting up a workflow

In this section, we will setup an `npm` workflow for our react project.

> At the time of publishing this article there is no suggested workflow for React Applications

To setup a workflow

1. Go to the `Actions` Tab in your repository
2. Click `New Workflow`
3. Click `set up a workflow yourself`
4. You should see something like this

![github_workflow](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/j50mwr0ltv6h9rgiwl1b.png)

> The default workflow already configures most of the variables for us

Now let's update the workflow to work with react app

- Rename the yaml to `build_test_react.yml`

```bash
{repo}/.github/workflows/build_test_react.yml
```

- Remove [workflow_dispatch](https://github.blog/changelog/2020-07-06-github-actions-manual-triggers-with-workflow_dispatch/).

  - We do not need it for the purpose of this article.

- Rename `build` to `build_test`

- Add a [strategy](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstrategy) block to jobs
  - We use this block to specify node versions

```yaml
strategy:
  matrix:
    node-version: [12.x, 14.x, 15.x]
```

> In the `steps` block we can specify what commands (step) we can run. But before that we need to specify the version of node to be used

- Add a block to specify node version through `${{ matrix.node-version }}` and give it a name

```yaml
- name: Use Node.js ${{ matrix.node-version }}
  uses: actions/setup-node@v2
  with:
    node-version: ${{ matrix.node-version }}
```

- Finally we can specify the build and test commands we want to run

```yaml
- name: npm ci, build and test
  run: |
    npm ci
    npm run build --if-present
    npm test
```

### What is `npm ci` ?

`npm ci` is similar to `npm install` except that it can be used while testing, continuous integration and deployment. However it needs `package-lock.json` or `npm-shrinkwrap.json`.
You find more details in npm [docs](https://docs.npmjs.com/cli/v7/commands/npm-ci)

Stitching all the commands together our `build_test_react.yml` would look like this

```yaml
name: Build and Test React Application

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
        node-version: [10.x, 12.x, 14.x, 15.x]

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
```

Please refer to [this commit](https://github.com/achukka/todolist/commit/caf075150b675c2bbbfb0132aa02cbf1656ade57) for the full yml file.

- Commit your workflow to a new branch
- Create a PR onto `main` branch
- Merge the PR

Congratulations :clap:. You have now setup a workflow to build and test your react application :thumbsup:

Any subsequent updates (pull_requests or push) to your github repo should trigger the above workflow.

A sample [workflow](https://github.com/achukka/todolist/pull/6/checks) would look like this

![github_workflow_checks](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fh6emvbt15f9kupt5m3z.PNG)

Thanks for reading through the entire article. Please reach out with questions, comments and/or feedback.
