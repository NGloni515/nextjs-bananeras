import styles from './page.module.css';
import { AppBar } from '../components/AppBar';

export default function Home() {
  return (
    <main className={styles.main}>
      <AppBar />
    </main>
  );
}
