"use client";

import {
  createAppKit,
  Metadata,
  useAppKitAccount,
  useAppKitNetwork,
  useAppKitProvider,
  useAppKit,
} from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { AppKitNetwork } from "@reown/appkit/networks";
import { defineChain } from "viem";
import { createContext, useContext, useEffect, useState, useMemo } from "react";
import {
  Eip1193Provider,
  BrowserProvider,
  JsonRpcSigner,
  JsonRpcProvider,
} from "ethers";
import { useWeb3Store } from "@/stores/web3";

// ============================================================================
// TYPES
// ============================================================================

type AppMode = "development" | "testnet" | "production";

type Web3ContextType = {
  open: () => void;
  address: string | undefined;
  isConnected: boolean;
  ethersProvider: BrowserProvider | undefined;
  defaultProvider: JsonRpcProvider;
  signer: JsonRpcSigner | null;
  chainId: number;
};

// ============================================================================
// NETWORK CONFIGURATION
// ============================================================================
export const bscTestnet = /*#__PURE__*/ defineChain({
  id: 97,
  name: "BNB Smart Chain Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "BNB",
    symbol: "tBNB",
  },
  rpcUrls: {
    default: { http: ["https://bsc-testnet-dataseed.bnbchain.org"] },
  },
  blockExplorers: {
    default: {
      name: "BscScan",
      url: "https://testnet.bscscan.com",
      apiUrl: "https://api-testnet.bscscan.com/api",
    },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 17422483,
    },
  },
  testnet: true,
});

export const bsc = defineChain({
  id: 56,
  name: "BNB Smart Chain",
  blockTime: 750,
  nativeCurrency: {
    decimals: 18,
    name: "BNB",
    symbol: "BNB",
  },
  rpcUrls: {
    default: { http: ["https://bsc-dataseed.bnbchain.org"] },
  },
  blockExplorers: {
    default: {
      name: "BscScan",
      url: "https://bscscan.com",
      apiUrl: "https://api.bscscan.com/api",
    },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 15921452,
    },
  },
});

export const localhost = defineChain({
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

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get current app mode from environment
 */
const getAppMode = (): AppMode => {
  const mode = process.env.NEXT_PUBLIC_MODE;
  if (mode === "development" || mode === "testnet") return mode;
  return "production";
};

/**
 * Get network by app mode
 */
const getNetworkByMode = (mode: AppMode) => {
  switch (mode) {
    case "development":
      return localhost;
    case "testnet":
      return bscTestnet;
    case "production":
    default:
      return bsc;
  }
};

/**
 * Get all available networks
 */
const getAllNetworks: [AppKitNetwork, ...AppKitNetwork[]] = [
  bsc,
  bscTestnet,
  localhost,
];

// ============================================================================
// APP CONFIGURATION
// ============================================================================

const projectId: string = String(process.env.NEXT_PUBLIC_REOWN_PROJECT_ID);

const metadata: Metadata = {
  name: String(process.env.NEXT_PUBLIC_REOWN_NAME),
  description: String(process.env.NEXT_PUBLIC_REOWN_DESCRIPTION),
  url: String(process.env.NEXT_PUBLIC_REOWN_URL),
  icons: [String(process.env.NEXT_PUBLIC_REOWN_ICON)],
};

const APP_MODE = getAppMode();

const defaultNetwork = getNetworkByMode(APP_MODE);
const defaultProvider = new JsonRpcProvider(
  defaultNetwork.rpcUrls.default.http[0]
);

// Initialize AppKit instance (only on client side)
createAppKit({
  adapters: [new EthersAdapter()],
  enableCoinbase: false,
  metadata,
  networks: getAllNetworks,
  defaultNetwork,
  projectId,
  features: {
    socials: false,
    email: false,
    onramp: false,
    swaps: false,
    analytics: false,
    emailShowWallets: true,
  },
});

// ============================================================================
// PROVIDER COMPONENT
// ============================================================================

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export function Web3Provider({ children }: { children: React.ReactNode }) {
  // Zustand store
  const { setWalletAddress, setIsConnected, setSelectedChainId } =
    useWeb3Store();

  // Local state
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [ethersProvider, setEthersProvider] = useState<BrowserProvider>();

  // AppKit hooks
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider<Eip1193Provider>("eip155");
  const { chainId } = useAppKitNetwork();

  // Initialize ethers provider from wallet provider
  useEffect(() => {
    if (walletProvider) {
      const provider = new BrowserProvider(walletProvider);
      setEthersProvider(provider);
    }
  }, [walletProvider]);

  // Get signer when ethersProvider is available
  useEffect(() => {
    const initializeSigner = async () => {
      if (ethersProvider) {
        try {
          // Get signer
          const newSigner = await ethersProvider.getSigner();
          setSigner(newSigner);
        } catch (error) {
          console.error("Error initializing signer:", error);
          setSigner(null);
        }
      } else {
        setSigner(null);
      }
    };

    initializeSigner();
  }, [ethersProvider]);

  // Auto switch network to match MODE when connected
  useEffect(() => {
    const switchToDefaultNetwork = async () => {
      if (isConnected && chainId && walletProvider) {
        const currentChainId = Number(chainId);
        const expectedChainId = defaultNetwork.id;

        // If connected to wrong network, switch to default network
        if (currentChainId !== expectedChainId) {
          try {
            // Try to switch network
            const chainIdHex = `0x${expectedChainId.toString(16)}`;
            await walletProvider.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: chainIdHex }],
            });
          } catch (switchError: any) {
            // If network not added, add it
            if (switchError.code === 4902) {
              try {
                await walletProvider.request({
                  method: "wallet_addEthereumChain",
                  params: [
                    {
                      chainId: `0x${expectedChainId.toString(16)}`,
                      chainName: defaultNetwork.name,
                      nativeCurrency: {
                        name: defaultNetwork.nativeCurrency.name,
                        symbol: defaultNetwork.nativeCurrency.symbol,
                        decimals: defaultNetwork.nativeCurrency.decimals,
                      },
                      rpcUrls: defaultNetwork.rpcUrls.default.http,
                      blockExplorerUrls: defaultNetwork.blockExplorers
                        ? [defaultNetwork.blockExplorers.default.url]
                        : undefined,
                    },
                  ],
                });
              } catch (addError) {
                console.error("Error adding network:", addError);
              }
            } else {
              console.error("Error switching network:", switchError);
              // User might have rejected the switch, that's okay
            }
          }
        }
      }
    };

    switchToDefaultNetwork();
  }, [isConnected, chainId, walletProvider]);

  // Update store when signer or chain changes
  useEffect(() => {
    const updateStoreState = async () => {
      if (signer) {
        try {
          const address = await signer.getAddress();
          setWalletAddress(address);
          setIsConnected(true);
        } catch (error) {
          console.error("Error getting signer address:", error);
          setIsConnected(false);
        }
      } else {
        setIsConnected(false);
      }

      setSelectedChainId(chainId || 0);
    };

    updateStoreState();
  }, [signer, chainId, setWalletAddress, setIsConnected, setSelectedChainId]);

  // Memoized context value to prevent unnecessary re-renders
  const contextValue = useMemo<Web3ContextType>(
    () => ({
      open,
      address,
      isConnected: isConnected ?? false,
      ethersProvider,
      signer,
      defaultProvider,
      chainId: Number(chainId) || 0,
    }),
    [open, address, isConnected, ethersProvider, signer, chainId]
  );

  return (
    <Web3Context.Provider value={contextValue}>{children}</Web3Context.Provider>
  );
}

// ============================================================================
// CUSTOM HOOK
// ============================================================================

/**
 * Hook to access Web3 context
 * Must be used within Web3Provider
 *
 * @example
 * const { address, isConnected, signer, open } = useWeb3();
 */
export function useWeb3() {
  const context = useContext(Web3Context);

  if (!context) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }

  return context;
}
