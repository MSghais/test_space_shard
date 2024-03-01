
interface ContractAddressByChain {
  erc721Factory?: string;
  erc20Factory?: string;
  mintErc721Factory?: string;
  mintErc20Factory?: string;
}

interface ChainAddresses {
  [chainId: string | number]: ContractAddressByChain;
}

export const CONTRACT_DEPLOYED: ChainAddresses = {
  1: {},
  5: {
    erc721Factory: "0xF664c06e95B89790Ff8339EaACEC2fAac49766a2",
    erc20Factory: "0x74fb8ac61288b3EDAA992d7450238cff9D2dD7A4",
  },

};

interface ChainAddressesTips {
  // [chainId: string | number]: TokenTips[]

  [chainId: string | number]: TokenTips[];
}

interface TokenTips {
  title?: string;
  image?: string;
  address?: string;
  value?: string;
}

export const TOKEN_TIPS: ChainAddressesTips = {
  1: [
    {
      title: "sDai",
      address: "0x83F20F44975D03b1b09e64809B757c47f942BEeA",
      value: "0x83F20F44975D03b1b09e64809B757c47f942BEeA",
    },
  ],
  5: [
  
    {
      title: "sDai",
      address: "0xD8134205b0328F5676aaeFb3B2a0DC15f4029d8C",
      value: "0xD8134205b0328F5676aaeFb3B2a0DC15f4029d8C",
      image: "/assets/spark.svg",
    },

  ],
  137: [
    {
      title: "APE",
      address: "0xb7b31a6bc18e48888545ce79e83e06003be70930",
      value: "0xb7b31a6bc18e48888545ce79e83e06003be70930",
      image: "/assets/apecoin.svg",
    },
  ],
  // Testnet BNB: 0x7D8d05D1fA924d360A4Db25d1c089211Fd90a76d
};
