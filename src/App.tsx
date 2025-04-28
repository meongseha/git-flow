import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { TutorialContainer } from "./components/TutorialContainer";
import { GitWorkflowGuide } from "./components/GitWorkflowGuide";
import { ThemeProvider } from "./context/ThemeContext";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<TutorialContainer />} />
              <Route
                path="/practice"
                element={<div>Practice Page Coming Soon</div>}
              />
              <Route path="/new-page" element={<GitWorkflowGuide />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
