/**
 * ═══════════════════════════════════════════════════════════════
 * NUMEROLOGY.JS — Tam Numeroloji Motoru
 * ═══════════════════════════════════════════════════════════════
 * İçerik:
 *   HESAPLAMA MOTORU
 *     calcLifePath       — Yaşam Yolu (en baskın sayı)
 *     calcDestiny        — Kader / İfade (tam ad)
 *     calcSoulUrge       — Ruh Dürtüsü (ünlüler)
 *     calcPersonality    — Kişilik (ünsüzler)
 *     calcBirthday       — Doğum Günü
 *     calcMaturity       — Olgunluk (LP + Kader)
 *     calcPersonalYear   — Kişisel Yıl
 *     calcPersonalMonth  — Kişisel Ay
 *     calcPersonalDay    — Kişisel Gün
 *     calcChallenges     — Zorluk Sayıları (4 aşama)
 *     calcPinnacles      — Doruk Sayıları (4 dönem)
 *     calcHiddenPassion  — Gizli Tutku (en çok tekrar eden harf)
 *     calcKarmicDebt     — Karmik Borç (13/4, 14/5, 16/7, 19/1)
 *     calcBalance        — Denge Sayısı (adın ilk harfleri)
 *
 *   VERİ KATMANI
 *     NUM_MEANINGS       — 1–9 + 11, 22, 33 anlamları
 *     NUM_TRAITS         — Işık/gölge özellikleri
 *     LIFE_PATH_INTERP   — Yaşam Yolu derin yorumları
 *     DESTINY_INTERP     — Kader yorumları
 *     SOUL_URGE_INTERP   — Ruh Dürtüsü yorumları
 *     PERSONALITY_INTERP — Kişilik yorumları
 *     BIRTHDAY_INTERP    — Doğum Günü yorumları (1-31)
 *     PERSONAL_YEAR_INTERP — Kişisel Yıl yorumları
 *     CHALLENGE_INTERP   — Zorluk yorumları
 *     PINNACLE_INTERP    — Doruk yorumları
 *
 *   ANALİZ FONKSİYONLARI
 *     NUMEROLOGY_ENGINE  — Tam profil, günlük motor, sentez
 * ═══════════════════════════════════════════════════════════════
 */

'use strict';

// ═══════════════════════════════════════════════════════
// HARF → SAYI TABLOSU (Pythagorean)
// ═══════════════════════════════════════════════════════

const LETTER_VALUES = {
  A:1, B:2, C:3, D:4, E:5, F:6, G:7, H:8, I:9,
  J:1, K:2, L:3, M:4, N:5, O:6, P:7, Q:8, R:9,
  S:1, T:2, U:3, V:4, W:5, X:6, Y:7, Z:8,
  // Türkçe karakterler
  Ç:3, Ğ:7, İ:9, Ö:6, Ş:1, Ü:3,
  ç:3, ğ:7, ı:9, ö:6, ş:1, ü:3,
};

const VOWELS = new Set(['A','E','I','O','U','İ','Ö','Ü','a','e','i','o','u','ı','ö','ü']);

// ═══════════════════════════════════════════════════════
// TEMEL HESAPLAMA YARDIMCILARI
// ═══════════════════════════════════════════════════════

function reduceNumber(n, keepMaster = true) {
  let num = parseInt(n, 10);
  if (isNaN(num)) return { value: 0, master: false, original: n };
  const original = num;
  while (num > 9) {
    if (keepMaster && (num === 11 || num === 22 || num === 33)) break;
    const digits = String(num).split('').map(Number);
    num = digits.reduce((a, b) => a + b, 0);
  }
  return { value: num, master: [11, 22, 33].includes(num), original };
}

function sumDigits(str) {
  return String(str).split('').map(Number).reduce((a, b) => a + (!isNaN(b) ? b : 0), 0);
}

function letterValue(ch) {
  return LETTER_VALUES[ch] || LETTER_VALUES[ch.toUpperCase()] || 0;
}

function nameToNumbers(name) {
  return name.toUpperCase().replace(/[^A-ZÇĞİÖŞÜ]/g, '').split('').map(letterValue);
}

// ═══════════════════════════════════════════════════════
// HESAPLAMA MOTORLARI
// ═══════════════════════════════════════════════════════

function calcLifePath(day, month, year) {
  // Geleneksel yöntem: gün + ay + yıl ayrı ayrı indirgenir, sonra toplanır
  const d = reduceNumber(sumDigits(day));
  const m = reduceNumber(sumDigits(month));
  const y = reduceNumber(sumDigits(String(year).split('').map(Number).reduce((a,b)=>a+b,0)));
  const total = d.value + m.value + y.value;
  const result = reduceNumber(total);
  return { ...result, components: { day: d.value, month: m.value, year: y.value }, raw: total };
}

function calcDestiny(fullName) {
  const nums = nameToNumbers(fullName);
  const total = nums.reduce((a, b) => a + b, 0);
  return reduceNumber(total);
}

function calcSoulUrge(fullName) {
  const letters = fullName.toUpperCase().replace(/[^A-ZÇĞİÖŞÜ]/g, '').split('');
  const vowelNums = letters.filter(ch => VOWELS.has(ch)).map(letterValue);
  const total = vowelNums.reduce((a, b) => a + b, 0);
  return reduceNumber(total);
}

function calcPersonality(fullName) {
  const letters = fullName.toUpperCase().replace(/[^A-ZÇĞİÖŞÜ]/g, '').split('');
  const consNums = letters.filter(ch => !VOWELS.has(ch)).map(letterValue);
  const total = consNums.reduce((a, b) => a + b, 0);
  return reduceNumber(total);
}

function calcBirthday(day) {
  if (!day) return null;
  const d = parseInt(day, 10);
  if (d <= 9) return { value: d, master: false, original: d };
  return reduceNumber(d);
}

function calcMaturity(lpValue, destValue) {
  const total = parseInt(lpValue) + parseInt(destValue);
  return reduceNumber(total);
}

function calcPersonalYear(day, month, targetYear = new Date().getFullYear()) {
  const sum = sumDigits(day) + sumDigits(month) + sumDigits(String(targetYear));
  const result = reduceNumber(sum);
  return { ...result, year: targetYear };
}

function calcPersonalMonth(personalYear, currentMonth) {
  const total = personalYear + currentMonth;
  return reduceNumber(total);
}

function calcPersonalDay(personalMonth, currentDay) {
  const total = personalMonth + sumDigits(currentDay);
  return reduceNumber(total);
}

function calcChallenges(day, month, year) {
  const d = reduceNumber(sumDigits(day)).value;
  const m = reduceNumber(sumDigits(month)).value;
  const y = reduceNumber(sumDigits(String(year).split('').reduce((a,b)=>a+parseInt(b),0))).value;

  const c1 = Math.abs(d - m);
  const c2 = Math.abs(d - y);
  const c3 = Math.abs(c1 - c2);
  const c4 = Math.abs(m - y);

  return [c1, c2, c3, c4].map(v => ({ value: v }));
}

function calcPinnacles(day, month, year, lpValue) {
  const d = reduceNumber(sumDigits(day)).value;
  const m = reduceNumber(sumDigits(month)).value;
  const y = reduceNumber(sumDigits(String(year).split('').reduce((a,b)=>a+parseInt(b),0))).value;

  const p1 = reduceNumber(d + m).value;
  const p2 = reduceNumber(d + y).value;
  const p3 = reduceNumber(p1 + p2).value;
  const p4 = reduceNumber(m + y).value;

  const firstEnd = 36 - lpValue;
  return [
    { value: p1, ages: `0–${firstEnd}` },
    { value: p2, ages: `${firstEnd + 1}–${firstEnd + 9}` },
    { value: p3, ages: `${firstEnd + 10}–${firstEnd + 18}` },
    { value: p4, ages: `${firstEnd + 19}+` },
  ];
}

function calcHiddenPassion(fullName) {
  const letters = fullName.toUpperCase().replace(/[^A-ZÇĞİÖŞÜ]/g, '').split('');
  const freq = {};
  letters.forEach(ch => {
    const v = letterValue(ch);
    if (v) freq[v] = (freq[v] || 0) + 1;
  });
  const max = Math.max(...Object.values(freq));
  const passions = Object.entries(freq).filter(([,c]) => c === max).map(([v]) => parseInt(v));
  return { values: passions, count: max };
}

function calcKarmicDebt(day, month, year, fullName) {
  const debts = [];
  const karmicNums = [13, 14, 16, 19];

  // Yaşam yolu ham toplamını kontrol et
  const d = reduceNumber(sumDigits(day)).value;
  const m = reduceNumber(sumDigits(month)).value;
  const y = reduceNumber(sumDigits(String(year).split('').reduce((a,b)=>a+parseInt(b),0))).value;
  const rawLP = d + m + y;

  if (karmicNums.includes(rawLP)) debts.push({ number: rawLP, area: 'Yaşam Yolu' });

  // Ad sayıları
  const rawDest = nameToNumbers(fullName).reduce((a,b)=>a+b,0);
  if (karmicNums.includes(rawDest)) debts.push({ number: rawDest, area: 'Kader' });

  return debts;
}

function calcBalance(fullName) {
  const words = fullName.trim().split(/\s+/);
  const firstLetters = words.map(w => w[0]).filter(Boolean);
  const total = firstLetters.reduce((a, ch) => a + letterValue(ch), 0);
  return reduceNumber(total);
}

// ═══════════════════════════════════════════════════════
// VERİ: SAYI ANLAMLARI
// ═══════════════════════════════════════════════════════

const NUM_MEANINGS = {
  1: { title: 'Öncü · Lider', archetype: 'Kahraman', element: 'Ateş', planet: 'Güneş',
       kisa: 'Bağımsızlık, özgünlük, liderlik. Kendi yolunu çizen.' },
  2: { title: 'Arabulucu · Denge', archetype: 'Barışçı', element: 'Su', planet: 'Ay',
       kisa: 'İşbirliği, hassasiyet, uyum. İki dünya arasında köprü.' },
  3: { title: 'Yaratıcı · İfade', archetype: 'Sanatçı', element: 'Hava', planet: 'Jüpiter',
       kisa: 'İfade, neşe, yaratıcılık. Kelimeler ve renkler aracılığıyla.' },
  4: { title: 'Kurucu · Düzen', archetype: 'Mühendis', element: 'Toprak', planet: 'Satürn / Uranüs',
       kisa: 'Yapı, disiplin, güvenilirlik. Sağlam zemin üstüne inşa.' },
  5: { title: 'Özgür Ruh · Değişim', archetype: 'Kaşif', element: 'Ateş + Hava', planet: 'Merkür',
       kisa: 'Özgürlük, macera, çok yönlülük. Değişim hava gibi doğal.' },
  6: { title: 'Bakıcı · Sorumluluk', archetype: 'Şifacı', element: 'Toprak', planet: 'Venüs',
       kisa: 'Sevgi, sorumluluk, ev ve aile. Başkalarını beslemek.' },
  7: { title: 'Araştırmacı · Mistik', archetype: 'Bilge', element: 'Su', planet: 'Neptün',
       kisa: 'Derinlik, analiz, maneviyat. İçe dönerek gerçeği arayan.' },
  8: { title: 'Güç · Bolluk', archetype: 'Yönetici', element: 'Toprak', planet: 'Satürn',
       kisa: 'Güç, başarı, maddi dünya. Büyük ile küçüğü dengelemek.' },
  9: { title: 'İnsancıl · Tamamlama', archetype: 'Bilge Yaşlı', element: 'Ateş', planet: 'Mars',
       kisa: 'Şefkat, evrensel sevgi, tamamlanma. Döngünün sonu ve başı.' },
  11: { title: 'Sezgisel Aydınlık', archetype: 'Kanal', element: 'Işık', planet: 'Ay + Neptün',
        kisa: 'Yüksek sezgi, ilham, köprü olma. Görünmeyeni görmek.', master: true },
  22: { title: 'Büyük İnşaacı', archetype: 'Mimar', element: 'Toprak', planet: 'Satürn + Uranüs',
        kisa: 'Büyük hayalleri gerçeğe dönüştürme gücü.', master: true },
  33: { title: 'Şefkat Ustası', archetype: 'Şifacı Öğretmen', element: 'Ateş + Su', planet: 'Venüs + Jüpiter',
        kisa: 'Koşulsuz sevgi ile öğretme ve iyileştirme.', master: true },
};

// ═══════════════════════════════════════════════════════
// VERİ: IŞIK / GÖLGE ÖZELLİKLERİ
// ═══════════════════════════════════════════════════════

const NUM_TRAITS = {
  1: {
    light: ['Özgün ve bağımsız', 'Doğal liderlik enerjisi', 'Kararlı ve cesur', 'Yenilikçi bakış açısı', 'Öz-yeterlik'],
    shadow: ['Bencillik eğilimi', 'Başkalarını dinlememek', 'Tepeden bakma', 'Yalnızlaşma', 'Her şeyi kontrol etme ihtiyacı'],
  },
  2: {
    light: ['Derin empati', 'Doğal arabulucu', 'Sabır ve incelik', 'İşbirliğine açık', 'Detaylara dikkat'],
    shadow: ['Karar vermekte zorlanma', 'Aşırı bağımlılık', 'Hayır diyememek', 'Bastırılmış öfke', 'Kırgınlıkları biriktirme'],
  },
  3: {
    light: ['Yaratıcı ifade gücü', 'Sosyal ve neşeli', 'İlham verici', 'Sözel zekâ', 'Optimizm'],
    shadow: ['Dağınıklık', 'Yüzeysellik', 'Tamamlamama alışkanlığı', 'Duygusal iniş çıkışlar', 'Onay bağımlılığı'],
  },
  4: {
    light: ['Güvenilirlik', 'Pratik zekâ', 'Disiplin', 'Sabır', 'Sistematik düşünme'],
    shadow: ['Katılık', 'Değişime direnç', 'Aşırı çalışma', 'Spontanlık eksikliği', 'Eleştiricilik'],
  },
  5: {
    light: ['Uyum sağlama', 'Merak ve açıklık', 'Çok yönlülük', 'Karizmatik iletişim', 'Özgürlük enerjisi'],
    shadow: ['Sorumsuzluk', 'Bağlanmaktan kaçınma', 'Dağınıklık', 'Dürtüsel kararlar', 'Aşırılıklar'],
  },
  6: {
    light: ['Derin bakım', 'Sorumluluk bilinci', 'Güzellik duygusu', 'Sadakat', 'Topluma hizmet'],
    shadow: ['Aşırı fedakârlık', 'Kontrol etme ihtiyacı', 'Suçluluk duygusu', 'Sınır koyamama', 'Şikâyetçilik'],
  },
  7: {
    light: ['Analitik derinlik', 'Sezgi gücü', 'Bağımsız düşünce', 'Bilgelik arayışı', 'İçsel huzur'],
    shadow: ['Sosyal izolasyon', 'Güvensizlik', 'Aşırı analiz', 'Eleştiricilik', 'Kapalılık'],
  },
  8: {
    light: ['Güç yönetimi', 'İş zekâsı', 'Karizma', 'Strateji', 'Bolluk yaratma'],
    shadow: ['Para/güç obsesyonu', 'Kontrolcülük', 'Dinlememek', 'Saatlerce çalışma', 'Maddiyatçılık'],
  },
  9: {
    light: ['Evrensel sevgi', 'Şefkat', 'Sanatsal derinlik', 'Sezgisel bilgelik', 'Bağışlama kapasitesi'],
    shadow: ['Bırakamama', 'Aşırı idealizm', 'Fedakârlık tükenmişliği', 'Hayal kırıklığı', 'Kendini kayıp hissetme'],
  },
  11: {
    light: ['Yüksek sezgi', 'İlham kaynağı', 'Maneviyat', 'İnce enerji algısı', 'Vizyoner bakış'],
    shadow: ['Aşırı hassasiyet', 'Kaygı', 'Gerçekçilik kaybı', 'Sinirsel tükenme', 'Baskı altında 2\'ye düşme'],
  },
  22: {
    light: ['Büyük vizyon', 'Pratik uygulama gücü', 'Liderlik', 'Sistem kurma', 'Kalıcı eser bırakma'],
    shadow: ['Aşırı yük', 'Mükemmeliyetçilik', 'Başarısızlık korkusu', 'Baskı altında 4\'e düşme', 'İzolasyon'],
  },
  33: {
    light: ['Koşulsuz sevgi', 'Şifa gücü', 'Öğretme', 'Dönüştürücü etki', 'Evrensel hizmet'],
    shadow: ['Kendini feda etme', 'Duygusal tükenme', 'Baskı altında 6\'ya düşme', 'Aşırı sorumluluk', 'Başkalarını kurtarma çabası'],
  },
};

// ═══════════════════════════════════════════════════════
// VERİ: YAŞAM YOLU DERİN YORUMLARI
// ═══════════════════════════════════════════════════════

const LIFE_PATH_INTERP = {
  1: `Yaşam Yolu 1, bağımsız hareketin ve özgün kimliğin sayısıdır. Bu yoldaki kişi, başkasının izinde değil kendi açtığı çığırda en iyi performansı sergiler. İçinde güçlü bir liderlik dürtüsü taşır — ama bu dürtü bilinçsiz kaldığında bencillik veya inatçılık olarak yansır.

Bu yolun temel sorusu şudur: "Kim olduğumu, başkasının onayına ihtiyaç duymadan ifade edebiliyor muyum?" Cevap "hayır" ise, bastırılmış özgünlük öfke, rekabet veya sürekli yetersizlik hissi olarak yüzeye çıkar.

Güçlü yönler olgunlaştığında — liderlik servise dönüşür, bağımsızlık başkasını özgürleştiren bir güce dönüşür. En büyük tuzak: Güçlü olmak zorunda hissetmek.`,

  2: `Yaşam Yolu 2, hassasiyetin ve uyumun sayısıdır. Bu yoldaki kişi incelikleri fark eder, duygusal tonları okur, köprü kurar. Güçlü empati kapasitesi hem en büyük hediyesi hem de en büyük tuzağıdır.

Temel gerilim şudur: Başkasını dinleme kapasitesi çok güçlüdür, ama kendi sesini duyma pratiği zayıf kalabilir. "Ne istiyorum?" sorusuna cevap vermekte zorlanmak, bu yolun tipik gölgesidir.

Olgunlaştığında 2 enerjisi, derin bir arabuluculuğa ve kolektif uyuma dönüşür. En büyük tuzak: Onay için kimliği feda etmek.`,

  3: `Yaşam Yolu 3, ifadenin ve yaratıcılığın sayısıdır. Bu yoldaki kişi anlatmak, yaratmak, bağlantı kurmak için doğmuştur. Kelimeler, renkler, ritim — ifade biçimi ne olursa olsun, 3 enerjisi hissettirmek ister.

Temel gerilim: Yaratıcı dürtü güçlüdür ama dağınıklık, başlayıp bitirememe ve yüzeysellik sık görülen tuzaklardır. Derinleşmek yerine genişleme eğilimi yaratıcı potansiyelin altını oyabilir.

Olgunlaştığında ifade, saf eğlenceden gerçek bir anlam taşıyıcısına dönüşür. En büyük tuzak: Başkasını neşelendirirken kendi derinliğini kaybetmek.`,

  4: `Yaşam Yolu 4, inşanın ve düzenin sayısıdır. Bu yoldaki kişi sağlam zemin üzerine inşa etmeyi sever — fikirler için, ilişkiler için, kurumlar için. Güvenilirlik onun imzasıdır.

Temel gerilim: Sağlamlık ihtiyacı katılığa dönüşebilir. Değişime direnç, spontanlık eksikliği ve "doğru yol" konusundaki ısrar bu yolun tipik gölgeleridir.

Olgunlaştığında 4 enerjisi, büyük yapıların mimarına dönüşür. En büyük tuzak: Güvenlik ihtiyacıyla özgürlüğü feda etmek.`,

  5: `Yaşam Yolu 5, özgürlüğün ve deneyimin sayısıdır. Bu yoldaki kişi değişimde ev hisseder — tek bir yerde, tek bir işte, tek bir kimlikte sıkışmak bunaltır. Yaşam bir keşif yolculuğudur.

Temel gerilim: Özgürlük ihtiyacı sorumsuzluğa veya bağlanmaktan kaçınmaya dönüşebilir. "Her şeyi denemek" bazen hiçbirini derinleştirememek anlamına gelir.

Olgunlaştığında 5 enerjisi, deneyim birikimini dünyaya katkıya dönüştürür. En büyük tuzak: Özgürlüğü bağlılıktan kaçmak için kullanmak.`,

  6: `Yaşam Yolu 6, sevginin ve sorumluluğun sayısıdır. Bu yoldaki kişi doğası gereği başkalarını besler, korur, iyileştirir. Ev, aile ve topluluk anlam kaynağıdır.

Temel gerilim: Bakım verme dürtüsü aşırıya kaçabilir — başkasını kurtarma obsesyonu, sınır koyamamak, kendi ihtiyaçlarını sürekli ertelemek. "Herkes iyi ise ben de iyiyim" inancı uzun vadede tükenmişliğe götürür.

Olgunlaştığında 6 enerjisi, şartlı sevgiyi koşulsuz sevgiye dönüştürür. En büyük tuzak: Kontrolden gelen bakım ile gerçek sevgiyi karıştırmak.`,

  7: `Yaşam Yolu 7, derinliğin ve bilgeliğin sayısıdır. Bu yoldaki kişi yüzeyin altını arar — görünmeyeni, anlamı, gerçeği. İçe dönük bir araştırmacıdır.

Temel gerilim: Derinlik arayışı sosyal izolasyona veya kronik güvensizliğe dönüşebilir. "Kimse gerçekten anlayamaz" inancı, bağlantı kurmanın önüne geçer.

Olgunlaştığında 7 enerjisi, birikmiş içsel bilgeliği dünyayla paylaşmaya başlar. En büyük tuzak: Bilgiyi biriktirip paylaşmamak.`,

  8: `Yaşam Yolu 8, gücün ve bolluğun sayısıdır. Bu yoldaki kişi büyük ölçekte düşünür, kaynakları yönetir, başarıyı somut biçimde ifade eder. Maddi dünya bir araçtır, amaç değil.

Temel gerilim: Güç ve para ile ilişki karmaşık olabilir — ya aşırı peşinde koşmak ya da tamamen reddetmek. Başarı, ego tatminine dönüşürse yorucu hale gelir.

Olgunlaştığında 8 enerjisi, gücü hizmetle birleştirir. En büyük tuzak: Başarıyı kimliğin tamamı saymak.`,

  9: `Yaşam Yolu 9, tamamlanmanın ve evrensel sevginin sayısıdır. Bu yoldaki kişi geniş bir perspektiften bakar — insanlığı, yaşamın döngüsünü, anlam ile acının birlikteliğini görür.

Temel gerilim: Evrensel sevgi kapasitesi bireysel ilişkilerde sorun yaratabilir — fazla verme, karşılıksız kalma ve hayal kırıklığı döngüsü tipiktir. "Herkes için iyilik" özelin ihmalini getirebilir.

Olgunlaştığında 9 enerjisi, derin şefkat ve bilgelikle dünyaya dokunur. En büyük tuzak: Geçmişi bırakamamak, döngüyü tamamlayamamak.`,

  11: `Yaşam Yolu 11, sezginin ve ilhamın master sayısıdır. Bu yoldaki kişi ince frekansları alır — başkalarının hissedemediği şeyleri sezar, görünmeyeni görür. Bir köprü olarak doğmuştur: bilinçdışı ile bilinç arasında.

Temel gerilim: Bu yüksek alıcılık aşırı hassasiyete, kaygıya ve sinirsel tükenmişliğe dönüşebilir. Baskı altında 2 enerjisine düşme ve onay arama eğilimi belirginleşir.

Olgunlaştığında 11 enerjisi, sezgiyi somut ilhama dönüştürür. En büyük tuzak: Kendi sinyallerini başkasının gürültüsünde kaybetmek.`,

  22: `Yaşam Yolu 22, büyük inşacının master sayısıdır. Bu yoldaki kişi, büyük hayalleri pratik yapılara dönüştürme kapasitesine sahiptir — 4'ün disiplini ile 11'in vizyonu birleşir.

Temel gerilim: Bu yük ağırdır. Mükemmeliyetçilik, başarısızlık korkusu ve aşırı sorumluluk hissi sık görülür. Baskı altında 4 enerjisine düşme riski vardır.

Olgunlaştığında 22 enerjisi, nesiller boyu sürecek eserler bırakır. En büyük tuzak: Büyüklüğü yük olarak yaşamak.`,

  33: `Yaşam Yolu 33, şefkat ustasının master sayısıdır. Bu yoldaki kişi koşulsuz sevgi ve iyileştirme enerjisi taşır. Hem öğretmen hem şifacı hem de ilham kaynağı olma potansiyeli en yüksek sayıdır.

Temel gerilim: Bu kapasite aşırı sorumluluk, kendini feda etme ve duygusal tükenmeye dönüşebilir. Gerçek 33 enerjisi son derece nadirdir — çoğu zaman 6 olarak yaşanır.

Olgunlaştığında 33 enerjisi, dönüştürücü sevgiyle dünyaya dokunur. En büyük tuzak: Başkasını kurtarmaya çalışırken kendini kaybetmek.`,
};

// ═══════════════════════════════════════════════════════
// VERİ: KADER YORUMLARI
// ═══════════════════════════════════════════════════════

const DESTINY_INTERP = {
  1: `Kader 1, bağımsız bir yaşam ile liderlik rolüne işaret eder. Bu kişi kendi yolunu açmak için buradadır — takip etmek için değil. İsim ve dış kimlik, özgünlük ve öncülük temasını taşır.`,
  2: `Kader 2, ilişkiler ve işbirliği üzerinden gerçekleşir. Bu kişinin amacı köprü kurmak, uyum sağlamak ve başkalarına destek olmaktır. En büyük katkı, arka planda ama vazgeçilmez bir güç olarak gelir.`,
  3: `Kader 3, yaratıcı ifade ve iletişim üzerinden gerçekleşir. Yazmak, konuşmak, sanat yaratmak — bu kişinin dünyaya katkısı ifade kanallarıyla gelir.`,
  4: `Kader 4, pratik çözümler ve güvenilir yapılar üzerinden gerçekleşir. Sistem kurmak, organize etmek ve güvenilir temeller oluşturmak bu kişinin temel katkısıdır.`,
  5: `Kader 5, özgürlük, değişim ve çeşitlilik üzerinden gerçekleşir. Bu kişi yaşamı geniş bir perspektiften deneyimleyerek başkalarına da genişlemeyi ilham verir.`,
  6: `Kader 6, hizmet, bakım ve sorumluluk üzerinden gerçekleşir. Bu kişinin amacı toplulukta iyileştirici bir güç olmak, ev ve aile değerlerini yaşatmaktır.`,
  7: `Kader 7, bilgi, araştırma ve içsel derinlik üzerinden gerçekleşir. Bu kişi soru sorar, araştırır ve bulduklarını paylaşarak başkalarının anlama kapasitesini genişletir.`,
  8: `Kader 8, maddi başarı, güç ve etki üzerinden gerçekleşir. Bu kişi kaynakları etkin biçimde yönetmek ve büyük ölçekli etkiler yaratmak için buradadır.`,
  9: `Kader 9, şefkat, tamamlanma ve evrensel hizmet üzerinden gerçekleşir. Bu kişi insanlığa geniş bir sevgiyle dokunmak için buradadır.`,
  11: `Kader 11, sezgisel ilham ve köprü olma üzerinden gerçekleşir. Bu kişi görünmezi görünür kılmak, ince frekansları paylaşmak için buradadır.`,
  22: `Kader 22, büyük ölçekli inşa ve kalıcı eserler üzerinden gerçekleşir. Vizyon ile pratiği birleştirerek nesillere dokunan işler yapmak bu kişinin amacıdır.`,
  33: `Kader 33, koşulsuz sevgi ve şifa üzerinden gerçekleşir. Öğretmek, iyileştirmek ve dönüştürmek bu kişinin yaşamının özündedir.`,
};

// ═══════════════════════════════════════════════════════
// VERİ: RUH DÜRTÜSÜ YORUMLARI
// ═══════════════════════════════════════════════════════

const SOUL_URGE_INTERP = {
  1: `Ruh dürtüsü 1, derinlerde bağımsız olmayı, kendi yolunu çizmeyi ve tanınmayı arzular. Bu kişi içinde lider olmak ister — ama bu arzu çoğu zaman açıkça dile getirilmez.`,
  2: `Ruh dürtüsü 2, bağlantı, uyum ve sevgi ister. Bu kişi içinde ait olmayı, anlaşılmayı ve derin ilişkiler kurmayı arzular.`,
  3: `Ruh dürtüsü 3, ifade etmeyi ve sevilmeyi ister. İçinde sanatsal bir ses var; görülmek ve övülmek bu kişiye derine dokunan bir şeydir.`,
  4: `Ruh dürtüsü 4, güvenlik ve düzen ister. Bu kişi içinde sağlam bir zemin, öngörülebilir bir dünya ve güvenilir ilişkiler arzular.`,
  5: `Ruh dürtüsü 5, özgürlük ve macera ister. Bu kişi içinde sınırsız olmanın özlemini taşır — rutinler bunaltır.`,
  6: `Ruh dürtüsü 6, sevmek ve sevilmek ister. Ev, aile ve aidiyet bu kişinin ruhunu besler. İnsanlara bakım vermek kendini ifade etme biçimidir.`,
  7: `Ruh dürtüsü 7, anlamak ve bilmek ister. Bu kişi içinde derin bir araştırma ve yalnızlık arzusu taşır — gerçeği bulmak için.`,
  8: `Ruh dürtüsü 8, başarmak ve güçlü olmak ister. Bu kişi içinde maddi güvenlik, saygınlık ve etki bırakma arzusu güçlüdür.`,
  9: `Ruh dürtüsü 9, vermek ve iyileştirmek ister. Bu kişi içinde tüm insanlığa dokunma ve anlam yaratma özlemi taşır.`,
  11: `Ruh dürtüsü 11, aydınlatmak ve ilham vermek ister. Bu kişi içinde görünmezi ifade etme ve başkalarının uyanmasına katkıda bulunma arzusu taşır.`,
  22: `Ruh dürtüsü 22, büyük bir şey inşa etmek ister. Bu kişi içinde kalıcı eserler bırakma ve dünyayı daha iyi bir yer yapma arzusu güçlüdür.`,
  33: `Ruh dürtüsü 33, sevmek ve şifa vermek ister. Bu kişi içinde koşulsuz bir sevgiyle insanlığa dokunma özlemi taşır.`,
};

// ═══════════════════════════════════════════════════════
// VERİ: KİŞİLİK YORUMLARI
// ═══════════════════════════════════════════════════════

const PERSONALITY_INTERP = {
  1: `Kişilik 1, dışarıya özgüvenli, bağımsız ve lider bir imaj yansıtır. Başkaları bu kişiyi genellikle güçlü ve kararlı olarak görür.`,
  2: `Kişilik 2, dışarıya hassas, nazik ve uyumlu bir imaj yansıtır. Başkaları bu kişiyi yaklaşılabilir ve güvenilir bulur.`,
  3: `Kişilik 3, dışarıya neşeli, yaratıcı ve sosyal bir imaj yansıtır. Başkaları bu kişiyi ilgi çekici ve eğlenceli bulur.`,
  4: `Kişilik 4, dışarıya güvenilir, pratik ve kararlı bir imaj yansıtır. Başkaları bu kişiyi sorumlu ve istikrarlı bulur.`,
  5: `Kişilik 5, dışarıya dinamik, çekici ve özgür ruhlu bir imaj yansıtır. Başkaları bu kişiyi ilgi çekici ve değişken bulur.`,
  6: `Kişilik 6, dışarıya sıcak, sorumlu ve bakıcı bir imaj yansıtır. Başkaları bu kişiyi güvenilir ve anaç bulur.`,
  7: `Kişilik 7, dışarıya gizemli, çekingen ve düşünceli bir imaj yansıtır. Başkaları bu kişiyi derin ama ulaşılmaz bulabilir.`,
  8: `Kişilik 8, dışarıya güçlü, otoriter ve başarı odaklı bir imaj yansıtır. Başkaları bu kişiyi etkili ve iddialı bulur.`,
  9: `Kişilik 9, dışarıya şefkatli, anlayışlı ve bilge bir imaj yansıtır. Başkaları bu kişiyi hoşgörülü ve derin bulur.`,
  11: `Kişilik 11, dışarıya sezgisel, karizmatik ve farklı bir imaj yansıtır. Başkaları bu kişide özel bir şey olduğunu hisseder.`,
  22: `Kişilik 22, dışarıya güçlü, vizyoner ve güvenilir bir imaj yansıtır. Başkaları bu kişiyi büyük işler yapacak biri olarak görür.`,
  33: `Kişilik 33, dışarıya şefkatli, bilge ve iyileştirici bir imaj yansıtır. Başkaları bu kişide derin bir sevgi hisseder.`,
};

// ═══════════════════════════════════════════════════════
// VERİ: DOĞUM GÜNÜ YORUMLARI (1–31)
// ═══════════════════════════════════════════════════════

const BIRTHDAY_INTERP = {
  1: `Doğum günü 1 — liderlik ve bağımsızlık. Kendi yolunu çizen, öncü bir enerji.`,
  2: `Doğum günü 2 — işbirliği ve hassasiyet. İnce detayları fark eder, köprü kurar.`,
  3: `Doğum günü 3 — yaratıcılık ve ifade. Kelimeler ve sanat doğal bir alan.`,
  4: `Doğum günü 4 — düzen ve güvenilirlik. Sağlam zemin üzerine inşa eder.`,
  5: `Doğum günü 5 — özgürlük ve değişim. Çok yönlü, dinamik, keşfetmeyi seven.`,
  6: `Doğum günü 6 — sorumluluk ve bakım. Doğal bir bakıcı, güzelliğe duyarlı.`,
  7: `Doğum günü 7 — derinlik ve analiz. İçe dönük, araştırmacı, bilgelik arayan.`,
  8: `Doğum günü 8 — güç ve başarı. İş dünyasında doğal, otorite enerjisi taşır.`,
  9: `Doğum günü 9 — şefkat ve idealim. Geniş perspektif, insanlığa ilgi.`,
  10: `Doğum günü 10 (1+0=1) — yenilikçi liderlik. Yeni döngüleri başlatan enerji.`,
  11: `Doğum günü 11 — master sezgi. Yüksek farkındalık, köprü olma kapasitesi.`,
  12: `Doğum günü 12 (1+2=3) — yaratıcı ifade. Hem lider hem sanatçı özellikleri.`,
  13: `Doğum günü 13 (1+3=4) — karmik 4. Disiplin ve dönüşüm bir arada.`,
  14: `Doğum günü 14 (1+4=5) — karmik 5. Özgürlük ve sorumluluk dengesi önemli.`,
  15: `Doğum günü 15 (1+5=6) — bakım ve liderlik. Hem önder hem koruyucu.`,
  16: `Doğum günü 16 (1+6=7) — karmik 7. Derinlik yolculuğu, ego aşımı.`,
  17: `Doğum günü 17 (1+7=8) — güç ve ruhsal derinlik. Maddi ve maneviyat dengesi.`,
  18: `Doğum günü 18 (1+8=9) — şefkat ve güç. Karşıtlıkları içinde barındırır.`,
  19: `Doğum günü 19 (1+9=10/1) — karmik 1. Bağımsızlık dersi, kendine güven yolu.`,
  20: `Doğum günü 20 (2+0=2) — derin işbirliği. Sezgili ve uyumlu bir enerji.`,
  21: `Doğum günü 21 (2+1=3) — sosyal yaratıcılık. İlham veren, neşeli bir güç.`,
  22: `Doğum günü 22 — master inşacı. Büyük hayalleri hayata geçirme kapasitesi.`,
  23: `Doğum günü 23 (2+3=5) — özgür ruhlu iletişimci. Sosyal ve dinamik.`,
  24: `Doğum günü 24 (2+4=6) — güven ve bakım. Aile ve topluluk için güçlü enerji.`,
  25: `Doğum günü 25 (2+5=7) — hassas araştırmacı. Derinlik ve sezgi bir arada.`,
  26: `Doğum günü 26 (2+6=8) — iş ve bakım. Maddi başarı ile sorumluluk dengesi.`,
  27: `Doğum günü 27 (2+7=9) — şefkat ve liderlik. Geniş vizyonlu bakım enerjisi.`,
  28: `Doğum günü 28 (2+8=10/1) — lider ve iş birlikçi. Hem özgün hem uyumlu.`,
  29: `Doğum günü 29 (2+9=11) — master sezgi. Yüksek hassasiyet, ilham kanalı.`,
  30: `Doğum günü 30 (3+0=3) — saf yaratıcılık. İfade ve neşe güçlü enerjiler.`,
  31: `Doğum günü 31 (3+1=4) — yaratıcı pratisyen. Hem sanatçı hem inşacı.`,
};

// ═══════════════════════════════════════════════════════
// VERİ: KİŞİSEL YIL YORUMLARI
// ═══════════════════════════════════════════════════════

const PERSONAL_YEAR_INTERP = {
  1: {
    title: 'Yeni Başlangıç',
    body: 'Dokuz yıllık bir döngünün ilk yılı. Tohumları ekmek, yeni projeler başlatmak, kimliğini yenilemek için en uygun zaman. Ne istediğini netleştir — bu yıl attığın adımlar önümüzdeki 9 yılı şekillendirir.',
    gozlem: 'Bu yıl seni korkutan ama çağıran yeni başlangıç ne?',
    eylem: 'En az bir yeni şey başlat — küçük de olsa.',
  },
  2: {
    title: 'İlişki ve Sabır',
    body: 'Birliktelik, işbirliği ve bekleme yılı. Hızlı adımlar değil, ilişkileri derinleştirme zamanı. Sabır öğretecek, detaylar önemli olacak. Birlikte büyüme fırsatları gelecek.',
    gozlem: 'Hangi ilişkiyi derinleştirmek istiyorsun?',
    eylem: 'Bir işbirliği teklif et ya da kabul et.',
  },
  3: {
    title: 'İfade ve Yaratıcılık',
    body: 'Sosyal bağlar, yaratıcı projeler ve neşe yılı. İfade etmek, paylaşmak ve keyif almak için mükemmel bir dönem. Ama dağınıklık tuzağına dikkat — odak önemli.',
    gozlem: 'Şu an en çok ne ifade etmek istiyorsun?',
    eylem: 'Bir yaratıcı projeyi başlat veya paylaş.',
  },
  4: {
    title: 'Çalışma ve İnşa',
    body: 'Disiplin, pratik çalışma ve zemin sağlamlaştırma yılı. Büyük hayaller değil, somut adımlar zamanı. Yorucu ama bir sonraki döngü için temel atılıyor.',
    gozlem: 'Hayatında neyin daha sağlam bir temele ihtiyacı var?',
    eylem: 'Bir sistematik alışkanlık inşa et.',
  },
  5: {
    title: 'Değişim ve Özgürlük',
    body: 'Beklenmedik değişimler, yeni deneyimler ve hareket yılı. Eski olanı bırakmak ve yeniye açılmak için olgun bir dönem. Kontrolü bırakmayı öğrenmek bu yılın dersidir.',
    gozlem: 'Hangi değişimden korkuyorsun ama ihtiyacın var?',
    eylem: 'Konfor alanının dışında bir şey dene.',
  },
  6: {
    title: 'Sorumluluk ve Bakım',
    body: 'Aile, ev ve topluluk yılı. Sorumluluklar artabilir ama bu dönem derin ilişkileri pekiştirir. Başkalarına hizmet ederken kendi ihtiyaçlarını da unutma.',
    gozlem: 'Hangi sorumluluğu sevgiyle üstlenebilirsin?',
    eylem: 'Bir ilişkiyi ya da alanı güzelleştir.',
  },
  7: {
    title: 'İçe Dönüş ve Derinleşme',
    body: 'Sessizlik, araştırma ve kendini bulma yılı. Dışarısı yavaşlar — içerisi derinleşir. Meditasyon, okuma, yalnızlık bu dönemin dostlarıdır.',
    gozlem: 'Hangi soruyu gerçekten sormak istiyorsun ama erteliyorsun?',
    eylem: 'Haftada bir derin yalnızlık pratiği başlat.',
  },
  8: {
    title: 'Güç ve Bolluk',
    body: 'Başarı, maddi kazanç ve etki yılı. Emeklerin karşılığını gördüğün dönem. Güç kullanımında bilinçli olmak — ne için kullandığını bilmek — bu yılın sorusu.',
    gozlem: 'Gücünü ne için kullanıyorsun?',
    eylem: 'Büyük bir hedef belirle ve ilk somut adımı at.',
  },
  9: {
    title: 'Tamamlanma ve Bırakma',
    body: 'Dokuz yıllık döngünün son yılı. Bırakma, kapanma ve tamamlama zamanı. Artık işe yaramayanı serbest bırak — yeni döngü için alan aç.',
    gozlem: 'Bu yıl sona erdirmek istediğin ne var?',
    eylem: 'Bir şeyi bilinçli olarak tamamla ya da bırak.',
  },
  11: {
    title: 'Sezgi ve Aydınlanma',
    body: 'Güçlü sezgi, manevi uyanış ve ilham yılı. Ama hassasiyet de artacak — aşırı uyarılmaya dikkat. Sessizlik ve refleksiyon bu yılın en büyük araçları.',
    gozlem: 'Sezgin sana ne fısıldıyor?',
    eylem: 'Bir sezgisel pratiği hayatına dahil et.',
  },
  22: {
    title: 'Büyük İnşa',
    body: 'Büyük ölçekli projeler ve kalıcı etkiler için master yıl. Hem vizyon hem pratiklik gerekiyor. Aşırı yük tuzağına dikkat et — bilinçli sınırlar belirle.',
    gozlem: 'Bu yıl nasıl bir kalıcı iz bırakmak istiyorsun?',
    eylem: 'Büyük ama somut bir projeyi başlat.',
  },
};

// ═══════════════════════════════════════════════════════
// VERİ: ZORLUIK SAYILARI YORUMLARI
// ═══════════════════════════════════════════════════════

const CHALLENGE_INTERP = {
  0: 'Sıfır zorluk — hem en kolay hem en zor. Tüm sayıların potansiyeli var ama net bir odak noktası yok. Öz-disiplin ve yön belirleme kritik.',
  1: 'Bağımsızlık ve özgüven zorluktu. Başkasına bağımlılıktan kurtulmak, kendi sesini bulmak.',
  2: 'İlişkiler ve hassasiyet zorluktu. Sınır koymak, karar almak, onay bağımlılığını aşmak.',
  3: 'İfade zorluktu. Dağınıklıkla mücadele, yaratıcılığı derinleştirmek.',
  4: 'Düzen ve disiplin zorluktu. Sistem kurmak, pratik olmak, çalışmayı sevmek.',
  5: 'Özgürlük ve sorumluluk dengesiydi zorluk. Değişime direnç ya da aşırı dağınıklık.',
  6: 'Sorumluluk ve mükemmeliyetçilik zorluktu. Başkasını kurtarma obsesyonunu bırakmak.',
  7: 'Güven ve açıklık zorluğuydu. Başkasına güvenmek, analiz felcini aşmak.',
  8: 'Güç ve para ile ilişki zorluğuydu. Ne aşırı peşinde koşmak ne de tamamen reddetmek.',
};

// ═══════════════════════════════════════════════════════
// VERİ: DORUK SAYILARI YORUMLARI
// ═══════════════════════════════════════════════════════

const PINNACLE_INTERP = {
  1: 'Bireysel başarı, öncülük ve özgün ifade dönemi.',
  2: 'İlişkiler, işbirliği ve hassasiyet ön planda.',
  3: 'Yaratıcılık, sosyal büyüme ve ifade patlaması.',
  4: 'Çalışma, inşa ve pratik başarılar dönemi.',
  5: 'Değişim, seyahat ve yeni deneyimler dönemi.',
  6: 'Ev, aile ve sorumluluk ön planda.',
  7: 'Derinleşme, maneviyat ve içe dönüş dönemi.',
  8: 'Maddi başarı, güç ve etki dönemi.',
  9: 'Hizmet, şefkat ve evrensel anlam dönemi.',
  11: 'Sezgi ve ilham zirve noktasında.',
  22: 'Büyük inşa ve kalıcı eser bırakma dönemi.',
  33: 'Koşulsuz sevgi ve şifa ile hizmet dönemi.',
};

// ═══════════════════════════════════════════════════════
// KARMİK BORÇ YORUMLARI
// ═══════════════════════════════════════════════════════

const KARMIC_DEBT_INTERP = {
  13: 'Karmik 13/4 — Tembellik ve negatiflikle mücadele. Disiplin, çalışkanlık ve sabır dersi. Kısa yollardan kaçınmak.',
  14: 'Karmik 14/5 — Aşırılıklar ve kontrol dersi. Özgürlüğü sorumsuzlukla değil, olgunlukla kazanmak.',
  16: 'Karmik 16/7 — Ego yıkımı dersi. Eski kimliğin çöküşü, yeni bir benliğin inşası. Gurur tuzağından kaçınmak.',
  19: 'Karmik 19/1 — Bencillik ve yalnızlık dersi. Başkasına bağımlı olmadan ama onları da görerek var olmak.',
};

// ═══════════════════════════════════════════════════════
// NUMEROLOGY ENGINE — TAM ANALİZ
// ═══════════════════════════════════════════════════════

const NUMEROLOGY_ENGINE = {

  /**
   * Tam profil hesapla
   * @param {string} fullName
   * @param {number} day
   * @param {number} month
   * @param {number} year
   * @returns {object}
   */
  getFullProfile(fullName, day, month, year) {
    const lp      = calcLifePath(day, month, year);
    const dest    = calcDestiny(fullName);
    const soul    = calcSoulUrge(fullName);
    const pers    = calcPersonality(fullName);
    const bday    = calcBirthday(day);
    const mat     = calcMaturity(lp.value, dest.value);
    const py      = calcPersonalYear(day, month);
    const pm      = calcPersonalMonth(py.value, new Date().getMonth() + 1);
    const pd      = calcPersonalDay(pm.value, new Date().getDate());
    const challenges = calcChallenges(day, month, year);
    const pinnacles  = calcPinnacles(day, month, year, lp.value);
    const hidden  = calcHiddenPassion(fullName);
    const karmic  = calcKarmicDebt(day, month, year, fullName);
    const balance = calcBalance(fullName);

    return {
      name: fullName, day, month, year,
      // Ana sayılar
      lp, dest, soul, pers, bday, mat,
      // Zaman döngüleri
      py, pm, pd,
      // Gelişim haritası
      challenges, pinnacles,
      // Derinlik katmanları
      hidden, karmic, balance,
      // Yorumlar
      meanings: {
        lp:   NUM_MEANINGS[lp.value]   || {},
        dest: NUM_MEANINGS[dest.value] || {},
        soul: NUM_MEANINGS[soul.value] || {},
        pers: NUM_MEANINGS[pers.value] || {},
      },
    };
  },

  /**
   * Günlük numeroloji mesajı
   * @param {object} profile — getFullProfile çıktısı
   * @returns {object}
   */
  getDailyMessage(profile) {
    const py = profile.py;
    const pyData = PERSONAL_YEAR_INTERP[py.value] || {};
    const now = new Date();
    const pm = calcPersonalMonth(py.value, now.getMonth() + 1);
    const pd = calcPersonalDay(pm.value, now.getDate());

    return {
      kisisel_yil: { sayi: py.value, baslik: pyData.title || '', mesaj: pyData.body || '' },
      kisisel_ay: { sayi: pm.value, baslik: (PERSONAL_YEAR_INTERP[pm.value] || {}).title || '' },
      kisisel_gun: { sayi: pd.value },
      gozlem: pyData.gozlem || '',
      eylem: pyData.eylem || '',
    };
  },

  /**
   * Sayı uyum analizi (iki kişi arası)
   * @param {object} profileA
   * @param {object} profileB
   * @returns {object}
   */
  getCompatibility(profileA, profileB) {
    const lpSum = profileA.lp.value + profileB.lp.value;
    const compat = reduceNumber(lpSum);
    const destSum = profileA.dest.value + profileB.dest.value;
    const destCompat = reduceNumber(destSum);

    return {
      lp_birlikteligi: compat.value,
      kader_birlikteligi: destCompat.value,
      ozet: NUM_MEANINGS[compat.value]?.kisa || '',
    };
  },

  /**
   * Psikolojik sentez — tüm sayılardan gölge/olgunluk profili
   * @param {object} profile
   * @returns {object}
   */
  getShadowProfile(profile) {
    const { lp, dest, soul, pers } = profile;
    const traits = {
      lp:   NUM_TRAITS[lp.value]   || { light: [], shadow: [] },
      dest: NUM_TRAITS[dest.value] || { light: [], shadow: [] },
      soul: NUM_TRAITS[soul.value] || { light: [], shadow: [] },
      pers: NUM_TRAITS[pers.value] || { light: [], shadow: [] },
    };

    // Ortak gölge temaları bul
    const allShadows = [
      ...traits.lp.shadow,
      ...traits.soul.shadow,
    ];

    // Karmic borç varsa ekle
    const karmicWarnings = profile.karmic.map(k =>
      KARMIC_DEBT_INTERP[k.number] || ''
    ).filter(Boolean);

    return {
      dominant_light: traits.lp.light.slice(0, 3),
      dominant_shadow: traits.lp.shadow.slice(0, 3),
      soul_shadow: traits.soul.shadow.slice(0, 2),
      karmic_warnings: karmicWarnings,
      donusum_onerisi: LIFE_PATH_INTERP[lp.value]?.split('\n\n').pop() || '',
    };
  },

  /**
   * API prompt için veri paketi
   * @param {object} profile
   * @returns {string}
   */
  getAIPromptData(profile) {
    const karmic = profile.karmic.map(k => `${k.number}/${k.area}`).join(', ') || 'yok';
    return `[NUMEROLOJİ PROFİLİ]
Yaşam Yolu: ${profile.lp.value}${profile.lp.master ? ' (Master)' : ''} — ${NUM_MEANINGS[profile.lp.value]?.title || ''}
Kader: ${profile.dest.value} — ${NUM_MEANINGS[profile.dest.value]?.title || ''}
Ruh Dürtüsü: ${profile.soul.value} — ${NUM_MEANINGS[profile.soul.value]?.title || ''}
Kişilik: ${profile.pers.value} — ${NUM_MEANINGS[profile.pers.value]?.title || ''}
Olgunluk: ${profile.mat.value}
Kişisel Yıl: ${profile.py.value} — ${PERSONAL_YEAR_INTERP[profile.py.value]?.title || ''}
Karmik Borç: ${karmic}
Gizli Tutku: ${profile.hidden.values.join(', ')}`;
  },
};

// ═══════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    NUMEROLOGY_ENGINE,
    NUM_MEANINGS, NUM_TRAITS,
    LIFE_PATH_INTERP, DESTINY_INTERP, SOUL_URGE_INTERP, PERSONALITY_INTERP,
    BIRTHDAY_INTERP, PERSONAL_YEAR_INTERP, CHALLENGE_INTERP, PINNACLE_INTERP,
    KARMIC_DEBT_INTERP,
    // Hesaplama fonksiyonları
    calcLifePath, calcDestiny, calcSoulUrge, calcPersonality,
    calcBirthday, calcMaturity, calcPersonalYear, calcPersonalMonth, calcPersonalDay,
    calcChallenges, calcPinnacles, calcHiddenPassion, calcKarmicDebt, calcBalance,
    reduceNumber, LETTER_VALUES,
  };
} else if (typeof window !== 'undefined') {
  window.NUMEROLOGY_ENGINE  = NUMEROLOGY_ENGINE;
  window.NUM_MEANINGS       = NUM_MEANINGS;
  window.NUM_TRAITS         = NUM_TRAITS;
  window.LIFE_PATH_INTERP   = LIFE_PATH_INTERP;
  window.DESTINY_INTERP     = DESTINY_INTERP;
  window.SOUL_URGE_INTERP   = SOUL_URGE_INTERP;
  window.PERSONALITY_INTERP = PERSONALITY_INTERP;
  window.BIRTHDAY_INTERP    = BIRTHDAY_INTERP;
  window.PERSONAL_YEAR_INTERP = PERSONAL_YEAR_INTERP;
  window.CHALLENGE_INTERP   = CHALLENGE_INTERP;
  window.PINNACLE_INTERP    = PINNACLE_INTERP;
  window.KARMIC_DEBT_INTERP = KARMIC_DEBT_INTERP;
  window.calcLifePath       = calcLifePath;
  window.calcDestiny        = calcDestiny;
  window.calcSoulUrge       = calcSoulUrge;
  window.calcPersonality    = calcPersonality;
  window.calcBirthday       = calcBirthday;
  window.calcMaturity       = calcMaturity;
  window.calcPersonalYear   = calcPersonalYear;
  window.calcPersonalMonth  = calcPersonalMonth;
  window.calcPersonalDay    = calcPersonalDay;
  window.calcChallenges     = calcChallenges;
  window.calcPinnacles      = calcPinnacles;
  window.calcHiddenPassion  = calcHiddenPassion;
  window.calcKarmicDebt     = calcKarmicDebt;
  window.calcBalance        = calcBalance;
  window.reduceNumber       = reduceNumber;
  window.LETTER_VALUES      = LETTER_VALUES;
}
