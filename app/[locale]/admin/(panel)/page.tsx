import { getContent } from '@/lib/content';
import { logoutAction } from '../actions';
import AdminEditor from '../_components/AdminEditor';
import styles from '../admin.module.css';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const content = await getContent();

  return (
    <>
      <header className={styles.topbar}>
        <span className={styles.brand}>
          <span className={styles.brandMark} aria-hidden /> İzmir Balıkçısı
          <span className={styles.crumb}>· Yönetim</span>
        </span>
        <div className={styles.actions}>
          <a className={styles.linkBtn} href="/" target="_blank" rel="noreferrer">
            Siteyi Gör ↗
          </a>
          <form action={logoutAction}>
            <button type="submit" className={styles.linkBtn}>Çıkış</button>
          </form>
        </div>
      </header>

      <main className={styles.wrap}>
        <h1 className={styles.h1}>İçerik Yönetimi</h1>
        <p className={styles.sub}>
          Menü ve mevsim balıklarını buradan düzenleyin. <strong>Kaydet</strong>'e
          bastığınızda değişiklikler siteye anında yansır.
        </p>
        <AdminEditor initial={content} />
      </main>
    </>
  );
}
