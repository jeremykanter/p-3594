export interface Exercise {
  title: string;
  duration: string;
  imageUrl?: string;
  isActive?: boolean;
  progress?: number;
}

export interface WorkoutSection {
  exercises: Exercise[];
}