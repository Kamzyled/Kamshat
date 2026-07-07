import { Heart, Copy, Share2 } from 'lucide-react';
import { Nickname, relationshipEmojis, styleEmojis } from '../data/nicknames';
import { isFavorite, addFavorite, removeFavorite } from '../database/storage';
import { useState, useCallback } from 'react';

interface NicknameCardProps {
  nickname: Nickname;
  onClick: (nickname: Nickname) => void;
  compact?: boolean;
  onFavoriteChange?: () => void;
}

export default function NicknameCard({ nickname, onClick, compact = false, onFavoriteChange }: NicknameCardProps) {
  const [fav, setFav] = useState(() => isFavorite(nickname.id));
  const [copied, setCopied] = useState(false);

  const toggleFavorite = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (fav) {
      removeFavorite(nickname.id);
    } else {
      addFavorite(nickname.id);
    }
    setFav(!fav);
    onFavoriteChange?.();
  }, [fav, nickname.id, onFavoriteChange]);

  const handleCopy = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(nickname.nickname).catch(() => {
      const textarea = document.createElement('textarea');
      textarea.value = nickname.nickname;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    });
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [nickname.nickname]);

  const handleShare = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `✨ ${nickname.nickname}\n\n📝 ${nickname.meaning}\n👥 ${nickname.relationship}\n🎨 ${nickname.style}\n\n— Shared from KamShat\n"Every Name Tells a Story"`;
    if (navigator.share) {
      navigator.share({ title: 'KamShat Nickname', text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).catch(() => {});
    }
  }, [nickname]);

  if (compact) {
    return (
      <button
        onClick={() => onClick(nickname)}
        className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-dark-card card-shadow hover:shadow-md transition-all duration-200 w-full text-left active:scale-[0.98]"
      >
        <div className="w-10 h-10 rounded-xl gradient-card flex items-center justify-center text-white font-bold text-sm shrink-0">
          {nickname.nickname.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-gray-800 dark:text-dark-text truncate text-sm">
            {nickname.nickname}
          </p>
          <p className="text-xs text-gray-500 dark:text-dark-muted truncate">
            {relationshipEmojis[nickname.relationship] || '💫'} {nickname.relationship}
          </p>
        </div>
        <button
          onClick={toggleFavorite}
          className="p-1.5 shrink-0"
        >
          <Heart
            size={16}
            className={fav ? 'fill-accent text-accent' : 'text-gray-300 dark:text-gray-600'}
          />
        </button>
      </button>
    );
  }

  return (
    <div
      onClick={() => onClick(nickname)}
      className="p-4 rounded-2xl bg-white dark:bg-dark-card card-shadow hover:card-shadow-lg transition-all duration-300 cursor-pointer active:scale-[0.98] group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl gradient-card flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:shadow-lg transition-shadow">
            {nickname.nickname.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-gray-800 dark:text-dark-text text-base leading-tight">
              {nickname.nickname}
            </h3>
            <p className="text-xs text-gray-500 dark:text-dark-muted mt-0.5">
              {relationshipEmojis[nickname.relationship] || '💫'} {nickname.relationship} · {styleEmojis[nickname.style] || '✨'} {nickname.style}
            </p>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 leading-relaxed">
        {nickname.meaning}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex gap-1.5 flex-wrap">
          <span className="px-2 py-0.5 rounded-full bg-primary-50 dark:bg-dark-surface text-primary dark:text-blue-300 text-[11px] font-medium">
            {nickname.gender}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-accent-100 dark:bg-pink-900/30 text-accent dark:text-pink-300 text-[11px] font-medium">
            {nickname.origin}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors"
            title="Copy"
          >
            {copied ? (
              <span className="text-xs text-green-500 font-medium">✓</span>
            ) : (
              <Copy size={15} className="text-gray-400 dark:text-gray-500" />
            )}
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors"
            title="Share"
          >
            <Share2 size={15} className="text-gray-400 dark:text-gray-500" />
          </button>
          <button
            onClick={toggleFavorite}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors"
            title={fav ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              size={16}
              className={`transition-colors ${fav ? 'fill-accent text-accent' : 'text-gray-300 dark:text-gray-600'}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
