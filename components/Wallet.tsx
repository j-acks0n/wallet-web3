import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from './Button';
import styles from '../styles/Wallet.module.css';
import { Balance } from './Balance';
import { UseWallet } from '../hooks';

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
        </div>
      ) : null}
    </>
  );
};
