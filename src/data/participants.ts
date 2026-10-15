export interface Leader {
  id: string;
  avatarChar: string;
  role: string;
  tag: string;
  name: string;
  nickname: string;
  description: string;
  phone: string;
  phoneDisplay: string;
  secondaryPhone?: string;
  email?: string;
  whatsapp?: string;
  bgColor: string;
}

export interface Delegate {
  id: string;
  number: string; // e.g. "#01"
  initials: string;
  company: string;
  sector: string;
  sectorBadgeColor: 'red' | 'blue' | 'gray';
  name: string;
  fullName: string;
  nickname: string;
  position: string;
  phoneMn: string;
  phoneJp: string;
  email: string;
  avatarBg?: string;
  avatarColor?: string;
}

export const LEADERS: Leader[] = [
  {
    id: 'leader-1',
    avatarChar: 'О',
    role: 'Аяллын Ахлагч',
    tag: 'Ахлагч',
    name: 'Очирбатын Мөнх-Эрдэнэ',
    nickname: 'Мөөгий',
    description: 'Executive Director • Блиц: "Мөөгий"',
    phone: '+818049201122',
    phoneDisplay: '+81 80-4920-1122',
    whatsapp: 'https://wa.me/818049201122',
    bgColor: 'bg-[#002045] text-white'
  },
  {
    id: 'leader-2',
    avatarChar: 'S',
    role: 'Япон Ахлах Хөтөч / Орчуулагч',
    tag: 'JPN/MGL',
    name: 'Сато Тацүя (佐藤 達也)',
    nickname: 'Тацүя сан',
    description: 'Орон нутгийн зохицуулагч • Блиц: "Тацүя сан"',
    phone: '+819088332190',
    phoneDisplay: '+81 90-8833-2190',
    email: 'sato.tatsuya@japantour.jp',
    bgColor: 'bg-[#d3e4fe] text-[#002045]'
  },
  {
    id: 'leader-3',
    avatarChar: 'Б',
    role: 'Ложистик & Эмнэлгийн Туслах',
    tag: '24/7 Шугам',
    name: 'Болдбаатарын Саранцэцэг',
    nickname: 'Сараа',
    description: 'Хөтөлбөрийн зохицуулагч • Блиц: "Сараа"',
    phone: '+97699110088',
    phoneDisplay: '+976 9911-0088',
    secondaryPhone: 'JP: +81 80-7712-3490',
    bgColor: 'bg-[#e5eeff] text-[#002045]'
  }
];

export const DELEGATES: Delegate[] = [
  {
    id: 'del-01',
    number: 'Төлөөлөгч #01',
    initials: 'БТ',
    company: 'АПУ ХК',
    sector: 'Хүнсний үйлдвэрлэл',
    sectorBadgeColor: 'red',
    name: 'Б. Тэмүүлэн',
    fullName: 'Батболдын Тэмүүлэн',
    nickname: 'Тэмка',
    position: 'Гүйцэтгэх захирал (CEO)',
    phoneMn: '+976 9911-2233',
    phoneJp: '+81 80-1122-3344',
    email: 'temuulen@apu.mn',
    avatarBg: 'bg-[#d6e3ff]',
    avatarColor: 'text-[#002045]'
  },
  {
    id: 'del-02',
    number: 'Төлөөлөгч #02',
    initials: 'ДЭ',
    company: 'М-Си-Эс Групп',
    sector: 'Худалдаа ложистик',
    sectorBadgeColor: 'blue',
    name: 'Д. Энхжин',
    fullName: 'Доржийн Энхжин',
    nickname: 'Энжи',
    position: 'Үйл ажиллагаа эрхэлсэн захирал (COO)',
    phoneMn: '+976 9909-8877',
    phoneJp: '+81 90-4455-6677',
    email: 'enkhjin.d@mcs.mn',
    avatarBg: 'bg-[#dce9ff]',
    avatarColor: 'text-[#002045]'
  },
  {
    id: 'del-03',
    number: 'Төлөөлөгч #03',
    initials: 'ГБ',
    company: 'Говь ХК',
    sector: 'Ноос ноолуур / Экспорт',
    sectorBadgeColor: 'red',
    name: 'Г. Бат-Эрдэнэ',
    fullName: 'Ганболдын Бат-Эрдэнэ',
    nickname: 'Батаа',
    position: 'ТУЗ-ийн дарга (Chairman)',
    phoneMn: '+976 9911-9988',
    phoneJp: '+81 70-3322-1100',
    email: 'baterdene@gobi.mn',
    avatarBg: 'bg-[#ffdad6]',
    avatarColor: 'text-[#410003]'
  },
  {
    id: 'del-04',
    number: 'Төлөөлөгч #04',
    initials: 'ЦА',
    company: 'Таван Богд Групп',
    sector: 'Худалдаа ложистик',
    sectorBadgeColor: 'blue',
    name: 'Ц. Анударь',
    fullName: 'Цэрэндоржийн Анударь',
    nickname: 'Ану',
    position: 'Ложистикийн дэд захирал',
    phoneMn: '+976 9910-5544',
    phoneJp: '+81 80-9988-7711',
    email: 'anudari@tavanbogd.com',
    avatarBg: 'bg-[#d3e4fe]',
    avatarColor: 'text-[#002045]'
  },
  {
    id: 'del-05',
    number: 'Төлөөлөгч #05',
    initials: 'МБ',
    company: 'Хаан Банк',
    sector: 'Санхүү банк',
    sectorBadgeColor: 'blue',
    name: 'М. Болд',
    fullName: 'Мягмаржавын Болд',
    nickname: 'Болдоо',
    position: 'Хөрөнгө оруулалтын дэд захирал',
    phoneMn: '+976 9911-7766',
    phoneJp: '+81 80-2233-9988',
    email: 'bold.m@khanbank.com',
    avatarBg: 'bg-[#002045]',
    avatarColor: 'text-white'
  },
  {
    id: 'del-06',
    number: 'Төлөөлөгч #06',
    initials: 'ЭБ',
    company: 'Тесо Групп',
    sector: 'Хүнсний үйлдвэрлэл',
    sectorBadgeColor: 'red',
    name: 'Э. Билгүүн',
    fullName: 'Эрдэнэбилэгийн Билгүүн',
    nickname: 'Билли',
    position: 'Инноваци технологийн захирал',
    phoneMn: '+976 9911-3355',
    phoneJp: '+81 70-5544-3322',
    email: 'bilguun@teso.mn',
    avatarBg: 'bg-[#e5eeff]',
    avatarColor: 'text-[#002045]'
  },
  {
    id: 'del-07',
    number: 'Төлөөлөгч #07',
    initials: 'СУ',
    company: 'Юнител Групп',
    sector: 'Мэдээллийн технологи',
    sectorBadgeColor: 'blue',
    name: 'С. Учрал',
    fullName: 'Сүхбаатарын Учрал',
    nickname: 'Учраа',
    position: 'Технологи эрхэлсэн захирал (CTO)',
    phoneMn: '+976 8811-4400',
    phoneJp: '+81 80-6677-8899',
    email: 'uchral@unitel.mn',
    avatarBg: 'bg-[#d6e3ff]',
    avatarColor: 'text-[#002045]'
  },
  {
    id: 'del-08',
    number: 'Төлөөлөгч #08',
    initials: 'ЖН',
    company: 'Бодь Интернэшнл',
    sector: 'Барилга, дэд бүтэц',
    sectorBadgeColor: 'gray',
    name: 'Ж. Наранбаатар',
    fullName: 'Жамьянгийн Наранбаатар',
    nickname: 'Нараа',
    position: 'Төслийн газрын захирал',
    phoneMn: '+976 9911-8800',
    phoneJp: '+81 70-1199-2244',
    email: 'naranbaatar@bodi.mn',
    avatarBg: 'bg-[#dce9ff]',
    avatarColor: 'text-[#002045]'
  },
  {
    id: 'del-09',
    number: 'Төлөөлөгч #09',
    initials: 'ХМ',
    company: 'Моннис Групп',
    sector: 'Барилга, дэд бүтэц',
    sectorBadgeColor: 'gray',
    name: 'Х. Мөнхбат',
    fullName: 'Хүрэлбаатарын Мөнхбат',
    nickname: 'Мөөгий',
    position: 'Дэд бүтцийн ерөнхий захирал',
    phoneMn: '+976 9911-0022',
    phoneJp: '+81 80-4499-1133',
    email: 'munkhbat.kh@monnis.com',
    avatarBg: 'bg-[#e5eeff]',
    avatarColor: 'text-[#002045]'
  },
  {
    id: 'del-10',
    number: 'Төлөөлөгч #10',
    initials: 'ПЭ',
    company: 'Номин Холдинг',
    sector: 'Мэдээллийн технологи',
    sectorBadgeColor: 'red',
    name: 'П. Энхтуул',
    fullName: 'Пүрэвийн Энхтуул',
    nickname: 'Туяа',
    position: 'Дижитал худалдааны стратегич',
    phoneMn: '+976 9901-3344',
    phoneJp: '+81 90-8800-4455',
    email: 'enkhtuul@nomin.net',
    avatarBg: 'bg-[#ffdad6]',
    avatarColor: 'text-[#410003]'
  }
];

export function generateVCard(delegates: Delegate[]): string {
  let vcard = '';
  delegates.forEach(d => {
    vcard += `BEGIN:VCARD
VERSION:3.0
N:${d.fullName};;;;
FN:${d.name} (${d.nickname})
ORG:${d.company}
TITLE:${d.position}
TEL;TYPE=CELL,VOICE:${d.phoneMn}
TEL;TYPE=WORK,VOICE:${d.phoneJp}
EMAIL:${d.email}
NOTE:Japanese Executive Study Tour 2026
END:VCARD
`;
  });
  return vcard;
}

export function generateCsv(delegates: Delegate[]): string {
  const headers = ['Дугаар', 'Компани', 'Салбар', 'Бүтэн нэр', 'Блиц нэр', 'Албан тушаал', 'Утас (MN)', 'Утас (JP)', 'Имэйл'];
  const rows = delegates.map(d => [
    `"${d.number}"`,
    `"${d.company}"`,
    `"${d.sector}"`,
    `"${d.fullName}"`,
    `"${d.nickname}"`,
    `"${d.position}"`,
    `"${d.phoneMn}"`,
    `"${d.phoneJp}"`,
    `"${d.email}"`
  ]);
  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}
