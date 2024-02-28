# Keycloak Authentication for the SettleMint On-Premise Platform

This document serves as a technical guide for implementing Keycloak authentication within the SettleMint On-Premise platform. It provides step-by-step instructions on how to leverage Keycloak's authentication system to generate authenticated API requests.

## Overview

The process of integrating Keycloak authentication into the SettleMint On-Premise platform involves two main steps:

1. Acquiring a Token: This step requires sending a request to the Keycloak server, including client credentials (client ID and client secret) along with the user's username and password. Keycloak responds with an access token.
2. Utilizing the Token: The access token obtained from Keycloak is then used to authenticate API requests to the SettleMint API. The token should be included in the Authorization header of HTTP requests using the format: `Bearer <token>`. The SettleMint API validates the token and processes the request if it is valid.

## Part 1: Accessing the Keycloak Admin UI

To begin, follow these steps to access the Keycloak administration console:

1. Open your preferred web browser and navigate to `<your settlemint url>/auth`.
2. Select the "administration console" option.
3. Log in using your credentials.

## Part 2: Retrieving Your Client Secret

To retrieve your client secret, follow the steps below:

1. From the Keycloak administration console, navigate to the SettleMint realm located at the top left of the sidebar.
2. Select the 'Clients' option and navigate to the 'Credentials' tab.
3. Copy the 'Client secret' value. It is important to securely store this information.

## Part 3: Creating a User

To create a user for Keycloak authentication, follow these instructions:

1. From the Keycloak administration console, go to the 'Users' tab and click on 'Add user'.
2. Fill in the necessary details to create the user.
3. Once the user is created, navigate to the 'Credentials' tab and select 'Create password'.
4. Uncheck the 'Temporary password' option and assign a password to the user.

Note: If you already have a user and need to reset the password, follow these steps:

1. Go to the 'Users' tab in the Keycloak administration console.
2. Navigate to the 'Credentials' tab.
3. Select 'Reset password'.
4. Set up a new password for the user and ensure the 'Temporary password' option is unchecked.

## Part 4: Constructing Authenticated Requests

To make authenticated requests using Keycloak, you can follow one of the following approaches based on your preferred HTTP request method: Node.js with axios or cURL.

### 4.1 Node.js (axios)

To use Node.js with axios, ensure that Node.js and npm are installed on your system. Then, follow the steps below:

1. run the command `npm install keycloak-connect axios`
2. Create a new file named `keycloak.json` in the root directory of your project
3. Populate the `keycloak.js` file with the provided JavaScript code snippet, replacing `Keycloak-server-url` and `your-client-secret` with the actual Keycloak server URL and the client secret obtained in Part 2.

```json
{
  "realm": "settlemint",
  "auth-server-url": "Keycloak-server-url",
  "ssl-required": "external",
  "resource": "settlemint",
  "credentials": {
    "secret": "your-client-secret"
  }
}
```

4. In the following code snippet replace the `username` and `password` in the getToken function

```javascript
import Keycloak from 'keycloak-connect';
import axios from 'axios';

const keycloak = new Keycloak({});
const getToken = async () => {
  try {
    const grant = await keycloak.grantManager.obtainDirectly('username', 'password');
    return grant.access_token.token;
  } catch (err) {
    throw err;
  }
};

const makeAuthenticatedRequest = async (url, method, data) => {
  const token = await getToken();
  const response = await axios({
    url: url,
    method: method,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

makeAuthenticatedRequest('https://your-api.com/endpoint', 'POST', {
  // your data here
});
```

For instance, to call your blockchain node, you could use the following function:

```javascript
const getBlockNumber = async () => {
  const token = await getToken();
  const response = await axios.post(
    'your-node-rpc-connection',
    {
      jsonrpc: '2.0',
      id: 0,
      method: 'eth_blockNumber',
      params: [],
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};
```

This function should return the latest block of your blockchain!

### 4.2 cURL

To use cURL for making authenticated requests, follow the instructions below:

1. Retrieve an access token by running the following cURL command, replacing `<username>`, `<password>`, `<client-id>`, and `<client-secret>` with the actual values:

```bash
curl -X POST '<your-keycloak-url>/auth/realms/settlemint/protocol/openid-connect/token' \
-d 'username=<username>&password=<password>&client_id=<client-id>&client_secret=<client-secret>&grant_type=password'
```

2. Send an authenticated request using the obtained access token, run the following cURL command, replacing
   `"<access_token>"` with the actual access token obtained from the previous step:

```bash
curl -X POST \
 'your-node-rpc' \
  -H 'Authorization: Bearer <access_token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "jsonrpc": "2.0",
    "id": 0,
    "method": "eth_blockNumber",
    "params": []
  }'
```

## Conclusion

This technical documentation provided a comprehensive guide on implementing Keycloak authentication within the SettleMint On-Premise platform. By following the outlined steps, developers can effectively utilize Keycloak's authentication system to generate authenticated API requests. Whether using Node.js with axios or cURL, the instructions provided enable successful integration of Keycloak authentication for secure interactions with the SettleMint API.
