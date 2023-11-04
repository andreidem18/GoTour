import { Location } from 'src/app/locations/interfaces/Location';
import { tourDifficulty } from 'src/app/tours/interfaces/tourDifficulty';

export interface NewTourBody {
    name:         string;
    description:  string;
    duration:     string;
    maxGroupSize: number;
    difficulty:   tourDifficulty;
    price:        number;
    imageCover:   File | null;
    tourImgs:     File[];
    locationId:   number;
    guideId:      number;
}
