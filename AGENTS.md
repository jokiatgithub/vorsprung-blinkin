# Repository instructions

## Deployments

- An explicit instruction from a repository collaborator to "deploy" authorizes one production deployment. Do not request a separate approval from Josef or an environment reviewer.
- Deployment does not authorize merging. Deploy only a full 40-character commit SHA that is already contained in `origin/main`; never deploy an open PR, branch-only commit, or uncommitted work.
- Resolve the exact target from the user's named PR or SHA. If the current task has just merged a PR, use that PR's merge commit. If the user explicitly asks to deploy the current `main`, fetch first and use `origin/main`. Ask one narrow question only when the target cannot be identified safely.
- Trigger `.github/workflows/deploy.yml` through GitHub Actions. Never run a direct local `wrangler deploy`, copy deployment secrets, or reveal secret values.
- Before dispatch, fetch `origin/main` and verify the selected SHA is its ancestor. Start the workflow on `main` with `commit_sha` set to the exact SHA.
- Watch the new Actions run through completion. Report the exact SHA, run URL, and final result. A deployment is complete only when the workflow and its live checks are green.
- If the workflow fails, do not bypass its checks or deploy another SHA. Report the failed step and run URL.

Example dispatch:

```sh
git fetch origin main
git merge-base --is-ancestor "$DEPLOY_SHA" origin/main
gh workflow run deploy.yml --repo jokiatgithub/vorsprung-blinkin \
  --ref main -f commit_sha="$DEPLOY_SHA"
```

## Repository safety

- Put website changes through a GitHub pull request before deployment.
- Never commit `.env` files, credentials, tokens, or customer data.
- Preserve unrelated user changes in the working tree.
