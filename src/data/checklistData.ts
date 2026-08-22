import { ChecklistItem } from "../types";

export const CHECKLIST_ITEMS: ChecklistItem[] = [
  // 1. Giriş ve Temel Getiri
  {
    id: "chk-1",
    category: "1. Giriş & Getiri (Introduction)",
    question: "Şirket WACC (Sermaye Maliyeti) üzerinde bir ROIC (Sermaye Getirisi) elde ediyor mu?",
    explanation: "Şirketin yatırdığı paradan elde ettiği getiri, para maliyetinden yüksek olmalıdır (ROIC > WACC).",
    highScoreIndicator: "ROIC belirgin şekilde WACC'ın üzerinde (%15+ vs %8 WACC)",
    lowScoreIndicator: "ROIC WACC'ın altında veya başabaş",
  },
  {
    id: "chk-2",
    category: "1. Giriş & Getiri (Introduction)",
    question: "ROIC oranı artıyor mu, düşüyor mu yoksa istikrarlı mı?",
    explanation: "Yıllar içinde ROIC'in korunabilmesi rekabet avantajının kalıcılığını gösterir.",
    highScoreIndicator: "10+ yıldır istikrarlı veya yükselen yüksek ROIC",
    lowScoreIndicator: "Hızla düşen veya aşırı dalgalanan ROIC",
  },
  {
    id: "chk-3",
    category: "1. Giriş & Getiri (Introduction)",
    question: "Hisse fiyatının ne kadarı gelecekte yaratılacak yeni değeri yansıtıyor?",
    explanation: "Piyasanın şirketten aşırı agresif büyüme bekleyip beklemediğinin ölçümü.",
    highScoreIndicator: "Makul oranda (Fiyatın <%40'ı gelecek değer)",
    lowScoreIndicator: "Aşırı spekülatif (Fiyatın >%80'i gerçekleşmesi zor geleceğe bağlı)",
  },

  // 2. Sektör Yapısı ve Haritası (Lay of the Land)
  {
    id: "chk-4",
    category: "2. Sektör Haritası (Lay of the Land)",
    question: "Sektördeki toplam ekonomik kâr (Profit Pool) nasıl dağılıyor ve şirket nerede?",
    explanation: "Kâr havuzunda şirket kârın büyük kısmını üreten kolda mı yoksa sermaye yutan kısımda mı?",
    highScoreIndicator: "Kâr havuzunun en yüksek getirili diliminde konumlanmış",
    lowScoreIndicator: "Sektörün para yutan ve zarar eden halkasında (Örn: Havayolu operatörlüğü)",
  },
  {
    id: "chk-5",
    category: "2. Sektör Haritası (Lay of the Land)",
    question: "Sektördeki 5 yıllık pazar payı değişimi ne kadar istikrarlı?",
    explanation: "Greenwald kuralı: 5 yıllık ortalama pazar payı değişimi ≤ %2 ise istikrarlıdır.",
    highScoreIndicator: "Pazar payları çok stabil (Ortalama değişim < %2)",
    lowScoreIndicator: "Sürekli el değiştiren oynak pazar payları (Değişim > %5)",
  },
  {
    id: "chk-6",
    category: "2. Sektör Haritası (Lay of the Land)",
    question: "Sektör yoğunlaşması (HHI / C4) nasıl bir seyir izliyor?",
    explanation: "İlk 4 şirketin pazar payı toplamı ve pazar liderlerinin gücü.",
    highScoreIndicator: "Oligopol yapı, az sayıda rasyonel büyük oyuncu",
    lowScoreIndicator: "Aşırı parçalanmış, binlerce fiyat kıran küçük rakip",
  },

  // 3. Porter 5 Güç: Tedarikçi, Alıcı, İkame
  {
    id: "chk-7",
    category: "3. Porter 5 Güç (Tedarikçi, Alıcı, İkame)",
    question: "Tedarikçilerin şirket üzerindeki pazarlık gücü ne düzeyde?",
    explanation: "Tedarikçi tekeli var mı, şirket maliyet artışlarını fiyata yansıtabiliyor mu?",
    highScoreIndicator: "Tedarikçiler parçalanmış, şirketin alım gücü ve alternatifi çok",
    lowScoreIndicator: "Tedarikçiler ikili tekel veya güçlü sendikalar (Örn: Havacılıkta Boeing/Airbus ve Pilotlar)",
  },
  {
    id: "chk-8",
    category: "3. Porter 5 Güç (Tedarikçi, Alıcı, İkame)",
    question: "Alıcıların (Müşterilerin) fiyat duyarlılığı ve pazarlık gücü ne düzeyde?",
    explanation: "Müşteriler fiyat karşılaştırmasını anında yapıp kolayca başka şirkete kaçabiliyor mu?",
    highScoreIndicator: "Müşteriler fiyat duyarsız, ürüne bağımlı ve sadık",
    lowScoreIndicator: "Müşteriler en ucuz 1 kuruşun peşinde, sadakat sıfır",
  },
  {
    id: "chk-9",
    category: "3. Porter 5 Güç (Tedarikçi, Alıcı, İkame)",
    question: "İkame ürünlerin tehdidi ne kadar yüksek?",
    explanation: "Farklı bir sektörden gelen ürün veya hizmet müşterinin ihtiyacını çözebilir mi?",
    highScoreIndicator: "Ürünün doğrudan veya dolaylı hiçbir ikamesi yok",
    lowScoreIndicator: "Hızlı tren veya görüntülü görüşme gibi güçlü ikameler mevcut",
  },

  // 4. Giriş Engelleri (Barriers to Entry)
  {
    id: "chk-10",
    category: "4. Giriş Engelleri (Barriers to Entry)",
    question: "Asgari Verimli Ölçek (MES) toplam pazarın büyük bir kısmını mı oluşturuyor?",
    explanation: "Yeni bir rakibin kârlı olabilmesi için devasa pazar payı kapması gerekiyor mu?",
    highScoreIndicator: "MES çok yüksek, küçük kalan rakipler birim maliyetten batar",
    lowScoreIndicator: "MES çok düşük, herkes ucuza dükkan açıp rekabet edebilir",
  },
  {
    id: "chk-11",
    category: "4. Giriş Engelleri (Barriers to Entry)",
    question: "Şirket güçlü doğrudan veya dolaylı Ağ Etkilerine (Network Effects) sahip mi?",
    explanation: "Kullanıcı sayısı arttıkça platformun değeri katlanarak büyüyor mu?",
    highScoreIndicator: "Kullanıcılar platformu terk edemiyor çünkü herkes orada (Uber, Visa, Apple)",
    lowScoreIndicator: "Ağ etkisi yok, tekil bağımsız ürün",
  },
  {
    id: "chk-12",
    category: "4. Giriş Engelleri (Barriers to Entry)",
    question: "Müşteri geçiş maliyetleri (Switching Costs / Lock-in) yüksek mi?",
    explanation: "Veri taşıma, yeniden öğrenme veya sözleşme cezaları müşteriyi tutuyor mu?",
    highScoreIndicator: "Geçiş maliyeti aşırı yüksek (Tüm kurumsal veriler ve alışkanlıklar bağlı)",
    lowScoreIndicator: "Sıfır geçiş maliyeti, tek tıkla rakibe geçilebilir",
  },
  {
    id: "chk-13",
    category: "4. Giriş Engelleri (Barriers to Entry)",
    question: "Şirket Wright Yasası (Öğrenme Eğrisi) sayesinde maliyet avantajına sahip mi?",
    explanation: "Yılların üretim birikimi ve tecrübesi birim maliyetleri rakiplerin erişemeyeceği yere çekti mi?",
    highScoreIndicator: "Kümülatif üretim devasa, birim maliyette rakipsiz lider",
    lowScoreIndicator: "Öğrenme eğrisi etkisi yok, standart jenerik süreç",
  },
  {
    id: "chk-14",
    category: "4. Giriş Engelleri (Barriers to Entry)",
    question: "Devlet regülasyonları, patentler ve lisanslar şirketi koruyor mu?",
    explanation: "'Regülasyon mevcut liderin dostudur' (Bill Gurley).",
    highScoreIndicator: "20 yıllık güçlü patentler, zorlu lisanslar ve mevzuat koruması",
    lowScoreIndicator: "Hiçbir yasal veya lisans engeli yok",
  },

  // 5. Yıkıcı İnovasyon ve Sektör Çözülmesi
  {
    id: "chk-15",
    category: "5. Yıkım ve Çözülme (Disruption)",
    question: "Sektör alt segmentten gelebilecek yıkıcı bir iş modeline açık mı?",
    explanation: "Liderler en pahalı müşteriye odaklanıp pazarın altını boş bıraktı mı (Overshooting)?",
    highScoreIndicator: "Şirket alt segmenti de kapsayan çok esnek ve verimli bir modele sahip",
    lowScoreIndicator: "Aşırı pahalı, karmaşık ve alt segmentten gelecek saldırılara karşı kırılgan",
  },
  {
    id: "chk-16",
    category: "5. Yıkım ve Çözülme (Disruption)",
    question: "Sektör dikey entegrasyondan yatay modüler yapıya dönüştü mü?",
    explanation: "Sektör standartlaştı mı yoksa hala tek çatı altında sıkı koordinasyon mu gerektiriyor?",
    highScoreIndicator: "Şirket sektörün ihtiyaç duyduğu doğru mimariyi (Dikey/Modüler) yönetiyor",
    lowScoreIndicator: "Modülerleşemeyen karmaşık yapıda tedarikçiler arasında kayboluyor",
  },

  // 6. Şirket İçi Analiz & Değer Çubuğu
  {
    id: "chk-17",
    category: "6. Şirket Analizi (Value Creation)",
    question: "Şirket müşterinin Ödemeye İstekliliğini (WTP) yukarı taşımayı başardı mı?",
    explanation: "Sadece fiyata zam yapmak yerine prestij, kalite veya zaman tasarrufu yarattı mı?",
    highScoreIndicator: "Müşteriler gönüllü olarak yüksek prim ödemeye razı",
    lowScoreIndicator: "Fiyat artırıldığı anda müşteriler hemen rakibe kaçıyor",
  },
  {
    id: "chk-18",
    category: "6. Şirket Analizi (Value Creation)",
    question: "Şirket tedarikçi ve çalışanların WTS'ini düşüren verimlilik ve kültüre sahip mi?",
    explanation: "Veri paylaşımı (Walmart-P&G) veya çalışan özerkliği (Costco/Lehman) ile maliyet tabanı indi mi?",
    highScoreIndicator: "Tedarikçiler ve çalışanlar şirketle çalışmaktan mutlu ve daha verimli",
    lowScoreIndicator: "Yüksek personel sirkülasyonu, tedarikçilerle sürekli kanlı bıçaklı kavga",
  },
  {
    id: "chk-19",
    category: "6. Şirket Analizi (Value Creation)",
    question: "DuPont ROIC ayrıştırmasında şirket hangi net avantaja sahip?",
    explanation: "Farklılaşma (Yüksek NOPAT Marjı) mı yoksa Maliyet Liderliği (Yüksek Sermaye Devri) mi?",
    highScoreIndicator: "Net ve tutarlı bir strateji (Ya Apple gibi devasa marj ya Costco gibi devasa devir hızı)",
    lowScoreIndicator: "Ortada sıkışmış (Stuck in the middle - Ne ucuz ne kaliteli)",
  },
  {
    id: "chk-20",
    category: "6. Şirket Analizi (Value Creation)",
    question: "Nakit Dönüşüm Süresi (CCC) ve işletme sermayesi verimli mi?",
    explanation: "Şirket parasını stoklara mı bağlıyor yoksa Amazon gibi negatif CCC ile mi büyüyor?",
    highScoreIndicator: "Negatif veya çok düşük CCC (Parayı peşin alıp tedarikçiyi vadeli öder)",
    lowScoreIndicator: "Parası aylarca depolardaki stoklarda kilitli kalıyor",
  },

  // 7. Oyun Teorisi ve Markalar
  {
    id: "chk-21",
    category: "7. Oyun Teorisi & Markalar",
    question: "Şirket komşu pazarlara 'Bağla ve Kaldıraçla' (Linking & Leveraging) stratejisiyle yayılabiliyor mu?",
    explanation: "Mevcut altyapısını kullanarak sıfır maliyetle yeni iş kolları açabiliyor mu (Amazon AWS)?",
    highScoreIndicator: "Ana platformunu kaldıraç yaparak devasa yan sektörlere hükmediyor",
    lowScoreIndicator: "Tek bir ürüne sıkışmış, genişleme yeteneği yok",
  },
  {
    id: "chk-22",
    category: "7. Oyun Teorisi & Markalar",
    question: "Marka, tüketicinin arama maliyetini veya risk algısını azaltarak somut bir WTP primi yaratıyor mu?",
    explanation: "Tiffany vs Costco pırlanta testi: İnsanlar marka güvencesi için fazladan ödüyor mu?",
    highScoreIndicator: "Marka tartışmasız fiyat primi veya alışkanlık yaratıyor (Tiffany, Coca-Cola)",
    lowScoreIndicator: "Marka sadece bir logo, hiçbir fiyat esnekliği sağlamıyor",
  }
];
