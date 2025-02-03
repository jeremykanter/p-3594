import React from "react";
import { WorkoutExerciseItem } from "./WorkoutExerciseItem";
import { Exercise } from "./types";

interface WorkoutExerciseListProps {
  exercises: Exercise[];
}

export const WorkoutExerciseList: React.FC<WorkoutExerciseListProps> = ({ exercises }) => {
  return (
    <section className="flex-1 overflow-auto">
      {exercises.map((exercise, index) => (
        <WorkoutExerciseItem key={index} exercise={exercise} />
      ))}
    </section>
  );
};