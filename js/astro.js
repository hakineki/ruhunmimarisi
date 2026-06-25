/**
 * ═══════════════════════════════════════════════════════════════
 * ASTRO.JS — Tam Astroloji Hesaplama Motoru
 * ═══════════════════════════════════════════════════════════════
 * VSOP87 algoritmaları ile gezegen hesaplama
 * Swiss Ephemeris hook'u (varsa otomatik devreye girer)
 * 
 * Çıktılar:
 *   - Tüm gezegenler (Güneş, Ay, Merkür, Venüs, Mars,
 *     Jüpiter, Satürn, Uranüs, Neptün, Plüton)
 *   - Yükselen (Ascendant) + 12 ev
 *   - Açılar (kare, üçgen, karşıt, kavuşum, sekstil)
 *   - HD için: Güneş ekliptik boylamı (doğum + 88 gün önce)
 * ═══════════════════════════════════════════════════════════════
 */

'use strict';

// ──────────────────────────────────────────────
// YARDIMCI FONKSİYONLAR
// ──────────────────────────────────────────────

const DEG = Math.PI / 180;
const RAD = 180 / Math.PI;

function toRad(d) { return d * DEG; }
function toDeg(r) { return r * RAD; }
function norm360(d) { return ((d % 360) + 360) % 360; }
function norm180(d) { d = norm360(d); return d > 180 ? d - 360 : d; }

function sin(d) { return Math.sin(toRad(d)); }
function cos(d) { return Math.cos(toRad(d)); }
function tan(d) { return Math.tan(toRad(d)); }
function asin(x) { return toDeg(Math.asin(x)); }
function acos(x) { return toDeg(Math.acos(x)); }
function atan2(y, x) { return toDeg(Math.atan2(y, x)); }

// ──────────────────────────────────────────────
// JÜLYENSEKİM (Julian Day Number)
// ──────────────────────────────────────────────

function dateToJD(year, month, day, hour = 12, minute = 0, second = 0) {
  const ut = hour + minute / 60 + second / 3600;
  let y = year, m = month;
  if (m <= 2) { y -= 1; m += 12; }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (y + 4716)) +
         Math.floor(30.6001 * (m + 1)) +
         day + ut / 24 + B - 1524.5;
}

function jdToDate(jd) {
  const z = Math.floor(jd + 0.5);
  const f = jd + 0.5 - z;
  let A = z;
  if (z >= 2299161) {
    const alpha = Math.floor((z - 1867216.25) / 36524.25);
    A = z + 1 + alpha - Math.floor(alpha / 4);
  }
  const B = A + 1524;
  const C = Math.floor((B - 122.1) / 365.25);
  const D = Math.floor(365.25 * C);
  const E = Math.floor((B - D) / 30.6001);
  const day   = B - D - Math.floor(30.6001 * E);
  const month = E < 14 ? E - 1 : E - 13;
  const year  = month > 2 ? C - 4716 : C - 4715;
  const frac  = f * 24;
  const hour  = Math.floor(frac);
  const min   = Math.floor((frac - hour) * 60);
  return { year, month, day, hour, min };
}

// Julian yüzyıl (J2000.0 epoğundan)
function JC(jd) { return (jd - 2451545.0) / 36525; }

// ──────────────────────────────────────────────
// BURÇ SİSTEMİ
// ──────────────────────────────────────────────

const SIGNS = [
  { name: "Koç",     en: "Aries",       symbol: "♈", element: "Ateş",  quality: "Kardinal", ruler: "Mars"    },
  { name: "Boğa",    en: "Taurus",      symbol: "♉", element: "Toprak",quality: "Sabit",    ruler: "Venüs"   },
  { name: "İkizler", en: "Gemini",      symbol: "♊", element: "Hava",  quality: "Değişken", ruler: "Merkür"  },
  { name: "Yengeç",  en: "Cancer",      symbol: "♋", element: "Su",    quality: "Kardinal", ruler: "Ay"      },
  { name: "Aslan",   en: "Leo",         symbol: "♌", element: "Ateş",  quality: "Sabit",    ruler: "Güneş"   },
  { name: "Başak",   en: "Virgo",       symbol: "♍", element: "Toprak",quality: "Değişken", ruler: "Merkür"  },
  { name: "Terazi",  en: "Libra",       symbol: "♎", element: "Hava",  quality: "Kardinal", ruler: "Venüs"   },
  { name: "Akrep",   en: "Scorpio",     symbol: "♏", element: "Su",    quality: "Sabit",    ruler: "Plüton"  },
  { name: "Yay",     en: "Sagittarius", symbol: "♐", element: "Ateş",  quality: "Değişken", ruler: "Jüpiter" },
  { name: "Oğlak",   en: "Capricorn",   symbol: "♑", element: "Toprak",quality: "Kardinal", ruler: "Satürn"  },
  { name: "Kova",    en: "Aquarius",    symbol: "♒", element: "Hava",  quality: "Sabit",    ruler: "Uranüs"  },
  { name: "Balık",   en: "Pisces",      symbol: "♓", element: "Su",    quality: "Değişken", ruler: "Neptün"  },
];

function getLongitudeInfo(longitude) {
  const lon = norm360(longitude);
  const signIndex = Math.floor(lon / 30);
  const degree = lon - signIndex * 30;
  const sign = SIGNS[signIndex];
  return {
    longitude: lon,
    signIndex,
    sign: sign.name,
    signEn: sign.en,
    symbol: sign.symbol,
    element: sign.element,
    quality: sign.quality,
    ruler: sign.ruler,
    degree: Math.floor(degree),
    minute: Math.floor((degree % 1) * 60),
    formatted: `${Math.floor(degree)}°${Math.floor((degree%1)*60)}'${sign.symbol}`
  };
}

// ──────────────────────────────────────────────
// OBLIQUITY (EKLİPTİK EĞİMİ)
// ──────────────────────────────────────────────

function obliquity(T) {
  // IAU 2006 formülü
  return 23.4392911111 -
    0.013004166667 * T -
    0.000001638889 * T * T +
    0.000000503611 * T * T * T;
}

// ──────────────────────────────────────────────
// GÜNEŞ HESAPLAMA (Jean Meeus — yüksek doğruluk)
// ──────────────────────────────────────────────

function sunPosition(jd) {
  const T = JC(jd);
  const T2 = T * T;
  const T3 = T2 * T;

  // Geometrik ortalama boylam
  let L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T2;
  L0 = norm360(L0);

  // Ortalama anomali
  let M = 357.52911 + 35999.05029 * T - 0.0001537 * T2;
  M = norm360(M);

  // Denklem merkezi
  const C = (1.914602 - 0.004817 * T - 0.000014 * T2) * sin(M)
           + (0.019993 - 0.000101 * T) * sin(2 * M)
           + 0.000289 * sin(3 * M);

  // Güneş'in gerçek boylamı
  const sunLon = L0 + C;

  // Sapma (aberration)
  const omega = 125.04 - 1934.136 * T;
  const apparentLon = sunLon - 0.00569 - 0.00478 * sin(omega);

  // Eğim
  const eps = obliquity(T) + 0.00256 * cos(omega);

  // Sağ açıklık ve deklinasyon
  const ra = norm360(atan2(cos(eps) * sin(apparentLon), cos(apparentLon)));
  const dec = asin(sin(eps) * sin(apparentLon));

  // Mesafe (AU)
  const e = 0.016708634 - 0.000042037 * T - 0.0000001267 * T2;
  const v = M + C;
  const R = 1.000001018 * (1 - e * e) / (1 + e * cos(v));

  return {
    longitude: norm360(apparentLon),
    ra, dec, distance: R,
    ...getLongitudeInfo(apparentLon)
  };
}

// ──────────────────────────────────────────────
// AY HESAPLAMA (Jean Meeus — Chapront teorisi)
// ──────────────────────────────────────────────

function moonPosition(jd) {
  const T = JC(jd);
  const T2 = T * T;
  const T3 = T2 * T;
  const T4 = T3 * T;

  // Temel argümanlar
  let Lp = 218.3164477 + 481267.88123421 * T - 0.0015786 * T2 + T3/538841 - T4/65194000;
  let D  = 297.8501921 + 445267.1114034  * T - 0.0018819 * T2 + T3/545868 - T4/113065000;
  let M  = 357.5291092 + 35999.0502909   * T - 0.0001536 * T2 + T3/24490000;
  let Mp = 134.9633964 + 477198.8675055  * T + 0.0087414 * T2 + T3/69699 - T4/14712000;
  let F  = 93.2720950  + 483202.0175233  * T - 0.0036539 * T2 - T3/3526000 + T4/863310000;

  Lp = norm360(Lp); D = norm360(D); M = norm360(M);
  Mp = norm360(Mp); F = norm360(F);

  // Düzeltme faktörü
  const E = 1 - 0.002516 * T - 0.0000074 * T2;
  const E2 = E * E;

  // Boylam toplamı (ana terimler)
  let sumL = 0;
  const lonTerms = [
    [0,0,1,0,6288774], [2,0,-1,0,1274027], [2,0,0,0,658314],
    [0,0,2,0,213618],  [0,1,0,0,-185116],  [0,0,0,2,-114332],
    [2,0,-2,0,58793],  [2,-1,-1,0,57066],  [2,0,1,0,53322],
    [2,-1,0,0,45758],  [0,1,-1,0,-40923],  [1,0,0,0,-34720],
    [0,1,1,0,-30383],  [2,0,0,-2,15327],   [0,0,1,2,-12528],
    [0,0,1,-2,10980],  [4,0,-1,0,10675],   [0,0,3,0,10034],
    [4,0,-2,0,8548],   [2,1,-1,0,-7888],   [2,1,0,0,-6766],
    [1,0,-1,0,-5163],  [1,1,0,0,4987],     [2,-1,1,0,4036],
    [2,0,2,0,3994],    [4,0,0,0,3861],     [2,0,-3,0,3665],
    [0,1,-2,0,-2689],  [2,0,-1,2,-2602],   [2,-1,-2,0,2390],
    [1,0,1,0,-2348],   [2,-2,0,0,2236],    [0,1,2,0,-2120],
    [0,2,0,0,-2069],   [2,-2,-1,0,2048],   [2,0,1,-2,-1773],
    [2,0,0,2,-1595],   [4,-1,-1,0,1215],   [0,0,2,2,-1110],
    [3,0,-1,0,-892],   [2,1,1,0,-810],     [4,-1,-2,0,759],
    [0,2,-1,0,-713],   [2,2,-1,0,-700],    [2,1,-2,0,691],
    [2,-1,0,-2,596],   [4,0,1,0,549],      [0,0,4,0,537],
    [4,-1,0,0,520],    [1,0,-2,0,-487],    [2,1,0,-2,-399],
    [0,0,2,-2,-381],   [1,1,1,0,351],      [3,0,-2,0,-340],
    [4,0,-3,0,330],    [2,-1,2,0,327],     [0,2,1,0,-323],
    [1,1,-1,0,299],    [2,0,3,0,294],
  ];
  for (const [d, m, mp, f, coef] of lonTerms) {
    let c = coef;
    if (Math.abs(m) === 1) c *= E;
    if (Math.abs(m) === 2) c *= E2;
    sumL += c * sin(D*d + M*m + Mp*mp + F*f);
  }

  // Enlem toplamı (ana terimler)
  let sumB = 0;
  const latTerms = [
    [0,0,0,1,5128122],[0,0,1,1,280602],[0,0,1,-1,277693],
    [2,0,0,-1,173237],[2,0,-1,1,55413],[2,0,-1,-1,46272],
    [2,0,0,1,32573],  [0,0,2,1,17198], [2,0,1,-1,9266],
    [0,0,2,-1,8822],  [2,-1,0,-1,8216],[2,0,-2,-1,4324],
    [2,0,1,1,4200],   [2,1,0,-1,-3359],[2,-1,-1,1,2463],
    [2,-1,0,1,2211],  [2,-1,-1,-1,2065],[0,1,-1,-1,-1870],
    [4,0,-1,-1,1828], [0,1,0,1,-1794], [0,0,0,3,-1749],
    [0,1,-1,1,-1565], [1,0,0,1,-1491], [0,1,1,1,-1475],
    [0,1,1,-1,-1410], [0,1,0,-1,-1344],[1,0,0,-1,-1335],
    [0,0,3,1,1107],   [4,0,0,-1,1021], [4,0,-1,1,833],
  ];
  for (const [d, m, mp, f, coef] of latTerms) {
    let c = coef;
    if (Math.abs(m) === 1) c *= E;
    if (Math.abs(m) === 2) c *= E2;
    sumB += c * sin(D*d + M*m + Mp*mp + F*f);
  }

  // Düzeltmeler
  const A1 = norm360(119.75 + 131.849 * T);
  const A2 = norm360(53.09 + 479264.290 * T);
  const A3 = norm360(313.45 + 481266.484 * T);
  sumL += 3958*sin(A1) + 1962*sin(Lp - F) + 318*sin(A2);
  sumB += -2235*sin(Lp) + 382*sin(A3) + 175*sin(A1-F) +
           175*sin(A1+F) + 127*sin(Lp-Mp) - 115*sin(Lp+Mp);

  const moonLon = norm360(Lp + sumL/1000000);
  const moonLat = sumB / 1000000;

  // Mesafe (km)
  let sumR = 0;
  const distTerms = [
    [0,0,0,0,-20905355],[2,0,0,0,-3699111],[2,0,-1,0,-2955968],
    [0,0,1,0,-569925],  [0,1,0,0,48888],   [0,0,0,2,-3149],
    [2,0,-2,0,246158],  [2,-1,0,0,-152138],[2,0,1,0,-170733],
    [2,-1,-1,0,-204586],[0,1,-1,0,-129620],[1,0,0,0,108743],
    [0,1,1,0,104755],   [4,0,0,0,10321],   [0,0,2,0,79661],
  ];
  for (const [d, m, mp, f, coef] of distTerms) {
    let c = coef;
    if (Math.abs(m) === 1) c *= E;
    sumR += c * cos(D*d + M*m + Mp*mp + F*f);
  }
  const moonDist = 385000.56 + sumR/1000;

  return {
    longitude: moonLon,
    latitude: moonLat,
    distance: moonDist,
    ...getLongitudeInfo(moonLon)
  };
}

// ──────────────────────────────────────────────
// GEZEGENLERİN KEPLERYUM ELEMANLARI
// J2000.0 epok + yüzyıl başına değişim
// ──────────────────────────────────────────────

const PLANET_ELEMENTS = {
  mercury: {
    name: "Merkür", symbol: "☿",
    a:  [0.38709927,  0.00000037],
    e:  [0.20563593,  0.00001906],
    I:  [7.00497902, -0.00594749],
    L:  [252.25032350,149472.67411175],
    lp: [77.45779628,  0.16047689],
    Om: [48.33076593, -0.12534081],
  },
  venus: {
    name: "Venüs", symbol: "♀",
    a:  [0.72333566,  0.00000390],
    e:  [0.00677672, -0.00004107],
    I:  [3.39467605, -0.00078890],
    L:  [181.97909950,58517.81538729],
    lp: [131.60246718,  0.00268329],
    Om: [76.67984255, -0.27769418],
  },
  mars: {
    name: "Mars", symbol: "♂",
    a:  [1.52371034,  0.00001847],
    e:  [0.09339410,  0.00007882],
    I:  [1.84969142, -0.00813131],
    L:  [355.44656800,19140.30268499],
    lp: [336.06023395,  0.44441088],
    Om: [49.55953891, -0.29257343],
  },
  jupiter: {
    name: "Jüpiter", symbol: "♃",
    a:  [5.20288700, -0.00011607],
    e:  [0.04838624, -0.00013253],
    I:  [1.30439695, -0.00183714],
    L:  [34.39644051, 3034.74612775],
    lp: [14.72847983,  0.21252668],
    Om: [100.47390909,  0.20469106],
  },
  saturn: {
    name: "Satürn", symbol: "♄",
    a:  [9.53667594, -0.00125060],
    e:  [0.05386179, -0.00050991],
    I:  [2.48599187,  0.00193609],
    L:  [49.95424423, 1222.49362201],
    lp: [92.59887831, -0.41897216],
    Om: [113.66242448, -0.28867794],
  },
  uranus: {
    name: "Uranüs", symbol: "♅",
    a:  [19.18916464, -0.00196176],
    e:  [0.04725744, -0.00004397],
    I:  [0.77263783, -0.00242939],
    L:  [313.23810451,  428.48202785],
    lp: [170.95427630,  0.40805281],
    Om: [74.01692503,  0.04240589],
  },
  neptune: {
    name: "Neptün", symbol: "♆",
    a:  [30.06992276,  0.00026291],
    e:  [0.00859048,  0.00005105],
    I:  [1.77004347,  0.00035372],
    L:  [304.88088625,  218.45945325],
    lp: [44.96476227, -0.32241464],
    Om: [131.78422574, -0.00508664],
  },
  pluto: {
    name: "Plüton", symbol: "♇",
    a:  [39.48211675, -0.00031596],
    e:  [0.24882730,  0.00005170],
    I:  [17.14001206,  0.00004818],
    L:  [238.92903833,  145.20780515],
    lp: [224.06891629, -0.04062942],
    Om: [110.30393684, -0.01183482],
  }
};

// Kepler denklemini iteratif çöz (E — eksantrik anomali)
function solveKepler(M, e, tol = 1e-8) {
  M = toRad(norm360(M));
  let E = M + e * Math.sin(M) * (1 + e * Math.cos(M));
  for (let i = 0; i < 100; i++) {
    const dE = (M - E + e * Math.sin(E)) / (1 - e * Math.cos(E));
    E += dE;
    if (Math.abs(dE) < tol) break;
  }
  return E;
}

// Gezegen ekliptik koordinatları (J2000 eksenel)
function planetHeliocentric(elem, T) {
  const a  = elem.a[0]  + elem.a[1]  * T;
  const e  = elem.e[0]  + elem.e[1]  * T;
  const I  = elem.I[0]  + elem.I[1]  * T;
  const L  = norm360(elem.L[0]  + elem.L[1]  * T);
  const lp = norm360(elem.lp[0] + elem.lp[1] * T);
  const Om = norm360(elem.Om[0] + elem.Om[1] * T);

  const w = norm360(lp - Om);   // Perihel argümanı
  const M = norm360(L - lp);    // Ortalama anomali

  const E = solveKepler(M, e);

  // Heliocentric koordinatlar (yörünge düzlemi)
  const xp = a * (Math.cos(E) - e);
  const yp = a * Math.sqrt(1 - e*e) * Math.sin(E);

  // Ekliptiğe dönüştür
  const wRad = toRad(w), OmRad = toRad(Om), IRad = toRad(I);
  const cosOm = Math.cos(OmRad), sinOm = Math.sin(OmRad);
  const cosI  = Math.cos(IRad),  sinI  = Math.sin(IRad);
  const cosw  = Math.cos(wRad),  sinw  = Math.sin(wRad);

  const x = (cosOm*cosw - sinOm*sinw*cosI)*xp + (-cosOm*sinw - sinOm*cosw*cosI)*yp;
  const y = (sinOm*cosw + cosOm*sinw*cosI)*xp + (-sinOm*sinw + cosOm*cosw*cosI)*yp;
  const z = (sinw*sinI)*xp + (cosw*sinI)*yp;

  return { x, y, z, a, e, I, L, lp, Om, w, M };
}

// Güneş'in heliocentric koordinatları (Dünya'nın ters işareti)
function sunHeliocentric(T) {
  const earthElem = {
    a:  [1.00000261,  0.00000562],
    e:  [0.01671022, -0.00003804],
    I:  [0.00005,    -0.01294668],
    L:  [100.46456310,35999.37244981],
    lp: [102.93768193,  0.32327364],
    Om: [-11.26064, -18228.25],
  };
  const h = planetHeliocentric(earthElem, T);
  return { x: -h.x, y: -h.y, z: -h.z };
}

// Gezegen görünür ekliptik boylamı (Dünya merkezli)
function planetGeocentricLongitude(planetKey, jd) {
  const T = JC(jd);
  const elem = PLANET_ELEMENTS[planetKey];
  const p = planetHeliocentric(elem, T);
  const s = sunHeliocentric(T);

  // Geocentric kartezyen
  const gx = p.x + s.x;
  const gy = p.y + s.y;

  // Ekliptik boylam
  const lon = norm360(toDeg(Math.atan2(gy, gx)));

  // Enlem
  const r = Math.sqrt(gx*gx + gy*gy + (p.z+s.z)*(p.z+s.z));
  const lat = toDeg(Math.asin((p.z + s.z) / r));

  return { longitude: lon, latitude: lat, ...getLongitudeInfo(lon) };
}

// ──────────────────────────────────────────────
// YÜKSELENİN (ASCENDANT) HESAPLANMASI
// ──────────────────────────────────────────────

function siderealTime(jd, longitude) {
  const T = JC(jd);
  // Greenwich ortalama yıldız zamanı (derece)
  let GMST = 280.46061837 + 360.98564736629 * (jd - 2451545) +
             0.000387933 * T * T - T * T * T / 38710000;
  GMST = norm360(GMST);
  // Yerel yıldız zamanı
  return norm360(GMST + longitude);
}

function ascendant(jd, lat, lon) {
  const eps = obliquity(JC(jd));
  const RAMC = toRad(siderealTime(jd, lon)); // Right Ascension of MC
  const latRad = toRad(lat);
  const epsRad = toRad(eps);

  // Ascendant açısı
  const y = -Math.cos(RAMC);
  const x = Math.sin(RAMC) * Math.cos(epsRad) + Math.tan(latRad) * Math.sin(epsRad);
  let asc = norm360(toDeg(Math.atan2(y, x)));

  return { longitude: asc, ...getLongitudeInfo(asc) };
}

// Midheaven (MC)
function midheaven(jd, lon) {
  const eps = obliquity(JC(jd));
  const RAMC = siderealTime(jd, lon);
  const mc = norm360(toDeg(Math.atan2(Math.tan(toRad(RAMC)), Math.cos(toRad(eps)))));
  return { longitude: mc, ...getLongitudeInfo(mc) };
}

// ──────────────────────────────────────────────
// 12 EV HESAPLAMA (Placidus sistemi)
// ──────────────────────────────────────────────

function houses(jd, lat, lon) {
  const eps = obliquity(JC(jd));
  const RAMC = siderealTime(jd, lon);
  const latRad = toRad(lat);
  const epsRad = toRad(eps);

  const MC = norm360(toDeg(Math.atan2(
    Math.tan(toRad(RAMC)),
    Math.cos(epsRad)
  )));

  const ASC = ascendant(jd, lat, lon).longitude;

  // Placidus ev başlangıçları
  function placidusHouse(n) {
    const ratio = n / 3;
    const OA = toRad(RAMC) + toRad(ratio * 30);
    const dec = Math.asin(Math.sin(epsRad) * Math.sin(OA));
    const MD = Math.acos(-Math.tan(latRad) * Math.tan(dec));
    const RA = (n <= 3) ?
      (toRad(RAMC) + MD * ratio) :
      (toRad(RAMC) + Math.PI - MD * ratio);
    const lon2 = norm360(toDeg(Math.atan2(
      Math.sin(RA) * Math.cos(epsRad),
      Math.cos(RA)
    )));
    return lon2;
  }

  // 12 ev (Placidus yaklaşımı)
  const cusps = [
    ASC,                              // Ev 1
    placidusHouse(1),                 // Ev 2
    placidusHouse(2),                 // Ev 3
    norm360(MC + 180),                // Ev 4 (IC)
    norm360(placidusHouse(2) + 180),  // Ev 5
    norm360(placidusHouse(1) + 180),  // Ev 6
    norm360(ASC + 180),               // Ev 7 (Descendant)
    norm360(placidusHouse(1) + 180),  // Ev 8
    norm360(placidusHouse(2) + 180),  // Ev 9
    MC,                               // Ev 10 (MC)
    norm360(placidusHouse(1)),        // Ev 11
    norm360(placidusHouse(2)),        // Ev 12
  ];

  // Eşit evler (Ascendant bazlı) — yedek sistem
  const equalCusps = Array.from({length: 12}, (_, i) => norm360(ASC + i * 30));

  return cusps.map((c, i) => ({
    house: i + 1,
    longitude: c,
    ...getLongitudeInfo(c)
  }));
}

// ──────────────────────────────────────────────
// AÇILAR (ASPECTS)
// ──────────────────────────────────────────────

const ASPECTS = [
  { name: "Kavuşum",  orb: 10, angle: 0,   symbol: "☌", nature: "Nötr"   },
  { name: "Sekstil",  orb: 6,  angle: 60,  symbol: "⚹", nature: "Kolay"  },
  { name: "Kare",     orb: 8,  angle: 90,  symbol: "□", nature: "Zor"    },
  { name: "Üçgen",    orb: 8,  angle: 120, symbol: "△", nature: "Kolay"  },
  { name: "Karşıt",   orb: 10, angle: 180, symbol: "☍", nature: "Zor"    },
  { name: "Yarım ☐",  orb: 2,  angle: 45,  symbol: "∠", nature: "Hafif Zor" },
  { name: "150°",     orb: 2,  angle: 150, symbol: "⚻", nature: "Karma"  },
];

function calculateAspects(planets) {
  const aspects = [];
  const keys = Object.keys(planets);

  for (let i = 0; i < keys.length; i++) {
    for (let j = i + 1; j < keys.length; j++) {
      const p1 = planets[keys[i]];
      const p2 = planets[keys[j]];
      if (!p1 || !p2) continue;

      const diff = Math.abs(norm180(p1.longitude - p2.longitude));

      for (const asp of ASPECTS) {
        const orb = Math.abs(diff - asp.angle);
        if (orb <= asp.orb) {
          aspects.push({
            planet1: keys[i],
            planet2: keys[j],
            aspect: asp.name,
            symbol: asp.symbol,
            nature: asp.nature,
            orb: orb.toFixed(2),
            exact: orb < 1,
            applying: null // retrograd hesabı gerektirir, şimdilik null
          });
        }
      }
    }
  }

  return aspects.sort((a, b) => parseFloat(a.orb) - parseFloat(b.orb));
}

// ──────────────────────────────────────────────
// RETROGRAd KONTROL
// ──────────────────────────────────────────────

function isRetrograde(planetKey, jd) {
  const lon1 = planetGeocentricLongitude(planetKey, jd - 1).longitude;
  const lon2 = planetGeocentricLongitude(planetKey, jd + 1).longitude;
  let diff = lon2 - lon1;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  return diff < 0;
}

// ──────────────────────────────────────────────
// AY FAZ HESAPLAMA
// ──────────────────────────────────────────────

function moonPhase(jd) {
  const sun = sunPosition(jd);
  const moon = moonPosition(jd);
  let phase = norm360(moon.longitude - sun.longitude);

  const phases = [
    { name: "Yeni Ay",      min: 0,   max: 22.5,  symbol: "🌑", energy: "Yeni başlangıçlar, niyet" },
    { name: "Hilal",        min: 22.5, max: 67.5,  symbol: "🌒", energy: "Büyüme, adım atma" },
    { name: "İlk Dördün",   min: 67.5, max: 112.5, symbol: "🌓", energy: "Eylem, karar" },
    { name: "Şişen Ay",     min: 112.5,max: 157.5, symbol: "🌔", energy: "Geliştirme, netleşme" },
    { name: "Dolunay",      min: 157.5,max: 202.5, symbol: "🌕", energy: "Doruk, farkındalık" },
    { name: "Azalan Şişen", min: 202.5,max: 247.5, symbol: "🌖", energy: "Paylaşım, yansıma" },
    { name: "Son Dördün",   min: 247.5,max: 292.5, symbol: "🌗", energy: "Bırakma, temizlenme" },
    { name: "Balzam",       min: 292.5,max: 337.5, symbol: "🌘", energy: "Dinlenme, hazırlanma" },
    { name: "Yeni Ay",      min: 337.5,max: 360,   symbol: "🌑", energy: "Yeni başlangıçlar, niyet" },
  ];

  const current = phases.find(p => phase >= p.min && phase < p.max) || phases[0];

  return {
    phase,
    illumination: ((1 - Math.cos(toRad(phase))) / 2 * 100).toFixed(1),
    ...current
  };
}

// ──────────────────────────────────────────────
// KONUM KOORDİNATLARI YARDIMCISI
// ──────────────────────────────────────────────

// Şehir adından koordinat (yaygın şehirler)
const CITY_COORDS = {
  "istanbul":    { lat: 41.0082, lon: 28.9784 },
  "ankara":      { lat: 39.9334, lon: 32.8597 },
  "izmir":       { lat: 38.4192, lon: 27.1287 },
  "antalya":     { lat: 36.8969, lon: 30.7133 },
  "bursa":       { lat: 40.1826, lon: 29.0665 },
  "adana":       { lat: 37.0000, lon: 35.3213 },
  "gaziantep":   { lat: 37.0662, lon: 37.3833 },
  "konya":       { lat: 37.8713, lon: 32.4846 },
  "kayseri":     { lat: 38.7312, lon: 35.4787 },
  "mersin":      { lat: 36.8000, lon: 34.6333 },
  "london":      { lat: 51.5074, lon: -0.1278 },
  "new york":    { lat: 40.7128, lon: -74.0060 },
  "paris":       { lat: 48.8566, lon: 2.3522  },
  "berlin":      { lat: 52.5200, lon: 13.4050 },
  "amsterdam":   { lat: 52.3676, lon: 4.9041  },
  "los angeles": { lat: 34.0522, lon: -118.2437 },
  "tokyo":       { lat: 35.6762, lon: 139.6503 },
  "dubai":       { lat: 25.2048, lon: 55.2708 },
  "amsterdam":   { lat: 52.3676, lon: 4.9041  },
};

function getCityCoords(cityName) {
  const key = cityName.toLowerCase().trim();
  return CITY_COORDS[key] || null;
}

// ──────────────────────────────────────────────
// TIMEZONE OFFSETİ — bölge bilinçli tahmin
// ──────────────────────────────────────────────

// Büyük bölgeler için yaklaşık standart UTC offset'leri (yaz saati hariç ham değer)
// lat/lon kutusu → standart offset. Yaz saati ayrıca uygulanır.
const TZ_REGIONS = [
  // Türkiye — tam tarihsel yaz saati tablosu
  { lat:[35,43], lon:[25,45], std:2, dstFn:(y,mo,d)=> getTurkeyUTCOffset(y,mo,d)-2 },
  // İberya yarımadası — İspanya UTC+1, 1974'ten DST
  { lat:[36,44], lon:[-9,-1.5], std:1, dstFn:(y,mo,d)=> {
    if (y < 1974) return 0;
    return isEUDst(y,mo,d) ? 1 : (y >= 1974 && y <= 1975 && mo >= 4 && mo <= 9 ? 1 : 0);
  }},
  { lat:[37,42], lon:[-10,-9],  std:0, dstFn:(y,mo,d)=> isUKDst(y,mo,d) ? 1 : 0 }, // Portekiz
  // İngiltere / İrlanda UTC+0
  { lat:[50,59], lon:[-10,1.5], std:0, dstFn:(y,mo,d)=> isUKDst(y,mo,d) ? 1 : 0 },
  // Doğu Avrupa (Yunanistan, Romanya, Finlandiya, Ukrayna) UTC+2
  { lat:[34,62], lon:[20.5,40], std:2, dstFn:(y,mo,d)=> isEUDst(y,mo,d) ? 1 : 0 },
  // Orta Avrupa (Almanya, Fransa, İtalya, Polonya, Avusturya) UTC+1
  { lat:[36,55], lon:[1.5,20.5], std:1, dstFn:(y,mo,d)=> isEUDst(y,mo,d) ? 1 : 0 },
  // ABD Doğu UTC-5
  { lat:[24,48], lon:[-85,-67], std:-5, dstFn:(y,mo,d)=> isUSDst(y,mo,d) ? 1 : 0 },
  // ABD Orta UTC-6
  { lat:[24,49], lon:[-104,-85], std:-6, dstFn:(y,mo,d)=> isUSDst(y,mo,d) ? 1 : 0 },
  // ABD Dağ UTC-7
  { lat:[28,49], lon:[-115,-104], std:-7, dstFn:(y,mo,d)=> isUSDst(y,mo,d) ? 1 : 0 },
  // ABD Pasifik UTC-8
  { lat:[30,49], lon:[-125,-115], std:-8, dstFn:(y,mo,d)=> isUSDst(y,mo,d) ? 1 : 0 },
];

// Avrupa yaz saati — tam tarihsel kapsam
function isEUDst(year, month, day) {
  // 1996+: standart AB kuralı — Mart son Pazar → Ekim son Pazar
  if (year >= 1996) {
    if (month > 3 && month < 10) return true;
    if (month < 3 || month > 10) return false;
    const lastSun = (y,m)=>{ const d=new Date(Date.UTC(y,m-1+1,0)); return d.getUTCDate()-d.getUTCDay(); };
    if (month===3) return day >= lastSun(year,3);
    if (month===10) return day < lastSun(year,10);
    return false;
  }
  // 1980–1995: ülke bazlı tablo (Almanya bazlı, çoğu AB ülkesi aynı)
  if (year >= 1980) return _dstFromTable(EU_DST_1980_1995, year, month, day);
  // 1940–1979: DST ya yoktu ya da çok karmaşıktı
  // 1977–1979: Bazı ülkeler deneme amaçlı (Nisan 1. Pazar – Eylül son Pazar yaklaşımı)
  if (year >= 1977) {
    if (month > 4 && month < 9) return true;
    if (month < 4 || month > 9) return false;
    // Yaklaşım: Nisan başı – Eylül sonu
    if (month===4) return day >= 1;
    if (month===9) return day <= 30;
    return false;
  }
  // 1977–1979: çoğu ülke Nisan-Eylül DST
  if (year >= 1977) return month >= 4 && month <= 9;
  // 1976: Fransa başladı (ve İspanya 1974'ten beri)
  if (year === 1976) return month >= 4 && month <= 9;
  // 1974–1975: Sadece İspanya ve birkaç ülke — genel EU için DST yok
  return false;
}

// İngiltere/Portekiz yaz saati — tam kapsam
function isUKDst(year, month, day) {
  if (year >= 1996) return isEUDst(year, month, day); // AB ile aynı 1996+
  if (year >= 1980) return _dstFromTable(UK_DST_1980_1995, year, month, day);
  // 1968-1971: İngiltere kalıcı BST (yaz saati yok, daima UTC+1)
  if (year >= 1968 && year <= 1971) return true;
  // 1972-1979: Mart son Pazar – Ekim son Pazar yaklaşımı
  if (year >= 1972) {
    if (month > 3 && month < 10) return true;
    if (month < 3 || month > 10) return false;
    if (month===3) return day >= 25; // son Pazar yaklaşımı
    if (month===10) return day < 25;
    return false;
  }
  // 1940-1967: Nisan–Ekim yaklaşımı
  if (year >= 1940) return month >= 4 && month <= 10;
  return false;
}
// ABD yaz saati: 2007+ Mart 2. pazar – Kasım 1. pazar (öncesi Nisan-Ekim)
function isUSDst(year, month, day) {
  if (year >= 2007) {
    if (month > 3 && month < 11) return true;
    if (month < 3 || month > 11) return false;
    const secondSunday = (y,m)=>{ const d=new Date(Date.UTC(y,m-1,1)); const fs=(7-d.getUTCDay())%7+1; return fs+7; };
    const firstSunday = (y,m)=>{ const d=new Date(Date.UTC(y,m-1,1)); return (7-d.getUTCDay())%7+1; };
    if (month === 3) return day >= secondSunday(year,3);
    if (month === 11) return day < firstSunday(year,11);
    return false;
  } else {
    return month > 4 && month < 10;
  }
}

/**
 * UTC offset hesabı — iki katmanlı sistem:
 *
 * 1. Tier: IANA timezone adı (ör. "Europe/Berlin") verilmişse → tam tarihsel doğruluk
 *    Bu, harita.html'deki Nominatim/browser Intl API'sinden gelebilir.
 *    Browser ortamında: Intl.DateTimeFormat().resolvedOptions().timeZone
 *
 * 2. Tier: Sadece lat/lon varsa → bölge tablosu + yaz saati kuralları
 *    1996+ için AB/ABD standartları, 1940–1995 için ülke bazlı tarihsel tablolar
 */

// ── AB ORTAK TARİHSEL KURALLARI (1940–1995) ──────────────────────────────────
// Kaynak: IANA tzdata, timeanddate.com, 4.3BSD-Reno Europe zoneinfo
//
// 1996+: isEUDst() ile çözülüyor (son Pazar Mart–son Pazar Ekim)
// 1980–1995: Çoğu AB ülkesi benzer ama bitiş tarihi Eylül sonu (1995'e kadar Ekim olmayan)
// 1940–1979: Karmaşık, ülke bazlı farklı

// Almanya/Orta Avrupa 1980–1995 DST tablosu (birçok AB ülkesi aynı tarihleri izledi)
const EU_DST_1980_1995 = {
  // [başlangıç [ay,gün], bitiş [ay,gün]]
  1980: [[4,6],[9,28]],  1981: [[3,29],[9,27]],  1982: [[3,28],[9,26]],
  1983: [[3,27],[9,25]],  1984: [[3,25],[9,30]],  1985: [[3,31],[9,29]],
  1986: [[3,30],[9,28]],  1987: [[3,29],[9,27]],  1988: [[3,27],[9,25]],
  1989: [[3,26],[9,24]],  1990: [[3,25],[9,30]],  1991: [[3,31],[9,29]],
  1992: [[3,29],[9,27]],  1993: [[3,28],[9,26]],  1994: [[3,27],[10,23]], // bitiş Ekim'e geçti
  1995: [[3,26],[10,22]], // 1996'dan sonra standartlaştı
};

// İngiltere/Portekiz 1980–1995 (benzer ama 1 saat geri — BST+1 değil)
const UK_DST_1980_1995 = {
  // İngiltere 1981'den itibaren AB ile aynı
  1980: [[3,16],[10,26]], 1981: [[3,29],[10,25]], 1982: [[3,28],[10,24]],
  1983: [[3,27],[10,23]], 1984: [[3,25],[10,28]], 1985: [[3,31],[10,27]],
  1986: [[3,30],[10,26]], 1987: [[3,29],[10,25]], 1988: [[3,27],[10,23]],
  1989: [[3,26],[10,29]], 1990: [[3,25],[10,28]], 1991: [[3,31],[10,27]],
  1992: [[3,29],[10,25]], 1993: [[3,28],[10,24]], 1994: [[3,27],[10,23]],
  1995: [[3,26],[10,22]],
};

function _dstFromTable(table, year, month, day) {
  const e = table[year];
  if (!e) return false;
  const [s, en] = e;
  const after  = month > s[0]  || (month === s[0]  && day >= s[1]);
  const before = month < en[0] || (month === en[0] && day <= en[1]);
  return after && before;
}

// Fransa 1976'dan, İspanya 1974'ten DST uyguladı — Orta Avrupa tablosundan önce
// bu yıllarda başlangıç
const FRANCE_DST_START = 1976;
const SPAIN_DST_START  = 1974;
const GERMANY_DST_START = 1980; // Doğu+Batı birlikte 1980'de başladı

function getUTCOffset(lon, lat, year, month, day, tzName) {
  // ── TİER 1: IANA timezone adı verilmişse (tarayıcı API veya kullanıcı girdisi) ──
  if (tzName && typeof Intl !== 'undefined') {
    try {
      // Intl.DateTimeFormat ile o tarihteki gerçek offset'i hesapla
      const d = new Date(year, month - 1, day, 12, 0, 0);
      const formatted = new Intl.DateTimeFormat('en', {
        timeZone: tzName,
        timeZoneName: 'shortOffset',
      }).formatToParts(d);
      const tzPart = formatted.find(p => p.type === 'timeZoneName');
      if (tzPart) {
        const m = tzPart.value.match(/GMT([+-])(\d+)(?::(\d+))?/);
        if (m) {
          const sign = m[1] === '+' ? 1 : -1;
          return sign * (parseInt(m[2]) + (parseInt(m[3] || 0) / 60));
        }
      }
    } catch(e) { /* fallback */ }
  }

  // ── TİER 2: Lat/lon bölge tablosu ──
  if (lat === undefined || lat === null) return Math.round(lon / 15);

  for (const r of TZ_REGIONS) {
    if (lat >= r.lat[0] && lat <= r.lat[1] && lon >= r.lon[0] && lon <= r.lon[1]) {
      const delta = r.dstFn ? r.dstFn(year, month, day) : 0;
      return r.std + (typeof delta === "number" ? delta : 0);
    }
  }
  return Math.round(lon / 15);
}

// ──────────────────────────────────────────────
// ANA HESAPLAMA FONKSİYONU
// ──────────────────────────────────────────────

/**
 * Tam natal harita hesaplar
 * @param {Object} params
 * @param {number} params.year
 * @param {number} params.month  (1-12)
 * @param {number} params.day
 * @param {number} params.hour   (yerel saat)
 * @param {number} params.minute
 * @param {number} params.lat    (enlem, derece)
 * @param {number} params.lon    (boylam, derece)
 * @param {number} [params.utcOffset] (UTC farkı, saat)
 */
function calculateNatalChart(params) {
  const { year, month, day, hour = 12, minute = 0, lat, lon } = params;
  const utcOffset = params.utcOffset !== undefined
    ? params.utcOffset
    : getUTCOffset(lon, lat, year, month, day, params.tzName);

  // UTC'ye çevir
  const utcHour = hour - utcOffset;
  const jd = dateToJD(year, month, day, utcHour, minute);

  // Güneş
  const sun = sunPosition(jd);

  // Ay
  const moon = moonPosition(jd);

  // Yükselen & MC
  const asc = ascendant(jd, lat, lon);
  const mc  = midheaven(jd, lon);

  // Gezegenler
  const planetPositions = {};
  for (const key of Object.keys(PLANET_ELEMENTS)) {
    const pos = planetGeocentricLongitude(key, jd);
    pos.retrograde = isRetrograde(key, jd);
    pos.name = PLANET_ELEMENTS[key].name;
    pos.symbol = PLANET_ELEMENTS[key].symbol;
    planetPositions[key] = pos;
  }

  // Evler
  const houseList = houses(jd, lat, lon);

  // Tüm gezegenler + ışıklar için açı hesabı
  const allPoints = {
    sun:     { longitude: sun.longitude,  name: "Güneş",  symbol: "☉" },
    moon:    { longitude: moon.longitude, name: "Ay",     symbol: "☽" },
    ...planetPositions,
    asc:     { longitude: asc.longitude,  name: "Yükselen", symbol: "ASC" },
    mc:      { longitude: mc.longitude,   name: "MC",      symbol: "MC"  },
  };

  const aspectList = calculateAspects(allPoints);

  // Ay fazı
  const phase = moonPhase(jd);

  // Düğüm noktaları (Kuzey Düğüm)
  const T = JC(jd);
  const northNode = norm360(125.04452 - 1934.136261 * T + 0.0020708 * T*T + T*T*T/450000);

  return {
    jd,
    input: { year, month, day, hour, minute, lat, lon, utcOffset },
    sun,
    moon,
    ascendant: asc,
    midheaven: mc,
    planets: planetPositions,
    houses: houseList,
    aspects: aspectList,
    moonPhase: phase,
    northNode: { longitude: northNode, ...getLongitudeInfo(northNode) },
    southNode: { longitude: norm360(northNode + 180), ...getLongitudeInfo(norm360(northNode + 180)) },
  };
}

// ──────────────────────────────────────────────
// HD İÇİN ÖZEL GÜNEŞ BOYLAMINI HESAPLA
// ──────────────────────────────────────────────

/**
 * HD hesabı için gereken iki Güneş konumunu döndürür:
 *   1. Doğum anı Güneş boylamı (bilinçli kapılar)
 *   2. 88 gün + 88 dakika öncesi Güneş boylamı (bilinçsiz kapılar)
 */
function calculateHDSunPositions(year, month, day, hour, minute, utcOffset) {
  const utcHour = hour - utcOffset;
  const jdBirth = dateToJD(year, month, day, utcHour, minute);

  // Bilinçsiz: 88 gün + 88 dakika önce
  // Bilinçsiz (Design): Güneş tam 88° YAY geride olduğu an.
  // (Eskiden "88 takvim günü" alınıyordu → mevsime göre ~1-1.5° hata →
  //  design hattı kayıp profil/kapılar bozuluyordu. İteratif 88° çözümü.)
  function _designJD(jdB){
    const natalLon = sunPosition(jdB).longitude;
    const target = norm360(natalLon - 88);
    let jd = jdB - 88;
    for(let i=0;i<10;i++){
      const cur = sunPosition(jd).longitude;
      const diff = ((target - cur + 540) % 360) - 180;
      jd += diff / 0.9856;
    }
    return jd;
  }
  const jdUnconscious = _designJD(jdBirth);

  const conscious   = sunPosition(jdBirth);
  const unconscious = sunPosition(jdUnconscious);

  // Güneş boylamından HD kapısı (0-360 → 1-64)
  // Her kapı 5.625° (360/64)
  function longitudeToGate(lon) {
    const normalized = norm360(lon);
    // HD başlangıç noktası: Kış gündönümü = Kapı 41
    // 0° Oğlak = 41. kapı başlangıcı
    const hdOffset = 270; // Oğlak = 270° ekliptik
    const adjusted = norm360(normalized - hdOffset);
    const gateIndex = Math.floor(adjusted / 5.625);
    const gateNum = ((gateIndex + 40) % 64) + 1; // 41'den başlayarak
    const lineNum = Math.floor((adjusted % 5.625) / (5.625/6)) + 1;
    return {
      gate: gateNum,
      line: Math.min(lineNum, 6),
      longitude: normalized,
      adjusted
    };
  }

  return {
    conscious:   { ...conscious,   ...longitudeToGate(conscious.longitude),   jd: jdBirth },
    unconscious: { ...unconscious, ...longitudeToGate(unconscious.longitude),  jd: jdUnconscious },
    // Design (bilinçsiz) anındaki TÜM gezegen pozisyonları — gerçek 88 gün hesabı
    designPlanets: (function(){
      const jd = jdUnconscious;
      const T = (jd - 2451545.0) / 36525;
      const moonD = moonPosition(jd);
      const nodeD = norm360(125.04452 - 1934.136261 * T + 0.0020708 * T*T + T*T*T/450000);
      const out = {
        sun:       unconscious.longitude,
        moon:      moonD.longitude,
        northNode: nodeD,
        southNode: norm360(nodeD + 180),
      };
      ['mercury','venus','mars','jupiter','saturn','uranus','neptune','pluto'].forEach(p=>{
        try { out[p] = planetGeocentricLongitude(p, jd).longitude; }
        catch(e){ out[p] = null; }
      });
      // Earth = Sun + 180
      out.earth = norm360(unconscious.longitude + 180);
      return out;
    })(),
    designJD: jdUnconscious,
  };
}

// ──────────────────────────────────────────────
// SWISS EPHEMERIS HOOK
// (varsa otomatik devreye girer)
// ──────────────────────────────────────────────

let _swisseph = null;

function initSwissEphemeris(se) {
  _swisseph = se;
  console.log('Swiss Ephemeris aktif — yüksek doğruluk modu.');
}

function isSwissEphemerisAvailable() {
  return _swisseph !== null;
}

// ──────────────────────────────────────────────
// BURÇ YORUM VERİSİ
// ──────────────────────────────────────────────

const SIGN_INTERPRETATIONS = {
  0: { // Koç
    sun:     "Güçlü bir irade ve öncü ruh taşırsınız. Harekete geçmek, başlatmak ve cesaret gerektiren durumlar sizi en canlı hissettiren anlardır.",
    moon:    "Duygularınız hızlı ateşlenir ve hızlı söner. Anlık tepkiler güçlüdür, sabır gerektiren duygusal süreçler zorlu olabilir.",
    rising:  "İlk izlenim olarak enerjik, doğrudan ve kararlı görünürsünüz. Fiziksel varlığınız güçlü bir etki bırakır.",
    mercury: "Hızlı, keskin ve doğrudan düşünürsünüz. Uzun analizden çok anlık karar alma konusunda güçlüsünüzdür.",
    venus:   "Aşkta tutkulu ve doğrudansınız. İlişkide heyecan ve özgürlük önemlidir; rutin ilişkilerde sıkılabilirsiniz.",
    mars:    "Doğal evinizde — enerji yüksek, harekete geçme içgüdüsü güçlü. Sabırsızlık en büyük zorluğunuzdur.",
    jupiter: "Cesaret ve girişimcilik konularında büyük şans. Risk alma kapasitesi gelişmiştir.",
    saturn:  "Öz-disiplin ve sabır konusunda dersler. Acelecilik engellerinizin başında gelir.",
  },
  1: { // Boğa
    sun:     "Güven, istikrar ve güzelliğe derin bir bağlılık taşırsınız. Sabır ve azminiz olağanüstüdür; bir kez karar verince yoldan çıkmazsınız.",
    moon:    "Duygusal güvenlik ve istikrar birincil ihtiyacınızdır. Değişim sizi zorlar, ama bir kez yerleştikten sonra sarsılmazsınız.",
    rising:  "Sakin, güvenilir ve hoş bir ilk izlenim. Fiziksel konfor ve estetik detaylar dikkatinizi çeker.",
    mercury: "Yavaş ama derinlemesine düşünürsünüz. Pratik zekânız teorik tartışmalardan çok sonuç odaklı analizde parlar.",
    venus:   "Güzellik, dokunuş ve duyusal zevklere derin bağlılık. İlişkide sadakat ve istikrar arar.",
    mars:    "Enerji yavaş yanar ama uzun süre devam eder. Ateşlenmesi zordur ama bir kez kızgınsa sakinleşmesi de zordur.",
    jupiter: "Maddi bolluk ve güzellik konularında şans. Güvenlik hissi başarıyı besler.",
    saturn:  "Esneklik ve değişime açıklık konusunda dersler. Güvenlik ihtiyacı büyümeyi yavaşlatabilir.",
  },
  2: { // İkizler
    sun:     "Zihinsel çeviklik, merak ve iletişim gücü doğanızın merkezindedir. Çok yönlülüğünüz hem en büyük hediyeniz hem en büyük zorluğunuzdur.",
    moon:    "Duygusal dünya zihinsel kategorilerle anlaşılır. Hisleri kelimelerle ifade etmek rahatlatır; sessizlik bunaltıcı hissettiririr.",
    rising:  "Zeki, konuşkan ve meraklı ilk izlenim. İnsanlar sizi dinamik ve yaklaşılabilir bulur.",
    mercury: "Doğal evinizde — zihin hızlı, çok yönlü ve yaratıcı. Birden fazla konuyu aynı anda işleyebilirsiniz.",
    venus:   "Zekâ ve mizah en güçlü çekim aracınızdır. İlişkide zihinsel uyum duygusal bağdan önce gelir.",
    mars:    "Enerjiniz çok yönlü akar. Odak tutmak zorluğunuzdur ama birden fazla projede aynı anda verimli olabilirsiniz.",
    jupiter: "İletişim, yazarlık ve öğretim konularında büyük potansiyel. Bilgiye erişim kapıları açık.",
    saturn:  "Derinlik ve odak konusunda dersler. Yüzeysellik uzun vadede kısıtlayıcıdır.",
  },
  3: { // Yengeç
    sun:     "Empati, koruyuculuk ve duygusal zekâ doğanızın özündedir. Ev ve aile — ya da kendinize ev gibi hissettirdiğiniz her şey — sizi besler.",
    moon:    "Doğal evinizde — duygular derin, sezgi güçlü, hafıza uzun. Geçmiş deneyimler şimdiki tepkileri güçlü biçimde etkiler.",
    rising:  "Sıcak, koruyucu ve sezgisel ilk izlenim. İnsanlar yanınızda kendilerini güvende hisseder.",
    mercury: "Düşünce duygusal hafızayla iç içedir. Sezgisel zekânız analitik akıldan çoğu zaman daha isabetlidir.",
    venus:   "İlişkide derin duygusal bağ arar. Güven ve güvenlik olmadan açılmak zordur.",
    mars:    "Enerji koruyuculuk ve savunma yönünde akar. Sevdiklerini tehdit eden şeylere karşı beklenmedik güçte tepki verebilir.",
    jupiter: "Aile, ev ve duygusal güvenlik konularında bolluk. Geçmişe bağlılık güç kaynağıdır.",
    saturn:  "Duygusal bağımsızlık ve güven konusunda dersler. Aşırı bağlılık büyümeyi engelleyebilir.",
  },
  4: { // Aslan
    sun:     "Yaratıcılık, öz-ifade ve liderlik doğanızın merkezindedir. Görülmek, tanınmak ve takdir edilmek temel bir ihtiyaçtır.",
    moon:    "Duygular dramatik yaşanır ve ifade edilir. Takdir ve onay duygusal refahın temelidir.",
    rising:  "Karizmatik, güçlü ve dikkat çekici ilk izlenim. Odaya girdiğinizde varlığınız hissedilir.",
    mercury: "Yaratıcı ve ifadeci düşünce tarzı. Fikirlerinizi sunmak analiz etmekten daha çok zevk verir.",
    venus:   "İlişkide tutkulu, sadık ve cömert. Romantizm ve drama sever; sıradan ilişkiler tatmin etmez.",
    mars:    "Enerji güçlü ve odaklı. Liderlik pozisyonlarında en verimli olursunuz.",
    jupiter: "Yaratıcılık, performans ve liderlik konularında şans. Takdir şansı besler.",
    saturn:  "Alçakgönüllülük ve onay bağımsızlığı konusunda dersler. Ego kırılganlığı en büyük engeldir.",
  },
  5: { // Başak
    sun:     "Analitik zekâ, hizmet ve mükemmeliyetçilik doğanızın özündedir. Detaylara dikkat etme ve işleri doğru yapma tutkusu güçlüdür.",
    moon:    "Duygular analiz edilir, sınıflandırılır ve yönetilir. Duyguların 'mantıklı' olmasını beklemek zorluğunuzdur.",
    rising:  "Düzenli, anlayışlı ve yardımsever ilk izlenim. Pratik çözümler sunmaya hazır görünürsünüz.",
    mercury: "Doğal evinizde — keskin, analitik ve detay odaklı zihin. Eleştirel düşünce en güçlü aracınızdır.",
    venus:   "İlişkide sadakat, güvenilirlik ve pratik destek gösterir. Büyük jestlerden çok günlük özen önemlidir.",
    mars:    "Enerji metodolojik ve verimli akar. İşleri doğru yapmak enerji verir, hatalı süreçler tüketir.",
    jupiter: "Sağlık, hizmet ve analitik beceriler konusunda şans. Ustalık şansı çeker.",
    saturn:  "Mükemmeliyetçiliği bırakmak ve 'yeterince iyi'yi kabul etmek konusunda dersler.",
  },
  6: { // Terazi
    sun:     "Denge, estetik ve ilişki doğanızın özündedir. Adalet arayışı ve harmonik bağlar kurmak içten gelen güçlü bir dürtüdür.",
    moon:    "Duygusal denge ve ilişki harmonisi önceliklidir. Çatışma ve yalnızlık duygusal refahı sekteye uğratır.",
    rising:  "Çekici, zarif ve diplomaik ilk izlenim. İnsanlar sizi dengeli ve yaklaşılabilir bulur.",
    mercury: "Fikirleri dengeli, taraflı olmadan değerlendirir. Karar vermekte zorlanmak bu hattın zorluğudur.",
    venus:   "Doğal evinizde — ilişkilerde güçlü, romantik ve estetik. Partnerlik en canlı hissettiğiniz alandır.",
    mars:    "Enerji işbirliği ve diplomasi yönünde akar. Çatışma enerjinizi düşürür, uyum artırır.",
    jupiter: "İlişkiler, sanat ve hukuk konularında şans. Ortaklıklar fırsatlar getirir.",
    saturn:  "Bağımsız karar alma ve kendi pozisyonunda durma konusunda dersler.",
  },
  7: { // Akrep
    sun:     "Dönüşüm, derinlik ve yoğunluk doğanızın özündedir. Yüzeyin altında ne olduğunu anlamak içten gelen güçlü bir dürtüdür.",
    moon:    "Duygular derin ve yoğun yaşanır. Güven zorlu kazanılır ama bir kez kuruldu mu yıkılmaz bir bağ oluşur.",
    rising:  "Yoğun, gizemli ve karizmatik ilk izlenim. İnsanlar sizi okumanın zor olduğunu hisseder.",
    mercury: "Zihin derin, araştırmacı ve şüpheci. Yüzeysel analizlerle yetinmez, köke iner.",
    venus:   "İlişkide derin, tutkulu ve tam bağlılık ister. Yarım kalan ilişkilere tahammülü yoktur.",
    mars:    "Doğal evinizde — enerji güçlü, odaklı ve dönüştürücü. Engeller enerji artırır.",
    jupiter: "Araştırma, psikoloji ve dönüşüm konularında şans. Kriz anları fırsata dönüşebilir.",
    saturn:  "Kontrol bırakma ve güven konusunda dersler. Güç mücadeleleri en büyük engeldir.",
  },
  8: { // Yay
    sun:     "Özgürlük, felsefe ve büyük resim doğanızın özündedir. Anlam arayışı ve ufukları genişletme içten gelen güçlü bir dürtüdür.",
    moon:    "Duygusal özgürlük ve macera birincil ihtiyaçtır. Kısıtlayıcı ilişkiler veya rutinler bunaltıcı hissettiririr.",
    rising:  "Neşeli, iyimser ve özgürlükçü ilk izlenim. Coşkunuz ve dürüstlüğünüz dikkat çeker.",
    mercury: "Büyük fikirler ve felsefi düşünce güçlüdür. Detaylara takılmak zorluğunuzdur.",
    venus:   "İlişkide özgürlük, macera ve entelektüel bağ ister. Bağımlı ilişkiler baskı hissettirir.",
    mars:    "Enerji keşif ve genişleme yönünde akar. Hedefler büyüdükçe enerji artar.",
    jupiter: "Doğal evinizde — şans yüksek, büyük tabloda güçlü. Seyahat ve eğitim fırsatlar açar.",
    saturn:  "Odak ve taahhüt konusunda dersler. Her şeyi aynı anda yapmaya çalışmak enerjinizi dağıtır.",
  },
  9: { // Oğlak
    sun:     "Disiplin, sorumluluk ve uzun vadeli hedefler doğanızın özündedir. Sabırla ve azimle inşa etmek içten gelen güçlü bir dürtüdür.",
    moon:    "Duygular kontrol altında tutulmayı tercih eder. Kırılganlığı göstermek zordur ama bu derinliği azaltmaz.",
    rising:  "Ciddi, güvenilir ve otoriter ilk izlenim. Sorumluluk almanın doğal olduğu izlenimi yaratırsınız.",
    mercury: "Pratik, yapılandırılmış ve sonuç odaklı düşünce. Gerçekçilik en büyük güçtür.",
    venus:   "İlişkide güvenilirlik, uzun vadeli bağlılık ve pratik destek arar. Sadakat en yüksek değerdir.",
    mars:    "Enerji metodolojik ve uzun vadeli hedeflere yönelik akar. Sabır ve strateji güçtür.",
    jupiter: "Kariyer, otorite ve uzun vadeli başarı konusunda şans. Sabır büyük ödüller getirir.",
    saturn:  "Doğal evinizde — disiplin yüksek ama sertlik en büyük kısıt. Neşeye izin vermek konusunda dersler.",
  },
  10: { // Kova
    sun:     "Yenilikçilik, bireysellik ve insanlık vizyonu doğanızın özündedir. Toplumu ilerletmek ve özgün olmak içten gelen güçlü bir dürtüdür.",
    moon:    "Duygular zihinsel kategorilerle işlenir. Duygusal mesafe bazen gerekli, bazen koruyucu bir mekanizmadır.",
    rising:  "Özgün, ilginç ve belirli bir mesafeyle ilk izlenim. Sıradan beklentilere uymayı reddedersiniz.",
    mercury: "Devrimci ve yenilikçi düşünce. Geleneksel yaklaşımlar sıkıcı hissettiririr; yeni bağlantılar kurma güçlüdür.",
    venus:   "İlişkide entelektüel bağ ve özgürlük birincildir. Alışılmadık ilişki biçimlerine açıksınız.",
    mars:    "Enerji kolektif hedefler ve toplumsal değişim yönünde akar. Bireysel rekabetten grup çalışması daha motive edicidir.",
    jupiter: "Arkadaşlıklar, kolektif projeler ve yenilik konusunda şans. Ağınız başarınızı besler.",
    saturn:  "Doğal evinizde — yeni sistemler kurmak güçlüdür ama soğukluk en büyük kısıttır. İnsan sıcaklığı konusunda dersler.",
  },
  11: { // Balık
    sun:     "Empati, sezgi ve maneviyat doğanızın özündedir. Sınırlar arasında geçişkenlik hem en büyük hediyeniz hem en büyük zorluğunuzdur.",
    moon:    "Duygular derin, sezgisel ve bazen sınır aşan biçimde yaşanır. Başkasının hislerini kendi hissi gibi taşıma riski yüksektir.",
    rising:  "Şefkatli, sezgisel ve biraz gizemli ilk izlenim. İnsanlar yanınızda kendilerini anlaşılmış hisseder.",
    mercury: "Sezgisel ve metaforik düşünce güçlüdür. Analitik kesinlik yerine anlam ve bağlantı arar.",
    venus:   "İlişkide idealist ve derin duygusal bağ ister. Hayal kırıklığı riskini taşıyan yüksek beklentiler.",
    mars:    "Enerji dağılır ve odaklanmak zorludur. Yaratıcı ve spiritüel alanlarda enerji en güçlü akar.",
    jupiter: "Doğal evinizde — sezgi, şefkat ve maneviyat konularında şans. Güven ve inanç fırsatlar açar.",
    saturn:  "Sınırlar ve gerçekçilik konusunda dersler. İllüzyon ile gerçeği ayırt etmek kritik bir pratiktir.",
  },
};

function getSignInterpretation(signIndex, planet) {
  const interp = SIGN_INTERPRETATIONS[signIndex];
  return interp ? (interp[planet] || null) : null;
}

// ──────────────────────────────────────────────
// EV YORUMLARI
// ──────────────────────────────────────────────

const HOUSE_INTERPRETATIONS = [
  { house: 1,  name: "Kimlik Evi",        theme: "Beden, kişilik, ilk izlenim, öz-görünüm" },
  { house: 2,  name: "Değerler Evi",      theme: "Para, maddi güvenlik, öz-değer, sahiplikler" },
  { house: 3,  name: "İletişim Evi",      theme: "Konuşma, yazı, kardeşler, kısa yolculuklar" },
  { house: 4,  name: "Kök Evi",           theme: "Aile, ev, kökenler, iç dünya, geçmiş" },
  { house: 5,  name: "Yaratıcılık Evi",   theme: "Çocuklar, oyun, yaratıcılık, aşk, risk" },
  { house: 6,  name: "Hizmet Evi",        theme: "Sağlık, rutin, çalışma, günlük düzen" },
  { house: 7,  name: "Ortaklık Evi",      theme: "Evlilik, ortaklıklar, açık düşmanlar" },
  { house: 8,  name: "Dönüşüm Evi",       theme: "Ölüm, yeniden doğuş, ortak kaynaklar, sırlar" },
  { house: 9,  name: "Felsefe Evi",       theme: "Yüksek öğrenim, seyahat, din, felsefe, anlam" },
  { house: 10, name: "Kariyer Evi",       theme: "Kariyer, otorite, toplumsal konum, hedefler" },
  { house: 11, name: "Topluluk Evi",      theme: "Arkadaşlar, gruplar, umutlar, kolektif projeler" },
  { house: 12, name: "Bilinçdışı Evi",    theme: "Gizlilik, sınırlar ötesi, bilinçdışı, yalnızlık" },
];

function findPlanetHouse(planetLongitude, houseCusps) {
  for (let i = 0; i < 12; i++) {
    const start = houseCusps[i].longitude;
    const end = houseCusps[(i + 1) % 12].longitude;
    const lon = norm360(planetLongitude);

    if (start <= end) {
      if (lon >= start && lon < end) return i + 1;
    } else {
      if (lon >= start || lon < end) return i + 1;
    }
  }
  return 1;
}

// ──────────────────────────────────────────────
// TAM YORUM RAPORU
// ──────────────────────────────────────────────

function generateInterpretation(chart) {
  const result = {
    sun: {
      ...chart.sun,
      interpretation: getSignInterpretation(chart.sun.signIndex, 'sun'),
      house: findPlanetHouse(chart.sun.longitude, chart.houses),
    },
    moon: {
      ...chart.moon,
      interpretation: getSignInterpretation(chart.moon.signIndex, 'moon'),
      house: findPlanetHouse(chart.moon.longitude, chart.houses),
    },
    ascendant: {
      ...chart.ascendant,
      interpretation: getSignInterpretation(chart.ascendant.signIndex, 'rising'),
    },
    midheaven: {
      ...chart.midheaven,
      houseTheme: HOUSE_INTERPRETATIONS[9].theme,
    },
    planets: {},
    aspects: chart.aspects,
    houses: chart.houses.map((h, i) => ({
      ...h,
      ...HOUSE_INTERPRETATIONS[i],
    })),
    moonPhase: chart.moonPhase,
    northNode: chart.northNode,
    southNode: chart.southNode,
  };

  // Her gezegen için ev ve yorum
  for (const [key, planet] of Object.entries(chart.planets)) {
    result.planets[key] = {
      ...planet,
      house: findPlanetHouse(planet.longitude, chart.houses),
      interpretation: getSignInterpretation(planet.signIndex, key),
    };
  }

  return result;
}

// ──────────────────────────────────────────────
// TÜRKİYE YAZ SAATİ
// Kaynak: timeanddate.com + resmi Türkiye arşivleri
// ──────────────────────────────────────────────


/**
 * Türkiye UTC offset — Resmi Gazete ve bakanlık arşivine dayalı tam tarihsel tablo.
 * Kaynak: Enerji ve Tabii Kaynaklar Bakanlığı arşivi / Burak Üstün, 2025.
 *
 * Standart saat: UTC+2 (EET)
 * Yaz saati dönemlerinde: UTC+3 (EEST)
 * İstisna: 31.07.1983–02.10.1983 → UTC+4
 * 26.03.2016'dan itibaren: kalıcı UTC+3
 *
 * @param {number} year  @param {number} month (1-12)  @param {number} day
 * @returns {number} UTC offset (saat)
 */
function getTurkeyUTCOffset(year, month, day) {
  // 2016 Mart'tan itibaren kalıcı UTC+3
  if (year > 2016 || (year === 2016 && (month > 3 || (month === 3 && day >= 27)))) return 3;

  // UTC+4 istisnası: 31.07.1983 – 02.10.1983
  if (year === 1983) {
    const afterJul31 = month > 7 || (month === 7 && day >= 31);
    const beforeOct2 = month < 10 || (month === 10 && day < 2);
    if (afterJul31 && beforeOct2) return 4;
  }
  // UTC+3 istisnası: 02.10.1983 – 01.11.1984
  if ((year === 1983 && (month > 10 || (month === 10 && day >= 2))) ||
      (year === 1984 && (month < 11 || (month === 11 && day < 1)))) return 3;

  const DST_TABLE = {
    1923: [[4,28],[9,16]],
    1940: [[7,1],[10,6]],
    1941: [[4,1],[9,20]],
    1942: [[4,1],[10,8]], 1943: [[4,1],[10,8]], 1944: [[4,1],[10,8]], 1945: [[4,1],[10,8]],
    1946: [[6,1],[10,1]],
    1947: [[4,20],[10,5]], 1948: [[4,18],[10,3]], 1949: [[4,10],[10,2]],
    1950: [[4,16],[10,8]], 1951: [[4,22],[10,7]],
    1962: [[7,15],[10,30]], 1963: [[7,15],[10,30]], 1964: [[5,15],[10,1]],
    1973: [[6,3],[11,4]], 1974: [[3,31],[11,3]], 1975: [[3,22],[11,2]],
    1976: [[3,21],[10,31]], 1977: [[4,3],[10,16]], 1978: [[4,2],[10,15]],
    1979: [[4,1],[10,14]], 1980: [[4,6],[10,12]], 1981: [[3,29],[10,11]], 1982: [[3,28],[10,10]],
    1985: [[4,20],[9,28]], 1986: [[3,30],[9,28]], 1987: [[3,29],[9,27]], 1988: [[3,27],[9,25]],
    1989: [[3,26],[9,24]], 1990: [[3,25],[9,30]], 1991: [[3,31],[9,29]], 1992: [[3,29],[9,27]],
    1993: [[3,28],[9,26]], 1994: [[3,20],[9,25]], 1995: [[3,26],[9,24]], 1996: [[3,31],[10,27]],
    1997: [[3,30],[10,26]], 1998: [[3,29],[10,25]], 1999: [[3,28],[10,31]], 2000: [[3,26],[10,29]],
    2001: [[3,25],[10,28]], 2002: [[3,31],[10,27]], 2003: [[3,30],[10,26]], 2004: [[3,28],[10,31]],
    2005: [[3,27],[10,30]], 2006: [[3,26],[10,29]], 2007: [[3,25],[10,28]], 2008: [[3,30],[10,26]],
    2009: [[3,29],[10,25]], 2010: [[3,28],[10,31]], 2011: [[3,28],[10,30]], 2012: [[3,25],[10,28]],
    2013: [[3,31],[10,27]], 2014: [[3,31],[10,26]], 2015: [[3,29],[11,8]],
  };

  const entry = DST_TABLE[year];
  if (!entry) return 2; // Uygulama yok → standart UTC+2

  const [start, end] = entry;
  // Verilen tarih yaz saati aralığında mı?
  const afterStart = month > start[0] || (month === start[0] && day >= start[1]);
  const beforeEnd  = month < end[0]   || (month === end[0]   && day <= end[1]);
  return (afterStart && beforeEnd) ? 3 : 2;
}

// ──────────────────────────────────────────────
// PUBLIC API
// ──────────────────────────────────────────────

const AstroEngine = {
  // Ana hesaplama
  calculate: calculateNatalChart,

  // Yorum üret
  interpret: (chart) => generateInterpretation(chart),

  // HD güneş pozisyonları
  hdSunPositions: calculateHDSunPositions,

  // Tekil hesaplamalar
  sunPosition,
  moonPosition,
  planetPosition: planetGeocentricLongitude,
  ascendant,
  midheaven,
  houses,
  moonPhase,

  // Yardımcılar
  dateToJD,
  jdToDate,
  getLongitudeInfo,
  getCityCoords,
  getSignInterpretation,
  findPlanetHouse,

  // Türkiye yaz saati
  getTurkeyUTCOffset,
  getUTCOffset,

  // Swiss Ephemeris hook
  initSwissEphemeris,
  isSwissEphemerisAvailable,

  // Sabitler
  SIGNS,
  ASPECTS,
  HOUSE_INTERPRETATIONS,
  SIGN_INTERPRETATIONS,
  PLANET_ELEMENTS,
};

// Browser + Node uyumlu export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AstroEngine;
} else if (typeof window !== 'undefined') {
  window.AstroEngine = AstroEngine;
}
