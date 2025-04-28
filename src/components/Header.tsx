import React from "react";
import { GitBranch } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Link, useLocation } from "react-router-dom";

export const Header: React.FC = () => {
  const location = useLocation();

  const isActiveTab = (path: string) => {
    return location.pathname === path
      ? "border-blue-500"
      : "border-transparent hover:border-gray-300";
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <GitBranch className="h-6 w-6 text-[#0366D6]" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Git Flow Tutorial
            </h1>
          </div>
          <ThemeToggle />
        </div>
        <nav className="flex space-x-8">
          <Link
            to="/"
            className={`text-gray-700 dark:text-gray-300 pb-2 border-b-2 ${isActiveTab(
              "/"
            )}`}
          >
            Tutorial
          </Link>
          <Link
            to="/practice"
            className={`text-gray-700 dark:text-gray-300 pb-2 border-b-2 ${isActiveTab(
              "/practice"
            )}`}
          >
            Practice
          </Link>
          <Link
            to="/new-page"
            className={`text-gray-700 dark:text-gray-300 pb-2 border-b-2 ${isActiveTab(
              "/new-page"
            )}`}
          >
            Git Workflow
          </Link>
        </nav>
      </div>
    </header>
  );
};
