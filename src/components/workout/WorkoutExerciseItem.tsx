import React from "react";
import { Exercise } from "./types";

interface WorkoutExerciseItemProps {
  exercise: Exercise;
}

export const WorkoutExerciseItem: React.FC<WorkoutExerciseItemProps> = ({ exercise }) => {
  return (
    <article className="flex items-center p-4 border-b border-gray-200">
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
    </article>
  );
};