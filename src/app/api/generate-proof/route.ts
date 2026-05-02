export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { generateProof } from "@/server/zk/generateProof";

export async function POST(req: Request) {
  const { content } = await req.json();

  const { pA, pB, pC, nullifierHash } = await generateProof(content);

  return NextResponse.json({
    pA,
    pB,
    pC,
    nullifierHash,
  });
}
