# Pull images to your local registry (Small Airgap)

Follow these steps from the machine that is connected to your airgapped cluster.

1. Install `crane`

   Instructions [here](https://github.com/google/go-containerregistry/tree/main/cmd/crane#installation)

2. Ensure your image registry is setup. See the [Image Registry Section](./install-airgap.md).

3. Run the provided script mentioned in the [download section](../../download/download-airgap.md) to pull the images
   from our repository and push them on your registry.

   ```bash
    ./installer-pull-images.sh <image registry address> <namespace>
   ```

   Please note, only use the FQDN of the image registry, the "https://"-prefix is not required.
