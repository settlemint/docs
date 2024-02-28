# Preloading all images (speed and airgap installs)

To speed up installs or to install in airgap environments, it is possible to load all the images into the cluster or a local repository. Save the snippet below as `preload.sh`, modify the tag and push parts to match your environment and run `./preload.sh artifactory.some-big-bank-com`

```sh
#!/bin/bash -x
docker pull "ghcr.io/settlemint/bpaas-onprem/deployer:4.0.0-1665790989" && docker tag "$1/settlemint/bpaas-onprem/deployer:4.0.0-1665790989" && docker push "$1/settlemint/bpaas-onprem/deployer:4.0.0-1665790989"
docker pull "docker.io/kotsadm/kotsadm-migrations:v1.87.0" && docker tag "$1/kotsadm/kotsadm-migrations:v1.87.0" && docker push "$1/kotsadm/kotsadm-migrations:v1.87.0"
docker pull "docker.io/kotsadm/kotsadm:v1.87.0" && docker tag "$1/kotsadm/kotsadm:v1.87.0" && docker push "$1/kotsadm/kotsadm:v1.87.0"
docker pull "docker.io/stakater/reloader:v0.0.124" && docker tag "$1/stakater/reloader:v0.0.124" && docker push "$1/stakater/reloader:v0.0.124"
docker pull "docker.io/hashicorp/vault-k8s:1.0.0" && docker tag "$1/hashicorp/vault-k8s:1.0.0" && docker push "$1/hashicorp/vault-k8s:1.0.0"
docker pull "ghcr.io/settlemint/bpaas/containers/vault:1.3.1" && docker tag "$1/settlemint/bpaas/containers/vault:1.3.1" && docker push "$1/settlemint/bpaas/containers/vault:1.3.1"
docker pull "ghcr.io/hyperledger/firefly-signer:v1.1.1" && docker tag "$1/hyperledger/firefly-signer:v1.1.1" && docker push "$1/hyperledger/firefly-signer:v1.1.1"
docker pull "docker.io/hyperledger/besu:22.7.6-graalvm" && docker tag "$1/hyperledger/besu:22.7.6-graalvm" && docker push "$1/hyperledger/besu:22.7.6-graalvm"
docker pull "docker.io/emeraldpay/dshackle:0.13.1" && docker tag "$1/emeraldpay/dshackle:0.13.1" && docker push "$1/emeraldpay/dshackle:0.13.1"
docker pull "ghcr.io/settlemint/blockscout:4.1.10" && docker tag "$1/settlemint/blockscout:4.1.10" && docker push "$1/settlemint/blockscout:4.1.10"
docker pull "ghcr.io/settlemint/bpaas-console-onprem:5.29.0-alpha.104" && docker tag "$1/settlemint/bpaas-console-onprem:5.29.0-alpha.104" && docker push "$1/settlemint/bpaas-console-onprem:5.29.0-alpha.104"
docker pull "ghcr.io/settlemint/bpaas-onprem-api:5.29.0-alpha.104" && docker tag "$1/settlemint/bpaas-onprem-api:5.29.0-alpha.104" && docker push "$1/settlemint/bpaas-onprem-api:5.29.0-alpha.104"
docker pull "docker.io/hasura/graphql-engine:v2.13.0" && docker tag "$1/hasura/graphql-engine:v2.13.0" && docker push "$1/hasura/graphql-engine:v2.13.0"
docker pull "ghcr.io/settlemint/bpaas-smartcontractsets-base-ide:5.29.0-alpha.104" && docker tag "$1/settlemint/bpaas-smartcontractsets-base-ide:5.29.0-alpha.104" && docker push "$1/settlemint/bpaas-smartcontractsets-base-ide:5.29.0-alpha.104"
docker pull "ghcr.io/settlemint/bpaas-smartcontractsets-solidity-empty:5.29.0-alpha.104" && docker tag "$1/settlemint/bpaas-smartcontractsets-solidity-empty:5.29.0-alpha.104" && docker push "$1/settlemint/bpaas-smartcontractsets-solidity-empty:5.29.0-alpha.104"
docker pull "ghcr.io/settlemint/bpaas/containers/integration-studio-subpath:1.3.1" && docker tag "$1/settlemint/bpaas/containers/integration-studio-subpath:1.3.1" && docker push "$1/settlemint/bpaas/containers/integration-studio-subpath:1.3.1"
docker pull "ghcr.io/zcube/bitnami-compat/keycloak:19.0.2-debian-11-r29" && docker tag "$1/zcube/bitnami-compat/keycloak:19.0.2-debian-11-r29" && docker push "$1/zcube/bitnami-compat/keycloak:19.0.2-debian-11-r29"
docker pull "ghcr.io/zcube/bitnami-compat/keycloak-config-cli:5.3.1-debian-11-r29" && docker tag "$1/zcube/bitnami-compat/keycloak-config-cli:5.3.1-debian-11-r29" && docker push "$1/zcube/bitnami-compat/keycloak-config-cli:5.3.1-debian-11-r29"
docker pull "docker.io/minio/minio:RELEASE.2022-10-08T20-11-00Z" && docker tag "$1/minio/minio:RELEASE.2022-10-08T20-11-00Z" && docker push "$1/minio/minio:RELEASE.2022-10-08T20-11-00Z"
docker pull "quay.io/oauth2-proxy/oauth2-proxy:v7.3.0" && docker tag "$1/oauth2-proxy/oauth2-proxy:v7.3.0" && docker push "$1/oauth2-proxy/oauth2-proxy:v7.3.0"
docker pull "docker.io/postgres:14.5" && docker tag "$1/postgres:14.5" && docker push "$1/postgres:14.5"
docker pull "ghcr.io/zcube/bitnami-compat/postgres-exporter:0.11.1-debian-11-r29" && docker tag "$1/zcube/bitnami-compat/postgres-exporter:0.11.1-debian-11-r29" && docker push "$1/zcube/bitnami-compat/postgres-exporter:0.11.1-debian-11-r29"
docker pull "ghcr.io/zcube/bitnami-compat/bitnami-shell:11.0.0-debian-11-r29" && docker tag "$1/zcube/bitnami-compat/bitnami-shell:11.0.0-debian-11-r29" && docker push "$1/zcube/bitnami-compat/bitnami-shell:11.0.0-debian-11-r29"
docker pull "ghcr.io/zcube/bitnami-compat/redis:7.0.5-debian-11-r29" && docker tag "$1/zcube/bitnami-compat/redis:7.0.5-debian-11-r29" && docker push "$1/zcube/bitnami-compat/redis:7.0.5-debian-11-r29"
docker pull "ghcr.io/zcube/bitnami-compat/redis-exporter:1.44.0-debian-11-r29" && docker tag "$1/zcube/bitnami-compat/redis-exporter:1.44.0-debian-11-r29" && docker push "$1/zcube/bitnami-compat/redis-exporter:1.44.0-debian-11-r29"
docker pull "docker.io/ipfs/kubo:v0.16.0" && docker tag "$1/ipfs/kubo:v0.16.0" && docker push "$1/ipfs/kubo:v0.16.0"
docker pull "docker.io/ipfs/ipfs-cluster:1.0.4" && docker tag "$1/ipfs/ipfs-cluster:1.0.4" && docker push "$1/ipfs/ipfs-cluster:1.0.4"
docker pull "ghcr.io/settlemint/bpaas-ipfs-cli:5.29.0-alpha.104" && docker tag "$1/settlemint/bpaas-ipfs-cli:5.29.0-alpha.104" && docker push "$1/settlemint/bpaas-ipfs-cli:5.29.0-alpha.104"
docker pull "ghcr.io/settlemint/ipfs-webui:ocbc15" && docker tag "$1/settlemint/ipfs-webui:ocbc15" && docker push "$1/settlemint/ipfs-webui:ocbc15"
docker pull "docker.io/busybox:1.35.0" && docker tag "$1/busybox:1.35.0" && docker push "$1/busybox:1.35.0"
```
