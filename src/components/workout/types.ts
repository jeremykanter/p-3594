export interface Exercise {
  title: string;
  duration: string;
  imageUrl?: string;
}

export interface WorkoutSection {
  exercises: Exercise[];
}