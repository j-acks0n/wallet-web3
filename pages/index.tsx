import type { NextPage } from 'next';
import Head from 'next/head';
import { Wallet } from '../components';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Web 3 Wallet</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Wallet />
      </main>
    </>
  );
};

export default Home;
