import { BigNumber } from 'ethers';
import { useState, useEffect } from 'react';
import {
  useAccount,
  useNetwork,
  useSendTransaction,
  useDisconnect,
} from 'wagmi';

export const UseWallet = () => {
  const { address } = useAccount();
  const [showBalance, setShowBalance] = useState<boolean>(false);
  const [showChainId, setShowChainId] = useState<boolean>(false);
  const { chain } = useNetwork();

  const { sendTransaction } = useSendTransaction({
    mode: 'recklesslyUnprepared',
    request: {
      to: address,
      value: BigNumber.from('0'),
    },
  });

  const { disconnect } = useDisconnect();

  useEffect(() => {
    setShowBalance(false);
    setShowChainId(false);
  }, [address]);

  return {
    address,
    showBalance,
    setShowBalance,
    showChainId,
    setShowChainId,
    chain,
    sendTransaction,
    disconnect,
  };
};
