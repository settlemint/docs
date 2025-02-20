---
title: Create an Application
description: Guide to creating a blockchain application on SettleMint
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Create an application

An application is the context in which you organize your networks, nodes, smart contract sets and any other related blockchain resource.

:::info Note
You will always need to create an application before you can deploy or join networks, and add nodes.
:::

## How to create a new application

<Tabs>
<TabItem value="platform-ui" label="Platform UI">

![Create an App](../../static/img/about-settlemint/create-app.png)

1. In the upper right corner of any page, click the **grid icon**.
2. Navigate to your workspace and click **Create new application**.
3. Choose a **name** for your application.
4. Click **Confirm** to create the application.

</TabItem>
<TabItem value="sdk-cli" label="SDK CLI">

First, install the [SDK CLI](https://github.com/settlemint/sdk/blob/main/sdk/cli/README.md#usage) as a global dependency.

Then, ensure you're authenticated. For more information on authentication, see the [SDK CLI documentation](https://github.com/settlemint/sdk/blob/main/sdk/cli/README.md#login-to-the-platform).
```bash
settlemint login
```

Create an application:
```bash
settlemint platform create application <name>
```

</TabItem>
<TabItem value="sdk-js" label="SDK JS">

```typescript
import { createSettleMintClient } from '@settlemint/sdk-js';

const client = createSettleMintClient({
  accessToken: 'your_access_token',
  instance: 'https://console.settlemint.com'
});

// Create application
const createApp = async () => {
  const result = await client.application.create({
    workspaceUniqueName: "your-workspace",
    name: "myApp"
  });
  console.log('Application created:', result);
};

// List applications
const listApps = async () => {
  const apps = await client.application.list("your-workspace");
  console.log('Applications:', apps);
};

// Read application details
const readApp = async () => {
  const app = await client.application.read("app-unique-name");
  console.log('Application details:', app);
};

// Delete application
const deleteApp = async () => {
  await client.application.delete("application-unique-name");
};
```

:::tip
Get your access token from the Platform UI under User Settings → API Tokens.
:::

</TabItem>
</Tabs>

## Manage an application

<Tabs>
<TabItem value="platform-ui" label="Platform UI">

Navigate to your application and click **Manage app** to see available actions:
- View application details
- Update application name
- Delete application

</TabItem>
<TabItem value="sdk-cli" label="SDK CLI">

```bash
# List applications
settlemint platform list applications

# Delete application
settlemint platform delete application <name>
```

</TabItem>
<TabItem value="sdk-js" label="SDK JS">

```typescript
// List applications
await client.application.list("your-workspace");

// Read application
await client.application.read("app-unique-name");

// Delete application
await client.application.delete("app-unique-name");
```

</TabItem>
</Tabs>

:::info Note
All operations require appropriate permissions in your workspace.
:::
