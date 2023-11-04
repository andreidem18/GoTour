// Generated by https://quicktype.io

import { User } from 'src/app/shared/interfaces/User';
import { tourDifficulty } from './tourDifficulty';
import { Location } from './Location';

export interface Tour {
    id:           number;
    name:         string;
    description:  string;
    duration:     string;
    maxGroupSize: number;
    difficulty:   tourDifficulty;
    price:        string;
    imageCover:   string;
    createdAt:    string;
    updatedAt:    string;
    locationId:   number;
    guideId:      number;
    tourImgs:     TourImg[];
    user:         User;
    location:     Location;
}

export interface TourImg {
    id:     number;
    url:    string;
    tourId: number;
}
