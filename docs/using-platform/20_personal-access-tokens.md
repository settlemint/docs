# Personal access tokens

Personal access tokens (or [Application access tokens](19_application-access-tokens.md)) let you connect your SettleMint services with other apps securely. They represent an individual user, and have the same rights as the user's role in the organization (admin or user). They can be used to connect to all services that the user has access to.

## Create a personal access token

In the upper right corner of any page, click your **profile picture or avatar**, and then click **Personal access tokens**.

Click on the **Add a personal access token** button, this opens a form where you can create your personal access token.

1. Choose a **name** for your personal access token.
2. Select an **expiration date**. You cannot update this later.
3. Click **Confirm** to create your personal access token.

:::warning Warning

Copy and save your token securely - you won't see it again. Treat it like a password and keep it secret.

:::

## Delete a personal access token

If you are worried that your personal access token has been compromised, or you no longer use the integration for which you had generated a particular personal access token, you can delete that personal access token.

1. Navigate to the list of your personal access tokens, and find the personal access token you want to delete.
2. Click **Delete** next to the personal access token.
3. Type **DELETE** to confirm. The personal access token will no longer be usable.

## Use a personal access token

You can use these personal access tokens in three ways depending on what works for your use case.

- As a header, you can use the header `x-auth-token: TOKEN`.
- As a query parameter using `https://myservice.settlemint.com/?token=TOKEN` appended to any URL.
- As the last part of the URL `https://myservice.settlemint.com/TOKEN`.
  - For IPFS nodes build your uri so it becomes `https://myservice.settlemint.com/TOKEN/api/v0/...`
  - For Avalanche and Fuji build your uri so they look like `https://myservice.settlemint.com/ext/bc/C/rpc/TOKEN`
