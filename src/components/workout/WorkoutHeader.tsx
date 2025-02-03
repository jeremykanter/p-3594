import React from "react";
import { ChevronLeft, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

export const WorkoutHeader: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="h-6 flex items-center justify-between px-4 text-sm">
        <div className="flex-1">9:41</div>
        <div className="flex items-center space-x-2">
          <span>􀋦</span>
          <span>􀋧</span>
        </div>
      </div>
      
      <nav className="h-12 flex items-center justify-between px-4">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" className="flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span>Workouts</span>
          </Button>
        </div>
        <h1 className="text-lg font-semibold">Activation</h1>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </nav>
    </header>
  );
};