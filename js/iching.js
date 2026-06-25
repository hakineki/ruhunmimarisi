/**
 * ═══════════════════════════════════════════════════════════════
 * ICHING.JS — 64 Hekzagram Tam Veri Katmanı
 * ═══════════════════════════════════════════════════════════════
 * Her hekzagram için:
 *   no, ad, ceviri, sembol (üst/alt trigram)
 *   anahtar_kelime, tema
 *   psikolojik_oz — Jung / gelişim psikolojisi çerçevesiyle
 *   durum_analizi — "Bugün hangi örüntü aktif?"
 *   golge — bastırılmış / savunmacı hali
 *   olgun — entegre / olgunlaşmış hali
 *   eylem — somut davranışsal öneri (CBT/pozitif psikoloji)
 *   gozlem — farkındalık sorusu
 *   hatlar[6] — her hat için kısa mesaj
 *   hd_kapisi — karşılık gelen HD kapısı
 * ═══════════════════════════════════════════════════════════════
 */

'use strict';

// Trigram sembolleri
const TRIGRAMS = {
  gok:  { ad: 'Gökyüzü',  sembol: '☰', element: 'Metal',  yon: 'Kuzey-Batı' },
  yer:  { ad: 'Yer',      sembol: '☷', element: 'Toprak', yon: 'Güney-Batı' },
  gok_gurultulu: { ad: 'Gök Gürültüsü', sembol: '☳', element: 'Ahşap', yon: 'Doğu' },
  su:   { ad: 'Su',       sembol: '☵', element: 'Su',     yon: 'Kuzey' },
  dag:  { ad: 'Dağ',      sembol: '☶', element: 'Toprak', yon: 'Kuzey-Doğu' },
  ruzgar: { ad: 'Rüzgar', sembol: '☴', element: 'Ahşap',  yon: 'Güney-Doğu' },
  ates: { ad: 'Ateş',     sembol: '☲', element: 'Ateş',   yon: 'Güney' },
  gol:  { ad: 'Göl',      sembol: '☱', element: 'Metal',  yon: 'Batı' },
};

const ICHING_64 = {

  1: {
    no: 1, ad: 'Yaratıcı', ceviri: 'Ch\'ien — Güç',
    sembol: '☰☰', ust: 'gok', alt: 'gok',
    anahtar_kelime: 'Özgün eylem', tema: 'Saf yaratıcı güç, harekete geçme enerjisi',
    hd_kapisi: 1,
    psikolojik_oz: 'Bu örüntü, kimliğin en derinden gelen yaratıcı dürtüsünü temsil eder. Jung\'un animus arketipi ile örtüşür — bastırılmış yaratıcı güç, dışarı çıkacak bir kanal bulamazsa içe döner, eleştiri ve kıskançlık olarak yeniden yüzeye çıkar.',
    durum_analizi: 'Şu an harekete geçme enerjisi yüksek. İçinden gelen bir dürtü var — onu değerlendirmeyi bekletme, şimdi küçük bir adım at.',
    golge: 'Yaratıcı dürtü bastırılmış, başkalarının üretkenliğini değersizleştirme eğilimi var. "Kimse anlayamaz" savunması devrede.',
    olgun: 'Yaratmak bir performans değil, varoluş biçimi. Sonucu değil süreci yaşar.',
    eylem: 'Bugün kimse görmese de yapacağın küçük özgün bir şey seç — bir cümle yaz, bir eskiz çiz, bir fikri sesli söyle.',
    gozlem: 'Son zamanlarda başka birinin yaratıcılığına karşı olumsuz bir his fark ettin mi? Bu his sende ne anlatıyor olabilir?',
    hatlar: [
      { hat: 1, mesaj: 'Hazırlık zamanı. Harekete geçme, iç kaynakları pekiştir.' },
      { hat: 2, mesaj: 'Potansiyel görünür hale geliyor. Dikkatini çekenlere açık ol.' },
      { hat: 3, mesaj: 'Erken başarı gurur yaratabilir. Alçakgönüllülük koru.' },
      { hat: 4, mesaj: 'Bir seçim noktasındasın — geri mi, ileri mi? İçini dinle.' },
      { hat: 5, mesaj: 'Liderlik çağrısı. Kaçınmak yerine sorumluluğu üstlen.' },
      { hat: 6, mesaj: 'Zirvedeyken bile bağlanma. Her zirveden sonra iniş gelir.' },
    ],
  },

  2: {
    no: 2, ad: 'Alıcı', ceviri: 'K\'un — Yer',
    sembol: '☷☷', ust: 'yer', alt: 'yer',
    anahtar_kelime: 'Kabul & Yön', tema: 'Teslim olma değil, bilinçli alıcılık',
    hd_kapisi: 2,
    psikolojik_oz: 'Alıcılık pasiflik değildir — içsel yönü koruyarak dışarıdan geleni karşılama kapasitesidir. Bu örüntü aktif olduğunda kişi kendi ihtiyaçlarını erteleyerek başkalarının beklentilerine göre şekillenir.',
    durum_analizi: 'Şu an dinleme ve gözlemleme zamanı. Hemen tepki verme — önce tam olarak al, sonra yanıt ver.',
    golge: '"Ne istiyorum?" sorusuna cevap vermekte zorlanıyorsun. Başkalarının haritasıyla yürümek güvende hissettiriyor ama yoruyor.',
    olgun: 'İçsel yönüne güveniyorsun. Başkasının onayına ihtiyaç duymadan "hayır" veya "evet" diyebiliyorsun.',
    eylem: 'Bugün birinin söylediklerini tam olarak, yanıt üretmeden dinle. Ne fark ediyorsun?',
    gozlem: 'Son bir haftada kaç kez gerçekten istediğini söyledin, kaç kez başkasının beklentisine göre davrandın?',
    hatlar: [
      { hat: 1, mesaj: 'Başlamadan önce zemin hazır mı? Aceleyle değil, doğru zamanla ilerle.' },
      { hat: 2, mesaj: 'İçsel yön güçlü. Başkasının onayını beklemeden hareket edebilirsin.' },
      { hat: 3, mesaj: 'Göze çarpmaktan kaçınma isteği var. Görünmek güvenlidir.' },
      { hat: 4, mesaj: 'Sessizliğini koru ama kapıları da kapatma.' },
      { hat: 5, mesaj: 'Liderlik, sessiz yürüme biçiminle kendiliğinden geliyor.' },
      { hat: 6, mesaj: 'Her şeyin sona erdiği görünse de yeni bir döngü başlıyor.' },
    ],
  },

  3: {
    no: 3, ad: 'Başlangıcın Güçlüğü', ceviri: 'Chun — Doğum Sancısı',
    sembol: '☵☳', ust: 'su', alt: 'gok_gurultulu',
    anahtar_kelime: 'Kaos içinde düzen', tema: 'Her başlangıç kaotiktir — bu normaldir',
    hd_kapisi: 3,
    psikolojik_oz: 'Belirsizlik toleransı. Başlangıç aşamasında kaos ve düzensizlik normal bir süreçtir. Erken teslim olmak, aslında belirsizliğe dayanma kapasitesinin sınandığı andır.',
    durum_analizi: 'Henüz şekillenmekte olan bir şeyin içindesin. Netlik için acele etme — kaos, formun olgunlaşma sürecinin parçasıdır.',
    golge: 'Düzensizlik panik yaratıyor, erken vazgeçme ya da tam tersine aşırı kontrol isteği var.',
    olgun: 'Kaos içinde sabırla durmayı öğrenmişsin. "Bu geçecek, form bulacak" diye biliyorsun.',
    eylem: 'Şu an karmaşık hissettiren bir durumu yaz. Ona bir isim ver. İsimlendirmek, kontrolün başlangıcıdır.',
    gozlem: 'Şu an hangi "henüz bitmemiş" duruma sabırsızlanıyorsun? Bu sabırsızlık sana ne söylüyor?',
    hatlar: [
      { hat: 1, mesaj: 'Başlangıç zor. Yardım istemek güç kaybetmek değildir.' },
      { hat: 2, mesaj: 'Yanlış destekten vazgeç. Doğru kaynağı bekle.' },
      { hat: 3, mesaj: 'Yön bilmeden ilerleme — dur, gözlemle, sonra hareket et.' },
      { hat: 4, mesaj: 'Yardım kabul etme zamanı. Yalnız başarmak zorunda değilsin.' },
      { hat: 5, mesaj: 'Küçük adımlar büyük değişimler getirir. Mütevazı ilerle.' },
      { hat: 6, mesaj: 'Bu aşamada geri çekilmek de bir seçimdir. Pes değil, yeniden değerlendirme.' },
    ],
  },

  4: {
    no: 4, ad: 'Gençlik\'in Ahmaklığı', ceviri: 'Meng — Deneyimsizlik',
    sembol: '☶☵', ust: 'dag', alt: 'su',
    anahtar_kelime: 'Öğrenme açıklığı', tema: 'Bilmemek, başlangıçtır',
    hd_kapisi: 4,
    psikolojik_oz: 'Bilişsel alçakgönüllülük. "Zaten biliyorum" savunması, gerçek öğrenmeyi engeller. Bu örüntü aktif olduğunda kişi ya "bilmiyorum" demekten utanır ya da tam tersine herşeyi sorgulamaya düşer.',
    durum_analizi: 'Henüz tam anlamadığın bir alan var. Soru sormak zayıflık değil, olgunluk işaretidir.',
    golge: '"Bilmemek" utanç verici hissettiriyor. Ya biliyormuş gibi yapıyor ya da çok fazla soru sorarak onayı arıyor.',
    olgun: 'Bilmediğini rahatça söyler. Merak, bir kaygıdan değil gerçek bir ilgiden gelir.',
    eylem: 'Bugün birine "bunu tam anlamadım, açıklar mısın?" de. Nasıl hissettirdiğini fark et.',
    gozlem: 'Son zamanlarda anlamamış olmana rağmen anlamış gibi mi davrandın? Bu seni nasıl yoruyor?',
    hatlar: [
      { hat: 1, mesaj: 'Soru sor — ama cevabı sindirmeye hazır olarak.' },
      { hat: 2, mesaj: 'Sabır. Rehber doğru kişi olmalı, ilk bulduğun değil.' },
      { hat: 3, mesaj: 'Yanlış modeli taklit etme. Gerçek öğretmeni seç.' },
      { hat: 4, mesaj: 'Hayal dünyasında kaybolmak yerine gerçekliğe dön.' },
      { hat: 5, mesaj: 'Saf bir başlangıç — bu güzeldir, koru.' },
      { hat: 6, mesaj: 'Sınırlar gerekli. Öğrenme disiplin olmadan kaosa döner.' },
    ],
  },

  5: {
    no: 5, ad: 'Bekleme', ceviri: 'Hsü — Sabır',
    sembol: '☵☰', ust: 'su', alt: 'gok',
    anahtar_kelime: 'Doğru zamanlama', tema: 'Sabır güçsüzlük değil, stratejidir',
    hd_kapisi: 15,
    psikolojik_oz: 'Gecikme toleransı ve zaman yönetiminin psikolojik boyutu. Bekleme, pasiflik değil — aktif bir hazırlık halidir. Erken harekete geçme dürtüsü, belirsizlik anksiyetesinin davranışsal tezahürüdür.',
    durum_analizi: 'Zamanın henüz gelmediği bir şey var. Sabır, zayıflık değil; olgunluk işareti.',
    golge: 'Beklemeye tahammül yok. Hep erken harekete geçiyor veya tam tersine aylarca erteliyor.',
    olgun: 'Doğru zamanı sezer. Ne çok erken ne çok geç — içsel ritme güvenir.',
    eylem: 'Acele ettiğin bir kararı bugün 24 saat ertele. Ertesi gün ne fark ettiğini yaz.',
    gozlem: 'Şu an sabırsızlıkla beklediğin ne var? Bu bekleme seni ne öğretiyor?',
    hatlar: [
      { hat: 1, mesaj: 'Tehlike uzakta. Rutin hayatını sürdür, hazır kal.' },
      { hat: 2, mesaj: 'Küçük bir gerilim var. Büyütme, geçecek.' },
      { hat: 3, mesaj: 'Çamura batmış gibi hissediyorsun. Daha dikkatli adımlar at.' },
      { hat: 4, mesaj: 'Kan görüyorsun — mecazi. Çıkış yolu var, paniklemeden bul.' },
      { hat: 5, mesaj: 'Yiyecek ve içecek — keyif al. Bu an güzel.' },
      { hat: 6, mesaj: 'Beklenmedik ziyaretçi. Yabancıyı karşıla — hediye getirebilir.' },
    ],
  },

  6: {
    no: 6, ad: 'Çatışma', ceviri: 'Sung — Anlaşmazlık',
    sembol: '☰☵', ust: 'gok', alt: 'su',
    anahtar_kelime: 'Çatışma yönetimi', tema: 'Her çatışma bir müzakere fırsatıdır',
    hd_kapisi: 6,
    psikolojik_oz: 'Çatışmayı tehdit değil bilgi kaynağı olarak görebilme kapasitesi. Kronik çatışma, ya bastırılmış ihtiyaçların ya da sınır koymakta yaşanan güçlüğün yansımasıdır.',
    durum_analizi: 'Bir gerilim veya anlaşmazlık var. Kazanmaya değil, anlamaya odaklan.',
    golge: 'Ya çatışmadan kaçıyor ya da çatışmayı kişisel saldırı olarak algılıyor. İkisi de çözümsüzlüğe götürür.',
    olgun: 'Çatışmada bile merak ve saygı korunuyor. "Sen yanlışsın" yerine "ben bunu farklı görüyorum" diyebiliyor.',
    eylem: 'Şu an gerilimli bir ilişkide tek bir konuyu netleştir — tümünü çözmeye çalışma.',
    gozlem: 'Son çatışmanda kazanmayı mı, yoksa anlaşılmayı mı istedin?',
    hatlar: [
      { hat: 1, mesaj: 'Erken geri çekil — bu davayi kaybedeceksin. Enerjiyi koru.' },
      { hat: 2, mesaj: 'Güçlüye karşı savaşma. Geri adım atmak akıllıcadır.' },
      { hat: 3, mesaj: 'Eski başarılara yaslan ama onları sahiplen.' },
      { hat: 4, mesaj: 'Uzlaşmaya dön. Savaşmak yoruyor, çözmek özgürleştiriyor.' },
      { hat: 5, mesaj: 'Arabulucu bul. Üçüncü taraf gözü netleştirir.' },
      { hat: 6, mesaj: 'Kazansan bile yorgun düşüyorsun. Gerçekten değdi mi?' },
    ],
  },

  7: {
    no: 7, ad: 'Ordu', ceviri: 'Shih — Kolektif Güç',
    sembol: '☷☵', ust: 'yer', alt: 'su',
    anahtar_kelime: 'Liderlik & Disiplin', tema: 'Gerçek güç, kolektif uyumu yönetmektir',
    hd_kapisi: 31,
    psikolojik_oz: 'Liderlik psikolojisi — otorite ile ilişki. Kişi ya liderliği reddeder (otorite korkusu) ya da aşırı üstlenir (kontrol ihtiyacı). Sağlıklı liderlik, hizmet etme motivasyonundan gelir.',
    durum_analizi: 'Bir grubu veya süreci organize etme sorumluluğun var. Otorite korkusunu bir kenara bırak.',
    golge: 'Liderlik sorumluluk olarak değil güç olarak görülüyor. Ya kaçınıyor ya da aşırı kontrol ediyor.',
    olgun: 'Hizmet motivasyonuyla lider oluyor. Ekibi güçlendirir, kendi egosunu geri planda tutar.',
    eylem: 'Bugün bir kişiye yetki devret — küçük bir şey bile olsa. Gözlemle nasıl hissettiriyor.',
    gozlem: 'Liderlik pozisyonlarında kendini nasıl hissediyorsun — rahat mı, gergin mi?',
    hatlar: [
      { hat: 1, mesaj: 'Ordu düzenli başlamalı. Kaotik başlangıçlar felaket getirir.' },
      { hat: 2, mesaj: 'Komutan sahada. Gerçek lider insanlarıyla birlikte hareket eder.' },
      { hat: 3, mesaj: 'Yanlış kişi yönetimde — düzelt, geçiştirme.' },
      { hat: 4, mesaj: 'Geri çekilmek de bir taktiktir. Strateji başarısızlık değildir.' },
      { hat: 5, mesaj: 'Deneyimliye danış. Genç ateş doğru rehberle güce dönüşür.' },
      { hat: 6, mesaj: 'Zaferden sonra dikkat. Doğru kişiye doğru ödül ver.' },
    ],
  },

  8: {
    no: 8, ad: 'Birlik', ceviri: 'Pi — Uyum',
    sembol: '☷☵', ust: 'yer', alt: 'su',
    anahtar_kelime: 'Bağ kurma', tema: 'Gerçek birlik seçimle kurulur, zorunlulukla değil',
    hd_kapisi: 1,
    psikolojik_oz: 'Bağlanma stili ve aidiyet ihtiyacı. Gerçek birlik, kaybolmak değil — kimliğini koruyarak bağlantı kurmak. Uyumsuzluk korkusuyla bağ kuranlar, zamanla kendilerini yitirir.',
    durum_analizi: 'Bir ilişki, grup veya toplulukta bulunma isteği var. Bu bağı neye dayandırıyorsun?',
    golge: 'Dışlanma korkusuyla her gruba uyum sağlamaya çalışıyor. Kim olduğunu kaybediyor.',
    olgun: 'Seçici bağlar kuruyor. Ayrılmayı da, katılmayı da özgürce yapabiliyor.',
    eylem: 'Bugün gerçekten değer verdiğin bir kişiye "senin için buradayım" de — kelimesiz de olabilir.',
    gozlem: 'Hangi gruplara ait hissediyorsun ve hangi gruplarda "performans" sergiliyorsun?',
    hatlar: [
      { hat: 1, mesaj: 'Güven temelden gelir. Gerçekten uyumlu musun, gözlemle.' },
      { hat: 2, mesaj: 'İçsel bütünlük. Kimliğini koruyarak bağlan.' },
      { hat: 3, mesaj: 'Yanlış bağlantıdan vazgeç. Uyumsuz birlik yorar.' },
      { hat: 4, mesaj: 'Dışarıya açıl. İzolasyon güvenli hissettirse de büyümeyi durdurur.' },
      { hat: 5, mesaj: 'Merkez olma. Etrafındaki uyumu kendin ol.' },
      { hat: 6, mesaj: 'Başsız bırakılmış bir bağ var. Ya başını bul ya da bırak.' },
    ],
  },

  9: {
    no: 9, ad: 'Küçük Terbiye Gücü', ceviri: 'Hsiao Ch\'u — Küçük Biriktirme',
    sembol: '☴☰', ust: 'ruzgar', alt: 'gok',
    anahtar_kelime: 'Sabır & Birikim', tema: 'Büyük değişim küçük adımlarla gelir',
    hd_kapisi: 5,
    psikolojik_oz: 'Kademeli değişime tolerans. Hızlı sonuç beklentisi, uzun vadeli büyümeyi engeller. Küçük tutarlı adımlar, büyük sıçramalardan daha güvenilir sonuç verir.',
    durum_analizi: 'Şu an büyük bir adım değil, küçük bir düzeltme zamanı. Detaylara dikkat.',
    golge: 'Sabırsızlık var. Ya hızlı sonuç için köşe kesiyor ya da "küçük" diye önemsemiyor.',
    olgun: 'Küçük adımların gücüne güveniyor. Birikim görünmese bile devam ediyor.',
    eylem: 'Bugün büyük bir hedefin için tek, küçük, tamamlanabilir bir adım at.',
    gozlem: 'Hangi alanda sabırsız davranıp sonucu bozdun? Ne öğrendin?',
    hatlar: [
      { hat: 1, mesaj: 'Geri dön, yeniden başla. Erken fark etmek kayıp değildir.' },
      { hat: 2, mesaj: 'Başkalarıyla geri dön. Yalnız değilsin.' },
      { hat: 3, mesaj: 'Araç bozuldu — ilişki veya proje. Zorla devam etme.' },
      { hat: 4, mesaj: 'Güven kazan. Dürüstlük en iyi strateji.' },
      { hat: 5, mesaj: 'Sadakat ve paylaşım. Birlikte ilerliyorsun.' },
      { hat: 6, mesaj: 'Yağmur yağdı. Artık ilerleyebilirsin — temkinli de ol.' },
    ],
  },

  10: {
    no: 10, ad: 'Yürüyüş', ceviri: 'Lü — Davranış',
    sembol: '☰☱', ust: 'gok', alt: 'gol',
    anahtar_kelime: 'Değerlerle yaşamak', tema: 'Kaplan kuyruğuna bas ama dikkatli yürü',
    hd_kapisi: 10,
    psikolojik_oz: 'Değerler ile davranış arasındaki tutarlılık. Söylediğin ile yaptığın arasındaki boşluk, derin bir içsel gerilim üretir. Bu örüntü, seni kim olduğunu yaşamaya çağırır.',
    durum_analizi: 'Dikkatli, değerlerine uygun adımlar zamanı. Hız değil, tutarlılık.',
    golge: 'Değerleriyle çelişen kararlar alıyor ve bunu rasyonelleştiriyor. İçsel çelişki kronikleşiyor.',
    olgun: 'Söylediğini yapıyor. Mükemmel olmak zorunda değil ama tutarlı olmaya çalışıyor.',
    eylem: 'Bugün bir değerine uygun, küçük ama somut bir karar al.',
    gozlem: 'Son bir ayda söylediklerinle yaptıkların arasında ne kadar boşluk var?',
    hatlar: [
      { hat: 1, mesaj: 'Sade yürüyüş. Beklentisiz, saf adımlar.' },
      { hat: 2, mesaj: 'Yalnız yolu. Eleştiriden etkilenmeden devam et.' },
      { hat: 3, mesaj: 'Gözler kapanmış ilerleme. Gerçekçi değil — dur ve bak.' },
      { hat: 4, mesaj: 'Tehlikeli yol. Dikkatli ve bilinçli ilerle.' },
      { hat: 5, mesaj: 'Kararlı adım. Netlik ve kararlılık güç verir.' },
      { hat: 6, mesaj: 'Yolculuğu değerlendir. Ne öğrendin?' },
    ],
  },

  11: {
    no: 11, ad: 'Barış', ceviri: 'T\'ai — Denge',
    sembol: '☷☰', ust: 'yer', alt: 'gok',
    anahtar_kelime: 'İç denge', tema: 'Yin ve yang birbirine akar — bu barış halidir',
    hd_kapisi: 11,
    psikolojik_oz: 'Psikolojik homeostaz. Gerçek barış, dış koşulların değişmesini beklemek değil — iç dünyada zıtlıkları tutabilmek. Bu örüntü, hem güçlü hem kırılgan olabileceğini hatırlatır.',
    durum_analizi: 'Dengeli ve uyumlu bir dönem. Büyüme için iyi zemin — bu anı değerlendir.',
    golge: 'Dış barışı korumak için içini bastırıyor. Yüzeyde huzurlu, içte gerilimli.',
    olgun: 'Hem zıtlıkları hem de uyumu taşıyabiliyor. İç barış, dış koşullardan bağımsız.',
    eylem: 'Bugün hem rahat hem zorlu bir şeyi aynı anda fark et. İkisini de kabul et.',
    gozlem: 'Şu an gerçekten huzurlu musun, yoksa huzurlu görünmeye mi çalışıyorsun?',
    hatlar: [
      { hat: 1, mesaj: 'Çimen yolundan yürü. Bağlantı kur, yalnız ilerleme.' },
      { hat: 2, mesaj: 'Uzakla da ilgilen. Komşuna iyi bakman yetmez.' },
      { hat: 3, mesaj: 'Her şey dalgalanır. İyi zamanlar geçer, hazır ol.' },
      { hat: 4, mesaj: 'Alçakgönüllülük. Zenginlik gösteriş değil.' },
      { hat: 5, mesaj: 'Güveni pekiştir. İlişkilere yatırım yap.' },
      { hat: 6, mesaj: 'Duvarlar yıkılıyor. Yeni döneme hazırlan.' },
    ],
  },

  12: {
    no: 12, ad: 'Durgunluk', ceviri: 'P\'i — Tıkanma',
    sembol: '☰☷', ust: 'gok', alt: 'yer',
    anahtar_kelime: 'Seçici konuşma', tema: 'Söylenmeyecek şeyi bilmek güçtür',
    hd_kapisi: 12,
    psikolojik_oz: 'Duygusal kontrol ve ifade seçiciliği. Her şeyi her an söylemek gerekmez. Ama tam tersine — sessizliği bastırmak için kullananlar zamanla içten çürür.',
    durum_analizi: 'Şu an sessiz olma, geri çekilme zamanı. Her düşünceyi paylaşmak zorunda değilsin.',
    golge: 'Söylemek istediklerini bastırıyor, sonra uygunsuz anlarda patlıyor. Ya tam sessizlik ya taşma.',
    olgun: 'Ne zaman konuşup ne zaman susacağını biliyor. Seçici ve kasıtlı ifade.',
    eylem: 'Bugün söylemek istediğin ama söylememen gereken bir şeyi yaz — sadece kendine.',
    gozlem: 'Sustuğunda güç mü hissediyorsun, yoksa bastırılmış mı?',
    hatlar: [
      { hat: 1, mesaj: 'Çimen kopar. Köklü ilişkiler bu dönemde korunur.' },
      { hat: 2, mesaj: 'Küçük insanlar değil büyük insan ol. Sabırla bekle.' },
      { hat: 3, mesaj: 'Utançla değil onurla taşı bu durumu.' },
      { hat: 4, mesaj: 'Yüksek değerlere hizmet et. Dönem değişiyor.' },
      { hat: 5, mesaj: 'Duraksama sona eriyor. İyilik yayılmaya başlıyor.' },
      { hat: 6, mesaj: 'Tıkanıklık bitiyor. Yeni bir soluk geliyor.' },
    ],
  },

  13: {
    no: 13, ad: 'Arkadaşlık', ceviri: 'T\'ung Jen — Topluluk',
    sembol: '☰☲', ust: 'gok', alt: 'ates',
    anahtar_kelime: 'Paylaşım & Ortak amaç', tema: 'Gerçek birlik farklılıkları eritir, silmez',
    hd_kapisi: 13,
    psikolojik_oz: 'Aidiyet ve ortak kimlik psikolojisi. Gerçek topluluk, aynı olmayı değil — farklı olarak birlikte var olmayı içerir. "Ben de seninle" demek, "seninle aynıyım" demek değildir.',
    durum_analizi: 'Ortak zemin arama zamanı. Farklılıkları değil, paylaşılan değerleri gör.',
    golge: 'Gruba ait olmak için kimliğini siliyor. Ya da gruba mesafeli duruyor, yalnızlaşıyor.',
    olgun: 'Farklılıklarını koruyarak bağ kurabiliyor. "Aynı değiliz ama birlikte olabiliriz" diyebiliyor.',
    eylem: 'Bugün çok farklı biri ile ortak bir şey bul — paylaş.',
    gozlem: 'Hangi gruplarla olmak seni sen yapıyor, hangileri seni eritiyor?',
    hatlar: [
      { hat: 1, mesaj: 'Kapıyı aç. Birlik açık alanda başlar.' },
      { hat: 2, mesaj: 'Küçük gruplar kısıtlar. Genişle.' },
      { hat: 3, mesaj: 'Güvensizlik var. Silahları bırak önce.' },
      { hat: 4, mesaj: 'Duvarlar yıkılıyor. İyi yön.' },
      { hat: 5, mesaj: 'Ayrıldıktan sonra yeniden buluşma. Gözyaşı ve sevinç.' },
      { hat: 6, mesaj: 'Daha geniş çevre. Mahalle değil dünya.' },
    ],
  },

  14: {
    no: 14, ad: 'Büyük Zenginlik', ceviri: 'Ta Yu — Bolluk',
    sembol: '☲☰', ust: 'ates', alt: 'gok',
    anahtar_kelime: 'Kaynakları yönetme', tema: 'Sahip olmak değil, iyi yönetmek',
    hd_kapisi: 2,
    psikolojik_oz: 'Kaynak yönetimi ve güç psikolojisi. Zenginlik — para, enerji, yetenek — ne için kullanıldığıyla anlam kazanır. Biriktirme mi paylaşma mı; bu soru bir değerler sorusudur.',
    durum_analizi: 'Elimizdeki kaynaklar yeterli. Asıl soru: bunları ne için ve nasıl kullanıyorsun?',
    golge: 'Kaynak biriktiriyor ama kullanmıyor — ya da sorumsuzca harcıyor. İkisi de denge eksikliğinin işareti.',
    olgun: 'Kaynaklarını hem koruyup hem paylaşıyor. Güç, hizmet biçiminde dışa vurur.',
    eylem: 'Bugün bir kaynağını (zaman, enerji, bilgi) birine cömertçe paylaş.',
    gozlem: 'Sahip olduklarını ne için kullanıyorsun? Bu seni tatmin ediyor mu?',
    hatlar: [
      { hat: 1, mesaj: 'Tehlike yok ama dikkatli ol. Kibir tuzağından kaçın.' },
      { hat: 2, mesaj: 'Yükü taşı ama sürüklenme. Amaçlı taşı.' },
      { hat: 3, mesaj: 'Büyük insan paylaşır. Kral saray\'da solitar yaşamaz.' },
      { hat: 4, mesaj: 'Alçakgönüllülük zenginliği korur.' },
      { hat: 5, mesaj: 'Güven ve saygı. Güç, zorlamadan gelir.' },
      { hat: 6, mesaj: 'Gökten yardım. Alçakgönüllülük ödüllendirilir.' },
    ],
  },

  15: {
    no: 15, ad: 'Alçakgönüllülük', ceviri: 'Ch\'ien — Tevazu',
    sembol: '☷☶', ust: 'yer', alt: 'dag',
    anahtar_kelime: 'Ölçülülük', tema: 'Gerçek güç kendini küçümsemez, göstermez de',
    hd_kapisi: 15,
    psikolojik_oz: 'Özgüven ile alçakgönüllülüğün paradoksu. Gerçek tevazu, kendini küçümsemek değil — kendinle orantılı olmaktır. Ne çok öne ne çok geriye.',
    durum_analizi: 'Şu an görünmekten çok var olmak zamanı. Sessizce güçlü ol.',
    golge: 'Ya sahte tevazu (aslında onay arıyor) ya da gizli büyüklük kurgusu. İkisi de dengesizlik.',
    olgun: 'Ne ön plana çıkmak için çabalıyor ne de kaçıyor. Yerinde, dengeli, güçlü.',
    eylem: 'Bugün başka birinin başarısını gerçekten kutla — içinde kıskançlık olmadan.',
    gozlem: 'Övüldüğünde ne hissediyorsun — rahatsızlık mı, hak mı, yoksa şüphe mi?',
    hatlar: [
      { hat: 1, mesaj: 'Alçakgönüllü alçakgönüllü çalışır. Görünmek zorunda değil.' },
      { hat: 2, mesaj: 'İçten gelen tevazu. Performatif değil, gerçek.' },
      { hat: 3, mesaj: 'Başarıya rağmen mütevazı. Bu sizi yükseltir.' },
      { hat: 4, mesaj: 'Alçakgönüllülük her durumda geçerli.' },
      { hat: 5, mesaj: 'Tevazu güce dönüşüyor. Etkili ol, gürültülü değil.' },
      { hat: 6, mesaj: 'Gerekirse savaş — ama egon için değil, değerlerin için.' },
    ],
  },

  16: {
    no: 16, ad: 'Coşku', ceviri: 'Yü — Heves',
    sembol: '☳☷', ust: 'gok_gurultulu', alt: 'yer',
    anahtar_kelime: 'İlham & Motivasyon', tema: 'Gerçek coşku bulaşıcıdır — sahte olan yorar',
    hd_kapisi: 16,
    psikolojik_oz: 'İçsel motivasyonun anatomisi. Dışarıdan gelen heyecan geçicidir; içeriden gelen coşku sürdürülebilir. Başkalarını motive etmek istiyorsan önce kendinin gerçekten heyecanlı olması gerekir.',
    durum_analizi: 'Bir şey için gerçek heyecan var. Bunu paylaş — coşku bulaşıcıdır.',
    golge: 'Sahte heyecan performansı. Ya da tam tersi — her şey renksiz, motivasyon yok.',
    olgun: 'İçten gelen coşkuyu paylaşıyor. Başkalarını zorlamadan ilham veriyor.',
    eylem: 'Bugün gerçekten seni heyecanlandıran bir şeyi birine anlat — abartısız, sadece gerçekten.',
    gozlem: 'Son zamanlarda neyi gerçekten, performatif olmadan merak ettin?',
    hatlar: [
      { hat: 1, mesaj: 'Yüksek sesle konuşma. Coşku gösteriş değil, eylemdir.' },
      { hat: 2, mesaj: 'Kayaya bağlı. Akıntıya kapılma.' },
      { hat: 3, mesaj: 'Başkasına bakarak motive olma. Kendi yolundan git.' },
      { hat: 4, mesaj: 'Büyük başarı. Şüphecileri de yanına al.' },
      { hat: 5, mesaj: 'Hastalık süregidiyor. Nedeni bul, semptomu değil.' },
      { hat: 6, mesaj: 'Coşku geçti. Normal — yeni bir döngü başlıyor.' },
    ],
  },

  17: {
    no: 17, ad: 'Takip Etmek', ceviri: 'Sui — Uyum',
    sembol: '☱☳', ust: 'gol', alt: 'gok_gurultulu',
    anahtar_kelime: 'Uyum & Esneklik', tema: 'Lider bazen takip eder',
    hd_kapisi: 17,
    psikolojik_oz: 'Esneklik ve kontrol ihtiyacının dengesi. Her zaman lider olmak, gelişimi kısıtlar. Takip etmeyi öğrenmek — egosuz, bilinçli — gerçek olgunluktur.',
    durum_analizi: 'Şu an başka birinin rehberliğine uyma zamanı. Kontrol bırakmak güven işaretidir.',
    golge: 'Takip etmekten utanıyor ya da tam tersine körü körüne takip ediyor.',
    olgun: 'Bilinçli takip. Neyi neden takip ettiğini biliyor, körce değil.',
    eylem: 'Bugün bir alanda uzman birine danış ve önerisini tartışmadan uygula.',
    gozlem: 'Kimin liderliğine gerçekten güveniyorsun? Bu güveni ne yarattı?',
    hatlar: [
      { hat: 1, mesaj: 'Standartlar değişiyor. Sen de değiş — esnek ol.' },
      { hat: 2, mesaj: 'Küçük insan ile büyük insan. Birini seç.' },
      { hat: 3, mesaj: 'Büyük insanı takip et. Küçüğü bırak.' },
      { hat: 4, mesaj: 'Takip ederken ayrımını koru. Kaybolma.' },
      { hat: 5, mesaj: 'İyiye olan bağ güçlendir.' },
      { hat: 6, mesaj: 'Sadakat ödüllendirilir. Bağlılık kalır.' },
    ],
  },

  18: {
    no: 18, ad: 'Bozulmayı Düzeltmek', ceviri: 'Ku — Çürüme',
    sembol: '☶☴', ust: 'dag', alt: 'ruzgar',
    anahtar_kelime: 'Dönüşüm', tema: 'Çürüyen şeyi reddetme — dönüştür',
    hd_kapisi: 18,
    psikolojik_oz: 'Nesiller arası örüntüler ve kişisel tarih. Aile sistemlerinden miras kalan işlevsiz örüntüler farkındalık olmadan tekrar eder. Bu hekzagram, görmek istemeyen şeyin tam ortasına bakmayı gerektirir.',
    durum_analizi: 'Bir şey bozulmuş ya da eskimiş — dürüst gözlemle ne olduğunu gör.',
    golge: 'Bozulanı görmüyor ya da görse bile inkâr ediyor. Kronik erteleme.',
    olgun: 'Bozulanla yüzleşiyor ve dönüştürme sorumluluğunu alıyor.',
    eylem: 'Hayatında "artık çalışmıyor" dediğin ama dokunmadığın bir şeyi bugün fark et — adını koy.',
    gozlem: 'Hangi aile ya da geçmiş örüntüsünün kendi hayatında tekrarlandığını fark ediyorsun?',
    hatlar: [
      { hat: 1, mesaj: 'Babanın hatasını düzelt. Geçmişi sil değil, dönüştür.' },
      { hat: 2, mesaj: 'Annenin bozukluğu. Nazikçe yaklaş.' },
      { hat: 3, mesaj: 'Aşırı düzeltme de zarar verir. Dengeli müdahale.' },
      { hat: 4, mesaj: 'Görmezden gelmek utanç getirir.' },
      { hat: 5, mesaj: 'Onurla değiştir. Sertlikle değil, netlikle.' },
      { hat: 6, mesaj: 'Sistemin dışından bak. Bağımsız perspektif değerlidir.' },
    ],
  },

  19: {
    no: 19, ad: 'Yaklaşma', ceviri: 'Lin — İlerleme',
    sembol: '☷☱', ust: 'yer', alt: 'gol',
    anahtar_kelime: 'Hassasiyet & İlgi', tema: 'Yaklaşmak cesaret ister',
    hd_kapisi: 19,
    psikolojik_oz: 'Bağlanma ve hassasiyet. Başkasına gerçekten yaklaşmak — duygusal, fiziksel, entelektüel — savunmasızlık gerektirir. Bu örüntü, hassasiyetin güç olduğunu hatırlatır.',
    durum_analizi: 'Bir kişiye veya konuya daha yakın adım atma zamanı. Mesafeyi koru değil, mesafeyi azalt.',
    golge: 'Yakınlıktan korkuyor — ya tam kapanma ya da aşırı yaklaşma. İkisi de savunmacı.',
    olgun: 'Uygun mesafede, gerçek ilgiyle yaklaşabiliyor. Ne boğuyor ne kaçıyor.',
    eylem: 'Bugün uzak tuttuğun birine gerçek bir soru sor — onun dünyasıyla ilgilendiğini göster.',
    gozlem: 'Şu an hayatında kiminle gerçek anlamda bağ kurmaktan çekiniyorsun?',
    hatlar: [
      { hat: 1, mesaj: 'Birlikte yaklaş. Ortak bir niyetle.' },
      { hat: 2, mesaj: 'Birlikte yaklaş. Uyum güçlüdür.' },
      { hat: 3, mesaj: 'Tatlı yaklaşma tuzağı. Gerçek ilgi olmadan yüzeysel kalır.' },
      { hat: 4, mesaj: 'Tam yaklaşma. Engel yok.' },
      { hat: 5, mesaj: 'Bilge yaklaşma. Doğru kişiyi doğru şekilde.' },
      { hat: 6, mesaj: 'Cömert yaklaşma. Karşılıksız vermek.' },
    ],
  },

  20: {
    no: 20, ad: 'Seyretme', ceviri: 'Kuan — Gözlem',
    sembol: '☴☷', ust: 'ruzgar', alt: 'yer',
    anahtar_kelime: 'Farkındalık', tema: 'Görmek için önce durmak gerekir',
    hd_kapisi: 20,
    psikolojik_oz: 'Meta-farkındalık ve perspektif alma. Tepki vermeden önce gözlemlemek, duygusal zekânın temel bileşenidir. Şu an ne olduğunu görmek, ne yapacağını belirler.',
    durum_analizi: 'Gözlemle, henüz eyleme geçme. Bütün resmi gör.',
    golge: 'Ya körü körüne hareket ediyor ya da aşırı analiz yapıp eylemi erteliyor.',
    olgun: 'Gözlemleyip anlıyor, sonra bilinçli seçimle hareket ediyor.',
    eylem: 'Bugün tepki vermeden önce 10 saniye dur — ne fark ediyorsun?',
    gozlem: 'Son zamanlarda ne kadar gerçekten gözlemliyorsun, ne kadar kendi yorumunla hareket ediyorsun?',
    hatlar: [
      { hat: 1, mesaj: 'Çocuk bakışı. Yüzeysel, bilinçsiz. Derinleş.' },
      { hat: 2, mesaj: 'Kapıdan bakmak. Dar perspektif — çıkar, geniş bak.' },
      { hat: 3, mesaj: 'Kendini gözlemle. İlerliyorsun mu, geriliyor musun?' },
      { hat: 4, mesaj: 'Krallığı gözlemle. Bilge kişi gerçeği görür.' },
      { hat: 5, mesaj: 'Kendi etkini gözlemle. Ne yayıyorsun?' },
      { hat: 6, mesaj: 'Kendinle yüzleş. En derin gözlem içeri bakmaktır.' },
    ],
  },

  21: {
    no: 21, ad: 'Isırma', ceviri: 'Shih Ho — Aşma',
    sembol: '☲☳', ust: 'ates', alt: 'gok_gurultulu',
    anahtar_kelime: 'Netlik & Sınır', tema: 'Engeli aşmak için bazen sert kesmek gerekir',
    hd_kapisi: 21,
    psikolojik_oz: 'Sınır koyma ve kontrol ihtiyacı. Gerektiğinde net, sert ve adil bir tutum almak — saldırganlık değil, yetkinlik. Kontrol ihtiyacının altında çoğunlukla güvensizlik yatar.',
    durum_analizi: 'Bir engel var, nazikçe geçilemiyor. Kararlı ve net bir adım gerekiyor.',
    golge: 'Kontrol için güç kullanıyor — ya aşırı sert ya da pasif kalarak kaotik oluyor.',
    olgun: 'Gereken sertliği, adaletle ve kişiselleştirmeden uygulayabiliyor.',
    eylem: 'Bugün sınır koymayı ertelediğin bir durumda net bir tutum al.',
    gozlem: 'Kontrol etmek istediğinde asıl korkun ne?',
    hatlar: [
      { hat: 1, mesaj: 'Ayak kelepçelendi. Erken uyarı — dikkate al.' },
      { hat: 2, mesaj: 'Derin ısırma. Kararlı ama aşırıya kaçma.' },
      { hat: 3, mesaj: 'Eski et — eski sorun. Zorluk bekle ama devam et.' },
      { hat: 4, mesaj: 'Kemikli et. Güçlükle ilerle, yılma.' },
      { hat: 5, mesaj: 'Kurutulmuş et. Orta yol — ne çok sert ne çok yumuşak.' },
      { hat: 6, mesaj: 'Boyun kilitlendi. Aşırı direnç faturayı ağırlaştırır.' },
    ],
  },

  22: {
    no: 22, ad: 'Zarafet', ceviri: 'Pi — Güzellik',
    sembol: '☶☲', ust: 'dag', alt: 'ates',
    anahtar_kelime: 'Form & Estetik', tema: 'Dış biçim iç özü taşır',
    hd_kapisi: 22,
    psikolojik_oz: 'Estetik zekâ ve form bilinci. Güzellik yüzeysellik değildir — anlam taşıyan biçimdir. Bu örüntü, nasıl söylediğinin ne söylediğin kadar önemli olduğunu hatırlatır.',
    durum_analizi: 'Biçime, sunuma, tona dikkat etme zamanı. Özün ne olduğu kadar nasıl göründüğü de önemli.',
    golge: 'Ya forma takılmış içi boş estetik ya da biçimi tamamen ihmal eden ham içerik.',
    olgun: 'İçerik ve form uyum içinde. Güzel ve anlamlı bir arada.',
    eylem: 'Bugün paylaşacağın bir şeye — e-posta, mesaj, sunum — biraz daha dikkat ve özen göster.',
    gozlem: 'Sunumuna, görünüşüne, ifade biçimine ne kadar özen gösteriyorsun?',
    hatlar: [
      { hat: 1, mesaj: 'Yürüyerek git. Sadelikte zarafet var.' },
      { hat: 2, mesaj: 'Sakalını tara. Küçük özen büyük fark yaratır.' },
      { hat: 3, mesaj: 'Islak boyada zarafet. Güzel ama geçici.' },
      { hat: 4, mesaj: 'Sade zarafet. Gerçek güzellik karmaşık değildir.' },
      { hat: 5, mesaj: 'Bahçede zarafet. Alçakgönüllü ama gerçek.' },
      { hat: 6, mesaj: 'Sade beyaz. En yüksek zarafet süssüzlüktür.' },
    ],
  },

  23: {
    no: 23, ad: 'Parçalanma', ceviri: 'Po — Dağılma',
    sembol: '☶☷', ust: 'dag', alt: 'yer',
    anahtar_kelime: 'Bırakma & Yenilenme', tema: 'Dağılmak bazen zorunlu bir arınmadır',
    hd_kapisi: 43,
    psikolojik_oz: 'Kayıp psikolojisi ve bırakma kapasitesi. Her son bir kayıp olarak deneyimlenir. Ama bazı şeyler dağılmadan yenilenemez. Bu örüntü, kaybı inkar etmeden geçişi tutmayı öğretir.',
    durum_analizi: 'Bir şey sona erme sürecinde. Direnmek yerine süreci izle.',
    golge: 'Kaybı reddediyor ya da aşırı tutunuyor. Bırakmak başarısızlık gibi hissettiriyor.',
    olgun: 'Dağılmayı kabulleniyor. Boşlukta bir süre durmayı tolere edebiliyor.',
    eylem: 'Tutunduğun ama artık işe yaramayan bir şeyi bugün sembolik olarak bırak.',
    gozlem: 'Şu an hayatında neyi bırakmakta zorlanıyorsun? Bu direncin altında ne var?',
    hatlar: [
      { hat: 1, mesaj: 'Yatak dağılıyor. Zemin çürük — dikkatli ol.' },
      { hat: 2, mesaj: 'Ayak yeri dağılıyor. Destek azalıyor.' },
      { hat: 3, mesaj: 'Kötüyle dağıl. Doğru olanla kal.' },
      { hat: 4, mesaj: 'Yatağın kendisi. Ciddi tehlike — harekete geç.' },
      { hat: 5, mesaj: 'Saraya hediye. Lütuf içinde dağılma.' },
      { hat: 6, mesaj: 'Meyve düşmeden önce. Döngü tamamlandı.' },
    ],
  },

  24: {
    no: 24, ad: 'Geri Dönüş', ceviri: 'Fu — Dönüş',
    sembol: '☷☳', ust: 'yer', alt: 'gok_gurultulu',
    anahtar_kelime: 'Yenilenme', tema: 'Her son bir başlangıcın tohumunu taşır',
    hd_kapisi: 24,
    psikolojik_oz: 'Döngüsel düşünme ve öz-şefkat. Geri dönmek gerilemek değil — yenilenme döngüsüne girmektir. Pişmanlık yerine farkındalıkla dönmek, büyümenin işaretidir.',
    durum_analizi: 'Bir şeye geri dönüyorsun — bir fikre, bir ilişkiye, kendine. Bu dönüş değerli.',
    golge: 'Geri dönmek başarısızlık gibi hissettiriyor. Öz-eleştiri yüksek.',
    olgun: 'Geri dönüşü fırsat olarak görüyor. Pişmanlık yerine merak ve öz-şefkatle.',
    eylem: 'Bugün bir süre önce bıraktığın, aslında önemli olan bir şeye geri dön — küçük bir adımla.',
    gozlem: 'Hayatında tekrar eden örüntüler var mı? Bunlar sana ne anlatmaya çalışıyor?',
    hatlar: [
      { hat: 1, mesaj: 'Kısa yolculuk. Hemen geri dön. Pişmanlık yok.' },
      { hat: 2, mesaj: 'İyi ata uy. Birlikte dön.' },
      { hat: 3, mesaj: 'Sık sık dönmek. Tehlikeli ama özgürlük içinde.' },
      { hat: 4, mesaj: 'Ortada dön. Kendi yolunu bul.' },
      { hat: 5, mesaj: 'Asil dönüş. Pişmanlık olmadan.' },
      { hat: 6, mesaj: 'Geri dönmeyi kaçırmak. Felaket. Şimdi dön.' },
    ],
  },

  25: {
    no: 25, ad: 'Masumiyet', ceviri: 'Wu Wang — Sahteliksizlik',
    sembol: '☰☳', ust: 'gok', alt: 'gok_gurultulu',
    anahtar_kelime: 'Özgünlük', tema: 'Hesapsız iyilik',
    hd_kapisi: 25,
    psikolojik_oz: 'Otantiklik ve koşulsuz iyilik. Sahteliksizlik, naiflik değil — beklenti olmadan var olmaktır. Hesaplı iyilik, zamanla yoruculaşır; içsel iyilik sürdürülebilir.',
    durum_analizi: 'Hesapsız, özgün bir şekilde hareket etme zamanı. Sonucu düşünmeden.',
    golge: 'Her iyiliğin arkasında gizli bir beklenti var. Ya da tam tersine aşırı naif.',
    olgun: 'Beklentisiz veriyor. Sonuç ne olursa olsun doğru olanı yapıyor.',
    eylem: 'Bugün karşılık beklemeden birine küçük bir iyilik yap.',
    gozlem: 'Son iyiliğinde gizli bir beklenti var mıydı? Hangisi?',
    hatlar: [
      { hat: 1, mesaj: 'İçgüdüyle ilerle. Hesaplama.' },
      { hat: 2, mesaj: 'Bugünü yaşa. Uzak hasat için bugünü feda etme.' },
      { hat: 3, mesaj: 'Beklenmedik kayıp. Suçlama yok — devam et.' },
      { hat: 4, mesaj: 'Tutunabilirsin. Bu güçlük seni kirletmez.' },
      { hat: 5, mesaj: 'Hastalık için ilaç içme. Zaman iyileştirir.' },
      { hat: 6, mesaj: 'Hareketsizlik. Şu an bir şey yapma — hata olur.' },
    ],
  },

  26: {
    no: 26, ad: 'Büyük Terbiye Gücü', ceviri: 'Ta Ch\'u — Büyük Birikim',
    sembol: '☶☰', ust: 'dag', alt: 'gok',
    anahtar_kelime: 'Potansiyeli tutmak', tema: 'Büyük güç kontrol altında tutulur',
    hd_kapisi: 26,
    psikolojik_oz: 'Dürtü kontrolü ve güç yönetimi. Büyük birikmiş enerji — öfke, tutku, yetenek — doğru zamana kadar tutulabilmek güçtür. Erken boşalma, gücü dağıtır.',
    durum_analizi: 'Büyük potansiyel var ama henüz zamanı değil. Tut, bekle, hazırlan.',
    golge: 'Erken boşalma ya da aşırı baskılama. İkisi de enerjiyi israf eder.',
    olgun: 'Doğru ana kadar büyük enerjiyi bilinçle tutuyor.',
    eylem: 'Bugün harekete geçmek istediğin ama zamanı olmayan bir şeyi yaz — sadece yaz, yapma.',
    gozlem: 'Potansiyelini ne zaman çok erken, ne zaman çok geç açığa çıkardın?',
    hatlar: [
      { hat: 1, mesaj: 'Tehlike önde. Dur. Şimdi ilerleme.' },
      { hat: 2, mesaj: 'Araba devrildi. Bekle, zorlama.' },
      { hat: 3, mesaj: 'İyi at koşuyor. Hazırlıklı ol, yol açılacak.' },
      { hat: 4, mesaj: 'Genç boğa dizginlendi. Zamanında önleme.' },
      { hat: 5, mesaj: 'Ongur domuzu hadım edildi. Kaynağı kontrol et.' },
      { hat: 6, mesaj: 'Gök yolu açık. Şimdi hareket et.' },
    ],
  },

  27: {
    no: 27, ad: 'Beslenme', ceviri: 'I — Bakım',
    sembol: '☶☳', ust: 'dag', alt: 'gok_gurultulu',
    anahtar_kelime: 'Beslenme & Bakım', tema: 'Neyi beslersin, o büyür',
    hd_kapisi: 27,
    psikolojik_oz: 'Öz-bakım ve başkalarını besleme. Hem fiziksel hem psikolojik beslenme örüntüleri bu arketipte toplanır. Başkasını beslerken kendin kuruyorsan, uzun süre sürdüremezsin.',
    durum_analizi: 'Ne beslediğine dikkat et — düşünceler, ilişkiler, alışkanlıklar. Seçici ol.',
    golge: 'Ya kendini ihmal ederek başkasını besliyor ya da tam tersine aşırı öz-odaklı.',
    olgun: 'Hem kendine hem başkasına dengeli bakım gösteriyor.',
    eylem: 'Bugün kendin için besleyici bir şey yap — küçük ama gerçek.',
    gozlem: 'Şu an hayatında neyi besliyorsun — büyüttüğünde iyi mi hissettiriyor?',
    hatlar: [
      { hat: 1, mesaj: 'Sihirli kaplumbağayı bırak. Kendi kaynağına dön.' },
      { hat: 2, mesaj: 'Tepeden beslenme. Bağımlılık yaratır.' },
      { hat: 3, mesaj: 'Yanlış beslenme. Uzun süre sürdürülemez.' },
      { hat: 4, mesaj: 'Kaplan gözüyle bak. Açgözlülük değil, kararlılık.' },
      { hat: 5, mesaj: 'Yolundan sapma. Standartlarını koru.' },
      { hat: 6, mesaj: 'Beslenmenin kaynağı. Tehlikeli ama onurlu sorumluluk.' },
    ],
  },

  28: {
    no: 28, ad: 'Büyük Geçiş', ceviri: 'Ta Kuo — Aşırı Yük',
    sembol: '☱☴', ust: 'gol', alt: 'ruzgar',
    anahtar_kelime: 'Kriz & Dayanıklılık', tema: 'Kirişler bükülüyor — ama henüz kırılmadı',
    hd_kapisi: 28,
    psikolojik_oz: 'Dayanıklılık psikolojisi ve anlam arayışı. Kriz anında anlam bulmak — Viktor Frankl\'ın logoterapi yaklaşımı. Zor olanın içinde bile seçim özgürlüğü kalır.',
    durum_analizi: 'Yük ağır. Ama taşıyabiliyorsun. Anlam bul — bu seni güçlendirecek.',
    golge: 'Yük altında ezilmiş gibi hissediyor. Ya da tam tersine aşırı yük altında anlamsızlaşıyor.',
    olgun: 'Ağır yükü taşırken anlam buluyor. Kriz içinde büyüyor.',
    eylem: 'Şu an taşıdığın en ağır şeyi yaz. Onun sana ne öğrettiğini de yaz.',
    gozlem: 'Zor dönemlerde anlam nasıl buluyorsun?',
    hatlar: [
      { hat: 1, mesaj: 'Beyaz kamış serir. Dikkatli başla.' },
      { hat: 2, mesaj: 'Yaşlı söğüt filiz veriyor. Yeni başlangıç.' },
      { hat: 3, mesaj: 'Kirişler bükülüyor. Tehlikeli aşırılık.' },
      { hat: 4, mesaj: 'Kiriş güçleniyor. Ama yan desteklere dikkat.' },
      { hat: 5, mesaj: 'Yaşlı söğüt çiçek açıyor. Geç ama gerçek.' },
      { hat: 6, mesaj: 'Suya dalma. Kurtarılamaz ama onurlu.' },
    ],
  },

  29: {
    no: 29, ad: 'Tehlike', ceviri: 'K\'an — Derinlik',
    sembol: '☵☵', ust: 'su', alt: 'su',
    anahtar_kelime: 'Risk & Güven', tema: 'Su akar — engeli aşmaz, etrafından dolaşır',
    hd_kapisi: 29,
    psikolojik_oz: 'Risk toleransı ve güven. Tehlike, değiştirilemez bir gerçek olarak kabul edildiğinde — panikle değil akışla karşılandığında — aşılabilir hale gelir.',
    durum_analizi: 'Zorlu bir geçiş var. Su gibi ol — esnek, ısrarcı, akmaya devam eden.',
    golge: 'Tehlikeye donup kalıyor ya da paniğe kapılıyor. Her ikisi de hareketi engeller.',
    olgun: 'Tehlikeyi tanıyor ama paniklemeden, su gibi akarak ilerliyor.',
    eylem: 'Kaçındığın ama kaçınmaman gereken bir şeyle bugün küçük bir adım at.',
    gozlem: 'Hayatında "üzerinden atlayamam" dediğin şey nedir? Gerçekten aşılamaz mı?',
    hatlar: [
      { hat: 1, mesaj: 'Tehlikeye alışma. Uyuşma tehlikeli.' },
      { hat: 2, mesaj: 'Küçük kazanım. Büyük atılım bekleme.' },
      { hat: 3, mesaj: 'Dur. Hareketsizlik şimdi en iyisi.' },
      { hat: 4, mesaj: 'Varil ve şarap. Sadelik içinde güven.' },
      { hat: 5, mesaj: 'Dolmadan önce. Aşırıya kaçma.' },
      { hat: 6, mesaj: 'Bağlanmış, kafeste. Uzun yol.' },
    ],
  },

  30: {
    no: 30, ad: 'Yapışma', ceviri: 'Li — Bağlılık',
    sembol: '☲☲', ust: 'ates', alt: 'ates',
    anahtar_kelime: 'Tutku & Netlik', tema: 'Ateş aydınlatır — ama bağımlı olduğuna yapışır',
    hd_kapisi: 30,
    psikolojik_oz: 'Duygusal yoğunluk ve bağlılık. Güçlü tutku ve bağlılık hem en büyük güç hem de en büyük tuzak olabilir. Ateş gibi — aydınlatır ama tüketir.',
    durum_analizi: 'Bir şeye güçlü bağlılık hissediyorsun. Bu tutku mu, bağımlılık mı — fark et.',
    golge: 'Bağlı olduğuna aşırı yapışmış, bırakamıyor. Ya da tam tersi — bağlanamıyor.',
    olgun: 'Tutkuyla bağlı ama bağımlı değil. Gerektiğinde bırakabiliyor.',
    eylem: 'Güçlü bağlı olduğun şeyi bir gün kenara koy — nasıl hissettiriyor?',
    gozlem: 'Şu an ne seni tutkuyla yakıyor? Bu ateş seni besliyor mu, tüketiyor mu?',
    hatlar: [
      { hat: 1, mesaj: 'Sabahın karanlığında adım. Dikkatli ol.' },
      { hat: 2, mesaj: 'Sarı ışık. Dengeli, iyi.' },
      { hat: 3, mesaj: 'Gün batımı. Her şey geçer — kabul et.' },
      { hat: 4, mesaj: 'Aniden geliyor. Tükenip gidiyor.' },
      { hat: 5, mesaj: 'Gözyaşı ve tasa. Gerçek duygu, sahte değil.' },
      { hat: 6, mesaj: 'Kral sefere çıkar. Doğruyu yanlıştan ayır.' },
    ],
  },

  31: {
    no: 31, ad: 'Etki', ceviri: 'Hsien — Rezonans',
    sembol: '☱☶', ust: 'gol', alt: 'dag',
    anahtar_kelime: 'Karşılıklı etki', tema: 'Gerçek etki zorlamadan gelir',
    hd_kapisi: 31,
    psikolojik_oz: 'Sosyal etki ve rezonans. En güçlü etki, baskıdan değil — gerçek bir çekimden gelir. Manipülasyon geçici, rezonans kalıcıdır.',
    durum_analizi: 'Birisini etkilemek istiyorsun. Zorlamadan önce rezonans kur.',
    golge: 'Etkilemek için manipüle ediyor. Ya da tam tersine etkisini küçümsüyor.',
    olgun: 'Gerçek benliğiyle ortaya çıkıyor ve doğal çekimle etkiliyor.',
    eylem: 'Bugün birisini ikna etmek yerine sadece gerçekten dinle — ne değişiyor?',
    gozlem: 'Etki bırakmak istediğinde ne yapıyorsun — manipüle mi ediyorsun, yoksa gerçekten bağlanıyor musun?',
    hatlar: [
      { hat: 1, mesaj: 'Başparmak titriyor. Yüzeysel etki.' },
      { hat: 2, mesaj: 'Baldır titriyor. Henüz erken — bekle.' },
      { hat: 3, mesaj: 'Uyluk titriyor. Dürtüsel davranma.' },
      { hat: 4, mesaj: 'Doğru etki. Aklın gönülden onayı.' },
      { hat: 5, mesaj: 'Sırt etkisi. Derin ama küçük.' },
      { hat: 6, mesaj: 'Çene ve dil. Yüzeysel konuşma.' },
    ],
  },

  32: {
    no: 32, ad: 'Süreklilik', ceviri: 'Heng — Kalıcılık',
    sembol: '☳☴', ust: 'gok_gurultulu', alt: 'ruzgar',
    anahtar_kelime: 'Tutarlılık', tema: 'Büyük ağaçlar fırtınada bükülür ama kırılmaz',
    hd_kapisi: 32,
    psikolojik_oz: 'Uzun vadeli tutarlılık ve kimlik sürekliliği. Kişiliğin özü, stres altında bile devam eden örüntülerde görülür. Bu hekzagram, köklerine dönmeyi ve oradan hareket etmeyi hatırlatır.',
    durum_analizi: 'Devam et. Süreklilik, tutarlı küçük adımların birikmesinden oluşur.',
    golge: 'Ya rijit bir süreklilikte sıkışmış ya da tutarsız bir dağınıklık içinde.',
    olgun: 'Değişime adapte olurken özünü koruyor. Esnek ama köklü.',
    eylem: 'Bugün her gün yapmayı düşündüğün ama yapmadığın küçük bir alışkanlığı bir kez yap.',
    gozlem: 'Hayatında neyi tutarlı bir şekilde yapıyorsun? Bu alışkanlık seni nereye götürüyor?',
    hatlar: [
      { hat: 1, mesaj: 'Başta derin kök. Olgunlaşmadan kazılmış kök kopar.' },
      { hat: 2, mesaj: 'Pişmanlık geçiyor. Orta yolda kal.' },
      { hat: 3, mesaj: 'Karaktersizlik — her yöne. Utanç getirer.' },
      { hat: 4, mesaj: 'Av yok. Yanlış yerde arıyorsun.' },
      { hat: 5, mesaj: 'Erdem sürekli. Kadın için iyi, erkek için olumsuz.' },
      { hat: 6, mesaj: 'Yerinde duramıyor. Huzur yok.' },
    ],
  },

  33: {
    no: 33, ad: 'Çekilme', ceviri: 'Tun — Geri Çekilme',
    sembol: '☰☶', ust: 'gok', alt: 'dag',
    anahtar_kelime: 'Stratejik geri çekilme', tema: 'Geri çekilmek yenilgi değil, bilgeliktir',
    hd_kapisi: 33,
    psikolojik_oz: 'Sınır ve öz-koruma. Stratejik geri çekilme, güçsüzlük değil — enerjini korumanın en akıllıca biçimidir. Her savaşa girmeye gerek yoktur.',
    durum_analizi: 'Şu an geri çekilme zamanı. Enerjini koru, doğru anı bekle.',
    golge: 'Geri çekilmek başarısızlık gibi hissettiriyor. Gereksiz savaşlara giriyor.',
    olgun: 'Ne zaman geri çekileceğini biliyor. Bu karar güç gerektirir.',
    eylem: 'Bugün girmemen gereken bir tartışmadan ya da durumdan bilinçli olarak çekil.',
    gozlem: 'Son zamanlarda girmemen gereken ama girdiğin bir durum var mıydı?',
    hatlar: [
      { hat: 1, mesaj: 'Kuyruğunda tehlike. Hemen çekil.' },
      { hat: 2, mesaj: 'Sarı öküz derisi. Kimse tutamaz.' },
      { hat: 3, mesaj: 'Bağlılık içinde çekilme. Zorlu ama gerekli.' },
      { hat: 4, mesaj: 'Severek çekilme. Güçlünün seçimi.' },
      { hat: 5, mesaj: 'Güzelce çekilme. Doğru zamanda.' },
      { hat: 6, mesaj: 'Neşeyle çekilme. Hiçbir şüphe yok.' },
    ],
  },

  34: {
    no: 34, ad: 'Büyük Güç', ceviri: 'Ta Chuang — Ham Güç',
    sembol: '☳☰', ust: 'gok_gurultulu', alt: 'gok',
    anahtar_kelime: 'Güç & Sorumluluk', tema: 'Ham güç, olgunlukla birleşince gerçek güce dönüşür',
    hd_kapisi: 34,
    psikolojik_oz: 'Güç ve sorumluluk. Ham güç, olgunluk olmadan yıkar. Gerçek güç, kontrollü, bilinçli ve hizmet yönelimlidir.',
    durum_analizi: 'Büyük enerji var. Bu gücü nereye yönlendireceğini dikkatle seç.',
    golge: 'Gücünü göstermek için kullanıyor. Etki değil, ego tatmini.',
    olgun: 'Büyük gücünü sorumlulukla ve hizmetle kullanıyor.',
    eylem: 'Bugün gücünü bir şeyi inşa etmek için kullan — yıkmak için değil.',
    gozlem: 'Güçlü hissettiğinde ne yapıyorsun? Bu güç seni iyi biri yapıyor mu?',
    hatlar: [
      { hat: 1, mesaj: 'Ayak gücü. Yürüyüş güç. Ama aceleci.' },
      { hat: 2, mesaj: 'Sağlam zemin. İyi — ilerle.' },
      { hat: 3, mesaj: 'Küçük adam gücü kullanır. Büyük adam zamanı bekler.' },
      { hat: 4, mesaj: 'Engel açıldı. İlerle ama kibarca.' },
      { hat: 5, mesaj: 'Kolay kayıp. Pişmanlık yok.' },
      { hat: 6, mesaj: 'Koç takılıp kaldı. Geri de ileri de zor.' },
    ],
  },

  35: {
    no: 35, ad: 'İlerleme', ceviri: 'Chin — Yükseliş',
    sembol: '☲☷', ust: 'ates', alt: 'yer',
    anahtar_kelime: 'Görünürlük', tema: 'Güneş gibi yüksel — ama ısımayı unutma',
    hd_kapisi: 35,
    psikolojik_oz: 'Başarı ve görünürlük psikolojisi. Yükseliş, hem fırsat hem sorumluluk taşır. Başarı, ego tatminine dönüşürse tükenir; hizmet motivasyonuyla sürdürülebilir.',
    durum_analizi: 'İlerleme dönemi. Görünür ol — ama nedenini unutma.',
    golge: 'İlerlemeyi ego tatmini için kullanıyor. Ya da görünmekten korkuyor.',
    olgun: 'Yükselirken bağlantısını ve alçakgönüllülüğünü koruyor.',
    eylem: 'Bugün bir başarını paylaş — ama odağı kendin değil, o başarıyla birlikte kim büyüdüğü üzerine kur.',
    gozlem: 'İlerlemek istediğinde motivasyonun ne? Onay mı, büyüme mi?',
    hatlar: [
      { hat: 1, mesaj: 'İlerleme engellenmiş. Doğrulukla devam et.' },
      { hat: 2, mesaj: 'İlerleme ile üzüntü. Anne gibi güven.' },
      { hat: 3, mesaj: 'Herkes güveniyor. İlerle — pişmanlık yok.' },
      { hat: 4, mesaj: 'Fare gibi ilerleme. Dikkatli ol.' },
      { hat: 5, mesaj: 'Pişmanlık geçti. Kazan-kaybet umursamadan ilerle.' },
      { hat: 6, mesaj: 'Kente saldırma. Güç kullanırken dikkat.' },
    ],
  },

  36: {
    no: 36, ad: 'Işığın Karartılması', ceviri: 'Ming I — Gizlenme',
    sembol: '☷☲', ust: 'yer', alt: 'ates',
    anahtar_kelime: 'Gizli güç', tema: 'Karanlıkta bile ışığını koru',
    hd_kapisi: 36,
    psikolojik_oz: 'Adaptasyon ve iç güç. Dış baskı altında içsel bütünlüğünü korumak — uyum sağlamak ama özünü kaybetmemek. Bu örüntü, görünmeden güçlü olmayı öğretir.',
    durum_analizi: 'Şu an görünürlüğü azalt. İçini güçlendir, zamanını bekle.',
    golge: 'Baskı altında ya tamamen kapanıyor ya da öfkeyle tepki veriyor.',
    olgun: 'Baskı altında sessizce güçlü kalıyor. Zamanı gelince parlar.',
    eylem: 'Bugün bir şikâyetin yerine sessizce güçlenebileceğin bir şeyi yap.',
    gozlem: 'Tanınmadığında, görülmediğinde nasıl davranıyorsun?',
    hatlar: [
      { hat: 1, mesaj: 'Kanatlar inerken. Oruç tut, yolculuk uzun.' },
      { hat: 2, mesaj: 'Sol uylukta yara. Yardım et, kurtulursun.' },
      { hat: 3, mesaj: 'Güneyde avlanma. Sabır gerekir.' },
      { hat: 4, mesaj: 'Sol karna gir. Karanlığın kalbine.' },
      { hat: 5, mesaj: 'Prens karanlıkta. Sabit kal.' },
      { hat: 6, mesaj: 'Zirveye tırmanmak, yere inmek.' },
    ],
  },

  37: {
    no: 37, ad: 'Aile', ceviri: 'Chia Jen — Topluluk',
    sembol: '☴☲', ust: 'ruzgar', alt: 'ates',
    anahtar_kelime: 'Roller & Sorumluluk', tema: 'Sistem sağlıklıysa herkes büyür',
    hd_kapisi: 37,
    psikolojik_oz: 'Aile sistemi ve rol psikolojisi. Roller, kimliği tanımlamaz ama yapıyı oluşturur. Sağlıklı sistemde herkes kendi rolünde otantik biçimde var olur.',
    durum_analizi: 'Bulunduğun sistem ya da grupta rolün ne? Bunu bilinçle yaşıyor musun?',
    golge: 'Rolüne ya aşırı yapışmış ya da rolünden kaçıyor. İkisi de dengesizlik.',
    olgun: 'Rolünü bilinçle üstleniyor ama kimliği o rolle sınırlı değil.',
    eylem: 'Bugün bulunduğun bir sistemi (aile, iş, arkadaşlık) gözlemle — roller sağlıklı mı?',
    gozlem: 'Hangi rolde gerçekten kendini hissediyorsun, hangisinde performans sergiliyorsun?',
    hatlar: [
      { hat: 1, mesaj: 'Ev yasaları. Netlik güvenliği sağlar.' },
      { hat: 2, mesaj: 'Merkezde hizmet. Kendi işine bak.' },
      { hat: 3, mesaj: 'Aşırı katılık ya da zayıflık. Denge bul.' },
      { hat: 4, mesaj: 'Zengin ev. Bolluğa şükret.' },
      { hat: 5, mesaj: 'Kral gibi ev. Sev, endişelenme.' },
      { hat: 6, mesaj: 'Güven ve dürüstlük. Sonunda kazanır.' },
    ],
  },

  38: {
    no: 38, ad: 'Karşıtlık', ceviri: 'K\'uei — Ayrılık',
    sembol: '☲☱', ust: 'ates', alt: 'gol',
    anahtar_kelime: 'Farklılık & Bütünleşme', tema: 'Zıtlıklar birbirini yok etmez, tamamlar',
    hd_kapisi: 38,
    psikolojik_oz: 'Ayrılık ve entegrasyon. Karşıt görünen şeyler — yin/yang, ben/öteki — aslında birbirini tamamlar. Bu örüntü, farklılığı tehdit değil zenginlik olarak görmeyi öğretir.',
    durum_analizi: 'Bir çelişki ya da karşıtlık var. Hangisini seçeceğini değil, ikisini nasıl tutacağını düşün.',
    golge: 'Zıt kutuplar arasında parçalanmış hissediyor. Ya da her şeyi ya-ya olarak görüyor.',
    olgun: 'Zıtlıkları bütünleştirebiliyor. "Ve" diyebiliyor, "ya da" yerine.',
    eylem: 'Bugün iki zıt görüşü aynı anda doğru kabul etmeyi dene — nasıl hissettiriyor?',
    gozlem: 'Hayatında şu an en büyük iç çatışma nerede? Bu zıtlık sana ne öğretebilir?',
    hatlar: [
      { hat: 1, mesaj: 'Pişmanlık geçiyor. Atlar geri döner.' },
      { hat: 2, mesaj: 'Dönemeçte efendi. Beklenmedik buluşma.' },
      { hat: 3, mesaj: 'Arabam çekiliyor. Her şey zıt gidiyor. Devam et.' },
      { hat: 4, mesaj: 'Yalnız karşıtlık. İyi adam bulundu.' },
      { hat: 5, mesaj: 'Pişmanlık geçiyor. Atalarla ısırma.' },
      { hat: 6, mesaj: 'Yalnız karşıtlık. Domuzu görürsün, aslında insan.' },
    ],
  },

  39: {
    no: 39, ad: 'Engel', ceviri: 'Chien — Zorluk',
    sembol: '☵☶', ust: 'su', alt: 'dag',
    anahtar_kelime: 'Direniş & Büyüme', tema: 'Her engel bir sorudur',
    hd_kapisi: 39,
    psikolojik_oz: 'Engellerle ilişki ve büyüme zihniyeti. Engel, başarısızlık değil — bilgi verici bir direnç. "Bu engel bana ne söylüyor?" sorusu, büyüme zihniyetinin kapısını açar.',
    durum_analizi: 'Bir engelle karşı karşıyasın. Onu aşmaya değil, önce anlamaya çalış.',
    golge: 'Engeli kişisel saldırı veya başarısızlık olarak görüyor. Çaresiz ya da öfkeli.',
    olgun: 'Engelden bilgi çıkarıyor. "Bu ne söylüyor?" diye soruyor.',
    eylem: 'Şu an önündeki engeli bir soru olarak yaz: "Bu bana ne soruyor?"',
    gozlem: 'Tekrar eden engeller var mı hayatında? Bunlar sana ne anlatmaya çalışıyor?',
    hatlar: [
      { hat: 1, mesaj: 'İlerlemek sorun çıkarır. Bekle.' },
      { hat: 2, mesaj: 'Kral uğruna engel. Kendi hatam değil, devam.' },
      { hat: 3, mesaj: 'İlerle ve geri dön. Gidip gelmek gerekli.' },
      { hat: 4, mesaj: 'Beraber git. Birlik engeli aşar.' },
      { hat: 5, mesaj: 'Büyük engel. Ama arkadaşlar geliyor.' },
      { hat: 6, mesaj: 'Git ve dön. Büyük adam gelir.' },
    ],
  },

  40: {
    no: 40, ad: 'Kurtuluş', ceviri: 'Hsieh — Çözülme',
    sembol: '☳☵', ust: 'gok_gurultulu', alt: 'su',
    anahtar_kelime: 'Bırakma & Rahatlama', tema: 'Çözülme kendi başına bir eylemdir',
    hd_kapisi: 40,
    psikolojik_oz: 'Stres yönetimi ve bırakma kapasitesi. Gerilimin çözülmesi, aktif bir eylemdir — kendiliğinden olmaz. Neyi bırakman gerektiğini bilmek, olgunluğun işaretidir.',
    durum_analizi: 'Bir gerilim çözüldü ya da çözülmeye hazır. Bırak — tutma.',
    golge: 'Çözülme olsa bile tutunuyor. Ya da tam tersine çok kolay bırakıyor, gereken şeyleri de.',
    olgun: 'Neyi bırakıp neyi tutacağını biliyor. Çözülme bilinçli.',
    eylem: 'Bugün bir gerilimi, kırgınlığı ya da beklentiyi bilinçli olarak bırak.',
    gozlem: 'Şu an içinde taşıdığın ama bırakabileceğin bir şey ne?',
    hatlar: [
      { hat: 1, mesaj: 'Hata yok. Dinlen.' },
      { hat: 2, mesaj: 'Üç tilki avla. Yanlış olanı temizle.' },
      { hat: 3, mesaj: 'Yük taşıyan araba. Kibir hırsızları çeker.' },
      { hat: 4, mesaj: 'Baş parmağı kur. Yanlışlardan uzaklaş.' },
      { hat: 5, mesaj: 'Kendini kurtar. Küçük adam gider.' },
      { hat: 6, mesaj: 'Prens okla vurur. Kalesinden kaldırır.' },
    ],
  },

  41: {
    no: 41, ad: 'Azalma', ceviri: 'Sun — Eksiltme',
    sembol: '☶☱', ust: 'dag', alt: 'gol',
    anahtar_kelime: 'Sadeleşme', tema: 'Daha az, daha fazladır',
    hd_kapisi: 41,
    psikolojik_oz: 'Minimalizm ve öz-disiplin psikolojisi. Azaltmak — beklentileri, sahip olduklarını, talepleri — gelişim için alan açar. Gereksizi bırakmak, özü ortaya çıkarır.',
    durum_analizi: 'Azaltma zamanı. Neyi bırakırsan daha hafif ilerlersin?',
    golge: 'Azaltmayı kayıp olarak görüyor. Ya da aşırı fedakârlıkla kendini boşaltıyor.',
    olgun: 'Neyin gereksiz olduğunu fark ediyor ve bilinçli olarak bırakıyor.',
    eylem: 'Bugün hayatından bir şeyi çıkar — dijital, fiziksel veya alışkanlık.',
    gozlem: 'Hayatında fazlalık olarak gördüğün ama bırakamadığın şey ne?',
    hatlar: [
      { hat: 1, mesaj: 'İşi bırak, hızlıca git. Ama ne kadar azaltacaksın?.' },
      { hat: 2, mesaj: 'Azaltmak doğruysa devam et.' },
      { hat: 3, mesaj: 'Üç kişi yürür, biri ayrılır. Dengeye gelir.' },
      { hat: 4, mesaj: 'Hastalığı azalt. Mutluluk gelir.' },
      { hat: 5, mesaj: 'On kat artırma hediyesi. Kaçmaz.' },
      { hat: 6, mesaj: 'Azaltma yok. Artırma zamanı. Hizmetkâr değil.' },
    ],
  },

  42: {
    no: 42, ad: 'Artış', ceviri: 'I — Artma',
    sembol: '☴☳', ust: 'ruzgar', alt: 'gok_gurultulu',
    anahtar_kelime: 'Büyüme & Fırsat', tema: 'Fırsat penceresi açık — geç kalma',
    hd_kapisi: 42,
    psikolojik_oz: 'Büyüme zihniyeti ve fırsat penceresi. Bu nadir bir açılım anıdır. Hem kişisel hem toplumsal büyüme için en uygun zaman. Cömertlik bu dönemde katlanarak geri döner.',
    durum_analizi: 'Büyüme ve artış için olgunlaşmış bir an. Harekete geç.',
    golge: 'Fırsatı görmüyor ya da görkeme kapılıp aşırıya gidiyor.',
    olgun: 'Fırsatı fark ediyor, bilinçle ve cömertlikle değerlendiriyor.',
    eylem: 'Bugün büyüme için somut bir adım at — öğren, uygula, paylaş.',
    gozlem: 'Şu an hangi büyüme fırsatını erteleyip duruyorsun?',
    hatlar: [
      { hat: 1, mesaj: 'Büyük işe girişmek için iyi zaman.' },
      { hat: 2, mesaj: 'On kat artış. Tanrısal onay.' },
      { hat: 3, mesaj: 'Kötüden artış. Dürüstlükle kazan.' },
      { hat: 4, mesaj: 'Ortada yürü. Güvenilir ol.' },
      { hat: 5, mesaj: 'Cömert kalp. Sorumsun.' },
      { hat: 6, mesaj: 'Kimse artırmıyor. Darbe geliyor.' },
    ],
  },

  43: {
    no: 43, ad: 'Karar', ceviri: 'Kuai — Çözüm',
    sembol: '☱☰', ust: 'gol', alt: 'gok',
    anahtar_kelime: 'Netlik & Kararlılık', tema: 'Karar ertelendikçe ağırlaşır',
    hd_kapisi: 43,
    psikolojik_oz: 'Karar alma psikolojisi ve belirsizlik toleransı. Ertelenen karar, belirsizliği uzatır ve enerji tüketir. Yanlış da olsa, bilinçli bir karar hareketi sağlar.',
    durum_analizi: 'Ertelediğin bir karar var. Mükemmel değil ama yeterince iyi bir karar al.',
    golge: 'Karar almaktan korkuyor — analiz felci. Ya da dürtüsel, düşünmeden karar veriyor.',
    olgun: 'Gerekli bilgilerle, zamanlıca ve kararlılıkla karar alıyor.',
    eylem: 'Bugün ertelediğin küçük bir kararı ver — şimdi.',
    gozlem: 'Karar almakta en çok ne seni engelliyor — bilgi eksikliği mi, korku mu?',
    hatlar: [
      { hat: 1, mesaj: 'İlk adımda güç. Ama hata olabilir.' },
      { hat: 2, mesaj: 'Hazırlıklı alarm. Gece bile.' },
      { hat: 3, mesaj: 'Yüzde karar. Zorlu ama doğru.' },
      { hat: 4, mesaj: 'Kalça yürüyüşü. İlerleyemiyor. Sabır.' },
      { hat: 5, mesaj: 'Yabani ot kararlılığı. Orta yolda devam.' },
      { hat: 6, mesaj: 'Ses yok. Tehlike.' },
    ],
  },

  44: {
    no: 44, ad: 'Buluşma', ceviri: 'Kou — Karşılaşma',
    sembol: '☰☴', ust: 'gok', alt: 'ruzgar',
    anahtar_kelime: 'Uyarı & Farkındalık', tema: 'Küçük şeyler büyük etki yaratır',
    hd_kapisi: 44,
    psikolojik_oz: 'Farkındalık ve erken uyarı. Küçük işaretleri erken fark etmek — ilişkide, sağlıkta, işte — büyük krizleri önler. Bu örüntü, dikkatli gözlemin değerini vurgular.',
    durum_analizi: 'Küçük bir şey dikkatini çekiyor. Büyütme ama görmezden de gelme — gözlemle.',
    golge: 'Erken uyarıları görmezden geliyor. Küçük sorunlar büyüyünce şaşırıyor.',
    olgun: 'Küçük sinyalleri erkenden fark ediyor ve gerekli önlemleri alıyor.',
    eylem: 'Bugün hayatında küçük ama dikkatini çeken bir şeyi not al.',
    gozlem: 'Son zamanlarda görmezden geldiğin ama içinde bildiğin bir şey var mı?',
    hatlar: [
      { hat: 1, mesaj: 'Demir engel. Küçük şeyi kısıtla.' },
      { hat: 2, mesaj: 'Balık var. Misafir yok. Kontrol et.' },
      { hat: 3, mesaj: 'Kalça yürümüyor. Tehlike yok ama dikkat.' },
      { hat: 4, mesaj: 'Balık yok. Kötüye gidiyor.' },
      { hat: 5, mesaj: 'Kavak melon. Gizli güzellik.' },
      { hat: 6, mesaj: 'Boynuzdan temas. Utanç ama hata değil.' },
    ],
  },

  45: {
    no: 45, ad: 'Toplanma', ceviri: 'Ts\'ui — Birleşme',
    sembol: '☱☷', ust: 'gol', alt: 'yer',
    anahtar_kelime: 'Topluluk & Amaç', tema: 'Güçlü topluluk ortak amaçla kurulur',
    hd_kapisi: 45,
    psikolojik_oz: 'Ortak amaç ve liderlik. İnsanlar güçlü bir "neden" etrafında toplanır. Bu örüntü, liderin hem ilham hem de yapı sağlaması gerektiğini hatırlatır.',
    durum_analizi: 'Bir araya gelme, birleşme zamanı. Ortak amaç netleşsin.',
    golge: 'Topluluğu kontrol etmek için kullanıyor. Ya da topluluktan kopuk, yalnız.',
    olgun: 'Ortak amaç etrafında insanları birleştiriyor. Hizmetle lider oluyor.',
    eylem: 'Bugün ortak bir amaç için birini yanına çağır.',
    gozlem: 'Hangi topluluklarda gerçekten ait hissediyorsun?',
    hatlar: [
      { hat: 1, mesaj: 'Güven yok ama devam. Karmaşa geçer.' },
      { hat: 2, mesaj: 'Çekilme. Şans geliyor.' },
      { hat: 3, mesaj: 'Toplanamıyor. Küçük utanç ama ilerle.' },
      { hat: 4, mesaj: 'Büyük iyilik. Şüphe yok.' },
      { hat: 5, mesaj: 'Konum gücü. Pişmanlık yok.' },
      { hat: 6, mesaj: 'Ağlama. Hata değil, geçecek.' },
    ],
  },

  46: {
    no: 46, ad: 'İtme', ceviri: 'Sheng — Yükseliş',
    sembol: '☷☴', ust: 'yer', alt: 'ruzgar',
    anahtar_kelime: 'Sessiz yükseliş', tema: 'Gürültüsüz ama kararlı ilerleyiş',
    hd_kapisi: 46,
    psikolojik_oz: 'Öz-yeterlik ve kararlı ilerleme. Gerçek yükseliş, gösteriş değil — tutarlı, mütevazı, kararlı adımlardır. Dış onayı beklemeden ilerlemek olgunluktur.',
    durum_analizi: 'Sessizce ama kararlı ilerle. Onay bekleme — devam et.',
    golge: 'Onay beklemeden ilerliyemiyor. Ya da aşırı sert, başkalarını eziyor.',
    olgun: 'Onay olmadan da ilerliyor. Mütevazı, kararlı, sürdürülebilir.',
    eylem: 'Bugün kimsenin görmediği bir alanda ilerleme yap — sadece kendin için.',
    gozlem: 'Onay almadan ilerlediğinde nasıl hissediyorsun?',
    hatlar: [
      { hat: 1, mesaj: 'Karşılama yükselişi. İyi başlangıç.' },
      { hat: 2, mesaj: 'Sadakatla sunum. Gerçek olursa iyi.' },
      { hat: 3, mesaj: 'Boş şehre giriş. Engelsiz ilerleme.' },
      { hat: 4, mesaj: 'Krala sunum. Onurlu iş.' },
      { hat: 5, mesaj: 'Adım adım yüksel. Devam et.' },
      { hat: 6, mesaj: 'Karanlıkta yükseliş. Dur, değerlendir.' },
    ],
  },

  47: {
    no: 47, ad: 'Tükenme', ceviri: 'K\'un — Baskı',
    sembol: '☱☵', ust: 'gol', alt: 'su',
    anahtar_kelime: 'Dayanıklılık', tema: 'Bu da geçer — ama geçerken öğret',
    hd_kapisi: 47,
    psikolojik_oz: 'Tükenmişlik ve anlam arayışı. Tükenme, değerlerin ihlal edildiğinin sinyalidir. Ne için tükendiğini anlamak, neyin değişmesi gerektiğini gösterir.',
    durum_analizi: 'Tükenmişlik var. Bir şeyleri bırakmanın ya da değiştirmenin zamanı.',
    golge: 'Tükenmeyi görmezden geliyor. Ya da tükenmişliği kronik olarak normalleştiriyor.',
    olgun: 'Tükenmişliği bir sinyal olarak okuyor. Neyin değişmesi gerektiğini soruyor.',
    eylem: 'Bugün seni tüketen bir şeyi adlandır — değiştirilebilir mi, değiştirilemez mi?',
    gozlem: 'Ne seni en çok tüketiyor? Bu tükenme sana ne söylüyor?',
    hatlar: [
      { hat: 1, mesaj: 'Ağaç dibinde. Karanlık ve yalnız. Geçecek.' },
      { hat: 2, mesaj: 'İçki ve yiyecekle baskı. Kızıl geliyor.' },
      { hat: 3, mesaj: 'Taşa baskı. Evde dikenler. Boş çaba.' },
      { hat: 4, mesaj: 'Altın arabada baskı. Yavaş ama ilerliyor.' },
      { hat: 5, mesaj: 'Burun ve ayak kesimi. Yavaş yavaş gelecek.' },
      { hat: 6, mesaj: 'Sarmaşıkla baskı. Hareket et — değişecek.' },
    ],
  },

  48: {
    no: 48, ad: 'Kuyu', ceviri: 'Ching — Kaynak',
    sembol: '☵☴', ust: 'su', alt: 'ruzgar',
    anahtar_kelime: 'Derin kaynak', tema: 'Kuyu değişmez ama kovayı taşımak gerekir',
    hd_kapisi: 48,
    psikolojik_oz: 'İçsel kaynaklar ve potansiyel. Kişi çoğunlukla ne kadar derin kaynaklara sahip olduğunu bilmez. Bu örüntü, keşfedilmemiş yetkinliklere dönmeyi ve onları dünyayla paylaşmayı çağırır.',
    durum_analizi: 'İçinde derin bir kaynak var. Yeterince ulaşıyor musun ona?',
    golge: 'Potansiyelinin farkında değil ya da erişemiyor. Kaynak var ama kova yok.',
    olgun: 'İçsel kaynağına düzenli olarak ulaşıyor ve onu paylaşıyor.',
    eylem: 'Bugün içinde var olduğunu bildiğin ama paylaşmadığın bir kaynağı biriyle paylaş.',
    gozlem: 'Hangi yeteneklerin ya da bilgin henüz tam anlamıyla kullanılmıyor?',
    hatlar: [
      { hat: 1, mesaj: 'Çamurlu kuyu. Eski, terk edilmiş. Temizle.' },
      { hat: 2, mesaj: 'Balık için kuyu. Potansiyel kullanılmıyor.' },
      { hat: 3, mesaj: 'Temizlenmiş kuyu. Ama kimse kullanmıyor. Paylaş.' },
      { hat: 4, mesaj: 'Astarlanan kuyu. Hazırlık dönemi.' },
      { hat: 5, mesaj: 'Soğuk kaynak. Kullanılıyor.' },
      { hat: 6, mesaj: 'Açık kuyu. Herkes içiyor. Cömertlik.' },
    ],
  },

  49: {
    no: 49, ad: 'Devrim', ceviri: 'Ko — Dönüşüm',
    sembol: '☱☲', ust: 'gol', alt: 'ates',
    anahtar_kelime: 'Köklü değişim', tema: 'Gerçek devrim içeriden başlar',
    hd_kapisi: 49,
    psikolojik_oz: 'Köklü değişim ve kimlik dönüşümü. Gerçek değişim, dışarıdan değil — içeriden gelir. Eski kimlik örüntüleri bazen yıkılmadan yenisi inşa edilemez.',
    durum_analizi: 'Köklü bir değişim vakti. Eskiyi tutmak değil, dönüşüme izin vermek.',
    golge: 'Değişime direniyor ya da çok sık "devrim" yaparak istikrarsızlaşıyor.',
    olgun: 'Doğru zamanda, derin bir değişimi kararlılıkla gerçekleştiriyor.',
    eylem: 'Artık işe yaramayan ama hâlâ sürdürdüğün bir şeyi bugün değiştir.',
    gozlem: 'Hayatında hangi köklü değişimi erteliyorsun? Neden?',
    hatlar: [
      { hat: 1, mesaj: 'Sarı öküz derisi. Bekle. Henüz değil.' },
      { hat: 2, mesaj: 'Gün ortasında devrim. Tam zamanı.' },
      { hat: 3, mesaj: 'Felaket. Sabırsız devrim tehlikeli.' },
      { hat: 4, mesaj: 'Pişmanlık geçti. Güven var.' },
      { hat: 5, mesaj: 'Büyük adam kaplan. Kesinlik olmadan da inanılır.' },
      { hat: 6, mesaj: 'Büyük adam leopar. Küçük adam yüz değiştirir.' },
    ],
  },

  50: {
    no: 50, ad: 'Kazan', ceviri: 'Ting — Dönüşüm',
    sembol: '☲☴', ust: 'ates', alt: 'ruzgar',
    anahtar_kelime: 'Dönüşüm kabı', tema: 'Ham olan pişer ve değişir',
    hd_kapisi: 50,
    psikolojik_oz: 'Değerlerin taşıyıcısı olma. Tıpkı bir kazan gibi — ham olanı alır, ısıyla dönüştürür. Gelenekten gelen değerleri koruyarak, onları günümüzde anlamlı kılma sorumluluğu.',
    durum_analizi: 'Değerleri aktarma ve koruma zamanı. Ne taşıyorsun, ne bırakıyorsun?',
    golge: 'Geleneklere körü körüne bağlı ya da hepsini reddediyor.',
    olgun: 'Değerli olanı seçerek koruyor, işlevsizi bırakıyor. Köprü kuruyor.',
    eylem: 'Bugün bir büyüğünden öğrendiğin değerli bir şeyi hatırla ve birine aktar.',
    gozlem: 'Senden sonra ne bırakmak istiyorsun? Bu değerle şu an tutarlı mısın?',
    hatlar: [
      { hat: 1, mesaj: 'Kazanı ters çevir. Eski temizlendi, yeni için hazır.' },
      { hat: 2, mesaj: 'Kazan dolu. Korunuyor.' },
      { hat: 3, mesaj: 'Kazan kulpu bozuk. Henüz kullanılmıyor.' },
      { hat: 4, mesaj: 'Kazan devrildi. Ciddi hata.' },
      { hat: 5, mesaj: 'Sarı kulp. Değerli içerik.' },
      { hat: 6, mesaj: 'Altın kulp. En yüksek değer.' },
    ],
  },

  51: {
    no: 51, ad: 'Sarsıntı', ceviri: 'Chen — Gök Gürültüsü',
    sembol: '☳☳', ust: 'gok_gurultulu', alt: 'gok_gurultulu',
    anahtar_kelime: 'Şok & Uyanış', tema: 'Gök gürültüsü korkutur ama toprağı besler',
    hd_kapisi: 51,
    psikolojik_oz: 'Travma ve dirençlilik. Ani şoklar — kayıp, kriz, beklenmedik değişim — sistemi sarsarken aynı zamanda yeniden yapılanma için fırsat yaratır. Şok sonrası anlam arayışı, iyileşmenin özüdür.',
    durum_analizi: 'Bir sarsıntı yaşandı ya da yaşanıyor. Paniklemeden gözlemle — bu geçecek.',
    golge: 'Şoka donup kalıyor ya da aşırı tepki veriyor. Panik veya inkâr.',
    olgun: 'Şoku bir uyanış fırsatı olarak görüyor. Sarsılıyor ama yıkılmıyor.',
    eylem: 'Son yaşadığın sarsıntıdan öğrendiğin şeyi yaz.',
    gozlem: 'Hangi beklenmedik değişim seni en çok büyüttü? Neden?',
    hatlar: [
      { hat: 1, mesaj: 'Gök gürültüsü geliyor. Korku, sonra kahkaha.' },
      { hat: 2, mesaj: 'Tehlike — değerleri bırak, kaç. Geri dönersin.' },
      { hat: 3, mesaj: 'Sarsıntı harekete geçirir. Dur ve düşün.' },
      { hat: 4, mesaj: 'Çamurda sarsıntı. İlerleyemiyor.' },
      { hat: 5, mesaj: 'Tekrar tekrar sarsıntı. Dikkat. Kayıp yok.' },
      { hat: 6, mesaj: 'Kafanda sarsıntı. Başkasını etkileme, koru kendini.' },
    ],
  },

  52: {
    no: 52, ad: 'Hareketsizlik', ceviri: 'Ken — Dağ',
    sembol: '☶☶', ust: 'dag', alt: 'dag',
    anahtar_kelime: 'Sessizlik & Dinginlik', tema: 'Hareketsizlik eylem yokluğu değildir',
    hd_kapisi: 52,
    psikolojik_oz: 'Mindfulness ve mevcudiyet. Zihin durmak istemez. Ama durmayı öğrenmek — gerçek anlamda, düşünceye kapılmadan — en temel psikolojik beceridir.',
    durum_analizi: 'Dur. Şu an için — sadece şu an. Düşünme, gözlemle.',
    golge: 'Durmayı beceremiyor — sürekli hareket, düşünce, planlama. Ya da tam tersi: donup kalmış.',
    olgun: 'İstediğinde durabilyor. Sessizlikte rahat.',
    eylem: 'Bugün 5 dakika gerçekten dur — telefon, düşünce, plan yok. Sadece ol.',
    gozlem: 'Son ne zaman gerçekten durdun, hiçbir şey yapmadan?',
    hatlar: [
      { hat: 1, mesaj: 'Ayakta dur. Başlangıçta hareketsizlik en iyisi.' },
      { hat: 2, mesaj: 'Baldırda dur. Gövde hareket ediyor. Zor.' },
      { hat: 3, mesaj: 'Kalçada dur. Tehlikeli. Sırt ısıtılıyor.' },
      { hat: 4, mesaj: 'Gövdede dur. Hata yok.' },
      { hat: 5, mesaj: 'Çenede dur. Sözler sıralı. Pişmanlık gider.' },
      { hat: 6, mesaj: 'Asil hareketsizlik. İyi.' },
    ],
  },

  53: {
    no: 53, ad: 'Kademeli İlerleme', ceviri: 'Chien — Yavaş Gelişme',
    sembol: '☴☶', ust: 'ruzgar', alt: 'dag',
    anahtar_kelime: 'Organik büyüme', tema: 'Kaz adım adım uçmayı öğrenir',
    hd_kapisi: 53,
    psikolojik_oz: 'Sabır ve süreç odaklılık. Organik büyüme, zorlamayla olmaz. Tıpkı ağacın yavaş kökleşmesi gibi — her adım gereklidir. Atlanan basamaklar, ileride çöken temel olur.',
    durum_analizi: 'Acele etme. Her basamağı yaşa — bu sürecin bir parçası.',
    golge: 'Süreci atlıyor. Sonucu çok istiyor, adımları küçümsüyor.',
    olgun: 'Her adımın değerini biliyor. Süreçten keyif alıyor.',
    eylem: 'Bugün bir sonucu değil, süreci takdir et — ne öğrendiğine odaklan.',
    gozlem: 'Hangi alanda sabırsızlanıp basamak atladın? Nasıl sonuçlandı?',
    hatlar: [
      { hat: 1, mesaj: 'Kaz kıyıya geliyor. Çocuk tehlikede ama hata yok.' },
      { hat: 2, mesaj: 'Kaz kayaya konuyor. Yemek ve içki.' },
      { hat: 3, mesaj: 'Kaz kuru yere gidiyor. Eşkıya ve kadın hamile.' },
      { hat: 4, mesaj: 'Kaz ağaca konuyor. Düz dal bulur.' },
      { hat: 5, mesaj: 'Kaz tepeye konuyor. Üç yıl sonra buluşma.' },
      { hat: 6, mesaj: 'Kaz göğe çıkıyor. Tüyleri törenlik olur.' },
    ],
  },

  54: {
    no: 54, ad: 'Evlenen Kız', ceviri: 'Kuei Mei — Geçiş',
    sembol: '☳☱', ust: 'gok_gurultulu', alt: 'gol',
    anahtar_kelime: 'Uygun konum', tema: 'Doğru yerde, doğru rol',
    hd_kapisi: 54,
    psikolojik_oz: 'Rol uyumu ve statü kaygısı. Kişi ne zaman ikincil konumda olmayı kabul edebilir? Bu örüntü, ego değil — konumun gereğini kabul etmeyi öğretir.',
    durum_analizi: 'Şu an ikincil bir konumdasın. Bu kalıcı değil — ama şimdi gerekli.',
    golge: 'İkincil rolü kabullenemeden çırpınıyor. Tanınmak için çabalıyor.',
    olgun: 'Şu anki konumu kabulleniyor. Zamanı gelince adımı atacağını biliyor.',
    eylem: 'Bugün bir alanda "baş olmayan" rolü bilinçle üstlen.',
    gozlem: 'İkinci planda olmak seni ne zaman rahatsız ediyor? Bu his ne anlatıyor?',
    hatlar: [
      { hat: 1, mesaj: 'Gelinin hizmetçisi. Topal ilerler ama ilerler.' },
      { hat: 2, mesaj: 'Tek gözlü görür. Sadakat önemli.' },
      { hat: 3, mesaj: 'Beklenti geri döner. Uygun rol.' },
      { hat: 4, mesaj: 'Geç evlenme. Doğru zamanı bekle.' },
      { hat: 5, mesaj: 'Sade gelin. Güzellik gösterişten değil içtenlikten.' },
      { hat: 6, mesaj: 'Boş sepet. Boş ritüel. Anlamsız.' },
    ],
  },

  55: {
    no: 55, ad: 'Bolluk', ceviri: 'Feng — Doruk',
    sembol: '☳☲', ust: 'gok_gurultulu', alt: 'ates',
    anahtar_kelime: 'Doruk noktası', tema: 'Her zirvenin ardından iniş gelir — bunu bil',
    hd_kapisi: 55,
    psikolojik_oz: 'Başarı ve kaybetme korkusu. Zirveye ulaşmak hem sevinç hem kaygı getirir. "Bunu kaybedeceğim" korkusu, en parlak anları gölgeleyebilir.',
    durum_analizi: 'Parlak bir dönemdesin. Tam anlamıyla yaşa — ne kadar süreceğini düşünme.',
    golge: 'Zirvedeyken kaybetme korkusuyla yaşıyor. Ya da bolluğu paylaşmıyor.',
    olgun: 'Bollukta tam anlamıyla var. Paylaşıyor ve minnettar.',
    eylem: 'Bugün sahip olduğun bolluğun bir parçasını paylaş.',
    gozlem: 'İyi şeyler yaşadığında "bu gidecek" diye düşünüyor musun?',
    hatlar: [
      { hat: 1, mesaj: 'On gün. Köklü birliktelik. Hata yok.' },
      { hat: 2, mesaj: 'Perdeli güneş. Güven onunla gider.' },
      { hat: 3, mesaj: 'Tam perde. Küçük şeyler bile görülmez.' },
      { hat: 4, mesaj: 'Yarım perde. Efendi buluşuyor.' },
      { hat: 5, mesaj: 'Güzellik geliyor. Kutlu.' },
      { hat: 6, mesaj: 'Ev büyüdü, kapı yok. Kimse yok. Üç yıl.' },
    ],
  },

  56: {
    no: 56, ad: 'Yolcu', ceviri: 'Lü — Gezgin',
    sembol: '☲☶', ust: 'ates', alt: 'dag',
    anahtar_kelime: 'Geçicilik', tema: 'Her yerde evinde ol — ama her yere bağlanma',
    hd_kapisi: 56,
    psikolojik_oz: 'Aidiyet ve bağımsızlık. Yolcu olmanın psikolojisi — her yerde var olmak ama hiçbir yere fazla bağlanmamak. Bu, hem özgürlük hem yalnızlık taşır.',
    durum_analizi: 'Geçici bir konumdasın. Uyum sağla ama köklenmek zorunda değilsin.',
    golge: 'Ya her yerde yabancı hissediyor ya da geçici konumlara aşırı bağlanıyor.',
    olgun: 'Her ortamda esnek ve uyumlu. Geçiciliği ile barışık.',
    eylem: 'Bugün yabancı bir ortamda tam anlamıyla var olmayı dene.',
    gozlem: 'Hayatında nerede "yolcu" gibi hissediyorsun? Bu his sana ne söylüyor?',
    hatlar: [
      { hat: 1, mesaj: 'Küçük şeylerle uğraşan yolcu. Felaketi çağırır.' },
      { hat: 2, mesaj: 'Konaklama ve para. Sadık hizmet.' },
      { hat: 3, mesaj: 'Yangın. Sadık hizmetçiyi kaybetti.' },
      { hat: 4, mesaj: 'Barınak ve para. Ama hâlâ huzursuz.' },
      { hat: 5, mesaj: 'Ok atıldı. Mevki kazanıldı.' },
      { hat: 6, mesaj: 'Yuvayı yakar. Güler, ağlar. Dikkat.' },
    ],
  },

  57: {
    no: 57, ad: 'Yumuşaklık', ceviri: 'Sun — Rüzgar',
    sembol: '☴☴', ust: 'ruzgar', alt: 'ruzgar',
    anahtar_kelime: 'İnce etki', tema: 'Rüzgar kayayı aniden kırmaz — zamanla şekillendirir',
    hd_kapisi: 57,
    psikolojik_oz: 'İnce farkındalık ve sezgi. Sezgi, mantıktan önce gelir. Bu örüntü, her zaman açık ve yumuşak bir dikkat halininde bulunmayı, hem iç sesleri hem dış sinyalleri algılamayı öğretir.',
    durum_analizi: 'Yumuşak, açık, dikkatli bir hal zamanı. Sezgilerine güven.',
    golge: 'Sezgiyi görmezden geliyor. Ya da aşırı sezgiye güvenerek mantığı ihmal ediyor.',
    olgun: 'Sezgi ve mantığı dengeli kullanıyor. İnce sinyallere açık.',
    eylem: 'Bugün bir kararında sezgini dinle — mantığı sustur, ne geliyor?',
    gozlem: 'Son ne zaman sezgini dinledin ve sonuç iyi oldu? Son ne zaman dinlemedin ve pişman oldun?',
    hatlar: [
      { hat: 1, mesaj: 'İlerle geri çekil. Savaşçı disiplinle.' },
      { hat: 2, mesaj: 'Yatağın altında. Gizli güç. Rahiplerle danış.' },
      { hat: 3, mesaj: 'Tekrar tekrar nüfuz. Utanç.' },
      { hat: 4, mesaj: 'Pişmanlık yok. Üç av.' },
      { hat: 5, mesaj: 'Doğru tutmak iyi. Başlangıç yanlış, son iyi.' },
      { hat: 6, mesaj: 'Yatağın altına. Her şeyi kaybetti.' },
    ],
  },

  58: {
    no: 58, ad: 'Neşe', ceviri: 'Tui — Keyif',
    sembol: '☱☱', ust: 'gol', alt: 'gol',
    anahtar_kelime: 'Gerçek sevinç', tema: 'Gerçek neşe içeriden gelir',
    hd_kapisi: 58,
    psikolojik_oz: 'Özgün sevinç ve haz düzenleme. Dışarıdan sağlanan sevinç geçici, içeriden gelen kalıcıdır. Kronik "eğlenceli" görünme çabası, asıl neşeden uzaklaşmış olmanın işareti olabilir.',
    durum_analizi: 'Gerçek bir sevinç anı. Tam olarak yaşa — performatif değil.',
    golge: 'Neşeyi performatif olarak sunuyor ya da gerçek neşeye ulaşamıyor.',
    olgun: 'İçten gelen gerçek sevinç anlarını fark ediyor ve tam anlamıyla yaşıyor.',
    eylem: 'Bugün seni gerçekten güldüren bir şey yap — izleyici olmadan.',
    gozlem: 'Son gerçek, performatif olmayan neşeni ne zaman yaşadın?',
    hatlar: [
      { hat: 1, mesaj: 'Uyumlu neşe. Güzel.' },
      { hat: 2, mesaj: 'İçten neşe. İyi.' },
      { hat: 3, mesaj: 'Gelen neşe. Bağımlılık — dikkat.' },
      { hat: 4, mesaj: 'Müzakere edilen neşe. Huzur var.' },
      { hat: 5, mesaj: 'Çürüyen neşe. Tehlikeli.' },
      { hat: 6, mesaj: 'Çekilen neşe. Manipülasyon.' },
    ],
  },

  59: {
    no: 59, ad: 'Dağılma', ceviri: 'Huan — Çözülme',
    sembol: '☴☵', ust: 'ruzgar', alt: 'su',
    anahtar_kelime: 'Engelleri eritme', tema: 'Katılık çözülünce akış başlar',
    hd_kapisi: 59,
    psikolojik_oz: 'Savunma mekanizmalarının çözülmesi. Kronik savunma, korumak yerine hapseder. Bu örüntü, duvarların içinde de bir hapishane oluştuğunu hatırlatır.',
    durum_analizi: 'Duvarlarını biraz indir. Savunma şu an gerekli mi?',
    golge: 'Duvarlar çok kalın. Bağlantı kuramıyor, savunmacı.',
    olgun: 'Güvenli hissettiğinde açılabiliyor. Seçici şeffaflık.',
    eylem: 'Bugün koruduğun bir şeyi biriyle paylaş — küçük ama gerçek.',
    gozlem: 'Hangi konularda en çok duvar örüyorsun? Bu duvarlar seni gerçekten koruyor mu?',
    hatlar: [
      { hat: 1, mesaj: 'Güçlü at ile kurtar. Başlangıçta destek şart.' },
      { hat: 2, mesaj: 'Masaya koş. Pişmanlık gider.' },
      { hat: 3, mesaj: 'Kendilik dağılıyor. Hata yok.' },
      { hat: 4, mesaj: 'Topluluk dağıtma. Büyük düşün.' },
      { hat: 5, mesaj: 'Güçlü buyruk. Kral gibi yönet.' },
      { hat: 6, mesaj: 'Kan ve uzaklık. Hata yok.' },
    ],
  },

  60: {
    no: 60, ad: 'Kısıtlama', ceviri: 'Chieh — Sınır',
    sembol: '☵☱', ust: 'su', alt: 'gol',
    anahtar_kelime: 'Bilinçli sınır', tema: 'Sınır hapsetmez — özgürleştirir',
    hd_kapisi: 60,
    psikolojik_oz: 'Sınır koyma psikolojisi. Sınırlar, diğerlerini dışlamak için değil — kendini korumak ve ihtiyaçlarını karşılamak için kurulur. Sınırsız alan, özgürlük değil kaos yaratır.',
    durum_analizi: 'Bir sınır koyma zamanı. Ne için "hayır" demek istiyorsun?',
    golge: 'Ya hiç sınır koyamıyor ya da aşırı katı sınırlarla herkesi uzaklaştırıyor.',
    olgun: 'Esnek ama tutarlı sınırlar koyabiliyor. "Hayır" diyebiliyor.',
    eylem: 'Bugün bir şeye "hayır" de — ve açıklamak zorunda olmadığını bil.',
    gozlem: 'Sınır koyduğunda ne hissediyorsun — suçluluk mu, güç mü?',
    hatlar: [
      { hat: 1, mesaj: 'Kapı dışarı çıkmaz. Şimdi kısıtla. Hata yok.' },
      { hat: 2, mesaj: 'Kapıdan çıkma. Geç kaldın. Felaket.' },
      { hat: 3, mesaj: 'Kısıtlama yok. Ağlama olacak.' },
      { hat: 4, mesaj: 'Sakin kısıtlama. İyi.' },
      { hat: 5, mesaj: 'Tatlı kısıtlama. İlerleme.' },
      { hat: 6, mesaj: 'Acı kısıtlama. İyi başlangıç değil.' },
    ],
  },

  61: {
    no: 61, ad: 'İç Gerçek', ceviri: 'Chung Fu — İçsel Dürüstlük',
    sembol: '☴☱', ust: 'ruzgar', alt: 'gol',
    anahtar_kelime: 'Özgünlük', tema: 'İç ile dış aynı olduğunda güven doğar',
    hd_kapisi: 61,
    psikolojik_oz: 'Özgünlük ve içsel dürüstlük. İç ile dışın uyumu — söylediğin, hissettiğin ve yaptığın arasındaki tutarlılık — en derin güven formudur. Bu tutarlılık olmadan etki yüzeysel kalır.',
    durum_analizi: 'İçindeki gerçeği yaşa. Performatif değil, otantik ol.',
    golge: 'Dışarıya farklı, içeriye farklı. Kronik maske takma yorucu.',
    olgun: 'İçi ile dışı uyumlu. Söylediğini yapıyor, hissettiğini söylüyor.',
    eylem: 'Bugün birinin sana "nasılsın?" sorusuna gerçekten cevap ver.',
    gozlem: 'Kimsenin görmediği yerden ve kalabalığın içinden hangisi daha gerçek hissettiriyor?',
    hatlar: [
      { hat: 1, mesaj: 'İçsel hazırlık. Dışarısı değil, içi hazırla.' },
      { hat: 2, mesaj: 'Gizli öteki. Gerçek bağ uzaktakiyle bile kurulur.' },
      { hat: 3, mesaj: 'Dışarıya bağımlı. Alternans var.' },
      { hat: 4, mesaj: 'Ay neredeyse dolunay. Eşit bağ.' },
      { hat: 5, mesaj: 'Sahip olma. Hata yok.' },
      { hat: 6, mesaj: 'Horoz sesi uzağa gitmez. Devam etmek tehlikeli.' },
    ],
  },

  62: {
    no: 62, ad: 'Küçüğün Çokluğu', ceviri: 'Hsiao Kuo — Küçük Aşırılık',
    sembol: '☳☶', ust: 'gok_gurultulu', alt: 'dag',
    anahtar_kelime: 'Küçük adımlar', tema: 'Şimdi küçük şeyler için küçük şeyler yap',
    hd_kapisi: 62,
    psikolojik_oz: 'Alçakgönüllülük ve ölçülülük. Büyük hedefler için küçük yollar seçmek. Gösterişsiz, mütevazı, kademeli hareket — bu dönemde en etkili yoldur.',
    durum_analizi: 'Büyük hamle değil, küçük ama doğru adım zamanı.',
    golge: 'Büyük adım atmasını gerektiren durumda küçük kalıyor. Ya da tam tersi.',
    olgun: 'Doğru büyüklükte adım atıyor. Ne fazla ne az.',
    eylem: 'Bugün büyük planlar yerine tek bir küçük şeyi tam yap.',
    gozlem: 'Küçük adımları küçümsüyor musun? Bu tutum seni nereye götürüyor?',
    hatlar: [
      { hat: 1, mesaj: 'Kuş uçar. Felaket.' },
      { hat: 2, mesaj: 'Ata geçme. Büyüğü değil küçüğü bul.' },
      { hat: 3, mesaj: 'Korunma yok. Dikkatli ol.' },
      { hat: 4, mesaj: 'Hata yok. Devam etme. Dur.' },
      { hat: 5, mesaj: 'Bulut yok yağmur. Batıdan gelen.' },
      { hat: 6, mesaj: 'Uçuşta aşırılık. Kuş ağda.' },
    ],
  },

  63: {
    no: 63, ad: 'Tamamlanma Sonrası', ceviri: 'Chi Chi — Geçiş',
    sembol: '☵☲', ust: 'su', alt: 'ates',
    anahtar_kelime: 'Dikkat & Sürdürme', tema: 'Her son başka bir başlangıcın içindedir',
    hd_kapisi: 63,
    psikolojik_oz: 'Başarı sonrası gevşeme sendromu. Hedefe ulaşınca dikkat dağılır. Bu dönem, kazanılanı korumak için en kritik andır. Başarı sizi rahatlatmasın.',
    durum_analizi: 'Bir şey tamamlandı. Kutla — ama dikkatini kaybetme. Yeni döngü başlıyor.',
    golge: 'Başarı sonrası gevşiyor ve kayıplar yaşıyor. Tetikte kalmayı beceremez.',
    olgun: 'Kutlarken bir sonraki adımı da görüyor. Denge içinde.',
    eylem: 'Tamamladığın bir şeyi kutla ama bugün küçük bir koruma adımı da at.',
    gozlem: 'Başarının ardından ne yapıyorsun genellikle? Bu seni nereye götürüyor?',
    hatlar: [
      { hat: 1, mesaj: 'Tekerlekler frenliyor. Hata yok, iyi başlangıç.' },
      { hat: 2, mesaj: 'Kadının arabası. Yedi gün içinde bulunacak.' },
      { hat: 3, mesaj: 'Göçmen önce savaşır, sonra ödüllendirilir.' },
      { hat: 4, mesaj: 'En iyi elbise yırtınıyor. Dikkatli ol.' },
      { hat: 5, mesaj: 'Sade dua. Güzel ruh.' },
      { hat: 6, mesaj: 'Başı ıslanıyor. Tehlike.' },
    ],
  },

  64: {
    no: 64, ad: 'Tamamlanmadan Önce', ceviri: 'Wei Chi — Geçiş Öncesi',
    sembol: '☲☵', ust: 'ates', alt: 'su',
    anahtar_kelime: 'Eşik anı', tema: 'Tam tamamlanmamış — ama tamamlanmak üzere',
    hd_kapisi: 64,
    psikolojik_oz: 'Belirsizlik toleransı ve potansiyel. Henüz tamamlanmamış durum, başarısızlık değil — dönüşüm eşiğidir. Bu an, en kritik zamandır: vazgeçmek de atılım yapmak da bu anda olur.',
    durum_analizi: 'Henüz tamamlanmadı. Eşiktesin. Bir adım daha.',
    golge: 'Bitirmeden bırakıyor. Belirsizliğe dayanamıyor.',
    olgun: 'Eşikte sabitiyor. "Neredeyse" nin içinde bile umut görüyor.',
    eylem: 'Neredeyse bitirdiğin ama bıraktığın bir şeyi bugün bir adım daha ilerlet.',
    gozlem: 'Neredeyse bitirmişken bıraktığın şeyler var mı? O bırakışın altında ne yatıyor?',
    hatlar: [
      { hat: 1, mesaj: 'Kuyruk ıslanıyor. Utanç. Aşırı hevesli.' },
      { hat: 2, mesaj: 'Frenleme. Doğruluk.' },
      { hat: 3, mesaj: 'Henüz tamamlanmadı. Zorla ilerleme hata.' },
      { hat: 4, mesaj: 'Azimle savaş. Sıkıntı geçecek.' },
      { hat: 5, mesaj: 'Nuru görmek. Kutsal. İyi.' },
      { hat: 6, mesaj: 'Şarap için güven. Hata değil.' },
    ],
  },

};

// ═══════════════════════════════════════════════════════
// ICHING MOTORU
// ═══════════════════════════════════════════════════════

const ICHING_ENGINE = {

  /**
   * Doğum tarihine göre günlük hekzagram hesapla
   * @param {Date} birthDate
   * @param {Date} [targetDate]
   * @returns {object} hekzagram + hat
   */
  getDailyHexagram(birthDate, targetDate = new Date()) {
    const birth = new Date(birthDate);
    const target = new Date(targetDate);

    // Gün sayısı farkı
    const daysDiff = Math.floor((target - birth) / (1000 * 60 * 60 * 24));

    // Hekzagram numarası (1-64)
    const hexNo = (Math.abs(daysDiff) % 64) + 1;

    // Hat numarası (1-6) — yılın günüyle
    const dayOfYear = Math.floor((target - new Date(target.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const lineNo = (dayOfYear % 6) + 1;

    return {
      hexagram: ICHING_64[hexNo],
      activeHat: lineNo,
      daysDiff,
    };
  },

  /**
   * Soru bazlı hekzagram (klasik 6 sikke yöntemi simülasyonu)
   * @param {string} question — soruyu seed olarak kullan
   * @param {Date} [now]
   * @returns {object}
   */
  getQuestionHexagram(question, now = new Date()) {
    // Soruyu sayısal seed'e dönüştür
    let seed = 0;
    for (let i = 0; i < question.length; i++) {
      seed = ((seed << 5) - seed) + question.charCodeAt(i);
      seed |= 0;
    }
    seed = Math.abs(seed) + now.getDate() + now.getMonth() * 31;

    const hexNo = (seed % 64) + 1;
    const lineNo = (seed % 6) + 1;

    return {
      hexagram: ICHING_64[hexNo],
      activeHat: lineNo,
      seed,
    };
  },

  /**
   * HD kapısından ilgili hekzagramı bul
   * @param {number} gateNo — HD kapı numarası (1-64)
   * @returns {object|null}
   */
  getHexagramByGate(gateNo) {
    // HD kapıları I Ching ile doğrudan 1:1 eşleşmez
    // Geleneksel eşleme tablosunu kullan
    const hdToIching = {
      1:1, 2:2, 3:3, 4:4, 5:5, 6:6, 7:7, 8:8,
      9:9, 10:10, 11:11, 12:12, 13:13, 14:14, 15:15, 16:16,
      17:17, 18:18, 19:19, 20:20, 21:21, 22:22, 23:23, 24:24,
      25:25, 26:26, 27:27, 28:28, 29:29, 30:30, 31:31, 32:32,
      33:33, 34:34, 35:35, 36:36, 37:37, 38:38, 39:39, 40:40,
      41:41, 42:42, 43:43, 44:44, 45:45, 46:46, 47:47, 48:48,
      49:49, 50:50, 51:51, 52:52, 53:53, 54:54, 55:55, 56:56,
      57:57, 58:58, 59:59, 60:60, 61:61, 62:62, 63:63, 64:64,
    };
    const ichingNo = hdToIching[gateNo];
    return ichingNo ? ICHING_64[ichingNo] : null;
  },

  /**
   * Günlük psikoloji özeti üret
   * @param {object} hexagram
   * @param {number} activeHat
   * @returns {object} gozlem + eylem + hat_mesaji
   */
  getDailyPsychology(hexagram, activeHat) {
    if (!hexagram) return null;
    const hat = hexagram.hatlar[activeHat - 1];
    return {
      baslik: hexagram.ad,
      anahtar: hexagram.anahtar_kelime,
      durum: hexagram.durum_analizi,
      golge: hexagram.golge,
      olgun: hexagram.olgun,
      gozlem: hexagram.gozlem,
      eylem: hexagram.eylem,
      hat_mesaji: hat ? hat.mesaj : '',
      hat_no: activeHat,
    };
  },

  /**
   * Tüm hekzagramlar listesi (özet)
   * @returns {Array}
   */
  getAllSummary() {
    return Object.values(ICHING_64).map(h => ({
      no: h.no,
      ad: h.ad,
      sembol: h.sembol,
      anahtar_kelime: h.anahtar_kelime,
      tema: h.tema,
      hd_kapisi: h.hd_kapisi,
    }));
  },
};

// Node.js / browser uyumlu export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ICHING_64, ICHING_ENGINE, TRIGRAMS };
} else if (typeof window !== 'undefined') {
  window.ICHING_64 = ICHING_64;
  window.ICHING_ENGINE = ICHING_ENGINE;
  window.TRIGRAMS = TRIGRAMS;
}
