"use client";

import { Contract } from "@/server/contracts/zkmessage";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type ProofResponse = {
  pA: [string, string];
  pB: [[string, string], [string, string]];
  pC: [string, string];
  nullifierHash: string;
};

function uint256PairFromStrings(pair: readonly [string, string]) {
  return [BigInt(pair[0]), BigInt(pair[1])] as const;
}

function uint256Pair2FromStrings(
  m: readonly [readonly [string, string], readonly [string, string]],
) {
  return [uint256PairFromStrings(m[0]), uint256PairFromStrings(m[1])] as const;
}

export function SendMessage() {
  const [recipient, setRecipient] = useState("");
  const [content, setContent] = useState("");
  const [isGeneratingProof, setIsGeneratingProof] = useState(false);

  const { mutate: sendTransaction, isPending } = useSendTransaction();

  const handleSendMessage = async () => {
    if (!recipient || !content) {
      alert("Please enter recipient and message content");
      return;
    }

    try {
      setIsGeneratingProof(true);

      const res = await fetch("/api/generate-proof", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      const text = await res.text();

      if (!res.ok) {
        console.error("Backend error:", text);
        throw new Error("Failed to generate proof");
      }

      const proofData: ProofResponse = JSON.parse(text);

      const transaction = prepareContractCall({
        contract: Contract,
        method:
          "function sendMessageWithProof(address _to, string _content, uint256[2] _pA, uint256[2][2] _pB, uint256[2] _pC, uint256 _nullifierHash)",
        params: [
          recipient,
          content,
          uint256PairFromStrings(proofData.pA),
          uint256Pair2FromStrings(proofData.pB),
          uint256PairFromStrings(proofData.pC),
          BigInt(proofData.nullifierHash),
        ],
      });

      sendTransaction(transaction, {
        onSuccess: () => {
          setRecipient("");
          setContent("");
          console.log("Message sent successfully");
        },
        onError: (error) => {
          console.error("Transaction failed:", error);
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsGeneratingProof(false);
    }
  };

  const loading = isGeneratingProof || isPending;

  return (
    <div className="flex flex-col items-center mt-8 w-full">
      <h1 className="text-4xl font-bold mb-6">Send Message</h1>

      <div className="flex flex-col gap-6 w-full max-w-lg">
        <Input
          type="text"
          placeholder="Recipient Address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />

        <Textarea
          placeholder="Message Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <Button
          onClick={handleSendMessage}
          disabled={loading}
          className="bg-white text-black hover:bg-zinc-200 disabled:opacity-60 disabled:cursor-not-allowed px-4 py-2 font-semibold rounded-lg shadow-md transition-all duration-300"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="animate-spin" />
              {isGeneratingProof ? "Generating Proof..." : "Sending..."}
            </div>
          ) : (
            "Send Message"
          )}
        </Button>
      </div>
    </div>
  );
}
