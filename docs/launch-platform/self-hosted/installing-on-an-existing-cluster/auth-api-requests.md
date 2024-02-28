# Authenticating API Requests on SettleMint On-Premise Platform

Below is a step by step instruction guide on how to authenticate API requests on the SettleMint On-Premise platform using HTTP Basic Authentication. It addresses a specific issue related to the API endpoint authentication. The document aims to guide developers in understanding and implementing the authentication process for accessing the GraphQL server in the on-premise environment.

## Overview:

The SettleMint On-Premise platform utilizes HTTP Basic Authentication to authenticate API requests. This authentication method requires providing the appropriate credentials in the URL scheme. By following the instructions below, developers can successfully authenticate and access the GraphQL server in the on-premise environment.

## Authentication Procedure:

To authenticate API requests in the SettleMint On-Premise platform, follow these steps:

1.  Format the URL:
    After the "https://" prefix, insert the username and password in the following format: **`username:password@`**.
2.  Construct the API endpoint URL:
    Append the formatted URL from step 1 with the domain and API path you want to access. For example use this format for the Graph middleware:
    `"https://<username>:<password>@<domain>/<middleware>/<subgraph>"`
3.  Perform the API request:
    Use the constructed API endpoint URL from step 2 to make the API request using an HTTP client of your choice (e.g., cURL). Ensure the appropriate HTTP method is used based on the intended action (GET, POST, etc.).

## Example Usage:

To illustrate the authentication process, consider the following example:

API Endpoint: **`https://middleware-c188:8a7f0abf64e6709f9adb@onprem-mertcanatan.settlemint.com/middleware/middleware-c188/subgraphs/name/erc20-b6ad`**

In the above example, the username is **`middleware-c188`**, and the password is **`8a7f0abf64e6709f9adb`**. By including these credentials in the URL, the API request will be authenticated.

## Important Note:

Please note that the authentication process may differ between the SettleMint On-Premise (onprem) and Software-as-a-Service (SaaS) environments. Ensure you follow the appropriate authentication method based on the environment you are working with.

## Conclusion:

By following the provided instructions, developers can successfully authenticate API requests in the SettleMint On-Premise platform using HTTP Basic Authentication. This authentication method ensures secure access to the GraphQL server in the on-premise environment. For more details and comprehensive documentation, developers can refer to the Keycloak Authentication guide available in the SettleMint documentation portal.
