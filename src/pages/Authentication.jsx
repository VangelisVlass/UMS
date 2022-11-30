import styles from './styles.module.css';
import { LogInForm } from '../components/forms/LogInForm';
import { SignUpForm } from '../components/forms/SignUpForm';

export function Authentication() {
  return (
    <div className={styles.flexColumn}>
      <div className={styles.container}>
        <LogInForm />
      </div>
      <div className={styles.container}>
        <SignUpForm />
      </div>
    </div>
  );
}
