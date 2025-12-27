import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Clock } from "lucide-react";

interface FacultyCardProps {
  name: string;
  department: string;
  status: "Available" | "Busy" | "In Class" | "DND";
  lastUpdated: string;
}

const statusConfig = {
  Available: {
    bg: "bg-gradient-to-r from-[#2ecc71] to-[#27ae60]",
    ring: "ring-[#2ecc71]/30",
    glow: "shadow-green-500/20",
  },
  Busy: {
    bg: "bg-gradient-to-r from-[#e74c3c] to-[#c0392b]",
    ring: "ring-[#e74c3c]/30",
    glow: "shadow-red-500/20",
  },
  "In Class": {
    bg: "bg-gradient-to-r from-[#3498db] to-[#2980b9]",
    ring: "ring-[#3498db]/30",
    glow: "shadow-blue-500/20",
  },
  DND: {
    bg: "bg-gradient-to-r from-[#f39c12] to-[#e67e22]",
    ring: "ring-[#f39c12]/30",
    glow: "shadow-orange-500/20",
  },
};

export function FacultyCard({ name, department, status, lastUpdated }: FacultyCardProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const config = statusConfig[status];

  return (
    <Card className="group relative overflow-hidden p-5 sm:p-6 bg-white dark:bg-[#071022] border-gray-200 dark:border-gray-700/50 hover:shadow-xl hover:shadow-[#004aad]/10 dark:hover:shadow-[#2b6fc7]/10 hover:-translate-y-2 transition-all duration-300 cursor-pointer">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50/50 dark:to-[#0a1635]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative flex items-start gap-4">
        {/* Avatar with status ring */}
        <div className={`relative ring-4 ${config.ring} rounded-full`}>
          <Avatar className="w-14 h-14 sm:w-16 sm:h-16">
            <AvatarFallback className="bg-gradient-to-br from-[#004aad] to-[#0066ff] dark:from-[#2b6fc7] dark:to-[#4d8fe8] text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
          {/* Status indicator dot */}
          <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 sm:w-5 sm:h-5 ${config.bg} rounded-full border-2 sm:border-3 border-white dark:border-[#071022] shadow-lg ${config.glow} animate-pulse`} />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-[#0f1720] dark:text-[#e6eef8] truncate pr-2 group-hover:text-[#004aad] dark:group-hover:text-[#2b6fc7] transition-colors">
            {name}
          </h3>
          
          <div className="flex flex-wrap gap-2 mt-2.5">
            <Badge 
              variant="outline" 
              className="text-xs border-gray-300 dark:border-gray-600 text-[#0f1720] dark:text-[#e6eef8] bg-gray-50 dark:bg-[#0a1635]"
            >
              {department}
            </Badge>
            <Badge 
              className={`text-xs ${config.bg} ${config.glow} hover:opacity-90 text-white border-0 shadow-md`}
            >
              {status}
            </Badge>
          </div>
          
          <div className="flex items-center gap-1.5 mt-3 text-xs text-gray-500 dark:text-gray-400">
            <Clock className="w-3 h-3" />
            <span>Updated {lastUpdated}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
