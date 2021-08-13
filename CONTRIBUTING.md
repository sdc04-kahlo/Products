# Git Workflow

How to contribute to this project.

## General Rules

- Never work directly on the `main` branch
- Create a branch for each new feature
- Handle merge conflicts on local clone in VS Code
- Pull requests must be reviewed by another team member before closing
- If any changes are accidentally made before checking out run:
  1. Stash changes: `git stash`
  2. Check out into the new branch: `git checkout -b <feature_name>`
  3. Apply those changes to the new branch: `git stash pop`

## Creating a new Feature Branch

1. Clone from [this repo](https://github.com/sdc04-kahlo/Products.git)

    ```bash
    git clone https://github.com/sdc04-kahlo/Products.git
    ```

1. Make sure you are on branch `main`
1. Create a branch with a name descriptive of the feature you are developing

    ```bash
    git checkout main
    git checkout -b feature-name
    # alternative
    git checkout -b <feature-name> main
    ```

1. Make changes, commit frequently

## Syncing changes with `main`

Avoid conflicts in PR

1. Switch to branch `main`
1. Pull changes made to main by others
1. Switch to `feature-branch`
1. Merge changes from `main` -> `feature-branch`
1. Handle any merge conflicts in VS Code
1. Push up to GitHub `feature-branch`

    ```bash
    git checkout main
    git pull
    git checkout feature-branch
    git merge main
    # handle merge conflicts
    git push origin feature-branch
    ```

## Adding Features from Branches to `main`

1. Submit Pull Request
    1. base:main <- feature-name
    1. reference Trello ticket with link
1. Have a team member complete a Code Review according to [Code Review Guidlines](https://learn-2.galvanize.com/cohorts/2778/blocks/94/content_files/Front%20End%20Capstone/exercises/code_reviews.md)
    1. reviewer will look for errors
    1. reviewer should test the code according to the below workflow

## Pulling Features for Testing

1. create new branch locally branched from main
1. checkout new branch
1. pull from origin feature-branch

```bash
git checkout main
git pull
git checkout -b feature-branch
git pull origin feature-branch
```
