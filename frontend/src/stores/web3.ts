import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createAppKit, useAppKitProvider } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { AppKitNetwork, bscTestnet, bsc } from "@reown/appkit/networks";
import { defineChain } from "viem";
import { BrowserProvider, Eip1193Provider, JsonRpcProvider } from "ethers";

const localhost = defineChain({
  id: 31337,
  name: "Localhost",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: { http: ["http://127.0.0.1:8545"] },
  },
});

interface Web3Store {
  isConnected: boolean;
  selectedChainId: number | string;
  walletAddress: string;
  useAppKit: () => any;
  useSigner: () => any;
  useProvider: () => any;
  setIsConnected: (isConnected: boolean) => void;
  setWalletAddress: (walletAddress: string) => void;
  setSelectedChainId: (selectedChainId: number | string) => void;
}

export const useWeb3Store = create<Web3Store>()(
  persist(
    (set, get) => ({
      isConnected: false,
      selectedChainId: localhost.id,
      walletAddress: "",
      useAppKit: () => {
        const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || "";
        const metadata = {
          name: process.env.NEXT_PUBLIC_APP_TITLE || "",
          description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || "",
          url: process.env.NEXT_PUBLIC_APP_URL || "", // origin must match your domain & subdomain
          icons: [process.env.NEXT_PUBLIC_APP_ICON || ""],
        };
        const networks: [AppKitNetwork, ...AppKitNetwork[]] = [
          bsc,
          bscTestnet,
          localhost,
        ];
        let defaultNetwork = null;
        const mode = process.env.NEXT_PUBLIC_MODE;
        if (mode === "localhost") {
          defaultNetwork = localhost;
        } else if (mode === "testnet") {
          defaultNetwork = bscTestnet;
        } else {
          defaultNetwork = bsc;
        }
        set({ selectedChainId: defaultNetwork.id });
        return createAppKit({
          adapters: [new EthersAdapter()],
          networks,
          projectId,
          metadata,
          defaultNetwork,
          enableCoinbase: false,
          allWallets: "HIDE",
          features: {
            socials: false,
            email: false,
            onramp: false,
            swaps: false,
            analytics: false,
            emailShowWallets: true,
          },
        });
      },
      useSigner() {
        const { walletProvider, walletProviderType } =
          useAppKitProvider("eip155");
        if (!walletProvider) return null;
        return new BrowserProvider(<Eip1193Provider>walletProvider).getSigner();
      },
      useProvider() {
        const mode = process.env.NEXT_PUBLIC_MODE;
        let provider = null;
        if (mode === "localhost") {
          provider = localhost.rpcUrls.default.http[0];
        } else if (mode === "testnet") {
          provider = bscTestnet.rpcUrls.default.http[0];
        } else {
          provider = bsc.rpcUrls.default.http[0];
        }

        return new JsonRpcProvider(provider, undefined, {
          batchMaxCount: 1,
        });
      },
      setIsConnected: (isConnected: boolean) => {
        set({ isConnected });
      },
      setWalletAddress: (walletAddress: string) => {
        set({ walletAddress });
      },
      setSelectedChainId: (selectedChainId: number | string) => {
        set({ selectedChainId });
      },
    }),
    {
      name: "web3-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
