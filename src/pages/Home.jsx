import styles from './styles.module.css';
import { FullForm } from '../components/forms/FullForm';

export function Home() {


  return (
    <div className={styles.flexColumn}>
      <div className={styles.container}>
        <FullForm />
      </div>
    </div>
  );
}
