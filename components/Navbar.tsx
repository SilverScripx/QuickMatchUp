

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Trophy, Layout, Swords, BarChart2, GitFork } from 'lucide-react';

const navItems = [
  { to: '/editor', icon: Layout, label: 'Lineup' },

  { to: '/stats', icon: BarChart2, label: 'Stats' },
  { to: '/brackets', icon: GitFork, label: 'Brackets' },
  { to: '/tactics', icon: Swords, label: 'Tactics' },
];

const Navbar: React.FC = () => {
  return (
    <nav className="h-16 bg-surface-deep/80 backdrop-blur-xl border-b border-white/[0.06] flex items-center justify-between px-4 lg:px-8 z-50 sticky top-0">
      {/* Logo */}
      <NavLink to="/" className="flex items-center gap-3 group">
        <div className="relative">
          <div className="absolute inset-0 bg-neon/30 blur-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative bg-neon p-2 rounded-xl group-hover:scale-110 transition-all duration-300 shadow-lg shadow-neon/20">
            <Trophy size={18} className="text-black" strokeWidth={2.5} />
          </div>
        </div>
        <h1 className="font-bold text-lg tracking-tight text-white hidden sm:block group-hover:text-neon transition-colors duration-200">
          QuickMatch
        </h1>
      </NavLink>

      {/* Navigation Pills */}
      <div className="flex gap-1.5 bg-surface/60 backdrop-blur-md p-1.5 rounded-2xl border border-white/[0.06] overflow-x-auto max-w-[calc(100vw-180px)] scrollbar-hide">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `
              relative flex items-center gap-2.5 px-4 lg:px-5 py-2.5 rounded-xl text-sm font-semibold 
              transition-all duration-200 whitespace-nowrap overflow-hidden
              ${isActive
                ? 'bg-surface-elevated text-neon shadow-lg shadow-black/30'
                : 'text-gray-400 hover:text-white hover:bg-surface-hover'
              }
            `}
          >
            {({ isActive }) => (
              <>
                {/* Glow effect for active */}
                {isActive && (
                  <div className="absolute inset-0 bg-neon/5 rounded-xl" />
                )}
                <Icon size={17} className={`relative z-10 ${isActive ? 'text-neon' : ''}`} />
                <span className="relative z-10 hidden md:inline">{label}</span>
                {/* Active indicator dot */}
                {isActive && (
                  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-neon shadow-glow-sm hidden md:block" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Right spacer for balance */}
      <div className="w-10 hidden sm:block" />
    </nav>
  );
};

export default Navbar;
