declare module "snarkjs" {
  export interface Groth16Proof {
    pi_a: [string, string, string];
    pi_b: [[string, string], [string, string], [string, string]];
    pi_c: [string, string, string];
    protocol: string;
    curve: string;
  }

  export interface Groth16 {
    fullProve(
      input: Record<string, unknown>,
      wasmFile: string,
      zkeyFile: string,
    ): Promise<{
      proof: Groth16Proof;
      publicSignals: string[];
    }>;
  }

  export const groth16: Groth16;
}
