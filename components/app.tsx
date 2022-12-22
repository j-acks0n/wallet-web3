import { ConnectButton } from "@rainbow-me/rainbowkit";
import { BigNumber } from "ethers";
import { useState } from "react";
import {
  useAccount,
  useBalance,
  useDisconnect,
  useNetwork,
  useSendTransaction,
} from "wagmi";

export const App = () => {
  const { address } = useAccount();
  const { data } = useBalance({
    address,
  });
  const [showBalance, setShowBalance] = useState(false);
  const [showChainId, setShowChainId] = useState(false);
  const { chain } = useNetwork();

  const { sendTransaction } = useSendTransaction({
    mode: "recklesslyUnprepared",
    request: {
      to: address,
      value: BigNumber.from("10"),
    },
  });

  const { disconnect } = useDisconnect();

  const LoggedInView = (
    <div style={{ marginTop: "10px" }}>
      <div>
        <button className="button" onClick={() => setShowChainId(true)}>
          Get Chain ID
        </button>
        <button className="button" onClick={() => setShowBalance(true)}>
          Get balance
        </button>
        <button
          className="button"
          disabled={!sendTransaction}
          onClick={() => sendTransaction()}
        >
          Send Transaction
        </button>
        <button className="button" onClick={() => disconnect()}>
          Log out
        </button>
      </div>
      <div style={{ marginTop: "10px", textAlign: "center" }}>
        {showChainId && (
          <div style={{ padding: "10px" }}>Chain ID: {chain?.id}</div>
        )}
        {showBalance && (
          <div>
            Balance: {data?.formatted} {data?.symbol}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <ConnectButton showBalance={false} />

      {address && LoggedInView}
    </>
  );
};
