import React from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { TutorialContainer } from "./components/TutorialContainer";
import { ThemeProvider } from "./context/ThemeContext";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <TutorialContainer />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
