import styles from '../styles/Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}
export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
};
