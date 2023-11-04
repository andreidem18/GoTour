import { Location } from 'src/app/locations/interfaces/Location';
import { User } from 'src/app/shared/interfaces';
import { tourDifficulty } from 'src/app/tours/interfaces/tourDifficulty';

export interface NewTour {
    name:         string;
    description:  string;
    duration:     string;
    maxGroupSize: number;
    difficulty:   tourDifficulty;
    price:        number;
    imageCover:   File | null;
    tourImgs:     File[];
    location:     Location | null;
    guide:        User | null;
}
