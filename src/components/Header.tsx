import React from 'react';
import { Moon, Sun, Search } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Header: React.FC = () => {
  const { darkMode, toggleDarkMode } = useStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="hidden font-bold sm:inline-block">
              Financial Data Explorer
            </span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
            onClick={toggleDarkMode}
          >
            {darkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle theme</span>
          </button>
        </div>
      </div>
    </header>
  );
};