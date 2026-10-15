export interface GiftItem {
  id: string;
  category: 'VIP дурсгал' | 'Байгууллагын бэлэг' | 'Илтгэгчийн хүндэтгэл' | 'Багийн бэлэг';
  recipient: string; // Хүлээн авагч
  quantity: number; // Бэлгийн тоо
  unitCostMnt: number; // Нэг багцын өртөг (MNT)
  unitCostJpy: number; // Нэг багцын өртөг (JPY)
  notes: string; // Нэмэлт тайлбар
  status: 'Бэлтгэсэн' | 'Худалдан авч буй' | 'Төлөвлөсөн';
  preparedBy?: string;
}

export const INITIAL_GIFTS: GiftItem[] = [
  {
    id: 'gift-1',
    category: 'VIP дурсгал',
    recipient: 'Hiro Coffee Co. Ltd (Ноён Тошия Мурата, CEO)',
    quantity: 1,
    unitCostMnt: 350000,
    unitCostJpy: 15350,
    notes: 'Говь кашемирын дээд зэрэглэлийн ноолууран ороолт, гар хийцийн монгол мөнгөн аяга хайрцагтай.',
    status: 'Бэлтгэсэн',
    preparedBy: 'Штабын баг'
  },
  {
    id: 'gift-2',
    category: 'VIP дурсгал',
    recipient: 'IDE-JETRO хүрээлэн (Хатагтай Мива Ямада)',
    quantity: 1,
    unitCostMnt: 280000,
    unitCostJpy: 12280,
    notes: 'Монгол үндэсний нарийн хийцтэй торгон хатгамал, албан дурсгалын бэлэг дурсгал.',
    status: 'Бэлтгэсэн',
    preparedBy: 'Штабын баг'
  },
  {
    id: 'gift-3',
    category: 'Илтгэгчийн хүндэтгэл',
    recipient: 'Проф. Кэнжи Сато (Осака Их Сургууль)',
    quantity: 1,
    unitCostMnt: 250000,
    unitCostJpy: 10960,
    notes: 'Монгол ноолууран пончо, ургамлын органик цайны багц.',
    status: 'Бэлтгэсэн',
    preparedBy: 'Group-1'
  },
  {
    id: 'gift-4',
    category: 'Байгууллагын бэлэг',
    recipient: 'Amagasaki City Hall & Shinkin Bank Удирдлагын баг',
    quantity: 3,
    unitCostMnt: 180000,
    unitCostJpy: 7890,
    notes: 'Монголын байгалийн цэвэр зөгийн бал, чацарганы брэнд багц, нөхөрлөлийн дурсгалын плакет.',
    status: 'Худалдан авч буй',
    preparedBy: 'Group-5'
  },
  {
    id: 'gift-5',
    category: 'Байгууллагын бэлэг',
    recipient: 'Aeru Company (株式会社和える) гар урлалын урлан',
    quantity: 2,
    unitCostMnt: 150000,
    unitCostJpy: 6580,
    notes: 'Монгол эсгий урлалын уламжлалт хүүхдийн тоглоом, соёлын өвийг холбосон бэлэг.',
    status: 'Бэлтгэсэн',
    preparedBy: 'Group-3'
  },
  {
    id: 'gift-6',
    category: 'Байгууллагын бэлэг',
    recipient: 'Harukado Co. Ltd чанарын албаны удирдлага',
    quantity: 2,
    unitCostMnt: 150000,
    unitCostJpy: 6580,
    notes: 'Монгол ургамлын үнэрт арц, хүж, дурсгалын хайрцаг.',
    status: 'Худалдан авч буй',
    preparedBy: 'Group-1'
  },
  {
    id: 'gift-7',
    category: 'Байгууллагын бэлэг',
    recipient: 'Tanaka Tec Co. Ltd үйлдвэрийн удирдлага',
    quantity: 2,
    unitCostMnt: 160000,
    unitCostJpy: 7020,
    notes: 'Ган сийлбэртэй дурсгалын монгол бэлгэдэл, талархлын бичиг.',
    status: 'Төлөвлөсөн',
    preparedBy: 'Group-4'
  },
  {
    id: 'gift-8',
    category: 'Байгууллагын бэлэг',
    recipient: 'Ribbon Foods Co. Ltd (R&D Лабораторийн баг)',
    quantity: 2,
    unitCostMnt: 140000,
    unitCostJpy: 6140,
    notes: 'Монголын онгон дагшин нутгийн нэрс, аньсны органик шүүс, амттаны цуглуулга.',
    status: 'Бэлтгэсэн',
    preparedBy: 'Group-4'
  },
  {
    id: 'gift-9',
    category: 'Байгууллагын бэлэг',
    recipient: 'ThreeHigh Co. Ltd үйлдвэрийн хамт олон',
    quantity: 2,
    unitCostMnt: 140000,
    unitCostJpy: 6140,
    notes: 'Үндэсний үйлдвэрлэлийн ноолууран бээлий, дулаан бэлэг дурсгал.',
    status: 'Худалдан авч буй',
    preparedBy: 'Group-2'
  },
  {
    id: 'gift-10',
    category: 'VIP дурсгал',
    recipient: 'Fueki Syoyu Brewing Co. Ltd (230 жилийн түүхт үйлдвэр)',
    quantity: 2,
    unitCostMnt: 220000,
    unitCostJpy: 9650,
    notes: 'Монголын уламжлалт модон сийлбэртэй аяга, аяллын багийн талархлын дурсгал.',
    status: 'Төлөвлөсөн',
    preparedBy: 'Group-3'
  }
];
