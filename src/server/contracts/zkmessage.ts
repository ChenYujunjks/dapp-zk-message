import { polygon } from "thirdweb/chains";
import { getContract } from "thirdweb";
import { client } from "..";

const myContractAddress = "0xBdB56E6AC59AB9f72Af3BC60c26d76DA23690DfD";

export const Contract = getContract({
  client,
  chain: polygon,
  address: myContractAddress,
});
