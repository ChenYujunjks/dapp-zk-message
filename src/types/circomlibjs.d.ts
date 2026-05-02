declare module "circomlibjs" {
  type PoseidonInput = bigint | number | string;

  interface PoseidonField {
    toObject(value: unknown): bigint;
  }

  interface PoseidonHash {
    (inputs: PoseidonInput[]): unknown;
    F: PoseidonField;
  }

  export function buildPoseidon(): Promise<PoseidonHash>;
}
