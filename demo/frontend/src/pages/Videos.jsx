import React from 'react';
import VideoShowcase from '../components/VideoShowcase';

const Videos = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">IPL Team Videos</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Experience the thrill and excitement of the Indian Premier League through exclusive team highlight videos
          </p>
        </div>
      </div>

      {/* Video Showcase Component */}
      <VideoShowcase />

      {/* Additional Info Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">About These Videos</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl p-6 text-white">
                  <h3 className="text-xl font-bold mb-3">Chennai Super Kings</h3>
                  <p className="opacity-90">
                    The most successful team in IPL history. Watch their journey of dominance and the iconic "Whistle Podu" spirit.
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-xl p-6 text-white">
                  <h3 className="text-xl font-bold mb-3">Royal Challengers Bangalore</h3>
                  <p className="opacity-90">
                    "Ee Sala Cup Namde" - The passionate team with the most loyal fanbase. Experience their thrilling matches.
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
                  <h3 className="text-xl font-bold mb-3">Mumbai Indians</h3>
                  <p className="opacity-90">
                    The champions who know how to "Duniya Hila Denge". Witness their record-breaking performances.
                  </p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Video Features</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full p-2">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h12a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">High Quality</h4>
                    <p className="text-gray-600">Crystal clear video quality for the best viewing experience</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-full p-2">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Fast Loading</h4>
                    <p className="text-gray-600">Optimized for quick loading and smooth playback</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 rounded-full p-2">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Responsive Design</h4>
                    <p className="text-gray-600">Works perfectly on all devices - desktop, tablet, and mobile</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 rounded-full p-2">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Team Highlights</h4>
                    <p className="text-gray-600">Curated highlight reels featuring the best moments from each team</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Videos;