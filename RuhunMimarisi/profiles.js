/**
 * profiles.js — Ruhun Mimarisi Profil Metinleri
 * Şema: PROFILES[element][yasamYolu]
 * element: 'ates' | 'su' | 'hava' | 'toprak'
 * yasamYolu: 1–9 (string key)
 *
 * Her profil:
 *   golge    — bilinçdışı kalıp, sert ama dürüst
 *   donusum  — hediye/potansiyel, ilham verici
 *   tema     — tek cümle özet
 *   eylem    — bugün yapabileceği somut şey
 */

const PROFILES = {

  // ═══════════════════════════════════════
  // ATEŞ
  // ═══════════════════════════════════════
  ates: {

    '1': {
      tema:     'Öncü ateş — yakar, aydınlatır, yolunu kendisi açar.',
      golge:    'Liderlik etmek istiyor ama onaylanmak da istiyor. Bu çelişki seni içten yoruyor. Kimse seni takip etmediğinde öfkeye, kimse fark etmediğinde bravado\'ya kaçıyorsun. Ateşin sönünce ne kalıyor diye hiç sormadın — çünkü sönebileceğini kabul etmek bile dayanılmaz geliyor.',
      donusum:  'Öncülük bir kader, bir zorunluluk değil. Onay almadan da yakmaya devam edebilirsin — işte o zaman gerçek liderlik başlar. İlk adımı atmak için izin istemeyi bıraktığın an, ateşin en saf haline ulaşır.',
      eylem:    'Bugün başkasının onayını beklemeden bir karar al. Küçük olsun, ama senin olsun.',
    },

    '2': {
      tema:     'Ateşin içinde bir köz sabır — hızlı yanmak yerine uzun ısıtır.',
      golge:    'İçinde iki ses var: biri hemen harekete geçmek istiyor, diğeri uyumu kaybetmekten korkuyor. Başkalarının hislerine bu kadar duyarlı olmak ateş enerjini törpülüyor. Çatışmadan kaçmak için kendi ateşini küçümsüyorsun.',
      donusum:  'Empatin bir zayıflık değil — ateşi yönlendiren bir pusula. İlişkilerde arabulucu olduğunda hem ısı hem ışık taşırsın. Dengeyi kaybetmeden yanabildiğinde, etrafındaki herkes ısınır.',
      eylem:    'Bugün bir çatışmadan kaçmak yerine sessizce ama net bir şekilde görüşünü söyle.',
    },

    '3': {
      tema:     'Yaratıcı alev — sanat, söz ve neşeyle dünyayı tutuşturur.',
      golge:    'Parlak fikirler üretiyorsun ama çoğu yarım kalıyor. Bitirmek sıkıcı geliyor, yeni başlamak heyecan verici. Bu döngü seni üretken hissettiriyor ama geriye baktığında tamamlanmış pek az şey görüyorsun. Dikkat dağınıklığını "yaratıcılık" diye adlandırmak bir süre işe yarıyor — sonra yaramıyor.',
      donusum:  'Yaratıcılığın gerçek güç, ama tamamlama onun kanadı. Bir fikri sonuna kadar götürdüğünde — mükemmel olmasa da — içindeki ateş gerçek şekline kavuşur. Dünyaya ihtiyacı olan şey senin yarım fikirlerinden çok bitirilmiş bir eserdir.',
      eylem:    'Bugün yeni bir şey başlatma. Yarım kalan tek bir şeyi bir adım ilerlet.',
    },

    '4': {
      tema:     'Ateş ve disiplin — kalıcı yapılar inşa eden güçlü bir irade.',
      golge:    'Çok çalışıyorsun ama tanınmak istiyorsun. Çabanın görülmediği anlarda sessiz bir öfke birikiyor. Kontrol etmek seni güvende hissettiriyor — ama bu ihtiyaç ilişkilerini yoruyor. Katılık bazen güç değil, kırılganlığın kalesi oluyor.',
      donusum:  'Disiplinin bir hediye — ama sadece serbest bırakmayı da öğrendiğinde. Titiz ellerin yarattığı yapı, başkalarına uzun yıllar ev sahipliği eder. Katkın görülmese de gerçek — ve kalıcı olanı sen inşa ediyorsun.',
      eylem:    'Bugün bir konuda "yeterince iyi" diyerek bırak. Mükemmeli bekleme.',
    },

    '5': {
      tema:     'Serbest alev — değişimde yanmayı seven, durağanlıktan sönen.',
      golge:    'Özgürlük adına bağlılıktan kaçıyorsun. Her yeni şey heyecan verici geliyor — ta ki derinleşmesi gerekene kadar. Taahhüt boğucu, rutin ölüm gibi hissettiriyor. Ama bu kaçış bazen seni en çok istediğin şeyden — gerçek bir bağlantıdan — uzaklaştırıyor.',
      donusum:  'Özgürlük bir varış noktası değil, bir yürüyüş biçimi. Kök salmadan da özgür olunabilir — ama köksüz ateş çabuk söner. Seçtiğin bir şeye adanmak, bağlanmak değil; bir çıpaya değil, bir yöne karar vermektir.',
      eylem:    'Bugün bir şeye "evet" de ve bu kararla bir hafta kal. Sadece bir hafta.',
    },

    '6': {
      tema:     'Koruyucu ateş — sevdiği için yanar, sevdiklerini ısıtır.',
      golge:    'Çok bakıyorsun — ve yoruluyorsun. Sevdiğin insanların sorunlarını sahipleniyor, onların acılarını kendi bedeninde taşıyorsun. Reddetmeyi öğrenemiyorsun çünkü "hayır" demek seni sevgisiz hissettiriyor. Ama kendini yakarak başkalarını ısıtamazsın.',
      donusum:  'En derin sevgin, kendi ateşini koruduğunda başkalarına gerçekten ışık tutabilirsin. Sınır koymak sevgisizlik değil — sürdürülebilir sevginin temelidir. Kendinle ilgilendiğinde etrafındaki herkes daha çok ısınır.',
      eylem:    'Bugün birine "hayır" de — suçluluk duymadan, açıklama yapmadan.',
    },

    '7': {
      tema:     'İçe dönen alev — derinlikte yanan, bilgeliği sessizlikte bulan.',
      golge:    'Zihnin sürekli analiz ediyor ama harekete geçmek zor. Gözlemlemek güvenli, risk almak tehlikeli geliyor. Bilgini paylaşmıyorsun — ya yanlış anlaşılırsın ya da yeterince hazır değilsin diye. Bu çekilme seni derinleştiriyor ama aynı zamanda izole ediyor.',
      donusum:  'Bilgeliğin ancak paylaşıldığında ateş olur. Kafanın içindeki ışık dünyayı aydınlatmaz — dışarı çıktığında yakar. Hazır olmayı bekleme; söylediğinde hazır olursun.',
      eylem:    'Bugün aklında uzun süredir dönen bir fikri birine söyle veya yaz.',
    },

    '8': {
      tema:     'Güç ateşi — büyük vizyonlar kurar, büyük etkiler bırakır.',
      golge:    'Başarı seni tanımlar hale geldi. Kazanmak güvenli, kaybetmek kimliğini tehdit ediyor. Para, statü veya kontrol üzerinden değer arıyor, bulamayınca boşluk hissediyorsun. Güç istiyorsun ama bunun neden bu kadar önemli olduğunu hiç sorgulamadın.',
      donusum:  'Gerçek güç, içten gelen — dıştan onaylanan değil. Yarattığın etkiyi para ya da statüyle ölçmeyi bıraktığında, asıl büyüklüğünü görürsün. Maddi başarın gerçek — ama anlamı dışarıda değil, içinde.',
      eylem:    'Bugün başarıyı sayılarla değil, nasıl hissettirdiğiyle ölç.',
    },

    '9': {
      tema:     'Evrensel alev — insanlık için yanar, küçük hesaplara sığmaz.',
      golge:    'Herkesi kurtarmak istiyorsun ama kendini ihmal ediyorsun. Büyük idealler taşıyor, küçük sınırları umursamıyorsun. Hayal kırıklığı birikiyor — çünkü dünya senin hızında dönmüyor. Tükenmişlik, idealizmden değil; sınırsız vermekten geliyor.',
      donusum:  'Evrensel sevgi kendinden başlar. Dünyayı değiştirme isteğin gerçek — ama önce kendi ateşini beslemek zorundasın. Tükenmeden vermek, seçici olmakla başlar. Ve sen ne seçeceğini zaten biliyorsun.',
      eylem:    'Bugün bir "büyük proje"yi kenara bırak ve sadece kendine bir şey yap.',
    },

  },

  // ═══════════════════════════════════════
  // SU
  // ═══════════════════════════════════════
  su: {

    '1': {
      tema:     'Duyarlı öncü — hissederek açar yolu, sezgiyle liderlik eder.',
      golge:    'Güçlü görünmek istiyorsun ama için çok hassas. Liderlik beklentisi ile duygusal yoğunluğun arasında sıkışıyorsun. Başkalarına bağımlı görünmemek için duygularını gizliyorsun — bu da seni yalnızlaştırıyor. "Zayıf" görünmek, en büyük korkunun adı.',
      donusum:  'Duyarlılık bir liderlik aracıdır. Hisseden bir öncü, başkalarını sadece yönetmez — taşır. Duygularını gizlemeyi bıraktığında gerçek bağlantı başlar ve asıl gücün ortaya çıkar.',
      eylem:    'Bugün birine gerçekte nasıl hissettiğini söyle — "iyiyim" demeden.',
    },

    '2': {
      tema:     'Derin su — ilişkilerde en hassas tını, en derin bağlantı.',
      golge:    'Başkalarının ihtiyaçlarını o kadar iyi hissediyorsun ki kendininkini kaybediyorsun. Sınır çizmek bencillik gibi geliyor. Sevilmek için fazla çaba harcıyorsun — ve bu çaba görünmediğinde sessizce inciniyorsun. Bağımlılık ile bağlantıyı birbirine karıştırıyorsun.',
      donusum:  'Gerçek bağlantı iki tam kişi arasında olur. Kendini kaybetmeden verebilirsin — ve o zaman verdiğin şey gerçekten değerlidir. Sınır, duvardan farklı; sınır nerede bittiğini bilmek.',
      eylem:    'Bugün birinin isteğini kabul etmeden önce bir an dur ve "bunu ben de istiyor muyum?" diye sor.',
    },

    '3': {
      tema:     'Yaratıcı su — duyguyu sanata, sezgiyi ifadeye dönüştürür.',
      golge:    'Hissetmek ve ifade etmek arasında büyük bir boşluk var. Duygular o kadar yoğun ki onları dışarı çıkarmak zaman zaman imkânsız geliyor. Başkalarının tepkisinden korktuğun için en derin yaratımlarını içinde saklıyorsun. Onaylanmayan bir eser seni değil mi anlatıyor?',
      donusum:  'Duygularının derinliği senin en büyük yaratıcı kaynağın. En kırılgan anların en güçlü eserlerini doğurur. Bir kez izin verdiğinde akmaya — ne ürettiğine şaşırırsın.',
      eylem:    'Bugün bir duyguyu bir nesneyle, renkle veya sesle ifade et. Kelime zorunlu değil.',
    },

    '4': {
      tema:     'Sakin su — kararlı ve derin, yavaş ama kalıcı iz bırakır.',
      golge:    'Güvenlik için duygularını kontrol altında tutuyorsun. Hissetmek tehlikeli geliyor — kontrolü kaybedebilirsin. Disiplin ve yapı bir kale oluyor, ama o kalenin içinde ne kadar hissedebiliyorsun? Duygusal donukluk bazen güvenlik, bazen hapishane.',
      donusum:  'Duyguların kontrol edilmesi ile dengelenmesi arasındaki fark hayatını değiştirir. Hissedebilen bir yapı kurucusu hem dayanıklı hem de canlı bir şey inşa eder. Suyun gerçek gücü akmakta — donmakta değil.',
      eylem:    'Bugün bir şeyi hisset ve onu kontrol etmeden sadece fark et.',
    },

    '5': {
      tema:     'Özgür su — değişimde akar, durağanlıkta buhar olur.',
      golge:    'Bağlanmak seni korkutuyor çünkü hayal kırıklığı yaşadın. Değişimi seviyorsun ama aslında derin bir bağlantı arıyorsun — ve bunu kabul etmek zor. Kaçmak bazen özgürlük, bazen korkudan oluşan bir ritüel. Hangi olduğunu bilmek için duraklamak zorundasın.',
      donusum:  'Akış, kaçış değil. Su nehir yatağını bulduğunda hem özgür hem de yönlü akar. Derinleşmekten korkmadığında, gerçek özgürlüğünü bulursun — her yerde, her koşulda.',
      eylem:    'Bugün bir ilişkide ya da durumda biraz daha kal. Kaçma dürtüsünü fark et, ama git.',
    },

    '6': {
      tema:     'Şefkat suyu — besler, sarar, şifa taşır.',
      golge:    'Şefkatin sonsuz — kendine duyduğun hariç. Başkalarının acısını hissediyorsun ve taşıyorsun. Ama kim seni taşıyor? Yardım etmeyi bıraktığında var olup olmadığını bilmiyorsun — kimliğinin büyük kısmı başkalarına bakmayla kurulu.',
      donusum:  'Şefkat, kaynak tükenmeden akar. Kendine beslediğinde, diğerlerine verdiğin şey daha temiz, daha saf olur. Şefkatin büyük — ama önce kendi yönüne bir damla bırak.',
      eylem:    'Bugün kendine, bir arkadaşına yapacağın gibi nazik bir şey yap.',
    },

    '7': {
      tema:     'Derinsu — yüzeyin altında gerçek hazineler yatar.',
      golge:    'O kadar çok his var ki hangisinin gerçek olduğunu bilmiyorsun. Analiz ederek hissettiklerini anlamaya çalışıyorsun — ama hisler çoğu zaman analizi aşar. İzole olmak güvenli geliyor çünkü başkaları senin derinliğini kaldıramıyor. Ya da öyle düşünüyorsun.',
      donusum:  'Derinliğin bir yük değil — çok az kişide bulunan bir armağan. Sezgini dünyaya sunduğunda, insanlar daha önce kelimeye dökemediği şeyleri görür. Yüzeye çık — bekleyenler var.',
      eylem:    'Bugün içgüdüsel bir kararı analiz etmeden uygula.',
    },

    '8': {
      tema:     'Güçlü su — bastırılamaz, engeli aşar, kanalını kendisi açar.',
      golge:    'Duygusal yoğunluğunu kontrol altında tutmak için güce sarılıyorsun. Başkalarını duygusal olarak etkilemek, yönetmek istiyorsun — bazen farkında olmadan. Manipülasyon ve derinlik arasındaki çizgi zaman zaman bulanıklaşıyor.',
      donusum:  'Duygusal zekân gerçek bir güç — onu kullanırken değil, paylaşırken en çok parlarsın. Başkalarını değiştirmeye çalışmak yerine dönüşümü kendin yaşadığında etrafındaki her şey değişir.',
      eylem:    'Bugün birini değiştirmeye çalışmak yerine onu olduğu gibi gör.',
    },

    '9': {
      tema:     'Evrensel su — herkesi taşır, sınır tanımaz, okyanus gibi.',
      golge:    'Acıyı o kadar derinden hissediyorsun ki bazen kendininkini mi, başkalarınınkini mi bilmiyorsun. Sınır yokluğu seni evrensel yapıyor ama aynı zamanda eritiyor. Başkalarının duyguları sana bulaşıyor ve onlara çözüm bulmaya çalışmak seni tüketiyor.',
      donusum:  'Empatin bir süpergüç — ama önce kendininkini ayırt etmeyi öğrendiğinde. Başkalarının acısını hissetmek onun için ağlamak değil; yol göstermektir. Kendin bir kıyı olduğunda, diğerleri güvenle sığınabilir.',
      eylem:    'Bugün başka birinin duygusunu taşımak yerine sadece "bunu duyuyorum" de.',
    },

  },

  // ═══════════════════════════════════════
  // HAVA
  // ═══════════════════════════════════════
  hava: {

    '1': {
      tema:     'Fikir öncüsü — zihinle açar yolu, düşünceyle değiştirir dünyayı.',
      golge:    'Fikirlerinin özgün olduğunu kanıtlamak için sürekli çabalıyorsun. Başkalarının fikirlerini duymak içini daraltıyor — ya aynı şeyi düşünmüşlerse? Orijinallik takıntısı seni hem yaratıcı hem de kırılgan yapıyor. Eleştiri, fikre değil sana geliyor gibi hissettiriyor.',
      donusum:  'Fikirler hava gibi — kimsenin tekeli olmaz. Senin özgünlüğün fikirlerin içeriğinde değil, onları dünyaya getirme biçiminde. Bir fikri hayata geçirdiğinde, başkasından önce olmak artık önemini yitiriyor.',
      eylem:    'Bugün bir fikrini başkasıyla paylaş — çalınmaktan korkmadan.',
    },

    '2': {
      tema:     'Denge zihni — adil, dinleyen, köprü kuran.',
      golge:    'Her iki tarafı da görüyorsun — ve bu seni kararsız yapıyor. Karar vermek birini hayal kırıklığına uğratacak, hata yapacaksın korkusu. Fikir üretiyorsun ama uygulamayı erteliyorsun. Denge bazen hareket etmemek için bir bahane oluyor.',
      donusum:  'Her iki tarafı görmek bir lütuf — ama sonunda bir yön seçmek gerçek denge. Mükemmel kararın yoktur; en iyi kararın zamanında verilen karardır. Seçimini yaptığında, havanın akış hissi geri döner.',
      eylem:    'Bugün ertelediğin küçük bir kararı ver — mükemmel olması gerekmiyor.',
    },

    '3': {
      tema:     'İfade rüzgarı — kelimeler, sesler ve fikirlerle dünyayı titreştirir.',
      golge:    'Söz üretmek kolay, derinleşmek zor. Parlak konuşmalar yapıyorsun ama bazen içi boş hissettiriyor sana. Yüzeyde kalmak güvenli — derinleşince ne çıkar diye korkuyorsun. Zeki görünmek, gerçekten bilmekten daha kolay.',
      donusum:  'Sesinin gerçek gücü derinlikten geliyor. Bir şeyi yeterince derine incelediğinde söylediklerin insanları değiştirir. Parlak olmak değil, dürüst olmak — işte asıl büyülü kombinasyon bu.',
      eylem:    'Bugün bir şeyi yüzeysel geçme. Tek bir konuyu derin araştır.',
    },

    '4': {
      tema:     'Sistematik zihin — düşünce mimarı, bilgiyi yapıya dönüştürür.',
      golge:    'Analiz felci yaşıyorsun — her şeyi düşünüyorsun ama hareket edemiyorsun. Mükemmel plan hazırlanana kadar başlamamak, hiç başlamamakla sonuçlanıyor. Zihnin bir inşaat alanı değil, bir müzeye dönüşüyor — her şey yerli yerinde ama içinde kimse yok.',
      donusum:  'Yapı, hareketi kısıtlamak için değil kolaylaştırmak için var. Planın %80 hazır olduğunda başlamak, %100 beklemekten her zaman daha iyi. Zihnin gücü, düşünceni eyleme dönüştürdüğünde ortaya çıkar.',
      eylem:    'Bugün bir planının bir adımını başlat — plan bitmeden.',
    },

    '5': {
      tema:     'Özgür zihin — sınırsız merak, sonsuz bağlantı kurar.',
      golge:    'Her şeyle ilgileniyorsun ama hiçbirinde kalamıyorsun. Derinleşmek sıkıcı, yeni şeyler heyecan verici. Ama bu yüzeysel genişlik seni bir uzman değil, bir meraklı yapıyor — ve bu yetmiyor artık. Odak, özgürlüğünü öldürmez; onu anlamlı kılar.',
      donusum:  'Merakın bir armağan ama odak onun kanadı. Bir şeyi gerçekten derinlemesine öğrendiğinde, yüzeysel bilginin hiç veremeyeceği bir özgürlük hissedersin. Derin gitmek, geniş olmaktan vazgeçmek değil — temelli olmaktır.',
      eylem:    'Bugün tek bir konuya 30 dakika ver — sekme değiştirmeden.',
    },

    '6': {
      tema:     'Uyumlu zihin — güzellik, denge ve bağlantı için düşünür.',
      golge:    'Fikir çatışması seni rahatsız ediyor — uyum için kendi görüşünden vazgeçiyorsun. Barışı korumak için sessiz kalıyorsun. Ama bu sessizlik zamanla bir kırgınlığa, sonra bir uzaklaşmaya dönüşüyor. Sahte uyum, gerçek bağlantının düşmanı.',
      donusum:  'Gerçek uyum, farklılıkları yok saymakla değil entegre etmekle olur. Görüşünü söylediğinde ilişki kaybetmezsin — derinleştirir. Zihninle getirdiğin dürüstlük, etrafındaki en güzel uyumu yaratır.',
      eylem:    'Bugün bir görüşünü nazikçe ama net söyle — uyumu bozmaktan korkma.',
    },

    '7': {
      tema:     'Analitik derin zihin — yüzeyin altındaki örüntüleri görür.',
      golge:    'Düşünmek eylemden daha güvenli. Araştırıyorsun, okuyorsun, anlıyorsun — ama paylaşmıyorsun. "Henüz hazır değilim" bahanesi yıllarca devam edebilir. Mükemmel bir analiz asla dışarı çıkmazsa hiç var olmamış gibidir.',
      donusum:  'Bilgin, paylaşıldığında ışığa dönüşür. Hazır olmayı bekleme — söylemeye başladığında hazır olursun. Zihninle gördüklerin başkalarının göremediği şeyler; onları saklama.',
      eylem:    'Bugün kafanda dönen bir analizi yaz veya birine anlat — mükemmel olmasa da.',
    },

    '8': {
      tema:     'Stratejik zihin — büyük oyunu görür, gücü fikirle kullanır.',
      golge:    'Zihninle insanları etkilemek istiyorsun — ve bu isteği fark etmek rahatsız edici. Entelektüel üstünlük bazen güç açlığının maskesi oluyor. Haklı olmak kazanmak gibi hissettiriyor. Ama en zekice argüman her zaman doğru argüman değil.',
      donusum:  'Stratejik zihninle hem büyük yapılar kurabilir hem de başkalarını gerçekten yükseltebilirsin. Güç, sadece kazan-kaybet değil — kazan-kazan oynayabilirsin. Fikirlerini paylaştığında dünya genişler, daralır değil.',
      eylem:    'Bugün bir tartışmada "haklıyım" yerine "ne öğrenebilirim" diye sor.',
    },

    '9': {
      tema:     'Evrensel zihin — insanlığın sorularını sorar, köprüler kurar.',
      golge:    'Büyük resmi görüyorsun ama günlük detayları atlıyorsun. Küçük şeyleri önemsememek, küçük insanları önemsememek gibi görünüyor zaman zaman. Vizyon bazen bir kaçış aracına dönüşüyor — "büyük şeyler" düşünürken küçük ama önemli sorumluluklardan uzaklaşıyorsun.',
      donusum:  'Evrensel zihnin en güçlü olduğu an, büyük ve küçüğü aynı anda tutabildiğinde. Milyonlar için düşünen biri, önce yanındaki kişiyi görür. Detaya inebildiğinde vizyonun gerçek bir güce dönüşür.',
      eylem:    'Bugün "büyük proje"ni bir kenara koy ve önündeki küçük ama bekleyen bir şeyi yap.',
    },

  },

  // ═══════════════════════════════════════
  // TOPRAK
  // ═══════════════════════════════════════
  toprak: {

    '1': {
      tema:     'Kökten öncü — sağlam temelden bağımsız yola çıkar.',
      golge:    'Öncü olmak istiyorsun ama risk almak korkutuyor. Güvenlik ve özgünlük arasında sıkışıyorsun. Yavaş ilerlemek seni zayıf gösteriyor gibi hissettiriyor. Adım atmak için tüm koşulların hazır olmasını bekliyorsun — ama o an hiç gelmiyor.',
      donusum:  'Güçlü kökler, çılgın rüzgarlarda sallanmanı sağlar — devrilmenden değil. Yavaş ilerlemen zayıflık değil; attığın her adım derinlemesine iz bırakır. Temelli bir öncü, uzun mesafe koşucusudur.',
      eylem:    'Bugün küçük ama somut bir ilk adım at — tüm planın hazır olmadan.',
    },

    '2': {
      tema:     'Sabırlı köprü — dayanıklı, güvenilir, ilişkilerde temel taşı.',
      golge:    'Güvenilir olmak seni yoruyor ama bunu söyleyemiyorsun. Herkes sana yaslanıyor çünkü sen "hep oradasın." Kendi ihtiyaçlarını ifade etmek zayıflık gibi geliyor. Başkalarına sağladığın güveni kendine sağlayamıyorsun.',
      donusum:  'Güvenilirlik bir armağan ama yalnızca karşılıklı olduğunda sürdürülebilir. Kendi ihtiyaçlarını söylediğinde ilişkiler zayıflamaz — gerçeğe kavuşur. Sen de yaslanmayı hak ediyorsun.',
      eylem:    'Bugün birine "bana da ihtiyacım olan şu" de.',
    },

    '3': {
      tema:     'Somut yaratıcı — hayalleri elle tutulur gerçeğe dönüştürür.',
      golge:    'Yaratıcılığın var ama "pratik değil" diye bastırıyorsun. Sanatsal ya da yaratıcı dürtüler "lüks" gibi hissettiriyor. Ürettiğin şeylerin somut faydası olmalı — yoksa değersiz. Bu inanç en derinindeki ifadeyi sessizleştiriyor.',
      donusum:  'En kalıcı şeyleri elle tutulur biçimde yapanlar sensin. Yaratıcılığın somutlaştığında dünya değişir. Hayali gerçeğe dönüştürmek bir yetenek değil — senin özün.',
      eylem:    'Bugün içinde taşıdığın yaratıcı bir şeyi küçük de olsa somutlaştır.',
    },

    '4': {
      tema:     'Toprak ustası — en sağlam yapıları en sabırlı eller inşa eder.',
      golge:    'Çok çalışıyorsun — ve bu çalışma bazen seni değil, beklentileri besliyor. "Daha çok yaparsan değerlenirsin" inancıyla büyüdün ve hâlâ onu taşıyorsun. Dinlenmek hâlâ suçluluk hissettiriyor. Verimlilik kimliğinin bir parçası — ama bütünü değil.',
      donusum:  'Gerçek üretkenlik dinlenmeden beslenir. Durduğunda zayıflamıyorsun — yeniden doluyor, kökleniyor, hazırlanıyorsun. En sağlam yapılar, sabırla inşa edilenlerin yanı sıra yenilenerek ayakta kalanlar.',
      eylem:    'Bugün verimli olmayan bir şey yap — sadece keyif için.',
    },

    '5': {
      tema:     'Köklü değişimci — sağlam temelden radikal dönüşümler yapar.',
      golge:    'Değişimi istiyorsun ama güvenli zemini kaybetmekten korkuyorsun. Yeni fırsatları kaçırmamak için hazır olman gerekiyor — ama hazır hissetmiyorsun. Değişim seni heyecanlandırıyor ve korkutuyor aynı anda. Bu paradoks seni yerinde sayıyor.',
      donusum:  'Kökün varsa istediğin kadar değişebilirsin. Ağaç fırtınada sallanır — kökleri sayesinde. Sağlamlığın bir engel değil; radikal değişiminin garantisi. Sallanmaya izin ver.',
      eylem:    'Bugün küçük ama alışılmış dışı bir şey dene — rutinin dışına çık.',
    },

    '6': {
      tema:     'Toprak şefkati — besler, korur, ev yapar her gittiği yerde.',
      golge:    'Herkesin pratik ihtiyacını görüyorsun — ama duygusal ihtiyacı atlanıyor. "Bir şey yapmak" ile "birini görmek" arasındaki farkı yaşıyorsun. Sorun çözerken bazen insanın kendisini göz ardı ediyorsun. Bazen sadece dinlenmek istendiğini unutuyorsun.',
      donusum:  'En derin bakım hem elleri hem kalbi içerir. Pratik desteğin gerçek — ama bir kez sadece "nasılsın, gerçekten?" diye sorduğunda ne değiştiğini görürsün. Beslemek eylem değil, varlıktır.',
      eylem:    'Bugün birine yardım etmeden önce sadece onu dinle.',
    },

    '7': {
      tema:     'Derin kök — yüzeyin altında gizli hazineler, sessiz bilgelik.',
      golge:    'Çok biliyorsun ama az paylaşıyorsun. "Zamanı gelince" diyorsun — ama o zaman çoğu zaman gelmiyor. Derinliğini sıradan insanlar kaldıramaz diye düşünüyorsun. Bu inanç seni yalnızlaştırıyor ve bilgeliğini depo ediyor.',
      donusum:  'Topraktan çıkan maden ancak işlendiğinde değer kazanır. Bilgeliğini paylaştığında ne kaybedeceğini bilmiyorsun — çünkü henüz denedin. Bir kez çıkardığında, madeni kaybetmezsin; çoğaltırsın.',
      eylem:    'Bugün içinde uzun süredir taşıdığın bir bilgeliği birine ilet.',
    },

    '8': {
      tema:     'Dağ gücü — maddi dünyada büyük inşa eden, kalıcı etki bırakan.',
      golge:    'Güç ve zenginlik önemli — ve bunları istemenin ayıp olduğunu düşünüyorsun. Bu çelişki seni hem itti hem çekti. Maddi başarı peşinde koşarken bazen neyi kaybettiğini fark etmiyorsun. Biriktirilmiş şeylerin gerçekte ne kadar yer kapladığını sorgulamıyorsun.',
      donusum:  'Maddi gerçekçiliğin bir güç — onu doğru kanale yönlendirdiğinde hem kendin hem etrafındakiler için kalıcı bir şey inşa edersin. Büyük şeyler kurabilirsin — ve bunu yaparken hem kendini hem de başkalarını zenginleştirebilirsin.',
      eylem:    'Bugün bir maddi kaynağını — para, zaman, enerji — başka birine yönlendir.',
    },

    '9': {
      tema:     'Toprak bilgesi — köklü sevgiyle insanlığa hizmet eder.',
      golge:    'Herkese yardım etmek istiyorsun ama gerçekçi olmayan beklentiler taşıyorsun. Dünyayı değiştirme isteği güzel — ama bazen önündeki gerçek kişiyi görmeni engelliyor. Büyük idealler küçük anlara sığmıyor gibi hissettiriyor.',
      donusum:  'En büyük değişim küçük, somut eylemlerle başlar. Toprak her şeyi taşır — ağaçları, evleri, nehirleri — ama kendisi sarsılmaz. Sen de herkesi taşıyabilirsin, ancak kendi zemininden taviz vermeden.',
      eylem:    'Bugün büyük hedefini bir kenara bırak ve önündeki tek kişiye tam dikkatini ver.',
    },

  },

};

/**
 * Profil getir
 * @param {string} element — 'ates'|'su'|'hava'|'toprak'
 * @param {number|string} yasamYolu — 1-9
 * @returns {object|null}
 */
function getProfile(element, yasamYolu) {
  const key = String(yasamYolu);
  return PROFILES[element]?.[key] || null;
}

/**
 * Tüm metinleri düz liste olarak döner — arama/export için
 */
function getAllProfiles() {
  const result = [];
  Object.entries(PROFILES).forEach(([el, lps]) => {
    Object.entries(lps).forEach(([lp, data]) => {
      result.push({ element: el, yasamYolu: Number(lp), ...data });
    });
  });
  return result;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PROFILES, getProfile, getAllProfiles };
} else {
  window.PROFILES     = PROFILES;
  window.getProfile   = getProfile;
  window.getAllProfiles = getAllProfiles;
}
