

import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Editor from './pages/Editor';

import TacticsEditor from './pages/TacticsEditor';
import StatsEditor from './pages/StatsEditor';
import BracketsEditor from './pages/BracketsEditor';
import ComingSoon from './pages/ComingSoon';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <HashRouter>
        <div className="flex flex-col h-screen overflow-hidden bg-[#0E0E0E]">
          <Routes>
            <Route path="*" element={<Navbar />} />
          </Routes>

          <main className="flex-1 overflow-hidden relative">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/editor" element={<Editor />} />

              <Route path="/tactics" element={<TacticsEditor />} />
              <Route path="/stats" element={<StatsEditor />} />
              <Route path="/brackets" element={<BracketsEditor />} />
              <Route path="/templates" element={<ComingSoon />} />
            </Routes>
          </main>
        </div>
      </HashRouter>
    </DndProvider>
  );
}

export default App;
