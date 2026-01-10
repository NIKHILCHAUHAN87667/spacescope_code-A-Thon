import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StarField } from './components/StarField';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Events } from './pages/Events';
import { SpaceWeather } from './pages/SpaceWeather';
import { Missions } from './pages/Missions';
import { Learn } from './pages/Learn';
import { Satellites } from './pages/Satellites';
import { Toaster } from './components/ui/sonner';
import './App.css';

function App() {
  return (
    <div className="App relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Starfield Background */}
      <StarField />
      
      {/* Main Content */}
      <div className="relative z-10">
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/weather" element={<SpaceWeather />} />
            <Route path="/missions" element={<Missions />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/satellites" element={<Satellites />} />
          </Routes>
        </BrowserRouter>
      </div>
      
      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}

export default App;