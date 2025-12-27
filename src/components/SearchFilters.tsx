import { Search, X, Filter } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedDepartment: string | null;
  onDepartmentChange: (dept: string | null) => void;
}

const departments = ["CSE", "ECE", "ME", "CE", "EE"];

export function SearchFilters({ 
  searchQuery, 
  onSearchChange, 
  selectedDepartment, 
  onDepartmentChange 
}: SearchFiltersProps) {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
      <div className="bg-white/60 dark:bg-[#071022]/60 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-5">
        <div className="flex flex-col gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name or department..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-11 sm:pl-12 h-11 sm:h-12 bg-white dark:bg-[#0a1635] border-gray-300 dark:border-gray-600 text-[#0f1720] dark:text-[#e6eef8] rounded-xl shadow-sm focus:ring-2 focus:ring-[#004aad]/20 dark:focus:ring-[#2b6fc7]/20"
            />
          </div>
          
          {/* Department Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filter by:</span>
            </div>
            <div className="flex flex-wrap gap-2 flex-1">
              {departments.map((dept) => (
                <Badge
                  key={dept}
                  variant={selectedDepartment === dept ? "default" : "outline"}
                  className={`cursor-pointer transition-all h-8 px-4 ${
                    selectedDepartment === dept 
                      ? 'bg-gradient-to-r from-[#004aad] to-[#0066ff] dark:from-[#2b6fc7] dark:to-[#4d8fe8] text-white shadow-md border-0 scale-105' 
                      : 'hover:bg-gray-100 dark:hover:bg-[#0a1635] text-[#0f1720] dark:text-[#e6eef8] border-gray-300 dark:border-gray-600 hover:scale-105'
                  }`}
                  onClick={() => onDepartmentChange(selectedDepartment === dept ? null : dept)}
                >
                  {dept}
                </Badge>
              ))}
              
              {(searchQuery || selectedDepartment) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    onSearchChange("");
                    onDepartmentChange(null);
                  }}
                  className="h-8 text-[#0f1720] dark:text-[#e6eef8] hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400"
                >
                  <X className="w-4 h-4 mr-1" />
                  Reset
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
