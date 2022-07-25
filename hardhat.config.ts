import * as dotenv from "dotenv";

import {HardhatUserConfig} from 'hardhat/types';
import "@nomiclabs/hardhat-etherscan";
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';

dotenv.config();

const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
    },
    namedAccounts: {
        deployer: 0,
        tokenOwner: 1,
    },
    networks: {
      "bsc-testnet": {
        url: process.env.BSC_TESTNET_URL || "",
        accounts:
          process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      },
    },
    etherscan: {
      apiKey: process.env.ETHERSCAN_API_KEY,
    },
};

export default config;
