---
title: OAuth Configuration
sidebar_position: 3
---

# OAuth Configuration

## Overview

The SettleMint Platform requires OAuth authentication for user management and access control. We support various OAuth providers.

## Supported Providers

### Option 1: Azure Active Directory

1. Navigate to Azure Portal > Azure Active Directory
2. Register a new application:
   - Set redirect URIs
   - Enable the following permissions:
     - OpenID Connect
     - Email
     - Profile

### Option 2: Google OAuth

1. Access Google Cloud Console
2. Create OAuth 2.0 credentials:
   - Configure authorized redirect URIs
   - Set application type as "Web application"
   - Enable necessary scopes:
     - email
     - profile
     - openid

### Option 3: Okta

1. Log into Okta Developer Console
2. Create a new application:
   - Choose "Web Application"
   - Configure redirect URIs
   - Enable OIDC features

## Configuration Requirements

For any OAuth provider, you'll need to configure:
- Authorized redirect URIs
- Allowed origins
- Required scopes
- User attribute mappings

:::info Information Collection Box
Save the following information for platform installation:
- Client ID
- Client Secret
- OAuth Provider URL
- Redirect URIs
- Token endpoint
- Authorization endpoint
- User info endpoint
::: 