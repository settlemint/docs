# JSON Web Tokens

SettleMint supports custom JWT's in order to securely send requests in the SettleMint network.

## Configure JWT

Follow these steps to configure your JWT

1. Select the app you're working on
2. Go to manage app section on the dashboard
3. Select application settings to configure your JWT

You will then need to fill in the following fields

**Custom header name**  
Used to identify the JWT in the http header

**JWKS well-known endpoint**  
The end point of the JWK set to validate if the token was signed properly

**Audience**  
the resource that should accept the token

## Usage

Once those 3 are configured, you can now securely send requests to the network.  
Simply add `*CUSTOM_HEADER_NAME*: Bearer *YOUR_JWT*` to the header.
