import { SubjectConfig, SubjectId, TopicConfig } from '../types/kpss';

export const KPSS_CURRICULUM: Record<SubjectId, SubjectConfig> = {
  turkce: {
    id: 'turkce',
    name: 'Türkçe',
    totalQuestions: 30,
    overallPercentage: 25,
    recommendedTimeMinutes: 30,
    topics: [
      {
        id: 'tr-sozcuk-anlam',
        name: 'Sözcükte ve Söz Gruplarında Anlam',
        percentage: 0.8,
        questionCount: 1,
        frequentTopics: [
          'Gerçek, Mecaz ve Terim Anlam Özellikleri',
          'Benzetme, Eğretileme, Kişileştirme, Kinaye, Mecazımürsel',
          'Dokundurma, Mübalağa, Dolaylama ve Güzel Adlandırma',
          'Eş-Yakın, Karşıt, Eş Sesli, Somut-Soyut, Nitel-Nicel Anlam',
          'İkilemeler, Pekiştirmeler, Deyimler ve Atasözleri',
        ],
      },
      {
        id: 'tr-cumle-anlam',
        name: 'Cümlede Anlam ve Yorumu',
        percentage: 2.5,
        questionCount: 3,
        frequentTopics: [
          'Cümleden Çıkarılacak Kesin Yargı',
          'Çıkarım, Kanıksama, Saptama, Değerlendirme, Yakınma-Sitem',
          'Pişmanlık, Ön Yargı, Olasılık, Varsayım, Tahmin, Kuşku, Öneri',
          'Neden-Sonuç, Amaç-Sonuç ve Koşul Cümleleri',
          'Öznel-Nesnel Anlatım, Tanım, Karşılaştırma, İçerik-Üslup',
          'Doğrudan/Dolaylı Aktarma, Cümle Tamamlama ve Oluşturma',
        ],
      },
      {
        id: 'tr-paragraf',
        name: 'Paragrafta Anlam ve Yapı',
        percentage: 11.7,
        questionCount: 14,
        frequentTopics: [
          'Paragrafın Bölümleri ve Boşluk Tamamlama',
          'Düşüncenin Akışını Bozan Cümleler',
          'Paragrafı İkiye Bölme ve Yer Değiştirme',
          'Paragraf Oluşturma ve Metin Bütünlüğü',
          'Ana Düşünce ve Yardımcı Düşünceler',
        ],
      },
      {
        id: 'tr-anlatim-bicimleri',
        name: 'Paragrafta Anlatım Biçimleri ve Düşünceyi Geliştirme Yolları',
        percentage: 1.7,
        questionCount: 2,
        frequentTopics: [
          'Açıklayıcı, Tartışmacı, Öyküleyici ve Betimleyici Anlatım',
          'Tanımlama, Karşılaştırma, Örnekleme ve Tanık Gösterme',
        ],
      },
      {
        id: 'tr-sozel-mantik',
        name: 'Sözel Muhakeme ve Mantık',
        percentage: 3.3,
        questionCount: 4,
        frequentTopics: [
          'İki ve Üç Değişkenli Tablo ve Sıralama Problemleri',
          'Eşleştirme ve Grup Oluşturma Analizi',
          'Kesin Doğru ve Kesin Yanlış Önermeler',
        ],
      },
      {
        id: 'tr-sozcuk-turleri',
        name: 'Sözcük Türleri',
        percentage: 1.7,
        questionCount: 2,
        frequentTopics: [
          'İsimler, İsim Tamlamaları ve İsmin Hâlleri',
          'Zamirler (Kişi, İşaret, Belgisiz, Soru, Aitlik)',
          'Sıfatlar (Niteleme, Belirtme, Adlaşmış Sıfat)',
          'Zarflar (Durum, Yer-Yön, Zaman, Miktar, Soru)',
          'Edat, Bağlaç ve Ünlem Grubu',
          'Fiiller, Kip, Kişi, Çatı, Fiilimsiler ve Ek Fiil',
        ],
      },
      {
        id: 'tr-yapi-bilgisi',
        name: 'Yapı Bilgisi',
        percentage: 0.8,
        questionCount: 1,
        frequentTopics: [
          'Kök ve Gövde Analizi',
          'Yapım Ekleri ve Çekim Ekleri',
          'Basit, Türemiş ve Birleşik Sözcükler',
        ],
      },
      {
        id: 'tr-cumle-ogeleri',
        name: 'Cümle Bilgisi ve Ögeleri',
        percentage: 0.8,
        questionCount: 1,
        frequentTopics: [
          'Yüklem, Özne, Nesne, Dolaylı Tümleç, Zarf Tümleci',
          'Cümlede Vurgu ve Öge Dizilişi',
          'Yapılarına ve Yüklemlerine Göre Cümle Türleri',
        ],
      },
      {
        id: 'tr-ses-bilgisi',
        name: 'Ses Bilgisi ve Ses Olayları',
        percentage: 0.8,
        questionCount: 1,
        frequentTopics: [
          'Ünsüz Yumuşaması ve Benzeşmesi (Sertleşme)',
          'Ünlü Düşmesi, Ünlü Daralması ve Ses Türemesi',
          'Ulama ve Dudak Ünsüzleri Benzeşmesi',
        ],
      },
      {
        id: 'tr-yazim-noktalama',
        name: 'Yazım Kuralları, Noktalama ve Anlatım Bozuklukları',
        percentage: 0.8,
        questionCount: 1,
        frequentTopics: [
          'Büyük Harfler, Kısaltmalar ve Sayıların Yazımı',
          'Bitişik ve Ayrı Yazılan Birleşik Kelimeler',
          'Nokta, Virgül, Noktalı Virgül, İki Nokta, Kesme İşareti',
          'Anlama ve Dil Bilgisine Dayalı Anlatım Bozuklukları',
        ],
      },
    ],
  },

  matematik: {
    id: 'matematik',
    name: 'Matematik',
    totalQuestions: 27,
    overallPercentage: 22.5,
    recommendedTimeMinutes: 35,
    topics: [
      {
        id: 'mat-temel-kavramlar-sayilar',
        name: 'Temel Kavramlar, Sayılar ve Bölünebilme',
        percentage: 3.3,
        questionCount: 4,
        frequentTopics: [
          'Sayı Kümeleri (Doğal Sayılar, Tam Sayılar, Asal Sayılar)',
          'Faktöriyel ve Sayma Sistemleri',
          'Bölme ve Bölünebilme Kuralları',
        ],
      },
      {
        id: 'mat-ebob-ekok-asal',
        name: 'EBOB - EKOK ve Asal Çarpanlar',
        percentage: 1.7,
        questionCount: 2,
        frequentTopics: [
          'Asal Çarpanlara Ayırma',
          'EBOB - EKOK Problemleri ve Periyodik Tekrarlar',
        ],
      },
      {
        id: 'mat-rasyonel-denklemler',
        name: 'Rasyonel Sayılar ve Denklemler',
        percentage: 2.5,
        questionCount: 3,
        frequentTopics: [
          'Kesir Türleri ve Rasyonel Sayılarda Dört İşlem',
          'Birinci ve İkinci Dereceden Denklemler',
        ],
      },
      {
        id: 'mat-esitsizlik-mutlak',
        name: 'Eşitsizlikler ve Mutlak Değer',
        percentage: 1.7,
        questionCount: 2,
        frequentTopics: [
          'Basit Eşitsizlik Özellikleri',
          'Mutlak Değerli Denklem ve Eşitsizlikler',
        ],
      },
      {
        id: 'mat-uslu-koklu-carpanlar',
        name: 'Üslü, Köklü Sayılar ve Çarpanlara Ayırma',
        percentage: 2.5,
        questionCount: 3,
        frequentTopics: [
          'Üslü İfadeler ve Üslü Denklemler',
          'Köklü İfadeler ve Çarpanlara Ayırma Özdeşlikleri',
        ],
      },
      {
        id: 'mat-oran-oranti-problemler',
        name: 'Oran - Orantı ve Problemler',
        percentage: 6.7,
        questionCount: 8,
        frequentTopics: [
          'Denklem Kurma ve Yaş Problemleri',
          'Yüzde, Faiz, Kâr–Zarar ve Karışım Problemleri',
          'İşçi, Havuz ve Hız-Hareket Problemleri',
        ],
      },
      {
        id: 'mat-kumeler-islem-olasilik',
        name: 'Kümeler, İşlem, Modüler Aritmetik & Olasılık',
        percentage: 2.5,
        questionCount: 3,
        frequentTopics: [
          'Küme İşlemleri ve Küme Problemleri',
          'Özel Tanımlı İşlem ve Modüler Aritmetik',
          'Permütasyon, Kombinasyon ve Olasılık',
        ],
      },
      {
        id: 'mat-tablo-grafik',
        name: 'Tablo ve Grafikler (Sayısal Mantık)',
        percentage: 1.7,
        questionCount: 2,
        frequentTopics: [
          'Tablo Yorumlama ve Grafik İnceleme (Daire, Sütun, Çizgi)',
          'Sayısal Mantıksal Akıl Yürütme',
        ],
      },
    ],
  },

  geometri: {
    id: 'geometri',
    name: 'Geometri',
    totalQuestions: 3,
    overallPercentage: 2.5,
    recommendedTimeMinutes: 8,
    topics: [
      {
        id: 'geo-ozel-ucgenler',
        name: 'Özel Üçgenler ve Üçgen Teorisi',
        percentage: 0.8,
        questionCount: 1,
        frequentTopics: [
          'Geometrik Kavramlar, Doğruda ve Üçgende Açılar',
          'Dik Üçgen, Pisagor, Öklid ve Özel Açılı Üçgenler',
          'Açıortay, Kenarortay, Üçgende Alan, Benzerlik ve Açı-Kenar Bağıntıları',
        ],
      },
      {
        id: 'geo-dortgenler-cokgenler',
        name: 'Dörtgenler, Çokgenler, Çember ve Daire',
        percentage: 0.8,
        questionCount: 1,
        frequentTopics: [
          'Çokgenler, Dörtgenler, Paralelkenar, Eşkanar Dörtgen',
          'Dikdörtgen, Kare, Yamuk, Deltoid',
          'Çemberde Açı, Çemberde Uzunluk ve Dairede Alan',
        ],
      },
      {
        id: 'geo-analitik-kati',
        name: 'Analitik Geometri ve Katı Cisimler',
        percentage: 0.8,
        questionCount: 1,
        frequentTopics: [
          'Noktanın ve Doğrunun Analitik İncelenmesi, Doğru Denklemleri/Grafiği',
          'Simetriler ve Eşitsizlikler',
          'Prizma, Küp, Silindir, Piramit, Koni ve Küre Hacim/Alan Hesapları',
        ],
      },
    ],
  },

  tarih: {
    id: 'tarih',
    name: 'Tarih',
    totalQuestions: 27,
    overallPercentage: 22.5,
    recommendedTimeMinutes: 20,
    topics: [
      {
        id: 'tar-islam-oncesi-turk',
        name: 'İslamiyet Öncesi Türk Tarihi',
        percentage: 0.8,
        questionCount: 1,
        frequentTopics: [
          'İlk Türk Devletleri (Hunlar, Göktürkler, Uygarlar)',
          'Kut Anlayışı, Kurultay, Töre ve Sosyo-Kültürel Yapı',
        ],
      },
      {
        id: 'tar-ilk-turk-islam',
        name: 'İlk Türk - İslam Devletleri ve Beylikleri',
        percentage: 1.7,
        questionCount: 2,
        frequentTopics: [
          'Karahanlılar, Gazneliler ve Büyük Selçuklu Devleti',
          'Türkiye Selçuklu Devleti ve Anadolu Beylikleri Medeniyeti',
        ],
      },
      {
        id: 'tar-osmanli-kurulus-yukselme',
        name: 'Osmanlı Devleti Kuruluş ve Yükselme Dönemleri',
        percentage: 1.7,
        questionCount: 2,
        frequentTopics: [
          'Kuruluş ve Yükselme Dönemi Padişahları ve Siyaseti',
          'Balkanlar ve Doğu Siyaseti, Fetihler ve Islahatlar',
        ],
      },
      {
        id: 'tar-osmanli-kultur',
        name: 'Osmanlı Devleti’nde Kültür ve Uygarlık',
        percentage: 2.5,
        questionCount: 3,
        frequentTopics: [
          'Devlet Yönetimi, Divan-ı Hümayun ve Tımar Sistemi',
          'Toprak Düzeni, Eyalet Teşkilatı, Ordu, Eğitim ve Hukuk',
        ],
      },
      {
        id: 'tar-osmanli-duraklama-gerileme-dagilma',
        name: 'Osmanlı Devleti XVII, XVIII ve XIX. Yüzyıl (Duraklama, Gerileme, Dağılma)',
        percentage: 3.3,
        questionCount: 4,
        frequentTopics: [
          'XVII ve XVIII. Yüzyıl Islahatları ve Siyasi Antlaşmalar',
          'XIX. Yüzyıl Dağılma Dönemi, Tanzimat ve Meşrutiyet Dönemleri',
        ],
      },
      {
        id: 'tar-xx-osmanli',
        name: 'XX. Yüzyılda Osmanlı Devleti',
        percentage: 1.7,
        questionCount: 2,
        frequentTopics: [
          'Trablusgarp Savaşı, Balkan Savaşları',
          'I. Dünya Savaşı ve Cepheler',
        ],
      },
      {
        id: 'tar-kurtulus-hazirlik-tbmm',
        name: 'Kurtuluş Savaşı Hazırlık ve I. TBMM Dönemi',
        percentage: 2.5,
        questionCount: 3,
        frequentTopics: [
          'Amasya Genelgesi, Erzurum ve Sivas Kongreleri',
          'I. TBMM’nin Açılması, Yapısı, Hükümet Sistemi ve İsyanlar',
        ],
      },
      {
        id: 'tar-kurtulus-muharebeler',
        name: 'Kurtuluş Savaşı Muharebeler Dönemi',
        percentage: 1.7,
        questionCount: 2,
        frequentTopics: [
          'Doğu, Güney ve Batı Cephesi Mücadelesi',
          'Mudanya Ateşkesi ve Lozan Barış Antlaşması',
        ],
      },
      {
        id: 'tar-inkilap-ilkeler',
        name: 'Atatürk İnkılapları ve Atatürk İlkeleri',
        percentage: 4.2,
        questionCount: 5,
        frequentTopics: [
          'Siyasal, Hukuki, Toplumsal, Eğitsel ve Ekonomik İnkılaplar',
          'Cumhuriyetçilik, Milliyetçilik, Halkçılık, Devletçilik, Laiklik, İnkılapçılık',
          'Partiler ve Partileşme Dönemi (İç Politika)',
        ],
      },
      {
        id: 'tar-dis-politika-ataturk',
        name: 'Atatürk Dönemi Dış Politika, Atatürk sonrası Dönem ve Hayatı',
        percentage: 2.5,
        questionCount: 3,
        frequentTopics: [
          'Montrö Boğazlar Sözleşmesi ve Hatay Sorunu',
          'Atatürk Sonrası Dönem Gelişmeleri',
          'Atatürk’ün Hayatı, Eserleri ve Kişiliği',
        ],
      },
    ],
  },

  cografya: {
    id: 'cografya',
    name: 'Coğrafya',
    totalQuestions: 18,
    overallPercentage: 15,
    recommendedTimeMinutes: 12,
    topics: [
      {
        id: 'cog-konum-jeopolitik',
        name: 'Türkiye’nin Coğrafi Konumu ve Jeopolitiği',
        percentage: 1.7,
        questionCount: 2,
        frequentTopics: [
          'Matematik (Mutlak) Konum ve Sonuçları',
          'Özel (Göreceli) Konum ve Türkiye’nin Jeopolitiği',
        ],
      },
      {
        id: 'cog-fiziki-yersekilleri',
        name: 'Türkiye’nin Yerşekilleri, İklimi ve Bitki Örtüsü',
        percentage: 4.2,
        questionCount: 5,
        frequentTopics: [
          'Jeolojik Geçmiş, Platolar, Ovalar, Dış Güçler ve Kıyı Tipleri',
          'Toprak Oluşumu/Tipleri, Su Varlığı ve Doğal Afetler',
          'Sıcaklık, Nemlilik, Yağış, İklim Tipleri ve Bitki Örtüsü',
        ],
      },
      {
        id: 'cog-nufus-yerlesme',
        name: 'Türkiye’de Nüfus ve Yerleşme',
        percentage: 2.5,
        questionCount: 3,
        frequentTopics: [
          'Nüfus Özellikleri, Dağılışı, Yoğunluğu ve Sayımları',
          'Nüfus Politikaları, Projeksiyonlar, Göçler',
          'Yerleşme ve Mesken Tipleri',
        ],
      },
      {
        id: 'cog-tarim-hayvancilik',
        name: 'Türkiye’de Tarım, Hayvancılık ve Ormancılık',
        percentage: 2.5,
        questionCount: 3,
        frequentTopics: [
          'Anadolu Uygarlıkları, Arazi Kullanımı ve Sektörel Dağılım',
          'Türkiye’de Tarım Ürünleri Dağılışı',
          'Hayvancılık Türleri ve Ormancılık',
        ],
      },
      {
        id: 'cog-madenler-sanayi',
        name: 'Türkiye’de Madenler, Enerji Kaynakları ve Sanayi',
        percentage: 2.5,
        questionCount: 3,
        frequentTopics: [
          'Maden Yatakları (Demir, Bakır, Krom, Bor, Boksit vb.)',
          'Yenilenebilir ve Yenilenemez Enerji Kaynakları',
          'Sanayi Tesisleri ve Konumlandırma Faktörleri',
        ],
      },
      {
        id: 'cog-ulasim-ticaret-bolgeler',
        name: 'Ulaşım, Ticaret, Turizm ve Bölgesel Kalkınma Projeleri',
        percentage: 1.7,
        questionCount: 2,
        frequentTopics: [
          'Ulaşım Ağları, İç ve Dış Ticaret, Turizm ve Milli Parklar',
          'Şehirler ve Özellikleri',
          'Türkiye’nin Coğrafi Bölgeleri ve Bölgesel Kalkınma Projeleri (GAP, DAP, DOKAP, ZBK)',
        ],
      },
    ],
  },

  vatandaslik: {
    id: 'vatandaslik',
    name: 'Vatandaşlık',
    totalQuestions: 9,
    overallPercentage: 7.5,
    recommendedTimeMinutes: 8,
    topics: [
      {
        id: 'vat-temel-hukuk',
        name: 'Hukukun Temel Kavramları, Haklar ve Devlet Sistemleri',
        percentage: 2.5,
        questionCount: 3,
        frequentTopics: [
          'Hukukun Tanımı, Kaynakları (Yazılı, Yazısız, Yardımcı) ve Yaptırımları',
          'Kamu ve Özel Hukuk Dalları, Ceza ve Ehliyet',
          'Hakkın Tanımı/Türleri, Devlet Kavramı, Yapıları ve Hükümet Sistemleri',
        ],
      },
      {
        id: 'vat-anayasa-tarihi',
        name: 'Anayasa Hukukuna Giriş ve Türk Anayasa Tarihi',
        percentage: 1.7,
        questionCount: 2,
        frequentTopics: [
          'Kanun-u Esasî (1876), 1921, 1924, 1961, 1982 ve 2017 Anayasaları',
          'Türk Tarihindeki Referandumlar',
          '1982 Anayasasının Temel İlkeleri',
        ],
      },
      {
        id: 'vat-yasama-yurutme-yargi',
        name: 'Yasama, Yürütme ve Yargı Organları',
        percentage: 1.7,
        questionCount: 2,
        frequentTopics: [
          'TBMM İç Yapısı, Çalışma Düzeni, Görevleri ve Denetim Yolları',
          'Cumhurbaşkanlığı Kararnameleri, Yönetmelikler ve Görevleri',
          'Hakimler ve Savcılar Kurulu, Yüksek Mahkemeler (Anayasa Mahkemesi, Yargıtay, Danıştay, Sayıştay)',
          'Temel Hak ve Hürriyetlerin Türleri',
        ],
      },
      {
        id: 'vat-idare-hukuku',
        name: 'İdare Hukuku ve Kamu Yönetimi',
        percentage: 1.7,
        questionCount: 2,
        frequentTopics: [
          'İdare Hukuku, Kamu Yönetimi, Merkeze Yardımcı Organlar',
          'Yerel Yönetim Organları ve Kamu Kuruluşları',
          'Devlet Memurluğu Şartları ve Disiplin Cezaları',
        ],
      },
    ],
  },

  guncel: {
    id: 'guncel',
    name: 'Güncel Bilgiler',
    totalQuestions: 6,
    overallPercentage: 5,
    recommendedTimeMinutes: 5,
    topics: [
      {
        id: 'gun-guncel-bilgiler',
        name: 'Uluslararası Kuruluşlar ve Güncel Olaylar',
        percentage: 5.0,
        questionCount: 6,
        frequentTopics: [
          'BM, NATO, UNESCO, AB ve Türk Devletleri Teşkilatı',
          'UNESCO Dünya Mirası Listesindeki Doğal ve Kültürel Varlıklarımız',
          'Türkiye Gündemi, Bilim, Teknoloji, Sanat ve Spor',
        ],
      },
    ],
  },
};

export const KPSS_SUBJECTS_LIST = Object.values(KPSS_CURRICULUM);

export const getSubjectConfig = (subjectId: SubjectId): SubjectConfig => {
  return KPSS_CURRICULUM[subjectId] || KPSS_CURRICULUM.turkce;
};

export const getTopicConfig = (
  subjectId: SubjectId,
  topicId: string
): TopicConfig | undefined => {
  return KPSS_CURRICULUM[subjectId]?.topics.find((t) => t.id === topicId);
};
