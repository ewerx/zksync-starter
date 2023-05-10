# zkSync Turborepo Starter

A zkSync + Next.js Turborepo starter kit to quickly ship L2 Web3 apps.

<img width="800" alt="screenshot" src="https://github.com/ewerx/zksync-starter/assets/671604/3a3de31a-4984-4246-947b-d8894c343b2a">

## What's inside?

### Apps

- `web`: a [Next.js](https://nextjs.org/) app with:
  - [zkSync Web3 SDK](https://era.zksync.io/docs/api/js/)
  - [wagmi](https://wagmi.sh/)
  - [RainbowKit](https://www.rainbowkit.com/)
  - [ethers.js](https://github.com/ethers-io/ethers.js/)
- `contracts`: a [Hardhat](https://hardhat.org/) project with:
  - [zkSync Hardhat plugins](https://era.zksync.io/docs/api/hardhat/)
  - [TypeChain](https://github.com/dethcrypto/TypeChain)
  - chai/mocha for testing

### Packages

- `generated`: for sharing smart contract artifacts
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: shared config
- `tailwind-config`: `tailwind.config.js`: shared config

### Developer Experience

- [TypeScript](https://www.typescriptlang.org/)
- [pnpm](https://pnpm.io/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io)
- [TailwindCSS](https://tailwindcss.com/)
- [Typechain](https://github.com/dethcrypto/TypeChain)

## Get Started

Install [pnpm](https://pnpm.io/) if you don't have it already:

```sh
npm install -g pnpm
```

Install dependencies:

```sh
cd zksync-starter
pnpm install
```

Start the web app:

```sh
turbo dev
```

#### Run all tests

```sh
turbo test
```

> ℹ️ You can run commands in the root of the repo or in any of the apps or packages. See `turbo.json` for monorepo configuration. `pnpm run` to see available commands.

## Contract Development

### Start Local Network

Requires [Docker](https://www.docker.com/), see https://github.com/matter-labs/local-setup for more info.

```sh
turbo node
```

### Compile

```sh
turbo compile
```

### Deploy

Edit `apps/contracts/hardhat.config.ts` to set RPC URL and deployer private key.

```sh
turbo deploy
```

## Resources

This starter kit is based on:

- [create-web3-turbo](https://github.com/memoriaXII/create-web3-turbo)
- [zkSync Quickstart Tutorial](https://era.zksync.io/docs/dev/building-on-zksync/hello-world.html)

### zkSync

- https://era.zksync.io/docs/
