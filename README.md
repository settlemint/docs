<p align="center">
  <img src="https://github.com/settlemint/sdk/blob/main/logo.svg" width="200px" align="center" alt="SettleMint logo" />
  <h1 align="center">SettleMint - Documentation</h1>
  <p align="center">
    ✨ <a href="https://settlemint.com">https://settlemint.com</a> ✨
    <br/>
    Get going with SettleMint in minutes.
  </p>
</p>
<br/>
<p align="center">
<a href="https://github.com/settlemint/docs/actions?query=branch%3Amain"><img src="https://github.com/settlemint/docs/actions/workflows/branch.yml/badge.svg?event=push&branch=main" alt="CI status" /></a>
<a href="https://github.com/settlemint/docs" rel="nofollow"><img src="https://img.shields.io/github/stars/settlemint/docs" alt="stars"></a>
</p>

<div align="center">
  <a href="https://console.settlemint.com/documentation/">Documentation</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/settlemint/docs/issues">Issues</a>
  <br />
</div>

### Prerequisites

Make sure you have [Bun](https://bun.sh/) installed on your system. If not, you
can install it by running:

```bash
curl -fsSL https://bun.sh/install | bash
```

### Installation

1. Clone the repository:

```bash
git clone https://github.com/settlemint/docs
cd yourproject
```

2. Install dependencies:

```bash
bun install
```

## Available Scripts

In the project directory, you can run:

### Development

```bash
bun run dev
```

This starts the development server with hot-reload enabled. Navigate to
/documentation

### Build

```bash
bun run build
```

This command builds the application for production use.

### Production

```bash
bun run start
```

Runs the built application in production mode.

## Troubleshooting

If you encounter any issues:

1. Make sure Bun is up to date:

```bash
bun upgrade
```

2. Clear Bun's cache:

```bash
rm -rf node_modules
rm bun.lockb
bun install
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
