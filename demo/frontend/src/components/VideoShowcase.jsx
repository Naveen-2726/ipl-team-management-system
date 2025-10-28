import React, { useState } from 'react';
import { Play, X } from 'lucide-react';

const VideoShowcase = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoError, setVideoError] = useState({});

  // Your original videos
  const teamVideos = [
    {
      id: 'csk',
      team: 'Chennai Super Kings',
      shortName: 'CSK',
      videoUrl: '/video/csk.mp4',
      thumbnail: '/logos/csk.png',
      description: 'Chennai Super Kings - Whistle Podu highlights'
    },
    {
      id: 'rcb',
      team: 'Royal Challengers Bangalore', 
      shortName: 'RCB',
      videoUrl: '/video/rcb.mp4',
      thumbnail: '/logos/rcb.jpeg',
      description: 'Royal Challengers Bangalore - Ee Sala Cup Namde'
    },
    {
      id: 'mi',
      team: 'Mumbai Indians',
      shortName: 'MI', 
      videoUrl: '/video/mi.mp4',
      thumbnail: '/logos/mi.jpeg',
      description: 'Mumbai Indians - Duniya Hila Denge'
    }
  ];

  const handleVideoError = (videoId) => {
    setVideoError(prev => ({ ...prev, [videoId]: true }));
  };

  const VideoThumbnail = ({ video }) => (
    <div 
      className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
      onClick={() => setSelectedVideo(video)}
    >
      <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center relative">
        {/* Thumbnail or Logo */}
        <img 
          src={video.thumbnail}
          alt={video.team}
          className="w-20 h-20 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
          <div className="bg-white bg-opacity-90 rounded-full p-4 group-hover:bg-opacity-100 group-hover:scale-110 transition-all duration-300">
            <Play className="w-8 h-8 text-blue-600 ml-1" fill="currentColor" />
          </div>
        </div>

        {/* Team Name */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h3 className="text-white font-bold text-lg">{video.shortName}</h3>
          <p className="text-gray-200 text-sm">{video.description}</p>
        </div>
      </div>
    </div>
  );

  const VideoModal = ({ video, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Video Player */}
        <div className="bg-black rounded-lg overflow-hidden">
          {videoError[video.id] ? (
            <div className="aspect-video bg-gray-800 flex flex-col items-center justify-center text-white p-8">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">{video.team}</h3>
                <p className="text-gray-400 mb-4">Video not available</p>
                <p className="text-sm text-gray-500">
                  Please add your original video file: <code className="bg-gray-700 px-2 py-1 rounded">{video.videoUrl}</code>
                </p>
              </div>
            </div>
          ) : (
            <video 
              className="w-full aspect-video" 
              controls 
              autoPlay
              onError={() => handleVideoError(video.id)}
            >
              <source src={video.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          
          {/* Video Info */}
          <div className="p-4 bg-gray-900">
            <h3 className="text-white text-xl font-bold">{video.team}</h3>
            <p className="text-gray-400">{video.description}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-12 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Team Highlights</h2>
          <p className="text-lg text-gray-600">
            Watch the best moments from your favorite IPL teams
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamVideos.map((video) => (
            <VideoThumbnail key={video.id} video={video} />
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-white rounded-xl p-6 shadow-lg max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-gray-800 mb-4">🎥 Your Original Videos Are Ready!</h3>
          <div className="space-y-3 text-gray-600">
            <p>✅ Found your original video files:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><code className="bg-gray-100 px-2 py-1 rounded text-sm">csk.mp4</code> - Chennai Super Kings highlights</li>
              <li><code className="bg-gray-100 px-2 py-1 rounded text-sm">rcb.mp4</code> - Royal Challengers Bangalore highlights</li>
              <li><code className="bg-gray-100 px-2 py-1 rounded text-sm">mi.mp4</code> - Mumbai Indians highlights</li>
            </ul>
            <p className="text-green-600 font-semibold">🚀 Videos are now ready for Vercel deployment!</p>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal 
          video={selectedVideo} 
          onClose={() => setSelectedVideo(null)} 
        />
      )}
    </div>
  );
};

export default VideoShowcase;