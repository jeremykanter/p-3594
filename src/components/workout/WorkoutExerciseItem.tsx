import React from "react";
import { Exercise } from "./types";
import { Progress } from "@/components/ui/progress";
import { Check } from "lucide-react";

interface WorkoutExerciseItemProps {
  exercise: Exercise;
  onClick: () => void;
}

export const WorkoutExerciseItem: React.FC<WorkoutExerciseItemProps> = ({ exercise, onClick }) => {
  return (
    <article 
      className={`flex flex-col p-4 border-b border-gray-200 ${
        exercise.isCompleted ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${exercise.isActive ? "bg-gray-50" : ""}`}
      onClick={exercise.isCompleted ? undefined : onClick}
    >
      <div className="flex items-center">
        {exercise.imageUrl && (
          <div className="w-16 h-16 mr-4 rounded-lg overflow-hidden">
            <img
              src={exercise.imageUrl}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{exercise.title}</h3>
          <p className="text-sm text-gray-500">{exercise.duration}</p>
        </div>
        {exercise.isCompleted && (
          <Check className="w-6 h-6 text-green-500 ml-4" />
        )}
      </div>
      {exercise.isActive && typeof exercise.progress === 'number' && (
        <div className="mt-3">
          <Progress value={exercise.progress} className="h-2" />
        </div>
      )}
    </article>
  );
};