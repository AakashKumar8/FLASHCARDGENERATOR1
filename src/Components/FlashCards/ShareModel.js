import React from 'react';

const ShareModel = ({ onClose }) => {
  const shareOnWhatsApp = () => {
    // Your WhatsApp share logic here
    window.open('https://wa.me/?text=your-text-here', '_blank');
  };

  const shareOnFacebook = () => {
    // Your Facebook share logic here
    window.open('https://www.facebook.com/sharer/sharer.php?u=your-url-here', '_blank');
  };

  const shareOnInstagram = () => {
    // Instagram doesn't have a direct URL share, you can link to the app or use some workaround
    alert('Instagram share feature is not directly available through the web.');
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md">
        <h3 className="font-bold text-xl mb-4">Share this Flashcard</h3>
        <div className="space-y-3">
          <button onClick={shareOnWhatsApp} className="w-full p-2 bg-green-500 text-white rounded-lg">
            Share on WhatsApp
          </button>
          <button onClick={shareOnFacebook} className="w-full p-2 bg-blue-600 text-white rounded-lg">
            Share on Facebook
          </button>
          <button onClick={shareOnInstagram} className="w-full p-2 bg-pink-500 text-white rounded-lg">
            Share on Instagram
          </button>
          <button onClick={onClose} className="w-full p-2 bg-gray-500 text-white rounded-lg">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModel;
