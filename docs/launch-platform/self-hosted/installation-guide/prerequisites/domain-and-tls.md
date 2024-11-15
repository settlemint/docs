---
title: Domain and TLS Configuration
sidebar_position: 4
---

# Domain and TLS Configuration

## Domain Name Requirements

### Domain Setup
1. Register a domain or use existing domain
2. Create necessary DNS records:
   - Main platform domain
   - API subdomain
   - Service subdomains

### DNS Configuration
- A records or CNAME records pointing to your infrastructure
- Wildcard DNS record (recommended)
- TTL settings considerations

## TLS Certificate Options

### Option 1: Let's Encrypt with cert-manager

1. Install cert-manager in your cluster: 