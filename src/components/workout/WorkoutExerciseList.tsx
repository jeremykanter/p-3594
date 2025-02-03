import React, { useState } from "react";
import { WorkoutExerciseItem } from "./WorkoutExerciseItem";
import { Exercise } from "./types";

interface WorkoutExerciseListProps {
  exercises: Exercise[];
}

export const WorkoutExerciseList: React.FC<WorkoutExerciseListProps> = ({ exercises: initialExercises }) => {
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises);

  const startExercise = (index: number) => {
    const updatedExercises = exercises.map((ex, i) => ({
      ...ex,
      isActive: i === index,
      progress: i === index ? 0 : ex.progress,
    }));
    setExercises(updatedExercises);

    // Parse duration to get seconds
    const durationMatch = exercises[index].duration.match(/(\d+)/);
    const durationInSeconds = durationMatch ? parseInt(durationMatch[1]) : 0;
    
    if (durationInSeconds > 0) {
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        const progress = Math.min((elapsed / durationInSeconds) * 100, 100);
        
        setExercises(prev => prev.map((ex, i) => 
          i === index ? { ...ex, progress } : ex
        ));

        if (progress >= 100) {
          clearInterval(interval);
          setExercises(prev => prev.map((ex, i) => 
            i === index ? { ...ex, isActive: false, progress: undefined } : ex
          ));
        }
      }, 100);
    }
  };

  return (
    <section className="flex-1 overflow-auto">
      {exercises.map((exercise, index) => (
        <WorkoutExerciseItem 
          key={index} 
          exercise={exercise} 
          onClick={() => startExercise(index)}
        />
      ))}
    </section>
  );
};