# Resources

## CPU/Memory resources

| Module            | Image               | CPU Request | CPU Limit | Memory Request | Memory Limit |
| ----------------- | ------------------- | ----------- | --------- | -------------- | ------------ |
| reloader          | reloader            | 250m        | 1         | 256Mi          | 1024Mi       |
| vault             | vault               | 250m        | 1         | 256Mi          | 1024Mi       |
| postgresql        | postgresql          | 250m        | 1         | 256Mi          | 1024Mi       |
| postgresql        | postgres-exporter   | 100m        | 200m      | 128Mi          | 256Mi        |
| redis             | redis-exporter      | 250m        | 1         | 256Mi          | 1024Mi       |
| redis             | redis               | 250m        | 1         | 256Mi          | 1024Mi       |
| keycloak          | keycloak            | 250m        | 1         | 256Mi          | 1024Mi       |
| keycloak          | keycloak-config-cli | 250m        | 1         | 256Mi          | 1024Mi       |
| hasura            | hasura              | 100m        | 1         | 128Mi          | 1024Mi       |
| integrationStudio | integration-studio  | 250m        | 1         | 256Mi          | 1024Mi       |
| dashboard         | dashboard-app       | 100m        | 1         | 128Mi          | 256Mi        |
| dashboard         | dashboard-api       | 100m        | 1         | 128Mi          | 256Mi        |
| besu              | besu                | 250m        | 1         | 256Mi          | 1024Mi       |
| dshackle          | dshackle            | 100m        | 1         | 512Mi          | 1024Mi       |
| ide               | base-ide            | 250m        | 2         | 256Mi          | 2048Mi       |
| minio             | minio               | 250m        | 1         | 256Mi          | 1024Mi       |
| oauth2Proxy       | oauth2-proxy        | 100m        | 1         | 128Mi          | 256Mi        |

## Disk resources

| Module            | Image              | Size |
| ----------------- | ------------------ | ---- |
| vault             | vault              | 5Gi  |
| postgresql        | postgresql         | 5Gi  |
| redis             | postgresql         | 5Gi  |
| integrationStudio | integration-studio | 5Gi  |
| besu              | besu               | 5Gi  |
