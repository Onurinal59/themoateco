import { LearningModule } from "../types";

export const MODULES_DATA: LearningModule[] = [
  {
    id: 1,
    slug: "hendek-ve-deger-yaratma",
    title: "1. Adım: Şato, Timsahlı Hendek & Gerçek Değer Yaratma",
    subtitle: "Sıfırdan Başlangıç: Bir Şirket Gerçekte Ne Zaman Para Kazanır?",
    estimatedMinutes: 12,
    iconName: "Shield",
    description: "Warren Buffett'ın ünlü ekonomik hendek metaforu, sermaye getirisi (ROIC), sermaye maliyeti (WACC) ve 'Ciro Yapmak' ile 'Değer Yaratmak' arasındaki hayati fark.",
    zeroKnowledgeSummary: "Hiç finans bilmeseniz bile: Bir bakkal veya limonata tezgahı açtığınızı düşünün. Bankadan %10 faizle para alıp, dükkandan sadece %5 kâr ediyorsanız, çok satış yapsanız bile gizlice batıyorsunuzdur!",
    sections: [
      {
        id: "m1-s1",
        title: "1. Warren Buffett'ın Şato ve Hendek Metaforu",
        summary: "Şirketler birer ekonomik kale, rakipler ise o kaleyi ele geçirmek isteyen akıncılardır.",
        content: [
          "Düşünün ki sokağınızda çok lezzetli kahve yapan, tıklım tıklım dolu harika bir kafe açtınız. Kapitalizmin doğası gereği, sizin bu yüksek kârınızı gören onlarca girişimci hemen yan dükkanda benzer kafeler açacaktır.",
          "Warren Buffett şöyle der: 'Biz her işletmeyi bir ekonomik şato olarak düşünürüz. Ve serbest piyasada şatolar sürekli saldırıya uğramaya mahkumdur. Milyonlarca insan o kârı sizden nasıl alacağını düşünür. Asıl soru şudur: O şatoyu koruyan nasıl bir hendeğiniz var?'",
          "Ekonomik Hendek (Economic Moat), rakiplerinizin sizin kârınızı ve müşterilerinizi çalmasını engelleyen, aşılması son derece zor bir koruma kalkanıdır. Hendek ne kadar geniş ve derinse, şirket o kadar uzun yıllar yüksek kâr etmeye devam eder."
        ],
        analogyBox: {
          title: "🏰 Şato ve Timsahlı Hendek Benzetmesi",
          description: "Kalenin içindeki hazine: Şirketin kârları. Kaleye hücum eden askerler: Rakipler. Kalenin etrafındaki timsahlı su hendeği: Şirketin patentleri, marka gücü, ağ etkisi veya maliyet avantajı."
        },
        keyTakeaway: "Bir şirkete uzun vadeli yatırım yaparken ilk ve en temel soru şudur: Bu şirketin kârını rakiplerin taklitlerinden koruyan sürdürülebilir bir hendeği var mı?"
      },
      {
        id: "m1-s2",
        title: "2. ROIC ve WACC: Gerçek Değer Yaratmanın Matematiği",
        summary: "ROIC > WACC ise şirket gerçek bir değer üretir. Aksi halde şirket büyüdükçe hissedar servetini eritir.",
        content: [
          "ROIC (Return on Invested Capital - Yatırılan Sermayenin Getirisi): Şirketin fabrikalarına, mağazalarına, makinelerine ve stoklarına bağladığı her 100 TL'lik sermaye ile yılda kaç TL net faaliyet kârı (NOPAT) ürettiğidir.",
          "WACC (Weighted Average Cost of Capital - Sermaye Maliyeti): Şirketin bu parayı bulmasının (hissedarların beklediği getiri + banka kredi faizi) yıllık fırsat maliyetidir.",
          "Örnek Hesap: Eğer bir şirketin sermaye maliyeti %8 (WACC) ise ve yatırdığı sermayeden %16 (ROIC) kazanıyorsa, aradaki +%8'lik fark (Ekonomik Yayılım / Spread) şirketin hissedarlarına yarattığı gerçek refahtır.",
          "Michael Mauboussin'in araştırması gösteriyor ki: Borsa hisse fiyatlarının ortalama %67'si mevcut durumu, %33'ü ise gelecekte yaratılması beklenen bu katma değeri yansıtır."
        ],
        analogyBox: {
          title: "🍋 Limonata Standı Örneği",
          description: "Standı kurmak için ailenizden %10 faizle (WACC = %10) 1.000 TL borç aldınız. Yaz sonunda 160 TL net kâr ettiniz (ROIC = %16). Ailenize 100 TL faiz ödedikten sonra cebinize 60 TL net refah kalır. Ama sadece 60 TL kâr etseydiniz (%6 ROIC), borcun faizini bile karşılayamazdınız!"
        },
        keyTakeaway: "ROIC sermaye maliyetini (WACC) aşmadıkça, ciro rekoru kıran şirketler bile aslında gizlice hissedar servetini yok etmektedir."
      },
      {
        id: "m1-s3",
        title: "3. Değer Yaratmanın 2 Boyutu & Ortalamaya Dönüş Kanunu",
        summary: "Değer = Farkın Büyüklüğü (Magnitude) × Farkın Süresi (Sustainability / CAP).",
        content: [
          "Yalnızca tek bir yıl yüksek ROIC kazanmak yetmez. İkinci ve çok daha kritik boyut, bu yüksek getiri oranını kaç yıl boyunca rakiplere kaptırmadan koruyabileceğinizdir (Competitive Advantage Period - CAP).",
          "Ortalamaya Dönüş (Regression to the Mean): Mauboussin'in binlerce şirketi incelediği veriler, en yüksek kârlılığa sahip ilk %20'lik şirketlerin bile 5-10 yıl içinde kârlarının piyasa ortalamasına doğru gerilediğini göstermektedir.",
          "Bunun istisnası olan nadir şirketlere 'Compounder' (Bileşik Büyüyenler) denir. Coca-Cola, Apple, Microsoft gibi şirketler 20+ yıl boyunca ROIC > WACC farkını koruyabilmiştir.",
          "Morningstar verilerine göre incelenen şirketlerin yalnızca %17'si 20 yıldan uzun süren 'Geniş Hendek' (Wide Moat) sahibidir."
        ],
        analogyBox: {
          title: "🏃‍♂️ Depar vs Maraton Koşucusu",
          description: "Çok hızlı koşan bir koşucu 100 metrede rekor kırabilir ama 42 kilometrelik maratonda yorulup yavaşlayabilir. Geniş hendekli şirketler, maraton boyunca tempolarını koruyan dünya şampiyonlarıdır."
        },
        keyTakeaway: "Yatırım dünyasında en büyük servetler, hendeği piyasanın tahmin ettiğinden çok daha uzun yıllar dayanabilen 'bileşik getirili' şirketlerden gelir."
      }
    ],
    quiz: [
      {
        id: "q1-1",
        question: "Warren Buffett'ın benzetmesinde 'Ekonomik Hendek' (Economic Moat) neyi ifade eder?",
        options: [
          "Şirketin aldığı banka kredisi miktarını",
          "Şirketin kârını rakiplerin taklit ve saldırılarından koruyan sürdürülebilir avantajını",
          "Şirketin bir yılda yaptığı toplam reklam harcamasını",
          "Şirketin çalışanlarına ödediği toplam maaş bütçesini"
        ],
        correctAnswerIndex: 1,
        explanation: "Ekonomik hendek, şatoyu (şirketi ve kârlarını) dışarıdaki akıncılardan (rakiplerden) koruyan derin su çukuru gibi, rakiplerin kârları aşındırmasını engelleyen stratejik üstünlüktür."
      },
      {
        id: "q1-2",
        question: "Bir şirketin sermaye maliyeti (WACC) %9 ve yatırılan sermaye getirisi (ROIC) %6 ise ne gerçekleşmektedir?",
        options: [
          "Şirket hissedarları için harika bir ekonomik katma değer üretmektedir.",
          "Şirket kâr etmesine rağmen sermayenin fırsat maliyetini karşılayamadığı için değer yok etmektedir (Value Destruction).",
          "Şirketin hisse fiyatı kesinlikle ikiye katlanacaktır.",
          "Şirketin hiçbir borcu veya sermaye ihtiyacı kalmamıştır."
        ],
        correctAnswerIndex: 1,
        explanation: "ROIC (%6) < WACC (%9) olduğunda, şirket kullandığı paranın maliyetinden daha az getiri ürettiği için her yeni yatırımda aslında hissedar servetini eritmektedir."
      },
      {
        id: "q1-3",
        question: "Mauboussin'in makalesine göre hisse senedi fiyatlarının ortalama ne kadarı 'Gelecekte Yaratılması Beklenen Değeri' yansıtır?",
        options: [
          "Yaklaşık %5",
          "Yaklaşık %33 (üçte bir)",
          "Yaklaşık %90",
          "%0 (fiyatlar sadece geçmişe bakar)"
        ],
        correctAnswerIndex: 1,
        explanation: "Piyasa fiyatlarının yaklaşık 2/3'ü mevcut operasyonel durumu, 1/3'ü ise şirketin gelecekte yaratması beklenen sürdürülebilir artı değeri temsil eder."
      }
    ]
  },
  {
    id: 2,
    slug: "sirket-yasam-donguleri",
    title: "2. Adım: Şirket Yaşam Döngüsü (Dickinson Modeli)",
    subtitle: "Önce Şirketin Hangi Yaşta Olduğunu Anla: Nakit Akışı Röntgeni",
    estimatedMinutes: 14,
    iconName: "TrendingUp",
    description: "Modül 1'de ROIC'i öğrendik. Peki şirketler hayatlarının hangi döneminde yüksek ROIC kazanır? Victoria Dickinson'ın 5 evreli nakit akışı yaşam döngüsü modeli.",
    zeroKnowledgeSummary: "Bir bebeğin, üniversite öğrencisinin, çalışan bir yetişkinin ve emeklinin para harcama alışkanlıkları çok farklıdır. Şirketlerin yaşını da takvimdeki kuruluş yılı değil; nakit akış tablosundaki işaretler (+ / -) belirler.",
    sections: [
      {
        id: "m2-s1",
        title: "1. Takvim Yaşı Neden Yanıltıcıdır?",
        summary: "100 yıllık bir şirket yeni bir sektöre girip gençleşebilir; 2 yıllık bir girişim erkenden çökebilir.",
        content: [
          "Geleneksel analizde şirketlerin kuruluş yılına bakılırdı. Ancak teknoloji çağında kuruluş tarihi şirketin hangi aşamada olduğunu göstermez.",
          "Muhasebe profesörü Victoria Dickinson, şirketleri sınıflandırmak için mükemmel bir yöntem geliştirdi: Şirketin Nakit Akış Tablosundaki 3 ana kalemin işaretine (+ veya -) bakmak!",
          "Bu 3 kalem: 1. Faaliyet Nakit Akışı (İşten gelen para), 2. Yatırım Nakit Akışı (Geleceğe harcanan para), 3. Finansman Nakit Akışı (Borçlanma/Hisse basımı veya temettü/borç ödeme)."
        ],
        analogyBox: {
          title: "🌱 İnsan Yaşamı ile Şirket Yaşamı",
          description: "Bir üniversite öğrencisi henüz maaş alamaz (Faaliyet -), eğitimine para harcar (Yatırım -) ve ailesinden harçlık alır (Finansman +). Bu tam olarak 'Giriş Evresi' şirketidir!"
        },
        keyTakeaway: "Şirketin biyolojik yaşı yoktur; nakit hareketlerinin yönü şirketin yaşam evresini belirler."
      },
      {
        id: "m2-s2",
        title: "2. 5 Yaşam Döngüsü Evresi ve Dickinson İşaretleri",
        summary: "Faaliyet, Yatırım ve Finansman akışlarının kombinasyonundan 5 temel evre türer.",
        content: [
          "1. Giriş (Introduction) [Faaliyet (-), Yatırım (-), Finansman (+)]: Şirket henüz işinden nakit üretemez, yoğun yatırım yapar ve dışarıdan borç/yatırımcı parası bulur. (Ortalama ROIC: -%2.8)",
          "2. Büyüme (Growth) [Faaliyet (+), Yatırım (-), Finansman (+)]: Artık kendi işinden nakit üretir ama o kadar hızlı büyür ki hem kendi nakdini hem dış kaynakları yatırıma gömer. (Ortalama ROIC: +%10.6)",
          "3. Olgunluk (Maturity) [Faaliyet (+), Yatırım (-), Finansman (-)]: Şirket nakit basma makinesine dönmüştür! İşten devasa nakit girer, yatırımlarını kendi karşılar ve üstüne borç öder ya da temettü dağıtır. (Ortalama ROIC: +%11.2)",
          "4. Sarsıntı (Shake-Out) [Karışık Akışlar]: Sektörde büyüme yavaşlar, zayıf şirketler elenir, kârlar dalgalanır. (Ortalama ROIC: +%3.8)",
          "5. Düşüş (Decline) [Faaliyet (-), Yatırım (+), Finansman (+/-)]: İşten para gelmez, şirket varlıklarını ve fabrikalarını satarak nakit yaratmaya çalışır. (Ortalama ROIC: -%12.0)"
        ],
        analogyBox: {
          title: "🍎 Apple'ın Evreleri",
          description: "Apple 1976'da garajda Giriş evresindeydi. 2007'de iPhone ile devasa bir Büyüme evresine girdi. Bugün ise her yıl 100 milyar dolar nakit üreten, hisselerini geri alan tam bir Olgunluk kalesidir."
        },
        keyTakeaway: "Halka açık şirketlerin yaklaşık %74'ü Büyüme (%38) veya Olgunluk (%36) evresindedir; en sağlam ekonomik hendekler Olgunluk döneminde test edilir."
      }
    ],
    quiz: [
      {
        id: "q2-1",
        question: "Faaliyet Nakit Akışı (+), Yatırım Nakit Akışı (-) ve Finansman Nakit Akışı (-) olan bir şirket hangi evrededir?",
        options: [
          "Giriş (Introduction)",
          "Büyüme (Growth)",
          "Olgunluk (Maturity)",
          "Düşüş (Decline)"
        ],
        correctAnswerIndex: 2,
        explanation: "Olgunluk evresinde şirket kendi operasyonundan yüksek nakit üretir (+), yatırımlarını finanse eder (-) ve kalan nakitle borç öder veya temettü/hisse geri alımı yaparak finansman çıkışı (-) gerçekleştirir."
      },
      {
        id: "q2-2",
        question: "Dickinson yaşam döngüsü analizine göre hangi evredeki şirketlerin ortalama ROIC oranı negatiftir?",
        options: [
          "Büyüme ve Olgunluk",
          "Giriş ve Düşüş",
          "Yalnızca Olgunluk",
          "Bütün evrelerde ROIC pozitiftir"
        ],
        correctAnswerIndex: 1,
        explanation: "Giriş evresinde ortalama ROIC -%2.8, Düşüş evresinde ise -%12.0 olarak ölçülmüştür."
      }
    ]
  },
  {
    id: 3,
    slug: "deger-cubugu-mikroekonomi",
    title: "3. Adım: Değer Çubuğu (Mikroekonomik Temeller)",
    subtitle: "Müşterinin Gönlündeki Değer (WTP) vs Şirketin Maliyeti",
    estimatedMinutes: 15,
    iconName: "Sliders",
    description: "Şirketin evresini belirledik. Peki şirket ürün seviyesinde nasıl kâr yaratır? Felix Oberholzer-Gee'nin Değer Çubuğu (Value Stick): WTP, Fiyat, Maliyet ve WTS.",
    zeroKnowledgeSummary: "İş dünyası sadece fiyata zam yapmaktan ibaret değildir. Başarılı şirketler müşterinin ürüne verdiği değeri (WTP) artırır veya tedarikçilerin maliyet tabanını (WTS) düşürerek pastayı herkes için büyütür.",
    sections: [
      {
        id: "m3-s1",
        title: "1. Değer Çubuğunun 4 Kritik Çizgisi",
        summary: "Bir ürünün yolculuğu müşterinin kafasındaki tavan değer ile tedarikçinin dip maliyeti arasında gerçekleşir.",
        content: [
          "1. WTP (Willingness to Pay - Ödemeye İsteklilik): Müşterinin o ürün için cebinden çıkarmaya razı olduğu en yüksek tavan fiyattır. (Algılanan değer)",
          "2. Fiyat (Price): Şirketin kasada müşteriden fiilen talep ettiği para.",
          "3. Maliyet (Cost): Şirketin o ürünü üretmek ve sunmak için harcadığı kaynak tutarı.",
          "4. WTS (Willingness to Sell - Satmaya İsteklilik): Tedarikçinin veya çalışanın o girdi/emek için kabul edeceği asgari dip taban fiyat (fırsat maliyeti)."
        ],
        analogyBox: {
          title: "☕ Bir Fincan Özel Kahve",
          description: "Çok sevdiğiniz bir kahve için 100 TL vermeye razısınız (WTP = 100 TL). Kafe bunu 60 TL'ye satıyor (Fiyat = 60 TL). Kahvenin kafe için maliyeti 25 TL (Maliyet = 25 TL). Kahve çekirdeğini getiren çiftçi ise en az 15 TL'ye razıydı (WTS = 15 TL)."
        },
        keyTakeaway: "Toplam yaratılan değer (WTP - WTS) ne kadar genişse, paylaşılabilecek refah o kadar büyüktür."
      },
      {
        id: "m3-s2",
        title: "2. Rantlar ve Değer Bölüşümü: Kim Ne Kazanır?",
        summary: "Pasta 3 parça arasında paylaşılır: Tüketici Rantı, Şirket Kârı ve Tedarikçi Rantı.",
        content: [
          "Tüketici Rantı (Consumer Surplus) = WTP - Fiyat. Müşteri 100 TL değer biçtiği şeye 60 TL ödeyince 40 TL'lik 'iyi ki aldım' mutluluğu yaşar. Memnun müşteri geri gelir!",
          "Şirket Değer Yaratımı / Kârı (Firm Value Creation) = Fiyat - Maliyet. Şirket 60 TL'ye satıp 25 TL harcadığında 35 TL brüt kâr eder.",
          "Tedarikçi / Çalışan Rantı (Supplier Surplus) = Maliyet - WTS. Tedarikçi en az 15 TL'ye razıyken şirketten 25 TL aldığında 10 TL'lik kazanç elde eder.",
          "Şirketlerin değer yaratmasının 2 yolu vardır: Ya üst çizgiyi (WTP) yukarı itmek (Farklılaşma Stratejisi) ya da alt çizgiyi (WTS) aşağı çekmek (Düşük Maliyet Liderliği)."
        ],
        analogyBox: {
          title: "🤝 Sıfır Toplamlı Oyun vs Kazan-Kazan",
          description: "Kötü şirketler tedarikçinin boğazını sıkarak maliyeti düşürmeye çalışır (sıfır toplamlı). Harika şirketler ise tedarikçiye veri paylaşımı yaparak onun işini kolaylaştırır ve WTS'ini aşağı çeker (kazan-kazan)."
        },
        keyTakeaway: "Sadece zam yaparak kâr artırmaya çalışmak tehlikelidir; sürdürülebilir başarı müşterinin ödeme isteğini (WTP) yükselterek tüketici rantını büyütmekten geçer."
      }
    ],
    quiz: [
      {
        id: "q3-1",
        question: "Bir müşteri bir kulaklığa en fazla 2.000 TL ödemeye razıyken (WTP), mağaza bu kulaklığı 1.400 TL'ye satıyorsa Tüketici Rantı (Consumer Surplus) nedir?",
        options: [
          "3.400 TL",
          "2.000 TL",
          "600 TL",
          "0 TL"
        ],
        correctAnswerIndex: 2,
        explanation: "Tüketici Rantı = WTP (2.000 TL) - Fiyat (1.400 TL) = 600 TL. Müşteri zihninde 600 TL'lik bir kâr ve memnuniyet elde ettiğini hisseder."
      },
      {
        id: "q3-2",
        question: "Değer Çubuğunda (Value Stick) 'Farklılaşma Stratejisi' (Differentiation) temel olarak hangi çizgiyi yukarı taşımayı hedefler?",
        options: [
          "WTS (Satmaya İsteklilik)",
          "Maliyet (Cost)",
          "WTP (Ödemeye İsteklilik)",
          "Banka Kredi Faizi"
        ],
        correctAnswerIndex: 2,
        explanation: "Farklılaşma stratejisi; üstün tasarım, kalite, marka ve hizmetle müşterinin ürüne biçtiği tavan değeri (WTP - Willingness to Pay) yukarı taşır."
      }
    ]
  },
  {
    id: 4,
    slug: "sektor-analizi-ve-haritasi",
    title: "4. Adım: Sektör Haritası ve Kâr Havuzları",
    subtitle: "Dış Çevre: Balık İyi Olabilir Ama Deniz Fırtınalı mı?",
    estimatedMinutes: 15,
    iconName: "Compass",
    description: "Ürün bazında değer yaratmayı anladık. Şimdi mikrodan sektöre çıkıyoruz: Sektör haritası çıkarma, havacılık sektörü kâr havuzu (-$69 milyar analiz) ve pazar payı istikrarı (%2 kuralı).",
    zeroKnowledgeSummary: "Dünyanın en yetenekli kaptanı bile olsanız, su alan batık bir gemide yüzemezsiniz. Bazı sektörler doğası gereği para yutar, bazıları ise altın madenidir.",
    sections: [
      {
        id: "m4-s1",
        title: "1. Sektör Haritası Çıkarmak (Örnek: ABD Havacılık Sektörü)",
        summary: "Tedarikçilerden müşterilere, sendikalardan regülatörlere tüm ekosistemi tek bir şemada görmek.",
        content: [
          "Bir şirketin kârlılığı havada asılı durmaz; sağında müşteriler, solunda tedarikçiler, üstünde devlet düzenleyicileri ve çevresinde rakipler vardır.",
          "Havacılık Örneği: Uçak üreticileri (Boeing, Airbus - ikili tekel), Motor üreticileri (GE, Rolls-Royce), Havalimanları (yerel tekeller), Pilot sendikaları ve Rezervasyon sistemleri (Amadeus, Sabre).",
          "Havayolları bu güçlü tedarikçiler ile fiyata aşırı duyarlı müşteriler arasına sıkışmıştır!"
        ],
        analogyBox: {
          title: "🥪 Sandviç Arasındaki Havayolları",
          description: "Havayolu şirketi lezzetli bir sandviçin arasındaki ince peynir gibidir; üstten dev tekel uçak üreticileri ve havalimanları bastırır, alttan ise en ucuz bilet arayan yolcular bastırır."
        },
        keyTakeaway: "Bir şirketin başarısı, sadece kendi yönetimine değil, değer zincirindeki oyuncuların pazarlık gücüne bağlıdır."
      },
      {
        id: "m4-s2",
        title: "2. Kâr Havuzu (Profit Pool) Analizi",
        summary: "Sektörde sermayeyi kim bağlıyor, kârı kim cebe indiriyor?",
        content: [
          "Kâr Havuzu, X ekseninde yatırılan sermaye payını (%0-%100), Y ekseninde ise ekonomik getiri oranını (ROIC - WACC) gösterir.",
          "Kutunun Alanı = Şirketin Toplam Ekonomik Kârı veya Zararıdır.",
          "Havacılık Şoku: Havacılık sektörünün toplam ekonomik kârında sermayenin %75'inden fazlasını havayolları bağlamış ve zarar etmiştir. Buna karşın az sermaye bağlayan Jet Yakıtı üreticileri ve Bilet Sistemleri (GDS) dev kârlar elde etmiştir."
        ],
        analogyBox: {
          title: "🍿 Sinema Salonu vs Mısır Büfesi",
          description: "Sinema salonu devasa bina ve ses sistemi yatırımı yapar ama asıl net kârı lobideki 2 metrekarelik mısır ve gazoz standı kazanır."
        },
        keyTakeaway: "Büyük ciro veya devasa fabrikalar kâr garantisi değildir; kâr havuzunda yüksek getiri sağlayan niş halkayı bulmak esastır."
      },
      {
        id: "m4-s3",
        title: "3. Pazar Payı Değişkenliği (Bruce Greenwald Kuralı)",
        summary: "5 yıllık pazar payı değişimi ortalamada %2'nin altındaysa sektör istikrarlıdır.",
        content: [
          "Columbia Üniversitesi'nden Bruce Greenwald'a göre pazar paylarının yerinde durmadığı oynak sektörlerde hendek kurmak imkansıza yakındır.",
          "Formül: Sektördeki her şirketin 5 yıllık pazar payı değişimlerinin mutlak değerlerinin ortalaması alınır.",
          "Eğer ortalama değişim ≤ %2 ise pazar istikrarlıdır (Örn: Arama Motorlarında Google %89, Otomotivde GM/Ford/Toyota %1 değişim).",
          "Eğer ortalama değişim > %2 ise sektör istikrarsızdır ve yoğun fiyat savaşları yaşanır."
        ],
        analogyBox: {
          title: "💺 Sandalye Kapmaca Oyunu",
          description: "Müzik çaldıkça herkesin yer değiştirdiği oynak bir oyunda kalıcı kâr elde edemezsiniz; sandalyelerin sabit olduğu oturmuş salonlarda kârlar korunur."
        },
        keyTakeaway: "Pazar payı istikrarı yüksek olan sektörlerde şirketler fiyat kırmak yerine daha rasyonel rekabet eder."
      }
    ],
    quiz: [
      {
        id: "q4-1",
        question: "Kâr Havuzu (Profit Pool) analizinde bir sektör parçasının toplam ekonomik kârı geometrik olarak neye eşittir?",
        options: [
          "Sadece Y eksenindeki ROIC oranına",
          "Kutunun Alanına (Yatırılan Sermaye Payı × [ROIC - WACC] Getiri Oranı)",
          "Şirketin çalışan sayısına",
          "Yıllık enflasyon oranına"
        ],
        correctAnswerIndex: 1,
        explanation: "Kâr havuzunda X ekseni yatırılan sermayeyi, Y ekseni (ROIC - WACC) farkını temsil eder; dikdörtgenin alanı ise o grubun toplam net ekonomik kârını verir."
      },
      {
        id: "q4-2",
        question: "Bruce Greenwald'ın pazar payı istikrarı kuralına göre 5 yıllık ortalama pazar payı değişimi neyin altında olduğunda sektör 'istikrarlı' kabul edilir?",
        options: [
          "%20",
          "%10",
          "%2 veya daha az",
          "%0.01"
        ],
        correctAnswerIndex: 2,
        explanation: "5 yıllık ortalama mutlak pazar payı değişimi %2 veya daha düşükse sektörün istikrarlı ve hendek korumaya elverişli olduğu kabul edilir."
      }
    ]
  },
  {
    id: 5,
    slug: "porter-bes-guc-giris-engelleri",
    title: "5. Adım: Porter'ın 5 Gücü ve 7 Giriş Engeli",
    subtitle: "Rakipleri Kapıda Tutan Zırh: Ölçek, Ağ Etkisi ve Geçiş Maliyetleri",
    estimatedMinutes: 18,
    iconName: "Lock",
    description: "Sektör haritasını çıkardık. Şimdi rakiplerin içeri girmesini engelleyen kaleleri inceliyoruz: Michael Porter'ın 5 Gücü ve 7 Giriş Engeli (Ölçek, Ağ Etkisi, Wright Öğrenme Yasası).",
    zeroKnowledgeSummary: "Yeni bir rakibin sizin işinize girmesi ne kadar zorsa, kârınız o kadar güvendedir. Bu bölümde rakiplerin kapıdan içeri girmesini engelleyen 7 devasa duvarı inceliyoruz.",
    sections: [
      {
        id: "m5-s1",
        title: "1. Michael Porter'ın 5 Güç Modeli",
        summary: "Sektör kârlılığını belirleyen 5 temel çekim gücü.",
        content: [
          "1. Yeni Girenlerin Tehdidi (Threat of New Entrants) - En kritik güç!",
          "2. Mevcut Rakipler Arasındaki Rekabet (Rivalry)",
          "3. Tedarikçilerin Pazarlık Gücü (Supplier Power)",
          "4. Alıcıların Pazarlık Gücü (Buyer Power)",
          "5. İkame Ürünlerin Tehdidi (Threat of Substitutes)"
        ],
        analogyBox: {
          title: "🌊 5 Farklı Yönden Esen Rüzgarlar",
          description: "Bir gemidesiniz (şirket). 5 farklı yönden fırtına esiyor: Mal satanlar, mal alanlar, yanınızdaki gemiler, yeni gelen korsanlar ve uçaklar (ikame ürünler). Geminizin sağlamlığı bu 5 kuvvete dayanabilmesindedir."
        },
        keyTakeaway: "Bruce Greenwald'a göre 'Yeni girenlerin tehdidi' diğer 4 gücü domine eden en belirleyici kuvvettir."
      },
      {
        id: "m5-s2",
        title: "2. İncumbent'ı (Mevcut Lideri) Koruyan 7 Giriş Engeli",
        summary: "Rakiplerin pazara girmesini imkansız kılan veya onları zarara mahkum eden 7 mekanizma.",
        content: [
          "1. Arz Yönlü Ölçek Ekonomisi & MES (Minimum Efficient Scale): Lider devasa üretim hacmiyle birim maliyeti minimuma indirmiştir. Yeni giren küçük kaldıkça birim maliyeti yüksek kalır ve ezilir.",
          "2. Sermaye Gereksinimi: TSMC'nin tek bir çip fabrikası için 20 milyar dolar harcaması gibi devasa peşin yatırım ihtiyacı.",
          "3. Ağ Etkileri (Demand-side scale): Kullanıcı sayısı arttıkça platformun değerinin katlanması (Örn: Uber, WhatsApp, Instagram).",
          "4. Müşteri Geçiş Maliyetleri (Lock-in): Müşterinin başka ürüne geçmesinin çok zahmetli veya pahalı olması (Örn: SAP muhasebe sistemi veya Apple ekosistemi).",
          "5. Büyüklükten Bağımsız Avantajlar & Wright Yasası: Kümülatif üretim ikiye katlandıkça maliyet %20 düşer (Öğrenme eğrisi). Uzun vadeli enerji kontratları (Amazon-Nükleer santral).",
          "6. Dağıtım Kanallarına Eşitsiz Erişim: Süpermarket raf payı veya akıllı telefonlarda varsayılan arama motoru olmak (Google'ın Apple'a yılda 20 milyar dolar ödemesi).",
          "7. Hükümet Düzenlemeleri & Ruhsatlar: Lisans zorunlulukları ve regülasyon engelleri ('Regülasyon mevcut liderin dostudur' - Bill Gurley)."
        ],
        analogyBox: {
          title: "🔌 Wright Yasası ve Bataryalar",
          description: "İlk elektrikli araç bataryaları kilovat-saat başına binlerce dolarken, fabrikalar milyonlarca batarya ürettikçe maliyet 100 doların altına düşmüştür."
        },
        keyTakeaway: "Yüksek giriş engelleri olan sektörlerde mevcut liderler yüksek ROIC oranlarını on yıllarca koruyabilir."
      }
    ],
    quiz: [
      {
        id: "q5-1",
        question: "Wright Yasası'na (Öğrenme Eğrisi) göre kümülatif üretim miktarı her iki katına çıktığında birim işçilik/üretim maliyeti yaklaşık ne kadar düşer?",
        options: [
          "%1",
          "%20",
          "%50",
          "%0 (maliyet hiç değişmez)"
        ],
        correctAnswerIndex: 1,
        explanation: "Wright Yasası'na göre kümülatif üretim ikiye katlandığında birim maliyet yaklaşık %20 azalır."
      },
      {
        id: "q5-2",
        question: "Bir kullanıcının WhatsApp'tan ayrılıp kimsenin kullanmadığı yeni bir mesajlaşma uygulamasına geçmek istememesi hangi giriş engeline örnektir?",
        options: [
          "Ağ Etkisi (Network Effect)",
          "Devlet Lisans Zorunluluğu",
          "Yüksek Fabrika İnşaat Maliyeti",
          "Hammadde Kıtlığı"
        ],
        correctAnswerIndex: 0,
        explanation: "Ağ etkisi, bir platformu kullanan kişi sayısı arttıkça platformun değerinin artması ve kullanıcıların arkadaşlarının orada olması sebebiyle ayrılamamasıdır."
      }
    ]
  },
  {
    id: 6,
    slug: "yikici-inovasyon-ve-cozulme",
    title: "6. Adım: Yıkıcı İnovasyon (Hendekler Nasıl Çöker?)",
    subtitle: "Davud Golyat'ı Nasıl Yener? Christensen Modeli & Modülerleşme",
    estimatedMinutes: 16,
    iconName: "Zap",
    description: "Kalenin duvarları çok yüksek olsa bile, ya düşman içeriye yer altından tünel kazarsa? Clayton Christensen'ın Yıkıcı İnovasyon Teorisi ve alt segmentten gelen tehlikeler.",
    zeroKnowledgeSummary: "Bazen dev şirketler işlerini çok iyi yaptıkları, müşterilerini dinledikleri ve kârlarını maksimize ettikleri için batarlar! Çünkü küçük bir girişimci alt segmentten sessizce gelip onları yıkar.",
    sections: [
      {
        id: "m6-s1",
        title: "1. Sürdürücü vs Yıkıcı İnovasyon",
        summary: "Sürdürücü inovasyon mevcut ürünü daha iyi yapar; yıkıcı inovasyon ise iş modelini değiştirir.",
        content: [
          "Sürdürücü İnovasyon (Sustaining): Mevcut en iyi müşteriler için ürünü daha hızlı, daha kaliteli ve daha pahalı hale getirmektir. Bu oyunda yerleşik devler (incumbent) neredeyse her zaman kazanır.",
          "Yıkıcı İnovasyon (Disruptive): İlk başta ana akım müşteriler için 'kalitesiz ve yetersiz' görünen ama çok daha ucuz, basit ve erişilebilir olan yeni bir iş modelidir.",
          "Pazarın Aşılması (Overshooting): Dev şirketler ürünlerine müşterinin ihtiyaç duyduğundan ve para ödemek istediğinden daha fazla özellik ekler. Bu noktada rekabet ekseni 'saf güçten', 'hız, pratiklik ve kolaylığa' kayar."
        ],
        analogyBox: {
          title: "📼 Blockbuster vs Netflix",
          description: "Blockbuster dev mağazalarıyla en yeni filmleri kiralıyordu ve gelirinin %15'i müşterilerin nefret ettiği 'gecikme cezalarından' geliyordu. Netflix posta ile DVD gönderip gecikme cezasını sıfırladı; ardından streaming'e geçti. Blockbuster 2010'da iflas etti!"
        },
        keyTakeaway: "Yıkıcı inovasyon bir teknoloji problemi değil, bir İŞ MODELİ problemidir."
      },
      {
        id: "m6-s2",
        title: "2. Mini-Mills Çelik Fabrikaları ve 'Kaçma Motivasyonu'",
        summary: "Dev şirketler düşük kârlı alt segmentten kaçtıkça kendi sonlarını hazırlarlar.",
        content: [
          "Christensen'ın en ünlü örneği: Entegre dev çelik fabrikaları demir cevherini eritip yüksek kaliteli çelik üretiyordu. Mini-mills (hurda eriten küçük tesisler) ise kalitesiz hurda eritiyordu.",
          "Mini-mills önce en ucuz ürün olan inşaat demirine (rebar) girdi. Dev fabrikalar 'bu ürünün kâr marjı çok düşük, bırakalım onlar üretsin biz lüks çeliğe odaklanalım' diyerek alt segmentten çekildi. Devlerin kâr marjı ilk başta arttı!",
          "Fakat mini-mills zamanla teknolojisini geliştirdi, bir üst segmente geçti ve en sonunda dev fabrikaları lüks çelikte bile yenerek iflasa sürükledi."
        ],
        analogyBox: {
          title: "🪜 Merdivenin Alt Basamağı",
          description: "Düşmanınız merdivenin en alt basamağına bastığında 'zaten orası kirliydi' deyip bir üst basamağa kaçarsanız, eninde sonunda merdivenin tepesinde sıkışıp düşersiniz."
        },
        keyTakeaway: "Liderlerin en kârlı müşterilerine odaklanıp alt pazarı küçümsemesi, yıkıcı rakiplerin güçlenip onları tahttan indirmesine zemin hazırlar."
      },
      {
        id: "m6-s3",
        title: "3. Dikeyden Yatay Modüler Yapıya Geçiş (Tesla Örneği)",
        summary: "Bir sektör olgunlaştıkça dikey entegrasyon çözülür ve modüler uzmanlar ortaya çıkar.",
        content: [
          "1980'lerde Bilgisayar: IBM gibi şirketler çipten işletim sistemine, montajdan satışa her şeyi kendisi yapardı (Dikey Entegrasyon).",
          "1995'te Bilgisayar: Sektör standartlaştı (Modülerleşti). Çipi Intel, işletim sistemini Microsoft, montajı Dell/HP yapar hale geldi (Yatay Entegrasyon).",
          "Otomotiv ve Elektrikli Araç (EV) Paradoksu: Ford içten yanmalı motorlarda 1.400 tedarikçiye modüler iş verirken; Tesla elektrikli araçlarda yazılımdan bataryaya aşırı dikey entegre olarak büyük avantaj sağladı. Ford 150 farklı tedarikçinin birbiriyle konuşmayan yazılımları yüzünden 2024'te her elektrikli araç başına $40.000 zarar ettiğini bildirdi!"
        ],
        analogyBox: {
          title: "🧩 Lego Parçaları vs Tek Parça Heykel",
          description: "Yeni ve karmaşık bir teknolojide parçaların birbirine uyması için tek bir heykeltıraş (dikey) gerekir. Standartlar oturduğunda ise herkes lego parçası (modüler) üretip birleştirebilir."
        },
        keyTakeaway: "Yeni teknolojilerin başlangıcında dikey entegrasyon; sektör olgunlaştığında ise yatay modüler uzmanlaşma üstünlük sağlar."
      }
    ],
    quiz: [
      {
        id: "q6-1",
        question: "Clayton Christensen'a göre 'Pazarın Aşılması' (Overshooting) ne anlama gelir?",
        options: [
          "Şirketin iflas edip kapılarını kapatması",
          "Ürün performansındaki iyileşmenin, ana akım müşterinin ihtiyaç ve ödeme isteğinin üzerine çıkması",
          "Devletin sektöre aşırı vergi koyması",
          "Şirketin sadece tek bir ülkede satış yapması"
        ],
        correctAnswerIndex: 1,
        explanation: "Pazarın aşılması; şirketlerin ürüne müşterinin aslında ihtiyaç duymadığı ve parasını ödemek istemediği kadar çok özellik eklemesi durumudur."
      },
      {
        id: "q6-2",
        question: "Tesla'nın elektrikli araç üretiminde rakiplerine karşı sağladığı en büyük ilk dönem avantajı neydi?",
        options: [
          "Her parçayı 150 farklı dış tedarikçiden satın alması",
          "Yazılım, batarya ve üretimi kendi bünyesinde toplayan yüksek dikey entegrasyon (Vertical Integration)",
          "Sadece benzinli araç motoru üretmesi",
          "Hiçbir mühendis çalıştırmaması"
        ],
        correctAnswerIndex: 1,
        explanation: "Tesla'nın dikey entegrasyonu, karmaşık yazılım ve batarya koordinasyonunu tek çatı altında mükemmel optimize etmesini sağlayarak geleneksel üreticilerin modüler karmaşasının önüne geçmesini sağlamıştır."
      }
    ]
  },
  {
    id: 7,
    slug: "sirket-ici-analiz-dupont-roic",
    title: "7. Adım: Şirket İçi Analiz & DuPont ROIC Röntgeni",
    subtitle: "Marj Şampiyonu mu Hız Şampiyonu mu? Costco vs Coca-Cola",
    estimatedMinutes: 18,
    iconName: "PieChart",
    description: "Sektör ve rekabet dinamiklerini kavradık. Şimdi bir şirketin bilançosunu açıp ROIC motorunun içine giriyoruz: DuPont ayrıştırması (Marj × Devir Hızı) ve Amazon'un Negatif Nakit Döngüsü (CCC).",
    zeroKnowledgeSummary: "Aynı %16 kârlılığa sahip iki şirketten biri pahalı satarak (yüksek kâr marjı), diğeri ise ucuza satıp rafları ışık hızında boşaltarak (yüksek devir hızı) bu başarıya ulaşır. Bu bölümde bilanço röntgenini çekmeyi öğreniyoruz.",
    sections: [
      {
        id: "m7-s1",
        title: "1. Operasyonel Etkinlik (Aynılık) vs Stratejik Konumlanma (Farklılık)",
        summary: "Herkes gibi yapıp sadece 'daha iyi' yapmaya çalışmak strateji değildir; strateji 'farklı seçimler' yapmaktır.",
        content: [
          "Michael Porter uyarır: Operasyonel etkinlik, rakiplerinizle aynı şeyleri yapıp biraz daha hızlı olmaktır. Bu bir strateji değildir çünkü en iyi uygulamalar hızla taklit edilir ve kârlar erir.",
          "Stratejik Konumlanma ise rakiplerden bilerek FARKLI aktiviteler seçmek ve ödünleşimler (trade-offs) yapmaktır.",
          "Southwest Airlines Örneği: Yalnızca tek tip uçak (Boeing 737) kullandı, aktarmalı merkezler yerine noktadan noktaya uçtu, yemek/ikram vermedi. Bu sayede uçak bakım maliyetlerini kırdı ve kapıda bekleme süresini 15 dakikaya indirerek rakipleri ezip geçti."
        ],
        analogyBox: {
          title: "🎯 Herkesi Memnun Etmeye Çalışmak",
          description: "Hem dünyanın en lüks Michelin yıldızlı restoranı hem de en ucuz fast-food zinciri olamazsınız. Birini seçip diğerinden bilinçli olarak vazgeçmek zorundasınız."
        },
        keyTakeaway: "Strateji, ne yapacağınızı seçmek kadar neyi YAPMAYACAĞINIZI seçmektir."
      },
      {
        id: "m7-s2",
        title: "2. DuPont ROIC Röntgeni: Marj Şampiyonları vs Hız Şampiyonları",
        summary: "ROIC = NOPAT Marjı (%) × Yatırılan Sermaye Devir Hızı (x).",
        content: [
          "Bu matematiksel formülde Satışlar sadeleşir: (NOPAT / Satışlar) × (Satışlar / Sermaye) = NOPAT / Sermaye = ROIC.",
          "Farklılaşma Yolu (Yüksek Marj / Düşük Devir): Coca-Cola (%26 marj, 0.6x devir = %16 ROIC), Apple.",
          "Maliyet Liderliği Yolu (Düşük Marj / Yüksek Devir): Costco (%4 marj, 4.3x devir = %16 ROIC), Walmart.",
          "Görüldüğü gibi Costco ve Coca-Cola tamamen aynı %16 ROIC'e sahiptir ama biri marjla, diğeri süratle kazanır!"
        ],
        analogyBox: {
          title: "🏎️ Tır vs Ferrari",
          description: "Ferrari tek bir arabadan devasa kâr eder (yüksek marj). Tır ise tonlarca yükü durmaksızın taşıyarak aynı toplam parayı kazanır (yüksek devir)."
        },
        keyTakeaway: "Uzun vadede en kalıcı başarıyı yakalayanlar 'Ucuzluktan önce Kalite' (Better before Cheaper) ve 'Maliyetten önce Gelir' (Revenues before Cost) diyen Farklılaşma şirketleridir."
      },
      {
        id: "m7-s3",
        title: "3. Amazon'un Gizli Silahı: Negatif Nakit Dönüşüm Süresi (CCC)",
        summary: "Müşteriden parayı anında alıp tedarikçiye aylar sonra ödeyerek başkasının parasıyla bedava büyümek.",
        content: [
          "Nakit Dönüşüm Süresi (CCC) = Stok Süresi + Tahsilat Süresi - Ödeme Süresi.",
          "1999 Barnes & Noble: Kitabı 149 gün rafta tuttu, parayı 6 günde tahsil etti, toptancıya 75 günde ödedi. CCC = 149 + 6 - 75 = +80 Gün! (Parası 80 gün boyunca raflarda kilitli kaldı).",
          "1999 Amazon: Kitabı 29 günde sattı, parayı karttan 2 günde aldı, yayıncıya 60 günde ödedi. CCC = 29 + 2 - 60 = -29 Gün!",
          "Bu ne anlama gelir? Amazon sattığı kitabın parasını 58 gün boyunca bankada faizsiz işletme sermayesi olarak tuttu ve tek kuruş kredi çekmeden devasa büyümesini finanse etti!"
        ],
        analogyBox: {
          title: "🏦 Başkasının Parasıyla Ticaret",
          description: "Müşteri size parayı 1 Ocak'ta peşin ödüyor, siz malı teslim ediyorsunuz ama malı aldığınız fabrikaya 1 Mart'ta ödüyorsunuz. İki ay boyunca para sizin hesabınızda büyür!"
        },
        keyTakeaway: "Bilanço verimliliği ve negatif işletme sermayesi döngüsü, yıkıcı şirketlerin en güçlü kaldıraçlarından biridir."
      }
    ],
    quiz: [
      {
        id: "q7-1",
        question: "Costco %4 NOPAT kâr marjına ve 4.0x sermaye devir hızına sahipse, ROIC oranı kaçtır?",
        options: [
          "%8",
          "%16 (%4 × 4.0)",
          "%1",
          "%40"
        ],
        correctAnswerIndex: 1,
        explanation: "DuPont formülüne göre ROIC = NOPAT Marjı (%4) × Sermaye Devir Hızı (4.0) = %16."
      },
      {
        id: "q7-2",
        question: "Bir şirketin Nakit Dönüşüm Süresinin (CCC) negatif olması ne anlama gelir?",
        options: [
          "Şirketin iflas etmek üzere olduğu",
          "Şirketin müşterilerden parayı tahsil ettikten çok sonra tedarikçilerine ödeme yaptığı ve operasyonunun nakit ürettiği",
          "Şirketin hiç ürün satamadığı",
          "Şirketin sadece nakit para ile alışveriş yaptığı"
        ],
        correctAnswerIndex: 1,
        explanation: "Negatif CCC, şirketin malı satıp parasını cebine koyduktan günler/aylar sonra tedarikçisine ödeme yapması demektir; bu sayede şirket kendi büyümesini tedarikçi kredisiyle finanse eder."
      }
    ]
  },
  {
    id: 8,
    slug: "oyun-teorisi-markalar-ve-kontrol-listesi",
    title: "8. Adım: Oyun Teorisi, Markalar ve 60 Maddelik Hendek Denetimi",
    subtitle: "Büyük Final: Fiyat Savaşları, Tiffany Testi ve Morgan Stanley Listesi",
    estimatedMinutes: 20,
    iconName: "CheckSquare",
    description: "Tüm parçaları birleştiriyoruz: Fiyat savaşlarında Mahkumlar İkilemi ve Tit-for-Tat, Albay Blotto niş stratejisi, Marka bir hendek midir? (Tiffany pırlanta testi) ve Morgan Stanley Hendek Kontrol Listesi.",
    zeroKnowledgeSummary: "Rakiplerle savaşırken satranç gibi onların hamlelerini öngörmek gerekir. Ayrıca her ünlü marka bir hendek değildir. Bu son bölümde tüm öğrendiklerimizi profesyonel bir yatırımcı kontrol listesiyle taçlandırıyoruz.",
    sections: [
      {
        id: "m8-s1",
        title: "1. Mahkumlar İkilemi ve Fiyatlandırma Stratejisi",
        summary: "Tek seferlik oyunda iki taraf da fiyat kırıp batar; tekrarlanan oyunda 'Kısasa Kısas' (Tit-for-Tat) kazanır.",
        content: [
          "Havayolu A ve B aynı rotada uçuyor. Bilet maliyeti 160$. İki seçenek var: 220$ (yüksek) veya 200$ (düşük).",
          "İkisi de 220$ yaparsa toplam kâr 600$ olur (En iyi ortak sonuç).",
          "Ama A şirketi 'Ben 200$'a düşüreyim, bütün yolcular bana gelsin' derse A 320$ kazanır, B 120$'a düşer. Ancak B de misilleme yapıp 200$'a indirirse ikisi de 200$'ar dolar kazanır ve toplam kâr 400$'a çakılır (Nash Dengesi).",
          "Robert Axelrod'un turnuvasında kanıtlanan en iyi strateji 'Tit-for-Tat'tır: İşbirliğiyle başla, rakip fiyat kırarsa hemen cezalandır, rakip tekrar fiyata zam yaparsa hemen affet ve işbirliğine dön."
        ],
        analogyBox: {
          title: "🕊️ Barış Güvercini vs Şahin",
          description: "Fiyat savaşları başlatan şirketler genellikle kendi kâr havuzlarını dinamitler. En akıllı şirketler örtük işbirliği (tacit coordination) sinyalleri gönderir."
        },
        keyTakeaway: "Rakipleri alt etmeye odaklanmak kârlılığı yok eder; değer yaratmaya ve akıllı oyun teorisine odaklanmak kazandırır."
      },
      {
        id: "m8-s2",
        title: "2. Albay Blotto Oyunu & Linking-Leveraging (Amazon)",
        summary: "Zayıf olan şirket cephe sayısını artırarak devi yener.",
        content: [
          "Albay Blotto Oyunu: 100 askeri 3 cepheye dağıtacaksınız. Rakip dev 1. ve 2. ana cepheye 40'ar asker koyarken, siz zayıf askerlerinizi rakibin ihmal ettiği 3. ve 4. cephelere yığarak çoğunluk cepheyi kazanırsınız.",
          "Linking & Leveraging: Amazon kitap sattı -> Altyapısını AWS bulut bilişime bağladı -> Video akışına bağladı -> Dijital reklama bağladı. Mevcut gücünü kaldıraç yaparak her yıl yeni kâr cepheleri açtı."
        ],
        analogyBox: {
          title: "♟️ Satrançta Beklenmedik Hamle",
          description: "Rakibinizin en güçlü olduğu yerde onunla göğüs göğüse çarpışmayın; onun dikkat etmediği boş karelere yayılın."
        },
        keyTakeaway: "Küçük şirketler devlerle aynı kurallarla yarışmamalı; kendi yeni oyun alanlarını inşa etmelidir."
      },
      {
        id: "m8-s3",
        title: "3. Marka Tek Başına Bir Hendek midir? (Tiffany vs Costco)",
        summary: "Bilinir olmak değer yaratmak değildir. Marka, WTP'yi artırabiliyorsa veya WTS'i düşürüyorsa hendektir.",
        content: [
          "Interbrand'in 'Dünyanın En Değerli 25 Markası' listesi ile bu şirketlerin ROIC oranları karşılaştırıldığında korelasyonun çok zayıf olduğu görülür!",
          "Tiffany vs Costco Pırlanta Testi: Neredeyse tamamen aynı kalitede iki tektaş pırlanta yüzükten Tiffany 16.600$'a, Costco 6.600$'a satıyordu. Bağımsız eksper aradaki farkın sadece 2.500$ olduğunu söyledi. Müşteri aradaki 10.000$ farkı Tiffany'nin ikonik 'mavi kutusu ve sosyal statüsü' için ödemiştir (WTP artışı).",
          "Charlie Munger'ın Sakız Testi: 'Uzak bir ülkeye gittiğimde rafta bilmediğim Glotz sakızı 30 cent, bildiğim Wrigley sakızı 40 cent ise; ağzıma sokacağım şey için 10 cent tasarruf edip risk almam!' (Arama maliyeti ve risk azaltımı)."
        ],
        analogyBox: {
          title: "💎 Mavi Kutu Büyüsü",
          description: "Pırlanta aynı pırlantadır; ancak Tiffany kutusunu hediye ettiğinizde aldığınız tebessüm ile süpermarket poşetiyle verdiğinizdeki tebessüm farklıdır. İşte o fark WTP'dir."
        },
        keyTakeaway: "Bir markanın gücü logosunda değil; müşterinin onun için fazladan para ödemeye (WTP) ne kadar razı olduğunda saklıdır."
      }
    ],
    quiz: [
      {
        id: "q8-1",
        question: "Oyun teorisinde tekrarlanan Mahkumlar İkileminde en başarılı ve kârlı sonuçları veren 'Tit-for-Tat' stratejisinin ilk kuralı nedir?",
        options: [
          "İlk turda hemen fiyatta indirim yaparak rakibe saldırmak",
          "İlk turda işbirliği yaparak yüksek fiyattan başlamak",
          "Oyundan tamamen çekilmek",
          "Rastgele fiyat belirlemek"
        ],
        correctAnswerIndex: 1,
        explanation: "Tit-for-Tat stratejisi her zaman işbirliğiyle (fiyat kırmadan) başlar; rakip saldırırsa anında misilleme yapar, rakip barışırsa hemen barışır."
      },
      {
        id: "q8-2",
        question: "Albay Blotto oyun modeline göre kaynakları daha az olan zayıf bir şirketin pazar devlerine karşı en etkili taktiği nedir?",
        options: [
          "Bütün askerlerini devin en güçlü olduğu ana cepheye yığmak",
          "Cephe sayısını artırarak devin kaynak ayıramadığı niş/ikincil alanlarda zafer kazanmak",
          "Üretimi tamamen durdurmak",
          "Fiyatları iki katına çıkarmak"
        ],
        correctAnswerIndex: 1,
        explanation: "Albay Blotto modelinde zayıf oyuncu, devin her yere yetişemeyeceğini bilerek yeni ve alternatif cepheler (niş pazarlar) açıp buraları kazanmayı hedefler."
      },
      {
        id: "q8-3",
        question: "Tiffany pırlanta yüzüğünün Costco'daki eşdeğer pırlantadan 10.000$ daha pahalıya satılabilmesi Değer Çubuğunda neyi gösterir?",
        options: [
          "Pırlantanın maden çıkarma maliyetinin arttığını",
          "Marka ve prestij sinyali sayesinde tüketicinin ödemeye istekliliğinin (WTP) yükseldiğini",
          "Costco'nun pırlanta satmasının yasak olduğunu",
          "Tiffany'nin iflas ettiğini"
        ],
        correctAnswerIndex: 1,
        explanation: "Tiffany markası, statü ve güven sinyali vererek tüketicinin ödeme isteğini (WTP) devasa ölçüde yukarı taşımakta ve yüksek fiyatlama gücü sağlamaktadır."
      }
    ]
  }
];
