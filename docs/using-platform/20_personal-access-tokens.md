# API keys

If you want to set up an integration between your SettleMint account and other applications, you need API keys (or personal access tokens) to authenticate your request to the SettleMint API. Different API keys are suited for different functionality, and the scopes are unique for each key.

## Generate an API key

In the upper right corner of any page, click your **profile picture or avatar**, and then click **API keys**.

Click **Generate new API key**.

Follow these steps to generate an API key:

1. Choose a **name** for your API key. Make sure the name is descriptive so you know which application uses it.
2. Select one or more **scopes** you want to grant this API key.
3. Click **Confirm** to generate and view the API key.
4. Click the API key to **copy it**.

:::warning Warning

Make sure to copy your API key and store it somewhere safe, as you will not be able to see it again. Treat it like a password and keep it secret.

:::

## Delete an API key

If you are worried that an API key has been compromised, or you no longer use the integration for which you had generated a particular API key, you can delete that API key.

1. Navigate to the list of your API keys, and find the API key you want to delete.
2. Click **Delete** next to the API key.
3. Type **DELETE** to confirm. The API key will no longer be usable.

## Use an API key

You can use these API keys in three ways depending on what works for your use case.

- As a header, you can use the header `x-auth-token: KEY`.
- As a query parameter using `https://myservice.settlemint.com/?token=APIKEY` appended to any URL.
- As the last part of the URL `https://myservice.settlemint.com/APIKEY`.
  - For IPFS nodes build your uri so it becomes `https://myservice.settlemint.com/APIKEY/api/v0/...`
  - For Avalanche and Fuji build your uri so they look like `https://myservice.settlemint.com/ext/bc/C/rpc/APIKEY`
