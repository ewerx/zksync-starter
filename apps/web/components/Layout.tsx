import { ReactNode } from "react";
import Head from "next/head";
import { Card } from "ui";
import { ConnectButton } from "@rainbow-me/rainbowkit";

type Props = {
  children: ReactNode;
};

const CARD_CONTENT = [
  {
    title: "⚡ zkSync Era",
    href: "https://era.zksync.io/docs/dev/",
    cta: "zkSync Web3 SDK and Hardhat plugins",
  },
  {
    title: "⚡ Local L2 Network",
    href: "https://era.zksync.io/docs/api/hardhat/testing.html",
    cta: "Spin up a local network for testing",
  },
  {
    title: "⚡ Next.js",
    href: "https://nextjs.org/",
    cta: "React app with wagmi, RainbowKit, TailwindCSS",
  },
  {
    title: "⚡ Turborepo",
    href: "https://turbo.build/",
    cta: "Share configuration and dependencies",
  },
];

const Layout = ({ children }: Props) => (
  <div className="flex min-h-screen flex-col items-center justify-center py-2">
    <Head>
      <title>zkSync Quickstart</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>
        <h1 className="mx-auto text-center text-6xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-7xl">
          Web
          <span className="block bg-gradient-to-r from-brandred to-brandblue bg-clip-text text-transparent px-2">
            zkSync Quickstart Template
          </span>
        </h1>
        <div className="mx-auto mt-5 max-w-xl sm:flex sm:justify-center md:mt-8">
          <ConnectButton />
        </div>
      </nav>
    </header>
    <main className="mx-auto w-auto px-4 pt-16 pb-8 sm:pt-24 lg:px-8">
      <div className="mx-auto mt-5 max-w-xl sm:flex sm:justify-center md:mt">
        {children}
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-4 gap-4 place-content-evenly">
        {CARD_CONTENT.map((card) => (
          <Card key={card.title} {...card} />
        ))}
      </div>
    </main>
    <footer></footer>
  </div>
);

export default Layout;
