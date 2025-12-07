import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-12 border-t border-white/10 w-full mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-gray-500 text-sm">
          © {new Date().getFullYear()} QuickMatch Engine. All rights reserved.
        </div>

        <div className="flex gap-8">
          <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Home</a>
          <a href="#/editor" className="text-gray-400 hover:text-white text-sm transition-colors">Editor</a>
          <a href="#/templates" className="text-gray-400 hover:text-white text-sm transition-colors">Templates</a>
          <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;