import styles from './styles.module.css';
import { ChangePasswordForm } from "../components/forms/ChangePasswordForm";

export function ChangePassword() {
    return (
        <div className={styles.flexColumn}>
          <div className={styles.container}>
            <ChangePasswordForm />
          </div>
        </div>
      );
}