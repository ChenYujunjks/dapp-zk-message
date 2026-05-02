import { generateProof } from "@/server/zk/generateProof";
import { groth16 } from "snarkjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

async function main() {
  const result = await generateProof("hello from chicago");

  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const vkeyPath = path.join(scriptDir, "../zk/circuit/verification_key.json");

  const vkey = JSON.parse(fs.readFileSync(vkeyPath, "utf-8"));

  const ok = await groth16.verify(vkey, result.publicSignals, result.proof);

  console.log("root:", result.root);
  console.log("messageHash:", result.messageHash);
  console.log("nullifierHash:", result.nullifierHash);
  console.log("publicSignals:", result.publicSignals);
  console.log("verify result:", ok);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
