/**
 * RUHUN MİMARİSİ — CORE.JS
 * ─────────────────────────────────────────────
 * Versiyon : 2.0.0
 * Tarih    : Haziran 2026
 *
 * Tüm programların tek veri kaynağı.
 * Program sayısı ne kadar artarsa artsın core değişmez.
 *
 * KULLANIM:
 *   <script src="/core.js"></script>
 *   const rm = RuhunMimarisi;
 *   rm.register('benim-programim', { version:'1.0', needs:['profile'] });
 *   const profile = rm.profile.get();
 *   rm.on('profile.updated', fn);
 */

(function(global) {
  'use strict';

  // ─────────────────────────────────────────────
  // SABITLER
  // ─────────────────────────────────────────────
  const CORE_VERSION   = '2.0.0';
  const STORAGE_KEY    = 'rm_core_v1';       // tek ana key
  const PROFILE_KEY    = 'rm_profile_v1';    // profil ayrı — daha sık güncellenir
  const HISTORY_KEY    = 'rm_history_v1';    // geçmiş ayrı — büyüyebilir
  const PREFS_KEY      = 'rm_prefs_v1';      // tercihler
  const TOKEN_KEY      = 'rm_token_v1';      // auth token

  // Eski key'ler — migration için
  const LEGACY_KEYS = [
    'modulor_profile', 'modulor_profile_data', 'modulor_core_data',
    'hd_saved_profile', 'hd_profile', 'gem_profile', 'el_profile',
    'modulor_token', 'hd_token', 'gem_token', 'zemin_token',
    'modulor_hd', 'modulor_astro', 'modulor_num',
  ];

  // ─────────────────────────────────────────────
  // SCHEMA — versiyonlanmış profil yapısı
  // ─────────────────────────────────────────────
  function emptyProfile() {
    return {
      _v: 1,                        // schema versiyonu — asla silme
      _created: Date.now(),
      _updated: Date.now(),

      // Kimlik
      name: '',                     // görünen ad
      fullName: '',                 // tam ad — harf enerjisi için

      // Astroloji
      astro: {
        sun:  null,                 // 'Koç' | 'Boğa' | ...
        moon: null,                 // opsiyonel
        asc:  null,                 // opsiyonel
        birthDate: null,            // 'YYYY-MM-DD'
        birthTime: null,            // 'HH:MM'
        birthCity: null,
      },

      // Numeroloji
      num: {
        lifePath:     null,         // 1-9, 11, 22, 33
        personalYear: null,
        nameValue:    null,
      },

      // Element profili — hesaplanır, saklanır
      elements: {
        ates:    0,                 // %
        su:      0,
        hava:    0,
        toprak:  0,
        firtina: 0,
        // kaynak ağırlıkları
        _weights: { name: 0.66, sun: 0.22, time: 0.12 },
        _computed: null,            // son hesaplama zamanı
      },

      // Katman — ücretsiz / ücretli
      tier: 'free',                 // 'free' | 'pro' | 'admin'

      // Storage tercihi
      storageMode: 'local',         // 'local' | 'cloud' | 'export'
    };
  }

  function emptyPrefs() {
    return {
      _v: 1,
      theme: 'dark',               // 'dark' | 'light'
      language: 'tr',
      notifications: false,
      // Program bazlı tercihler buraya eklenir
      // programs: { gemoloji: {...}, zemin: {...} }
      programs: {},
    };
  }

  // ─────────────────────────────────────────────
  // STORAGE KATMANI
  // ─────────────────────────────────────────────
  const Store = {
    _mode: 'local',   // 'local' | 'cloud'

    _get(key) {
      try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
      } catch(e) {
        console.warn('[RM Core] Store._get hatası:', key, e);
        return null;
      }
    },

    _set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch(e) {
        console.warn('[RM Core] Store._set hatası:', key, e);
        return false;
      }
    },

    _del(key) {
      try { localStorage.removeItem(key); } catch(e) {}
    },

    getProfile()  { return this._get(PROFILE_KEY); },
    setProfile(v) {
      v._updated = Date.now();
      return this._set(PROFILE_KEY, v);
    },

    getHistory()  { return this._get(HISTORY_KEY) || []; },
    setHistory(v) { return this._set(HISTORY_KEY, v); },

    getPrefs()    { return this._get(PREFS_KEY); },
    setPrefs(v)   { return this._set(PREFS_KEY, v); },

    getToken()    { return this._get(TOKEN_KEY); },
    setToken(v)   { return this._set(TOKEN_KEY, v); },
    delToken()    { this._del(TOKEN_KEY); },

    // Program bazlı özel veri
    getProgram(id)    { return this._get('rm_prog_' + id) || {}; },
    setProgram(id, v) { return this._set('rm_prog_' + id, v); },
  };

  // ─────────────────────────────────────────────
  // MİGRATION — eski key'leri yeni yapıya taşı
  // ─────────────────────────────────────────────
  const Migration = {
    run() {
      // Zaten migrate edilmişse atla
      const meta = Store._get(STORAGE_KEY);
      if (meta && meta.migrated) return;

      let migrated = false;
      const newProfile = emptyProfile();

      // Eski profil verilerini topla
      const legacyProfiles = [
        'modulor_profile_data',
        'modulor_profile',
        'hd_saved_profile',
        'gem_profile',
        'el_profile',
      ];

      for (const key of legacyProfiles) {
        const old = Store._get(key);
        if (!old) continue;

        // Güneş burcu
        if (!newProfile.astro.sun) {
          newProfile.astro.sun = old.sun || old.sign || old.burc ||
            old.astro?.sun || old.gunesburc || null;
        }
        // Ay / Yükselen
        if (!newProfile.astro.moon) {
          newProfile.astro.moon = old.moon || old.ayburc ||
            old.astro?.moon || null;
        }
        if (!newProfile.astro.asc) {
          newProfile.astro.asc = old.asc || old.yukselen ||
            old.astro?.asc || null;
        }
        // Doğum tarihi
        if (!newProfile.astro.birthDate) {
          newProfile.astro.birthDate = old.birthDate || old.date ||
            old.dogumTarihi || old.bdate || null;
        }
        // İsim
        if (!newProfile.name) {
          newProfile.name = old.name || old.isim || old.ad || '';
        }
        if (!newProfile.fullName) {
          newProfile.fullName = old.fullName || old.tamAd || old.name || '';
        }
        // Numeroloji
        if (!newProfile.num.lifePath) {
          newProfile.num.lifePath = old.lifePath || old.yasamYolu ||
            old.num?.lifePath || null;
        }
        // Tier
        if (old.tier && old.tier !== 'free') {
          newProfile.tier = old.tier;
        }

        migrated = true;
      }

      // Eski token
      const oldToken = Store._get('modulor_token') ||
                       Store._get('hd_token') ||
                       Store._get('gem_token');
      if (oldToken && !Store.getToken()) {
        Store.setToken(oldToken);
      }

      if (migrated) {
        Store.setProfile(newProfile);
        console.info('[RM Core] Migration tamamlandı. Eski veriler korundu.');
      }

      // Migration tamamlandı işaretle
      Store._set(STORAGE_KEY, {
        coreVersion: CORE_VERSION,
        migrated: true,
        migratedAt: Date.now(),
      });
    },

    // Eski key'leri sil — kullanıcı onayından sonra çağır
    cleanup() {
      LEGACY_KEYS.forEach(k => Store._del(k));
      console.info('[RM Core] Eski key\'ler temizlendi.');
    },
  };

  // ─────────────────────────────────────────────
  // EVENT SİSTEMİ — programlar arası iletişim
  // ─────────────────────────────────────────────
  const Events = {
    _listeners: {},

    on(event, fn) {
      if (!this._listeners[event]) this._listeners[event] = [];
      this._listeners[event].push(fn);
      return () => this.off(event, fn); // unsubscribe fn döner
    },

    off(event, fn) {
      if (!this._listeners[event]) return;
      this._listeners[event] = this._listeners[event].filter(f => f !== fn);
    },

    emit(event, data) {
      (this._listeners[event] || []).forEach(fn => {
        try { fn(data); }
        catch(e) { console.warn('[RM Core] Event handler hatası:', event, e); }
      });
      // Global olayları da yayınla
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('rm:' + event, { detail: data }));
      }
    },

    once(event, fn) {
      const unsub = this.on(event, (data) => { fn(data); unsub(); });
    },
  };

  // ─────────────────────────────────────────────
  // ELEMENT HESAPLAMA
  // ─────────────────────────────────────────────
  const ElementCalc = {
    // Burç → element
    BURC_EL: {
      'Koç':'ates','Aslan':'ates','Yay':'ates',
      'Boğa':'toprak','Başak':'toprak','Oğlak':'toprak',
      'İkizler':'hava','Terazi':'hava','Kova':'hava',
      'Yengeç':'su','Akrep':'su','Balık':'su',
    },

    // Harf → element (Türkçe Ebced uyarlaması)
    HARF_EL: {
      'A':'hava','E':'hava','İ':'hava','N':'hava','S':'hava','Ş':'hava','I':'hava',
      'B':'su','G':'su','K':'su','P':'su','T':'su','Y':'su',
      'C':'ates','Ç':'ates','F':'ates','L':'ates','O':'ates','Ö':'ates','U':'ates','Ü':'ates',
      'D':'toprak','H':'toprak','M':'toprak','V':'toprak','Z':'toprak','R':'toprak','J':'toprak',
    },

    // Saat → element
    _saatEl(saat) {
      if (!saat) return null;
      const h = parseInt(saat.split(':')[0]);
      if (h >= 5  && h < 10) return 'ates';
      if (h >= 10 && h < 16) return 'hava';
      if (h >= 16 && h < 21) return 'su';
      return 'toprak';
    },

    // İsim enerjisi hesapla
    calcIsim(tamAd) {
      if (!tamAd) return null;
      const harfler = tamAd.toUpperCase().replace(/[^A-ZÇĞİÖŞÜ]/g,'').split('');
      const counts = { ates:0, su:0, hava:0, toprak:0 };
      harfler.forEach(h => {
        const el = this.HARF_EL[h];
        if (el) counts[el]++;
      });
      const toplam = Object.values(counts).reduce((a,b) => a+b, 0);
      if (!toplam) return null;
      return Object.fromEntries(
        Object.entries(counts).map(([k,v]) => [k, v/toplam])
      );
    },

    // Burç enerjisi hesapla
    calcBurc(burc) {
      const burcEl = this.BURC_EL[burc] || 'hava';
      const base = { ates:0.25, su:0.25, hava:0.25, toprak:0.25 };
      base[burcEl] = (base[burcEl] || 0) + 0.3;
      const total = Object.values(base).reduce((a,b) => a+b, 0);
      return Object.fromEntries(Object.entries(base).map(([k,v]) => [k, v/total]));
    },

    // Saat enerjisi hesapla
    calcSaat(saat) {
      const saatEl = this._saatEl(saat);
      const base = { ates:0.25, su:0.25, hava:0.25, toprak:0.25 };
      if (saatEl) base[saatEl] = (base[saatEl] || 0) + 0.3;
      const total = Object.values(base).reduce((a,b) => a+b, 0);
      return Object.fromEntries(Object.entries(base).map(([k,v]) => [k, v/total]));
    },

    // Ana hesaplama — %66 isim + %22 burç + %12 saat
    compute(fullName, burc, saat, weights) {
      const W = weights || { name: 0.66, sun: 0.22, time: 0.12 };

      const isimNorm  = this.calcIsim(fullName)  || { ates:0.25, su:0.25, hava:0.25, toprak:0.25 };
      const burcNorm  = burc  ? this.calcBurc(burc)  : { ates:0.25, su:0.25, hava:0.25, toprak:0.25 };
      const saatNorm  = saat  ? this.calcSaat(saat)  : { ates:0.25, su:0.25, hava:0.25, toprak:0.25 };

      const wI = fullName ? W.name : 0;
      const wB = burc     ? W.sun  : 0;
      const wS = saat     ? W.time : 0;
      const total = wI + wB + wS || 1;

      const result = {};
      ['ates','su','hava','toprak'].forEach(el => {
        result[el] = Math.round(
          ((isimNorm[el] * wI + burcNorm[el] * wB + saatNorm[el] * wS) / total) * 100
        );
      });
      result.firtina = 0;
      return result;
    },
  };

  // ─────────────────────────────────────────────
  // PROFİL API
  // ─────────────────────────────────────────────
  const Profile = {
    _cache: null,

    get() {
      if (this._cache) return this._cache;
      const stored = Store.getProfile();
      this._cache = stored || emptyProfile();
      return this._cache;
    },

    set(partial) {
      const current = this.get();
      // Derin birleştirme
      const updated = _deepMerge(current, partial);
      updated._updated = Date.now();
      // Element profilini yeniden hesapla
      updated.elements = {
        ...updated.elements,
        ...ElementCalc.compute(
          updated.fullName,
          updated.astro.sun,
          updated.astro.birthTime,
          updated.elements._weights,
        ),
        _weights: updated.elements._weights,
        _computed: Date.now(),
      };
      this._cache = updated;
      Store.setProfile(updated);
      Events.emit('profile.updated', updated);
      return updated;
    },

    // Tek alan güncelle
    update(path, value) {
      const partial = _setPath({}, path, value);
      return this.set(partial);
    },

    clear() {
      this._cache = null;
      Store.setProfile(emptyProfile());
      Events.emit('profile.cleared', null);
    },

    // Element profilini al (hesaplanmış)
    elements() {
      return this.get().elements;
    },

    // Profil dolu mu?
    isComplete() {
      const p = this.get();
      return !!(p.astro.sun || p.fullName);
    },

    // Export — Katman 2
    export() {
      const data = {
        _rm: CORE_VERSION,
        _exported: new Date().toISOString(),
        profile:  Store.getProfile(),
        history:  Store.getHistory(),
        prefs:    Store.getPrefs(),
      };
      return btoa(encodeURIComponent(JSON.stringify(data)));
    },

    // Import — Katman 2
    import(encoded) {
      try {
        const data = JSON.parse(decodeURIComponent(atob(encoded)));
        if (!data._rm) throw new Error('Geçersiz format');
        if (data.profile) { Store.setProfile(data.profile); this._cache = null; }
        if (data.history) Store.setHistory(data.history);
        if (data.prefs)   Store.setPrefs(data.prefs);
        Events.emit('profile.imported', data.profile);
        return true;
      } catch(e) {
        console.error('[RM Core] Import hatası:', e);
        return false;
      }
    },
  };

  // ─────────────────────────────────────────────
  // GEÇMİŞ — dönüşüm takibi
  // ─────────────────────────────────────────────
  const History = {
    // Kayıt ekle
    // type: 'stone_used' | 'recipe_generated' | 'module_visited' | custom
    add(type, data, programId) {
      const history = Store.getHistory();
      const entry = {
        id:        Date.now() + '_' + Math.random().toString(36).slice(2,6),
        type,
        program:   programId || 'unknown',
        data:      data || {},
        timestamp: Date.now(),
        // O anki element profili snapshot
        elements:  Profile.elements(),
      };
      history.unshift(entry);
      // Max 1000 kayıt tut
      if (history.length > 1000) history.splice(1000);
      Store.setHistory(history);
      Events.emit('history.added', entry);
      return entry;
    },

    // Tip bazlı filtrele
    get(type, limit) {
      const history = Store.getHistory();
      const filtered = type ? history.filter(e => e.type === type) : history;
      return limit ? filtered.slice(0, limit) : filtered;
    },

    // Program bazlı filtrele
    byProgram(programId, limit) {
      const history = Store.getHistory();
      const filtered = history.filter(e => e.program === programId);
      return limit ? filtered.slice(0, limit) : filtered;
    },

    // Dönüşüm özeti — "X ay önce böyleydin"
    snapshot(daysAgo) {
      const cutoff = Date.now() - (daysAgo * 24 * 60 * 60 * 1000);
      const history = Store.getHistory();
      // O tarihe en yakın element snapshot'ı bul
      const entry = history.find(e => e.timestamp <= cutoff && e.elements);
      return entry ? entry.elements : null;
    },

    clear() {
      Store.setHistory([]);
      Events.emit('history.cleared', null);
    },
  };

  // ─────────────────────────────────────────────
  // TERCİHLER
  // ─────────────────────────────────────────────
  const Prefs = {
    _cache: null,

    get() {
      if (this._cache) return this._cache;
      this._cache = Store.getPrefs() || emptyPrefs();
      return this._cache;
    },

    set(partial) {
      const updated = _deepMerge(this.get(), partial);
      this._cache = updated;
      Store.setPrefs(updated);
      Events.emit('prefs.updated', updated);
      return updated;
    },

    // Program bazlı tercihler
    program(id) {
      return this.get().programs?.[id] || {};
    },

    setProgram(id, partial) {
      return this.set({ programs: { [id]: partial } });
    },
  };

  // ─────────────────────────────────────────────
  // AUTH
  // ─────────────────────────────────────────────
  const Auth = {
    getToken() { return Store.getToken(); },

    setToken(token) {
      Store.setToken(token);
      Events.emit('auth.login', { token });
    },

    logout() {
      Store.delToken();
      Events.emit('auth.logout', null);
    },

    isLoggedIn() { return !!Store.getToken(); },

    // Tier kontrolü
    hasTier(required) {
      const tiers = { free:0, pro:1, admin:2 };
      const current = Profile.get().tier || 'free';
      return (tiers[current] || 0) >= (tiers[required] || 0);
    },
  };

  // ─────────────────────────────────────────────
  // PROGRAM KAYIT SİSTEMİ
  // ─────────────────────────────────────────────
  const Programs = {
    _registry: {},

    // Program kendini tanıtır
    register(id, config) {
      if (this._registry[id]) {
        console.warn('[RM Core] Program zaten kayıtlı:', id);
      }
      this._registry[id] = {
        id,
        version:     config.version  || '1.0',
        name:        config.name     || id,
        needs:       config.needs    || [],   // 'profile' | 'history' | 'auth' | 'pro'
        registered:  Date.now(),
      };
      // Tier gerektiriyor mu?
      if (config.needs?.includes('pro') && !Auth.hasTier('pro')) {
        Events.emit('program.upgrade_required', { program: id });
      }
      Events.emit('program.registered', this._registry[id]);
      console.info('[RM Core]', id, 'v' + this._registry[id].version, 'hazır.');
      return this._registry[id];
    },

    get(id) { return this._registry[id] || null; },
    all()   { return Object.values(this._registry); },

    // Program bazlı veri
    data(id)         { return Store.getProgram(id); },
    setData(id, val) { Store.setProgram(id, val); },
  };

  // ─────────────────────────────────────────────
  // YARDIMCI FONKSİYONLAR
  // ─────────────────────────────────────────────
  function _deepMerge(target, source) {
    const result = Object.assign({}, target);
    for (const key in source) {
      if (source[key] !== null &&
          typeof source[key] === 'object' &&
          !Array.isArray(source[key])) {
        result[key] = _deepMerge(target[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
    return result;
  }

  function _setPath(obj, path, value) {
    // 'astro.sun' → { astro: { sun: value } }
    const parts = path.split('.');
    let current = obj;
    for (let i = 0; i < parts.length - 1; i++) {
      current[parts[i]] = current[parts[i]] || {};
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
    return obj;
  }

  // ─────────────────────────────────────────────
  // BURÇ HESAPLAMA
  // ─────────────────────────────────────────────
  function calcBurc(dateStr) {
    if (!dateStr) return null;
    const [,m,d] = dateStr.split('-').map(Number);
    const md = m * 100 + d;
    if (md >= 321 && md <= 419)   return 'Koç';
    if (md >= 420 && md <= 520)   return 'Boğa';
    if (md >= 521 && md <= 620)   return 'İkizler';
    if (md >= 621 && md <= 722)   return 'Yengeç';
    if (md >= 723 && md <= 822)   return 'Aslan';
    if (md >= 823 && md <= 922)   return 'Başak';
    if (md >= 923 && md <= 1022)  return 'Terazi';
    if (md >= 1023 && md <= 1121) return 'Akrep';
    if (md >= 1122 && md <= 1221) return 'Yay';
    if (md >= 1222 || md <= 119)  return 'Oğlak';
    if (md >= 120 && md <= 218)   return 'Kova';
    return 'Balık';
  }

  // Yaşam yolu sayısı
  function calcLifePath(dateStr) {
    if (!dateStr) return null;
    const digits = dateStr.replace(/-/g,'').split('').map(Number);
    let sum = digits.reduce((a,b) => a+b, 0);
    // Master sayılar: 11, 22, 33
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = String(sum).split('').map(Number).reduce((a,b) => a+b, 0);
    }
    return sum;
  }

  // ─────────────────────────────────────────────
  // ENGINES — Harici motor adaptörü
  // ─────────────────────────────────────────────
  //
  // Motorlar (astro.js, numerology.js, iching.js, shadow.js) bağımsız
  // script olarak yüklenir. Bu modül onları core ile köprüler:
  //   1. Motor varlığını kontrol eder
  //   2. Profil verisini motora uygun forma dönüştürür
  //   3. Sonuçları profile.computed altında saklar
  //
  // Kullanım:
  //   const result = await RM.engines.compute(profile);
  //   // result.astro, result.num, result.iching, result.shadow
  // ─────────────────────────────────────────────

  const Engines = {

    // ── Erişilebilirlik kontrolü ───────────────
    available() {
      return {
        astro:      typeof AstroEngine !== 'undefined',
        numerology: typeof calcLifePath !== 'undefined',
        iching:     typeof ICHING_ENGINE !== 'undefined',
        shadow:     typeof SHADOW_ENGINE !== 'undefined',
      };
    },

    // ── Astroloji — güneş burcu, ay, doğum haritası özeti ──
    computeAstro(profile) {
      if (typeof AstroEngine === 'undefined') return null;
      const bd = profile.astro?.birthDate;
      if (!bd) return null;
      try {
        const [year, month, day] = bd.split('-').map(Number);
        const bt = profile.astro?.birthTime || '12:00';
        const [hour, minute] = bt.split(':').map(Number);

        // Şehir koordinatı — varsa, yoksa Türkiye merkezi
        const city = profile.astro?.birthCity || null;
        const coords = city ? AstroEngine.getCityCoords(city) : { lat: 39.9, lon: 32.85 };

        const chart = AstroEngine.calculate({
          year, month, day, hour, minute,
          lat: coords?.lat || 39.9,
          lon: coords?.lon || 32.85,
        });

        return {
          sunSign:   chart?.sun?.sign   || calcBurc(bd),
          moonSign:  chart?.moon?.sign  || null,
          ascSign:   chart?.ascendant?.sign || null,
          moonPhase: chart?.moonPhase   || null,
          _chart:    chart,             // tam harita — gerekirse
        };
      } catch(e) {
        console.warn('[RM Engines] Astro hesaplama hatası:', e);
        // Fallback: basit burç hesabı
        return { sunSign: calcBurc(bd), moonSign: null, ascSign: null };
      }
    },

    // ── Numeroloji — yaşam yolu, kişisel yıl, isim sayıları ──
    // Motordan beklenen API: window globals — calcLifePath(day,month,year)
    //   calcDestiny(name), calcSoulUrge(name), calcPersonality(name)
    //   calcPersonalYear(day, month, targetYear?)
    //   calcKarmicDebt(day,month,year,name), calcPinnacles(day,month,year,lp)
    //   calcChallenges(day,month,year)
    computeNum(profile) {
      if (typeof calcLifePath === 'undefined') return null;
      const bd = profile.astro?.birthDate;
      if (!bd) return null;
      try {
        const [year, month, day] = bd.split('-').map(Number);
        const name = profile.fullName || '';
        const lp       = calcLifePath(day, month, year);
        const destiny  = name ? calcDestiny(name)      : null;
        const soul     = name ? calcSoulUrge(name)     : null;
        const persona  = name ? calcPersonality(name)  : null;
        const pyear    = calcPersonalYear(day, month); // targetYear defaults to current
        const karmic   = (typeof calcKarmicDebt !== 'undefined')
                           ? calcKarmicDebt(day, month, year, name) : [];
        const pinnacles  = (typeof calcPinnacles !== 'undefined')
                           ? calcPinnacles(day, month, year, lp) : [];
        const challenges = (typeof calcChallenges !== 'undefined')
                           ? calcChallenges(day, month, year) : [];

        return {
          lp:           { value: lp,      label: 'Yaşam Yolu' },
          destiny:      destiny  !== null ? { value: destiny,  label: 'Kader Sayısı' }  : null,
          soul:         soul     !== null ? { value: soul,     label: 'Ruh Dürtüsü' }   : null,
          persona:      persona  !== null ? { value: persona,  label: 'Kişilik Sayısı' } : null,
          personalYear: pyear,
          karmic:       karmic   || [],
          pinnacles:    pinnacles || [],
          challenges:   challenges || [],
        };
      } catch(e) {
        console.warn('[RM Engines] Numeroloji hesaplama hatası:', e);
        return null;
      }
    },

    // ── I Ching — günlük hekzagram ──
    computeIChing(profile) {
      if (typeof ICHING_ENGINE === 'undefined') return null;
      const bd = profile.astro?.birthDate;
      if (!bd) return null;
      try {
        const result = ICHING_ENGINE.getDailyHexagram(new Date(bd));
        const psych  = ICHING_ENGINE.getDailyPsychology(result.hexagram, result.activeHat);
        return {
          hexagram:  result.hexagram,
          activeHat: result.activeHat,
          daysDiff:  result.daysDiff,
          psych,
        };
      } catch(e) {
        console.warn('[RM Engines] IChing hesaplama hatası:', e);
        return null;
      }
    },

    // ── Gölge — HD olmadan, Num + Astro ile ──
    computeShadow(numResult, astroResult) {
      if (typeof SHADOW_ENGINE === 'undefined') return null;
      if (!numResult && !astroResult) return null;
      try {
        // astroResult formatını shadow engine'in beklediği forma dönüştür
        const astroInput = astroResult ? {
          sunSign:  astroResult.sunSign,
          moonSign: astroResult.moonSign,
          sun:      { sign: astroResult.sunSign },
          moon:     { sign: astroResult.moonSign },
        } : null;
        // hdResult = null — HD olmadan çalışır
        return SHADOW_ENGINE.buildProfile(null, numResult, astroInput);
      } catch(e) {
        console.warn('[RM Engines] Shadow hesaplama hatası:', e);
        return null;
      }
    },

    // ── Tüm motorları çalıştır — ana entry point ──
    compute(profile) {
      const astro  = this.computeAstro(profile);
      const num    = this.computeNum(profile);
      const iching = this.computeIChing(profile);
      const shadow = this.computeShadow(num, astro);

      const result = { astro, num, iching, shadow, _computed: Date.now() };

      // Profil'e güneş burcu/ay yaz (eksikse)
      if (astro?.sunSign && !profile.astro.sun) {
        Profile.update('astro.sun', astro.sunSign);
      }
      if (astro?.moonSign && !profile.astro.moon) {
        Profile.update('astro.moon', astro.moonSign);
      }
      if (num?.lp?.value && !profile.num.lifePath) {
        Profile.update('num.lifePath', num.lp.value);
      }
      if (num?.personalYear && !profile.num.personalYear) {
        Profile.update('num.personalYear', num.personalYear);
      }

      // Hesaplanan veriyi session'a sakla (localStorage değil, hafıza)
      Engines._cache = result;

      Events.emit('engines.computed', result);
      return result;
    },

    // Kısa erişim — son hesaplama
    _cache: null,
    last() { return Engines._cache; },

    // Günlük ayna — shadow engine'den
    getDailyMirror() {
      if (typeof SHADOW_ENGINE === 'undefined') return null;
      const cache = Engines._cache;
      if (!cache?.shadow) return null;
      try {
        return SHADOW_ENGINE.getDailyMirror(cache.shadow);
      } catch(e) { return null; }
    },

    // IChing soru-bazlı
    askIChing(soru) {
      if (typeof ICHING_ENGINE === 'undefined') return null;
      try {
        const result = ICHING_ENGINE.getQuestionHexagram(soru);
        return {
          hexagram:  result.hexagram,
          activeHat: result.activeHat,
          psych: ICHING_ENGINE.getDailyPsychology(result.hexagram, result.activeHat),
        };
      } catch(e) { return null; }
    },
  };

  // ─────────────────────────────────────────────
  // BAŞLATMA
  // ─────────────────────────────────────────────
  function init() {
    // Migration çalıştır
    Migration.run();

    // Doğum tarihi varsa burcu ve yaşam yolunu otomatik hesapla
    const profile = Profile.get();
    if (profile.astro.birthDate && !profile.astro.sun) {
      Profile.update('astro.sun', calcBurc(profile.astro.birthDate));
    }
    if (profile.astro.birthDate && !profile.num.lifePath) {
      Profile.update('num.lifePath', calcLifePath(profile.astro.birthDate));
    }

    console.info(
      '[RM Core] v' + CORE_VERSION + ' başlatıldı.',
      Profile.isComplete() ? '· Profil mevcut.' : '· Profil boş.'
    );

    Events.emit('core.ready', { version: CORE_VERSION });
  }

  // ─────────────────────────────────────────────
  // PUBLIC API
  // ─────────────────────────────────────────────
  const RuhunMimarisi = {
    version: CORE_VERSION,

    // Ana API'ler
    profile:  Profile,
    history:  History,
    prefs:    Prefs,
    auth:     Auth,
    programs: Programs,
    elements: ElementCalc,
    engines:  Engines,

    // Event kısayolları
    on:   (e, fn) => Events.on(e, fn),
    off:  (e, fn) => Events.off(e, fn),
    emit: (e, d)  => Events.emit(e, d),
    once: (e, fn) => Events.once(e, fn),

    // Yardımcı hesaplamalar
    calcBurc,
    calcLifePath,

    // Migration yardımcısı
    migration: {
      cleanup: () => Migration.cleanup(),
      isComplete: () => !!(Store._get(STORAGE_KEY)?.migrated),
    },

    // Kısa yollar — sık kullanılanlar
    register: (id, config) => Programs.register(id, config),
    getProfile: () => Profile.get(),
    setProfile: (p) => Profile.set(p),
    getElements: () => Profile.elements(),
    isLoggedIn: () => Auth.isLoggedIn(),
    hasPro: () => Auth.hasTier('pro'),

    // Engine kısayolları
    compute:        (profile) => Engines.compute(profile || Profile.get()),
    getLastComputed: ()       => Engines.last(),
    getDailyMirror: ()        => Engines.getDailyMirror(),
    askIChing:      (soru)    => Engines.askIChing(soru),
    enginesReady:   ()        => Engines.available(),

    // Debug
    _debug: {
      store:    Store,
      events:   Events,
      migration: Migration,
      allKeys:  () => Object.keys(localStorage).filter(k => k.startsWith('rm_')),
      dump:     () => ({
        profile:  Store.getProfile(),
        history:  Store.getHistory().slice(0,5),
        prefs:    Store.getPrefs(),
        programs: Programs.all(),
        engines:  Engines.available(),
        computed: Engines.last(),
      }),
    },
  };

  // Browser veya module
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = RuhunMimarisi;
  } else {
    global.RuhunMimarisi = RuhunMimarisi;
    global.RM = RuhunMimarisi; // kısa alias
  }

  // Otomatik başlat
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  } else {
    init();
  }

})(typeof window !== 'undefined' ? window : this);
