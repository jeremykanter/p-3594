export interface Exercise {
  title: string;
  duration: string;
  imageUrl?: string;
  isActive?: boolean;
  progress?: number;
  isCompleted?: boolean;
  isPaused?: boolean;
}

export interface WorkoutSection {
  exercises: Exercise[];
}