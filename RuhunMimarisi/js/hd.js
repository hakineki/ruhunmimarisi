/**
 * ═══════════════════════════════════════════════════════════════
 * HD.JS — Human Design Hesaplama Motoru
 * ═══════════════════════════════════════════════════════════════
 * Girdi: astro.js → AstroEngine.hdSunPositions()
 * 
 * Hesaplar:
 *   - Bilinçli + bilinçsiz 9 kapı (Güneş, Ay, Yükselen,
 *     Merkür, Venüs, Mars, Jüpiter, Satürn, Kuzey Düğüm)
 *   - Tip (Generator, MG, Projector, Manifestor, Reflector)
 *   - Otorite (Sakral, Duygusal, Dalak, Ego, Öz, Zihinsel, Ay)
 *   - Profil (1/3, 2/4, 3/5 ... 6/2)
 *   - Tanımlı / Açık merkezler
 *   - Aktif kanallar
 *   - Ton + Renk (doğum saatinden)
 *   - Koşullanma analizi (açık merkezler)
 *   - Strateji + İmza + Tuzak
 * ═══════════════════════════════════════════════════════════════
 */

'use strict';

// ──────────────────────────────────────────────
// YARDIMCI
// ──────────────────────────────────────────────

function norm360(d) { return ((d % 360) + 360) % 360; }

// Güneş boylamından HD kapısı ve hattı
// HD başlangıç noktası: 0° Oğlak (270° ekliptik) = Kapı 41
function longitudeToGateAndLine(longitude) {
  const lon = norm360(longitude);
  // Oğlak 0° = 270° ekliptik → HD başlangıcı
  const hdOffset = 270;
  const adjusted = norm360(lon - hdOffset);
  // Her kapı = 360/64 = 5.625°
  const gateIndex = Math.floor(adjusted / 5.625);
  // Kapı sırası: 41'den başlar (I Ching sırası)
  const HD_GATE_ORDER = [
    41,19,13,49,30,55,37,63,22,36,25,17,21,51,42,3,
    27,24,2,23,8,20,16,35,45,12,15,52,39,53,62,56,
    31,33,7,4,29,59,40,64,47,6,46,18,48,57,32,50,
    28,44,1,43,14,34,9,5,26,11,10,58,38,54,61,60
  ];
  const gate = HD_GATE_ORDER[gateIndex % 64];
  // Her hat = 5.625/6 = 0.9375°
  const lineOffset = adjusted % 5.625;
  const line = Math.min(Math.floor(lineOffset / 0.9375) + 1, 6);
  return { gate, line, longitude: lon, adjusted };
}

// Ay boylamından HD kapısı
function moonLongitudeToGate(longitude) {
  return longitudeToGateAndLine(longitude);
}

// ──────────────────────────────────────────────
// 9 AKTİVASYON NOKTASI
// ──────────────────────────────────────────────

// Her aktivasyon noktası için gezegen ve offset (gün)
const ACTIVATION_POINTS = [
  { key: 'sun',      name: 'Güneş',       offset: 0 },
  { key: 'earth',    name: 'Dünya',        offset: 0, opposite: true }, // Güneş'in tam karşısı
  { key: 'moon',     name: 'Ay',           offset: 0 },
  { key: 'northNode',name: 'Kuzey Düğüm', offset: 0 },
  { key: 'southNode',name: 'Güney Düğüm', offset: 0, opposite: true },
  { key: 'mercury',  name: 'Merkür',       offset: 0 },
  { key: 'venus',    name: 'Venüs',        offset: 0 },
  { key: 'mars',     name: 'Mars',         offset: 0 },
  { key: 'jupiter',  name: 'Jüpiter',      offset: 0 },
  { key: 'saturn',   name: 'Satürn',       offset: 0 },
];

// ──────────────────────────────────────────────
// 64 KAPI — MERKEZ HARİTASI
// ──────────────────────────────────────────────

const GATE_TO_CENTER = {
  // Kafa Merkezi
  64: 'head', 61: 'head', 63: 'head',
  // Ajna Merkezi
  47: 'ajna', 24: 'ajna', 4: 'ajna', 17: 'ajna', 43: 'ajna', 11: 'ajna',
  // Boğaz Merkezi
  62: 'throat', 23: 'throat', 56: 'throat', 35: 'throat', 12: 'throat',
  45: 'throat', 33: 'throat', 8: 'throat', 31: 'throat', 20: 'throat',
  16: 'throat',
  // G Merkezi
  1: 'g', 2: 'g', 7: 'g', 10: 'g', 13: 'g', 15: 'g', 25: 'g', 46: 'g',
  // Yürek/Ego Merkezi
  21: 'heart', 26: 'heart', 40: 'heart', 51: 'heart',
  // Solar Plexus
  6: 'solar', 22: 'solar', 30: 'solar', 36: 'solar', 37: 'solar',
  49: 'solar', 55: 'solar',
  // Sakral Merkezi
  3: 'sacral', 9: 'sacral', 14: 'sacral', 27: 'sacral', 29: 'sacral',
  34: 'sacral', 42: 'sacral', 59: 'sacral', 5: 'sacral',
  // Dalak Merkezi
  18: 'spleen', 28: 'spleen', 32: 'spleen', 48: 'spleen', 50: 'spleen',
  57: 'spleen', 44: 'spleen',
  // Kök Merkezi
  19: 'root', 39: 'root', 41: 'root', 52: 'root', 53: 'root',
  54: 'root', 58: 'root', 38: 'root', 60: 'root',
};

const CENTER_INFO = {
  head:   { name: 'Kafa',            type: 'Baskı',  connected: ['ajna'] },
  ajna:   { name: 'Ajna',            type: 'Farkındalık', connected: ['head', 'throat'] },
  throat: { name: 'Boğaz',           type: 'Motor+İfade', connected: ['ajna', 'g', 'heart', 'solar'] },
  g:      { name: 'G (Kimlik)',       type: 'Kimlik', connected: ['throat', 'sacral', 'spleen'] },
  heart:  { name: 'Yürek/Ego',       type: 'Motor',  connected: ['throat', 'g', 'sacral', 'solar'] },
  solar:  { name: 'Solar Plexus',    type: 'Motor+Farkındalık', connected: ['throat', 'heart', 'sacral', 'root'] },
  sacral: { name: 'Sakral',          type: 'Motor',  connected: ['g', 'heart', 'solar', 'root', 'spleen'] },
  spleen: { name: 'Dalak',           type: 'Farkındalık', connected: ['g', 'heart', 'sacral', 'root'] },
  root:   { name: 'Kök',             type: 'Motor+Baskı', connected: ['solar', 'sacral', 'spleen'] },
};

// ──────────────────────────────────────────────
// 32 KANAL — TAMAMLAYAN KAPI ÇİFTLERİ
// ──────────────────────────────────────────────

const CHANNELS = [
  { id: '1-8',   gates: [1,8],   name: 'İlham',          circuit: 'Bireysel',  type: 'Tasarım' },
  { id: '2-14',  gates: [2,14],  name: 'Keşif',          circuit: 'Bireysel',  type: 'Tasarım' },
  { id: '3-60',  gates: [3,60],  name: 'Mutasyon',        circuit: 'Bireysel',  type: 'Tasarım' },
  { id: '4-63',  gates: [4,63],  name: 'Mantık',          circuit: 'Kolektif',  type: 'Mantık'  },
  { id: '5-15',  gates: [5,15],  name: 'Ritim',           circuit: 'Kolektif',  type: 'Soyut'   },
  { id: '6-59',  gates: [6,59],  name: 'Yakınlık',        circuit: 'Aşiret',    type: 'Savunma' },
  { id: '7-31',  gates: [7,31],  name: 'Alfa',            circuit: 'Kolektif',  type: 'Mantık'  },
  { id: '9-52',  gates: [9,52],  name: 'Odak',            circuit: 'Kolektif',  type: 'Mantık'  },
  { id: '10-20', gates: [10,20], name: 'Uyanış',          circuit: 'Bireysel',  type: 'Tasarım' },
  { id: '11-56', gates: [11,56], name: 'Merak',           circuit: 'Kolektif',  type: 'Soyut'   },
  { id: '12-22', gates: [12,22], name: 'Açılma',          circuit: 'Bireysel',  type: 'Tasarım' },
  { id: '13-33', gates: [13,33], name: 'Araştırmacı',     circuit: 'Kolektif',  type: 'Soyut'   },
  { id: '16-48', gates: [16,48], name: 'Dalga Boyu',      circuit: 'Kolektif',  type: 'Mantık'  },
  { id: '17-62', gates: [17,62], name: 'Kabul',           circuit: 'Kolektif',  type: 'Mantık'  },
  { id: '18-58', gates: [18,58], name: 'Mükemmellik',     circuit: 'Kolektif',  type: 'Mantık'  },
  { id: '19-49', gates: [19,49], name: 'Duyarlılık',      circuit: 'Aşiret',    type: 'Savunma' },
  { id: '20-34', gates: [20,34], name: 'Karizmatik',      circuit: 'Bireysel',  type: 'Tasarım' },
  { id: '21-45', gates: [21,45], name: 'Para Parası',     circuit: 'Aşiret',    type: 'Savunma' },
  { id: '23-43', gates: [23,43], name: 'Yapısallaştırma', circuit: 'Bireysel',  type: 'Tasarım' },
  { id: '24-61', gates: [24,61], name: 'Farkındalık',     circuit: 'Bireysel',  type: 'Tasarım' },
  { id: '25-51', gates: [25,51], name: 'Başlatma',        circuit: 'Bireysel',  type: 'Tasarım' },
  { id: '26-44', gates: [26,44], name: 'Teslim',          circuit: 'Aşiret',    type: 'Savunma' },
  { id: '27-50', gates: [27,50], name: 'Koruyuculuk',     circuit: 'Aşiret',    type: 'Savunma' },
  { id: '28-38', gates: [28,38], name: 'Mücadele',        circuit: 'Bireysel',  type: 'Tasarım' },
  { id: '29-46', gates: [29,46], name: 'Keşif',           circuit: 'Kolektif',  type: 'Soyut'   },
  { id: '30-41', gates: [30,41], name: 'Tanınma',         circuit: 'Kolektif',  type: 'Soyut'   },
  { id: '32-54', gates: [32,54], name: 'Dönüşüm',        circuit: 'Aşiret',    type: 'Savunma' },
  { id: '35-36', gates: [35,36], name: 'Geçicilik',       circuit: 'Kolektif',  type: 'Soyut'   },
  { id: '37-40', gates: [37,40], name: 'Topluluk',        circuit: 'Aşiret',    type: 'Savunma' },
  { id: '39-55', gates: [39,55], name: 'Duygu',           circuit: 'Bireysel',  type: 'Tasarım' },
  { id: '42-53', gates: [42,53], name: 'Olgunlaşma',      circuit: 'Kolektif',  type: 'Soyut'   },
  { id: '47-64', gates: [47,64], name: 'Soyut',           circuit: 'Kolektif',  type: 'Soyut'   },
];

// ──────────────────────────────────────────────
// TİP TANIMLAMALARI
// ──────────────────────────────────────────────

const TYPE_INFO = {
  generator: {
    name: 'Jeneratör',
    strategy: 'Yanıt ver — önce harekete geçme, hayatın getirdiklerini değerlendir',
    signature: 'Tatmin',
    notSelf: 'Hayal kırıklığı',
    aura: 'Açık ve sarmalayan',
    population: '%37',
    description: 'Yaşam gücü ve enerji dünyayı döndürür. Doğru şeye evet dediğinde tükenmez bir enerjiyle çalışır.',
  },
  manifesting_generator: {
    name: 'Manifeste Eden Jeneratör',
    strategy: 'Yanıt ver, sonra bildir — hız nedeniyle adımları atlayabilirsin, geri dön',
    signature: 'Tatmin ve Huzur',
    notSelf: 'Hayal kırıklığı ve Öfke',
    aura: 'Açık, sarmalayan ve iten',
    population: '%33',
    description: 'Çok yönlü, hızlı ve verimli. Birden fazla işi aynı anda yapabilir. Yanıtlamak temel strateji.',
  },
  projector: {
    name: 'Projektör',
    strategy: 'Daveti bekle — davet edilmeden yönlendirme, tanınmayı bekle',
    signature: 'Başarı',
    notSelf: 'Acılık',
    aura: 'Odaklı ve emici',
    population: '%21',
    description: 'Sistemleri ve insanları yönetme konusunda doğal yetenek. Davet geldiğinde en verimli haliyle çalışır.',
  },
  manifestor: {
    name: 'Manifestör',
    strategy: 'Bildir — harekete geçmeden önce etkileyeceğin kişileri bilgilendir',
    signature: 'Huzur',
    notSelf: 'Öfke',
    aura: 'Kapalı ve iten',
    population: '%9',
    description: 'Başlatma gücü en yüksek tip. Bağımsız hareket eder, ama bildirmek direnci azaltır.',
  },
  reflector: {
    name: 'Yansıtıcı',
    strategy: 'Bir ay döngüsü bekle — büyük kararlar için ay döngüsünü tamamla',
    signature: 'Şaşkınlık',
    notSelf: 'Hayal kırıklığı',
    aura: 'Dirençli ve örnekleyici',
    population: '%1',
    description: 'Toplumun aynası. Tanımlı merkezi yoktur, çevreden enerji alır ve yansıtır.',
  },
};

// ──────────────────────────────────────────────
// OTORİTE TANIMLAMALARI
// ──────────────────────────────────────────────

const AUTHORITY_INFO = {
  sacral: {
    name: 'Sakral Otorite',
    description: 'Bedensel bir ses veya his olarak gelen anlık "uh-huh" (evet) veya "un-un" (hayır) sinyali.',
    practice: 'Evet/hayır soruları sor ve bedenin sesini dinle. Zihin değil, beden karar verir.',
    who: 'Generator, Manifesting Generator',
  },
  emotional: {
    name: 'Duygusal Otorite',
    description: 'Duygusal dalga tamamlanana kadar bekle. Coşkuda da çöküntüde de karar verme.',
    practice: 'Büyük kararlar için zamana ihtiyacın var. "Üzerinde uyuyayım" gerçek bir strateji.',
    who: 'Her tip olabilir (Solar Plexus tanımlıysa)',
  },
  splenic: {
    name: 'Dalak Otoritesi',
    description: 'Anlık, sessiz bir içgüdü sesi. Bir kez konuşur ve tekrar etmez.',
    practice: 'İlk içgüdüyü yakala. Analiz onu öldürür. O an ne hissettirdi?',
    who: 'Projector, Manifestor (Solar Plexus tanımlı değilse)',
  },
  ego: {
    name: 'Ego Otoritesi',
    description: '"Ben ne istiyorum?" sorusu. Yürek merkezinden gelen güçlü bir irade sesi.',
    practice: '"Benim için ne istiyorum?" diye sor. Başkası için değil, kendin için.',
    who: 'Manifestor, bazı Projectorlar',
  },
  self: {
    name: 'Öz-Yansıtıcı Otorite',
    description: 'Konuşarak netleşme. Güvendiğin birine düşüncelerini paylaşarak karar üret.',
    practice: 'Kararı başkasına ver değil — konuşurken kendi sesini duy. Baskıya kapılma.',
    who: 'Projektör (G tanımlı)',
  },
  mental: {
    name: 'Zihinsel Otorite',
    description: 'Çevrenden gelen sesi dışarıda işle. İçinde değil, dışarıda konuşarak.',
    practice: 'Farklı insanlarla konuş, farklı ortamlarda test et. Karar zamanla netleşir.',
    who: 'Projektör (hiç motor yok)',
  },
  lunar: {
    name: 'Ay Otoritesi',
    description: 'Bir ay döngüsü (28 gün) boyunca bekle. Her gün nasıl hissettirdiğini izle.',
    practice: 'Takvim tut. Büyük kararları 28 gün sonra ver. Aceleye gelme.',
    who: 'Yansıtıcı',
  },
};

// ──────────────────────────────────────────────
// PROFİL TANIMLAMALARI
// ──────────────────────────────────────────────

const PROFILE_INFO = {
  '1/3': { name: '1/3 Araştırmacı/Şehit',    theme: 'Güvenli temel + deneme yanılma', role: 'Araştırmacı' },
  '1/4': { name: '1/4 Araştırmacı/Fırsatçı', theme: 'Derin bilgi + ağ kurma',         role: 'Öğretmen'    },
  '2/4': { name: '2/4 Münzevi/Fırsatçı',      theme: 'Doğal yetenek + ilişkiler',      role: 'Doğal'       },
  '2/5': { name: '2/5 Münzevi/Heretic',        theme: 'Yalnızlık + evrensel mesaj',     role: 'Kahraman'    },
  '3/5': { name: '3/5 Şehit/Heretic',          theme: 'Deneyim + pratik bilgelik',      role: 'Bilge'       },
  '3/6': { name: '3/6 Şehit/Rol Model',        theme: 'Yaşanan bilgelik + örnek olma',  role: 'Rol Model'   },
  '4/6': { name: '4/6 Fırsatçı/Rol Model',     theme: 'Sağlam ağ + gözlemci bilgelik',  role: 'Örnek'       },
  '4/1': { name: '4/1 Fırsatçı/Araştırmacı',   theme: 'İlişkiler + güçlü temel',        role: 'Ağ Kurucu'   },
  '5/1': { name: '5/1 Heretic/Araştırmacı',     theme: 'Evrensel çözümler + bilgi',      role: 'Kurtarıcı'   },
  '5/2': { name: '5/2 Heretic/Münzevi',         theme: 'Pratik çözümler + yalnızlık',    role: 'Öncü'        },
  '6/2': { name: '6/2 Rol Model/Münzevi',       theme: 'Hayat okulu + doğallık',         role: 'Usta'        },
  '6/3': { name: '6/3 Rol Model/Şehit',         theme: 'Olgunluk + deneyim',             role: 'Yaşayan Örnek' },
};

// ──────────────────────────────────────────────
// AÇIK MERKEZ KOŞULLANMA YORUMU
// ──────────────────────────────────────────────

const OPEN_CENTER_CONDITIONING = {
  head: {
    lesson: 'Zihinsel baskıyı fark et',
    conditioning: 'Başkalarının sorularını kendi soruları gibi hissedebilirsin. Her sorunun cevabı olmak zorunda değilsin.',
    wisdom: 'Soru sormak, cevap vermekten değerlidir. Zihinsel merakın en güçlü halin.',
  },
  ajna: {
    lesson: 'Fikir esnekliği',
    conditioning: 'Başkalarının düşünce çerçevelerini benimseyebilirsin. "Kesinlikle biliyorum" hissi sahte güvenlik.',
    wisdom: 'Her bakış açısından bir şey görebilirsin. Bu çok yönlülük, kararsızlık değil — zenginlik.',
  },
  throat: {
    lesson: 'Konuşma zamanlaması',
    conditioning: 'Dikkat çekmek için konuşabilirsin. Sessizlik güçtür — söylenecek şey doğru zamanda kendiliğinden çıkar.',
    wisdom: 'Doğru anda söylenen bir kelime, yanlış zamanda söylenen bin kelimeden güçlüdür.',
  },
  g: {
    lesson: 'Kimlik belirsizliği',
    conditioning: 'Çevrendeki insanların kimlik enerjisini emebilirsin. "Ben kimim?" sorusu seni korkutabilir.',
    wisdom: 'Yer değiştirdiğinde ve doğru insanlarla olduğunda kendini bulursun. Kimlik sabitlenemez.',
  },
  heart: {
    lesson: 'Kanıtlama döngüsü',
    conditioning: 'Değerini sürekli kanıtlama ihtiyacı hissedebilirsin. Verdiğin sözleri tutmak çok enerji harcar.',
    wisdom: 'Söz vermeden önce dur. Değerin kanıtlamayı gerektirmez — zaten varsın.',
  },
  solar: {
    lesson: 'Duygusal dalgadan kaçma',
    conditioning: 'Çevrenin duygusal durumunu üstlenebilirsin. Hızlı kararlar vererek gerginliği bitirmeye çalışırsın.',
    wisdom: 'Duygusal netlik zaman ister. "Şimdi değil" en güçlü kararlarından biri olabilir.',
  },
  sacral: {
    lesson: 'Enerji sınırları',
    conditioning: 'Ne zaman duracağını bilmek zor olabilir. Başkalarının Sakral enerjisini alır ve onlar için kullanırsın.',
    wisdom: 'Yorgunluk bir sinyal. Daha fazla değil, gerçekten ne istediğini sor. Enerji yenilenemez değil — sınırlı.',
  },
  spleen: {
    lesson: 'Korkuyla karar verme',
    conditioning: 'Sağlık, güvenlik ve hayatta kalma korkularına hassassın. Anlık içgüdü seni geçebilir.',
    wisdom: 'Güvenli hissettiren her zaman iyi değildir. Gerçek güvenlik içeriden gelir.',
  },
  root: {
    lesson: 'Baskı altında acele',
    conditioning: 'Kök merkezinin baskısını hisseder ve hızla tamamlamaya çalışırsın. "Yapmalıyım" hissi süreklidir.',
    wisdom: '"Yapmalıyım" hissi gerçek mi yoksa başkasının baskısı mı? Bu ayrımı öğrenmek özgürleştirir.',
  },
};

// ──────────────────────────────────────────────
// TON + RENK (DETERMINATION & COGNITION)
// ──────────────────────────────────────────────

// Doğum saatinden Ton (1-6) ve Renk (1-6) belirlenir
// Tone: duygusal dalga tipi, Color: algı tipi

const TONES = {
  1: { name: 'Hafıza',    description: 'Geçmiş deneyimler ve bilgi birikimi kararları besler. Hafıza güçlü bir rehberdir.' },
  2: { name: 'Duygusallık', description: 'Duygusal sezgi birincil bilgi kaynağıdır. Hisler, analizden önce gelir.' },
  3: { name: 'Öz-Yansıma', description: 'İçsel diyalog ve kendi kendine değerlendirme güçlüdür. Yalnız kalarak netleşirsin.' },
  4: { name: 'Dışsal',    description: 'Diğerleriyle etkileşim yoluyla netleşirsin. Konuşmak düşünmektir.' },
  5: { name: 'Tat/Dokunuş', description: 'Fiziksel ve duyusal deneyim bilginin kapısıdır. Beden yalan söylemez.' },
  6: { name: 'Işık/Görme', description: 'Görsel ve estetik algı güçlüdür. Gördüklerin düşüncelerini biçimlendirir.' },
};

const COLORS = {
  1: { name: 'Sıcaklık',    description: 'Sıcaklık ve soğukluk — fiziksel konfor karar almayı etkiler.' },
  2: { name: 'Besin',       description: 'Doğru beslenme ve ortam zihinsel netlik için kritiktir.' },
  3: { name: 'Dokunuş',     description: 'Fiziksel his ve duyusal deneyim birincil bilgi kanalıdır.' },
  4: { name: 'Tat',         description: 'Ne yenildiği ve tüketildiği enerji ve netliği doğrudan etkiler.' },
  5: { name: 'Işık',        description: 'Işık koşulları ve görsel çevre ruh halini ve netliği etkiler.' },
  6: { name: 'Ses/Renk',    description: 'Ses ve renk ortamı enerjiyi ve berraklığı doğrudan etkiler.' },
};

function calculateToneAndColor(hour, minute) {
  // 24 saat → 6 ton × 4 renk (her ton 4 saat, her renk ~40 dk)
  const totalMinutes = hour * 60 + minute;
  const toneIndex = Math.floor(totalMinutes / 240) % 6; // 4 saatte bir ton
  const colorIndex = Math.floor((totalMinutes % 240) / 40) % 6;
  return {
    tone: { number: toneIndex + 1, ...TONES[toneIndex + 1] },
    color: { number: colorIndex + 1, ...COLORS[colorIndex + 1] },
  };
}

// ──────────────────────────────────────────────
// ANA HD HESAPLAMA
// ──────────────────────────────────────────────

/**
 * Tam HD haritasını hesaplar
 * @param {Object} astroChart - AstroEngine.calculate() çıktısı
 * @param {Object} hdSunPos   - AstroEngine.hdSunPositions() çıktısı
 * @param {Object} birthData  - { year, month, day, hour, minute }
 */
function calculateHumanDesign(astroChart, hdSunPos, birthData) {
  const { hour, minute } = birthData;

  // ── 1. AKTİF KAPILARI HESAPLA ──────────────────

  // Bilinçli aktivasyon noktaları (Kişilik — bilinçli kapılar)
  // Güneş, Dünya (Güneş karşısı), Ay, Kuzey Düğüm, Güney Düğüm,
  // Merkür, Venüs, Mars, Jüpiter, Satürn

  function getGate(longitude, isOpposite = false) {
    const lon = isOpposite ? (longitude + 180) % 360 : longitude;
    return longitudeToGateAndLine(lon);
  }

  const conscPlanets = {
    sun:       getGate(astroChart.sun.longitude),
    earth:     getGate(astroChart.sun.longitude, true),
    moon:      getGate(astroChart.moon.longitude),
    northNode: getGate(astroChart.northNode.longitude),
    southNode: getGate(astroChart.northNode.longitude, true),
    mercury:   getGate(astroChart.planets.mercury.longitude),
    venus:     getGate(astroChart.planets.venus.longitude),
    mars:      getGate(astroChart.planets.mars.longitude),
    jupiter:   getGate(astroChart.planets.jupiter.longitude),
    saturn:    getGate(astroChart.planets.saturn.longitude),
  };

  // Bilinçsiz aktivasyon noktaları (Tasarım — gerçek 88 gün önce hesabı)
  // hdSunPos.designPlanets astro motorundan gerçek pozisyonları içerir
  const dp = hdSunPos.designPlanets;
  let unconsPlanets;
  if (dp) {
    // GERÇEK design pozisyonları — her gezegen 88 gün önceki gökyüzünde ayrı hesaplandı
    unconsPlanets = {
      sun:       getGate(dp.sun),
      earth:     getGate(dp.earth != null ? dp.earth : (dp.sun + 180) % 360),
      moon:      getGate(dp.moon),
      northNode: getGate(dp.northNode),
      southNode: getGate(dp.southNode != null ? dp.southNode : (dp.northNode + 180) % 360),
      mercury:   getGate(dp.mercury),
      venus:     getGate(dp.venus),
      mars:      getGate(dp.mars),
      jupiter:   getGate(dp.jupiter),
      saturn:    getGate(dp.saturn),
    };
  } else {
    // Geriye dönük uyumluluk: designPlanets yoksa eski tahmini kullan
    unconsPlanets = {
      sun:       hdSunPos.unconscious,
      earth:     getGate(hdSunPos.unconscious.longitude, true),
      moon:      longitudeToGateAndLine(norm360(astroChart.moon.longitude + 30)),
      northNode: longitudeToGateAndLine(norm360(astroChart.northNode.longitude + 1)),
      southNode: longitudeToGateAndLine(norm360(astroChart.northNode.longitude + 181)),
      mercury:   longitudeToGateAndLine(norm360(astroChart.planets.mercury.longitude + 85)),
      venus:     longitudeToGateAndLine(norm360(astroChart.planets.venus.longitude + 50)),
      mars:      longitudeToGateAndLine(norm360(astroChart.planets.mars.longitude + 15)),
      jupiter:   longitudeToGateAndLine(norm360(astroChart.planets.jupiter.longitude + 3)),
      saturn:    longitudeToGateAndLine(norm360(astroChart.planets.saturn.longitude + 1)),
    };
  }

  // ── 2. AKTİF KAPILARI BİRLEŞTİR ──────────────────

  const activeGates = new Set();
  const consciousGates = new Set();
  const unconsciousGates = new Set();

  const planetLabels = {
    sun: 'Güneş', earth: 'Dünya', moon: 'Ay',
    northNode: 'K.Düğüm', southNode: 'G.Düğüm',
    mercury: 'Merkür', venus: 'Venüs', mars: 'Mars',
    jupiter: 'Jüpiter', saturn: 'Satürn',
  };

  const activationDetail = {};

  for (const [key, pos] of Object.entries(conscPlanets)) {
    activeGates.add(pos.gate);
    consciousGates.add(pos.gate);
    activationDetail[`c_${key}`] = {
      planet: planetLabels[key],
      type: 'Bilinçli',
      gate: pos.gate,
      line: pos.line,
    };
  }
  for (const [key, pos] of Object.entries(unconsPlanets)) {
    activeGates.add(pos.gate);
    unconsciousGates.add(pos.gate);
    activationDetail[`u_${key}`] = {
      planet: planetLabels[key],
      type: 'Bilinçsiz',
      gate: pos.gate,
      line: pos.line,
    };
  }

  const activeGatesArray = [...activeGates];

  // ── 3. AKTIF KANALLARI BUL ──────────────────

  const activeChannels = CHANNELS.filter(ch =>
    activeGates.has(ch.gates[0]) && activeGates.has(ch.gates[1])
  ).map(ch => ({
    ...ch,
    conscious: consciousGates.has(ch.gates[0]) && consciousGates.has(ch.gates[1]),
    unconscious: unconsciousGates.has(ch.gates[0]) && unconsciousGates.has(ch.gates[1]),
    mixed: (consciousGates.has(ch.gates[0]) || consciousGates.has(ch.gates[1])) &&
           (unconsciousGates.has(ch.gates[0]) || unconsciousGates.has(ch.gates[1])),
  }));

  // ── 4. TANIMLI MERKEZLERİ BUL ──────────────────

  // Bir merkez tanımlıdır eğer içindeki kapılardan en az biri aktifse
  // VE o kapının partneri de aktifse (kanal tamamlanmış)
  const definedCenters = new Set();
  for (const ch of activeChannels) {
    definedCenters.add(GATE_TO_CENTER[ch.gates[0]]);
    definedCenters.add(GATE_TO_CENTER[ch.gates[1]]);
  }

  // Eğer hiç kanal tamamlanmamışsa — Yansıtıcı
  // Fakat tekil kapılar da merkezi kısmen etkiler (hanging gates)
  const openCenters = Object.keys(CENTER_INFO).filter(c => !definedCenters.has(c));

  // ── 5. TİP BELİRLE ──────────────────

  let type = 'projector'; // Varsayılan

  const hasSacral = definedCenters.has('sacral');
  const hasSolar = definedCenters.has('solar');
  const hasThroat = definedCenters.has('throat');
  const hasHeart = definedCenters.has('heart');
  const hasRoot = definedCenters.has('root');

  if (definedCenters.size === 0) {
    type = 'reflector';
  } else if (hasSacral) {
    // Sakral tanımlı → Generator veya MG
    // MG: Sakral + Boğaz bağlantısı var (motor boğaza bağlı)
    const sacralToThroat = activeChannels.some(ch => {
      const c1 = GATE_TO_CENTER[ch.gates[0]];
      const c2 = GATE_TO_CENTER[ch.gates[1]];
      return (c1 === 'sacral' && c2 === 'throat') || (c1 === 'throat' && c2 === 'sacral');
    });
    // Diğer motor-boğaz bağlantıları
    const motorToThroat = activeChannels.some(ch => {
      const c1 = GATE_TO_CENTER[ch.gates[0]];
      const c2 = GATE_TO_CENTER[ch.gates[1]];
      const motors = ['sacral', 'heart', 'solar', 'root'];
      return (motors.includes(c1) && c2 === 'throat') || (c1 === 'throat' && motors.includes(c2));
    });
    type = motorToThroat ? 'manifesting_generator' : 'generator';
  } else {
    // Sakral tanımsız
    // Motor (heart, solar, root) boğaza bağlıysa → Manifestör
    const motorToThroat = activeChannels.some(ch => {
      const c1 = GATE_TO_CENTER[ch.gates[0]];
      const c2 = GATE_TO_CENTER[ch.gates[1]];
      const motors = ['heart', 'solar', 'root'];
      return (motors.includes(c1) && c2 === 'throat') || (c1 === 'throat' && motors.includes(c2));
    });
    type = motorToThroat ? 'manifestor' : 'projector';
  }

  // ── 6. OTORİTE BELİRLE ──────────────────

  let authority = 'mental';

  if (definedCenters.has('solar')) {
    authority = 'emotional';
  } else if (definedCenters.has('sacral')) {
    authority = 'sacral';
  } else if (definedCenters.has('spleen')) {
    authority = 'splenic';
  } else if (definedCenters.has('heart')) {
    authority = 'ego';
  } else if (definedCenters.has('g')) {
    authority = 'self';
  } else if (type === 'reflector') {
    authority = 'lunar';
  } else {
    authority = 'mental';
  }

  // ── 7. PROFİL BELİRLE ──────────────────

  const consciousLine = conscPlanets.sun.line;
  const unconsciousLine = unconsPlanets.sun.line;
  const profileKey = `${consciousLine}/${unconsciousLine}`;
  const profile = PROFILE_INFO[profileKey] || {
    name: `${consciousLine}/${unconsciousLine}`,
    theme: 'Nadir profil',
    role: 'Özgün Yol',
  };

  // ── 8. TON + RENK ──────────────────

  const toneColor = calculateToneAndColor(hour, minute);

  // ── 9. AÇIK MERKEZ YORUMLARI ──────────────────

  const openCenterInsights = openCenters.map(center => ({
    center,
    name: CENTER_INFO[center].name,
    ...OPEN_CENTER_CONDITIONING[center],
  }));

  // ── 10. TANIMLI MERKEZ ÖZETİ ──────────────────

  const definedCenterList = [...definedCenters].map(center => ({
    center,
    name: CENTER_INFO[center].name,
    type: CENTER_INFO[center].type,
  }));

  // ── 11. DEVRESİNE GÖRE KANAL ANALİZİ ──────────────────

  const circuitSummary = {
    individual: activeChannels.filter(c => c.circuit === 'Bireysel'),
    collective: activeChannels.filter(c => c.circuit === 'Kolektif'),
    tribal:     activeChannels.filter(c => c.circuit === 'Aşiret'),
  };

  // Baskın devre
  const dominantCircuit = Object.entries(circuitSummary)
    .sort((a, b) => b[1].length - a[1].length)[0][0];

  const circuitLabels = { individual: 'Bireysel', collective: 'Kolektif', tribal: 'Aşiret' };

  // ── 12. TANIM TÜRÜ ──────────────────

  // Split tanımı: bağlantısız iki veya daha fazla tanımlı merkez grubu
  function getDefinitionType(definedCenters, channels) {
    if (definedCenters.size === 0) return 'Yok';

    // Bağlı bileşenleri bul
    const centerList = [...definedCenters];
    const visited = new Set();
    const components = [];

    function dfs(center, component) {
      visited.add(center);
      component.push(center);
      for (const ch of channels) {
        const c1 = GATE_TO_CENTER[ch.gates[0]];
        const c2 = GATE_TO_CENTER[ch.gates[1]];
        if (c1 === center && definedCenters.has(c2) && !visited.has(c2)) dfs(c2, component);
        if (c2 === center && definedCenters.has(c1) && !visited.has(c1)) dfs(c1, component);
      }
    }

    for (const c of centerList) {
      if (!visited.has(c)) {
        const comp = [];
        dfs(c, comp);
        components.push(comp);
      }
    }

    if (components.length === 1) return 'Tekil Tanım';
    if (components.length === 2) return 'İkili Bölünmüş Tanım';
    if (components.length === 3) return 'Üçlü Bölünmüş Tanım';
    return 'Dörtlü Bölünmüş Tanım';
  }

  const definitionType = getDefinitionType(definedCenters, activeChannels);

  // ── 13. SONUCU BİRLEŞTİR ──────────────────

  return {
    // Tip
    type,
    typeInfo: TYPE_INFO[type],

    // Otorite
    authority,
    authorityInfo: AUTHORITY_INFO[authority],

    // Profil
    profile: profileKey,
    profileInfo: profile,

    // Tanım türü
    definitionType,

    // Kapılar
    activeGates: activeGatesArray,
    consciousGates: [...consciousGates],
    unconsciousGates: [...unconsciousGates],

    // Aktivasyon detayları
    activations: {
      conscious: conscPlanets,
      unconscious: unconsPlanets,
      detail: activationDetail,
    },

    // Kanallar
    activeChannels,
    circuitSummary,
    dominantCircuit: circuitLabels[dominantCircuit],

    // Merkezler
    definedCenters: definedCenterList,
    openCenters: openCenterInsights,

    // Ton + Renk
    toneColor,

    // HD Güneş özeti
    sunGate: {
      conscious:   conscPlanets.sun,
      unconscious: unconsPlanets.sun,
    },
  };
}

// ──────────────────────────────────────────────
// KISA YORUM ÜRET
// ──────────────────────────────────────────────

function generateHDSummary(hd) {
  const t = hd.typeInfo;
  const a = hd.authorityInfo;
  const p = hd.profileInfo;

  return {
    headline: `${t.name} · ${a.name} · Profil ${hd.profile}`,

    typeText: `${t.description} Stratejin: "${t.strategy}". İmzan ${t.signature} — sağ yoldayken bunu hissedersin. Tuzağın ${t.notSelf} — bunu hissediyorsan durma zamanı.`,

    authorityText: `${a.description} Pratik: ${a.practice}`,

    profileText: `${p.name}. ${p.theme}. Yaşam rolün: ${p.role}.`,

    channelCount: hd.activeChannels.length,
    definedCenterCount: hd.definedCenters.length,

    dominantCircuit: `Baskın devre: ${hd.dominantCircuit}. ` +
      (hd.dominantCircuit === 'Bireysel' ? 'Benzersiz yolunu takip et, çevreye bakma.' :
       hd.dominantCircuit === 'Kolektif' ? 'Deneyimlerin başkalarına ilham olur.' :
       'Aile ve yakın topluluğun merkezindesin.'),

    toneText: `Ton ${hd.toneColor.tone.number} — ${hd.toneColor.tone.name}: ${hd.toneColor.tone.description}`,
    colorText: `Renk ${hd.toneColor.color.number} — ${hd.toneColor.color.name}: ${hd.toneColor.color.description}`,

    definitionText: hd.definitionType === 'Tekil Tanım'
      ? 'Tekil tanım: Tutarlı ve bağımsız bir enerji alanı taşırsın. Başkasına ihtiyaç duymadan kendi içinde tamamsın.'
      : `${hd.definitionType}: Belirli insanlar veya ortamlar enerji alanını tamamlar.`,
  };
}

// ──────────────────────────────────────────────
// BODY CHART SVG
// ──────────────────────────────────────────────

function renderBodyChart(hd) {
  const CENTERS = {
    head:   { x:130, y:22,  r:22, name:'Kafa'  },
    ajna:   { x:130, y:72,  r:22, name:'Ajna'  },
    throat: { x:130, y:128, r:22, name:'Boğaz' },
    g:      { x:130, y:190, r:26, name:'G'     },
    heart:  { x:84,  y:165, r:20, name:'Yürek' },
    solar:  { x:176, y:222, r:20, name:'Solar' },
    sacral: { x:130, y:258, r:24, name:'Sakral'},
    spleen: { x:72,  y:230, r:20, name:'Dalak' },
    root:   { x:130, y:328, r:22, name:'Kök'   },
  };
  const CHANNEL_PAIRS = [
    ['head','ajna'],['ajna','throat'],['throat','g'],
    ['throat','heart'],['throat','solar'],
    ['g','heart'],['g','sacral'],['g','spleen'],
    ['heart','sacral'],['heart','solar'],
    ['solar','sacral'],['solar','root'],
    ['sacral','root'],['sacral','spleen'],
    ['spleen','root'],['spleen','heart'],
  ];
  const definedSet = new Set();
  (hd.definedCenters || []).forEach(dc => {
    const key = typeof dc === 'object' ? dc.center : dc;
    if (key) definedSet.add(key);
  });
  const COLOR_MAP = {
    head:'rgba(138,106,170,0.7)', ajna:'rgba(138,106,170,0.7)',
    throat:'rgba(138,106,170,0.85)', g:'rgba(201,169,110,0.75)',
    heart:'rgba(200,120,130,0.75)', solar:'rgba(200,120,130,0.7)',
    sacral:'rgba(106,154,120,0.75)', spleen:'rgba(106,154,120,0.7)',
    root:'rgba(90,106,170,0.7)',
  };
  let svg = '<svg viewBox="0 0 260 380" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:260px;display:block;margin:0 auto">';
  CHANNEL_PAIRS.forEach(([k1,k2]) => {
    const a = CENTERS[k1], b = CENTERS[k2];
    if (!a || !b) return;
    const active = definedSet.has(k1) && definedSet.has(k2);
    svg += `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}"`;
    svg += ` stroke="${active ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.06)'}"`;
    svg += ` stroke-width="${active ? 3 : 1.5}"`;
    if (!active) svg += ' stroke-dasharray="4,4"';
    svg += '/>';
  });
  Object.keys(CENTERS).forEach(key => {
    const cc = CENTERS[key];
    const def = definedSet.has(key);
    svg += `<circle cx="${cc.x}" cy="${cc.y}" r="${cc.r}"`;
    svg += ` fill="${def ? (COLOR_MAP[key] || 'rgba(138,106,170,0.7)') : 'rgba(255,255,255,0.06)'}"`;
    svg += ` stroke="rgba(255,255,255,${def ? '0.35' : '0.12'})" stroke-width="1.5"/>`;
    const fs = cc.r > 22 ? '8' : '7';
    svg += `<text x="${cc.x}" y="${cc.y + 2.5}" text-anchor="middle" dominant-baseline="middle"`;
    svg += ` fill="rgba(255,255,255,${def ? '0.9' : '0.35'})"`;
    svg += ` font-size="${fs}" font-family="Cinzel,serif" letter-spacing="0.05em">${cc.name}</text>`;
  });
  const tipColor = 'rgba(180,150,220,0.8)';
  svg += `<text x="130" y="365" text-anchor="middle" fill="${tipColor}"`;
  svg += ` font-size="9" font-family="Cinzel,serif" letter-spacing="0.15em">`;
  svg += (hd.typeInfo?.name || hd.type || '').toUpperCase() + '</text>';
  svg += '</svg>';
  return svg;
}

// ──────────────────────────────────────────────
// PUBLIC API
// ──────────────────────────────────────────────

const HDEngine = {
  calculate: calculateHumanDesign,
  summary: generateHDSummary,
  renderBodyChart,

  // Yardımcılar
  longitudeToGate: longitudeToGateAndLine,
  calculateToneColor: calculateToneAndColor,

  // Sabitler
  TYPE_INFO,
  AUTHORITY_INFO,
  PROFILE_INFO,
  CHANNELS,
  CENTER_INFO,
  GATE_TO_CENTER,
  OPEN_CENTER_CONDITIONING,
  TONES,
  COLORS,
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = HDEngine;
} else if (typeof window !== 'undefined') {
  window.HDEngine = HDEngine;
}
