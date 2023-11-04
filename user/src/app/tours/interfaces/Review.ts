import { User } from 'src/app/shared/interfaces';

export interface Review {
    id:          number;
    description: string;
    rating:      string;
    createdAt:   string;
    updatedAt:   string;
    userId:      number;
    tourId:      number;
    user:        User;
}
