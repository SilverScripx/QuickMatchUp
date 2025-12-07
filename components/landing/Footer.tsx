import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-12 border-t border-white/10 w-full mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-neon flex items-center justify-center font-bold text-black text-xl">Q</div>
          <span className="text-white font-bold text-lg tracking-tight">QuickMatch</span>
        </div>

        <div className="flex gap-8">
          <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Home</a>
          <a href="#features" className="text-gray-400 hover:text-white text-sm transition-colors">Tools</a>
          <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">About</a>
          <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</a>
        </div>

        <div className="text-gray-600 text-sm">
          © {new Date().getFullYear()} QuickMatch. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;