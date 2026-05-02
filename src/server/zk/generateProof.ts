import { groth16 } from "snarkjs";
import { buildPoseidon } from "circomlibjs";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";

const FIELD_SIZE = BigInt(
  "21888242871839275222246405745257275088548364400416034343698204186575808495617",
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function sha256ToField(text: string): string {
  const hex = crypto.createHash("sha256").update(text, "utf8").digest("hex");
  return (BigInt("0x" + hex) % FIELD_SIZE).toString();
}

export async function generateProof(content: string) {
  const poseidon = await buildPoseidon();
  const F = poseidon.F;

  const leaves = ["100", "101", "102", "103", "104", "105", "106", "107"];
  const index = 2;
  const leaf = leaves[index];

  const hash2 = (a: string, b: string): string => {
    return F.toObject(poseidon([BigInt(a), BigInt(b)])).toString();
  };

  const level1 = [
    hash2(leaves[0], leaves[1]),
    hash2(leaves[2], leaves[3]),
    hash2(leaves[4], leaves[5]),
    hash2(leaves[6], leaves[7]),
  ];

  const level2 = [hash2(level1[0], level1[1]), hash2(level1[2], level1[3])];

  const root = hash2(level2[0], level2[1]);

  const pathElements = [leaves[3], level1[0], level2[1]];
  const pathIndices = ["0", "1", "0"];

  const messageHash = sha256ToField(content);

  const nullifier = "9002";
  const nullifierHash = hash2(nullifier, messageHash);

  const input = {
    leaf,
    pathElements,
    pathIndices,
    nullifier,
    root,
    messageHash,
    nullifierHash,
  };

  const wasmPath = path.join(__dirname, "circuit/merkle_message.wasm");
  const zkeyPath = path.join(__dirname, "circuit/merkle_message_final.zkey");

  const { proof, publicSignals } = await groth16.fullProve(
    input,
    wasmPath,
    zkeyPath,
  );

  const pA: [string, string] = [proof.pi_a[0], proof.pi_a[1]];

  // snarkjs pi_b needs to be reversed for Solidity verifier
  const pB: [[string, string], [string, string]] = [
    [proof.pi_b[0][1], proof.pi_b[0][0]],
    [proof.pi_b[1][1], proof.pi_b[1][0]],
  ];

  const pC: [string, string] = [proof.pi_c[0], proof.pi_c[1]];

  return {
    proof,
    pA,
    pB,
    pC,
    nullifierHash,
    publicSignals,
    root,
    messageHash,
  };
}
