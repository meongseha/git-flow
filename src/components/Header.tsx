import React from "react";
import { GitBranch } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <GitBranch className="h-6 w-6 text-[#0366D6]" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Git Flow Tutorial
          </h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};
