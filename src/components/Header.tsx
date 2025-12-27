import { Moon, Sun } from "lucide-react";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import logo from "figma:asset/24aa0c5b568316a038552d979dfb2b199201ff1d.png";

interface HeaderProps {
  isConnected: boolean;
  isDarkMode: boolean;
  onDarkModeToggle: () => void;
}

export function Header({ isConnected, isDarkMode, onDarkModeToggle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b bg-gradient-to-r from-white via-white to-blue-50/30 dark:from-[#071022] dark:via-[#071022] dark:to-[#0a1a3a]/30 backdrop-blur-sm shadow-sm transition-colors">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Logo and Title */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-white dark:bg-white/5 rounded-full p-1.5 sm:p-2 shadow-lg">
              <img 
                src={logo} 
                alt="FacultyPing Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <h1 className="text-[#004aad] dark:text-[#2b6fc7] leading-tight">FacultyPing</h1>
              <p className="text-xs sm:text-sm text-[#0f1720]/70 dark:text-[#e6eef8]/70 mt-0.5 line-clamp-1 sm:line-clamp-none">
                Real-time Faculty Availability — Dept. of CSE, IUST
              </p>
            </div>
          </div>
          
          {/* Status and Controls */}
          <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
            <Badge 
              variant={isConnected ? "default" : "destructive"}
              className={`${isConnected ? 'bg-[#2ecc71] shadow-lg shadow-green-500/20' : 'bg-[#e74c3c] shadow-lg shadow-red-500/20'} hover:opacity-90 border-0`}
            >
              <span className={`w-2 h-2 rounded-full bg-white mr-2 animate-pulse`}></span>
              <span className="hidden sm:inline">{isConnected ? 'Connected' : 'Offline'}</span>
              <span className="sm:hidden">●</span>
            </Badge>
            
            <div className="flex items-center gap-2 bg-gray-100/80 dark:bg-[#0a1635]/80 px-3 py-1.5 rounded-full">
              <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0f1720] dark:text-[#e6eef8]/60" />
              <Switch 
                checked={isDarkMode}
                onCheckedChange={onDarkModeToggle}
              />
              <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0f1720]/60 dark:text-[#e6eef8]" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
