const StoryScreen = ({ storyHistory, currentChoices, isLoading, onChoiceClick, onRestart }) => {
  const latestStory = storyHistory[storyHistory.length - 1] || "Your story is about to unfold...";

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-40 h-40 border border-amber-800 rounded-full"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 border border-amber-700 rotate-45"></div>
        <div className="absolute top-1/2 right-20 w-24 h-24 border border-amber-600 rounded-full"></div>
      </div>

      {/* Header with Menu */}
      <div className="relative z-10 p-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 text-amber-800" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
            </svg>
            <h1 className="text-2xl font-serif font-bold text-amber-900">कथा यात्रा</h1>
          </div>
          
          <button 
            onClick={onRestart}
            className="px-4 py-2 bg-gradient-to-r from-amber-700 to-orange-700 text-white font-serif rounded-lg shadow-lg hover:from-amber-800 hover:to-orange-800 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/>
            </svg>
            नई कथा
          </button>
        </div>
      </div>

      {/* Main Story Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pb-8">
        {/* Story Parchment */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-4 border-amber-800 rounded-2xl shadow-2xl mb-8 overflow-hidden">
          {/* Parchment Header */}
          <div className="bg-gradient-to-r from-amber-800 to-orange-800 px-6 py-4">
            <h2 className="text-xl font-serif font-bold text-amber-50 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9,4V6H21V4H9M9,8V10H21V8H9M9,12V14H21V12H9M9,16V18H21V16H9M5,4V6H7V4H5M5,8V10H7V8H5M5,12V14H7V12H5M5,16V18H7V16H5M3,2V22H1V2H3Z"/>
              </svg>
              आपकी कथा...
            </h2>
          </div>
          
          {/* Story Text */}
          <div className="p-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg font-serif leading-relaxed text-amber-900 first-letter:text-6xl first-letter:font-bold first-letter:text-amber-800 first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                {latestStory}
              </p>
            </div>
            
            {/* Audio Control */}
            <div className="mt-6 flex items-center gap-2 text-amber-700">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"/>
              </svg>
              <span className="text-sm font-serif italic">स्वर में सुनाई जा रही है...</span>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-3 px-6 py-4 bg-white/80 backdrop-blur-sm border-2 border-amber-300 rounded-xl shadow-lg">
              <div className="animate-spin w-6 h-6 border-2 border-amber-800 border-t-transparent rounded-full"></div>
              <p className="text-lg font-serif text-amber-800">कथाकार सोच रहा है...</p>
            </div>
          </div>
        ) : (
          /* Choice Buttons */
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-amber-900 text-center mb-6 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M7.5,13A2.5,2.5 0 0,0 5,15.5A2.5,2.5 0 0,0 7.5,18A2.5,2.5 0 0,0 10,15.5A2.5,2.5 0 0,0 7.5,13M16.5,13A2.5,2.5 0 0,0 14,15.5A2.5,2.5 0 0,0 16.5,18A2.5,2.5 0 0,0 19,15.5A2.5,2.5 0 0,0 16.5,13Z"/>
              </svg>
              आपका चुनाव
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentChoices.map((choice, index) => (
                <button 
                  key={index} 
                  onClick={() => onChoiceClick(choice)}
                  className="group relative p-6 bg-gradient-to-br from-white to-amber-50 border-2 border-amber-300 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:border-amber-500 text-left"
                >
                  {/* Choice Number */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-amber-700 to-orange-700 text-white rounded-full flex items-center justify-center font-serif font-bold text-sm shadow-lg">
                    {index + 1}
                  </div>
                  
                  {/* Choice Text */}
                  <p className="font-serif text-amber-900 leading-relaxed group-hover:text-amber-800 transition-colors pr-4">
                    {choice}
                  </p>
                  
                  {/* Hover Arrow */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-5 h-5 text-amber-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8,5.14V19.14L19,12.14L8,5.14Z"/>
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryScreen;