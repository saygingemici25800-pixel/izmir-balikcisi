'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { loginAction } from '../actions';
import styles from '../admin.module.css';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`} disabled={pending}>
      {pending ? 'Giriş yapılıyor…' : 'Giriş Yap'}
    </button>
  );
}

export default function LoginPage() {
  const [error, formAction] = useFormState(loginAction, null);

  return (
    <div className={styles.loginWrap}>
      <form action={formAction} className={styles.loginCard}>
        <div className={styles.loginMark} aria-hidden />
        <h1 className={styles.loginTitle}>Yönetim Paneli</h1>
        <p className={styles.loginSub}>
          Menü ve mevsim balıklarını güncellemek için giriş yapın.
        </p>

        {error && <p className={styles.error}>{error}</p>}

        <label className={styles.label} htmlFor="pw">Şifre</label>
        <input
          id="pw"
          name="password"
          type="password"
          className={styles.input}
          autoComplete="current-password"
          autoFocus
          required
        />
        <SubmitButton />
      </form>
    </div>
  );
}
