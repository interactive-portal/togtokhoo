export interface ItineraryItem {
  id: string;
  dayNumber: number;
  dateStr: string; // e.g. "10.18 (Бямба)"
  time: string; // e.g. "13:00 - 18:30"
  city: 'osaka' | 'tokyo';
  category: 'flight' | 'seminar' | 'company' | 'culture' | 'policy';
  categoryLabel: string;
  categoryIcon: string;
  categoryBg: string;
  status: 'Батлагдсан' | 'Төлөвлөгдсөн';
  title: string;
  subtitle?: string;
  description: string;
  locationName: string;
  locationDetail?: string;
  speaker?: {
    name: string;
    title: string;
    avatar?: string;
    profileUrl?: string;
  };
  attachment?: {
    name: string;
    size?: string;
    url?: string;
  };
  badge?: string;
  externalLink?: {
    label: string;
    url: string;
    type: 'website' | 'facebook';
  };
  highlight?: boolean;
}

export const ITINERARY_DATA: ItineraryItem[] = [
  {
    id: 'day-1',
    dayNumber: 1,
    dateStr: '10.18 (Бямба) - Эхний өдөр',
    time: '13:00 - 18:30',
    city: 'osaka',
    category: 'flight',
    categoryLabel: 'Нислэг & Шилжилт',
    categoryIcon: 'flight_takeoff',
    categoryBg: 'bg-[#dce9ff] text-[#002045]',
    status: 'Батлагдсан',
    title: 'Улаанбаатар ✈ Осака (Кансай ОУНБ)',
    description: 'Чингис Хаан ОУНБ-аас Кансай олон улсын нисэх онгоцны буудал руу нислэг. Шилжилт хөдөлгөөн, гаалийн шалгалт, хурдан галт тэрэг/тусгай автобусаар Осака хотын төв рүү шилжих, зочид буудалдаа байрлах, амрах.',
    locationName: 'Кансай ОУНБ (KIX) → Осака төв буудал',
    locationDetail: 'Hotel Granvia Osaka (Check-in)',
    badge: 'Шууд нислэг OM501'
  },
  {
    id: 'day-2',
    dayNumber: 2,
    dateStr: '10.19 (Ням)',
    time: '10:00 - 16:30',
    city: 'osaka',
    category: 'seminar',
    categoryLabel: 'Чиглүүлэх семинар',
    categoryIcon: 'school',
    categoryBg: 'bg-[#d6e3ff] text-[#002045]',
    status: 'Батлагдсан',
    subtitle: 'СУРГАЛТ & ТАНИЛЦУУЛГА',
    title: 'Чиглүүлэх уулзалт (Executive Orientation)',
    description: 'Сэдэв: Аяллын дүрэм журам, Японы бизнесийн ёс зүй (Meishi, Aisatsu, Hourensou), аяллын хөтөлбөрийн нарийвчилсан танилцуулга болон оролцогч удирдлагуудын багийн танилцуулга уулзалт.',
    locationName: 'Осака сургалтын төв танхим (Umeda Center)',
    attachment: {
      name: 'Orientation_Handout.pdf',
      size: '2.4 MB'
    }
  },
  {
    id: 'day-3-morning',
    dayNumber: 3,
    dateStr: '10.20 (Даваа)',
    time: '09:30 - 12:30',
    city: 'osaka',
    category: 'seminar',
    categoryLabel: 'Илтгэл & Семинар',
    categoryIcon: 'record_voice_over',
    categoryBg: 'bg-amber-100 text-amber-900',
    status: 'Батлагдсан',
    title: 'Японы жижиг дунд бизнесийн хөгжлийн стратеги ба туршлага',
    description: 'Японы ЖДҮ салбарын бүтээмж сайжруулах механизм, зах зээлд өрсөлдөх урт хугацааны давуу тал бүрдүүлэх арга барил, засаглалын тэргүүн туршлагууд.',
    locationName: 'Осака бизнес төв (OBP Plaza)',
    speaker: {
      name: 'Toshiya Murata (mr.)',
      title: 'ЖДҮ стратегич, Олон улсын зөвлөх',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhVmSxXXaAmHa3Bb1MIgw58uWb-iYvVNDLxCB_d0s77i4CR0XVQVEsXUSpttDC2YzQKaRYt-2Y8u-7aY-YJZroQabQULkgITWcdCMPQ3l5wQdRJb89pOC7xIUjzJcMDK7pRRveDo28m2pwdKsMY6U0H2x350Cwn3ykizhTaL__xFCMekZCIy_9512XVw9b0TlJQiAgVKhy0W8YmsiH62RHwutAVX81nc4bBfOR2Pqp3i1jJprYlZgl',
      profileUrl: 'https://www.facebook.com/toshiya.t.murata'
    },
    externalLink: {
      label: 'Facebook Профайл',
      url: 'https://www.facebook.com/toshiya.t.murata',
      type: 'facebook'
    }
  },
  {
    id: 'day-3-afternoon',
    dayNumber: 3,
    dateStr: '10.20 (Даваа)',
    time: '14:00 - 17:00',
    city: 'osaka',
    category: 'company',
    categoryLabel: 'Компанийн айлчлал',
    categoryIcon: 'storefront',
    categoryBg: 'bg-[#dce9ff] text-[#002045]',
    status: 'Батлагдсан',
    subtitle: 'Hiro Coffee Co ltd',
    title: 'Үйлчилгээний соёл (Omotenashi), Кофе франчайз ба брэндинг туршлага',
    description: '1977 оноос хойш хэрэглэгчийн сэтгэл ханамж, чанарыг тэргүүнд тавьсан Японы кофе брэндийн жижиглэн худалдаа, орон нутгийн зах зээл дэх өвөрмөц үйлчилгээний менежменттэй танилцах.',
    locationName: 'Осака төв салбар',
    attachment: {
      name: 'Hiro_Coffee_Company_Profile.pdf',
      size: '4.1 MB'
    },
    externalLink: {
      label: '@1977HIROCOFFEE',
      url: 'https://www.facebook.com/1977HIROCOFFEE',
      type: 'facebook'
    }
  },
  {
    id: 'day-4',
    dayNumber: 4,
    dateStr: '10.21 (Мягмар)',
    time: '10:00 - 15:30',
    city: 'osaka',
    category: 'culture',
    categoryLabel: 'Өв соёл & Инноваци',
    categoryIcon: 'palette',
    categoryBg: 'bg-purple-100 text-purple-900',
    status: 'Батлагдсан',
    subtitle: 'Aeru Company (株式会社和える) — "Bringing Japanese traditions to the next generation"',
    title: 'Уламжлалт гар урлалыг орчин үеийн зах зээлд нутагшуулах нь',
    description: 'Хүүхдийн бүтээгдэхүүн болон гэр ахуйн хэрэгслээр дамжуулан уламжлалт дархчуудын ур хийцийг залуу үед өвлүүлэх, уламжлалт соёлыг бизнесийн шинэ загварт хувиргах стратегийн айлчлал.',
    locationName: 'Киото / Осака салбар өртөө'
  },
  {
    id: 'day-5',
    dayNumber: 5,
    dateStr: '10.22 (Лхагва)',
    time: '09:30 - 16:00',
    city: 'osaka',
    category: 'policy',
    categoryLabel: 'Төрийн бодлого & Санхүү',
    categoryIcon: 'account_balance',
    categoryBg: 'bg-blue-100 text-blue-950',
    status: 'Батлагдсан',
    subtitle: 'Amagasaki City Hall & Amagasaki Shinkin Bank (尼崎信用金庫)',
    title: 'Хотын захиргаа болон орон нутгийн банкны хамтын ажиллагаа, ЖДҮ-ийг дэмжих санхүүгийн механизм',
    description: 'Орон нутгийн үйлдвэрлэгчдийг дэмжих хөнгөлөлттэй зээл, санхүүгийн батлан даалт, инкубатор төвүүдийн үйл ажиллагаа болон бүс нутгийн үйлдвэрлэлийг сэргээсэн жишээ судалгаа.',
    locationName: 'Hyogo Prefecture, Amagasaki City',
    externalLink: {
      label: 'Албан ёсны вебсайт',
      url: 'https://www.city.amagasaki.hyogo.jp/index.html',
      type: 'website'
    }
  },
  {
    id: 'day-6-morning',
    dayNumber: 6,
    dateStr: '10.23 (Пүрэв)',
    time: '09:30 - 12:30',
    city: 'osaka',
    category: 'company',
    categoryLabel: 'Үйлдвэр & Чанар',
    categoryIcon: 'precision_manufacturing',
    categoryBg: 'bg-teal-100 text-teal-950',
    status: 'Батлагдсан',
    subtitle: 'Harukado Co ltd (晴香堂 株式会社) • Автомашины & өрөөний үнэртүүлэгч',
    title: 'Үйлдвэрлэлийн чанарын хяналт (QC) ба автоматжуулалт',
    description: 'Автомашины болон өрөөний үнэртүүлэгч, цэвэрлэгээ арчилгааны бүтээгдэхүүний өндөр стандартын савлагаа, найрлага, автоматжуулсан дамжлага, чанарын нарийн хяналтын системийг газар дээр нь үзэх.',
    locationName: 'Нара / Осака үйлдвэрийн бүс'
  },
  {
    id: 'day-6-afternoon',
    dayNumber: 6,
    dateStr: '10.23 (Пүрэв)',
    time: '14:00 - 17:30',
    city: 'osaka',
    category: 'company',
    categoryLabel: 'Нарийн технологи & Lean',
    categoryIcon: 'settings_suggest',
    categoryBg: 'bg-slate-200 text-slate-800',
    status: 'Батлагдсан',
    subtitle: 'Tanaka Tec Co ltd (株式会社タナカテック) • Металл & нимгэн төмөр боловсруулалт',
    title: 'Япон металл боловсруулах нарийн технологи, Lean manufacturing',
    description: 'Машин техникийн нарийн хийцтэй эд анги, нимгэн төмөр боловсруулалт, лазер зүсэлт, угсралтын үйлдвэрт хэрэгжиж буй Каизен болон Lean үйлдвэрлэлийн арга барилтай танилцах практик аялал.',
    locationName: 'Киото хот, Минами дүүрэг'
  },
  {
    id: 'day-7',
    dayNumber: 7,
    dateStr: '10.24 (Баасан)',
    time: 'Бүтэн өдөр',
    city: 'osaka',
    category: 'culture',
    categoryLabel: 'Чөлөөт өдөр',
    categoryIcon: 'explore',
    categoryBg: 'bg-emerald-100 text-emerald-800',
    status: 'Батлагдсан',
    title: 'Осака, Киото хотын соёлын танин мэдэхүй',
    description: 'Киото хотын эртний сүм хийд, соёлын өвт газруудтай танилцах эсвэл Осака хотын худалдааны бүсээр бие даан аялах хувийн чөлөөт цаг.',
    locationName: 'Киото • Осака хотын бүс'
  },
  {
    id: 'day-8',
    dayNumber: 8,
    dateStr: '10.25 (Бямба)',
    time: '09:00 - 12:00',
    city: 'osaka',
    category: 'flight',
    categoryLabel: 'Шинкансэн аялал',
    categoryIcon: 'train',
    categoryBg: 'bg-blue-100 text-blue-800',
    status: 'Батлагдсан',
    title: 'Токио хот руу шилжих аялал (Синкансэн хурдан галт тэрэг)',
    description: 'Өглөө Осака буудлаас Синкансэн хурдан галт тэргээр Токио хот руу шилжилт хийнэ (2.5 цаг). Токио хотын зочид буудалд байрлах, амрах.',
    locationName: 'Shin-Osaka Station → Tokyo Station',
    locationDetail: 'Hotel Metropolitan Tokyo (Check-in)'
  },
  {
    id: 'day-9',
    dayNumber: 9,
    dateStr: '10.26 (Ням)',
    time: '10:00 - 16:00',
    city: 'tokyo',
    category: 'company',
    categoryLabel: 'Хүнс & HACCP',
    categoryIcon: 'restaurant',
    categoryBg: 'bg-amber-100 text-amber-950',
    status: 'Батлагдсан',
    subtitle: 'Ribbon Foods Co ltd (RIBBON FOODS＜リボン食品株式会社＞)',
    title: 'Хүнсний үйлдвэрлэл, аюулгүй байдлын HACCP стандарт ба R&D',
    description: 'Японы анхны пафф нарийн боовны суурь бүтээгдэхүүн үйлдвэрлэгч тус компанийн хүнсний аюулгүй байдал, хатуу хяналтын HACCP систем, бүтээгдэхүүн хөгжүүлэлтийн (R&D) лабораторитой танилцах.',
    locationName: 'Токио хот'
  },
  {
    id: 'day-10-morning',
    dayNumber: 10,
    dateStr: '10.27 (Даваа)',
    time: '10:00 - 12:30',
    city: 'tokyo',
    category: 'policy',
    categoryLabel: 'Макро эдийн засаг & Бодлого',
    categoryIcon: 'analytics',
    categoryBg: 'bg-indigo-100 text-indigo-950',
    status: 'Батлагдсан',
    title: 'Азийн эдийн засаг ба Япон-Монголын бизнесийн хамтын ажиллагаа',
    description: 'Ази Номхон далайн бүсийн эдийн засгийн хамтын ажиллагааны орчин, худалдааны хэлэлцээрүүд болон Монголын бизнес эрхлэгчид Японы зах зээлд гарах гарц боломжууд.',
    locationName: 'IDE-JETRO Төв байр, Токио',
    speaker: {
      name: 'Miwa Yamada (ms.)',
      title: 'Institute of Developing Economies (IDE-JETRO)',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyGwDPEsxEe2WqumJRh5L-tuCOfFhRpTcKtlxO0tm-fK3thH1hS1VpaCwbgyxDh5UxmteBd2rJNdQAG_uOU_k67T5znG5B9-vwhiwCANVw6PSM7f2BGKnn3b-2DTJZeFGEJUcqFxV9AB6M3ozqmVj5L128GW_4OmRCYpqt8aTcY_XR5EJfCiOZyTTtOX0OqDjytDXlyl2jUlCj3nz3-A-BzNhV9G4NVbHE16Wblt7QB2cdRGRq2lCX'
    }
  },
  {
    id: 'day-10-afternoon',
    dayNumber: 10,
    dateStr: '10.27 (Даваа)',
    time: '14:00 - 17:00',
    city: 'tokyo',
    category: 'culture',
    categoryLabel: 'Брэнд соёл & Инноваци',
    categoryIcon: 'local_cafe',
    categoryBg: 'bg-emerald-100 text-emerald-950',
    status: 'Батлагдсан',
    subtitle: 'Oi Ocha Museum Ocha Culture Creation Museum (Ито эн цайны музей)',
    title: 'Ногоон цайны брэнд бүтээсэн түүх, уламжлалт ундааны инноваци',
    description: 'Ito En компанийн лонхтой ногоон цайг дэлхийн зах зээлд брэнд болгосон патентлагдсан арга техник, маркетинг ба уламжлалт цайны соёлыг орчин үеийн хэрэглээнд нэвтрүүлсэн туршлага.',
    locationName: 'Токио хот'
  },
  {
    id: 'day-11',
    dayNumber: 11,
    dateStr: '10.28 (Мягмар)',
    time: '10:00 - 15:30',
    city: 'tokyo',
    category: 'company',
    categoryLabel: 'Ниш зах зээл & HR',
    categoryIcon: 'whatshot',
    categoryBg: 'bg-orange-100 text-orange-950',
    status: 'Батлагдсан',
    subtitle: 'ThreeHigh Co., Ltd. (株式会社スリーハイ) • Аж үйлдвэрийн тусгай халаагуур',
    title: 'Ниш зах зээлд өрсөлдөх давуу тал бий болгох, ажилтны сэдэлжүүлэлт',
    description: 'Өндөр мэргэшсэн термо халаагуурын үйлдвэрлэлээр салбартаа тэргүүлэгч компанийн ажилчдын үнэ цэнийг дээшлүүлэх соёл, жижиг хэмжээтэй ч дэлхийн түвшинд өрсөлдөх ниш стратеги.',
    locationName: 'Иокохама / Токио бүс'
  },
  {
    id: 'day-12',
    dayNumber: 12,
    dateStr: '10.29 (Лхагва)',
    time: '10:00 - 15:00',
    city: 'tokyo',
    category: 'culture',
    categoryLabel: '230 жилийн түүхт өв',
    categoryIcon: 'history_edu',
    categoryBg: 'bg-amber-100 text-amber-950',
    status: 'Батлагдсан',
    subtitle: 'Fueki Syoyu Brewing Co. Ltd (笛木醤油「金笛」- KINBUE) • 230 жилийн түүхтэй цуу исгэх үйлдвэр',
    title: 'Уламжлалт өв соёлыг хадгалахын зэрэгцээ орчин үеийн жуулчлал, экспортын маркетинг хийх нь',
    description: '1789 онд үүсгэн байгуулагдсан уламжлалт модон торхонд соё соус (цуу) исгэгч үйлдвэр. Уламжлалт өвийг хамгаалан "Soy Sauce Park" төслийг хэрэгжүүлж, аялал жуулчлал ба брэнд бүтээгдэхүүний борлуулалтыг огцом өсгөсөн амжилтын нууц.',
    locationName: 'Сайтама / Токио бүс (Kinbue Soy Sauce Park)'
  },
  {
    id: 'day-13',
    dayNumber: 13,
    dateStr: '10.30 (Пүрэв) - Сүүлийн өдөр',
    time: '10:00 - 19:30',
    city: 'tokyo',
    category: 'flight',
    categoryLabel: 'Буцах нислэг',
    categoryIcon: 'flight_land',
    categoryBg: 'bg-[#dce9ff] text-[#002045]',
    status: 'Батлагдсан',
    title: 'Токио (Нарита/Ханеда) ✈ Улаанбаатар (Чингис Хаан ОУНБ)',
    description: 'Буудлын өрөө хүлээлгэн өгөх (Check-out), Токиогийн нисэх буудал руу шилжих, татваргүй барааны худалдаа болон эх орон руугаа буцах шууд нислэг. Аялал амжилттай өндөрлөнө.',
    locationName: 'Токио → Чингис Хаан ОУНБ (UBN)'
  }
];
