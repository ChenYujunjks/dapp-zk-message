"use client";
import Link from "next/link";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client } from "@/server";

import { GetAddress } from "@/components/getAddressButton";
import { Header } from "@/components/header";
export default function Home() {
  // 使用 useActiveAccount 钩子来检查用户是否已连接钱包
  const activeAccount = useActiveAccount();

  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="py-20">
        <Header />
        <div className="flex flex-col items-center mb-20">
          {/* ConnectButton  */}
          <ConnectButton
            client={client}
            //chain={myChain}
            appMetadata={{
              name: "Example App",
              url: "localhost:3000",
            }}
          />
          {/* 只有在钱包连接后才显示 ActiveAcc 组件和导航按钮 */}
          {activeAccount && (
            <>
              <GetAddress />
              <Link
                href="/message"
                className="mt-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300"
              >
                Go to Message Page
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
