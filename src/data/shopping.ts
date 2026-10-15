export interface ShoppingMall {
  id: string;
  name: string;
  city: 'tokyo' | 'osaka';
  station: string;
  category: 'Их дэлгүүр' | 'Загвар & Lifestyle' | 'Электроник' | 'Бэлэг дурсгал & Гоо сайхан' | 'Outlet';
  highlights: string;
  description: string;
  googleMapsQuery: string;
  googleMapsUrl: string;
  tourismUrl?: string;
  tourismLabel?: string;
  imageUrl?: string;
}

export const SHOPPING_MALLS: ShoppingMall[] = [
  // --- TOKYO ---
  {
    id: 'tokyo-1',
    name: 'Isetan Shinjuku',
    city: 'tokyo',
    station: 'Shinjuku Station / Shinjuku-sanchome',
    category: 'Их дэлгүүр',
    highlights: 'Япон брэндийн хувцас, гоо сайхан, үнэтэй бэлэг, хүнсний бүтээгдэхүүн',
    description: 'Япон брэндийн хувцас, гоо сайхан, үнэтэй бэлэг, хүнсний бүтээгдэхүүн авахад тохиромжтой. Дэлхийд алдартай тансаг зэрэглэлийн их дэлгүүр бөгөөд доод давхрын депачика (хүнсний танхим) маш баялаг.',
    googleMapsQuery: 'Isetan Shinjuku Tokyo',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Isetan+Shinjuku+Tokyo',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBffih9LwpXegAWwdJDBMqAyfAQv-eN8eDNosMWfnzkC7cCd4X0V3nwu3TmV2OQCaifgQGxph6OyP0MZua8-LBf9FSabaS7B4RPS-Exqcmdj2A819a0LqsLmSVURbvqQ5LzHTG5B2fsoWrqcRGz4oEp45gKy9IWjVckz_-LjP3YdzjgGqmaxRMwo16zjqLMWjQpDdwHXXwctTso1qVif5dTffoU2ZPgmoRjoBdp6pKlqRkgZT13wbYz'
  },
  {
    id: 'tokyo-2',
    name: 'Shibuya Scramble Square',
    city: 'tokyo',
    station: 'Shibuya Station',
    category: 'Загвар & Lifestyle',
    highlights: 'Орчин үеийн худалдааны төв, загварын брэнд, ресторан, Shibuya Sky',
    description: 'Орчин үеийн худалдааны төв, загварын брэнд, ресторан болон Shibuya Sky үзвэрийг нэг дор үзэж болно. Залуусын хамгийн их очдог тренд болж буй шинэ цогцолбор.',
    googleMapsQuery: 'Shibuya Scramble Square Tokyo',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Shibuya+Scramble+Square+Tokyo',
    tourismUrl: 'https://www.gotokyo.org/en/spot/1608/index.html',
    tourismLabel: 'TokyoTourism.org',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5MSfYuDxrJtIJJNKC04f824u16PhVWfrJOtQ24CLG486BtzoqRSfqoARoMRoThHdEQMO_iUGTJNe0uct_9JVS78c_9lauwh0XgU9X6ECPS0UETQjF1vhxL_ZOhIOBBMRLODsTjXXxl6o1QAdhtTOIWVyToRKWNrcoR3GRTigpWkf84M4iKI_UOib9axwHex1Rq7cIXZh0Q4BZkGEkwCNODrkZCribl8YKGf3MQHyFyGrRY9uGFhX7'
  },
  {
    id: 'tokyo-3',
    name: 'Ginza Shopping District',
    city: 'tokyo',
    station: 'Ginza Station',
    category: 'Их дэлгүүр',
    highlights: 'Uniqlo Ginza 12 давхар, Mitsukoshi, Matsuya, олон улсын тансаг брэндүүд',
    description: 'Uniqlo-ийн том салбар, Mitsukoshi, Matsuya, олон улсын тансаг брэндүүдтэй. Чанартай бэлэг, гоо сайхан, загварын бараа хайхад тохиромжтой.',
    googleMapsQuery: 'Ginza Shopping District Tokyo',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Ginza+Shopping+District+Tokyo',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyGwDPEsxEe2WqumJRh5L-tuCOfFhRpTcKtlxO0tm-fK3thH1hS1VpaCwbgyxDh5UxmteBd2rJNdQAG_uOU_k67T5znG5B9-vwhiwCANVw6PSM7f2BGKnn3b-2DTJZeFGEJUcqFxV9AB6M3ozqmVj5L128GW_4OmRCYpqt8aTcY_XR5EJfCiOZyTTtOX0OqDjytDXlyl2jUlCj3nz3-A-BzNhV9G4NVbHE16Wblt7QB2cdRGRq2lCX'
  },
  {
    id: 'tokyo-4',
    name: 'Akihabara Electric Town',
    city: 'tokyo',
    station: 'Akihabara Station',
    category: 'Электроник',
    highlights: 'Камер, компьютер, цахилгаан бараа, тоглоом, анимэ, электроник',
    description: 'Камер, компьютер, цахилгаан бараа, тоглоом, анимэ болон электроникийн хэрэгсэл сонирхдог хүмүүст тохиромжтой.',
    googleMapsQuery: 'Akihabara Electric Town Tokyo',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Akihabara+Electric+Town+Tokyo',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADhXBK9KGA5Pkst6_f7LdOBEBFpM_9bp9P891fBM6owRrf1FGfk-EQ7N-v-M45tWdFJXVoI2RHAiAw1uohkz0bqW6eNEHV9TlOQYxKkTxkgaSsY4-JguIltqqu9OenW__mGWpA5zMMNbZCSQFHn9fkeTwCBcfm1-crfVES4DrvldNAkZAW4K2hjdj1V6WylTxRHagWHMUbpBMYWtChnTnsL34UAr1sNuAzw5MJa0dUBMDd6KzG4iro'
  },
  {
    id: 'tokyo-5',
    name: 'MEGA Don Quijote Shibuya',
    city: 'tokyo',
    station: 'Shibuya Station',
    category: 'Бэлэг дурсгал & Гоо сайхан',
    highlights: 'Гоо сайхан, амттан, жижиг бэлэг дурсгал, өдөр тутмын хэрэглээ, 24 цаг',
    description: 'Гоо сайхны бүтээгдэхүүн, амттан, жижиг бэлэг дурсгал, өдөр тутмын хэрэглээний бараа зэргийг нэг дороос үзэхэд тохиромжтой.',
    googleMapsQuery: 'MEGA Don Quijote Shibuya Tokyo',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=MEGA+Don+Quijote+Shibuya+Tokyo',
    tourismUrl: 'https://www.gotokyo.org/en/spot/1321/index.html',
    tourismLabel: 'TokyoTourism.org',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhVmSxXXaAmHa3Bb1MIgw58uWb-iYvVNDLxCB_d0s77i4CR0XVQVEsXUSpttDC2YzQKaRYt-2Y8u-7aY-YJZroQabQULkgITWcdCMPQ3l5wQdRJb89pOC7xIUjzJcMDK7pRRveDo28m2pwdKsMY6U0H2x350Cwn3ykizhTaL__xFCMekZCIy_9512XVw9b0TlJQiAgVKhy0W8YmsiH62RHwutAVX81nc4bBfOR2Pqp3i1jJprYlZgl'
  },
  {
    id: 'tokyo-6',
    name: 'Daimaru Tokyo',
    city: 'tokyo',
    station: 'Tokyo Station, Yaesu North Exit',
    category: 'Их дэлгүүр',
    highlights: 'Галт тэрэгний буудалтай шууд холбогддог, бэлэг, хүнс, гоо сайхан, хувцас',
    description: 'Галт тэрэгний буудалтай шууд холбогддог том их дэлгүүр. Бэлэг, хүнсний бүтээгдэхүүн, гоо сайхан болон хувцас авахад тохиромжтой.',
    googleMapsQuery: 'Daimaru Tokyo Station',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Daimaru+Tokyo+Station',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAHA8TXq1G9SzKMdPWwDO_YwokymI2NuJpsFZLzsAC1aAXtR4q4b7fx0FAb1nYNbZnwqqptLuI13MNbeI2rznubhRylfclHTRYqj3Jp27GfKnpxNQYDCozr_xDQFyD_0Hok-SjKGR77h_uqacA2RMeZUBuUUJXu6vqTwIEBIlpOIUUjxsTZ79-ZU3Zsi2sYjfXLKRp6jGGupkXixZVND14ls81Zxg_9hpkSv0_CePU1rh4R6qnDmrg'
  },

  // --- OSAKA ---
  {
    id: 'osaka-1',
    name: 'Shinsaibashi-suji Shopping Street',
    city: 'osaka',
    station: 'Shinsaibashi Station',
    category: 'Загвар & Lifestyle',
    highlights: 'Олон дэлгүүр төвлөрсөн саравчтай гудамж, Дотонборитой шууд залгаа',
    description: 'Олон дэлгүүр нэг гудамжинд төвлөрсөн, хувцас, гутал, гоо сайхан, Япон брэндийн бараа авахад тохиромжтой. Дотонбори хүртэл алхаж болно.',
    googleMapsQuery: 'Shinsaibashi-suji Shopping Street Osaka',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Shinsaibashi-suji+Shopping+Street+Osaka',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5MSfYuDxrJtIJJNKC04f824u16PhVWfrJOtQ24CLG486BtzoqRSfqoARoMRoThHdEQMO_iUGTJNe0uct_9JVS78c_9lauwh0XgU9X6ECPS0UETQjF1vhxL_ZOhIOBBMRLODsTjXXxl6o1QAdhtTOIWVyToRKWNrcoR3GRTigpWkf84M4iKI_UOib9axwHex1Rq7cIXZh0Q4BZkGEkwCNODrkZCribl8YKGf3MQHyFyGrRY9uGFhX7'
  },
  {
    id: 'osaka-2',
    name: 'Namba Parks',
    city: 'osaka',
    station: 'Namba Station',
    category: 'Загвар & Lifestyle',
    highlights: 'Дээврийн цэцэрлэгт хүрээлэн, архитектур, хувцас, lifestyle, ресторан',
    description: 'Олон давхар худалдааны төв, хувцас, lifestyle бараа, ресторан болон дээврийн цэцэрлэгтэй.',
    googleMapsQuery: 'Namba Parks Osaka',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Namba+Parks+Osaka',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBffih9LwpXegAWwdJDBMqAyfAQv-eN8eDNosMWfnzkC7cCd4X0V3nwu3TmV2OQCaifgQGxph6OyP0MZua8-LBf9FSabaS7B4RPS-Exqcmdj2A819a0LqsLmSVURbvqQ5LzHTG5B2fsoWrqcRGz4oEp45gKy9IWjVckz_-LjP3YdzjgGqmaxRMwo16zjqLMWjQpDdwHXXwctTso1qVif5dTffoU2ZPgmoRjoBdp6pKlqRkgZT13wbYz'
  },
  {
    id: 'osaka-3',
    name: 'Hankyu Umeda Main Store',
    city: 'osaka',
    station: 'Osaka-Umeda Station',
    category: 'Их дэлгүүр',
    highlights: 'Кансай бүсийн тэргүүлэх тансаг их дэлгүүр, чанартай бэлэг, гоо сайхан, хүнс',
    description: 'Япон болон олон улсын брэндийн хувцас, гоо сайхан, бэлэг, чанартай хүнсний бүтээгдэхүүнтэй том их дэлгүүр.',
    googleMapsQuery: 'Hankyu Umeda Main Store Osaka',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Hankyu+Umeda+Main+Store+Osaka',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADhXBK9KGA5Pkst6_f7LdOBEBFpM_9bp9P891fBM6owRrf1FGfk-EQ7N-v-M45tWdFJXVoI2RHAiAw1uohkz0bqW6eNEHV9TlOQYxKkTxkgaSsY4-JguIltqqu9OenW__mGWpA5zMMNbZCSQFHn9fkeTwCBcfm1-crfVES4DrvldNAkZAW4K2hjdj1V6WylTxRHagWHMUbpBMYWtChnTnsL34UAr1sNuAzw5MJa0dUBMDd6KzG4iro'
  },
  {
    id: 'osaka-4',
    name: 'Yodobashi Camera Multimedia Umeda',
    city: 'osaka',
    station: 'Osaka Station / Umeda',
    category: 'Электроник',
    highlights: 'Гар утас, камер, компьютер, гэр ахуйн цахилгаан төхөөрөмж',
    description: 'Гар утас, камер, компьютер, цахилгаан бараа, жижиг гэр ахуйн төхөөрөмж сонирхож байгаа бол үзэхэд тохиромжтой.',
    googleMapsQuery: 'Yodobashi Camera Multimedia Umeda Osaka',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Yodobashi+Camera+Multimedia+Umeda+Osaka',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhVmSxXXaAmHa3Bb1MIgw58uWb-iYvVNDLxCB_d0s77i4CR0XVQVEsXUSpttDC2YzQKaRYt-2Y8u-7aY-YJZroQabQULkgITWcdCMPQ3l5wQdRJb89pOC7xIUjzJcMDK7pRRveDo28m2pwdKsMY6U0H2x350Cwn3ykizhTaL__xFCMekZCIy_9512XVw9b0TlJQiAgVKhy0W8YmsiH62RHwutAVX81nc4bBfOR2Pqp3i1jJprYlZgl'
  },
  {
    id: 'osaka-5',
    name: 'Don Quijote Dotonbori',
    city: 'osaka',
    station: 'Namba Station',
    category: 'Бэлэг дурсгал & Гоо сайхан',
    highlights: 'Амттан, бэлэг дурсгал, гоо сайхан, өдөр тутмын бараа, алсыг харагчтай',
    description: 'Амттан, бэлэг дурсгал, гоо сайхан, өдөр тутмын хэрэглээний барааг харьцуулж авахад тохиромжтой. Дотонборигийн шөнийн үзэмжтэй хамт үзэж болно.',
    googleMapsQuery: 'Don Quijote Dotonbori Osaka',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Don+Quijote+Dotonbori+Osaka',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAHA8TXq1G9SzKMdPWwDO_YwokymI2NuJpsFZLzsAC1aAXtR4q4b7fx0FAb1nYNbZnwqqptLuI13MNbeI2rznubhRylfclHTRYqj3Jp27GfKnpxNQYDCozr_xDQFyD_0Hok-SjKGR77h_uqacA2RMeZUBuUUJXu6vqTwIEBIlpOIUUjxsTZ79-ZU3Zsi2sYjfXLKRp6jGGupkXixZVND14ls81Zxg_9hpkSv0_CePU1rh4R6qnDmrg'
  },
  {
    id: 'osaka-6',
    name: 'Rinku Premium Outlets',
    city: 'osaka',
    station: 'Rinku-Town Station, Kansai Airport-ийн ойролцоо',
    category: 'Outlet',
    highlights: 'Олон улсын & Япон брэндүүд, хямдрал, Кансай нисэх буудлын дэргэд',
    description: 'Олон улсын болон Япон брэндийн хувцас, гутал, цүнх, спортын барааг outlet дэлгүүрүүдээс хайхад тохиромжтой. Гэхдээ Осака хотын төвөөс гадуур тул тусад нь цаг гаргах хэрэгтэй.',
    googleMapsQuery: 'Rinku Premium Outlets Osaka',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Rinku+Premium+Outlets+Osaka',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyGwDPEsxEe2WqumJRh5L-tuCOfFhRpTcKtlxO0tm-fK3thH1hS1VpaCwbgyxDh5UxmteBd2rJNdQAG_uOU_k67T5znG5B9-vwhiwCANVw6PSM7f2BGKnn3b-2DTJZeFGEJUcqFxV9AB6M3ozqmVj5L128GW_4OmRCYpqt8aTcY_XR5EJfCiOZyTTtOX0OqDjytDXlyl2jUlCj3nz3-A-BzNhV9G4NVbHE16Wblt7QB2cdRGRq2lCX'
  }
];
