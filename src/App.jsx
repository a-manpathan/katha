import { useState } from 'react';
import axios from 'axios';
import StartScreen from './components/StartScreen';
import StoryScreen from './components/StoryScreen';
import SettingsPanel from './components/SettingsPanel';

function App() {
  // State management for the storytelling experience
  const [storyHistory, setStoryHistory] = useState([]);
  const [currentChoices, setCurrentChoices] = useState([]);
  const [audioUrl, setAudioUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStoryStarted, setIsStoryStarted] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Marathi');
  const [selectedVoice, setSelectedVoice] = useState('en-US-natalie');
  const [currentAudio, setCurrentAudio] = useState(null);
  const [fullStoryAudioUrl, setFullStoryAudioUrl] = useState(null);
  const [audioUrls, setAudioUrls] = useState([]);

  // Function to generate story content
  const handleGenerateStory = async (prompt, choice = null) => {
    if (isLoading) {
      console.log('Already loading, ignoring request');
      return;
    }
    
    // Pause currently playing audio immediately
    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
    }
    
    console.log('Generating story with:', { prompt, choice, historyLength: storyHistory.length });
    setIsLoading(true);
    
    try {
      const response = await axios.post('http://localhost:8000/api/story/generate', {
        prompt,
        choice,
        history: storyHistory,
        language: selectedLanguage
      });
      
      console.log('Story response:', response.data);
      
      if (response.data.storySegment) {
        setStoryHistory(prev => [...prev, response.data.storySegment]);
      }
      
      // Check if story should end (after 8-10 segments)
      if (storyHistory.length >= 8) {
        setCurrentChoices(['End Story', 'Continue Adventure']);
      } else if (response.data.choices) {
        setCurrentChoices(response.data.choices);
      }
      
      // Generate audio narration
      if (response.data.storySegment) {
        try {
          const audioResponse = await axios.post('http://localhost:8000/api/audio/narrate', {
            text: response.data.storySegment,
            voice: selectedVoice,
            language: selectedLanguage
          });
          
          if (audioResponse.data.audioUrl) {
            const audio = new Audio(audioResponse.data.audioUrl);
            setCurrentAudio(audio);
            setAudioUrls(prev => [...prev, audioResponse.data.audioUrl]);
            audio.addEventListener('ended', () => setCurrentAudio(null));
            audio.play().catch(e => console.log('Audio autoplay blocked:', e));
          }
        } catch (audioError) {
          console.log('Audio generation failed:', audioError);
        }
      }
      
    } catch (error) {
      console.error('Error generating story:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to begin the story
  const handleStartStory = (prompt) => {
    setIsStoryStarted(true);
    handleGenerateStory(prompt);
  };

  // Function to handle choice selection
  const handleChoiceClick = async (choice) => {
    if (choice === 'End Story') {
      // Use collected audio URLs for stitching
      if (audioUrls.length > 0) {
        try {
          const stitchResponse = await axios.post('http://localhost:8000/api/audio/stitch', {
            audioUrls: audioUrls
          });
          
          if (stitchResponse.data.stitchedAudioUrl) {
            setFullStoryAudioUrl(stitchResponse.data.stitchedAudioUrl);
          }
        } catch (error) {
          console.log('Audio stitching failed:', error);
        }
      }
      
      setIsStoryStarted(false);
      setStoryHistory([]);
      setCurrentChoices([]);
      setAudioUrls([]);
      if (currentAudio) {
        currentAudio.pause();
        setCurrentAudio(null);
      }
      return;
    }
    if (choice === 'Continue Adventure' && storyHistory.length >= 8) {
      // Reset story length limit for continuation
      handleGenerateStory(null, 'Continue the adventure with new challenges');
      return;
    }
    handleGenerateStory(null, choice);
  };

  // Settings handlers
  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const handleVoiceChange = (voice) => {
    setSelectedVoice(voice);
  };

  // Restart handler
  const handleRestart = () => {
    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
    }
    setIsStoryStarted(false);
    setStoryHistory([]);
    setCurrentChoices([]);
    setFullStoryAudioUrl(null);
    setAudioUrls([]);
  };

  return (
    <div className="katha-app font-serif">
      <SettingsPanel 
        onLanguageChange={handleLanguageChange}
        onVoiceChange={handleVoiceChange}
      />
      {isStoryStarted ? (
        <StoryScreen
          storyHistory={storyHistory}
          currentChoices={currentChoices}
          isLoading={isLoading}
          onChoiceClick={handleChoiceClick}
          onRestart={handleRestart}
        />
      ) : (
        <StartScreen 
          onStartStory={handleStartStory} 
          fullStoryAudioUrl={fullStoryAudioUrl}
          onClearAudio={() => setFullStoryAudioUrl(null)}
        />
      )}
    </div>
  );
}

export default App;

