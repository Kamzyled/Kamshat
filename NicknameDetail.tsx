import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Heart, Copy, Share2, Star, Users, Palette, User, Globe, Hash, Type, TrendingUp } from 'lucide-react';
import { Nickname, relationshipEmojis, styleEmojis } from '../data/nicknames';
import { isFavorite, addFavorite, removeFavorite, addRecentlyViewed, getSimilarNicknames } from '../database/storage';
import NicknameCard from './NicknameCard';

interface NicknameDetailProps {
  nickname: Nickname;
  onBack: () => void;
  onNicknameClick: (nickname: Nickname) => void;
}

export default function NicknameDetail({ nickname, onBack, onNicknameClick }: NicknameDetailProps) {
  const [fav, setFav] = useState(() => isFavorite(nickname.id));
  const [copied, setCopied] = useState(false);
  const [similar, setSimilar] = useState<Nickname[]>([]);

  useEffect(() => {
    addRecentlyViewed(nickname.id);
    setSimilar(getSimilarNicknames(nickname, 8));
    setFav(isFavorite(nickname.id));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [nickname]);

  const toggleFavorite = useCallback(() => {
    if (fav) {
      removeFavorite(nickname.id);
    } else {
      addFavorite(nickname.id);
    }
    setFav(!fav);
  }, [fav, nickname.id]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(nickname.nickname).catch(() => {
      const textarea = document.createElement('textarea');
      textarea.value = nickname.nickname;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    });
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [nickname.nickname]);

  const handleShare = useCallback(() => {
    const text = `✨ ${nickname.nickname}\n\n📝 Meaning: ${nickname.meaning}\n👥 Relationship: ${nickname.relationship}\n🎨 Style: ${nickname.style}\n👤 Gender: ${nickname.gender}\n🌍 Origin: ${nickname.origin}\n📊 Popularity: ${nickname.popularity}%\n\n— Shared from KamShat\n"Every Name Tells a Story"`;
    if (navigator.share) {
      navigator.share({ title: `KamShat: ${nickname.nickname}`, text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).catch(() => {});
    }
  }, [nickname]);

  const detailItems = [
    { icon: Users, label: 'Relationship', value: `${relationshipEmojis[nickname.relationship] || ''} ${nickname.relationship}`, color: 'text-blue-500' },
    { icon: Palette, label: 'Style', value: `${styleEmojis[nickname.style] || ''} ${nickname.style}`, color: 'text-purple-500' },
    { icon: User, label: 'Gender', value: nickname.gender, color: 'text-pink-500' },
    { icon: Globe, label: 'Origin', value: nickname.origin, color: 'text-green-500' },
    { icon: Hash, label: 'Length', value: `${nickname.length} characters`, color: 'text-orange-500' },
    { icon: Type, label: 'First Letter', value: nickname.first_letter, color: 'text-cyan-500' },
    { icon: Type, label: 'Last Letter', value: nickname.last_letter.toUpperCase(), color: 'text-teal-500' },
    { icon: TrendingUp, label: 'Popularity', value: `${nickname.popularity}%`, color: 'text-red-500' },
  ];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="gradient-primary rounded-b-3xl px-4 pt-4 pb-8 -mx-4 -mt-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 text-[120px] font-bold text-white leading-none">
            {nickname.nickname.charAt(0)}
          </div>
        </div>

        <div className="relative z-10">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Back</span>
          </button>

          <div className="text-center">
            <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl font-bold text-white">{nickname.nickname.charAt(0)}</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">{nickname.nickname}</h1>
            <p className="text-white/80 text-sm max-w-xs mx-auto leading-relaxed">{nickname.meaning}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handleCopy}
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-2xl bg-white/15 backdrop-blur-sm hover:bg-white/25 transition-colors"
            >
              <Copy size={20} className="text-white" />
              <span className="text-[11px] text-white/80">{copied ? 'Copied!' : 'Copy'}</span>
            </button>
            <button
              onClick={toggleFavorite}
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-2xl bg-white/15 backdrop-blur-sm hover:bg-white/25 transition-colors"
            >
              <Heart size={20} className={fav ? 'fill-white text-white' : 'text-white'} />
              <span className="text-[11px] text-white/80">{fav ? 'Saved' : 'Save'}</span>
            </button>
            <button
              onClick={handleShare}
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-2xl bg-white/15 backdrop-blur-sm hover:bg-white/25 transition-colors"
            >
              <Share2 size={20} className="text-white" />
              <span className="text-[11px] text-white/80">Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Popularity Bar */}
      <div className="mt-6 p-4 rounded-2xl bg-white dark:bg-dark-card card-shadow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-dark-text flex items-center gap-2">
            <Star size={16} className="text-yellow-500" />
            Popularity
          </span>
          <span className="text-sm font-bold text-primary">{nickname.popularity}%</span>
        </div>
        <div className="w-full h-2.5 bg-gray-100 dark:bg-dark-surface rounded-full overflow-hidden">
          <div
            className="h-full gradient-primary rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${nickname.popularity}%` }}
          />
        </div>
      </div>

      {/* Details Grid */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        {detailItems.map((item, index) => (
          <div
            key={item.label}
            className={`p-3 rounded-2xl bg-white dark:bg-dark-card card-shadow animate-fade-in stagger-${index + 1}`}
          >
            <div className="flex items-center gap-2 mb-1">
              <item.icon size={14} className={item.color} />
              <span className="text-[11px] text-gray-500 dark:text-dark-muted font-medium uppercase tracking-wider">
                {item.label}
              </span>
            </div>
            <p className="text-sm font-semibold text-gray-800 dark:text-dark-text">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Similar Nicknames */}
      {similar.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-bold text-gray-800 dark:text-dark-text mb-3 flex items-center gap-2">
            💡 Similar Nicknames
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {similar.map(n => (
              <NicknameCard key={n.id} nickname={n} onClick={onNicknameClick} compact />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
