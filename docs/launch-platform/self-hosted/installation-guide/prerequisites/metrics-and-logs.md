---
title: Metrics and Logs
sidebar_position: 8
---

# Metrics and Logs Setup

## Overview

The SettleMint Platform requires three monitoring components:
- Prometheus: Metrics collection and storage
- Grafana: Metrics visualization and dashboards
- Loki: Log aggregation and querying

These components work together to provide:
- System and application metrics
- Log aggregation and search
- Alerting capabilities
- Performance monitoring

## Deployment Options

Choose the deployment method that best suits your needs:

### Self-Hosted Options
- [Helm Chart Deployment](#helm-chart)
- [Docker Deployment](#docker)

### Managed Services
- [Managed Prometheus](#managed-prometheus)
- [Managed Grafana](#managed-grafana)
- [Managed Loki](#managed-loki)

## Self-Hosted Deployment

### <a name="helm-chart"></a>Helm Chart Deployment

1. Add required Helm repositories:

```
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
```

2. Create values file (monitoring-values.yaml):

```
prometheus:
  prometheusSpec:
    retention: 15d
    storageSpec:
      volumeClaimTemplate:
        spec:
          resources:
            requests:
              storage: 50Gi

grafana:
  persistence:
    enabled: true
    size: 10Gi
  plugins:
    - grafana-piechart-panel
    - grafana-clock-panel

loki:
  persistence:
    enabled: true
    size: 50Gi
  config:
    limits_config:
      retention_period: 336h
```

3. Install components:

```
helm install monitoring prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace \
  -f monitoring-values.yaml

helm install loki grafana/loki-stack \
  --namespace monitoring \
  --set grafana.enabled=false
```

:::info Required Values
To complete platform installation, you'll need:
- Prometheus URL
- Grafana URL
- Loki URL
- Grafana admin credentials
:::

### <a name="docker"></a>Docker Deployment

1. Create Docker network and volumes:

```
docker network create monitoring
docker volume create prometheus_data
docker volume create grafana_data
docker volume create loki_data
```

2. Deploy Prometheus:

```
docker run -d \
  --name prometheus \
  --network monitoring \
  -v prometheus_data:/prometheus \
  -p 9090:9090 \
  prom/prometheus
```

3. Deploy Grafana:

```
docker run -d \
  --name grafana \
  --network monitoring \
  -v grafana_data:/var/lib/grafana \
  -p 3000:3000 \
  grafana/grafana
```

4. Deploy Loki:

```
docker run -d \
  --name loki \
  --network monitoring \
  -v loki_data:/loki \
  -p 3100:3100 \
  grafana/loki
```

:::info Required Values
To complete platform installation, you'll need:
- Prometheus URL (http://localhost:9090)
- Grafana URL (http://localhost:3000)
- Loki URL (http://localhost:3100)
- Grafana admin credentials
:::

## Managed Services

### <a name="managed-prometheus"></a>Managed Prometheus

1. Sign up for Managed Prometheus:
   - AWS Managed Prometheus
   - Google Cloud Managed Prometheus
   - Azure Monitor
2. Configure workspace
3. Set up data collection

:::info Required Values
To complete platform installation, you'll need:
- Prometheus endpoint
- Authentication credentials
- Remote write URL
:::

### <a name="managed-grafana"></a>Managed Grafana

1. Sign up for Managed Grafana:
   - AWS Managed Grafana
   - Grafana Cloud
   - Azure Managed Grafana
2. Configure instance
3. Set up data sources

:::info Required Values
To complete platform installation, you'll need:
- Grafana URL
- Admin API key
- Organization ID
:::

### <a name="managed-loki"></a>Managed Loki

1. Sign up for Managed Loki:
   - Grafana Cloud Logs
   - AWS CloudWatch with Loki API
2. Configure log collection
3. Set up retention policies

:::info Required Values
To complete platform installation, you'll need:
- Loki endpoint
- Authentication credentials
- Push API URL
:::

## Requirements

Regardless of deployment method, ensure:
- Sufficient storage for metrics and logs
- Network connectivity between components
- Authentication and security configured
- Retention policies set
- Resource limits configured
- Backup strategy (if needed)