import { CompanyAuditDossier, FinancialMetricInputs } from "../types";

export interface BalanceSheetGuideItem {
  id: string;
  metricName: string;
  formula: string;
  whereToFindTr: string; // KAP / BIST Finansal Tablo Yolu
  whereToFindUs: string; // SEC 10-K / GAAP Yolu
  practicalMeaning: string;
  warningTip: string;
}

export const BALANCE_SHEET_GUIDE: BalanceSheetGuideItem[] = [
  {
    id: "ebit",
    metricName: "Esas Faaliyet Kârı (EBIT / Operating Income)",
    formula: "Hasılat - Satışların Maliyeti - Faaliyet Giderleri (Pazarlama, Ar-Ge, Genel Yönetim)",
    whereToFindTr: "Gelir Tablosu -> 'Esas Faaliyet Kârı (Zararı)' kalemi. (Finansman giderleri ve vergiden ÖNCEKİ satır).",
    whereToFindUs: "Income Statement -> 'Operating Income' veya 'Operating Profit'.",
    practicalMeaning: "Şirketin ana işinden, finansman borçlarından bağımsız olarak ne kadar operasyonel kâr ürettiğini gösterir.",
    warningTip: "Diğer Faaliyetlerden Gelirler/Giderler (kur farkı vb.) gibi tek seferlik kalemleri ayıklayarak 'Net Esas Faaliyet Kârı'na odaklanın."
  },
  {
    id: "nopat",
    metricName: "Vergi Sonrası Net Faaliyet Kârı (NOPAT)",
    formula: "Esas Faaliyet Kârı (EBIT) × (1 - Efektif Vergi Oranı)",
    whereToFindTr: "Gelir Tablosu'ndan EBIT alınır. Dipnotlardaki Vergi Gideri / Vergi Öncesi Kâr ile efektif vergi oranı (%) hesaplanıp çarpılır.",
    whereToFindUs: "Operating Income × (1 - Effective Tax Rate).",
    practicalMeaning: "Şirketin sıfır borcu olsaydı ve sadece ana faaliyetinden elde ettiği kâr üzerinden vergi ödeseydi hissedarlara ve borç verenlere kalacak net nakit akımı.",
    warningTip: "Net Kâr yerine mutlaka NOPAT kullanılmalıdır çünkü Net Kâr borç faizlerinden etkilenir, operasyonel üstünlüğü gizler."
  },
  {
    id: "invested_capital",
    metricName: "Yatırılan Sermaye (Invested Capital - IC)",
    formula: "(Toplam Varlıklar - Nakit ve Nakit Benzerleri) - Faizsiz Kısa Vadeli Borçlar (Ticari Borçlar)",
    whereToFindTr: "Bilanço -> Varlıklar toplamından (Dönen Varlıklar içindeki Nakit ve Finansal Yatırımlar) çıkarılır. Yükümlülüklerden Ticari Borçlar ve diğer faizsiz borçlar düşülür.",
    whereToFindUs: "Balance Sheet -> Total Assets - Cash & Short-Term Equivalents - Non-Interest Bearing Current Liabilities (Accounts Payable).",
    practicalMeaning: "Şirketin bu kârı üretmek için işe fiilen bağladığı toplam net sermaye (fabrikalar, stoklar, net işletme sermayesi).",
    warningTip: "Kasada duran atıl fazla nakit operasyon için şart değilse yatırılan sermayeden çıkarılmalıdır, aksi halde ROIC haksız yere düşük çıkar."
  },
  {
    id: "roic",
    metricName: "Yatırılan Sermaye Getirisi (ROIC)",
    formula: "NOPAT / Yatırılan Sermaye (Invested Capital)",
    whereToFindTr: "Yukarıdaki NOPAT'ın Yatırılan Sermaye'ye bölünmesiyle bulunur.",
    whereToFindUs: "NOPAT / Invested Capital.",
    practicalMeaning: "İşe yatırılan her 100 TL veya 100 $ sermaye karşılığında şirketin kaç TL/Dolar vergi sonrası operasyonel getiri ürettiği. (%20+ mükemmel hendek işaretidir).",
    warningTip: "ROE (Özsermaye Kârlılığı) şirketin borçlanarak yapay şekilde yükseltebileceği bir metriktir. ROIC ise borç hilesine kanmaz!"
  },
  {
    id: "wacc",
    metricName: "Sermaye Maliyeti (WACC - Hurdle Rate)",
    formula: "(Özsermaye Payı × Özsermaye Maliyeti) + (Borç Payı × Borç Maliyeti × (1 - Vergi))",
    whereToFindTr: "Genellikle risksiz faiz oranı (Türkiye 10 Yıllık Tahvil) + Hisse Beta × Hisse Risk Primi formülüyle tahmin edilir (Genelde BIST için %25-35, ABD için %8-10).",
    whereToFindUs: "Weighted Average Cost of Capital (US piyasasında ortalama %8-%10 aralığındadır).",
    practicalMeaning: "Yatırımcıların ve bankaların bu şirkete sermaye sağlarken talep ettiği asgari getiri oranı.",
    warningTip: "ROIC > WACC ise şirket hissedara EKONOMİK DEĞER YARATIR. ROIC < WACC ise şirket büyüdükçe değer yok eder!"
  },
  {
    id: "pricing_power",
    metricName: "Fiyatlama Gücü (Pricing Power / WTP Kanıtı)",
    formula: "Enflasyon / Maliyet Artış Dönemlerinde Brüt Kâr Marjı (Gross Margin) Değişimi",
    whereToFindTr: "Faaliyet Raporu & Gelir Tablosu -> (Hasılat - Satışların Maliyeti) / Hasılat. Son 5 yıldaki krizlerde marj korundu mu?",
    whereToFindUs: "Gross Profit Margin stability over 5-10 years across inflation cycles.",
    practicalMeaning: "Şirket girdi maliyetleri (hammadde, işçilik) arttığında bunu müşterisine hissettirmeden veya müşteri kaybetmeden zam olarak yansıtabiliyor mu?",
    warningTip: "Müşterinin gitmeye yeri yoksa (geçiş maliyeti yüksekse) brüt kâr marjı krizlerde bile sabit kalır veya artar."
  }
];

export const MAUBOUSSIN_GUIDED_TEMPLATE: CompanyAuditDossier = {
  id: "mauboussin-master-template",
  companyName: "Mauboussin 'Measuring the Moat' Rehberli Vaka Taslağı (Costco & Hibrit Model)",
  ticker: "COST-REHBER",
  industry: "Üyelik Modelli Toptan & İndirimli Perakende (Warehouse Club)",
  description: "Michael Mauboussin'in 5 adımlı ekonomik hendek metodolojisini (ROIC, Kâr Havuzu, WTP/WTS Değer Çubuğu, Oyun Teorisi ve CAP) adım adım inceleyip pratik yapabileceğin tam teşekküllü rehberli vaka taslağı.",
  financials: {
    revenue: 242000,
    operatingIncome: 8500,
    effectiveTaxRate: 26,
    totalAssets: 68000,
    cashAndEquivalents: 14000,
    nonInterestCurrentLiabilities: 28000,
    wacc: 8.5
  },
  industryStructure: {
    supplierPower: "düşük",
    buyerPower: "düşük",
    threatOfNewEntrants: "düşük",
    threatOfSubstitutes: "orta",
    industryRivalry: "düşük",
    profitPoolPosition: "Üyelik aidatları (Membership fees) toplam faaliyet kârının %70'inden fazlasını oluşturur. Ürünleri neredeyse maliyetine satarak tedarikçiden ve müşteriden kâr çekmek yerine ekosisteme bağlar."
  },
  competitiveAdvantage: {
    primaryType: "ölçek_avantajı",
    subDrivers: ["Ölçek Ekonomisi", "Geçiş Maliyeti", "Süreç Üstünlüğü", "Nitelikli Tedarikçi Pazarlığı", "Arama Maliyeti/Marka"],
    pricingPowerEvidence: "Üyelik yenileme oranı %92+ seviyesindedir. Üyelik ücretlerine yapılan zamlar müşteri tabanını kaybettirmez çünkü müşteri tasarrufunun aidattan katbekat fazla olduğunu bilir (Aşırı WTP - Tüketici Artığı).",
    costAdvantageEvidence: "Sadece 3.800 SKU (süpermarketlerin 10'da 1'i) ile devasa palet alımları yapar. Reklam harcaması 0 TL'dir. Negatif işletme sermayesiyle tedarikçinin parasıyla iş çevirir."
  },
  interactionAndDiscipline: {
    capacityDiscipline: "yüksek",
    priceWarRisk: "düşük",
    managementCapitalAllocation: "mükemmel"
  },
  sustainability: {
    estimatedCapYears: 20,
    moatWidth: "Geniş Hendek (Wide)",
    keyVulnerability: "E-ticaret lojistik ağlarının fiziki toptan alışverişe olan ihtiyacı aşındırması veya genç neslin fiziksel mağaza ziyaret sıklığının düşmesi."
  },
  notes: `[MAUBOUSSIN ÇALIŞMA REHBERİ]:
1. ROIC Analizi: Yüksek ROIC sadece yüksek kâr marjıyla değil, yıldırım hızında sermaye devir hızı (Capital Turnover) ile de üretilebilir (DuPont Yasası).
2. Değer Çubuğu: Tüketiciye maliyet avantajını doğrudan aktaran (Scale-Economies Shared) şirketler rakipler için aşılması imkansız bir hendek yaratır.
3. Negatif İşletme Sermayesi: Müşteriden nakit peşin alınır, tedarikçiye 60 gün sonra ödenir; bu sayede iş büyüdükçe dışarıdan sermaye gerektirmez.`,
  updatedAt: "2026-08-22",
  createdAt: "2026-08-22",
  isCustom: false,
  lastStep: 1,
  tags: ["Rehber Taslak", "Mauboussin Vakası", "Geniş Hendek"]
};

export interface StepMethodologyGuide {
  step: number;
  title: string;
  mauboussinQuote: string;
  coreConcepts: string[];
  keyQuestions: string[];
  commonPitfalls: string[];
  practicalExercise: string;
}

export const STEP_METHODOLOGY_GUIDES: Record<number, StepMethodologyGuide> = {
  1: {
    step: 1,
    title: "Adım 1: Finansal Röntgen (ROIC & DuPont Ayrıştırması)",
    mauboussinQuote: "'Stratejinin temel amacı sürdürülebilir bir ekonomik değer (ROIC > WACC) yaratmaktır. Büyüme, ancak getiri sermaye maliyetini aştığı zaman değer yaratır.' — Michael J. Mauboussin",
    coreConcepts: [
      "NOPAT (Net Operating Profit After Tax): Borç yapısından bağımsız ana faaliyet kârı.",
      "Invested Capital (Yatırılan Sermaye): Şirketin işe fiilen bağladığı net operasyonel sermaye (Varlıklar - Nakit - Faizsiz Borçlar).",
      "DuPont Ayrıştırması: ROIC = NOPAT Marjı (%) × Sermaye Devir Hızı (Kez). Kâr marjınız düşük olsa bile sermayeyi hızlı döndürerek devasa ROIC üretebilirsiniz (BIM/Costco örneği).",
      "Ekonomik Yayılım (Spread): ROIC - WACC farkı. Bu fark pozitifse şirket her 100 TL yatırımla hissedarına zenginlik katar."
    ],
    keyQuestions: [
      "Şirketin son 3-5 yıllık ROIC ortalaması sermaye maliyetinin (WACC) belirgin şekilde üzerinde mi?",
      "ROIC'i yükselten ana motor yüksek fiyat/marj mı, yoksa hızlı sermaye devri mi?",
      "Kasada bekleyen atıl nakit operasyondan arındırıldı mı?"
    ],
    commonPitfalls: [
      "Net Kâr veya F/K oranına aldanmak (Net Kâr borç faizi ve tek seferlik gelirlerle bozulur; NOPAT'a bakın).",
      "ROE'yi (Özsermaye Kârlılığı) ROIC sanmak (ROE aşırı borçlanarak yapay şekilde şişirilebilir).",
      "WACC'ı hesaba katmadan sadece yüksek ciro büyümesine odaklanmak (ROIC < WACC iken büyüme değer yok eder)."
    ],
    practicalExercise: "İncelediğiniz şirketin NOPAT marjı ile Sermaye Devir Hızını çarpın. Sonucun ROIC ile birebir örtüştüğünü ve şirketin hangi koldan rekabet ettiğini teyit edin."
  },
  2: {
    step: 2,
    title: "Adım 2: Sektör Yapısı & Kâr Havuzu (Industry & Profit Pool)",
    mauboussinQuote: "'Bir şirketin performansı büyük ölçüde içinde bulunduğu sektörün yapısı tarafından belirlenir. Kötü bir sektörde harika bir yönetim bile vasat kalabilir.' — Michael J. Mauboussin",
    coreConcepts: [
      "Porter'ın 5 Gücü: Tedarikçi gücü, Müşteri gücü, Yeni giren tehdidi, İkame tehdidi ve Sektör içi rekabet şiddeti.",
      "Kâr Havuzu (Profit Pool): Değer zincirindeki tüm gelirlerin hangi halkada kâra dönüştüğünü gösteren harita.",
      "Sektör Giriş Engelleri: Regülasyonlar, devasa sabit sermaye gereksinimi veya coğrafi tekel konumları."
    ],
    keyQuestions: [
      "Sektördeki toplam kârın çoğunu hangi halka topluyor? (Örn: Havacılıkta havaalanları ve rezervasyon sistemleri mi, uçak şirketleri mi?)",
      "Yeni bir rakip yarın pazara girmek istese ne kadar sermaye ve zaman harcamak zorunda kalır?",
      "Müşteriler veya tedarikçiler birleşerek fiyat baskısı kurabiliyor mu?"
    ],
    commonPitfalls: [
      "Sadece şirketin kendi operasyonuna odaklanıp sektörün yapısal bozukluğunu görmezden gelmek.",
      "Cirosu çok yüksek olan halkaların kâr havuzunun da büyük olduğunu varsaymak."
    ],
    practicalExercise: "Şirketin değer zincirindeki tedarikçilerini ve alıcılarını listeleyin. Şirketin kimden fiyat tavizi koparabildiğini belirleyin."
  },
  3: {
    step: 3,
    title: "Adım 3: Değer Çubuğu & Hendek Motorları (WTP / WTS & Moat Drivers)",
    mauboussinQuote: "'Ekonomik hendek, müşterinin ödeme istekliliği (WTP) ile tedarikçinin satış istekliliği (WTS) arasındaki mesafeyi rakiplerden daha fazla açabilmektir.' — Michael J. Mauboussin",
    coreConcepts: [
      "Tüketici Avantajı (WTP Artışı): Geçiş Maliyeti (Switching Cost), Ağ Etkisi (Network Effect), Arama Maliyeti & Güçlü Marka.",
      "Üretim / Maliyet Avantajı (WTS İndirimi): Eşsiz hammadde erişimi, patentler veya devasa coğrafi lojistik üstünlüğü.",
      "Ölçek Ekonomisi (Scale Economics): Sabit maliyetlerin devasa satış hacmine bölünerek birim maliyetin rakiplerin erişemeyeceği seviyeye indirilmesi.",
      "Fiyatlama Gücü (Pricing Power): Enflasyon döneminde müşteri kaybetmeden zam yapabilme kabiliyeti."
    ],
    keyQuestions: [
      "Müşteri bu şirketin ürününü bırakıp rakibe geçerse hangi maddi/manevi maliyetlere katlanır?",
      "Yeni kullanıcılar katıldıkça sistem mevcut kullanıcılar için daha değerli hale geliyor mu? (Ağ Etkisi)",
      "Şirket maliyet avantajını cebe mi atıyor yoksa 'Scale-Economies Shared' ile tüketiciye aktarıp rakipleri mi boğuyor?"
    ],
    commonPitfalls: [
      "Geçiş maliyeti olmayan sadece popüler bir reklam kampanyasını 'Geniş Hendek' sanmak.",
      "Patent süresinin bitimine az kalmış ilaç/teknoloji şirketlerinde hendeği kalıcı zannetmek."
    ],
    practicalExercise: "Şirketin son 3 kriz veya enflasyon dönemindeki Brüt Kâr Marjı (Gross Margin) değişimini inceleyin. Fiyatlama gücünü kanıtlayın."
  },
  4: {
    step: 4,
    title: "Adım 4: Oyun Teorisi, Kapasite & Sermaye Tahsisi",
    mauboussinQuote: "'Rakiplerin stratejik hamleleri ve yönetimin serbest nakdi nereye tahsis ettiği, hendeklerin ömrünü belirleyen en kritik etkileşimlerdir.' — Michael J. Mauboussin",
    coreConcepts: [
      "Mahkumlar Çıkmazı (Prisoner's Dilemma): Sektördeki oyuncuların fiyat kırarak veya aşırı kapasite kurarak birbirlerinin kârını yok etmesi riski.",
      "Kapasite Disiplini: Sektör oyuncularının talep düşüşlerinde üretimi kısabilme olgunluğu.",
      "Sermaye Tahsisi (Capital Allocation): Yönetimin ürettiği nakdi; Organik Büyüme, Temettü, Hisse Geri Alımı veya Satın Almalara (M&A) ne kadar rasyonel yönlendirdiği."
    ],
    keyQuestions: [
      "Sektörde yıkıcı fiyat kırma savaşları yaşanıyor mu?",
      "Yönetim hisseler ucuzken hisse geri alımı yapıyor mu, yoksa pahalı satın almalarla hissedar değerini mi yok ediyor?",
      "Kapasite fazlası riski var mı?"
    ],
    commonPitfalls: [
      "Yüksek ciro büyümesi için verimsiz şirket satın almaları (M&A) yapan yönetimleri başarılı sanmak.",
      "Döngünün zirvesinde yapılan devasa fabrika yatırımlarının sonraki yıllarda ROIC'i çökerteceğini öngörememek."
    ],
    practicalExercise: "Yönetimin son 3 yılda serbest nakit akımını (FCF) nereye harcadığını kontrol edin: Temettü, hisse geri alımı, borç ödeme mi yoksa agresif satın alma mı?"
  },
  5: {
    step: 5,
    title: "Adım 5: Hendek Ömrü (CAP) & Nihai Teşhis Raporu",
    mauboussinQuote: "'Rekabetçi Avantaj Dönemi (CAP), bir şirketin sermaye maliyetinin üzerinde getiri üretebileceği süredir. Piyasalar genellikle bu süreyi yanlış fiyatlar.' — Michael J. Mauboussin",
    coreConcepts: [
      "CAP (Competitive Advantage Period): Hendeklerin rakipler tarafından kopyalanana kadar şirketi koruduğu süre (Genelde 5-20 yıl).",
      "Ortalamaya Dönüş (Mean Reversion): Yüksek kârların zamanla yeni rakipleri çekerek ROIC'i sektör ortalamasına çekme eğilimi.",
      "Yıkıcı İnovasyon (Disruption) Tehdidi: Hendek duvarlarını aşmak yerine hendeği anlamsız kılan yeni teknoloji veya iş modelleri."
    ],
    keyQuestions: [
      "Bu şirketin ROIC'i önümüzdeki 10 yıl boyunca WACC'ın üzerinde kalmaya devam edebilir mi?",
      "Hendeği tehdit eden en büyük teknolojik, regülatif veya tüketici alışkanlığı riski nedir?",
      "100 üzerinden Mauboussin Hendek Skoru kaç çıktı ve sonuç Geniş mi, Dar mı?"
    ],
    commonPitfalls: [
      "Bugünkü yüksek kârlılığın sonsuza kadar aynı hızla süreceğini varsaymak (Ortalamaya dönüş yasasını unutmak).",
      "Hendek genişliği ile hisse senedi değerlemesini (Fiyat/Değer) karıştırmak (Harika bir hendek bile aşırı pahalı fiyattan alınırsa kötü yatırım olabilir)."
    ],
    practicalExercise: "Tek tıkla kopyalanabilir yatırımcı notunu inceleyin ve şirketin en kırılgan 1 zayıf noktasını belirleyin."
  }
};

export const INITIAL_PRESET_DOSSIERS: CompanyAuditDossier[] = [
  MAUBOUSSIN_GUIDED_TEMPLATE,
  {
    id: "bim-dossier",
    companyName: "BİM Birleşik Mağazalar",
    ticker: "BIMAS (BIST)",
    industry: "İndirimli Perakende (Hard-Discount Retail)",
    description: "Yüksek hacim, özel markalı (private label) sınırlı ürün portföyü ve sıfır lüks mağaza konseptiyle Türkiye'nin en büyük perakendecisi.",
    financials: {
      revenue: 420000,
      operatingIncome: 21000,
      effectiveTaxRate: 25,
      totalAssets: 135000,
      cashAndEquivalents: 22000,
      nonInterestCurrentLiabilities: 65000,
      wacc: 28
    },
    industryStructure: {
      supplierPower: "düşük",
      buyerPower: "düşük",
      threatOfNewEntrants: "orta",
      threatOfSubstitutes: "orta",
      industryRivalry: "orta",
      profitPoolPosition: "Tedarikçilere karşı devasa alım gücü (Buyer Monopsony) ve negatif nakit dönüşüm süresi (CCC)."
    },
    competitiveAdvantage: {
      primaryType: "ölçek_avantajı",
      subDrivers: ["Ölçek Ekonomisi", "Süreç Üstünlüğü", "Nitelikli Tedarikçi Pazarlığı"],
      pricingPowerEvidence: "En ucuz sepet garantisi vererek enflasyon döneminde pazar payı kazanma yeteneği.",
      costAdvantageEvidence: "Mağaza başına 750 SKU sınırlaması, kutudan satış ve düşük lojistik maliyetleriyle sektörün en düşük faaliyet gideri/satış oranı."
    },
    interactionAndDiscipline: {
      capacityDiscipline: "yüksek",
      priceWarRisk: "düşük",
      managementCapitalAllocation: "mükemmel"
    },
    sustainability: {
      estimatedCapYears: 15,
      moatWidth: "Geniş Hendek (Wide)",
      keyVulnerability: "Online hızlı teslimat kanallarının geleneksel mağaza trafiğini aşındırması riski."
    },
    notes: "BIM düşük kâr marjı (%3-5 NOPAT) ancak yıldırım hızında sermaye devir hızı (5x+) ile yüksek ROIC üretir.",
    updatedAt: "2026-08-20"
  },

  {
    id: "apple-dossier",
    companyName: "Apple Inc.",
    ticker: "AAPL (NASDAQ)",
    industry: "Tüketici Elektroniği & Dijital Ekosistem",
    description: "iOS, macOS, App Store ve iCloud donanım-yazılım entegrasyonuyla 2 milyardan fazla aktif cihazı birbirine bağlayan küresel ekosistem.",
    financials: {
      revenue: 385000,
      operatingIncome: 115000,
      effectiveTaxRate: 16,
      totalAssets: 350000,
      cashAndEquivalents: 65000,
      nonInterestCurrentLiabilities: 125000,
      wacc: 9
    },
    industryStructure: {
      supplierPower: "düşük",
      buyerPower: "düşük",
      threatOfNewEntrants: "düşük",
      threatOfSubstitutes: "düşük",
      industryRivalry: "düşük",
      profitPoolPosition: "Akıllı telefon sektöründeki toplam küresel faaliyet kârının %85'ini tek başına toplar."
    },
    competitiveAdvantage: {
      primaryType: "tüketici_avantajı",
      subDrivers: ["Geçiş Maliyeti", "Ağ Etkisi", "Marka/Arama Maliyeti"],
      pricingPowerEvidence: "iPhone fiyatları her nesilde yükselmesine rağmen %90+ sadakat ve takas oranı.",
      costAdvantageEvidence: "Kendi tasarladığı M-serisi ve A-serisi çiplerle hem performans üstünlüğü hem de donanım marj optimizasyonu."
    },
    interactionAndDiscipline: {
      capacityDiscipline: "yüksek",
      priceWarRisk: "düşük",
      managementCapitalAllocation: "mükemmel"
    },
    sustainability: {
      estimatedCapYears: 20,
      moatWidth: "Geniş Hendek (Wide)",
      keyVulnerability: "Antitröst düzenlemeleri ve App Store komisyonlarına getirilecek regülasyon baskıları."
    },
    notes: "Apple yüksek WTP (Tüketici Ödeme İstekliliği) ve yüksek geçiş maliyeti sayesinde %50+ ROIC üretmektedir.",
    updatedAt: "2026-08-21"
  },
  {
    id: "thy-dossier",
    companyName: "Türk Hava Yolları",
    ticker: "THYAO (BIST)",
    industry: "Havacılık & Global Transfer Hub",
    description: "İstanbul Havalimanı mega-hub coğrafi avantajı ile dünyada en fazla ülkeye uçan bayrak taşıyıcı havayolu.",
    financials: {
      revenue: 650000,
      operatingIncome: 75000,
      effectiveTaxRate: 20,
      totalAssets: 950000,
      cashAndEquivalents: 110000,
      nonInterestCurrentLiabilities: 180000,
      wacc: 24
    },
    industryStructure: {
      supplierPower: "yüksek",
      buyerPower: "yüksek",
      threatOfNewEntrants: "orta",
      threatOfSubstitutes: "düşük",
      industryRivalry: "yüksek",
      profitPoolPosition: "Havacılık sektöründe havaalanları ve rezervasyon sistemleri kârı emerken, THY kargo ve transfer hacmiyle öne çıkar."
    },
    competitiveAdvantage: {
      primaryType: "ölçek_avantajı",
      subDrivers: ["Ölçek Ekonomisi", "Coğrafi Hub Avantajı", "Kargo Entegrasyonu"],
      pricingPowerEvidence: "Kuzey-Güney ve Doğu-Batı aktarmalı yolcularda düşük birim koltuk maliyeti ile rekabetçi fiyat sunma.",
      costAdvantageEvidence: "İstanbul hub'ının 4 saatlik uçuş menzilinde 60+ başkente erişim sağlamasıyla yüksek filo verimliliği."
    },
    interactionAndDiscipline: {
      capacityDiscipline: "orta",
      priceWarRisk: "orta",
      managementCapitalAllocation: "ortalama"
    },
    sustainability: {
      estimatedCapYears: 8,
      moatWidth: "Dar Hendek (Narrow)",
      keyVulnerability: "Jet yakıtı dalgalanmaları, jeopolitik krizler ve küresel havayolu kapasite fazlası."
    },
    notes: "Sektörün doğası gereği yüksek sermaye yoğunluğu (uçak filoları) ROIC'i döngüsel kılar.",
    updatedAt: "2026-08-19"
  },
  {
    id: "nvidia-dossier",
    companyName: "Nvidia Corporation",
    ticker: "NVDA (NASDAQ)",
    industry: "Yapay Zekâ Donanımı & Hızlandırılmış Hesaplama",
    description: "CUDA yazılım mimarisi ve GPU donanım entegrasyonuyla üretken yapay zekânın küresel fiili standardı.",
    financials: {
      revenue: 120000,
      operatingIncome: 75000,
      effectiveTaxRate: 15,
      totalAssets: 85000,
      cashAndEquivalents: 35000,
      nonInterestCurrentLiabilities: 18000,
      wacc: 10
    },
    industryStructure: {
      supplierPower: "orta",
      buyerPower: "orta",
      threatOfNewEntrants: "düşük",
      threatOfSubstitutes: "düşük",
      industryRivalry: "düşük",
      profitPoolPosition: "Yapay zekâ ekosisteminde donanım ve yazılım kâr havuzunun aslan payını tek başına toplar."
    },
    competitiveAdvantage: {
      primaryType: "tüketici_avantajı",
      subDrivers: ["Geçiş Maliyeti", "Ağ Etkisi", "Süreç Üstünlüğü", "Patent/Lisans"],
      pricingPowerEvidence: "H100 ve Blackwell çiplerinde %75+ brüt kâr marjı ve aylar süren müşteri bekleme listeleri.",
      costAdvantageEvidence: "CUDA yazılım kütüphanesinin 4+ milyon geliştirici tarafından 18 yıldır kullanılması nedeniyle rakip donanımlara geçiş maliyetinin imkansıza yakın olması."
    },
    interactionAndDiscipline: {
      capacityDiscipline: "yüksek",
      priceWarRisk: "düşük",
      managementCapitalAllocation: "mükemmel"
    },
    sustainability: {
      estimatedCapYears: 15,
      moatWidth: "Geniş Hendek (Wide)",
      keyVulnerability: "Büyük bulut müşterilerinin (Google TPU, Amazon Trainium, Meta) kendi iç çiplerini geliştirmesi."
    },
    notes: "Nvidia, Mauboussin'in bahsettiği 'Yazılım Destekli Yüksek Geçiş Maliyeti + Ağ Etkisi' hendek kombinasyonunun en güçlü modern örneğidir.",
    updatedAt: "2026-08-22"
  }
];

// Calculation Helpers
export function calculateFinancialOutputs(inputs: FinancialMetricInputs) {
  const {
    revenue,
    operatingIncome,
    effectiveTaxRate,
    totalAssets,
    cashAndEquivalents,
    nonInterestCurrentLiabilities,
    wacc
  } = inputs;

  // 1. NOPAT = Operating Income * (1 - taxRate / 100)
  const taxMultiplier = Math.max(0, 1 - (effectiveTaxRate / 100));
  const nopat = operatingIncome * taxMultiplier;

  // 2. Invested Capital = (Total Assets - Cash) - NonInterestLiabilities
  const operatingAssets = Math.max(0, totalAssets - cashAndEquivalents);
  const investedCapital = Math.max(1, operatingAssets - nonInterestCurrentLiabilities);

  // 3. ROIC = NOPAT / Invested Capital
  const roicPercent = (nopat / investedCapital) * 100;

  // 4. DuPont Breakdown
  // NOPAT Margin = NOPAT / Revenue
  const nopatMarginPercent = revenue > 0 ? (nopat / revenue) * 100 : 0;
  // Capital Turnover = Revenue / Invested Capital
  const capitalTurnover = revenue > 0 && investedCapital > 0 ? revenue / investedCapital : 0;

  // 5. Economic Spread = ROIC - WACC
  const spread = roicPercent - wacc;

  // 6. Annual Economic Profit = (ROIC - WACC) * Invested Capital = NOPAT - (WACC * Invested Capital)
  const economicProfit = (spread / 100) * investedCapital;

  return {
    nopat: Number(nopat.toFixed(1)),
    investedCapital: Number(investedCapital.toFixed(1)),
    roicPercent: Number(roicPercent.toFixed(1)),
    nopatMarginPercent: Number(nopatMarginPercent.toFixed(1)),
    capitalTurnover: Number(capitalTurnover.toFixed(2)),
    spread: Number(spread.toFixed(1)),
    economicProfit: Number(economicProfit.toFixed(1)),
    isCreatingValue: spread > 0
  };
}

export function computeMoatScore(dossier: CompanyAuditDossier): {
  score: number;
  maxScore: number;
  scorePercent: number;
  diagnosedMoat: "Geniş Hendek (Wide)" | "Dar Hendek (Narrow)" | "Hendek Yok (None)";
  summaryTags: string[];
} {
  let score = 0;
  const maxScore = 100;
  const tags: string[] = [];

  const fin = calculateFinancialOutputs(dossier.financials);

  // Financial Score (Max 35 pts)
  if (fin.roicPercent >= 25) {
    score += 25;
    tags.push("Üstün ROIC (%25+)");
  } else if (fin.roicPercent >= 15) {
    score += 15;
    tags.push("İyi ROIC (%15-25)");
  } else if (fin.roicPercent >= 10) {
    score += 8;
  }

  if (fin.spread >= 10) {
    score += 10;
    tags.push("Güçlü Ekonomik Katma Değer (Spread > %10)");
  } else if (fin.spread > 0) {
    score += 5;
    tags.push("Pozitif Değer Yaratımı");
  } else {
    tags.push("Değer Yıkımı (ROIC < WACC)");
  }

  // Industry Structure (Max 25 pts)
  const ind = dossier.industryStructure;
  if (ind.threatOfNewEntrants === "düşük") score += 6;
  if (ind.supplierPower === "düşük") score += 5;
  if (ind.buyerPower === "düşük") score += 5;
  if (ind.threatOfSubstitutes === "düşük") score += 5;
  if (ind.industryRivalry === "düşük") score += 4;

  // Competitive Advantage Subdrivers (Max 25 pts)
  const adv = dossier.competitiveAdvantage;
  const driverPoints = adv.subDrivers.length * 6;
  score += Math.min(25, driverPoints);
  if (adv.subDrivers.includes("Geçiş Maliyeti")) tags.push("Yüksek Geçiş Maliyeti");
  if (adv.subDrivers.includes("Ağ Etkisi")) tags.push("Şebeke Etkisi");
  if (adv.subDrivers.includes("Ölçek Ekonomisi")) tags.push("Ölçek Üstünlüğü");

  // Discipline & Management (Max 15 pts)
  const inter = dossier.interactionAndDiscipline;
  if (inter.capacityDiscipline === "yüksek") score += 5;
  if (inter.priceWarRisk === "düşük") score += 5;
  if (inter.managementCapitalAllocation === "mükemmel") score += 5;

  const scorePercent = Math.min(100, Math.round((score / maxScore) * 100));

  let diagnosedMoat: "Geniş Hendek (Wide)" | "Dar Hendek (Narrow)" | "Hendek Yok (None)" = "Hendek Yok (None)";
  if (scorePercent >= 70 && fin.spread > 5) {
    diagnosedMoat = "Geniş Hendek (Wide)";
  } else if (scorePercent >= 45 && fin.spread >= 0) {
    diagnosedMoat = "Dar Hendek (Narrow)";
  }

  return {
    score,
    maxScore,
    scorePercent,
    diagnosedMoat,
    summaryTags: tags
  };
}
