export interface ChecklistItem {
  id: string;
  icon: string;
  title: string;
  tag?: string;
  tagColor?: string;
  description: string;
}

export interface ProhibitionItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface EtiquetteRule {
  number: string;
  title: string;
  description: string;
  badgeIcon: string;
  badgeText: string;
  badgeColor?: string;
  highlightBorder?: boolean;
}

export interface JapanesePhrase {
  id: string;
  category: string;
  japanese: string;
  romaji: string;
  mongolian: string;
  usage: string;
}

export const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'item-1',
    icon: 'badge',
    title: '1. Цээж зураг (4.5 x 3.5 см - 2 хувь)',
    tag: 'Заавал',
    tagColor: 'bg-[#ffdad6] text-[#410003]',
    description: 'Сургалтын үнэмлэх, байгууллагын нэвтрэх карт болон тусгай үнэмлэх хэвлэхэд шаардлагатай (цагаан фонтой).'
  },
  {
    id: 'item-2',
    icon: 'laptop_mac',
    title: '2. Нэг багт нэг зөөврийн компьютер',
    tag: 'Багийн ажил',
    tagColor: 'bg-[#d6e3ff] text-[#001b3c]',
    description: 'Өдөр бүрийн хэлэлцүүлэг, кейс тайлан, сургалтын үр дүнгийн танилцуулга бэлтгэхэд баг тус бүр дор хаяж 1 зөөврийн төхөөрөмжтэй байна.'
  },
  {
    id: 'item-3',
    icon: 'luggage',
    title: '3. Жижиг гар чемодан (Cabin size trolley)',
    description: 'Осакагаас Токио руу Шинкансэн хурдан галт тэргээр зорчих тул гар тээш авсаархан (55x40x25 см хүртэл) байх шаардлагатай.'
  },
  {
    id: 'item-4',
    icon: 'sim_card',
    title: '4. Travel e-SIM (Япон дата сүлжээ)',
    tag: 'Интернэт',
    tagColor: 'bg-[#d3e4fe] text-[#43474e]',
    description: 'Японд буухаас өмнө e-SIM тохиргоогоо суулгаж, 10-15GB өндөр хурдны дата эрх идэвхжүүлсэн байна.'
  },
  {
    id: 'item-5',
    icon: 'payments',
    title: '5. Бэлэн мөнгө: 10,000 - 20,000 ¥',
    tag: 'Иен бэлнээр',
    tagColor: 'bg-[#ffdcc3] text-[#2f1500]',
    description: 'Тээврийн карт цэнэглэх (ICOCA/Suica), автомат машин, жижиг уламжлалт дэлгүүрүүд карт уншдаггүй тул бэлэн мөнгөтэй байх.'
  },
  {
    id: 'item-6',
    icon: 'contact_page',
    title: '6. Бизнес нэрийн хуудас (Meishi)',
    tag: '50-100 ширхэг',
    tagColor: 'bg-[#ffdad6] text-[#410003]',
    description: 'Японы бизнесийн танилцах ёс зүйд нэрийн хуудас маш чухал. Англи болон Япон тайлбартай байвал давуу талтай.'
  }
];

export const PROHIBITIONS: ProhibitionItem[] = [
  {
    id: 'prohibit-1',
    icon: 'no_meals',
    title: '1. Мах, махан бүтээгдэхүүн авч орох',
    description: 'Борц, хиам, лаазалсан мах, малын гаралтай бүтээгдэхүүнийг Япон улсын хилээр нэвтрүүлэх хатуу хориотой. Зөрчвөл 3 сая иен хүртэл торгууль, хуулийн хариуцлагатай.'
  },
  {
    id: 'prohibit-2',
    icon: 'pets',
    title: '2. Хориотой амьтан, ургамлын гаралтай түүхий эд',
    description: 'Боловсруулаагүй арьс, шир, ургамлын үр, жимс ногоо авч орохыг хил, хорио цээрийн албанаас бүрэн хориглодог.'
  },
  {
    id: 'prohibit-3',
    icon: 'no_drinks',
    title: '3. Алкохол хэтрүүлэн хэрэглэх',
    description: 'Сургалт, албан уулзалт болон нийтийн тээвэрт согтууруулах ундааг зүй зохисгүй хэрэглэх, багийн нэр хүндэд сөргөөр нөлөөлөхийг хориглоно.'
  },
  {
    id: 'prohibit-4',
    icon: 'smoke_free',
    title: '4. Буудалд шуугилдах, тамхи татах',
    description: 'Зочид буудлын өрөөнд тамхи татвал өндөр торгууль (50,000¥+) ногдуулдаг. 21:00 цагаас хойш коридорт шуугилдахыг хориглоно.'
  },
  {
    id: 'prohibit-5',
    icon: 'alarm_off',
    title: '5. Сургалт, уулзалтаас хоцрох',
    description: 'Японы соёлд хоцрох нь хамгийн том үл хүндэтгэлд тооцогддог. Товлосон цагаас 10 минутын өмнө бүгд бэлэн цугласан байна.'
  }
];

export const ETIQUETTE_RULES: EtiquetteRule[] = [
  {
    number: '01',
    title: 'Урсдаг шатны тал',
    description: 'Осака-д баруун талдаа зогсож, зүүн талаар гүйдэг. Харин Токио хотод зүүн талдаа зогсож урсдаг соёлтой.',
    badgeIcon: 'escalator',
    badgeText: 'Осака ≠ Токио',
    badgeColor: 'text-secondary'
  },
  {
    number: '02',
    title: 'Хогоо өөртөө хадгалах',
    description: 'Гудамжинд хогийн сав бараг байдаггүй. Иймд өөрийн хогийг уутанд хийж цүнхэндээ хадгалан буудалдаа хаях ёстой.',
    badgeIcon: 'delete',
    badgeText: 'Хог хаяхгүй байх',
    badgeColor: 'text-[#74777f]'
  },
  {
    number: '03',
    title: 'Гутлаа тайлах ёс',
    description: 'Уламжлалт ресторан (Tatami), сүм хийд, зарим оффист орохдоо гутлаа заавал тайлж, зориулалтын шаахай өмсөнө.',
    badgeIcon: 'do_not_step',
    badgeText: 'Цэвэр оймс бэлтгэх',
    badgeColor: 'text-[#74777f]'
  },
  {
    number: '04',
    title: 'Tip үлдээхгүй',
    description: 'Японд үйлчилгээний хөлс үнэд шингэсэн байдаг тул цайны мөнгө (tip) үлдээх шаардлагагүй. Энэ нь үйлчилгээний соёлд үл тохирно.',
    badgeIcon: 'monetization_on',
    badgeText: 'Tip өгөх шаардлагагүй',
    badgeColor: 'text-[#74777f]'
  },
  {
    number: '05',
    title: 'Нэрийн хуудас (Meishi)',
    description: 'Нэрийн хуудсыг заавал хоёр гараараа хүндэтгэлтэй өгч, хүлээн авна. Хүлээн авсны дараа ширээн дээр хүндэтгэлтэй тавина.',
    badgeIcon: 'handshake',
    badgeText: 'Бизнес ёс зүй',
    badgeColor: 'text-secondary',
    highlightBorder: true
  },
  {
    number: '06',
    title: 'Савхны цээр',
    description: 'Савхыг будаан дээр босоогоор нь хатгаж болохгүй (оршуулгын зан үйл). Хоолноос хоол руу савхаар дамжуулж өгөхийг цээрлэнэ.',
    badgeIcon: 'restaurant',
    badgeText: 'Савхыг тавиур дээр тавих',
    badgeColor: 'text-[#74777f]'
  },
  {
    number: '07',
    title: 'Гудамжинд тамхи татахгүй',
    description: 'Алхаж явахдаа тамхи татахыг хуулиар хатуу хориглодог бөгөөд зөвхөн тэмдэглэгээтэй зориулалтын цэгт тамхи татахыг зөвшөөрдөг.',
    badgeIcon: 'smoke_free',
    badgeText: 'Зөвшөөрсөн цэгт л татах',
    badgeColor: 'text-[#74777f]'
  },
  {
    number: '08',
    title: 'Бэлэн мөнгө (Cash)',
    description: 'Японы жижиг уламжлалт мухлаг, гудамжны хоолны газар, автомат машинууд зөвхөн бэлэн иенээр гүйлгээ хийдгийг санаарай.',
    badgeIcon: 'payments',
    badgeText: 'Иен үргэлж авч явах',
    badgeColor: 'text-[#74777f]'
  },
  {
    number: '09',
    title: 'Шар зураас & Дараалал',
    description: 'Галт тэрэгний буудал, автобусны буудалд заасан шар зураасны дагуу яг дарааллаар зогсож, бууж буй хүмүүсийг эхэлж гаргана.',
    badgeIcon: 'linear_scale',
    badgeText: 'Дараалал хүндэтгэх',
    badgeColor: 'text-[#74777f]'
  },
  {
    number: '10',
    title: 'Гарц, зам хаахгүй байх',
    description: 'Бүлгээрээ явахдаа дэлгүүрийн үүд, метроны шат, явган хүний гарц дээр бөөгнөрч зогсохгүй, бусдын хөдөлгөөнд саад болохгүй байх.',
    badgeIcon: 'group',
    badgeText: 'Замын урсгалыг чөлөөлөх',
    badgeColor: 'text-[#74777f]'
  }
];

export const JAPANESE_PHRASES: JapanesePhrase[] = [
  {
    id: 'phrase-1',
    category: 'Мэндчилгээ',
    japanese: 'こんにちは',
    romaji: 'Konnichiwa',
    mongolian: 'Сайн байна уу?',
    usage: 'Өдрийн цагаар (10:00 - 18:00) нийтлэг хэрэглэх мэндчилгээ.'
  },
  {
    id: 'phrase-2',
    category: 'Талархал',
    japanese: 'ありがとうございます',
    romaji: 'Arigatō gozaimasu',
    mongolian: 'Маш их баярлалаа',
    usage: 'Хамгийн түгээмэл бөгөөд хүндэтгэлийн өнгө аястай талархал.'
  },
  {
    id: 'phrase-3',
    category: 'Уучлалт & Хүсэлт',
    japanese: 'すみません',
    romaji: 'Sumimasen',
    mongolian: 'Уучлаарай / Өршөөгөөрэй',
    usage: 'Зөөгчийг дуудах, зам тавиулах, эсвэл хөнгөн уучлал гуйхад хэрэглэнэ.'
  },
  {
    id: 'phrase-4',
    category: 'Хүсэлт',
    japanese: 'お願いします',
    romaji: 'Onegaishimasu',
    mongolian: 'Гуйя / Тусална уу',
    usage: 'Аливаа үйлчилгээ авах, таксинд суух, захиалга өгөхөд төгсгөлд нь хэлнэ.'
  },
  {
    id: 'phrase-5',
    category: 'Асуулт',
    japanese: '英語を話せますか？',
    romaji: 'Eigo o hanasemasu ka?',
    mongolian: 'Та англиар ярьдаг уу?',
    usage: 'Дэлгүүр болон хүлээн авах дээр яриа эхлүүлэхэд эелдэг асуулт.'
  },
  {
    id: 'phrase-6',
    category: 'Худалдан авалт',
    japanese: 'これをください',
    romaji: 'Kore o kudasai',
    mongolian: 'Үүнийг авъя',
    usage: 'Меню эсвэл барааг хуруугаараа заагаад захиалахад шууд ашиглана.'
  }
];
