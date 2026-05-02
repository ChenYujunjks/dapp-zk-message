import { groth16 } from "snarkjs";
import fs from "fs";

async function main() {
  const vkey = JSON.parse(
    fs.readFileSync("server/zk/circuit/verification_key.json", "utf-8")
  );

  const proofData = JSON.parse(
    fs.readFileSync("build/merkle_message_proof.json", "utf-8")
  );

  const publicSignals = JSON.parse(
    fs.readFileSync("build/merkle_message_public.json", "utf-8")
  );

  const ok = await groth16.verify(vkey, publicSignals, proofData);

  console.log("verify result:", ok);
}

main();