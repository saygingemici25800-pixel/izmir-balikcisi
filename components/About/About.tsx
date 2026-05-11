'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './About.module.css';

const STATS = [
  { num: '35+', lbl: 'Yıllık masa' },
  { num: '0%',  lbl: 'Alkol' },
  { num: '124', lbl: 'Koltuk' },
];

type Member = { name: string; role: string; bio: string };
const TEAM: Member[] = [
  {
    name: 'Hasan Yılmaz',
    role: 'Şef',
    bio: '1989\'dan beri aynı tezgâh, aynı bıçak. Her sabah hâli ilk gezen o.',
  },
  {
    name: 'Ayşe Yılmaz',
    role: 'İşletmeci',
    bio: 'Salonun sessiz sahibi. Masalar onun denetiminde, sofranın ahengi onun işi.',
  },
  {
    name: 'Mehmet Demir',
    role: 'Baş Garson',
    bio: 'On beş yıllık servis. Hangi masanın kenarda, hangisinin ortada oturmak istediğini bilir.',
  },
  {
    name: 'Yusuf Yılmaz',
    role: 'Sous Şef',
    bio: 'İkinci nesil. Eski tarifler, yeni dokunuşlar — Çupra’yı tuzda ilk o pişirdi.',
  },
];

const fade = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  // Parallax on the big number — opposite direction to body for editorial drift
  const yNum  = useTransform(scrollYProgress, [0, 1], [60, -180]);
  const yBody = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section className={styles.section} id="hikaye" ref={ref}>
      <header className={styles.header}>
        <span className="eyebrow">№ 02 — Hikâye</span>
        <span className={styles.rule} aria-hidden />
        <span className={styles.index}>1989 → 2026</span>
      </header>

      <div className={styles.grid}>
        <motion.div className={styles.numWrap} style={{ y: yNum }}>
          <div className={styles.numLabel}>İlk gün</div>
          <span className={styles.bigNum}>1989</span>
          <div className={styles.numLabel} style={{ marginTop: '1rem' }}>Bugün</div>
          <span className={styles.bigNumFill}>2026</span>
        </motion.div>

        <motion.div className={styles.body} style={{ y: yBody }}>
          <p className={styles.lead}>
            Bir <em>baba</em> ve oğul. Sabah dörtte hâl, akşam yedide ışıklar.
            Aralarındaki her şey: <em>balık</em>.
          </p>
          <p className={styles.copy}>
            İzmir Balıkçısı, otuz beş yıldır aynı kapıyı açıyor, aynı tabakları
            taşıyor. Burada içki yok; tıkırtı, kahkaha ve marine olmuş hamsi
            var. Çocuklarınızın elinden bırakmadığı limon, dedenizin anlattığı
            eski Muğla hikâyesi, garsonun ezbere bildiği masa numarası — hepsi
            tabağın bir parçası.
          </p>

          <div className={styles.stats}>
            {STATS.map((s) => (
              <div key={s.lbl} className={styles.stat}>
                <div className={`${styles.num} tabular`}>{s.num}</div>
                <div className={styles.lbl}>{s.lbl}</div>
              </div>
            ))}
          </div>

          <blockquote className={styles.pull}>
            “Buraya gelen kimse aceleyle çıkmadı. Deniz acele etmez,
            biz de etmeyiz.”
            <span className={styles.who}>Hasan Usta · Şef</span>
          </blockquote>
        </motion.div>
      </div>

      {/* ── Team ─────────────────────────────────────────────────── */}
      <div className={styles.team}>
        <header className={styles.teamHead}>
          <span className="eyebrow">№ 02.1 — Ekip</span>
          <span className={styles.rule} aria-hidden />
          <span className={styles.index}>{TEAM.length} kişi</span>
        </header>

        <h3 className={styles.teamTitle}>
          Aynı sofranın <em>arkasındaki</em> dört yüz.
        </h3>

        <div className={styles.teamGrid}>
          {TEAM.map((m, i) => (
            <motion.article
              key={m.name}
              className={styles.teamCard}
              variants={fade}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10% 0px' }}
            >
              <div
                className={styles.teamPhoto}
                role="img"
                aria-label={`${m.name} portresi (yer tutucu)`}
                data-initial={m.name.charAt(0)}
              />
              <div>
                <p className={styles.teamRole}>{m.role}</p>
                <h4 className={styles.teamName}>{m.name}</h4>
              </div>
              <p className={styles.teamBio}>{m.bio}</p>
            </motion.article>
          ))}
        </div>

        {/* ── Video placeholder ──────────────────────────────────── */}
        <motion.div
          className={styles.video}
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
        >
          <div className={styles.videoStage} role="img" aria-label="İzmir Balıkçısı belgesel önizlemesi (yer tutucu)">
            <div className={styles.videoPlay}>
              <button type="button" aria-label="Belgeseli oynat" data-magnetic data-cursor-label="Oynat" />
            </div>
            <span className={styles.videoTimecode}>00:00 / 02:14</span>
          </div>
          <div className={styles.videoCopy}>
            <div>
              <p className={styles.videoEyebrow}>Belgesel · 2 dakika</p>
              <h4 className={styles.videoTitle}>
                Bir tezgâhın <em>otuz beş yılı</em>.
              </h4>
            </div>
            <p className={styles.videoDesc}>
              Mutfağın arka kapısı, sabahın dördündeki hâl, akşamın yedisindeki
              ilk masa. Kameraya kısa bir bakış — kelimeden çok ses, dokunma,
              koku.
            </p>
            <div className={styles.videoMeta}>
              <span>Yön: A. Demirci</span>
              <span>Bahar 2026</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
