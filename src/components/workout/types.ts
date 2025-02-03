export interface Exercise {
  title: string;
  duration: string;
  imageUrl?: string;
  isActive?: boolean;
  progress?: number;
  isCompleted?: boolean;
}

export interface WorkoutSection {
  exercises: Exercise[];
}