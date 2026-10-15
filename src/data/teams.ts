export interface TeamMember {
  id: string;
  name: string;
  role?: string;
  isLeader?: boolean;
}

export interface TeamGroup {
  id: string;
  name: string;
  groupNumber: number;
  leader: string;
  topic: string;
  caseStudy: string;
  members: TeamMember[];
  color: string;
  badgeBg: string;
}

export const STUDY_TOUR_TEAMS: TeamGroup[] = [
  {
    id: 'group-1',
    name: 'Group-1',
    groupNumber: 1,
    leader: 'Гантигмаа',
    topic: 'Үйлдвэрлэлийн бүтээмж ба Kaizen 5S аргачлал',
    caseStudy: 'Hiro Coffee Co. Ltd & Harukado чанарын хяналтын системийг Монголын хүнс, өргөн хэрэглээний салбарт нэвтрүүлэх нь',
    color: '#002045',
    badgeBg: 'bg-[#d6e3ff] text-[#001b3c]',
    members: [
      { id: 'm-1-1', name: 'Гантигмаа', role: 'Багийн ахлагч', isLeader: true },
      { id: 'm-1-2', name: 'Цолмон', role: 'Шинжээч' },
      { id: 'm-1-3', name: 'Энхтөгс', role: 'Судлаач' },
      { id: 'm-1-4', name: 'Батдаваа', role: 'Зохион байгуулагч' },
      { id: 'm-1-5', name: 'Отгонбөгж', role: 'Илтгэгч' }
    ]
  },
  {
    id: 'group-2',
    name: 'Group-2',
    groupNumber: 2,
    leader: 'Мөнхтуяа',
    topic: 'ЖДҮ салбарын өрсөлдөх чадвар & Экспорт',
    caseStudy: 'ThreeHigh Co. Ltd-ийн ниш зах зээлд тэргүүлэгч болох стратеги ба ажилтны сэдэлжүүлэлтийн туршлага',
    color: '#b52426',
    badgeBg: 'bg-[#ffdad6] text-[#410003]',
    members: [
      { id: 'm-2-1', name: 'Мөнхтуяа', role: 'Багийн ахлагч', isLeader: true },
      { id: 'm-2-2', name: 'Энхмөнгө', role: 'Шинжээч' },
      { id: 'm-2-3', name: 'Ууганбаяр', role: 'Судлаач' },
      { id: 'm-2-4', name: 'Болдбаатар', role: 'Илтгэгч' }
    ]
  },
  {
    id: 'group-3',
    name: 'Group-3',
    groupNumber: 3,
    leader: 'Болор',
    topic: 'Уламжлалт өвийг орчин үеийн брэнд болгох нь',
    caseStudy: 'Aeru Company & Fueki Syoyu (Kinbue Soy Sauce Park)-ийн уламжлалыг жуулчлал, экспортын брэнд болгосон загвар',
    color: '#361900',
    badgeBg: 'bg-[#ffdcc3] text-[#2f1500]',
    members: [
      { id: 'm-3-1', name: 'Болор', role: 'Багийн ахлагч', isLeader: true },
      { id: 'm-3-2', name: 'Баярмаа', role: 'Шинжээч' },
      { id: 'm-3-3', name: 'Амарболд', role: 'Судлаач' },
      { id: 'm-3-4', name: 'Батбаяр', role: 'Зохион байгуулагч' },
      { id: 'm-3-5', name: 'Хонгорзул', role: 'Илтгэгч' }
    ]
  },
  {
    id: 'group-4',
    name: 'Group-4',
    groupNumber: 4,
    leader: 'Болор-эрдэнэ',
    topic: 'Хүнсний аюулгүй байдал, HACCP ба R&D инноваци',
    caseStudy: 'Ribbon Foods Co. Ltd & Oi Ocha цайны музейн технологийн патент, эрүүл хүнсний судалгаа хөгжүүлэлт',
    color: '#1a365d',
    badgeBg: 'bg-[#dce9ff] text-[#002045]',
    members: [
      { id: 'm-4-1', name: 'Болор-эрдэнэ', role: 'Багийн ахлагч', isLeader: true },
      { id: 'm-4-2', name: 'Амартүвшин', role: 'Шинжээч' },
      { id: 'm-4-3', name: 'Баянмөнх', role: 'Судлаач' },
      { id: 'm-4-4', name: 'Уранбилэг', role: 'Илтгэгч' }
    ]
  },
  {
    id: 'group-5',
    name: 'Group-5',
    groupNumber: 5,
    leader: 'Батбилэг',
    topic: 'Бүс нутгийн санхүүжилт, ЖДҮ дэмжих механизм',
    caseStudy: 'Amagasaki City Hall & Amagasaki Shinkin Bank болон IDE-JETRO-ийн хамтын ажиллагааны схем',
    color: '#004d40',
    badgeBg: 'bg-[#ccfbf1] text-[#115e59]',
    members: [
      { id: 'm-5-1', name: 'Батбилэг', role: 'Багийн ахлагч', isLeader: true },
      { id: 'm-5-2', name: 'Жаргалмаа', role: 'Шинжээч' },
      { id: 'm-5-3', name: 'Номин', role: 'Судлаач' },
      { id: 'm-5-4', name: 'Доржпүрэв', role: 'Илтгэгч' }
    ]
  }
];
