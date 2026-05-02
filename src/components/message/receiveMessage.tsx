"use client";
import { Contract } from "@/server/contracts/zkmessage";
import { useReadContract } from "thirdweb/react";
import { useActiveAccount } from "thirdweb/react";

export function ReceiveMessage() {
  const activeAccount = useActiveAccount();
  const walletAddress = activeAccount?.address;

  const {
    data: messages,
    isLoading,
    refetch,
    isFetching,
  } = useReadContract({
    contract: Contract,
    method:
      "function receiveMessagesContentWithSender(address _address) view returns (string[], address[])",
    params: walletAddress
      ? [walletAddress]
      : ["0x0000000000000000000000000000000000000000"],
  });

  console.log("reading address:", walletAddress);
  console.log("messages:", messages);

  const parsedMessages = messages as [string[], string[]] | undefined;

  return (
    <div>
      {!walletAddress && <div>Please connect wallet</div>}

      {parsedMessages && parsedMessages[0].length > 0 ? (
        parsedMessages[0].map((msg, i) => (
          <div key={i}>
            <p>From: {parsedMessages[1][i]}</p>
            <p>Message: {msg}</p>
          </div>
        ))
      ) : (
        <div>No messages</div>
      )}
    </div>
  );
}
