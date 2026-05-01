import { NextResponse } from "next/server";
import { generateProof } from "@/server/zk/generateProof";

export async function POST(req: Request) {
  const { content } = await req.json();

  const proof = await generateProof(content);

  return NextResponse.json(proof);
}
