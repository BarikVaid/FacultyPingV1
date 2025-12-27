import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { SearchFilters } from "./components/SearchFilters";
import { FacultyCard } from "./components/FacultyCard";
import { Footer } from "./components/Footer";

// Mock faculty data - Replace with Firebase Realtime Database integration
const mockFacultyData = [
  { id: 1, name: "Dr. Sajad Ahmad Lone", department: "CSE", status: "Available" as const, lastUpdated: "2m ago" },
];

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [facultyData, setFacultyData] = useState(mockFacultyData);

  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Firebase integration placeholder
  useEffect(() => {
    // TODO: Replace with Firebase Realtime Database connection
    // Example Firebase integration:
    /*
    import { initializeApp } from 'firebase/app';
    import { getDatabase, ref, onValue } from 'firebase/database';
    
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      databaseURL: "YOUR_DATABASE_URL",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID"
    };
    
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const facultyRef = ref(database, 'faculty');
    
    onValue(facultyRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setFacultyData(Object.values(data));
        setIsConnected(true);
      }
    }, (error) => {
      console.error('Firebase error:', error);
      setIsConnected(false);
    });
    */
    
    // Simulate connection status (remove when Firebase is integrated)
    const connectionInterval = setInterval(() => {
      setIsConnected(true);
    }, 3000);

    return () => clearInterval(connectionInterval);
  }, []);

  // Filter faculty data based on search and department
  const filteredFaculty = facultyData.filter((faculty) => {
    const matchesSearch = 
      faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faculty.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = 
      !selectedDepartment || faculty.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  // Calculate stats
  const availableCount = facultyData.filter(f => f.status === "Available").length;
  const totalCount = facultyData.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6f8fb] via-[#f0f4f8] to-[#e8f0fa] dark:from-[#0b1220] dark:via-[#0d1426] dark:to-[#0a1633] transition-colors">
      <Header 
        isConnected={isConnected}
        isDarkMode={isDarkMode}
        onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
      />
      
      <SearchFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedDepartment={selectedDepartment}
        onDepartmentChange={setSelectedDepartment}
      />
      
      {/* Stats Summary */}
      <div className="container mx-auto px-4 sm:px-6 pb-4">
        <div className="flex items-center justify-between gap-4 text-sm">
          <p className="text-gray-600 dark:text-gray-400">
            Showing <span className="text-[#004aad] dark:text-[#2b6fc7]">{filteredFaculty.length}</span> of {totalCount} faculty members
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#2ecc71] animate-pulse" />
            <p className="text-gray-600 dark:text-gray-400">
              <span className="text-[#2ecc71]">{availableCount}</span> Available
            </p>
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 sm:px-6 pb-12">
        {filteredFaculty.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredFaculty.map((faculty) => (
              <FacultyCard
                key={faculty.id}
                name={faculty.name}
                department={faculty.department}
                status={faculty.status}
                lastUpdated={faculty.lastUpdated}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 sm:py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#071022] dark:to-[#0a1635] mb-4 shadow-lg">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-[#0f1720] dark:text-[#e6eef8] mb-2">
              No results found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}