/**
 * videos.js — Ruhun Mimarisi Video Arşivi
 * ─────────────────────────────────────────
 * 64 HD kapısı × 2 yön (pozitif / negatif) = 128 slot
 *
 * Video hazır değilse: ytId = null → buton gizlenir
 * Video hazır olunca: ytId = 'YOUTUBE_VIDEO_ID' (11 karakter)
 *
 * Kullanım:
 *   getGateVideo(kapıNo)        → { pozitif, negatif, baslik }
 *   getDailyVideo(hexNo)        → günlük hekzagram videosu
 *   getVideoUrl(ytId)           → 'https://youtu.be/YTID'
 *   hasVideo(kapıNo)            → true/false
 */

// ─── 64 Kapı Video Tablosu ────────────────────
// ytId: null = henüz çekilmedi
// ytId: 'XXXXXXXXXXX' = YouTube video ID (11 karakter)
const GATE_VIDEOS = {
   1: { baslik: 'Yaratıcılık',          pozitif: null, negatif: null },
   2: { baslik: 'Alımlılık',            pozitif: null, negatif: null },
   3: { baslik: 'Zorluğun Düzeni',      pozitif: null, negatif: null },
   4: { baslik: 'Cevaplama',            pozitif: null, negatif: null },
   5: { baslik: 'Sabit Ritimler',       pozitif: null, negatif: null },
   6: { baslik: 'Sürtüşme',             pozitif: null, negatif: null },
   7: { baslik: 'Ordu',                 pozitif: null, negatif: null },
   8: { baslik: 'Birlik',               pozitif: null, negatif: null },
   9: { baslik: 'Odaklanma',            pozitif: null, negatif: null },
  10: { baslik: 'Davranış',             pozitif: null, negatif: null },
  11: { baslik: 'Fikirler',             pozitif: null, negatif: null },
  12: { baslik: 'Durma',                pozitif: null, negatif: null },
  13: { baslik: 'Dinleyici',            pozitif: null, negatif: null },
  14: { baslik: 'Güç Becerileri',       pozitif: null, negatif: null },
  15: { baslik: 'Aşırılık',             pozitif: null, negatif: null },
  16: { baslik: 'Beceriler',            pozitif: null, negatif: null },
  17: { baslik: 'Takip Etmek',          pozitif: null, negatif: null },
  18: { baslik: 'Düzeltme',             pozitif: null, negatif: null },
  19: { baslik: 'İstemek',              pozitif: null, negatif: null },
  20: { baslik: 'Şimdiki An',           pozitif: null, negatif: null },
  21: { baslik: 'Avcı',                 pozitif: null, negatif: null },
  22: { baslik: 'Zarafet',              pozitif: null, negatif: null },
  23: { baslik: 'Parçalama',            pozitif: null, negatif: null },
  24: { baslik: 'Rasyonalizasyon',      pozitif: null, negatif: null },
  25: { baslik: 'Masumiyet',            pozitif: null, negatif: null },
  26: { baslik: 'Büyük Yükleyici',      pozitif: null, negatif: null },
  27: { baslik: 'Besleme',              pozitif: null, negatif: null },
  28: { baslik: 'Mücadele Oyuncusu',    pozitif: null, negatif: null },
  29: { baslik: 'Evet Deme',            pozitif: null, negatif: null },
  30: { baslik: 'Duygular',             pozitif: null, negatif: null },
  31: { baslik: 'Etki',                 pozitif: null, negatif: null },
  32: { baslik: 'Süreklilik',           pozitif: null, negatif: null },
  33: { baslik: 'Gizlilik',             pozitif: null, negatif: null },
  34: { baslik: 'Büyük Güç',            pozitif: null, negatif: null },
  35: { baslik: 'Değişim',              pozitif: null, negatif: null },
  36: { baslik: 'Karanlık Işığı',       pozitif: null, negatif: null },
  37: { baslik: 'Aile',                 pozitif: null, negatif: null },
  38: { baslik: 'Muhalefet',            pozitif: null, negatif: null },
  39: { baslik: 'Kışkırtma',            pozitif: null, negatif: null },
  40: { baslik: 'Yalnızlık',            pozitif: null, negatif: null },
  41: { baslik: 'Azalma',               pozitif: null, negatif: null },
  42: { baslik: 'Artış',                pozitif: null, negatif: null },
  43: { baslik: 'Kavrayış',             pozitif: null, negatif: null },
  44: { baslik: 'Geliş',                pozitif: null, negatif: null },
  45: { baslik: 'Toplantı',             pozitif: null, negatif: null },
  46: { baslik: 'Başarıya İtilmek',     pozitif: null, negatif: null },
  47: { baslik: 'Farkına Varma',        pozitif: null, negatif: null },
  48: { baslik: 'Derinlik',             pozitif: null, negatif: null },
  49: { baslik: 'Devrim',               pozitif: null, negatif: null },
  50: { baslik: 'Değerler',             pozitif: null, negatif: null },
  51: { baslik: 'Sarsıntı',             pozitif: null, negatif: null },
  52: { baslik: 'Hareketsizlik',        pozitif: null, negatif: null },
  53: { baslik: 'Başlangıç',            pozitif: null, negatif: null },
  54: { baslik: 'Aşık Olma',            pozitif: null, negatif: null },
  55: { baslik: 'Bolluk',               pozitif: null, negatif: null },
  56: { baslik: 'Gezgin',               pozitif: null, negatif: null },
  57: { baslik: 'Sezgisel Netlik',      pozitif: null, negatif: null },
  58: { baslik: 'Neşe',                 pozitif: null, negatif: null },
  59: { baslik: 'Dağılma',              pozitif: null, negatif: null },
  60: { baslik: 'Kısıtlama',            pozitif: null, negatif: null },
  61: { baslik: 'İç Gerçek',            pozitif: null, negatif: null },
  62: { baslik: 'Detaylar',             pozitif: null, negatif: null },
  63: { baslik: 'Şüphe',                pozitif: null, negatif: null },
  64: { baslik: 'Kafa Karışıklığı',     pozitif: null, negatif: null },
};

// ─── Yardımcı Fonksiyonlar ────────────────────

/**
 * Kapı videosunu getir
 * @param {number} kapiNo  1-64
 * @returns {{ baslik, pozitif, negatif, hasPozitif, hasNegatif }}
 */
function getGateVideo(kapiNo) {
  const v = GATE_VIDEOS[kapiNo];
  if (!v) return null;
  return {
    ...v,
    kapiNo,
    hasPozitif: !!v.pozitif,
    hasNegatif: !!v.negatif,
    hasAny:     !!(v.pozitif || v.negatif),
  };
}

/**
 * YouTube URL'i oluştur
 * @param {string} ytId
 * @param {boolean} embed — true: embed URL, false: youtu.be linki
 */
function getVideoUrl(ytId, embed = false) {
  if (!ytId) return null;
  return embed
    ? `https://www.youtube.com/embed/${ytId}`
    : `https://youtu.be/${ytId}`;
}

/**
 * Kapı için video var mı?
 */
function hasVideo(kapiNo) {
  const v = GATE_VIDEOS[kapiNo];
  return !!(v?.pozitif || v?.negatif);
}

/**
 * Hekzagram numarasından kapı videosunu getir
 * I Ching hekzagram ↔ HD kapı eşleştirmesi
 */
function getDailyVideo(hexNo) {
  // Hekzagram numarası = kapı numarası (1-64 direkt eşleşiyor)
  return getGateVideo(hexNo);
}

/**
 * Video butonu HTML'i üret
 * index.html içinde kullanım için
 */
function renderVideoBtn(kapiNo, yon = 'pozitif') {
  const v = getGateVideo(kapiNo);
  if (!v || !v[yon]) return '';

  const url   = getVideoUrl(v[yon]);
  const label = yon === 'pozitif' ? '✦ Hediye Videosu' : '◆ Gölge Videosu';
  const color = yon === 'pozitif' ? 'var(--gold)' : 'var(--violet)';

  return `<a href="${url}" target="_blank" rel="noopener"
    style="display:inline-flex;align-items:center;gap:6px;font-family:'Cinzel',serif;
    font-size:8px;letter-spacing:.14em;text-transform:uppercase;
    color:${color};text-decoration:none;padding:7px 14px;
    border:1px solid ${color}44;border-radius:3px;margin-top:8px;
    transition:background .2s"
    onmouseover="this.style.background='${color}11'"
    onmouseout="this.style.background='transparent'">
    ▶ ${label} →
  </a>`;
}

/**
 * Hazır videoların listesi
 */
function getHazirVideolar() {
  return Object.entries(GATE_VIDEOS)
    .filter(([,v]) => v.pozitif || v.negatif)
    .map(([no, v]) => ({ kapiNo: Number(no), ...v }));
}

// ─── Export ──────────────────────────────────
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GATE_VIDEOS, getGateVideo, getVideoUrl, hasVideo, getDailyVideo, renderVideoBtn, getHazirVideolar };
} else {
  window.GATE_VIDEOS      = GATE_VIDEOS;
  window.getGateVideo     = getGateVideo;
  window.getVideoUrl      = getVideoUrl;
  window.hasVideo         = hasVideo;
  window.getDailyVideo    = getDailyVideo;
  window.renderVideoBtn   = renderVideoBtn;
  window.getHazirVideolar = getHazirVideolar;
}
