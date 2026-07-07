import { useState, useCallback } from 'react';
import { Shuffle, Dices } from 'lucide-react';
import { Nickname, relationshipCategories, styleCategories, relationshipEmojis, styleEmojis } from '../data/nicknames';
import { getRandomNickname, getRandomByRelationship, getRandomByStyle, getRandomByLength } from '../database/storage';
import NicknameCard from '../components/NicknameCard';
import NicknameDetail from '../components/NicknameDetail';

export default function RandomPage() {
  const [randomNickname, setRandomNickname] = useState<Nickname | null>(null);
  const [selectedNickname, setSelectedNickname] = useState<Nickname | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [activeTab, setActiveTab] = useState<'any' | 'relationship' | 'style' | 'length'>('any');
  const [selectedRelationship, setSelectedRelationship] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [lengthRange, setLengthRange] = useState<'short' | 'medium' | 'long'>('medium');

  const generateRandom = useCallback(() => {
    let result: Nickname;
    switch (activeTab) {
      case 'relationship':
        result = selectedRelationship
          ? getRandomByRelationship(selectedRelationship)
          : getRandomNickname();
        break;
      case 'style':
        result = selectedStyle
          ? getRandomByStyle(selectedStyle)
          : getRandomNickname();
        break;
      case 'length':
        {
          const ranges = { short: [1, 5], medium: [6, 12], long: [13, 50] };
          const [min, max] = ranges[lengthRange];
          result = getRandomByLength(min, max);
        }
        break;
      default:
        result = getRandomNickname();
    }
    setRandomNickname(result);
  }, [activeTab, selectedRelationship, selectedStyle, lengthRange]);

  const handleNicknameClick = useCallback((nickname: Nickname) => {
    setSelectedNickname(nickname);
    setShowDetail(true);
  }, []);

  const handleBack = useCallback(() => {
    setShowDetail(false);
    setSelectedNickname(null);
  }, []);

  if (showDetail && selectedNickname) {
    return (
      <NicknameDetail
        nickname={selectedNickname}
        onBack={handleBack}
        onNicknameClick={handleNicknameClick}
      />
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Dices size={22} className="text-primary" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-dark-text">Random</h1>
        </div>
        <p className="text-sm text-gray-500 dark:text-dark-muted">
          Discover a random nickname
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto hide-scrollbar pb-1">
        {[
          { key: 'any', label: '🎲 Any' },
          { key: 'relationship', label: '👥 Relationship' },
          { key: 'style', label: '🎨 Style' },
          { key: 'length', label: '📏 Length' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.key
                ? 'bg-primary text-white shadow-md'
                : 'bg-white dark:bg-dark-card text-gray-600 dark:text-dark-muted card-shadow'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filter Options */}
      {activeTab === 'relationship' && (
        <div className="mb-5 animate-fade-in">
          <p className="text-xs text-gray-500 dark:text-dark-muted mb-2 font-medium uppercase tracking-wider">
            Select Relationship
          </p>
          <div className="flex flex-wrap gap-2">
            {relationshipCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedRelationship(cat === selectedRelationship ? '' : cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedRelationship === cat
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 dark:bg-dark-surface text-gray-600 dark:text-dark-muted'
                }`}
              >
                {relationshipEmojis[cat]} {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'style' && (
        <div className="mb-5 animate-fade-in">
          <p className="text-xs text-gray-500 dark:text-dark-muted mb-2 font-medium uppercase tracking-wider">
            Select Style
          </p>
          <div className="flex flex-wrap gap-2">
            {styleCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedStyle(cat === selectedStyle ? '' : cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedStyle === cat
                    ? 'bg-accent text-white'
                    : 'bg-gray-100 dark:bg-dark-surface text-gray-600 dark:text-dark-muted'
                }`}
              >
                {styleEmojis[cat]} {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'length' && (
        <div className="mb-5 animate-fade-in">
          <p className="text-xs text-gray-500 dark:text-dark-muted mb-2 font-medium uppercase tracking-wider">
            Select Length
          </p>
          <div className="flex gap-3">
            {[
              { key: 'short', label: 'Short', desc: '1–5 chars' },
              { key: 'medium', label: 'Medium', desc: '6–12 chars' },
              { key: 'long', label: 'Long', desc: '13+ chars' },
            ].map(opt => (
              <button
                key={opt.key}
                onClick={() => setLengthRange(opt.key as typeof lengthRange)}
                className={`flex-1 p-3 rounded-2xl text-center transition-all ${
                  lengthRange === opt.key
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white dark:bg-dark-card card-shadow text-gray-700 dark:text-dark-text'
                }`}
              >
                <p className="font-bold text-sm">{opt.label}</p>
                <p className={`text-xs mt-0.5 ${lengthRange === opt.key ? 'text-white/70' : 'text-gray-400'}`}>
                  {opt.desc}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Generate Button */}
      <button
        onClick={generateRandom}
        className="w-full p-4 rounded-2xl gradient-primary text-white flex items-center justify-center gap-3 card-shadow-lg hover:opacity-95 transition-all active:scale-[0.98] mb-6"
      >
        <Shuffle size={22} />
        <span className="font-bold text-base">Generate Random Nickname</span>
      </button>

      {/* Result */}
      {randomNickname && (
        <div className="animate-scale-in">
          <h2 className="text-base font-bold text-gray-800 dark:text-dark-text mb-3 flex items-center gap-2">
            🎉 Your Random Nickname
          </h2>
          <NicknameCard nickname={randomNickname} onClick={handleNicknameClick} />

          <button
            onClick={generateRandom}
            className="w-full mt-4 p-3 rounded-2xl border-2 border-dashed border-primary/30 text-primary font-medium text-sm hover:bg-primary-50 dark:hover:bg-dark-surface transition-colors flex items-center justify-center gap-2"
          >
            <Shuffle size={16} />
            Try Another
          </button>
        </div>
      )}

      {/* Placeholder */}
      {!randomNickname && (
        <div className="text-center py-10">
          <div className="w-24 h-24 rounded-3xl bg-primary-50 dark:bg-dark-surface flex items-center justify-center mx-auto mb-4 animate-float">
            <Dices size={44} className="text-primary" />
          </div>
          <h3 className="text-lg font-bold text-gray-700 dark:text-dark-text mb-2">
            Ready to discover?
          </h3>
          <p className="text-sm text-gray-500 dark:text-dark-muted max-w-xs mx-auto">
            Tap the button above to generate a random nickname
          </p>
        </div>
      )}
    </div>
  );
}
