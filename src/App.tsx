import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TutorialContainer } from './components/TutorialContainer';
import './App.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <TutorialContainer />
      </main>
      <Footer />
    </div>
  );
}

export default App;