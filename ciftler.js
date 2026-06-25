/**
 * ciftler.js — Ruhun Mimarisi Çift Kapı Sistemi
 * ─────────────────────────────────────────────
 * 32 çift × 60 kombinasyon = 1.920 kayıt
 * Her çift: 2 I Ching kapısı arasındaki spektrum
 * Her kayıt: yaşam yolu (yy) × HD tipi (hd)
 *
 * Kullanım:
 *   getCiftMetin(ciftNo, yasamYolu, hdTipi)
 *   getDailyAktifCift(birthDate)
 *   getHDTipFromBirth(birthDate, birthTime, birthCity)
 */

// ─── 32 Çiftin meta verisi ──────────────────────
// (kapı numaraları + Türkçe adlar)
// Dosyalar gelince CIFT_DATA[N].data = CIFT_NN ile doldurulur
const CIFT_META = {
   1: { a: 'Yaratıcılık',          b: 'Kabul',              kapiA:  1, kapiB:  2 },
   2: { a: 'Yön',                  b: 'Alımlılık',          kapiA:  3, kapiB:  4 },
   3: { a: 'Bekleme',              b: 'Gençlik Çılgınlığı', kapiA:  5, kapiB:  6 },
   4: { a: 'Ordu',                 b: 'Su',                 kapiA:  7, kapiB:  8 },
   5: { a: 'Küçük Besleme',        b: 'Yürüyüş',            kapiA:  9, kapiB: 10 },
   6: { a: 'Barış',                b: 'Durgunluk',          kapiA: 11, kapiB: 12 },
   7: { a: 'Topluluk',             b: 'Büyük Sahip Olma',   kapiA: 13, kapiB: 14 },
   8: { a: 'Alçakgönüllülük',      b: 'Coşku',              kapiA: 15, kapiB: 16 },
   9: { a: 'Takip Etmek',          b: 'Bozulmayı Düzeltmek',kapiA: 17, kapiB: 18 },
  10: { a: 'Yaklaşma',             b: 'Seyretme',           kapiA: 19, kapiB: 20 },
  11: { a: 'Dürüstlük',            b: 'Bozulma',            kapiA: 21, kapiB: 22 },
  12: { a: 'Soyutlama',            b: 'Açıklık',            kapiA: 23, kapiB: 24 },
  13: { a: 'Masumiyet',            b: 'Büyük Güç',          kapiA: 25, kapiB: 26 },
  14: { a: 'Besleme',              b: 'Büyük Geçiş',        kapiA: 27, kapiB: 28 },
  15: { a: 'Tehlike',              b: 'Bağlanma',           kapiA: 29, kapiB: 30 },
  16: { a: 'Etki',                 b: 'Azalma',             kapiA: 31, kapiB: 32 },
  17: { a: 'Geri Çekilme',         b: 'Büyük Güç',          kapiA: 33, kapiB: 34 },
  18: { a: 'İlerleme',             b: 'Karanlık',           kapiA: 35, kapiB: 36 },
  19: { a: 'Aile',                 b: 'Zıtlık',             kapiA: 37, kapiB: 38 },
  20: { a: 'Engel',                b: 'Kurtuluş',           kapiA: 39, kapiB: 40 },
  21: { a: 'Azalma',               b: 'Artış',              kapiA: 41, kapiB: 42 },
  22: { a: 'Kararlaştırma',        b: 'Buluşma',            kapiA: 43, kapiB: 44 },
  23: { a: 'Toplantı',             b: 'Yükseklik',          kapiA: 45, kapiB: 46 },
  24: { a: 'Tükenme',              b: 'Kuyu',               kapiA: 47, kapiB: 48 },
  25: { a: 'Devrim',               b: 'Kazan',              kapiA: 49, kapiB: 50 },
  26: { a: 'Gök Gürültüsü',        b: 'Dağ',                kapiA: 51, kapiB: 52 },
  27: { a: 'Gelişme',              b: 'Yerleşme',           kapiA: 53, kapiB: 54 },
  28: { a: 'Bolluk',               b: 'Gezgin',             kapiA: 55, kapiB: 56 },
  29: { a: 'Naziklik',             b: 'Sevinç',             kapiA: 57, kapiB: 58 },
  30: { a: 'Dağılma',              b: 'Kısıtlama',          kapiA: 59, kapiB: 60 },
  31: { a: 'İç Gerçek',            b: 'Küçük Fazlalık',     kapiA: 61, kapiB: 62 },
  32: { a: 'Tamamlanmak',          b: 'Tamamlanmamak',      kapiA: 63, kapiB: 64 },
};

// ─── Kayıt havuzu ─────────────────────────────
// Her cift_NN.js yüklendiğinde buraya eklenir
const _CIFT_POOL = {};

/**
 * Çift verisini kaydet (her cift_NN.js çağırır)
 * @param {number} no — çift numarası
 * @param {Array}  data — 60 kayıt
 */
function registerCift(no, data) {
  _CIFT_POOL[no] = {};
  data.forEach(r => {
    const k = `${r.yy}_${r.hd}`;
    _CIFT_POOL[no][k] = r;
  });
}

// ─── HD Tip Haritası ──────────────────────────
// HD motoru (hd.js / astro.js) yoksa bu fallback kullanılır
const HD_TIP_TR = {
  generator:             'Generator',
  manifesting_generator: 'Manifesting Generator',
  projector:             'Projector',
  manifestor:            'Manifestor',
  reflector:             'Reflector',
};

// Varsayılan tip (doğum saati bilinmiyorsa)
const HD_DEFAULT = 'generator';

/**
 * HD tipini doğum bilgilerinden hesapla
 * HD Engine varsa kullanır, yoksa default döner
 * @param {string} birthDate  'YYYY-MM-DD'
 * @param {string} birthTime  'HH:MM' | null
 * @returns {string} hd tip key
 */
function getHDTip(birthDate, birthTime) {
  // HD Engine entegre değilse veya doğum saati yoksa
  if (!birthTime || typeof HD_ENGINE === 'undefined') {
    return HD_DEFAULT;
  }
  try {
    const [year, month, day] = birthDate.split('-').map(Number);
    const [hour, minute]     = birthTime.split(':').map(Number);
    const hdResult = HD_ENGINE.calculate({ year, month, day, hour, minute });
    // HD Engine'den tip çıkar
    return hdResult?.type?.toLowerCase().replace(' ', '_') || HD_DEFAULT;
  } catch(e) {
    console.warn('[Ciftler] HD tip hesaplanamadı:', e);
    return HD_DEFAULT;
  }
}

// ─── Günlük Aktif Çift ──────────────────────
// Doğum tarihinden gün bazlı aktif çift (C mekaniği)
// 29.53 günlük ay döngüsü × 32 çift = ~yıllık döngü
// Basit: (bugün - doğum) % 32 + 1

/**
 * Bugünkü aktif çift numarasını döner
 * @param {string} birthDate 'YYYY-MM-DD'
 * @returns {number} 1-32
 */
function getDailyAktifCift(birthDate) {
  if (!birthDate) return todayCift();
  const birth = new Date(birthDate);
  const today = new Date();
  const diffDays = Math.floor((today - birth) / (1000 * 60 * 60 * 24));
  return (diffDays % 32) + 1;
}

/**
 * Doğum tarihi olmadan bugünkü çift (yılın günü bazlı)
 */
function todayCift() {
  const now   = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const day   = Math.floor((now - start) / (1000 * 60 * 60 * 24));
  return (day % 32) + 1;
}

// ─── Ana Sorgu Fonksiyonu ────────────────────

/**
 * Çift metnini getir
 * @param {number} ciftNo     1-32
 * @param {number} yasamYolu  1-9, 11, 22, 33
 * @param {string} hdTip      'generator' | ... | null
 * @returns {{ baslik, metin, meta, usedHD } | null}
 */
function getCiftMetin(ciftNo, yasamYolu, hdTip) {
  const pool = _CIFT_POOL[ciftNo];
  if (!pool) return null; // Bu çift henüz yüklenmedi

  const tip = hdTip || HD_DEFAULT;
  const yy  = Number(yasamYolu) || 1;
  const key = `${yy}_${tip}`;

  let kayit = pool[key];

  // Fallback: yy bulunamazsa yy=1 dene
  if (!kayit) {
    const fallbackKey = `1_${tip}`;
    kayit = pool[fallbackKey];
  }

  // Fallback: HD tipi bulunamazsa generator dene
  if (!kayit) {
    const genKey = `${yy}_generator`;
    kayit = pool[genKey];
  }

  if (!kayit) return null;

  return {
    ...kayit,
    meta:   CIFT_META[ciftNo] || {},
    usedHD: tip !== hdTip ? HD_DEFAULT : tip,
  };
}

/**
 * Günlük aktif çiftin metnini getir
 * @param {string} birthDate
 * @param {number} yasamYolu
 * @param {string} hdTip
 */
function getDailyMetin(birthDate, yasamYolu, hdTip) {
  const ciftNo = getDailyAktifCift(birthDate);
  return {
    ciftNo,
    ...getCiftMetin(ciftNo, yasamYolu, hdTip),
  };
}

/**
 * Yüklü çift sayısı
 */
function getYukluCiftler() {
  return Object.keys(_CIFT_POOL).map(Number).sort((a,b)=>a-b);
}

/**
 * Belirli bir kapı numarasından çift bulur
 * @param {number} kapiNo 1-64
 */
function getCiftByKapi(kapiNo) {
  for (const [no, meta] of Object.entries(CIFT_META)) {
    if (meta.kapiA === kapiNo || meta.kapiB === kapiNo) {
      return { ciftNo: Number(no), meta };
    }
  }
  return null;
}

// ─── Export ──────────────────────────────────
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CIFT_META, registerCift, getCiftMetin,
    getDailyAktifCift, getDailyMetin,
    getHDTip, getCiftByKapi, getYukluCiftler,
    HD_TIP_TR, HD_DEFAULT,
  };
} else {
  window.CIFT_META         = CIFT_META;
  window.registerCift      = registerCift;
  window.getCiftMetin      = getCiftMetin;
  window.getDailyAktifCift = getDailyAktifCift;
  window.getDailyMetin     = getDailyMetin;
  window.getHDTip          = getHDTip;
  window.getCiftByKapi     = getCiftByKapi;
  window.getYukluCiftler   = getYukluCiftler;
  window.HD_TIP_TR         = HD_TIP_TR;
}

// ─── Otomatik Kayıt (browser) ────────────────
// Her cift_NN.js script olarak yüklendikten sonra çalışır
if (typeof window !== 'undefined') {
  window.addEventListener('load', function() {
    const pairs = [
      [1,'CIFT_01'],[2,'CIFT_02'],[3,'CIFT_03'],[4,'CIFT_04'],
      [5,'CIFT_05'],[6,'CIFT_06'],[7,'CIFT_07'],[8,'CIFT_08'],
      [9,'CIFT_09'],[10,'CIFT_10'],[11,'CIFT_11'],[12,'CIFT_12'],
      [13,'CIFT_13'],[14,'CIFT_14'],[15,'CIFT_15'],[16,'CIFT_16'],
      [17,'CIFT_17'],[18,'CIFT_18'],[19,'CIFT_19'],[20,'CIFT_20'],
      [21,'CIFT_21'],[22,'CIFT_22'],[23,'CIFT_23'],[24,'CIFT_24'],
      [25,'CIFT_25'],[26,'CIFT_26'],[27,'CIFT_27'],[28,'CIFT_28'],
      [29,'CIFT_29'],[30,'CIFT_30'],[31,'CIFT_31'],[32,'CIFT_32'],
    ];
    pairs.forEach(([no, varName]) => {
      if (typeof window[varName] !== 'undefined') {
        registerCift(no, window[varName]);
      }
    });
    console.log('[Ciftler] Yüklenen çiftler:', getYukluCiftler().length + '/32');
  });
}
