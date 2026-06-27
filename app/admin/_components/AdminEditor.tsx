'use client';

import { useState, useTransition } from 'react';
import { saveContentAction } from '../actions';
import type { SiteContent, MenuCategory, MenuItem } from '@/lib/content';
import styles from '../admin.module.css';

const clone = <T,>(v: T): T => JSON.parse(JSON.stringify(v)) as T;

const emptyItem = (): MenuItem => ({ name: '', desc: '', price: '', unit: '₺', daily: false, tags: [], featured: false });
const emptyCat = (): MenuCategory => ({ id: '', title: 'Yeni Kategori', subtitle: '', items: [emptyItem()] });

export default function AdminEditor({ initial }: { initial: SiteContent }) {
  const [content, setContent] = useState<SiteContent>(() => clone(initial));
  const [dirty, setDirty] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [fishInput, setFishInput] = useState('');
  const [pending, start] = useTransition();

  const update = (fn: (c: SiteContent) => void) => {
    setContent((prev) => {
      const next = clone(prev);
      fn(next);
      return next;
    });
    setDirty(true);
    setMsg(null);
  };

  const save = () =>
    start(async () => {
      const res = await saveContentAction(content);
      if (res.ok) {
        setDirty(false);
        setMsg({ ok: true, text: 'Kaydedildi ✓ Site güncellendi.' });
      } else {
        setMsg({ ok: false, text: res.error || 'Bir hata oluştu.' });
      }
    });

  const addFish = () => {
    const v = fishInput.trim();
    if (!v) return;
    update((c) => { c.seasonal.fish.push(v); });
    setFishInput('');
  };

  return (
    <>
      {/* ── Mevsim Balıkları ─────────────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Mevsim <em>Balıkları</em></h2>
          <label className={styles.checkRow}>
            <input
              type="checkbox"
              checked={content.seasonal.active}
              onChange={(e) => update((c) => { c.seasonal.active = e.target.checked; })}
            />
            <span>Header'da göster</span>
          </label>
        </div>

        <div className={`${styles.row} ${styles.row2}`}>
          <div className={styles.field}>
            <label className={styles.label}>Başlık</label>
            <input
              className={styles.input}
              value={content.seasonal.title}
              onChange={(e) => update((c) => { c.seasonal.title = e.target.value; })}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Tarih Aralığı</label>
            <input
              className={styles.input}
              value={content.seasonal.dateRange}
              placeholder="Aralık – Şubat"
              onChange={(e) => update((c) => { c.seasonal.dateRange = e.target.value; })}
            />
          </div>
        </div>

        <label className={styles.label}>Balık Listesi</label>
        <div className={styles.chips}>
          {content.seasonal.fish.map((f, i) => (
            <span key={i} className={styles.chip}>
              {f}
              <button
                type="button"
                className={styles.chipX}
                aria-label={`${f} sil`}
                onClick={() => update((c) => { c.seasonal.fish.splice(i, 1); })}
              >
                ×
              </button>
            </span>
          ))}
          {content.seasonal.fish.length === 0 && <span className={styles.muted}>Henüz balık eklenmedi.</span>}
        </div>
        <div className={styles.addChip}>
          <input
            className={styles.input}
            value={fishInput}
            placeholder="Balık adı ekle…"
            onChange={(e) => setFishInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addFish(); } }}
          />
          <button type="button" className={styles.btn} onClick={addFish}>Ekle</button>
        </div>
      </section>

      {/* ── Menü ─────────────────────────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Menü</h2>
          <button type="button" className={styles.btn} onClick={() => update((c) => { c.menu.push(emptyCat()); })}>
            + Kategori Ekle
          </button>
        </div>

        {content.menu.map((cat, ci) => (
          <details key={ci} className={styles.cat}>
            <summary className={styles.catSummary}>
              <span className={styles.catSummaryTitle}>{cat.title || 'Adsız kategori'}</span>
              <span className={styles.catCount}>{cat.items.length} ürün</span>
            </summary>

            <div className={styles.catBody}>
              <div className={`${styles.row} ${styles.row2}`}>
                <div className={styles.field}>
                  <label className={styles.label}>Kategori Adı</label>
                  <input className={styles.input} value={cat.title}
                    onChange={(e) => update((c) => { c.menu[ci].title = e.target.value; })} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Alt Başlık</label>
                  <input className={styles.input} value={cat.subtitle || ''}
                    onChange={(e) => update((c) => { c.menu[ci].subtitle = e.target.value; })} />
                </div>
              </div>

              {cat.items.map((it, ii) => (
                <div key={ii} className={styles.item}>
                  <div className={styles.itemTop}>
                    <span className={styles.itemNo}>Ürün {ii + 1}</span>
                    <button type="button" className={`${styles.btn} ${styles.btnSm} ${styles.btnGhostDanger}`}
                      onClick={() => update((c) => { c.menu[ci].items.splice(ii, 1); })}>
                      Sil
                    </button>
                  </div>

                  <div className={`${styles.row} ${styles.row3}`}>
                    <div className={styles.field}>
                      <label className={styles.label}>Ad</label>
                      <input className={styles.input} value={it.name}
                        onChange={(e) => update((c) => { c.menu[ci].items[ii].name = e.target.value; })} />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Fiyat</label>
                      <input className={styles.input} value={it.price || ''} disabled={!!it.daily}
                        placeholder={it.daily ? 'Günlük' : ''}
                        onChange={(e) => update((c) => { c.menu[ci].items[ii].price = e.target.value; })} />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Birim</label>
                      <input className={styles.input} value={it.unit || ''} placeholder="₺"
                        onChange={(e) => update((c) => { c.menu[ci].items[ii].unit = e.target.value; })} />
                    </div>
                  </div>

                  <div className={styles.field} style={{ marginBottom: '0.75rem' }}>
                    <label className={styles.label}>Açıklama</label>
                    <textarea className={styles.textarea} value={it.desc}
                      onChange={(e) => update((c) => { c.menu[ci].items[ii].desc = e.target.value; })} />
                  </div>

                  <div className={`${styles.row} ${styles.row2}`} style={{ marginBottom: 0 }}>
                    <div className={styles.field}>
                      <label className={styles.label}>Etiketler (virgülle ayır)</label>
                      <input className={styles.input} value={(it.tags || []).join(', ')}
                        onChange={(e) => update((c) => {
                          c.menu[ci].items[ii].tags = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                        })} />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Görsel URL (opsiyonel)</label>
                      <input className={styles.input} value={it.img || ''} placeholder="https://…"
                        onChange={(e) => update((c) => { c.menu[ci].items[ii].img = e.target.value; })} />
                    </div>
                  </div>

                  <div className={styles.itemFlags}>
                    <label className={styles.checkRow}>
                      <input type="checkbox" checked={!!it.daily}
                        onChange={(e) => update((c) => {
                          c.menu[ci].items[ii].daily = e.target.checked;
                          if (e.target.checked) c.menu[ci].items[ii].price = '';
                        })} />
                      <span>Günlük fiyat (kiloyla — "Fiyat için sorunuz")</span>
                    </label>
                    <label className={styles.checkRow}>
                      <input type="checkbox" checked={!!it.featured}
                        onChange={(e) => update((c) => { c.menu[ci].items[ii].featured = e.target.checked; })} />
                      <span>Ana sayfada öne çıkar</span>
                    </label>
                  </div>
                </div>
              ))}

              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <button type="button" className={styles.btn} onClick={() => update((c) => { c.menu[ci].items.push(emptyItem()); })}>
                  + Ürün Ekle
                </button>
                <button type="button" className={`${styles.btn} ${styles.btnGhostDanger}`}
                  onClick={() => {
                    if (confirm(`"${cat.title}" kategorisini silmek istediğinize emin misiniz?`)) {
                      update((c) => { c.menu.splice(ci, 1); });
                    }
                  }}>
                  Kategoriyi Sil
                </button>
              </div>
            </div>
          </details>
        ))}
      </section>

      {/* ── Kaydet ───────────────────────────────────────────────────────── */}
      <div className={styles.saveBar}>
        {msg && <span className={`${styles.saveMsg} ${msg.ok ? styles.saveOk : styles.saveErr}`}>{msg.text}</span>}
        {dirty && !msg && <span className={`${styles.saveMsg} ${styles.dirty}`}>Kaydedilmemiş değişiklikler var.</span>}
        <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={save} disabled={pending || !dirty}>
          {pending ? 'Kaydediliyor…' : 'Kaydet'}
        </button>
      </div>
    </>
  );
}
