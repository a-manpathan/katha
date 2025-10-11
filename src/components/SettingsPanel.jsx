import { useState, useEffect } from 'react';

const SettingsPanel = ({ onLanguageChange, onVoiceChange }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('Marathi');
  const [selectedVoice, setSelectedVoice] = useState('en-US-natalie');
  const [isOpen, setIsOpen] = useState(false);

  const voiceOptions = {
    Marathi: ['en-UK-ruby', 'en-US-natalie', 'en-US-miles', 'en-US-amara', 'en-US-maverick'],
    Hindi: ['hi-IN-kabir', 'hi-IN-ayushi', 'hi-IN-shaan', 'hi-IN-rahul', 'hi-IN-shweta', 'hi-IN-amit'],
    Telugu: ['en-UK-ruby', 'en-US-natalie', 'en-US-miles', 'en-US-amara', 'en-US-maverick'],
    Gujarati: ['en-UK-ruby', 'en-US-natalie', 'en-US-miles', 'en-US-amara', 'en-US-maverick']
  };

  useEffect(() => {
    setSelectedVoice(voiceOptions[selectedLanguage][0]);
  }, [selectedLanguage]);

  const handleLanguageChange = (e) => {
    const language = e.target.value;
    setSelectedLanguage(language);
    onLanguageChange(language);
  };

  const handleVoiceChange = (e) => {
    const voice = e.target.value;
    setSelectedVoice(voice);
    onVoiceChange(voice);
  };

  return (
    <div className="fixed top-6 left-6 z-20">
      {/* Scroll Icon Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 border-2 border-amber-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center group"
        aria-label="Story Settings"
      >
        <svg className="w-6 h-6 text-amber-800 group-hover:text-amber-900 transition-colors" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.43-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
        </svg>
      </button>

      {/* Parchment Settings Panel */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-72 bg-gradient-to-br from-amber-50 to-amber-100 border-4 border-amber-800 rounded-lg shadow-2xl transform transition-all duration-300 ease-out animate-in slide-in-from-top-2">
          {/* Decorative Header */}
          <div className="bg-gradient-to-r from-amber-800 to-amber-900 text-amber-50 px-4 py-3 rounded-t-md">
            <h3 className="font-serif text-lg font-bold tracking-wide flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
              </svg>
              कथा Settings
            </h3>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Language Selection */}
            <div>
              <label className="block text-sm font-serif font-semibold text-amber-900 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.87,15.07L10.33,12.56L10.36,12.53C12.1,10.59 13.34,8.36 14.07,6H17V4H10V2H8V4H1V6H12.17C11.5,7.92 10.44,9.75 9,11.35C8.07,10.32 7.3,9.19 6.69,8H4.69C5.42,9.63 6.42,11.17 7.67,12.56L2.58,17.58L4,19L9,14L12.11,17.11L12.87,15.07Z"/>
                </svg>
                भाषा (Language)
              </label>
              <select 
                value={selectedLanguage} 
                onChange={handleLanguageChange}
                className="w-full p-3 text-base font-serif bg-white border-2 border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 hover:border-amber-400"
              >
                <option value="Marathi">मराठी (Marathi)</option>
                <option value="Hindi">हिन्दी (Hindi)</option>
                <option value="Telugu">తెలుగు (Telugu)</option>
                <option value="Gujarati">ગુજરાતી (Gujarati)</option>
              </select>
            </div>

            {/* Voice Selection */}
            <div>
              <label className="block text-sm font-serif font-semibold text-amber-900 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"/>
                </svg>
                आवाज़ (Voice)
              </label>
              <select 
                value={selectedVoice} 
                onChange={handleVoiceChange}
                className="w-full p-3 text-base font-serif bg-white border-2 border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 hover:border-amber-400"
              >
                {voiceOptions[selectedLanguage].map((voice, index) => (
                  <option key={index} value={voice}>{voice}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Decorative Footer */}
          <div className="h-2 bg-gradient-to-r from-amber-800 to-amber-900 rounded-b-md"></div>
        </div>
      )}
    </div>
  );
};

export default SettingsPanel;