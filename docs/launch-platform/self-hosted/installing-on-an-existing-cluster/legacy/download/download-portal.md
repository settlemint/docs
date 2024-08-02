---
sidebar_position: 1
---

# Download Portal

Access the password-protected **SettleMint Download Portal** using the link your sales representative may have shared
with you.

Once you are logged in, you will be able to download all the files you need to proceed with the installation of the SettleMint
Platform. It may look like this.

![](/img/installing-on-an-existing-cluster/CleanShot_2022-10-01_at_16.52.342x.png)

There are 3 options to set up the install. Depending on your license, you can choose one of these and proceed.

1. [**Online installation**](./download-online.md)

   In an online installation, the cluster on which you propose to install the SettleMint Platform has internet access
   and can fetch all the required files/images as required. In this case, you only need to download the license file to
   proceed.

2. [**Airgapped installation**](./download-airgap.md)

   In an airgapped installation, the cluster on which you propose to install the SettleMint Platform does not have
   internet access. Hence **all the software** will need to be pre-downloaded to the machine that will have access to
   the cluster.

   You will need to download the following

- License file
- Installers
  - [KOTS CLI](../install-airgap/install-kots.md)
  - [KOTS admin console](../install-airgap/install-kotsadm.md)
- SettleMint Platform, comprising of
  - Deployer image and scripts
  - All the component images

You have two further options for airgapped installs : a FULL bundle or a SMALL bundle.

In both cases, the "Installers" software will have to be downloaded separately.

- **Airgapped with Full bundles**

  The SettleMint Platform will be provided as a **FULL** airgapped bundle. This will entail downloading 1 big file (size
  of the order of 10 GB) which includes the deployer and component images.

- **Airgapped with Small bundles.**

  The **SMALL** airgapped bundle breaks down the bundle into a deployer bundle (size of the order of 100 MB), and
  provides a script to push the component images required by the SettleMint Platform to your image repository for access
  during the installation. The advantage here is two-fold:

  - First, you are not gated by a big download for each install.
  - Second, platform upgrades require only updated deployer images and the specific upgraded images, not a fresh download of
    the "FULL" bundle.

Choose **one** of the options below and proceed.

- [Online Environment](./download-online.md)
- [Airgapped Environment](./download-airgap.md)
