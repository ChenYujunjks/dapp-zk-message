import { groth16 } from "snarkjs";
import { buildPoseidon } from "circomlibjs";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";

const FIELD_SIZE = BigInt(
  "21888242871839275222246405745257275088548364400416034343698204186575808495617",
);
const LEAVES = ["100", "101", "102", "103", "104", "105", "106", "107"];
const LEAF_INDEX = 2;
const NULLIFIER = "9002";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const wasmPath = path.join(__dirname, "circuit/merkle_message.wasm");
const zkeyPath = path.join(__dirname, "circuit/merkle_message_final.zkey");

type PoseidonContext = Awaited<ReturnType<typeof buildPoseidon>>;
type MerkleContext = {
  hash2: (a: string, b: string) => string;
  leaf: string;
  pathElements: string[];
  pathIndices: string[];
  root: string;
};

let merkleContextPromise: Promise<MerkleContext> | undefined;

function sha256ToField(text: string): string {
  const hex = crypto.createHash("sha256").update(text, "utf8").digest("hex");
  return (BigInt("0x" + hex) % FIELD_SIZE).toString();
}

async function getMerkleContext(): Promise<MerkleContext> {
  if (merkleContextPromise) {
    return merkleContextPromise;
  }

  merkleContextPromise = (async () => {
    const poseidon: PoseidonContext = await buildPoseidon();
    const F = poseidon.F;

    const hash2 = (a: string, b: string): string => {
      return F.toObject(poseidon([BigInt(a), BigInt(b)])).toString();
    };

    const level1 = [
      hash2(LEAVES[0], LEAVES[1]),
      hash2(LEAVES[2], LEAVES[3]),
      hash2(LEAVES[4], LEAVES[5]),
      hash2(LEAVES[6], LEAVES[7]),
    ];

    const level2 = [hash2(level1[0], level1[1]), hash2(level1[2], level1[3])];

    const root = hash2(level2[0], level2[1]);

    return {
      hash2,
      leaf: LEAVES[LEAF_INDEX],
      pathElements: [LEAVES[3], level1[0], level2[1]],
      pathIndices: ["0", "1", "0"],
      root,
    };
  })();

  return merkleContextPromise;
}

export async function generateProof(content: string) {
  const { hash2, leaf, pathElements, pathIndices, root } =
    await getMerkleContext();

  const messageHash = sha256ToField(content);

  const nullifierHash = hash2(NULLIFIER, messageHash);

  const input = {
    leaf,
    pathElements,
    pathIndices,
    nullifier: NULLIFIER,
    root,
    messageHash,
    nullifierHash,
  };

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
