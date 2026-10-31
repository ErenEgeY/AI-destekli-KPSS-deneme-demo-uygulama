import { SubjectId } from '../types/kpss';

/**
 * Exemplar past ÖSYM question patterns extracted from historic ÖSYM KPSS exams (2006 - 2025).
 * Used by the AI Question Service to inject authentic stylistic patterns, distractor logic,
 * question stems, and subject terminology.
 */
export const OSYM_EXEMPLARS_DATABASE: Record<SubjectId, string[]> = {
  turkce: [
    `[ÖSYM Altı Çizili Sözcük Kalıbı]: "Bu parçada <u>gözden kaçırmak</u> sözüyle anlatılmak istenen aşağıdakilerden hangisidir?" (Sorularda mutlaka <u>...</u> HTML etiketi içine alınmış altı çizili ifade yer alır).`,
    `[ÖSYM Paragrafta Anlam & Akış Kalıbı]: "(I) Edebiyat toplumun aynasıdır. (II) Yazarlar çağın sorunlarına kayıtsız kalamaz. (III) Günümüz yayıncılık sektörü dijitalleşmeyle kabuk değiştirmektedir... Bu parçadaki numaralanmış cümlelerden hangisi düşüncenin akışını bozmaktadır?"`,
    `[ÖSYM Sözel Mantık Kalıbı]: "Ahmet, Burak, Ceyda, Deniz, Elif, Fatih ve Gökhan adlı yedi kişi A, B, C polikliniklerine muayene olmaya gitmiştir... Buna göre hangisi kesinlikle doğrudur?"`,
    `[ÖSYM Cümle Yorumu Kalıbı]: "Bu cümleden kesin olarak çıkarılabilecek yargı aşağıdakilerden hangisidir?"`,
    `[ÖSYM Yazım Kuralları Kalıbı]: "Aşağıdaki cümlelerin hangisinde TDK yazım kurallarına aykırı bir kullanım vardır?" (Bitişik/ayrı yazılan birleşik kelimeler, büyük harfler).`,
    `[ÖSYM Ses Olayları Kalıbı]: "Bu parçadaki altı çizili sözcüklerin hangisinde türeme veya daralma ses olayı yoktur?"`,
    `[ÖSYM Sözcük Türleri Kalıbı]: "Aşağıdaki cümlelerin hangisinde yer alan ikileme diğerlerinden farklı bir görevde (zarf, sıfat) kullanılmıştır?"`,
  ],

  matematik: [
    `[ÖSYM Kâr-Zarar / Problem Kalıbı]: "Bir giyim mağazasında etiket fiyatı üzerinden %30 indirim yapıldığında kâr oranı %12 olmaktadır... Mağazanın indirimsiz kâr oranı yüzde kaçtır?"`,
    `[ÖSYM Sayısal Mantık Kalıbı]: "a, b ve c pozitif tam sayıları için a · (b + c) ifadesi tek sayı olduğuna göre..."`,
    `[ÖSYM Üslü/Köklü Sayı Kalıbı]: "İşleminin sonucu kaçtır? (ÖSYM ortak çarpan parantezine alma ve sadeleştirme kurgusu)"`,
    `[ÖSYM Grafik Yorumlama Kalıbı]: "Daire grafiğinde bir çiftliğin yıllık ürün üretimi gösterilmiştir..."`,
    `[ÖSYM Bölünebilme Kalıbı]: "Üç basamaklı 5AB sayısı 15 ile tam bölünebildiğine göre A + B toplamının alabileceği en büyük değer kaçtır?"`,
    `[ÖSYM Yaş Problemi Kalıbı]: "Bir babanın yaşı, iki çocuğunun yaşları toplamının 3 katına eşittir..."`,
  ],

  geometri: [
    `[ÖSYM Dik Üçgen/Öklid Kalıbı]: "Bir ABC dik üçgeninde m(A) = 90°, A köşesinden hipotenüse indirilen yüksekliğin uzunluğu h_a..."`,
    `[ÖSYM Dörtgen/Kare Kalıbı]: "Bir ABCD karesinde [AC] köşegen uzunluğu 8√2 cm olduğuna göre karenin alanı kaç cm²'dir?"`,
    `[ÖSYM Analitik Geometri Kalıbı]: "Analitik düzlemde verilen A(2,4) ve B(6,12) noktalarından geçen doğrunun eğimi kaçtır?"`,
    `[ÖSYM Katı Cisim Kalıbı]: "Taban yarıçapı 3 cm ve yüksekliği 8 cm olan bir dik dairesel silindirin hacmi kaç π cm³'tür?"`,
  ],

  tarih: [
    `[ÖSYM Osmanlı Tımar/Eyalet Kalıbı]: "Osmanlı Devleti'nde Tımar sisteminin uygulanmasıyla aşağıdakilerden hangisi doğrudan hedeflenmemiştir?"`,
    `[ÖSYM Erzurum/Sivas Kongresi Kalıbı]: "Milli Mücadele Dönemi'nde 'Manda ve himaye kabul edilemez' kararı ilk kez aşağıdaki gelişmelerden hangisinde alınmıştır?"`,
    `[ÖSYM Atatürk İlkeleri Kalıbı]: "Aşağıdaki inkılaplardan hangisi Doğrudan Halkçılık ilkesi doğrultusunda gerçekleştirilmiştir?"`,
    `[ÖSYM Islahatlar Kalıbı]: "XIX. Yüzyılda Osmanlı Devleti'nde Padişahın kendi yetkilerini ilk kez kısıtladığı belge aşağıdakilerden hangisidir?"`,
    `[ÖSYM Türk-İslam Tarihi Kalıbı]: "Karahanlılar Dönemi'ne ait aşağıdaki eserlerden hangisi Türk-İslam edebiyatının ilk yazılı örneği kabul edilir?"`,
  ],

  cografya: [
    `[ÖSYM Türkiye Fiziki Coğrafya Kalıbı]: "Türkiye'nin yer şekilleri göz önüne alındığında, aşağıdaki akarsularımızdan hangisi açık havza özelliğinde olup delta ovası oluşturur?"`,
    `[ÖSYM Ekonomik Coğrafya Kalıbı]: "Türkiye'de çıkarılan boksit madeninin işlendiği Alüminyum Tesisleri aşağıdaki ilçelerden hangisinde yer alır?"`,
    `[ÖSYM Nüfus/Beşeri Coğrafya Kalıbı]: "Türkiye'de nüfusun alansal dağılışında aşağıdakilerden hangisinin etkisi diğerlerine göre daha azdır?"`,
    `[ÖSYM Kalkınma Projeleri Kalıbı]: "Güneydoğu Anadolu Projesi (GAP) kapsamında sulu tarıma geçilmesiyle aşağıdaki ürünlerden hangisinin ekim alanında belirgin bir artış yaşanmıştır?"`,
  ],

  vatandaslik: [
    `[ÖSYM Temel Hukuk Kalıbı]: "1982 Anayasası'na göre, bir kimsenin kendi iradi fiilleriyle hak edinebilme ve borç altına girebilme ehliyetine ne ad verilir?"`,
    `[ÖSYM Anayasa Hukuku Kalıbı]: "1982 Anayasası'na göre, Cumhurbaşkanlığı kararnamelerinin yargısal denetimini yapmaya yetkili organ aşağıdakilerden hangisidir?"`,
    `[ÖSYM İdare Hukuku Kalıbı]: "657 sayılı Devlet Memurları Kanunu'na göre aşağıdakilerden hangisi memura verilen disiplin cezalarından biri değildir?"`,
    `[ÖSYM Danışma Organları Kalıbı]: "Aşağıdakilerden hangisi merkeze yardımcı danışma organlarından biri olarak görev yapar?"`,
  ],

  guncel: [
    `[ÖSYM Uluslararası Kuruluşlar Kalıbı]: "UNESCO Dünya Mirası Listesi'nde yer alan ve 'Tarihin Sıfır Noktası' olarak kabul edilen Göbeklitepe hangi ilimizdedir?"`,
    `[ÖSYM Uzay/Bilim Kalıbı]: "Türkiye'nin ilk yerli ve milli haberleşme uydusu aşağıdakilerden hangisidir?"`,
    `[ÖSYM Dünya Gündemi Kalıbı]: "2026 yılı Türk Dünyası Kültür Başkenti olarak ilan edilen şehir aşağıdakilerden hangisidir?"`,
  ],
};

/**
 * Returns formatted exemplar text prompt injection for the given subject based on 2006-2025 exam PDFs.
 */
export function getSubjectExemplarPrompt(subjectId: SubjectId): string {
  const exemplars = OSYM_EXEMPLARS_DATABASE[subjectId] || OSYM_EXEMPLARS_DATABASE.turkce;
  
  return `
ÖSYM GEÇMİŞ SINAV SORU ÇERÇEVESİ VE STİL ÖRNEKLERİ (2006 - 2025 ARŞİVİNDEN İLHAM ALINMIŞTIR):
Aşağıdaki gerçek ÖSYM KPSS soru kalıplarını, dil üslubunu, soru köklerini ve çeldirici kurgusunu birebir rehber al:
${exemplars.map((ex, i) => `${i + 1}) ${ex}`).join('\n')}
`;
}
