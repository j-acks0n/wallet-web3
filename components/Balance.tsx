import { GetAccountResult, Provider } from '@wagmi/core';
import { useBalance } from 'wagmi';

export interface BalanceProps {
  address: GetAccountResult<Provider>['address'];
}

export const Balance = ({ address }: BalanceProps) => {
  const { data: balance } = useBalance({
    address,
  });
  return balance ? (
    <div>
      Balance: {balance.formatted} {balance.symbol}
    </div>
  ) : null;
};
