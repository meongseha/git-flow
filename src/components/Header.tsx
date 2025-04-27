import React from 'react';
import { GitBranch } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <GitBranch className="h-6 w-6 text-[#0366D6]" />
          <h1 className="text-xl font-semibold text-gray-900">Git Flow Tutorial</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#tutorial" className="text-gray-700 hover:text-[#0366D6] font-medium">Tutorial</a></li>
            <li><a href="#visualization" className="text-gray-700 hover:text-[#0366D6] font-medium">Visualization</a></li>
            <li><a href="#practice" className="text-gray-700 hover:text-[#0366D6] font-medium">Practice</a></li>
            <li><a href="#reference" className="text-gray-700 hover:text-[#0366D6] font-medium">Reference</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};