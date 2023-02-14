# Contributing Guide

[Instructions](https://contribute.cncf.io/maintainers/github/templates/required/contributing/#introduction)

- [New Contributor Guide](#contributing-guide)
  - [Ways to contribute](#ways-to-contribute)
  - [How to contribute](#how-to-contribute)
  - [Contributing guidelines](#contribution-guidelines)
  - [Find an issue](#find-an-issue)
  - [Ask for help](#ask-for-help)

Welcome! We are glad that you want to contribute to our project! 💖

As you get started, you are in the best position to give us feedback on areas of
our project that we need help with including:

- Problems found during setting up a new developer environment
- Gaps in our Quickstart Guide or documentation
- and more!

If anything doesn't make sense, or doesn't work when you run it, please open a
bug report and let us know!

Feel free to join the community [Discord!](https://discord.gg/UuN4GDfXQ3)

## Ways to Contribute

We welcome many different types of contributions including:

- New features
- Builds, CI/CD
- Bug fixes
- Documentation
- Issue Triage
- Answering questions on Discord
- Web design
- Communications / Social Media / Blog Posts
- Release management

Not everything happens through a GitHub pull request. Please reach us on https://twitter.com/theadxy . We will soon have a discord channel for this.

## Find an Issue

We have good first issues for new contributors and help wanted issues suitable
for any contributor. [good first issue](TODO) has extra information to
help you make your first contribution.

Sometimes there won’t be any issues with these labels. That’s ok! There is
likely still something for you to work on. If you want to contribute but you
don’t know where to start or can't find a suitable issue, you can contact (@theadxy) on twitter.

Once you see an issue that you'd like to work on, please post a comment saying
that you want to work on it. Something like "I want to work on this" is fine.

## How to contribute

- Fork the project and clone it to your local machine. Follow the installation guide, from README.
- Create a branch with your GitHub username and the ID of the issue, for example: git checkout -b USERNAME/some-new-feature-1234
- Code and commit your changes. Bonus points if you write a good commit message: git commit -m 'Add some feature'. Read this: [Commenting Guidelines](#semantic-commit-messages)
- Push to the branch: git push -u origin USERNAME/some-new-feature-1234
- Create a pull request for your branch. 🎉

## Contribution guidelines

- Create an issue
- Nobody's perfect. Something doesn't work? Something could be better? Check to see if the issue already exists, and if it does, leave a comment to get our attention! If the issue doesn't already exist, feel free to create a new one. A core team member will triage incoming issues.

Please note: core team members may update the title of an issue to reflect the discussion.

### Semantic Commit Messages

See how a minor change to your commit message style can make you a better programmer.

Format: `<type>(<scope>): <subject>`

`<scope>` is optional. If your change is specific to one/two packages, consider adding the scope. Scopes should be brief but recognizable, e.g. `content-docs`, `theme-classic`, `core`

The various types of commits:

- `feat`: a new API or behavior **for the end user**.
- `fix`: a bug fix **for the end user**.
- `docs`: a change to the website or other Markdown documents in our repo.
- `refactor`: a change to production code that leads to no behavior difference, e.g. splitting files, renaming internal variables, improving code style...
- `test`: adding missing tests, refactoring tests; no production code change.
- `chore`: upgrading dependencies, releasing new versions... Chores that are **regularly done** for maintenance purposes.
- `misc`: anything else that doesn't change production code, yet is not `test` or `chore`. e.g. updating GitHub actions workflow.

Do not get too stressed about PR titles, however. Your PR will be squash-merged and your commit to the `main` branch will get the title of your PR, so commits within a branch don't need to be semantically named. The maintainers will help you get the PR title right, and we also have a PR label system that doesn't equate with the commit message types. Your code is more important than conventions!

Example:

```
feat(core): allow overriding of webpack config
^--^^----^  ^------------^
|   |       |
|   |       +-> Summary in present tense. Use lower case not title case!
|   |
|   +-> The package(s) that this change affected.
|
+-------> Type: see above for the list we use.
```

### Consider accessibility in UI changes

- If the change you're proposing touches a user interface, include accessibility in your approach. This includes things like color contrast, keyboard accessibility, screen reader labels, and other common requirements.

### Please use inclusive language

- Inclusion and respect are core tenets of our Code of Conduct. We expect thoughtful language all the way down to the code. Some technical metaphors are alienating or triggering. We ask that contributors go the extra mile to submit code which is inclusive in nature.

- If you unintentionally use language deemed harmful, there is no shame. We will work together to find a better alternative. Being thoughtful about language also encourages more thoughtful code!

### Create a pull request

- Try to keep the pull requests small. A pull request should try its very best to address only a single concern.
- For work in progress pull requests, please use the Draft PR feature.
- Document your reasoning behind the changes. Explain why you wrote the code in the way you did. The code should explain what it does.
- If there's an existing issue, reference to it by adding something like References/Closes/Fixes/Resolves #123, where 123 is the issue number. More info here.
- All commits in a pull request will be squashed when merged.
- Please note: a core team member may close your PR if it has gone stale or if we don't plan to merge the code.

### Pull request reviews

- All community pull requests are reviewed by our core team.
- Requested Changes must be resolved (with code or discussion) before merging.
- If you make changes to a PR, be sure to re-request a review.
- Style discussions are generally discouraged in PR reviews; make a PR to the linter configurations instead.
- Your code will be deployed shortly after it is merged.

## Ask for Help

The best way to reach us with a question when contributing is to ask on:

- The original github issue
- Our Discord - [Join here!](https://discord.gg/UuN4GDfXQ3)

## The bottom line

We are all humans trying to work together to improve the community. Always be kind and appreciate the need for tradeoffs. ❤️
