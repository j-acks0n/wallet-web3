import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from './Button';
import styles from '../styles/Wallet.module.css';
import { Balance } from './Balance';
import { UseWallet } from '../hooks';
import { useEffect, useRef, useState } from 'react';

export const Wallet = () => {
  const {
    address,
    showBalance,
    setShowBalance,
    showChainId,
    setShowChainId,
    chain,
    sendTransaction,
    disconnect,
  } = UseWallet();

  const previousState = useRef<`0x${string}` | null>(null);

  useEffect(() => {
    // Execution 1 previous wallet is null and we want to set it to the current address
    // From Execution 2 onwards, we want to save the current address as the previous
    if (address) {
      previousState.current = address;
    }
  }, [address]);

  return (
    <>
      <ConnectButton label={'Log in'} showBalance={false} />
      {address ? (
        <div className={styles.LoggedInViewWrapper}>
          <div className={styles.buttonGroupWrapper}>
            <Button onClick={() => setShowChainId(true)}>Get Chain ID</Button>
            <Button onClick={() => setShowBalance(true)}>Get balance</Button>
            <Button onClick={() => sendTransaction()}>Send Transaction</Button>
            <Button onClick={() => disconnect()}>Log out</Button>
          </div>
          <div className={styles.info}>
            {showChainId && chain ? <div>Chain ID: {chain.id}</div> : null}
            {showBalance ? <Balance address={address} /> : null}
          </div>
          {previousState ? (
            <div>
              <div>Previous wallet: {previousState.current}</div>
              <div>Current wallet: {address}</div>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
};
