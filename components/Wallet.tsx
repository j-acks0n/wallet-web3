import { ConnectButton } from '@rainbow-me/rainbowkit';
import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import {
  useAccount,
  useBalance,
  useDisconnect,
  useNetwork,
  useSendTransaction,
} from 'wagmi';
import { Button } from './Button';
import styles from '../styles/Wallet.module.css';

export const Wallet = () => {
  const { address } = useAccount();
  const { data: balance } = useBalance({
    address,
  });
  const [showBalance, setShowBalance] = useState<boolean>();
  const [showChainId, setShowChainId] = useState<boolean>();
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

  const LoggedInView = (
    <div className={styles.LoggedInViewWrapper}>
      <div className={styles.buttonGroupWrapper}>
        <Button onClick={() => setShowChainId(true)}>Get Chain ID</Button>
        <Button onClick={() => setShowBalance(true)}>Get balance</Button>
        <Button onClick={() => sendTransaction()}>Send Transaction</Button>
        <Button onClick={() => disconnect()}>Log out</Button>
      </div>
      <div className={styles.info}>
        {showChainId && chain ? <div>Chain ID: {chain.id}</div> : null}
        {showBalance && balance ? (
          <div>
            Balance: {balance.formatted} {balance.symbol}
          </div>
        ) : null}
      </div>
    </div>
  );

  return (
    <>
      <ConnectButton label={'Log in'} showBalance={false} />

      {address ? LoggedInView : null}
    </>
  );
};
