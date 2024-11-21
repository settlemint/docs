---
title: Metrics and Logs
sidebar_position: 8
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Metrics and Logs Setup

## Overview

The monitoring stack consists of:
* Metrics collection (Prometheus/VictoriaMetrics)
* Log aggregation (Loki)
* Metrics server for resource metrics
* Kube-state-metrics for cluster state

## Deployment Options

<Tabs>
<TabItem value="lightweight" label="Lightweight Stack (Recommended)" default>

### VictoriaMetrics + Loki Setup

1. **Install VictoriaMetrics**
```bash
helm upgrade --install victoria-metrics victoria-metrics-single \
  --repo https://victoriametrics.github.io/helm-charts/ \
  --namespace observability \
  --create-namespace \
  --set server.scrape.enabled=true
```

2. **Install Loki and Promtail**
```bash
helm install loki loki \
  --repo https://grafana.github.io/helm-charts \
  --namespace observability \
  --create-namespace \
  --set loki.auth_enabled=false \
  --set loki.commonConfig.replication_factor=1 \
  --set loki.storage.type=filesystem
```

3. **Install kube-state-metrics**
```bash
helm install kube-state-metrics kube-state-metrics \
  --repo https://prometheus-community.github.io/helm-charts \
  --namespace observability \
  --create-namespace
```

:::tip
This setup provides:
* Efficient resource usage
* Simple maintenance
* Sufficient monitoring capabilities
* Easy scalability
:::

</TabItem>
<TabItem value="prometheus" label="Full Prometheus Stack">

### Prometheus + Grafana + Loki

1. **Install Prometheus Stack**
```bash
helm upgrade --install monitoring prometheus-community/kube-prometheus-stack \
  --namespace observability \
  --create-namespace
```

2. **Install Loki Stack**
```bash
helm install loki grafana/loki-stack \
  --namespace observability \
  --set grafana.enabled=false
```

:::caution
Full stack requires:
* More resources
* Additional configuration
* Regular maintenance
:::

</TabItem>
</Tabs>

## Requirements

<div className="row margin-bottom--lg">
<div className="col col--6">

### Minimum Specifications
* Storage for metrics retention
* Storage for log retention
* Network access from platform
* Basic authentication

</div>
<div className="col col--6">

### Optional Features
* Long-term storage
* Alerting setup
* Dashboard configuration
* High availability

</div>
</div>

## Information Collection

<div className="alert alert--success" role="alert">

### Required Values for Platform Installation

* [ ] Metrics endpoint URL
* [ ] Logs endpoint URL
* [ ] Authentication details (if enabled)

:::note Example Configuration
```yaml
features:
  observability:
    metrics:
      enabled: true
      apiUrl: "http://victoria-metrics-victoria-metrics-single-server.observability.svc.cluster.local:8428/prometheus/api/v1"
    logs:
      enabled: true
      apiUrl: "http://loki-gateway.observability.svc.cluster.local/loki/api/v1"
```
:::

</div>

## Validation

Test your monitoring setup:
```bash
# Check VictoriaMetrics
curl -f "http://victoria-metrics:8428/health"

# Check Loki
curl -f "http://loki:3100/ready"

# Verify kube-state-metrics
kubectl get --raw /metrics
```

## Troubleshooting

Common issues and solutions:

1. **Metrics Not Collecting**
   * Verify service endpoints
   * Check scrape configurations
   * Review service monitors
   * Validate permissions

2. **Log Issues**
   * Check Loki status
   * Verify storage configuration
   * Review retention settings
   * Check network policies

## Next Steps

1. ✅ Set up metrics collection
2. ✅ Configure log aggregation
3. ➡️ Ready for [Platform Installation](/documentation/docs/launch-platform/self-hosted/installation-guide/platform-installation)

:::tip Need Help?
Contact [support@settlemint.com](mailto:support@settlemint.com) if you encounter any issues.
:::