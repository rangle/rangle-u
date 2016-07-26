# Git Best Practices

__A Rangle-U Presentation.__

* seth@rangle.io
* https://github.com/SethDavenport

---

## Introduction

* Git is a very flexible source control tool
* Many shops use very different workflows
* We use one called "Rangle Flow"
  * Based on Github Flow

---

## Rangle Flow

* There's a central repository in Github
* Usually the 'Rangle' org (https://github.com/rangle)
* Sometimes it will belong to your client's org instead
  * It might even be on BitBucket or some internal system.

* Typically we work on personal forks.
  * Insulates the main repo from any git screwups you may get into
  * Stops the main repo from being cluttered with stale branches.

* Create a new branch for each feature / bug fix you make.
* Make a pull request for each changes.

---

## Forking a Repo

![Fork: step 1](./git-best-practices/images/fork1.png)

![Fork: step 2](./git-best-practices/images/fork2.png)

---

## Forking a Repo

You'll now need to set up your git remotes to allow you to keep your fork
in sync:

```sh
git remote origin set-url git@github.com:[github uname]/[your repo].git
git remote add upstream git@github.com:rangle/[your repo].git
```

---

## Always Work on a Branch

* Any feature or bug fix you work on should happen on its own branch in your
fork.
* The branch should only contain changes relevant to that feature.
* Branches should be descriptively named.
  * We prefer a chore/feat/fix convention.

#### Some Examples:

```sh
git checkout -b feat(adding-login-modal)
```

```sh
git checkout -b fix(exception-when-signing-in)
```

```sh
git checkout -b chore(clean-up-logging)
```

---

## Submitting your work

* Work is submitted by pushing your branch _to your remote fork_
* And then creating a pull request.

How to push your work:

* ALWAYS REVIEW YOUR DIFFS BEFORE YOU COMMIT
  * Make sure every change belongs to that feature
  * Prune out extra noise, whitespace changes, etc.
  * Make sure you understand why every single change is there.

* Then rebase to make sure your local clone is up to date
* Finally, push, and make a pull request.

---

## Reviewing Diffs and Staging Changes

You can do this a few ways:

```sh
git diff
```

* Or by using a UI like [gitx](http://gitx.frim.nl/).
  * I'm a big fan of gitx because it lets you stage and unstage individual lines.
  * SourceTree is pretty good too but it costs money.

* You can also filter your changes on the command line using `git add -i`.
* Once you've staged your changes, make a commit on your local branch.
---

## Notes about commits

* Use a descriptive commit message.
* If you have a Pivotal Tracker, JIRA, or Github issue number for the feature,
reference it in the commit.
* If you don't, question why you've been spending time on it!

## Bad Commit Messages I Have Seen

```
fix
```

```
stuff
```

```
wat
```

---

## Good Commit Message - JIRA

```
[ERD-83] Implement 'add to cart' functionality

There's still a bit more to do, but it will be easier once the API endpoints are
connected.
```

## Good Commit Message - Pivotal Tracker

```
[Fixes #123123123] Handle exception due to missing local storage instance

Accessing localstorage throws an error in private mode. Added an in-memory
workaround for this case.
```

## Good Commit Message - Github Issues

```
Updated to the latest version of redux

Connected to rangle/rangle-starter#23
```

---

## Creating Pull Requests

Once you complete a feature, push your branch __to your remote fork__ and
create a pull request on github.

The first thing to do is to rebase your branch to make sure it's on top
of the latest changes to the main repo.

```sh
# get latest changes from the main repo
git fetch upstream

# replay your work on top of the latest changes
git rebase upstream/master

## If you have conflicts, fix them in your editor, then do
git add [conflicted files]
git rebase --continue

# Push it up.
git push origin feat(my-awesome-feature)
```

* Note that our CLI flow is based __entirely on rebasing__.
* IF YOU TYPE `git merge` YOU'RE DOING SOMETHING WRONG.

---

## What is Rebase Anyway?

![Rebase: before](./git-best-practices/images/rebase1.jpg)

---

![Rebase: after](./git-best-practices/images/rebase2.jpg)

---

## Click that Shiny Button

Now you should be able to see a floaty PR prompt in the GitHub UI for the main
repo:

![Pull Request](./git-best-practices/images/pr.png)

* Click the shiny button, add any additional notes, hit 'create pull request'.
* Note that it's a good idea to double-check your diffs here too.
* Tag or assign someone to the PR to get their feedback.
  * Don't proceed with this feature until someone else on the team gives you a
  shipit squirrel (:shipit:).
* While you wait, you can create a new branch and start another feature.

---

## Merging a Pull Request to Master

OK, you've got your squirrel, time to click that 'merge' button in github!

.... WAIT ...

First we want to do two things: rebase (again) and squash.

This is so master is a chain on single commit features that can easily be
reverted if necessary.

## So rebase and push again:

```sh
git fetch upstream
git rebase upstream/master
git push origin +feat(my-awesome-feature)
```

---

## And squash:

![Squash](./git-best-practices/images/squash.png)

If you have multiple commits, update the squashed message to something cleaner.

If you're some kind of shell hipster you can also squash on the command line:

```sh
git rebase -i HEAD~[number of commits]
```

---

## Resources

* [Git cheatsheet on the Rangle Knowledge-base](https://github.com/rangle/hub/wiki/Rangle-Git-Cheatsheet)
* [Git notes in the guidelines repo](https://github.com/rangle/guidelines/tree/master/content/9-teamwork)
