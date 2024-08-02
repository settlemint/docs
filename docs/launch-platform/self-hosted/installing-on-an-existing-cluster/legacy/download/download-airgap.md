---
sidebar_position: 3
---

# Airgap Installation

If you wish to install on an airgapped cluster, you will have to pre-download all the software to the machine that has
access to the cluster.

From the SettleMint Download Portal, download the following files

1. License file
2. KOTS CLI
3. KOTS Airgap Bundle
4. SettleMint Platform Airgapped Bundle
   - Full Bundle or Small Bundle : If you choose the small bundle, set up separate pipeline to push images to your repository.
     See [below](#understanding-the-structure) for a more detailed explanation.

Continue with [Step 2](../install-airgap/install-airgap.md)

## Understanding the Structure

Apart from the license file, the installation requires 3 broad categories of software.

1. The framework to install and update your application. It consists of the KOTS CLI and the KOTS admin bundle.
2. The images that make up the SettleMint Platform. They are the "heaviest" part of the bundle and make up more than 90% of the size.
3. The deployment scripts that apply the configuration you set in the framework to the images to tailor the SettleMint
   Platform to work within your premises.

The images and deployment scripts are part of the SettleMint Platform software and are typically delivered to you as
a **bundle** (called the SettleMint Platform bundle).

The SettleMint Platform bundle can be received in 2 ways

## Option 1 : Full Airgapped Bundle

If you chose to receive the SettleMint Platform as a Full Airgapped Bundle : you will receive one large file containing
the images and deployments scripts.

Everytime you wish to upgrade or update the SettleMint Platform, you will need to download the latest version of
SettleMint Platform Full Airgapped Bundle (all versions will be available to you from the admin console).

You may also need to get newer versions of the framework software, but our license page will indicate if so.

## Option 2 : Small Airgapped Bundle and Separate Pipeline for Images

The other option is to download the SettleMint Platform as a Small Airgapped Bundle and choose to receive the images via a separate pipeline.

In this case, a separate script will be delivered to your DevOps team to
download the specified versions of the images needed for the SettleMint Platform. Make sure that these images are in place
in your local repository so that they are accessible to the airgapped cluster.

The SettleMint Platform Small Airgapped Bundle will be a much smaller file (10% of the Full Airgap Bundle) and
will consist only of the deployment scripts and minimal images required to facilitate the installation.

Please note that with this option, upgrading to a another version of the SettleMint Platform will require:

- the DevOps team to use the provided script to download the corresponding images and upload them to the local registry.
- a download of the Small Airgapped Bundle of the SettleMint Platform from the admin console.
- You may also need to get newer versions of the framework software, but our license page will indicate if so.

Once you have downloaded all the files from the link shared with you, you can check that your setup meets the minimum
[requirements](../requirements.md) before continuing with the
[installation](../install-airgap/install-airgap.md).
