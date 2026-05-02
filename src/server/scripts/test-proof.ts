import { generateProof } from "@/server/zk/generateProof";

async function main() {
  const content = "hello from chicago";

  console.log("Generating proof for:", content);

  const result = await generateProof(content);

  console.log("\n=== Generated Proof ===");
  console.log("pA:", result.pA);
  console.log("pB:", result.pB);
  console.log("pC:", result.pC);
  console.log("nullifierHash:", result.nullifierHash);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
