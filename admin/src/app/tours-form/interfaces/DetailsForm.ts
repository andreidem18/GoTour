export interface DetailsForm {
    price: number;
    maxGroupSize: number;
    difficulty: 'easy' | 'medium' | 'hard';
    duration: string;
}