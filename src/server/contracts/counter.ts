import { ethereum } from "thirdweb/chains";
import { client } from "..";

export const myChain = ethereum;

export const contractAddress = "0x5feD8a97808977ee6d8fE0c5996c216a7599df46";
export const contractABI = [
  {
    inputs: [],
    name: "count",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decrement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "increment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export const CONTRACT = {
  client: client,
  chain: myChain,
  address: contractAddress,
  abi: contractABI,
};
