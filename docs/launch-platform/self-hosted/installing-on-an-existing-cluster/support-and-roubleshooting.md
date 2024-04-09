---
sidebar_position: 6
sidebar_label: Support and Troubleshooting

---

#Support and Troubleshooting

Should you need assistance at any stage of your installation or while utilizing the platform, the SettleMint team is here to help. Feel free to contact us at support@settlemint.com for any support you may require.

Should an error occur during installation, debug the installation with the following command:

```
helm upgrade --install --debug --dry-run
```

To delete the installation and try again, use:

```
helm delete settlemint --namespace mynamespace
```

Install the support bundle plugin

```
curl https://krew.sh/support-bundle | bash
```

Run the support bundle checks

```
kubectl support-bundle --load-cluster-specs
```

You can then send the generated file to support@settlemint.com

Enjoy exploring the SettleMint Platform!


