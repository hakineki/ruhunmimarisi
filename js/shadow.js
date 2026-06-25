/**
 * ═══════════════════════════════════════════════════════════════
 * SHADOW.JS — Gölge Profili Motoru
 * ═══════════════════════════════════════════════════════════════
 *
 * Jung'un gölge teorisi temelli, çok-kaynaklı birleşik analiz.
 * Kaynak sistemler: Human Design · Numeroloji · Astroloji
 *
 * İçerik:
 *   SAVUNMA MEKANİZMALARI  — 20 temel psikolojik savunma
 *   GOLGE_ARKETİPLERİ      — 12 temel gölge arketipi
 *   GEZEGEN_GOLGE          — Gezegenlerin gölge katmanları
 *   BURS BURCU GOLGE       — 12 burç gölge örüntüleri
 *   TİP_GOLGE              — HD 5 tip gölge analizi
 *
 *   SHADOW_ENGINE
 *     buildProfile()       — Tüm kaynaklardan birleşik profil
 *     getDailyMirror()     — Günlük ayna sorusu
 *     getWeeklyTheme()     — Haftalık gölge teması
 *     getShadowScore()     — Aktivasyon yoğunluğu skoru
 *     getIntegrationPlan() — 4 haftalık entegrasyon planı
 * ═══════════════════════════════════════════════════════════════
 */

'use strict';

// ═══════════════════════════════════════════════════════
// SAVUNMA MEKANİZMALARI
// ═══════════════════════════════════════════════════════

const SAVUNMA_MEKANIZMALARI = {

  projeksiyon: {
    ad: 'Projeksiyon',
    kisa: 'Kendi kabul edilemez dürtülerini başkasında görme',
    detay: `Kişi, kendi içinde tanımak istemediği özelliği başkasına yansıtır. "O çok bencil" diyen kişi çoğunlukla kendi bencilliğini işlemiyor demektir. Projeksiyon, öz-farkındalığın önündeki en yaygın engeldir.`,
    isaretler: ['Başkasında sürekli eleştirdiğin bir özellik sende de var mı?', 'En çok kızdığın şey sana ayna tutuyor olabilir.'],
    donusum: 'Eleştirdiğin özelliği kendinle ilişkilendir. "Bu bende nasıl görünüyor?" diye sor.',
    kategori: 'distorsiyon',
  },

  inkâr: {
    ad: 'İnkâr',
    kisa: 'Rahatsız edici gerçeği reddetme',
    detay: `Kişi gerçeği görmek istemediğinde onu hiç yokmuş gibi davranır. İnkâr kısa vadede acıyı engeller ama uzun vadede değişimi imkânsız kılar.`,
    isaretler: ['Yakınların sürekli söylediği ama duymadığın bir şey var mı?', 'Kanıta rağmen inanmak istemediğin bir şey?'],
    donusum: '"Bu doğru olsaydı ne yapardım?" sorusunu sor — inkârı yumuşatır.',
    kategori: 'ilkel',
  },

  rasyonalizasyon: {
    ad: 'Rasyonalizasyon',
    kisa: 'Gerçek nedeni gizlemek için mantıklı gerekçe üretme',
    detay: `Bir şeyi istemek ya da yapmak için güçlü bir "iyi neden" üretilir. Gerçek motivasyon (korku, kıskançlık, öfke) gizlenir. Akıllı kişilerde çok sık görülür.`,
    isaretler: ['Kararlarına geriye dönük gerekçeler mi üretiyorsun?', 'Başkasını bu kararında ikna etmek çok mu önemli?'],
    donusum: '"Gerçek sebebim ne?" diye sor. Cevabı yazmak, rasyonalizasyonu deler.',
    kategori: 'distorsiyon',
  },

  baskılama: {
    ad: 'Baskılama',
    kisa: 'Bilinçli olarak kabul edilemez düşünce veya duyguyu bastırma',
    detay: `Bilinçli olarak belirli bir düşünce veya duygunun üzerine kapak kapatılır. "Bunu düşünmeyeceğim" kararı alınır. Kısa vadede işe yarar ama baskılanan içerik yüklü şekilde geri döner.`,
    isaretler: ['Düşünmemeye çalıştığın ama sürekli geleri dönen bir şey var mı?', 'Belirli bir konu çıkınca bedeninde gerilim oluyor mu?'],
    donusum: 'Bastırılan içeriği bir günlükte yazmak — yargılamadan — baskıyı azaltır.',
    kategori: 'ilkel',
  },

  yer_değiştirme: {
    ad: 'Yer Değiştirme',
    kisa: 'Duyguyu güvenli hedefe yönlendirme',
    detay: `Gerçek kaynağa yönelik duygu ifade edilemediğinde daha "güvenli" bir hedefe yönlendirilir. İşte patronuna kızıp evde aile üyelerine patlamak klasik örnektir.`,
    isaretler: ['Öfkeni gerçek kaynağa mı, yoksa "daha güvenli" birine mi yönlendiriyorsun?', 'Kime kızıyorsun, gerçekten kime kızman gerekiyor?'],
    donusum: 'Öfkenin gerçek adresini bul. Duyguyu doğru kaynakla yüzleştir.',
    kategori: 'yeniden_yönlendirme',
  },

  sublimation: {
    ad: 'Yüceltme (Sublimation)',
    kisa: 'Kabul edilemez dürtüyü sosyal açıdan değerli biçime dönüştürme',
    detay: `Tek sağlıklı savunma mekanizması olarak kabul edilir. Agresif enerji spora, cinsel enerji sanata, öfke aktivizme dönüştürülür. Patolojik değil, olgunluğun işareti.`,
    isaretler: ['Bir tutkunun altında ne yatıyor?', 'Hangi "olumsuz" enerji seni yaratıcı kılıyor?'],
    donusum: 'Yüceltmeyi bilinçli kullan — bastırılmış enerji için bir kanal tasarla.',
    kategori: 'olgun',
  },

  regresyon: {
    ad: 'Regresyon',
    kisa: 'Stres altında daha erken gelişim dönemine geri dönme',
    detay: `Yetişkin, stres altında çocuksu davranış örüntüleri sergiler — inatlaşma, ağlama krizleri, bağımlı davranış. Bu geçmiş travmanın bir izi olabilir.`,
    isaretler: ['Çok stresli olduğunda nasıl davranıyorsun? Bu davranış yaşına uygun mu?', 'Belirli durumlarda "küçük" hissediyor musun?'],
    donusum: 'Regresyonu fark etmek zaten büyük bir adım. Yetişkin benlik tarafından temin edilmesi gereken ihtiyacı tanı.',
    kategori: 'ilkel',
  },

  entelektüelleştirme: {
    ad: 'Entelektüelleştirme',
    kisa: 'Duyguyu analiz ederek uzak tutma',
    detay: `Duygusal deneyim, soyut kavramların arkasına saklanır. "Bunu analiz ediyorum" derken aslında hissetmekten kaçınılır. Zekice ama duygusal uzaklık yaratır.`,
    isaretler: ['Zor bir şey yaşadığında ne kadar hızlı "analiz" moduna geçiyorsun?', 'Başkası sana dert anlatırken teori mi üretiyorsun, yoksa birlikte mi hissediyorsun?'],
    donusum: 'Analizden önce bir dakika otur ve bedeninde ne hissettiğini sor.',
    kategori: 'distorsiyon',
  },

  pasif_saldırganlık: {
    ad: 'Pasif Saldırganlık',
    kisa: 'Öfkeyi doğrudan ifade etmek yerine dolaylı biçimde gösterme',
    detay: `Öfke veya kırgınlık gecikmeli davranma, unutma, ironi ve ince sabotaj yoluyla ifade edilir. Genellikle kendisi de farkında değildir.`,
    isaretler: ['"Tamam" deyip aslında tamam olmadığın oluyor mu?', 'Söz verdiğin ama "bir türlü" yapamadığın şeyler var mı?'],
    donusum: 'Öfkeyi doğrudan ve sakin biçimde ifade etme pratiği yap — "Ben ifadesi" kullan.',
    kategori: 'yeniden_yönlendirme',
  },

  izolasyon: {
    ad: 'İzolasyon',
    kisa: 'Duyguyu düşünceden ayırma',
    detay: `Olay hatırlanır ama duygusal tonu silinmiştir. "Evet bunu yaşadım, ama bir şey hissetmiyorum" tepkisi tipiktir. Travma sonrası sık görülür.`,
    isaretler: ['Zorlu bir anıyı düz bir sesle, hiç duygu olmadan anlatıyor musun?', 'Çok önemli anlar sana boş mu geliyor?'],
    donusum: 'Duyguyu beden duyumlarıyla yeniden bağla — "Bu anı hatırlarken bedenimde ne oluyor?"',
    kategori: 'distorsiyon',
  },

  yansıtmalı_özdeşleşim: {
    ad: 'Yansıtmalı Özdeşleşim',
    kisa: 'Başkasının duygusal tepkisini yönetmek için bilinçsiz provoke etme',
    detay: `Kişi kendi içinde taşıyamadığı duyguyu başkasına yansıtır ve ardından o kişinin bu duyguyu yaşamasını tetikler. Örneğin: sürekli "sen bana kızıyorsun" diyerek karşıyı gerçekten kızdırmak.`,
    isaretler: ['İlişkilerinde döngüsel çatışmalar var mı?', 'Karşın sana "neden beni böyle hissettiriyorsun" diyor mu?'],
    donusum: 'Tetiklediğin duygunun aslında sende ne anlam taşıdığını araştır.',
    kategori: 'ilişkisel',
  },

  idealizasyon_devalüasyon: {
    ad: 'İdealizasyon / Devalüasyon',
    kisa: 'Birini önce mükemmel sonra değersiz görme',
    detay: `İlişkinin başında kişi "mükemmel" görülür. İlk hayal kırıklığında "değersiz"e düşer. Bu iki kutuplu görme örüntüsü, kişiliğin bütünleşmemişliğine işaret eder.`,
    isaretler: ['İlişkilerin çoğu yoğun başlayıp dramatik bitiyor mu?', '"Her şeyin ya çok iyi ya çok kötü olduğu" hissi tanıdık mı?'],
    donusum: 'Kişileri "hem/hem de" ile görmeyi pratik et — kusurları ve güzellikleri aynı anda.',
    kategori: 'ilişkisel',
  },

  kaçınma: {
    ad: 'Kaçınma',
    kisa: 'Anksiyete uyandıran durumlardan sistematik uzaklaşma',
    detay: `Kaçınma kısa vadede rahatlama sağlar ama anksiyeteyi besler. Ne kadar çok kaçınılırsa konu o kadar "büyür". İşlevsel olmayan bir güvenlik mekanizması.`,
    isaretler: ['Ertelediğin ama önemli olan şeyler var mı?', 'Belirli konuşmaları, kişileri veya durumları aktif olarak atlıyor musun?'],
    donusum: 'Kaçındığın şeyle küçük, yönetilebilir bir temas kur. Kaçınma döngüsünü kır.',
    kategori: 'davranışsal',
  },

  kompansasyon: {
    ad: 'Kompansasyon',
    kisa: 'Bir alandaki zayıflığı başka alanda aşırı telafi etme',
    detay: `Kişi içinde eksik hissettiği alana aşırı odaklanır. Zayıf hisseden beden imajı varsa spor obsesyonu gelişir. Kendini yetersiz hisseden kişi aşırı başarı peşinde koşar.`,
    isaretler: ['Aşırı çalıştığın, aşırı mükemmelleşmeye çalıştığın bir alan var mı?', 'Bu alan sana bir şeyi "kanıtlama" gibi hissettiriyor mu?'],
    donusum: 'Telafi etmeye çalıştığın temel inancı bul: "Ben…" diye başlayan cümleyi tamamla.',
    kategori: 'davranışsal',
  },

  geri_alma: {
    ad: 'Geri Alma',
    kisa: 'Yanlış yapıldığı hissedilen eylemi sembolik bir davranışla silme girişimi',
    detay: `"Seni seviyorum ama aynı zamanda seni incitiyorum" döngüsünde görülür. Yıkıcı davranış → suçluluk → telafi eylemi → tekrar yıkıcı davranış.`,
    isaretler: ['Birine zarar verdikten sonra aşırı telafi ediyor musun?', 'Özür dilemek yerine hediye almak veya aşırı sevecenlik dönemi geliyor mu?'],
    donusum: 'Döngüyü başlatan davranışı fark et ve oradan müdahale et — telafiden değil.',
    kategori: 'ilişkisel',
  },

  bölme: {
    ad: 'Bölme (Splitting)',
    kisa: 'Şeyleri ya tamamen iyi ya tamamen kötü görme',
    detay: `"Ya hep ya hiç" düşüncesi. Kişiler, durumlar veya kendi benliği karmaşıklık içinde tutulamaz — ya siyah ya beyaz. Gri alan yoktur.`,
    isaretler: ['"O tamamen iyi biri" ya da "o tamamen berbat biri" diyor musun?', 'Fikirlerini çok sık 180 derece değiştiriyor musun?'],
    donusum: 'Her kişi veya durumda hem olumlu hem olumsuz bir şey bul — bunları aynı anda tut.',
    kategori: 'distorsiyon',
  },

  somatizasyon: {
    ad: 'Somatizasyon',
    kisa: 'Psikolojik gerilimin bedensel belirtiye dönüşmesi',
    detay: `Söylenemeyenler, hissedilemeyenler beden üzerinden konuşur. Kronik ağrı, baş ağrısı, sindirim sorunları çoğunlukla duygusal içerikle ilişkilidir.`,
    isaretler: ['Stresli dönemlerde spesifik bedensel şikâyetlerin artıyor mu?', 'Belirli kişi ya da durumlarla bedenin nasıl tepki veriyor?'],
    donusum: 'Belirtinin bir duygu olsaydı ne olurdu? Beden sembollüdür — onunla konuş.',
    kategori: 'bedensel',
  },

  omnipotans: {
    ad: 'Omnipotans (Her Şeye Gücüm Yeter)',
    kisa: 'Sınırsız güç ve kontrol yanılgısı',
    detay: `"Ben her şeyi hallederim", "ben olmadan olmaz" inancı. Gerçek sınırlarla yüzleşmekten kaçınmak için güç abartılır. Genellikle derininde yüksek anksiyete yatar.`,
    isaretler: ['Yardım istemekte zorlanıyor musun?', 'Başkalarının işini de üstlenme eğilimin var mı?'],
    donusum: '"Bunu tek başıma yapmam gerekmiyor" cümlesini içselleştir.',
    kategori: 'distorsiyon',
  },

  humor: {
    ad: 'Mizah Yoluyla Savunma',
    kisa: 'Gerçek duyguyu espriyle yumuşatma veya gizleme',
    detay: `Mizah bir savunma mekanizması olarak kullanıldığında, zor duyguların doğrudan ifadesini engeller. "Kendini ciddiye almama" maskesi bazen derinlikteki acıyı örter.`,
    isaretler: ['Zor bir an gelince hemen espri yapıyor musun?', '"Aslında çok üzülüyorum ama güldürücü anlatsam olmaz mı?" oluyor mu?'],
    donusum: 'Mizahın arkasındaki duyguyu bir kez doğrudan ifade et — ne hissediyorsun?',
    kategori: 'distorsiyon',
  },

  kontrol: {
    ad: 'Kontrol İhtiyacı',
    kisa: 'Belirsizliği tolere edememek, her şeyi öngörülebilir kılma çabası',
    detay: `Kontrol ihtiyacı, derinlikteki güvensizliğin tezahürüdür. "Her şey planlandığı gibi giderse güvendeyim" inancına dayanır. Kontrolü kaybetme korkusu anksiyetenin temel kaynağı olabilir.`,
    isaretler: ['Planların bozulduğunda orantısız tepki veriyor musun?', 'Başkasının işini devredip rahat olabiliyor musun?'],
    donusum: 'Kontrol edemediğin küçük bir şeyi bilinçli olarak bırak — ne oldu?',
    kategori: 'davranışsal',
  },
};

// ═══════════════════════════════════════════════════════
// GÖLGE ARKETİPLERİ (Jung + Joseph Campbell sentezi)
// ═══════════════════════════════════════════════════════

const GOLGE_ARKETİPLERİ = {

  kral_golgesi: {
    ad: 'Kral / Tiran',
    tema: 'Güç ve meşruiyet',
    aydinlik: 'Adil, besleyici, düzenleyici liderlik',
    golge: 'Tiran, zayıf kral veya aşırı pasif güçsüz',
    isaretler: ['Gücünü nasıl kullanıyorsun?', 'Liderlik aldığında neyi hissediyorsun?'],
    donusum: 'Gücü hizmet için kullan — ego için değil.',
  },

  savasci_golgesi: {
    ad: 'Savaşçı / Sadist',
    tema: 'Güç ve sınır',
    aydinlik: 'Disiplinli, sınır koyan, değerleri savunan güç',
    golge: 'Sadist, zorba veya tam tersi tamamen pasif/kurban',
    isaretler: ['Sınır koyarken ne hissediyorsun?', 'Öfkeni nereye yönlendiriyorsun?'],
    donusum: 'Öfkeyi bir değer savunmasına dönüştür.',
  },

  sevgili_golgesi: {
    ad: 'Sevgili / Bağımlı',
    tema: 'Bağlantı ve arzu',
    aydinlik: 'Tutku, neşe, estetik duyarlılık, gerçek bağlantı',
    golge: 'Bağımlılık, obsesyon veya duygusal uyuşma',
    isaretler: ['İlişkilerinde kendin kalabiliyor musun?', 'Arzu ile bağımlılık arasındaki farkı hissedebiliyor musun?'],
    donusum: 'Kendini tam olarak verebilmek için önce kendini tam olarak bil.',
  },

  bilge_golgesi: {
    ad: 'Bilge / Manipülatör',
    tema: 'Bilgi ve rehberlik',
    aydinlik: 'Derinlik, anlam arayışı, rehberlik',
    golge: 'Manipülatör, sinsi akıl veya bilgiyi güç için kullanan',
    isaretler: ['Bilgini paylaşırken fark ettirmeden yönlendiriyor musun?', 'Gerçekten rehber misin, yoksa kontrol mü ediyorsun?'],
    donusum: 'Bilgiyi güçlendirmek için ver — güç elde etmek için değil.',
  },

  kahraman_golgesi: {
    ad: 'Kahraman / Zorba',
    tema: 'Cesaret ve fedakârlık',
    aydinlik: 'Cesaret, dönüşüm, kolektif iyiliğe hizmet',
    golge: 'Zorba, kendini feda eden ya da kurtarıcı kimliğine bağımlı',
    isaretler: ['Başkasını kurtarmak için kendi sınırlarını aşıyor musun?', 'Kahraman rolü sana ne veriyor?'],
    donusum: 'Kurtarmadan önce kendini kurtar.',
  },

  kurnaz_golgesi: {
    ad: 'Kurnaz / Yalancı',
    tema: 'Yaratıcılık ve adaptasyon',
    aydinlik: 'Yaratıcılık, esneklik, beklenmedik çözümler',
    golge: 'Yalancı, manipülatör, kuralsız',
    isaretler: ['Zekice çözümler bulurken başkasının zararını göz ardı ediyor musun?', 'Kuralları esnetmek sana ne zaman normal görünüyor?'],
    donusum: 'Yaratıcılığını etik sınırlar içinde kullan.',
  },

  hayalet_golgesi: {
    ad: 'Hayalet / Görünmez',
    tema: 'Kimlik ve varoluş',
    aydinlik: 'Empati, görünmezlik içinde güç, derin gözlem',
    golge: 'Kimliksizlik, kronik görünmezlik, var olmama hissi',
    isaretler: ['Kendini görülmeden önce başkasını görür müsün?', 'Var olduğunu kanıtlama ihtiyacı hissediyor musun?'],
    donusum: '"Ben varım" — bunu kanıtlamak zorunda olmadan söyleyebilmek.',
  },

  çocuk_golgesi: {
    ad: 'İç Çocuk / Kayıp Çocuk',
    tema: 'Masumiyyet ve yaralanma',
    aydinlik: 'Merak, neşe, spontanlık, özgün duygu',
    golge: 'Yaralı çocuk, bakımsız kalmış ihtiyaçlar, oyun yasağı',
    isaretler: ['Kendinle ne kadar oynayabiliyor, hafif olabiliyor musun?', 'Hangi ihtiyacın çocukken görülmedi ve hâlâ görülmeyi bekliyor?'],
    donusum: 'İç çocuğuna — eleştirmeden — haftalık bir zaman ayır.',
  },

};

// ═══════════════════════════════════════════════════════
// HD TİP GÖLGE ANALİZİ
// ═══════════════════════════════════════════════════════

const TİP_GOLGE = {
  'Generator': {
    golge: 'Hayal Kırıklığı',
    mekanizma: 'Onay bekleyerek yanlış şeylere "evet" demek',
    ornek: 'İstemediği bir işe başladı çünkü reddetmek zorbalık gibi hissettirdi. Aylarca hayal kırıklığıyla tükendi.',
    donusum: '"Evet" mi "hayır" mı — bedeninden sor, zihninden değil.',
    beden_sinyali: 'Gerçek evet: bedenin açılır, enerji gelir. Yanlış evet: düz, hatta içe kapanan bir his.',
    gunluk_pratik: 'Bugün bir "evet" vermeden önce dur ve bedeninin tepkisini gözlemle.',
  },
  'Manifesting Generator': {
    golge: 'Hayal Kırıklığı + Öfke',
    mekanizma: 'Hızlı başlayıp adım atlamak, ardından geri sarma zorunluluğu yaşamak',
    ornek: 'Projeyi heyecanla başlattı ama temel adımları atladığı için sürekli geri dönmek zorunda kaldı. Hem kendine hem çevresindekilere karşı öfkelendi.',
    donusum: 'Hızın doğal — ama "dur ve bildir" adımını atma.',
    beden_sinyali: 'Bedenin uyarı verdiğinde yavaşla; o uyarı gereksiz değil.',
    gunluk_pratik: 'Bugün hızlı karar vermeden önce bir adım geri çekil ve etkisini düşün.',
  },
  'Projector': {
    golge: 'Acılık',
    mekanizma: 'Davet edilmeden rehberlik sunmak ve görülmemek',
    ornek: 'Toplantıda herkesin gözden kaçırdığı kritik bir şeyi fark etti ve hemen söyledi. Dinlenmedi, hafife alındı. Acıyla doldu.',
    donusum: 'Davet bekle — en güçlü yerinde bile. Davet olmadan verilen rehberlik çoğu zaman reddedilir.',
    beden_sinyali: '"Bu kişi gerçekten dinlemek istiyor mu?" sorusunu sor.',
    gunluk_pratik: 'Bugün tavsiye vermeden önce "sormak ister misin?" diye sor.',
  },
  'Manifestor': {
    golge: 'Öfke',
    mekanizma: 'Başkasını bilgilendirmeden hareket etmek ve direnç görmek',
    ornek: 'Önemli bir kararı tek başına aldı, çevresine sonradan bildirdi. Herkes itiraz etti, o öfkelendi. "Neden izin almak zorundayım ki?" dedi.',
    donusum: '"Bildir" adımı izin almak değil, direnci azaltmak içindir. Özgürlüğünü korur.',
    beden_sinyali: 'Öfke genellikle haklı — ama bildirme pratiği onu yumuşatır.',
    gunluk_pratik: 'Bugün büyük bir adım atmadan önce etkilenecek kişilere haber ver.',
  },
  'Reflector': {
    golge: 'Hayal Kırıklığı',
    mekanizma: 'Çevrenin enerjisine kapılmak, kendini kaybetmek',
    ornek: 'Toplantıda grubun kaygısını aldı, eve gelince kendi kaygısı sanıp üzüldü. Kim olduğunu bulmak için zamana ihtiyacı var ama genellikle hızlı karar almaya zorlanıyor.',
    donusum: '28 günlük ay döngüsünü bekle önemli kararlar için. Yalnız zaman gerekli.',
    beden_sinyali: '"Bu his benden mi geliyor?" sorusunu düzenli sor.',
    gunluk_pratik: 'Bugün bir süre yalnız kal ve ne hissettğini gözlemle — toplulukla aynı mı?',
  },
};

// ═══════════════════════════════════════════════════════
// BURÇ GÖLGE ÖRÜNTÜLERİ
// ═══════════════════════════════════════════════════════

const BURC_GOLGE = {
  'Koç': {
    golge: 'Dürtüsellik, sabırsızlık, başkasını görmemek',
    donusum: 'Hareketten önce bir nefes. Hız ile dikkat bir arada olabilir.',
    savunma: 'Yer Değiştirme',
    sorusu: 'Şu an hızlı kararlarımda neyi atlamaya eğilimliyim?',
  },
  'Boğa': {
    golge: 'İnatçılık, değişime direnç, aşırı maddi odak',
    donusum: 'Güvenlik ihtiyacı meşru — ama esneklik de güvenlik biçimidir.',
    savunma: 'Baskılama',
    sorusu: 'Tutunduğum şey beni koruyor mu, hapsedeyor mu?',
  },
  'İkizler': {
    golge: 'Yüzeysellik, kararsızlık, sürekli fikir değişimi',
    donusum: 'Derinlik, hızı iptal etmez — ikisi bir arada olabilir.',
    savunma: 'Kaçınma',
    sorusu: 'Hangi konuyu gerçekten derinlemesine incelemekten kaçınıyorum?',
  },
  'Yengeç': {
    golge: 'Aşırı hassasiyet, kendini geri çekme, geçmişe yapışma',
    donusum: 'Duygusal bellek hem güç hem ağırlık. Seçici bırakma pratiği.',
    savunma: 'Regresyon',
    sorusu: 'Geçmişteki hangi yara bugünkü tepkilerimi yönetiyor?',
  },
  'Aslan': {
    golge: 'Kibir, onay ihtiyacı, eleştiriye aşırı duyarlılık',
    donusum: 'Gerçek güven, dışarıdan geleni beklemez.',
    savunma: 'Kompansasyon',
    sorusu: 'Onay aradığımda aslında ne eksik hissediyorum?',
  },
  'Başak': {
    golge: 'Aşırı eleştiri, mükemmeliyetçilik, endişe döngüsü',
    donusum: 'Kusur aramak bir araçtır — amaç değil.',
    savunma: 'Entelektüelleştirme',
    sorusu: 'Eleştirdiğimde aslında neyi kontrol altına almaya çalışıyorum?',
  },
  'Terazi': {
    golge: 'Karar verememe, başkasını memnun etme, çatışmadan kaçınma',
    donusum: 'Denge, her şeye "evet" demekle sağlanmaz.',
    savunma: 'Pasif Saldırganlık',
    sorusu: 'Kaçındığım çatışmada gerçekte ne söylemek istiyorum?',
  },
  'Akrep': {
    golge: 'Kontrol, kıskançlık, intikam, aşırı sır saklama',
    donusum: 'Dönüşüm kapasiten güçlü — ama önce güveni öğren.',
    savunma: 'İzolasyon',
    sorusu: 'Sırlarım beni kim olduğuma mı katkı sağlıyor, beni hapsedeyor mu?',
  },
  'Yay': {
    golge: 'Sorumluluklardan kaçma, aşırı iyimserlik, taahhütsüzlük',
    donusum: 'Özgürlük, sorumluluktan kaçmak değil — sorumluluğu bilinçle seçmektir.',
    savunma: 'Kaçınma',
    sorusu: 'Hangi taahhütten kaçıyorum ve bu beni nerede bırakıyor?',
  },
  'Oğlak': {
    golge: 'Duygusal soğukluk, başarı obsesyonu, esneklik eksikliği',
    donusum: 'Başarı bir araçtır — kim olduğunun kanıtı değil.',
    savunma: 'Baskılama',
    sorusu: 'Başarı için neyi feda ediyorum ve bu fedakârlık beni besliyor mu?',
  },
  'Kova': {
    golge: 'Duygusal mesafe, gruba takıntı, bireysel ilişkileri ihmal',
    donusum: 'İnsanlığı sevmek güzel — ama yanındaki insanı da gör.',
    savunma: 'Entelektüelleştirme',
    sorusu: 'Kolektif odaklanırken bireysel ilişkilerimi ne kadar ihmal ediyorum?',
  },
  'Balık': {
    golge: 'Gerçeklikten kopukluk, kurban rolü, sınır koyamamak',
    donusum: 'Empatin güçlü — ama sen de bu denklemin içindesin.',
    savunma: 'Yansıtmalı Özdeşleşim',
    sorusu: 'Şu an başkasının hissini mi taşıyorum, yoksa kendininkini mi?',
  },
};

// ═══════════════════════════════════════════════════════
// GEZEGEN GÖLGE KATMANLARI
// ═══════════════════════════════════════════════════════

const GEZEGEN_GOLGE = {
  sun: {
    gezegen: 'Güneş',
    alan: 'Benlik ve kimlik',
    golge: 'Kim olduğunu performatif yaşamak veya bastırmak',
    soru: 'Kim olduğumu gerçekten yaşıyor muyum, yoksa "olması gereken" biri mi olmaya çalışıyorum?',
  },
  moon: {
    gezegen: 'Ay',
    alan: 'Duygular ve ihtiyaçlar',
    golge: 'Duygusal ihtiyaçları inkâr etmek veya aşırı tepkisellik',
    soru: 'Şu an gerçekten neye ihtiyacım var ve bunu kime söyleyebiliyorum?',
  },
  mercury: {
    gezegen: 'Merkür',
    alan: 'İletişim ve zihin',
    golge: 'Söylenmesi gerekeni söylememek veya aşırı konuşmak',
    soru: 'İletişimimde neyi gizliyorum, neyi fazla mı açıklıyorum?',
  },
  venus: {
    gezegen: 'Venüs',
    alan: 'Değerler ve ilişkiler',
    golge: 'Değerlerinden ödün vermek ya da ilişkilerde kendini kaybetmek',
    soru: 'İlişkilerinde kim olmak istiyorsun ve kim oluyorsun?',
  },
  mars: {
    gezegen: 'Mars',
    alan: 'Öfke ve eylem',
    golge: 'Öfkeyi bastırmak veya patlamak; eylemsizlik veya dürtüsellik',
    soru: 'Öfkemi nereye yönlendiriyorum? Bu yön beni besliyor mu?',
  },
  jupiter: {
    gezegen: 'Jüpiter',
    alan: 'Büyüme ve inanç',
    golge: 'Aşırı iyimserlik veya kronik pesimizm; dogmatik inanç',
    soru: 'Hangi inancım büyümemi engelliyor?',
  },
  saturn: {
    gezegen: 'Satürn',
    alan: 'Sınırlar ve sorumluluk',
    golge: 'Katı kurallar veya sorumluluktan kaçış; otorite korkusu',
    soru: 'Satürn\'ün dersini direnerek mi öğreniyorum, yoksa kabullenerek mi?',
  },
  uranus: {
    gezegen: 'Uranüs',
    alan: 'Özgürlük ve yenilik',
    golge: 'Değişim için değişim veya değişime aşırı direnç',
    soru: 'Hangi değişimi gerçekten istiyorum, hangisinden korkuyorum?',
  },
  neptune: {
    gezegen: 'Neptün',
    alan: 'İdeal ve illüzyon',
    golge: 'Gerçeklikten kaçış, idealizm tuzağı, bağımlılık örüntüleri',
    soru: 'Hangi illüzyon beni rahatlatıyor ama büyümemi engelliyor?',
  },
  pluto: {
    gezegen: 'Plüton',
    alan: 'Dönüşüm ve güç',
    golge: 'Güç obsesyonu veya güçsüzlük hissi; kontrolü bırakamamak',
    soru: 'Hayatımda gerçekten dönüşmesi gereken ne var ve neden direniyor?',
  },
};

// ═══════════════════════════════════════════════════════
// SHADOW ENGINE — ANA MOTOR
// ═══════════════════════════════════════════════════════

const SHADOW_ENGINE = {

  /**
   * Birleşik gölge profili oluştur
   * HD + Numeroloji + Astroloji verilerinden
   *
   * @param {object} hdResult    — hd.js çıktısı
   * @param {object} numProfile  — numerology.js getFullProfile() çıktısı
   * @param {object} astroResult — astro.js getBasicInfo() çıktısı
   * @returns {object} tam gölge profili
   */
  buildProfile(hdResult, numProfile, astroResult) {
    const profile = {
      // Birincil gölge kaynakları
      dominant: [],
      // Savunma mekanizmaları
      savunmalar: [],
      // Gölge arketipleri
      arketipler: [],
      // Günlük motor için
      gunluk_tema: null,
      // Entegrasyon planı
      entegrasyon: [],
    };

    // ── 1. HD Tipi gölgesi ─────────────────────────
    if (hdResult && hdResult.type) {
      const tipGolge = TİP_GOLGE[hdResult.type];
      if (tipGolge) {
        profile.dominant.push({
          kaynak: 'Human Design',
          tip: hdResult.type,
          golge: tipGolge.golge,
          mekanizma: tipGolge.mekanizma,
          ornek: tipGolge.ornek,
          donusum: tipGolge.donusum,
          beden_sinyali: tipGolge.beden_sinyali,
          gunluk_pratik: tipGolge.gunluk_pratik,
          agirlik: 0.35,
        });
      }
    }

    // ── 2. Dominant HD kapılarının gölgeleri ───────
    if (hdResult && hdResult.gates) {
      const dominantGates = hdResult.gates.conscious?.slice(0, 3) || [];
      dominantGates.forEach(g => {
        if (g && g.gate) {
          profile.savunmalar.push({
            kaynak: `HD Kapı ${g.gate}`,
            savunma: this._mapGateSavunma(g.gate),
            agirlik: 0.15,
          });
        }
      });
    }

    // ── 3. Numeroloji gölgesi ──────────────────────
    if (numProfile && numProfile.lp) {
      const lpVal = numProfile.lp.value;
      const numTraits = (typeof NUM_TRAITS !== 'undefined' ? NUM_TRAITS : {})[lpVal] || {};
      profile.dominant.push({
        kaynak: 'Numeroloji',
        sayi: lpVal,
        golge: numTraits.shadow ? numTraits.shadow.slice(0, 3).join(', ') : '',
        donusum: 'Gölge özelliklerini fark et, bastırma — yeniden yönlendir.',
        agirlik: 0.25,
      });

      // Ruh dürtüsü gölgesi
      if (numProfile.soul && numProfile.soul.value !== lpVal) {
        const soulTraits = (typeof NUM_TRAITS !== 'undefined' ? NUM_TRAITS : {})[numProfile.soul.value] || {};
        if (soulTraits.shadow) {
          profile.savunmalar.push({
            kaynak: 'Ruh Dürtüsü',
            savunma: soulTraits.shadow[0] || '',
            agirlik: 0.10,
          });
        }
      }

      // Karmik borç varsa öncelikli
      if (numProfile.karmic && numProfile.karmic.length > 0) {
        numProfile.karmic.forEach(k => {
          profile.dominant.push({
            kaynak: `Karmik Borç ${k.number}`,
            golge: `${k.area} alanında dönüşüm gerektiren örüntü`,
            donusum: (typeof KARMIC_DEBT_INTERP !== 'undefined' ? KARMIC_DEBT_INTERP : {})[k.number] || '',
            agirlik: 0.20,
            oncelikli: true,
          });
        });
      }
    }

    // ── 4. Astroloji gölgesi ───────────────────────
    if (astroResult) {
      const sunSign = astroResult.sunSign || astroResult.sun?.sign;
      if (sunSign && BURC_GOLGE[sunSign]) {
        const burcGolge = BURC_GOLGE[sunSign];
        profile.dominant.push({
          kaynak: `Güneş Burcu (${sunSign})`,
          golge: burcGolge.golge,
          donusum: burcGolge.donusum,
          savunma: burcGolge.savunma,
          sorusu: burcGolge.sorusu,
          agirlik: 0.25,
        });
      }

      const moonSign = astroResult.moonSign || astroResult.moon?.sign;
      if (moonSign && BURC_GOLGE[moonSign]) {
        const ayGolge = BURC_GOLGE[moonSign];
        profile.savunmalar.push({
          kaynak: `Ay Burcu (${moonSign})`,
          savunma: ayGolge.golge,
          sorusu: ayGolge.sorusu,
          agirlik: 0.15,
        });
      }
    }

    // ── 5. Birincil savunma mekanizmasını belirle ──
    const primarySavunma = this._detectPrimarySavunma(profile.dominant);
    if (primarySavunma) {
      profile.birincil_savunma = {
        ...primarySavunma,
        detay: SAVUNMA_MEKANIZMALARI[primarySavunma.key] || {},
      };
    }

    // ── 6. Arketip eşleşmesi ───────────────────────
    profile.arketipler = this._matchArketipler(hdResult, numProfile);

    // ── 7. Günlük tema ─────────────────────────────
    profile.gunluk_tema = this._getDailyTema();

    // ── 8. Entegrasyon planı ───────────────────────
    profile.entegrasyon = this._buildIntegrationPlan(profile);

    // ── 9. Profil özeti ────────────────────────────
    profile.ozet = this._buildSummary(profile);

    return profile;
  },

  /**
   * HD kapı numarasından baskın savunma mekanizması tahmin et
   */
  _mapGateSavunma(gateNo) {
    const map = {
      1: 'projeksiyon', 2: 'kaçınma', 3: 'kontrol', 4: 'rasyonalizasyon',
      5: 'baskılama', 6: 'pasif_saldırganlık', 7: 'omnipotans', 8: 'izolasyon',
      9: 'entelektüelleştirme', 10: 'kompansasyon', 11: 'idealizasyon_devalüasyon',
      12: 'baskılama', 13: 'projeksiyon', 14: 'kompansasyon', 15: 'rasyonalizasyon',
      16: 'pasif_saldırganlık', 17: 'rasyonalizasyon', 18: 'projeksiyon',
      19: 'somatizasyon', 20: 'entelektüelleştirme', 21: 'kontrol',
      22: 'baskılama', 23: 'inkâr', 24: 'rasyonalizasyon', 25: 'inkâr',
      26: 'kompansasyon', 27: 'somatizasyon', 28: 'kaçınma', 29: 'baskılama',
      30: 'idealizasyon_devalüasyon', 31: 'omnipotans', 32: 'kontrol',
      33: 'izolasyon', 34: 'yer_değiştirme', 35: 'kompansasyon',
      36: 'baskılama', 37: 'pasif_saldırganlık', 38: 'yer_değiştirme',
      39: 'pasif_saldırganlık', 40: 'kaçınma', 41: 'projeksiyon',
      42: 'inkâr', 43: 'entelektüelleştirme', 44: 'izolasyon',
      45: 'omnipotans', 46: 'kompansasyon', 47: 'rasyonalizasyon',
      48: 'inkâr', 49: 'idealizasyon_devalüasyon', 50: 'kontrol',
      51: 'yer_değiştirme', 52: 'baskılama', 53: 'kaçınma',
      54: 'kompansasyon', 55: 'idealizasyon_devalüasyon', 56: 'izolasyon',
      57: 'entelektüelleştirme', 58: 'pasif_saldırganlık', 59: 'inkâr',
      60: 'baskılama', 61: 'rasyonalizasyon', 62: 'kaçınma',
      63: 'entelektüelleştirme', 64: 'inkâr',
    };
    const key = map[gateNo] || 'projeksiyon';
    return { key, ad: (SAVUNMA_MEKANIZMALARI[key] || {}).ad || key };
  },

  /**
   * Dominant örüntülerden birincil savunmayı belirle
   */
  _detectPrimarySavunma(dominant) {
    const savunmaFreq = {};
    dominant.forEach(d => {
      const key = d.savunma || (d.mekanizma ? 'kontrol' : null);
      if (key) savunmaFreq[key] = (savunmaFreq[key] || 0) + (d.agirlik || 0.1);
    });
    if (Object.keys(savunmaFreq).length === 0) return null;
    const topKey = Object.entries(savunmaFreq).sort((a,b) => b[1] - a[1])[0][0];
    return { key: topKey, skor: savunmaFreq[topKey] };
  },

  /**
   * HD tipi ve numeroloji LP'den arketip eşleştir
   */
  _matchArketipler(hdResult, numProfile) {
    const result = [];
    const lpVal = numProfile?.lp?.value;
    const tip = hdResult?.type;

    // Sayıya göre arketip
    const numToArketip = {
      1: 'kahraman_golgesi', 2: 'sevgili_golgesi', 3: 'kurnaz_golgesi',
      4: 'kral_golgesi',     5: 'kurnaz_golgesi',  6: 'sevgili_golgesi',
      7: 'bilge_golgesi',    8: 'kral_golgesi',     9: 'hayalet_golgesi',
      11: 'bilge_golgesi',  22: 'kral_golgesi',    33: 'sevgili_golgesi',
    };

    // HD tipine göre arketip
    const tipToArketip = {
      'Projector':             'bilge_golgesi',
      'Manifestor':            'kral_golgesi',
      'Generator':             'savasci_golgesi',
      'Manifesting Generator': 'kahraman_golgesi',
      'Reflector':             'hayalet_golgesi',
    };

    const arkKey1 = numToArketip[lpVal];
    const arkKey2 = tipToArketip[tip];

    if (arkKey1 && GOLGE_ARKETİPLERİ[arkKey1]) {
      result.push({ ...GOLGE_ARKETİPLERİ[arkKey1], kaynak: 'Numeroloji', key: arkKey1 });
    }
    if (arkKey2 && arkKey2 !== arkKey1 && GOLGE_ARKETİPLERİ[arkKey2]) {
      result.push({ ...GOLGE_ARKETİPLERİ[arkKey2], kaynak: 'HD Tipi', key: arkKey2 });
    }

    return result;
  },

  /**
   * Günün gölge teması — haftanın günü + ay dönemi bazlı
   */
  _getDailyTema() {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0=Pazar
    const dayOfMonth = now.getDate();

    const haftaTema = [
      { gun: 'Pazar',        tema: 'İç çocuk',        soru: 'Bugün kendine ne kadar izin veriyorsun?', eylem: 'Oyunsu bir şey yap — hiçbir amacı olmadan.' },
      { gun: 'Pazartesi',    tema: 'Kontrol gölgesi', soru: 'Bugün neyi kontrol etmeye çalışıyorsun?', eylem: 'Küçük bir şeyi bırak — izle ne olacak.' },
      { gun: 'Salı',         tema: 'Öfke',             soru: 'Bastırılmış öfken bugün nerede kendini gösteriyor?', eylem: 'Bir kağıda yazan şikâyetlerini yaz — kimse okumayacak.' },
      { gun: 'Çarşamba',     tema: 'Projeksiyon',      soru: 'Bugün başkasında en çok ne seni rahatsız etti?', eylem: 'O özelliğin sende nasıl göründüğünü düşün.' },
      { gun: 'Perşembe',     tema: 'Kimlik maskesi',   soru: 'Bugün kim olmak zorunda hissettin, gerçekte kim olmak istedin?', eylem: 'Gerçek cevabı bir cümleyle yaz.' },
      { gun: 'Cuma',         tema: 'İlişki gölgesi',   soru: 'Bugün birinden ne bekledin ve söylemedin?', eylem: 'O beklentiyi doğrudan ifade etmeyi dene.' },
      { gun: 'Cumartesi',    tema: 'Beden sinyali',    soru: 'Bugün bedenin sana ne söyledi?', eylem: 'Görmezden geldiğin bir beden sinyalini fark et.' },
    ];

    const tema = haftaTema[dayOfWeek];

    // Ay döngüsüne göre derinlik (1-7: başlangıç, 8-14: birikim, 15-21: doruk, 22-31: bırakma)
    let ayEvresi, ayEvreMesaj;
    if (dayOfMonth <= 7)       { ayEvresi = 'Başlangıç';  ayEvreMesaj = 'Yeni bir gölge döngüsü başlıyor. Gözlemle, henüz eylem değil.' }
    else if (dayOfMonth <= 14) { ayEvresi = 'Birikim';    ayEvreMesaj = 'Örüntüler netleşiyor. Fark ettiklerini yaz.' }
    else if (dayOfMonth <= 21) { ayEvresi = 'Doruk';      ayEvreMesaj = 'En yoğun dönem. Tepkilerini gözlemle.' }
    else                       { ayEvresi = 'Bırakma';    ayEvreMesaj = 'Bırakma zamanı. Neyi taşımaya devam etmek istemiyorsun?' }

    return { ...tema, ay_evresi: ayEvresi, ay_evre_mesaj: ayEvreMesaj };
  },

  /**
   * 4 haftalık entegrasyon planı
   */
  _buildIntegrationPlan(profile) {
    const birincilGolge = profile.dominant[0] || {};
    const savunma = profile.birincil_savunma?.detay || {};

    return [
      {
        hafta: 1,
        baslik: 'Gözlem',
        aciklama: 'Bu hafta hiçbir şeyi değiştirmek zorunda değilsin. Sadece gözlemle.',
        pratik: `${birincilGolge.golge ? `"${birincilGolge.golge.split(',')[0]}" örüntüsünü` : 'Bir savunma mekanizmasını'} gün içinde fark ettiğinde not al.`,
        soru: 'Ne zaman, hangi durumda, kime karşı?',
      },
      {
        hafta: 2,
        baslik: 'İsimlendirme',
        aciklama: 'Gördüğüne isim ver. İsimsiz örüntü güçlüdür; isimlendirilmiş örüntü zayıflar.',
        pratik: savunma.ad ? `"${savunma.ad}" mekanizmasını aktive ettiğinde sesli olarak "bu bir ${savunma.ad}" de.` : 'Savunma anında dur ve "bu bir savunma" de.',
        soru: 'Hangi tetikleyici bu mekanizmayı harekete geçiriyor?',
      },
      {
        hafta: 3,
        baslik: 'Duraklama',
        aciklama: 'Tetikleyici anında bir nefes al. Tepki vermeden önce dur.',
        pratik: savunma.donusum || 'Tepkiden önce 3 derin nefes — bu pencereyi yavaş yavaş genişletecek.',
        soru: 'Duraksadığımda ne fark ediyorum?',
      },
      {
        hafta: 4,
        baslik: 'Yeniden Yönlendirme',
        aciklama: 'Gölge enerjiyi bastırma — yeniden yönlendir.',
        pratik: profile.arketipler[0]?.donusum || 'Bir savunma anında farklı bir yanıt seç — küçük ama bilinçli.',
        soru: 'Hangi yeni yanıt bana daha uygun hissettiriyor?',
      },
    ];
  },

  /**
   * Kısa özet metni
   */
  _buildSummary(profile) {
    const kaynaklar = profile.dominant.map(d => d.kaynak).join(', ');
    const golgeler = profile.dominant.slice(0, 2).map(d => d.golge).filter(Boolean).join(' · ');
    const savunma = profile.birincil_savunma?.detay?.ad || '';
    return {
      baslik: 'Gölge Profili',
      alt_baslik: `${kaynaklar} kaynaklı analiz`,
      dominant_gölge: golgeler,
      birincil_savunma: savunma,
      donusum_yonu: profile.dominant[0]?.donusum || '',
      arketip: profile.arketipler[0]?.ad || '',
    };
  },

  /**
   * Günlük ayna sorusu
   * @param {object} profile — buildProfile çıktısı
   * @returns {object} soru + pratik + beden_pratik
   */
  getDailyMirror(profile) {
    const tema = profile?.gunluk_tema || this._getDailyTema();
    const dominant = profile?.dominant?.[0] || {};
    const savunma = SAVUNMA_MEKANIZMALARI[profile?.birincil_savunma?.key] || {};

    return {
      gozlem_sorusu: tema.soru,
      eylem_oneri: tema.eylem,
      golge_sorusu: savunma.isaretler?.[0] || dominant.golge || '',
      beden_pratik: dominant.beden_sinyali || 'Şu an bedeninde bir yerde gerilim var mı? Nerede?',
      donusum_adim: savunma.donusum || dominant.donusum || '',
      gun_temasi: tema.tema,
    };
  },

  /**
   * Haftalık gölge teması
   * @param {object} profile
   * @returns {object[]} 7 günlük tema listesi
   */
  getWeeklyTheme(profile) {
    const week = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dayTheme = this._getDayTheme(d.getDay());
      week.push({
        gun: i === 0 ? 'Bugün' : ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'][d.getDay()],
        tarih: `${d.getDate()}/${d.getMonth() + 1}`,
        tema: dayTheme.tema,
        soru: dayTheme.soru,
        eylem: dayTheme.eylem,
      });
    }
    return week;
  },

  _getDayTheme(dayOfWeek) {
    const temalar = [
      { tema: 'İç çocuk',      soru: 'Bugün kendine ne kadar izin veriyorsun?',                            eylem: 'Oyunsu bir şey yap.' },
      { tema: 'Kontrol',       soru: 'Bugün neyi kontrol etmeye çalışıyorsun?',                            eylem: 'Küçük bir şeyi bırak.' },
      { tema: 'Öfke',          soru: 'Bastırılmış öfken bugün nerede göründü?',                            eylem: 'Şikâyetlerini bir kağıda yaz.' },
      { tema: 'Projeksiyon',   soru: 'Başkasında en çok ne seni rahatsız etti?',                           eylem: 'O özelliği kendinle ilişkilendir.' },
      { tema: 'Kimlik',        soru: 'Kim olmak zorunda hissettin, gerçekte kim olmak istedin?',           eylem: 'Gerçek cevabı yaz.' },
      { tema: 'İlişki',        soru: 'Birinden ne bekledin ve söylemedin?',                                eylem: 'O beklentiyi doğrudan ifade et.' },
      { tema: 'Beden',         soru: 'Bugün bedenin sana ne söyledi?',                                     eylem: 'Bir beden sinyalini fark et.' },
    ];
    return temalar[dayOfWeek] || temalar[0];
  },

  /**
   * Gölge aktivasyon yoğunluğu skoru (0–100)
   * @param {object} profile
   * @returns {number}
   */
  getShadowScore(profile) {
    if (!profile?.dominant) return 0;
    let score = 0;
    profile.dominant.forEach(d => {
      score += (d.agirlik || 0.1) * 100;
    });
    if (profile.dominant.some(d => d.oncelikli)) score += 15;
    if (profile.birincil_savunma) score += 10;
    return Math.min(Math.round(score), 100);
  },

  /**
   * API prompt için ham veri paketi
   * @param {object} profile
   * @returns {string}
   */
  getAIPromptData(profile) {
    const savunma = profile?.birincil_savunma?.detay?.ad || '—';
    const golgeler = (profile?.dominant || []).slice(0, 3)
      .map(d => `${d.kaynak}: ${d.golge || ''}`)
      .join('; ');
    const arketip = (profile?.arketipler || []).map(a => a.ad).join(', ') || '—';

    return `[GÖLGE PROFİLİ]
Dominant Gölge Kaynakları: ${golgeler}
Birincil Savunma Mekanizması: ${savunma}
Aktif Arketipler: ${arketip}
Günün Gölge Teması: ${profile?.gunluk_tema?.tema || '—'}
Aktivasyon Skoru: ${this.getShadowScore(profile)}/100`;
  },
};

// ═══════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SHADOW_ENGINE,
    SAVUNMA_MEKANIZMALARI,
    GOLGE_ARKETİPLERİ,
    TİP_GOLGE,
    BURC_GOLGE,
    GEZEGEN_GOLGE,
  };
} else if (typeof window !== 'undefined') {
  window.SHADOW_ENGINE       = SHADOW_ENGINE;
  window.SAVUNMA_MEKANIZMALARI = SAVUNMA_MEKANIZMALARI;
  window.GOLGE_ARKETİPLERİ  = GOLGE_ARKETİPLERİ;
  window.TİP_GOLGE           = TİP_GOLGE;
  window.BURC_GOLGE          = BURC_GOLGE;
  window.GEZEGEN_GOLGE       = GEZEGEN_GOLGE;
}
