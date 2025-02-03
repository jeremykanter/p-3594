import React, { useState, useRef } from "react";
import { WorkoutExerciseItem } from "./WorkoutExerciseItem";
import { Exercise } from "./types";

interface WorkoutExerciseListProps {
  exercises: Exercise[];
}

export const WorkoutExerciseList: React.FC<WorkoutExerciseListProps> = ({ exercises: initialExercises }) => {
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const elapsedTimeRef = useRef<number>(0);

  const startExercise = (index: number) => {
    const currentExercise = exercises[index];
    
    if (currentExercise.isActive) {
      // Pause/Resume logic
      setExercises(prev => prev.map((ex, i) => 
        i === index ? { ...ex, isPaused: !ex.isPaused } : ex
      ));

      if (currentExercise.isPaused) {
        // Resume
        startTimeRef.current = Date.now() - elapsedTimeRef.current;
        startTimer(index);
      } else {
        // Pause
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        elapsedTimeRef.current = Date.now() - (startTimeRef.current || 0);
      }
      return;
    }

    // Start new exercise
    const updatedExercises = exercises.map((ex, i) => ({
      ...ex,
      isActive: i === index,
      progress: i === index ? 0 : ex.progress,
      isPaused: false
    }));
    setExercises(updatedExercises);

    // Parse duration to get seconds
    const durationMatch = exercises[index].duration.match(/(\d+)/);
    const durationInSeconds = durationMatch ? parseInt(durationMatch[1]) : 0;
    
    if (durationInSeconds > 0) {
      startTimeRef.current = Date.now();
      elapsedTimeRef.current = 0;
      startTimer(index, durationInSeconds);
    }
  };

  const startTimer = (index: number, durationInSeconds?: number) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - (startTimeRef.current || 0)) / 1000;
      const progress = Math.min((elapsed / (durationInSeconds || 1)) * 100, 100);
      
      setExercises(prev => prev.map((ex, i) => 
        i === index ? { ...ex, progress } : ex
      ));

      if (progress >= 100) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setExercises(prev => prev.map((ex, i) => 
          i === index ? { ...ex, isActive: false, progress: undefined, isCompleted: true } : ex
        ));
      }
    }, 100);
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