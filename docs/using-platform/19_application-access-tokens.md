# Application Access Tokens

If you want to set up an integration between your SettleMint services and other applications, you need application access tokens to authenticate your requests with the SettleMint API. Application access tokens allow any user to interact with all or selected services of an application. They identify the application, not the user, and are not associated to a personal account. Both admins and users of an organization can create application access tokens for it's applications.

## Create an application access token

Navigate to the **application** for which you want to create an application access token.

Click **App Access Tokens** in the left navigation, this opens a form where you can create your new application access token.

Follow these steps to create your application access token:

1. Choose a **name** for your application access token.
2. Select an **expiration date**.
3. Select a scope type. There are two types of scope: **All** or **Specific**.
   1. If you selected **All**, you grant access to all services of the application. If you add more services to the application later, this access token will grant access to these new services as well.
   2. If you selected **Specific**, you can choose which specific services this access token will grant access to.
4. Click **Confirm** to create your application access token.

:::warning Warning

Make sure to copy your application access token and store it somewhere safe, as you will not be able to see it again. Treat it like a password and keep it secret.

:::

## Delete an application access token

If you are worried that an application access token has been compromised, or you no longer use the integration for which you had generated a particular application access token, you can delete that application access token.

1. Navigate to the application dashboard whose application access tokens you wish to delete.
2. Click **App Access Tokens** in the left navigation.
3. Click **Delete** next to the application access token you want to delete.
4. Type **DELETE** to confirm. The application access token will no longer be usable.

## Use an application access token

You can use these application access tokens in three ways depending on what works for your use case.

- As a header, you can use the header `x-auth-token: TOKEN`.
- As a query parameter using `https://myservice.settlemint.com/?token=TOKEN` appended to any URL.
- As the last part of the URL `https://myservice.settlemint.com/TOKEN`.
  - For IPFS nodes build your uri so it becomes `https://myservice.settlemint.com/TOKEN/api/v0/...`
  - For Avalanche and Fuji build your uri so they look like `https://myservice.settlemint.com/ext/bc/C/rpc/TOKEN`
