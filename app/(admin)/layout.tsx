"use client";

import { useState, useCallback } from "react";
import LeftSidebar from "../componnets/shared/LeftSidebar";
import Navbar from "../componnets/shared/Navbar";
import RightSidebar from "../componnets/shared/RightSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarState, setSidebarState] = useState({ isOpen: true, isMobile: false });

  // Calculate margin based on sidebar state
  const getMainMargin = () => {
    if (sidebarState.isMobile) {
      return 'lg:ml-0';
    }
    return sidebarState.isOpen ? 'lg:ml-64' : 'lg:ml-20';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-x-hidden">
      
      {/* left Sidebar */}
      <LeftSidebar />

      {/* Main Wrapper */}
      <div className={`flex-1 min-w-0 flex flex-col transition-all duration-300 ${getMainMargin()}`}>
        
        {/* Navbar */}
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200 w-full">
          <Navbar />
        </header>

        {/* Main Content */}
        <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-x-hidden">
          
          {/* Center Content Controller */}
          <div className="w-full max-w-[1400px] mx-auto">
            
            {/* Card Container */}
            <div className=" rounded-xl shadow-sm border p-3 sm:p-4 md:p-6 min-h-[calc(100vh-110px)]">

                <div className="mt-4 md:mt-6 w-full">
                  {children}
                </div>

            </div>

          </div>

        </main>
      </div>

      {/* right Sidebar */}
      <RightSidebar />
    </div>
  );
}