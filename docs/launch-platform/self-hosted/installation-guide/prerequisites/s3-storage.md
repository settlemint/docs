---
title: S3-Compatible Storage
sidebar_position: 5
---

# S3-Compatible Storage Setup

## Overview

The SettleMint Platform requires S3-compatible object storage for storing platform assets and blockchain data.

## Option 1: AWS S3

### Setup Steps
1. Create a new S3 bucket
2. Configure bucket policies:
   - Enable versioning
   - Configure lifecycle rules
   - Set up encryption

### IAM Configuration
1. Create IAM user with S3 access
2. Configure minimal required permissions: 