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
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startExercise = (index: number) => {
    const currentExercise = exercises[index];
    
    if (currentExercise.isActive) {
      // Pause/Resume logic
      setExercises(prev => prev.map((ex, i) => 
        i === index ? { ...ex, isPaused: !ex.isPaused } : ex
      ));

      if (currentExercise.isPaused) {
        // Resume - Start fresh timer
        startTimeRef.current = Date.now();
        elapsedTimeRef.current = 0;
        const durationMatch = exercises[index].duration.match(/(\d+)/);
        const durationInSeconds = durationMatch ? parseInt(durationMatch[1]) : 0;
        startTimer(index, durationInSeconds);
      } else {
        // Pause
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
      return;
    }

    // Start countdown before exercise
    let countdown = 5;
    setExercises(prev => prev.map((ex, i) => ({
      ...ex,
      countdown: i === index ? countdown : undefined
    })));

    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
    }

    countdownIntervalRef.current = setInterval(() => {
      countdown--;
      setExercises(prev => prev.map((ex, i) => ({
        ...ex,
        countdown: i === index ? countdown : undefined
      })));

      if (countdown <= 0) {
        if (countdownIntervalRef.current) {
          clearInterval(countdownIntervalRef.current);
          countdownIntervalRef.current = null;
        }

        // Start new exercise
        const updatedExercises = exercises.map((ex, i) => ({
          ...ex,
          isActive: i === index,
          progress: i === index ? 0 : ex.progress,
          isPaused: false,
          countdown: undefined
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
      }
    }, 1000);
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
        
        // Mark current exercise as completed and find next uncompleted exercise
        setExercises(prev => {
          const updatedExercises = prev.map((ex, i) => 
            i === index ? { ...ex, isActive: false, progress: undefined, isCompleted: true } : ex
          );
          
          // Find the next uncompleted exercise
          const nextIndex = updatedExercises.findIndex((ex, i) => i > index && !ex.isCompleted);
          if (nextIndex !== -1) {
            // Start the next exercise after a short delay
            setTimeout(() => startExercise(nextIndex), 500);
          }
          
          return updatedExercises;
        });
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