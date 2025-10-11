import { useState } from 'react';

const StartScreen = ({ onStartStory, fullStoryAudioUrl, onClearAudio }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = () => {
    if (prompt.trim()) {
      onStartStory(prompt);
    }
  };

  const handleDownload = () => {
    if (fullStoryAudioUrl) {
      const link = document.createElement('a');
      link.href = fullStoryAudioUrl;
      link.download = 'complete-story-narration.mp3';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      onClearAudio();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-amber-800 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-amber-700 rounded-full"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 border border-amber-600 rotate-45"></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 max-w-2xl w-full">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-7xl font-serif font-bold text-amber-900 mb-4 tracking-wide drop-shadow-lg">
            कथा
            <span className="block text-3xl font-normal text-amber-700 mt-2 italic">Ancient Tales Reborn</span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-800 to-transparent mx-auto mb-6"></div>
          <p className="text-xl text-amber-800 font-serif leading-relaxed">
            Embark on mystical journeys through the rich tapestry of Indian folklore.
            <br className="hidden sm:block" />
            Your choices shape the destiny of ancient tales.
          </p>
        </div>

        {/* Download Section */}
        {fullStoryAudioUrl && (
          <div className="mb-8 p-6 bg-gradient-to-r from-emerald-100 to-teal-100 border-2 border-emerald-300 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-8 h-8 text-emerald-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"/>
              </svg>
              <h3 className="text-lg font-serif font-bold text-emerald-800">आपकी कथा तैयार है!</h3>
            </div>
            <p className="text-emerald-700 mb-4 font-serif">Your complete story narration awaits download</p>
            <button
              onClick={handleDownload}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-serif font-bold rounded-lg shadow-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
              </svg>
              Download Complete Story
            </button>
          </div>
        )}

        {/* Story Input Section */}
        <div className="bg-white/80 backdrop-blur-sm border-2 border-amber-300 rounded-2xl p-8 shadow-2xl">
          <div className="mb-6">
            <label className="block text-lg font-serif font-semibold text-amber-900 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
              </svg>
              अपनी कथा का बीज बोएं
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Whisper your tale's beginning... (e.g., 'A mystical banyan tree guards ancient secrets')"
              className="w-full p-4 text-lg font-serif bg-amber-50 border-2 border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 resize-none h-24 placeholder-amber-600/70"
              rows="3"
            />
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={!prompt.trim()}
            className="w-full py-4 bg-gradient-to-r from-amber-700 to-orange-700 text-white font-serif font-bold text-xl rounded-xl shadow-lg hover:from-amber-800 hover:to-orange-800 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8,5.14V19.14L19,12.14L8,5.14Z"/>
            </svg>
            कथा आरंभ करें
          </button>
        </div>
        
        {/* Decorative Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-amber-700 font-serif italic">
            "Every story is a journey, every choice a new path"
          </p>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;