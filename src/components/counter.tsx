import { CONTRACT } from "@/server/contracts/counter";
import { prepareContractCall } from "thirdweb";
import { TransactionButton, useReadContract } from "thirdweb/react";

export function Counter() {
  const {
    data: count,
    isLoading: loadingCount,
    refetch,
  } = useReadContract({
    contract: CONTRACT,
    method: "getCount",
  });

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-4xl font-bold mb-4">Counter</h1>
      {loadingCount ? (
        <h2 className="text-2xl ">...loading</h2>
      ) : (
        <h2 className="text-3xl font-semibold">{count?.toString()}</h2>
      )}
      <div className="flex justify-center gap-4 mt-6">
        <TransactionButton
          transaction={() =>
            prepareContractCall({
              contract: CONTRACT,
              method: "decrement",
            })
          }
          onTransactionConfirmed={() => refetch()}
          onTransactionSent={() => console.log("decrementing")}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-all duration-300"
        >
          -
        </TransactionButton>
        <TransactionButton
          transaction={() =>
            prepareContractCall({
              contract: CONTRACT,
              method: "increment",
            })
          }
          onTransactionConfirmed={() => refetch()}
          onTransactionSent={() => console.log("incrementing")}
          className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-all duration-300"
        >
          +
        </TransactionButton>
      </div>
    </div>
  );
}
