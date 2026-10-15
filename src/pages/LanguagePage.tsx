import React, { useState } from 'react';

interface PhraseItem {
  id: string;
  category: string;
  japanese: string;
  romaji: string;
  mongolian: string;
  context: string;
}

export const LanguagePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [searchWord, setSearchWord] = useState('');

  const phraseList: PhraseItem[] = [
    // 1. Мэндчилгээ & Талархал
    {
      id: 'p-1',
      category: 'Мэндчилгээ',
      japanese: 'こんにちは',
      romaji: 'Konnichiwa',
      mongolian: 'Сайн байна уу?',
      context: 'Өдрийн цагаар (10:00 - 18:00) нийтлэг хэрэглэх мэндчилгээ.'
    },
    {
      id: 'p-2',
      category: 'Мэндчилгээ',
      japanese: 'おはようございます',
      romaji: 'Ohayō gozaimasu',
      mongolian: 'Өглөөний мэнд',
      context: 'Өглөөний цагаар уулзахад хэлэх хүндэтгэлийн мэндчилгээ.'
    },
    {
      id: 'p-3',
      category: 'Мэндчилгээ',
      japanese: 'ありがとうございます',
      romaji: 'Arigatō gozaimasu',
      mongolian: 'Маш их баярлалаа',
      context: 'Хамгийн түгээмэл бөгөөд хүндэтгэлийн өнгө аястай талархал.'
    },
    {
      id: 'p-4',
      category: 'Мэндчилгээ',
      japanese: 'すみません',
      romaji: 'Sumimasen',
      mongolian: 'Уучлаарай / Өршөөгөөрэй',
      context: 'Зөөгчийг дуудах, зам тавиулах, эсвэл хөнгөн уучлал гуйхад хэрэглэнэ.'
    },
    {
      id: 'p-5',
      category: 'Мэндчилгээ',
      japanese: 'お願いします',
      romaji: 'Onegaishimasu',
      mongolian: 'Гуйя / Тусална уу',
      context: 'Аливаа үйлчилгээ авах, таксинд суух, захиалга өгөхөд төгсгөлд нь хэлнэ.'
    },

    // 2. Бизнес & Уулзалт
    {
      id: 'p-6',
      category: 'Бизнес & Уулзалт',
      japanese: '初めまして、よろしくお願いします',
      romaji: 'Hajimemashite, yoroshiku onegaishimasu',
      mongolian: 'Танилцсандаа таатай байна, цаашид хамтран ажиллахыг хүсье',
      context: 'Нэрийн хуудсаа хоёр гараараа барьж өгөхдөө толгой бөхийлгөн хэлнэ.'
    },
    {
      id: 'p-7',
      category: 'Бизнес & Уулзалт',
      japanese: 'モンゴルから参りました',
      romaji: 'Mongoru kara mairimashita',
      mongolian: 'Бид Монгол улсаас ирсэн төлөөлөгчид байна',
      context: 'Компанийн айлчлалын эхэнд танилцуулах үед хэлнэ.'
    },
    {
      id: 'p-8',
      category: 'Бизнес & Уулзалт',
      japanese: '名刺をいただけますか？',
      romaji: 'Meishi o itadakemasu ka?',
      mongolian: 'Таны нэрийн хуудсыг авч болох уу?',
      context: 'Японы бизнесийн түншээс нэрийн хуудсыг нь хүсэх эелдэг хэллэг.'
    },
    {
      id: 'p-9',
      category: 'Бизнес & Уулзалт',
      japanese: '大変勉強になりました',
      romaji: 'Taihen benkyō ni narimashita',
      mongolian: 'Маш их зүйл суралцаж, туршлага хуримтлууллаа',
      context: 'Семинар, үйлдвэрийн танилцуулга дууссаны дараа талархал илэрхийлэхэд хэлнэ.'
    },

    // 3. Дэлгүүр & Худалдан авалт
    {
      id: 'p-10',
      category: 'Худалдаа',
      japanese: 'これをください',
      romaji: 'Kore o kudasai',
      mongolian: 'Үүнийг авъя',
      context: 'Меню эсвэл барааг хуруугаараа заагаад шууд ашиглана.'
    },
    {
      id: 'p-11',
      category: 'Худалдаа',
      japanese: '免税できますか？',
      romaji: 'Menzei dekimasu ka?',
      mongolian: 'Татваргүй худалдаа (Tax-free) боломжтой юу?',
      context: 'Дэлгүүрт төлбөр төлөхөөс өмнө кассан дээр асууна.'
    },
    {
      id: 'p-12',
      category: 'Худалдаа',
      japanese: 'いくらですか？',
      romaji: 'Ikura desu ka?',
      mongolian: 'Энэ ямар үнэтэй вэ?',
      context: 'Үнийн шошго байхгүй барааны үнийг лавлах үед хэлнэ.'
    },
    {
      id: 'p-13',
      category: 'Худалдаа',
      japanese: 'カードで払えますか？',
      romaji: 'Kādo de haraemasu ka?',
      mongolian: 'Картаар төлж болох уу?',
      context: 'Төлбөрийн карт (Visa, Mastercard, JCB) унших эсэхийг лавлах.'
    },

    // 4. Тээвэр & Чиглэл
    {
      id: 'p-14',
      category: 'Тээвэр & Такси',
      japanese: 'ホテルグランヴィア大阪までお願いします',
      romaji: 'Hoteru Guranvia Ōsaka made onegaishimasu',
      mongolian: 'Hotel Granvia Osaka буудал хүртэл явна уу',
      context: 'Таксинд суугаад буудлынхаа нэрийг хэлэх үед ашиглана.'
    },
    {
      id: 'p-15',
      category: 'Тээвэр & Такси',
      japanese: '駅はどこですか？',
      romaji: 'Eki wa doko desu ka?',
      mongolian: 'Галт тэрэгний буудал хаана байна вэ?',
      context: 'Гудамжинд хамгийн ойр метро эсвэл галт тэрэгний буудал асуух.'
    },
    {
      id: 'p-16',
      category: 'Тээвэр & Такси',
      japanese: '英語を話せますか？',
      romaji: 'Eigo o hanasemasu ka?',
      mongolian: 'Та англиар ярьдаг уу?',
      context: 'Мэдээллийн ажилтан эсвэл хүлээн авах дээр яриа эхлүүлэхэд эелдэг асуулт.'
    },

    // 5. Хоол & Ресторан
    {
      id: 'p-17',
      category: 'Хоол & Ресторан',
      japanese: 'おすすめは何ですか？',
      romaji: 'Osusume wa nan desu ka?',
      mongolian: 'Та ямар хоол санал болгох вэ?',
      context: 'Рестораны шилдэг онцлох хоолыг асуух үед хэлнэ.'
    },
    {
      id: 'p-18',
      category: 'Хоол & Ресторан',
      japanese: 'お会計をお願いします',
      romaji: 'O-kaikei o onegaishimasu',
      mongolian: 'Тооцоо хийе',
      context: 'Хоол идсэний дараа тооцооны хуудсаа нэхэх үед хэлнэ.'
    },
    {
      id: 'p-19',
      category: 'Хоол & Ресторан',
      japanese: 'お水をください',
      romaji: 'O-mizu o kudasai',
      mongolian: 'Цэвэр ус авъя',
      context: 'Ширээн дээрээ хүйтэн ус нэмүүлж авахад хэлнэ.'
    },

    // 6. Онцгой байдал & Тусламж
    {
      id: 'p-20',
      category: 'Тусламж',
      japanese: '助けてください',
      romaji: 'Tasukete kudasai',
      mongolian: 'Туслаарай!',
      context: 'Яаралтай тусламж хэрэгтэй үед хажуугийн хүмүүсээс тусламж эрхлэх.'
    },
    {
      id: 'p-21',
      category: 'Тусламж',
      japanese: '病院はどこですか？',
      romaji: 'Byōin wa doko desu ka?',
      mongolian: 'Эмнэлэг хаана байна вэ?',
      context: 'Бие тавгүйтэх, яаралтай эмнэлгийн тусламж авах шаардлага гарвал ашиглана.'
    }
  ];

  const categories = ['all', 'Мэндчилгээ', 'Бизнес & Уулзалт', 'Худалдаа', 'Тээвэр & Такси', 'Хоол & Ресторан', 'Тусламж'];

  const filtered = phraseList.filter(p => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    if (searchWord.trim()) {
      const q = searchWord.toLowerCase();
      const mJa = p.japanese.toLowerCase().includes(q);
      const mRo = p.romaji.toLowerCase().includes(q);
      const mMn = p.mongolian.toLowerCase().includes(q);
      const mCt = p.context.toLowerCase().includes(q);
      if (!mJa && !mRo && !mMn && !mCt) return false;
    }
    return true;
  });

  const speak = (japaneseText: string, id: string) => {
    setPlayingId(id);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(japaneseText);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.85;
      utterance.onend = () => setPlayingId(null);
      utterance.onerror = () => setPlayingId(null);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setPlayingId(null), 1000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-20 w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#e5eeff]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#002045]"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#74777f]">
              ЯРИАНЫ ХӨТӨЧ & ДУУДЛАГА ТАНИХ
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002045] tracking-tight">
            Япон Хэлний Түргэн Туслах
          </h1>
          <p className="text-xs sm:text-sm text-[#586e8d] mt-1 leading-relaxed">
            Бизнес уулзалт, их дэлгүүр, ресторан, такси болон онцгой байдалд ашиглах дуут дуудлагатай ярианы хөтөч.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-[#002045] bg-[#eff4ff] px-4 py-2.5 rounded-xl border border-[#d3e4fe]">
          <span className="material-symbols-outlined text-[18px] text-[#b52426]">volume_up</span>
          <span>Карт дээр дарж бодит Япон дуудлагыг сонсоно уу</span>
        </div>
      </div>

      {/* Filter Chips & Search */}
      <div className="py-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Filter Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedCategory === c
                  ? 'bg-[#002045] text-white shadow-sm'
                  : 'bg-white border border-[#d3e4fe] text-[#43474e] hover:bg-[#eff4ff]'
              }`}
            >
              {c === 'all' ? 'Бүх үгс' : c}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-xs w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            placeholder="Япон эсвэл монгол үгээр хайх..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-[#d3e4fe] focus:outline-none focus:ring-1 focus:ring-[#002045]"
          />
        </div>
      </div>

      {/* Phrases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => {
          const isPlaying = playingId === item.id;
          return (
            <div
              key={item.id}
              onClick={() => speak(item.japanese, item.id)}
              className={`p-5 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer border ${
                isPlaying ? 'border-[#b52426] ring-2 ring-[#ffdad6]' : 'border-[#e5eeff] hover:border-[#d3e4fe]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-[#b52426] uppercase tracking-wider">
                    {item.category}
                  </span>
                  <button
                    type="button"
                    className={`p-2 rounded-full transition-colors ${
                      isPlaying
                        ? 'bg-[#b52426] text-white'
                        : 'bg-[#eff4ff] text-[#002045] group-hover:bg-[#002045] group-hover:text-white'
                    }`}
                    aria-label="Сонсох"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {isPlaying ? 'volume_up' : 'play_arrow'}
                    </span>
                  </button>
                </div>

                <div className="text-xl sm:text-2xl font-bold text-[#002045] mb-1 leading-snug">
                  {item.japanese}
                </div>
                <div className="text-xs font-bold text-[#b52426] tracking-wide mb-2">
                  {item.romaji}
                </div>
                <p className="text-sm font-bold text-[#0b1c30]">
                  {item.mongolian}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 text-[#74777f] text-[11px] leading-relaxed">
                {item.context}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
